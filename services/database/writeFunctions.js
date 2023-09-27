const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


// function to remove user from db
async function removeUser(userID) {
    try {
        const res = await db.collection('users').doc(userID).delete();
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function addUser(username, email, language, level) {
    try {
        const data = {
            username: username,
            email: email,
            language: language,
            level: level,
        };
        const res = await db.collection('users').doc(username).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

module.exports( removeUser, addUser );