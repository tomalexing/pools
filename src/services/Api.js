import fire from './../config'
import firebase from 'firebase';
import 'firebase/firestore';
import { loadAllFromStore, saveAllToStore } from './localDb';
import Auth from '../models/Auth';

const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings)

var getQuizzesIds = (query) => (models) => {
    
    return new Promise((resolve, reject) => {
        db.collection('quizzes').onSnapshot(snap => {
            console.log(snap.docs[0])
           
            // acc.push({id: snap.docs[0].id,...snap.docs[0].data()});
                let ids = [];

                snap.docChanges.forEach(change => {
                    if(change.type == 'added' ){
                        ids.push(change.doc.id);
                    }

                    if(change.type == 'modified' ){
                    
                        // acc.map((o, idx) => { 
                        //     if(o.id == change.doc.id){
                        //         acc[idx] = {id: change.doc.id, ...change.doc.data()};
                        //     } 
                        // })
                        for(let [idx, model] of models){
                            if(model.id ==  change.doc.id){
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

function changeScoresQuizzes(id, {l,r}){
    // Create a reference to the SF doc.
    if(!id) return
    var cardRef = db.collection("quizzes").doc(`${id}`);

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
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });

}


var getPoolsIds = (query) => (models) => {
    
    return new Promise((resolve, reject) => {
        db.collection('pools').onSnapshot(snap => {
           
            // acc.push({id: snap.docs[0].id,...snap.docs[0].data()});
                let ids = [];

                snap.docChanges.forEach(change => {
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
  return new firebase.auth.GoogleAuthProvider()
}

function FacebookAuthProvider(){
  return new firebase.auth.FacebookAuthProvider();
}

function subscription(email){
    if(!email) return

    return new Promise(resolve => {
        let exist = false;
        db.collection("subscriptions").onSnapshot(snap => {

            exist = snap.docs.some( subc => subc.data().email === email )
            if(!exist)
                db.collection("subscriptions").add({
                    email: email
                })
            resolve(exist)
        })
    })
}

function addReview(id, name, question, email){
    if(!id || !name || !question || !email) return
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.set({
            review: {[(new Date).toISOString()]:{name, question, email}}
        }, { merge: true });
        return setWithMerge
    })
}


function withdraw(id, amount){
    if(!id || !amount) return
    var batch = db.batch();

    return new Promise(resolve => {

        Api.getWithdrawn(id).then( amountWithdrawn  => {
            let userRef = db.collection('users').doc(id);
            batch.set(userRef, {
                withdraw: {[(new Date).toISOString()]:{amount}}
            }, { merge: true });
            batch.set(userRef, {
                withdrawTotal: amountWithdrawn + amount
            }, { merge: true });

            batch.commit().then(resolve);
        })
        
    })
}

function getWithdrawn(id){
    if(!id) return
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
    if(!id || !wallet) return
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.set({
            wallet: wallet
        }, { merge: true });
        return setWithMerge
    })
}

function getWallet(id){
    if(!id) return
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

    if(!id && !Auth.uid) return
    id = id || Auth.uid;
    return loadAllFromStore().then( UserData => {
        console.log(UserData)
        let userRef = db.collection('users').doc(id);
        var setWithMerge = userRef.set({
            UserData: UserData
        }, { merge: true });
        return setWithMerge
    })
}

function loadUserData(id){
    if(!id && !Auth.uid) return
    id = id || Auth.uid;
    return new Promise(resolve => {
        let userRef = db.collection('users').doc(id);
        userRef.get().then(doc => {
            if(doc.exists){
                let docDate = doc.data()
                if('UserData' in docDate){
                    resolve(saveAllToStore(docDate.UserData))
                }else{
                    resolve(saveUserData(id))
                }
            }
        });
    })
}

const Api = {
    getCard,
    getQuizzesIds,
    getPoolsIds,
    changeScoresQuizzes,
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
    loadUserData
}
export default Api;