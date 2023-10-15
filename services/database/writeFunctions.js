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

async function addUser(username, email, language, level, role, refreshToken) {
    try {
        const data = {
            username: username,
            email: email,
            language: language,
            level: level,
            role: role,
            refreshToken: refreshToken
        };
        const res = await db.collection('users').doc(username).set(data);
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

async function addQuestion(title, category, difficulty, description, tags) {
    try {
        const data = {
            title: title,
            category: category,
            difficulty: difficulty,
            description: description,
            tags: tags
        };
        const res = await db.collection('questions').doc(title).set(data);
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

module.exports = { removeUser, addUser, updateUser, addQuestion, deleteQuestion, addQuestionToUser };
