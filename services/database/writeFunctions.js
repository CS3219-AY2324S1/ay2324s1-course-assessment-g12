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

async function updateUser(username, language, level) {
    try {
        const data = {
            language: language,
            level: level,
        };
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

module.exports = { removeUser, addUser, updateUser, addQuestion, deleteQuestion };
