import axios from 'axios';
import 'dotenv/config'

const kubernetesURL = "http://35.198.205.80";

const userApi = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'local'
    ? 'http://user:3001'
    : kubernetesURL,
});

const questionApi = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'local'
    ? 'http://question:3002'
    : kubernetesURL,
});

const matchingApi = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'local'
    ? 'http://matching:3003'
    : kubernetesURL,
});

const databaseApi = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'local'
    ? 'http://database:3005'
    : 'http://database-service-service.default.svc.cluster.local:3005',
});

module.exports = { userApi, questionApi, matchingApi, databaseApi };