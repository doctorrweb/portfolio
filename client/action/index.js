import {
    SET_AUTHENTICATION,
    SET_CURRENT_USER,
    PARSE_RESPONSE,
    PARSE_ERROR,
    RESET_RESPONSE,
    RESET_ERROR,
    LOCALE_SET,
    SHOW_MODALLOGIN
} from './action-type'

import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../helper/authToken'

const BASE_URL = 'http://localhost:8080/api'

export function setAuthentication(isLoggedIn) {
    return {
        type: SET_AUTHENTICATION,
        payload: isLoggedIn
    }
}

export const localeSet = lang => ({
    type: LOCALE_SET,
    payload: lang
})

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export function setLocale(lang) {
    return function(dispatch) {
        localStorage.alhubLang = lang
        dispatch(localeSet(lang))
    }
}

export const showModalLogin = modalLogin => ({
    type: SHOW_MODALLOGIN,
    payload: modalLogin
})

export function parseResponse(status) {
    return {
        type: PARSE_RESPONSE,
        payload: status
    }
}

export function resetResponse() {
    return {
        type: RESET_RESPONSE
    }
}

export function parseError(status) {
    return {
        type: PARSE_ERROR,
        payload: status
    }
}

export function resetError() {
    return {
        type: RESET_ERROR
    }
}

export function loginUser(user) {
    console.log('user', user)
    return function(dispatch) {
        axios
            .post(`${BASE_URL}/signin`, user)
            .then(response => {
                console.log('response', response)
                const { token } = response.data
                localStorage.setItem('token', token)
                setAuthorizationToken(token)
                dispatch(setCurrentUser(jwt.decode(token)))
                dispatch(setAuthentication(true))
                dispatch(parseResponse(response.status))
            })
            .catch(error => {
                dispatch(parseError(error.response.status))
            })
    }
}

export function logonUser(user, history) {
    console.log('logonUser user', user)
    return function(dispatch) {
        axios
            .post(`${BASE_URL}/signup`, user)
            .then(response => {
                dispatch(parseResponse(response.status))
                history.push('/')
            })
            .catch(error => {
                dispatch(parseError(error.response.status))
            })
    }
}

export function logoutUser() {
    return function(dispatch) {
        dispatch(setAuthentication(false))
        dispatch(setCurrentUser({}))
        localStorage.removeItem('token')
    }
}