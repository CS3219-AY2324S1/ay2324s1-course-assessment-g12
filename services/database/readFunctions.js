const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth(); 

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

async function checkUserExists(req, res) {
    const { email, password } = req.body;
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = [];
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      res.status(200).json({ userExists: true });
    } else {
      res.status(200).json({ userExists: false });
    }
  }

module.exports( getUser, checkUserExists )