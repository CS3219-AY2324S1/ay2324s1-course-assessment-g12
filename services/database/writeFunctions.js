const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();


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

module.exports = { removeUser, addUser }