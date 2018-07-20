var admin = require("firebase-admin");
var fs = require("fs")
var serviceAccount = require("./../../quiz-public-firebase-adminsdk-pluom-8bc3c73196.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-public.firebaseio.com"
});



function listAllUsers(nextPageToken) {
// List batch of users, 1000 at a time.
admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
    listUsersResult.users.forEach( function(userRecord) {
        fs.writeFileSync(`users.txt`,  JSON.stringify( userRecord.toJSON())+ '\n\n', {flag: 'a'});
    });
    if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
    }
    })
    .catch(function(error) {
    console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();