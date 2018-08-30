import { observable, computed, action } from "mobx";
import Api from "./../services/Api";
import {clearAll} from "./../services/localDb";

const singleton = Symbol();
const singletonInstance = Symbol();

const ROLES = (num) => {
  switch(num){
  case(0) : return('admin')
  case(1) : return('user')
  default   : return('user')
  }
};

class Auth {

  constructor(singleton){
    if (singleton !== singletonInstance) {
        throw new Error('Cannot construct singleton');
    }
  }

  @observable isAuthenticated =  false;
  @observable token = null;
  @observable uid = null;
  @observable logging = false;
  @observable loadingUserData = false;
  stores = [];
  
  
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Auth(singletonInstance);
    }

    return this[singleton];
  }

  @action
  authorize = (data, cb) => {
    let _self = this;

    let {
      accessToken,
      photoURL,
      displayName,
      email,
      uid
      } = data;
      
    return new Promise((resolve, reject) => {

      _self.isAuthenticated = true;
      _self.accessToken = accessToken;
      _self.photoURL = photoURL;
      _self.displayName = displayName;
      _self.email = email;
      _self.uid = uid;
      _self.role = ROLES(1);

      _self.loadSession = window.localStorage.getItem('uid') === JSON.stringify(_self.uid);
      
      if(typeof window === 'undefined') return reject();

      window.localStorage.setItem('accessToken', _self.accessToken);
      window.localStorage.setItem('photoURL', _self.photoURL);
      window.localStorage.setItem('displayName', _self.displayName);
      window.localStorage.setItem('email', _self.email);
      window.localStorage.setItem('uid', _self.uid);
      if (typeof cb === 'function'){
        cb(resolve);
      }else{
        resolve();
      }
    })
  }

  setUnauthenticated = () => {
    if( typeof window === 'undefined' ) return 
      window.localStorage.setItem('accessToken', false);
    this.isAuthenticated = false;
  }

  @action
  init = () => {
    if( typeof window === 'undefined' ) return 
    this.isAuthenticated = !!window.localStorage.getItem('accessToken');
    this.accessToken = window.localStorage.getItem('accessToken');;
    this.photoURL = window.localStorage.getItem('photoURL');
    this.displayName = window.localStorage.getItem('displayName');
    this.email = window.localStorage.getItem('email');
    this.uid = window.localStorage.getItem('uid');
    this.role = this.uid ? ROLES(1) : undefined;

    this.loadingUserData = true;
    let that = this;
    Api.loadUserData({id: this.uid, forceLoad: true }).then(_ => {
      that.loadingUserData = false;
    })
  }

  @action
  signout = (cb) => {
    let _self = this;
    return new Promise((resolve, reject) => {
      _self.isAuthenticated = false;
      _self.role = undefined;
      _self.uid = null;
      if(typeof window === 'undefined') return  reject();
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('photoURL');
      window.localStorage.removeItem('displayName');
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('uid');
      if (typeof cb === 'function') {
        Api.auth().signOut().then( _ => {
          cb(resolve);
        });
      }else{
        Api.auth().signOut().then(resolve)
      }
      clearAll();
    })
  }

}


export default Auth.instance