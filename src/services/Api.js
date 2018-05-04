import fire from './../config'
import firebase from 'firebase';
import 'firebase/firestore';


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
    var cardRef = db.collection("quizzes").doc(id);

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

function getChild(path) {
  return db.child(path)
}

function getRef(path) {
    return db.ref(path)
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

const Api = {
    getCard,
    getQuizzesIds,
    getPoolsIds,
    changeScoresQuizzes,
    getChild,
    getRef,
    auth,
    GoogleAuthProvider,
    FacebookAuthProvider
}
export default Api;