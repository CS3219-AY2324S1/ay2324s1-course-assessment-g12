const firebaseAdmin = require('./firebase.js');
const db = firebaseAdmin.firestore();

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

async function addUser(username, email, language, level) {
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

module.exports( handleLogin, removeUser, addUser );
