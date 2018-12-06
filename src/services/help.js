import fire from './../config'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { loadFromStore, saveToStore } from './localDb';
import Auth from '../models/Auth';
import {sleep} from './../utils.js'
const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings)

let userPoint = 'newUserStore';

const getUserById =  async (id) => {
    if(!id) return db.collection(userPoint)
    let d = await db.collection(userPoint).doc(id).get();
    let dd = await d.data();
    console.log(dd);
    saveToStore(id, dd);

    
}

const setUserdata =  async (id) => {
    if(!id) return db.collection(userPoint)
    let r = await db.collection(userPoint).doc(id);

   let dd = await loadFromStore('yfmpWCmaFvZIbB2LkFYn8rWUEEv2');
   console.log(dd);

   r.set(dd);

    
}


//getUserById('yfmpWCmaFvZIbB2LkFYn8rWUEEv2');
//setUserdata('0bV6lMx6OdfkjOWK2vlUXXim75U2');
