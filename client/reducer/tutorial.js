import {
    CREATE_TUTORIAL
} from '../action/action-type'

const initialState = {
    tutorials: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_TUTORIAL:
        return {
            tutorials: [...state.tutorials, action.payload]
        }
    default:
        return state
    }
}