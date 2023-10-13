const { query } = require("express");
const firebaseAdmin = require("./firebase.js");
const db = firebaseAdmin.firestore();

async function getUser(email) {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (querySnapshot.empty) {
        return null;
    }
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
}

async function checkUserExists(email, password) {
    const usersRef = db.collection("users");
    const snapshot = await usersRef
        .where("email", "==", email)
        .where("password", "==", password)
        .get();
    if (snapshot.empty) {
        return false;
    } else {
        return true;
    }
}

async function getQuestion(title) {
    try {
        const questionsRef = db.collection("questions");
        const querySnapshot = await questionsRef
            .where("title", "==", title)
            .get();
        if (querySnapshot.empty) {
            return null;
        } else {
            return querySnapshot.docs[0].data();
        }
    } catch (error) {
        console.error(error);
    }
}

async function getAllQuestions() {
    try {
        const questionsRef = db.collection("questions");
        const querySnapshot = await questionsRef.get();
        if (querySnapshot.empty) {
            return null;
        } else {
            const questions = [];
            querySnapshot.forEach((doc) => {
                questions.push(doc.data());
            });
            return questions;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUser, checkUserExists, getQuestion, getAllQuestions };
