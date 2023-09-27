const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getUser(username) {
    try {
        const user = await db.collection('users').doc(username).get();
        return user;        
    } catch (error) {
        console.error(error);
    }
}

module.exports( getUser )