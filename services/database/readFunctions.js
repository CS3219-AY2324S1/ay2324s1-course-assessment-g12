const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();

async function getUser(username) {
    try {
        const user = await db.collection('users').doc(username).get();
        return user;        
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUser }