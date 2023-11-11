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

async function addQuestion(title, categories, difficulty, content, visits) {
    try {
        const data = {
            title: title,
            categories: categories,
            difficulty: difficulty,
            content: content,
            visits: visits
        };
        const res = await db.collection('questions').doc(title).set(data);
        return res;
    } catch (error) {
        console.error(error);
    }
}

async function updateQuestion(title, data) {
    try {
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

module.exports = { removeUser, addUser, updateUser, addQuestion, updateQuestion, deleteQuestion };
