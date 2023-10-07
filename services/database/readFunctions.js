const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();

async function getUser(email) {

    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();
  
    if (querySnapshot.empty) {
      return null; 
    }
    console.log(querySnapshot.docs[0].data())
    return querySnapshot.docs[0].data();
}

async function checkUserExists(email, password) {
    const usersRef = db.collection("users");
    const snapshot = await usersRef
        .where("email", "==", email)
        .where("password", "==", password)
        .get();
    if (snapshot.empty) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getUser, checkUserExists };
