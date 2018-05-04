import { observable, computed, action } from "mobx";
import firebase from "firebase";

// export const  Auth = {
//   isAuthenticated: false,
//   token: null,
//   uid: null,
//   authorize(data, cb) {
//     let {
//       accessToken,
//       photoURL,
//       displayName,
//       email,
//       uid
//       } = data;
      
//     return new Promise((resolve, reject) => {

//       this.isAuthenticated = true;
//       this.accessToken = accessToken;
//       this.photoURL = photoURL;
//       this.displayName = displayName;
//       this.email = email;
//       this.uid = uid;
//       this.loadSession = window.localStorage.getItem('uid') === JSON.stringify(this.uid);
      
//       if(typeof window === 'undefined') return reject();

//       window.localStorage.setItem('accessToken', JSON.stringify(this.accessToken));
//       window.localStorage.setItem('photoURL', this.photoURL);
//       window.localStorage.setItem('displayName', this.displayName);
//       window.localStorage.setItem('email', this.email);
//       window.localStorage.setItem('uid', this.uid);
//       if (typeof cb === 'function'){
//         cb(resolve);
//       }else{
//         resolve();
//       }
//     })
//   },

//   setUnauthenticated(){
//     if( typeof window === 'undefined' ) return 
//       window.localStorage.setItem('accessToken', false);
//     this.isAuthenticated = false;
//   },

//   init(){
//     if( typeof window === 'undefined' ) return 
//     this.isAuthenticated = !!JSON.parse(window.localStorage.getItem('accessToken'));
//     this.accessToken = window.localStorage.getItem('accessToken');;
//     this.photoURL = window.localStorage.getItem('photoURL');
//     this.displayName = window.localStorage.getItem('displayName');
//     this.email = window.localStorage.getItem('email');
//     this.uid = window.localStorage.getItem('uid');
//   },

//   signout(cb) {
//     return new Promise((resolve, reject) => {
//       this.isAuthenticated = false;
//       if(typeof window === 'undefined') return  reject();
//       window.localStorage.removeItem('accessToken');
//       window.localStorage.removeItem('photoURL');
//       window.localStorage.removeItem('displayName');
//       window.localStorage.removeItem('email');
//       window.localStorage.removeItem('uid');
//       if (typeof cb === 'function') {
//         Api.auth().signOut().then( _ => {
//           cb(resolve);
//         });
//       }else{
//         Api.auth().signOut().then(resolve)
//       }
//     })
//   }
// }