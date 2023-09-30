const firebaseAdmin = require('./firebase.js');

const db = firebaseAdmin.firestore();

const auth = firebaseAdmin.auth();

//function to handle log in 
async function handleSignup(email, password) {
    try {
        await auth.createUser({email: email, password: password});
        return 200;
      } catch (error) {
        console.error('Error signing in:', error);
      }

}

async function handleLogin(email, password) {
    try {
       
        const userRecord = await auth.getUserByEmail(email);
        console.log(userRecord.password)
        console.log(password)
        if (userRecord && userRecord.password === password) {
          console.log('User logged in successfully.');
        } else {
          console.error('Invalid credentials.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
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

module.exports = { handleLogin, handleSignup, removeUser, addUser };
