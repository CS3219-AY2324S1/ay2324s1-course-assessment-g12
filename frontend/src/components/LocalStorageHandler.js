const id_key = "id";
const axios = import("axios");
const questionsURL = "http://question:3002/questions";
const questionURL = "http://question:3002/question";

async function getAllQuestions() {
    const response = await axios.get(questionsURL);
    if (response.status === 404) {
        return "no such item";
    } else if (response.status === 500) {
        return "server error";
    }

    const items = response.data;
    return items;
}

async function getQuestion(title) {
    const response = await axios.get(questionURL, { params: { title: title } });
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
        await axios.delete(questionURL, { params: { title: title } });
        return title + " deleted";
    } catch (error) {
        return error;
    }
}

function postQuestion(data) {
    try {
        const response = axios.post(questionURL, data);
        return "Question added";
    } catch (error) {
        return error;
    }
}

export { postQuestion, deleteQuestions, getAllQuestions, getQuestion };
