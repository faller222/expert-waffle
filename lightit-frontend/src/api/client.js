const axios = require('axios')

const medic = axios.create({baseURL: 'https://lightit-backend.herokuapp.com/'})
// const medic = axios.create({baseURL: 'http://localhost:8080/'})
let _token = null

const examples = require('../features/diagnosis/examples.json')

module.exports = {
    setToken(token) {
        _token = token
    },
    users: {
        auth(username, password) {
            console.log(username, password)
            return medic.post('users/auth/',{username, password})
        },
        create(data) {
            return medic.post('users/', data)
        },
        update(username, data) {
            const headers = {Authorization: 'Bearer ' + _token}
            return medic.patch(`users/${username}`, data, {headers})
        },
    },
    medic: {
        symptoms() {
            const headers = {Authorization: 'Bearer ' + _token}
            return medic.get('medic/symptoms', {headers})
        },
        diagnosis(symptoms, gender, year_of_birth) {
            const headers = {Authorization: 'Bearer ' + _token}
            const params = {symptoms:`[${symptoms.join(',')}]`, gender, year_of_birth}
            return medic.get('medic/diagnosis', {headers, params})
        },
    },
    diagnosis: {
        create(diagnosis) {
            console.log("Persisting Diagnosis", diagnosis)
        },
        get() {
            console.log("Getting Diagnosis")
            return examples
        }
    }

}