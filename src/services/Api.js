import fire from './../config'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { loadAllFromStore, saveAllToStore } from './localDb';
import Auth from '../models/Auth';

const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings)

var getAdditionlCardInfo = (slug) => {

    let [empty, query, doc] = slug.replace('/v1','').split('/');
    return new Promise((resolve, reject) => {
        db.collection(`${query}`).doc(doc).get().then(snap => {
            
            // acc.push({id: snap.docs[0].id,...snap.docs[0].data()});
                if(!snap.exists) return resolve({});

                resolve(snap.data());

            })
    })
}

var getCardByIds = (query) => (models) => {

    return new Promise((resolve, reject) => {
        db.collection(`${query}`).orderBy("order").onSnapshot(snap => {

                if(snap.empty) return resolve([]);

                let ids = [];

                snap.docChanges().forEach(change => {
                    if(change.type == 'added' ){
                        ids.push(change.doc.id);
                    }

                    if(change.type == 'modified' ){
                        for(let [idx, model] of models){
                            if(model.id ==  change.doc.id){
                                if(typeof model.update == 'function')
                                model.update(change.doc.data());
                            }
                        }
                    }
                })
                resolve(ids);
            })
    })
    
}

function getCard(collection, id){
    return new Promise((resolve, reject) => {

      db.collection(collection).doc(id).onSnapshot(snap => {
          resolve({id, ...snap.data()})
      })

    })
}

function changeScoresPolls(id, {l,r}){
    // Create a reference to the SF doc.
    if(!id) return Promise.resolve();
    var cardRef = db.collection("polls").doc(`${id}`);

    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(cardRef).then(function(cardDoc) {
            if (!cardDoc.exists) {
                throw "Document does not exist!";
            }
            let oldCardDocData = cardDoc.data(),
                newLeft = oldCardDocData.answers.l.quantity + l,
                newRight = oldCardDocData.answers.r.quantity + r,
                newAnswers = Object.assign({},oldCardDocData);
                newAnswers.answers.l.quantity = newLeft;
                newAnswers.answers.r.quantity = newRight;
            transaction.update(cardRef, newAnswers);
        });
    }).then(function() {
       // console.log("Transaction successfully committed!");
    })

}


var getQuizzesIds = (query) => (models) => {
    
    return new Promise((resolve, reject) => {
        db.collection(`${query}`).orderBy("order").onSnapshot(snap => {
                
                if(snap.empty) return resolve([]);
            // acc.push({id: snap.docs[0].id,...snap.docs[0].data()});
                let ids = [];
                snap.docChanges().forEach(change => {
                    if(change.type == 'added' ){
                        ids.push(change.doc.id);
                    }

                })
                resolve(ids);
            })
    })
    
}


function getUserById(id){
    if(!id) return db.collection('users').doc
    return db.collection('users').doc(id);
}

function auth(){
    return firebase.auth()
}

function GoogleAuthProvider(){
  let provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('email');
  return provider
}

function FacebookAuthProvider(){
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  return provider
}

function subscription(email){
    if(!email) return Promise.resolve();

    return new Promise(resolve => {
        let exist = false;
        db.collection("subscriptions").onSnapshot(snap => {

            exist = snap.docs.some( subc => subc.data().email === email )
            if(!exist)
                db.collection("subscriptions").add({
                    email: email,
                    date: (new Date).toISOString()
                })
            resolve(exist)
        })
    })
}

function addReview(name, question, email){
    if(!name || !question || !email) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection('contact').doc(email);
        var setWithMerge = userRef.set({
            body: {[(new Date).toISOString()]:{name, question, email}}
        }, { merge: true });
        return resolve(setWithMerge)
    })
}

function create(name, email){
    if(!name || !email) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection('createNew').doc(email);
        var setWithMerge = userRef.set({
            body: {[(new Date).toISOString()]:{name, email}}
        }, { merge: true });
        return resolve(setWithMerge)
    })
}


function withdraw(id, amount, wallet, idTocken, resp){
    if(!id || !amount || !wallet) return Promise.resolve();
    var batch = db.batch();

    return new Promise(resolve => {

        Api.getWithdrawn(id).then( amountWithdrawn  => {
            let userRef = db.collection('users').doc(id);
            batch.set(userRef, {
                withdraw: {[(new Date).toISOString()]:{amount, wallet, responce: JSON.parse(resp)}}
            }, { merge: true });
            batch.set(userRef, {
                withdrawTotal: amountWithdrawn + amount
            }, { merge: true });

            batch.commit().then(resolve);
        })
        
    })
}

