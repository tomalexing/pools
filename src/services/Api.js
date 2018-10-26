import fire from './../config'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { loadAllFromStore, saveAllToStore } from './localDb';
import Auth from '../models/Auth';
import {sleep} from './../utils.js'
const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings)

let userPoint = 'newUserStore';

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

var getCardByIds = (query) => async (models) => {
    let info = await getAdditionlCardInfo(query);
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
                resolve({ids, info});
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

function changeScoresPolls(slug ,id, {l,r}){
    // Create a reference to the SF doc.

    if (!id || !slug) return Promise.resolve();
    var cardRef = db.collection(slug.substr(1)).doc(`${id}`);

    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(cardRef).then(function(cardDoc) {
            if (!cardDoc.exists) {
                throw "Document does not exist!";
            }
            let oldCardDocData = cardDoc.data(),
                newLeft = Math.max(0, oldCardDocData.answers.l.quantity + l),
                newRight = Math.max(0, oldCardDocData.answers.r.quantity + r),
                newAnswers = Object.assign({},oldCardDocData);
                newAnswers.answers.l.quantity = newLeft;
                newAnswers.answers.r.quantity = newRight;
            transaction.update(cardRef, newAnswers);
        });
    }).then(function() {
       // console.log("Transaction successfully committed!");
    })

}


// var getQuizzesIds = (query) => (models) => {
    
//     return new Promise((resolve, reject) => {
//         db.collection(`${query}`).orderBy("order").onSnapshot(snap => {
                
//                 if(snap.empty) return resolve([]);
//             // acc.push({id: snap.docs[0].id,...snap.docs[0].data()});
//                 let ids = [];
//                 snap.docChanges().forEach(change => {
//                     if(change.type == 'added' ){
//                         ids.push(change.doc.id);
//                     }

//                 })
//                 resolve(ids);
//             })
//     })
    
// }


function getUserById(id){
    if(!id) return db.collection(userPoint)
    return db.collection(userPoint).doc(id);
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


function withdraw(id, amount, wallet, idToken, resp, detailed){
    if(!id || !amount || !wallet) return Promise.resolve();
    var batch = db.batch();

    return new Promise(resolve => {

        Api.getWithdrawn(id).then( amountWithdrawn  => {
            let userRef = db.collection(userPoint).doc(id);
            batch.set(userRef, {
                withdraw: {[(new Date).toISOString()]:{amount, wallet, responce: resp}}
            }, { merge: true });
            batch.set(userRef, {
                withdrawTotal: amountWithdrawn + amount
            }, { merge: true });
            batch.set(userRef, {
                withdrawDetailed: detailed
            }, { merge: true });

            batch.commit().then(resolve);
        })
        
    })
}

function getWithdrawn(id){
    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;
    return new Promise(resolve => {
        let userRef = db.collection(userPoint).doc(id);
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

function getWithdrawDetailed(id){
    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;
    return new Promise(resolve => {
        let userRef = db.collection(userPoint).doc(id);
        var setWithMerge = userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('withdrawDetailed' in docDate){
                    resolve(docDate.withdrawDetailed)
                }else{
                    resolve(0)
                }
            }
        });
    })
}

function getBalance(id){
    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;

    return new Promise(resolve => {
        let userRef = db.collection(userPoint).doc(id);
        var setWithMerge = userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('balance' in docDate){
                    resolve(docDate.balance)
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
        let userRef = db.collection(userPoint).doc(id);
        var setWithMerge = userRef.set({
            wallet: wallet
        }, { merge: true });
        return setWithMerge
    })
}

function getWallet(id){
    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;
    var field = 'wallet';

    if(Auth.role && Auth.role == 'business'){
        field = Auth.role + 'wallet';
    }

    return new Promise(resolve => {
        let userRef = db.collection(userPoint).doc(id);
        userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()

                if(field in docDate){
                    resolve(docDate[field])
                }else{
                    resolve(null)
                }
            }
        });
    })
}

function getRole(id){
    if(!id) return Promise.resolve();
    return new Promise(resolve => {
        let userRef = db.collection(userPoint).doc(id);
        userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('role' in docDate){
                    resolve(docDate.role)
                }else{
                    resolve(9)
                }
            }
        });
    })
}

function saveUserData(id){

    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;
    return loadAllFromStore().then( UserData => {
        let userRef = db.collection(userPoint).doc(id);
        var setWithMerge = userRef.set({
            UserData: UserData
        }, { merge: true });
        return setWithMerge
    })
}


function saveReferral(place, slug, id){
    return async function() {
        let cardsRef = db.collection( slug.substr(0, slug.indexOf('/')) ).doc(`${id}`);        

        return db.runTransaction(function(transaction) {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(cardsRef).then(function(cardDoc) {
                if (!cardDoc.exists) {
                    throw "Document does not exist!";
                }

                let cardsDocData = cardDoc.data();

                if(cardsDocData.referral){
                    Object.assign(cardsDocData.referral, {[place]: place in cardsDocData.referral ? ++cardsDocData.referral[place] : 1});
                }else{
                    cardsDocData.referral = {[place]: 1};
                }
            
                transaction.update(cardsRef, cardsDocData);
            });
        }).then(function() {
        // console.log("Transaction successfully committed!");
        })
    }

}


