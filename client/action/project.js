import {
    CREATE_PROJECT,
    READALL_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from './action-type'
import axios from 'axios'
import { parseResponse, parseError } from './index'

const BASE_URL = 'http://localhost:3000/api'


export function createProject(project) {
    return function (dispatch) {

        axios({
            method: 'post',
            url: `${BASE_URL}/projects`,
            data: project,
            //config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                dispatch({
                    type: CREATE_PROJECT,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                console.log(error)
                dispatch(parseError(error.response))
            })
    }
}


export function readAllProjects() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/projects`
        })
            .then((response) => {
                //console.log(response.data)
                dispatch({
                    type: READALL_PROJECT,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function updateProject(projectId, updatedContent) {
    return function (dispatch) {
        axios({
            method: 'put',
            url: `${BASE_URL}/projects/${projectId}`,
            data: updatedContent,
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_PROJECT,
                    payload: projectId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deleteProject(projectId) {
    return function (dispatch) {
        axios({
            method: 'delete',
            url: `${BASE_URL}/projects/${projectId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_PROJECT,
                    payload: projectId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}
/*
export function creatEntryFormOffer(entry, history) {
    return function (dispatch) {
        console.log('entry', entry)
        axios.all([
            axios.post(`${BASE_URL}/newEntry`, entry),
            axios.put(`${BASE_URL}/workflows/${entry.workflow}`, { status: 'hrAdministration' })
        ])
            .then(axios.spread((entryResponse, workflowResponse) => {
                console.log('workflowResponse', workflowResponse)
                console.log('entreyResponse', entryResponse)
                dispatch({
                    type: CREATE_ENTRY,
                    payload: entryResponse.data
                })
                dispatch({
                    type: UPDATE_WORKFLOW,
                    payload: entry.workflow
                })
                dispatch(parseResponse(entryResponse.status))
                history.push('/dashboard/offers')
            }))
            .catch((error) => {
                console.log(error)
                dispatch(parseError(error.response))
                history.push('/')
            })
    }

}

export function updateEntry(id, entry, history) {
    return function (dispatch) {
        axios({
            method: 'put',
            url: `${BASE_URL}/entries/${id}`,
            data: entry,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_ENTRY,
                    payload: id
                })
                dispatch(parseResponse(response.status))
                notification['success']({
                    message: 'Your entry has been updated !',
                    duration: 0,
                })
                //history.push('/dashboard/offers')
            })
            .catch((error) => {
                dispatch(parseError(error.response))
                history.push('/')
            })
    }

}

export function getEntries() {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/entries`
        })
            .then((response) => {
                dispatch({
                    type: GET_ALLENTRIES,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })

            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function getEntry(id) {
    return function (dispatch) {
        axios({
            method: 'get',
            url: `${BASE_URL}/entries/${id}`
        })
            .then((response) => {
                dispatch({
                    type: GET_ENTRY,
                    payload: response.data
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
            })
    }

}

export function deleteEntry(entryId) {
    return function (dispatch) {
        axios({
            method: 'delete',
            url: `${BASE_URL}/entries/${entryId}`
        })
            .then((response) => {
                dispatch({
                    type: DELETE_ENTRY,
                    payload: entryId
                })
                dispatch(parseResponse(response.status))
            })
            .catch((error) => {
                dispatch(parseError(error.response))
                console.log('deleteOffer error', error)
            })
    }

}
*/

