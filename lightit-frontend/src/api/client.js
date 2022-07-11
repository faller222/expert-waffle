const axios = require('axios')

const medic = axios.create({baseURL: 'https://lightit-backend.herokuapp.com/'})

let _token = null

module.exports = {
    setToken(token) {
        _token = token
    },
    users: {
        auth(username, password) {
            console.log(username, password)
            return medic.post('users/auth/', {username, password})
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
            const params = {symptoms: `[${symptoms.join(',')}]`, gender, year_of_birth}
            return medic.get('medic/diagnosis', {headers, params})
        },
    },
    diagnosis: {
        create(diagnosis) {
            const headers = {Authorization: 'Bearer ' + _token}
            return medic.post('diagnosis/', diagnosis, {headers})
        },
        get() {
            const headers = {Authorization: 'Bearer ' + _token}
            return medic.get('diagnosis/', {headers})
        }
    }

}