function loadReferral(slug, id){

    if(!slug || !id) return Promise.resolve();

    let ref = db.collection( slug ).doc( id );        
    return new Promise(resolve => {
        ref.get().then(doc => {

            if(doc.exists){
                let docDate = doc.data()
                if('referral' in docDate){
                    resolve(docDate.referral);
                }else{
                    resolve()
                }
            }else{
                resolve()
            }
        })
  
    })

}


function deleteUserData(id){

    if(!id && !Auth.uid) return Promise.resolve();

    id = id || Auth.uid;

    let userRef = db.collection(userPoint).doc(id);
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
        let userRef = db.collection(userPoint).doc(id);
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

        let userRef = db.collection(userPoint).doc(id);

        userRef.onSnapshot(doc => {
            if(doc.exists){
                let docDate = doc.data();
                out.length = 0;
                if('withdraw' in docDate){
                    for( let [key, value] of Object.entries(docDate.withdraw)){
                        out.push({date: key, ...value});
                    }
                }
            }
        });

    }else{

        return new Promise(resolve => {
            let userRef = db.collection(userPoint).doc(id);
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

        let collectionRef = path.split('/').reduce((db, p, idx) => {
            if(idx % 2){
                return db.doc(p)
            }else{
                return db.collection(p)
            }
        }, db);
        
        collectionRef.get().then(async doc => {
            
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

async function setValueInCatalog(label, value, path, id){
    await setInCategories(label, id, value);
    await setInEntity(label, path, value);
}


async function setInEntity(label, path, value){
    if (!path) return Promise.resolve();

    let [_ ,coll, id] = path.replace('/v1','').split('/');
    let cardRef = await db.collection(coll).doc(id).get();
    let cardData = await cardRef.data();
    cardData[label] = value;
    await cardRef.ref.set(cardData);
    
}

//var catsCache = null;
function setInCategories(label, id, value, path = 'categories'){
    //if( catsCache ) return Promise.resolve(catsCache)

    return new Promise(resolve => {

        let collectionRef = path.split('/').reduce((db, p, idx) => {
            if(idx % 2){
                return db.doc(p)
            }else{
                return db.collection(p)
            }
        }, db);

        collectionRef.get().then(async doc => {

            // 
            if( 'empty' in doc && !doc.empty){
                let resolver = null
                Array.from(doc.docs).map(async catEntries => {
                    if( 'exists' in catEntries && catEntries.exists){
                        let catEntriesData = catEntries.data();
                   

                        if('id' in catEntriesData && catEntriesData.id == id){
                            catEntriesData[label] = value;
                            resolver = catEntries.ref.set(catEntriesData, { merge: false });
                        }

                        if('collections' in catEntriesData){
                            await setInCategories(label, id, value, `${path}/${catEntriesData.slug}`);
                        }
          
                    }
                })
                resolve(resolver)
            }

            // 
            if( 'exists' in doc && doc.exists ){
                let docData = doc.data();
        
                if('collections' in docData){
                    await docData.collections.reduce(async(docs, coll) => {
                        await docs;
                        await setInCategories(label, id, value, `${path}/${coll}`);
                        return Promise.resolve()
                        }, Promise.resolve())
                }
                return resolve()

            }
        });
    })
}

function getCoinName(){
    return "IMPL"
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

async function ourApi(path, fetchBody) {

    return await fetch(`${window.location.protocol}//${window.location.hostname}/api/${path}`,{
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'Accept': 'application/json'},
        mode: 'cors',
        body: JSON.stringify(fetchBody)
    })
    .then(resp => resp.json())
    .catch(error =>  {
        console.trace(error.stack);
    });
}

async function getRequestsContact({uid}){

    if (!uid) return Promise.resolve([]);

    return new Promise(async resolve => {
        let contactRef = await db.collection('contact');
        let contacts = await contactRef.get();
        contacts = contacts.docs.map(contact => {
            return [{id: contact.id, data: contact.data()}];
        });
        return resolve(contacts);
    })
}

async function getRequestsCreateNew({uid}){
    if (!uid) return Promise.resolve([]);

    return new Promise(async resolve => {
        let createRef = await db.collection('createNew');
        let creates = await createRef.get();
        creates = creates.docs.map(create => {
            return [{id: create.id, data: create.data()}];
        });
        return resolve(creates);
    })
}

async function getRequestsSubscriptions({uid}){
    if (!uid) return Promise.resolve([]);

    return new Promise(async resolve => {
        let subscriptionsRef = await db.collection('subscriptions');
        let subscriptions = await subscriptionsRef.get();
        subscriptions = subscriptions.docs.map(subscription => {
            return [{id: subscription.id, data: subscription.data()}];
        });
        return resolve(subscriptions);
    })
}

async function loadCBTicker(ticker){
    if (!ticker) return Promise.resolve({});

    return fetch(`https://api.crypto-bridge.org/api/v1/ticker/${ticker}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(r => r.json()).catch( _ => {})
}

const Api = {
    getCard,
   // getQuizzesIds,
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
    getWithdrawDetailed,
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
    checkCaptcha,
    getRole,
    saveReferral,
    loadReferral,
    getBalance,
    setValueInCatalog,
    ourApi,
    getRequestsContact,
    getRequestsCreateNew,
    getRequestsSubscriptions,
    loadCBTicker
}
export default Api;