const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

//function to handle log in 
async function handleLogin(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
   
      } catch (error) {
        console.error('Error signing in:', error);
      }

}


// function to remove user from db
async function removeUser(userID) {
    try {
        const res = await db.collection('users').doc(userID).delete();
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function addUser(username, email, password, language, level, uid) {
    try {
        const data = {
            username: username,
            email: email,
            password: password,
            language: language,
            level: level,
        };
        const res = await db.collection('users').doc(username + ' ' + uid).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

module.exports( handleLogin, removeUser, addUser );