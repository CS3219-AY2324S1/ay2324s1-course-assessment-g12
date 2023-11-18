const id_key = "id";
const axios = import("axios");
const questionsURL = "http://localhost:3002/questions";
const questionURL = "http://localhost:3002/question";
const idToken = req.header('Authorization')?.replace('Bearer ', '');

async function getAllQuestions() {
    const response = await axios.get(questionsURL, {headers: {'Authorization': idToken}});
    if (response.status === 404) {
        return "no such item";
    } else if (response.status === 500) {
        return "server error";
    }

    const items = response.data;
    return items;
}

async function getQuestion(title) {
    const response = await axios.get(questionURL, { params: { title: title } , headers: {'Authorization': idToken}});
    if (response.status === 404) {
        return "no such item";
    } else if (response.status === 500) {
        return "server error";
    }

    const item = response.data;
    return item;
}

async function deleteQuestions(title) {
    try {
        await axios.delete(questionURL, { params: { title: title }, headers: {'Authorization': idToken} });
        return title + " deleted";
    } catch (error) {
        return error;
    }
}

function postQuestion(data) {
    try {
        const response = axios.post(questionURL, data, {headers: {'Authorization': idToken}});
        return "Question added";
    } catch (error) {
        return error;
    }
}

export { postQuestion, deleteQuestions, getAllQuestions, getQuestion };
