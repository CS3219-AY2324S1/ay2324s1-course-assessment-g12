const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getUser(uid) {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('uid', '==', uid).limit(1).get();
    if (snapshot.empty) {
        throw new Error('No user with the specified UID')
    } else {
        const userData = snapshot.docs[0].data();
        return userData; 
    }
}

module.exports( getUser )