import {
    CREATE_CLIENT
} from '../action/action-type'

const initialState = {
    clients: []
}

export default function (state = initialState, action) {
    switch (action.type) {
    case CREATE_CLIENT:
        return {
            clients: [...state.clients, action.payload]
        }
    default:
        return state
    }
}