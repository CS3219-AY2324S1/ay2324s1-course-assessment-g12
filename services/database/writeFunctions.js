const firebaseAdmin = require('./firebase.js');

const db = firebaseAdmin.firestore();

async function removeUser(username) {
    try {
        const res = await db.collection('users').doc(username).delete();
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

async function addUser(data) {
    try {
        const res = await db.collection('users').doc(data.username).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(username, data) {
    try {
        const res = await db.collection('users').doc(username).update(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function addQuestion(title, categories, difficulty, content) {
    try {
        const data = {
            title: title,
            categories: categories,
            difficulty: difficulty,
            content: content
        };
        const res = await db.collection('questions').doc(title).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function updateQuestion(title, data) {
    try {
        console.log(data)
        const res = await db.collection('questions').doc(title).update(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function deleteQuestion(title) {
    try {
        const res = await db.collection('questions').doc(title).delete();
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function addQuestionToUser(username, question, partner, completed, date, code) {
    try {
        const questionData = {
            question: question,
            partner: partner,
            completed: completed,
            date: date,
            code: code
        }
        const userQuestionRef = db.collection('users').doc(username).collection('questions').doc(question);
        var res;
        if (userQuestionRef.exists) {
            res = await db.collection('users').doc(username).collection('questions').doc(question).update(questionData);
        } else {
            res = await db.collection('users').doc(username).collection('questions').doc(question).set(questionData);
        }
        return res;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { removeUser, addUser, updateUser, addQuestion, updateQuestion, deleteQuestion, addQuestionToUser };