function getWithdrawn(id){
    if(!id) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('withdrawTotal' in docDate){
                    resolve(docDate.withdrawTotal)
                }else{
                    resolve(0)
                }
            }
        });
    })
}


function saveWallet(id, wallet){
    if(!id || !wallet) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.set({
            wallet: wallet
        }, { merge: true });
        return setWithMerge
    })
}

function getWallet(id){
    if(!id) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('wallet' in docDate){
                    resolve(docDate.wallet)
                }else{
                    resolve(null)
                }
            }
        });
    })
}

function saveUserData(id){

    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;
    return loadAllFromStore().then( UserData => {
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.set({
            UserData: UserData
        }, { merge: true });
        return setWithMerge
    })
}


function deleteUserData(id){

    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;

    let userRef = db.collection('users').doc(id);
    return new Promise(resolve => {
        
        userRef.get().then(doc => {

            if(doc.exists){
                let docDate = doc.data()
                if('UserData' in docDate){
                    docDate.UserData = {};
                    resolve(userRef.set(docDate, { merge: false }));
                }else{
                    resolve()
                }
            }else{
                resolve()
            }
        })
    })
}

function loadUserData({id, forceLoad } = {id: null, forceLoad : false}){
    if(!id && !Auth.uid) return Promise.resolve();
    id = id || Auth.uid;
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('UserData' in docDate || forceLoad){
                    resolve(saveAllToStore(docDate.UserData))
                }else{
                    resolve(saveUserData(id))
                }
            }else{
                resolve(saveUserData(id))
            }
        });
    })
}

function getHistory(id, out){
    if(!id) return Promise.resolve();
    if(out instanceof Array){

        let userRef = db.collection('users').doc(id);
        userRef.onSnapshot(doc => {
            if(doc.exists){
                let docDate = doc.data();
                out.length = 0;
                if('withdraw' in docDate){
                    for( let [key, value] of Object.entries(docDate.withdraw)){
                        out.push({date:key,...value})
                    }
                }
            }
        })

    }else{

        return new Promise(resolve => {
            let userRef = db.collection('users').doc(id);
            userRef.get().then(doc => {
                if(doc.exists){
                    let docDate = doc.data()
                    if('withdraw' in docDate){
                        let withdrawArr = [];
                        for( let [key, value] of Object.entries(docDate.withdraw)){
                            withdrawArr.push({date:key,...value})
                        }
                        resolve(withdrawArr);

                    }else{
                        resolve([])
                    }
                }
            });
        })
    }
}


var menusCache = null ;
function getCatsMenu(){
    if( menusCache ) return Promise.resolve(menusCache)
    return new Promise(resolve => {
        let userRef = db.collection('catsMenu');
        userRef.get().then(doc => {
            if( !doc.empty ){
                let menus = doc.docs.find(menu => menu.id == 'v1');
                menus = menus.data() || {};
                menusCache = menus;
                resolve(menus);
            }else{
                resolve({});
            }
        });
    })
}

//var catsCache = null;
function getCatsCards(path){
    //if( catsCache ) return Promise.resolve(catsCache)
    return new Promise(resolve => {

        let userRef = path.split('/').reduce((db, p, idx) => {
            if(idx % 2){
                return db.doc(p)
            }else{
                return db.collection(p)
            }
        }, db);
        
        userRef.get().then(async doc => {
            
            let allDocs = [];
            if( 'exists' in doc && doc.exists){
                let docData = doc.data();
                let docDataColl = []
                if('collections' in docData){
                    docDataColl = await docData.collections.reduce(async(docs, coll ,idx) => {
                        let oldDocs = await docs;
                        let newDoc =  await getCatsCards(`${path}/${coll}`);
                        return Promise.resolve(oldDocs.concat(newDoc))
                        }, Promise.resolve([]))
                }
                docDataColl.push(docData)
                return resolve(docDataColl)

            }
            if( 'empty' in doc && !doc.empty ){
                let cats = doc.docs.map(cat => cat.data());
                //catsCache = cats;
                return resolve(cats);
            }
        });
    })
}

function getCoinName(){
    return "IMP"
}

function checkCaptcha(resp) {
    return fetch(`https://quizi.io/api/checkCaptcha`,{
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'},
        mode: 'cors',
        body: 'resp=' + resp
    })
}


const Api = {
    getCard,
    getQuizzesIds,
    getCardByIds,
    changeScoresPolls,
    getUserById,
    auth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    subscription,
    addReview,
    withdraw,
    getWithdrawn,
    getWallet,
    saveWallet,
    saveUserData,
    loadUserData,
    getHistory,
    getCatsMenu,
    getCatsCards,
    getAdditionlCardInfo,
    getCoinName,
    deleteUserData,
    create,
    checkCaptcha
}
export default Api;