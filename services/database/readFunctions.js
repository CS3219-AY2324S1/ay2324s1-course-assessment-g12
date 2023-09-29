const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();

async function getUser(username) {
    const usersRef = db.collection("users");
    const doc = await usersRef.doc(username).get();
    return doc;
}

async function checkUserExists(email, password) {
    const usersRef = db.collection("users");
    const snapshot = usersRef
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
