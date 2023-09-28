const db = getFirestore();
const auth = getAuth();

async function getUser(uid) {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("uid", "==", uid).limit(1).get();
    if (snapshot.empty) {
        throw new Error("No user with the specified UID");
    } else {
        const userData = snapshot.docs[0].data();
        return userData;
    }
}

async function checkUserExists(email, password) {
    const usersRef = db.collection("users");
    const snapshot = usersRef
        .where("email", "==", email)
        .where("password", "==", password)
        .get();
    if (snapshot.empty) {
        return false;
    } else {
        return true;
    }
}

module.exports(getUser, checkUserExists);
