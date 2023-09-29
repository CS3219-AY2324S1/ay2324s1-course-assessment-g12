const firebaseAdmin = require('./firebase.js');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const db = firebaseAdmin.firestore();

const auth = getAuth();

//function to handle log in 
async function handleLogin(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        res.status(200).send("Logged in successfully");
      } catch (error) {
        console.error('Error signing in:', error);
      }

}

// function to remove user from db
async function removeUser(username) {
    try {
        const res = await db.collection('users').doc(username).delete();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

async function addUser(username, email, password, language, level) {
    try {
        const data = {
            username: username,
            email: email,
            password: password,
            language: language,
            level: level,
        };
        const res = await db.collection('users').doc(username).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { handleLogin, removeUser, addUser };
