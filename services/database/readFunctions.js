const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();

async function getUser(email) {
    /** 
    console.log('Username:', username);
    const usersRef = db.collection("users");
    const doc = await usersRef.doc(username).get();
    return doc;
    */
   console.log('what is going on')
   console.log(email)
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();
  
    if (querySnapshot.empty) {
      return null; 
    }
    console.log(querySnapshot.docs[0])
    return querySnapshot.docs[0];
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
