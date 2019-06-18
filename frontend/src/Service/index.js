import axios from 'axios';

const baseURL = "http://prod.n4z2b4sa5b.ca-central-1.elasticbeanstalk.com/"
// const baseURL = "http://localhost:3000/"
axios.defaults.baseURL = baseURL;

export default class API {
    static getCategories = async () => {
        return await axios.get(`/api/categories`)
    }

    static getHistory = async (category) => {
        return await axios.get(`/api/history/github?category=${category}`)
    }

    static getGithubAccessToken = async (code) => {
        return await axios.get(`/api/auth/github/accesstoken?code=${code}`)
    }
}