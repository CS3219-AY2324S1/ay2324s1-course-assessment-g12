const firebaseAdmin = require("./firebase.js");
const db = firebaseAdmin.firestore();

async function getUser(criteria, flag) {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where(`${flag}`, "==", criteria).get();

    if (querySnapshot.empty) {
        return null;
    }
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
}

async function checkUserExists(email) {
    const usersRef = db.collection("users");
    const snapshot = await usersRef
        .where("email", "==", email)
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
        const questionsRef = db.collection("questions").limit(20);
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

async function getQuestionsByCategories(categories, difficulty, limit) {
    
    try {
        const questionsRef = db.collection("questions");
        var querySnapshot;
        if (limit === undefined) {
            querySnapshot = await questionsRef
                .where("categories", "array-contains-any", categories) 
                .orderBy("visits").get();
        } else {
            querySnapshot = await questionsRef
                .where("categories", "array-contains-any", categories)
                .orderBy("visits", "desc").limit(parseInt(limit)).get();
        }

        if (querySnapshot.empty) {
            return null;
        } else {
            const questions = [];
            querySnapshot.forEach((doc) => {
                if (categories.every(category => doc.data().categories.includes(category))) questions.push(doc.data());
            });
            return questions;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getQuestionsFromUser(username) {
    try {
        const questions = [];
        const questionsRef = db.collection("users").doc(username).collection("questions");
        const querySnapshot = await questionsRef.get();

        if (querySnapshot.empty) {
            return null;
        }

        const questionPromises = querySnapshot.docs.map(async (completedQuestion) => {
            const questionsDesc = await db.collection("questions").doc(completedQuestion.data().question).get();
            return Object.assign({}, completedQuestion.data(), questionsDesc.data());
        });

        const questionData = await Promise.all(questionPromises);
        questionData.forEach((question) => {
            questions.push(question);
        });

        if (querySnapshot.size === questions.length) return questions;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUser, checkUserExists, getQuestion, getAllQuestions, getQuestionsByCategories, getQuestionsFromUser };
