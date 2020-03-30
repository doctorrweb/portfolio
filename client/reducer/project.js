import {
    CREATE_PROJECT
} from '../action/action-type'

const initialState = {
    projects: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_PROJECT:
        return {
            projects: [...state.projects, action.payload]
        }
    default:
        return state
    }
}