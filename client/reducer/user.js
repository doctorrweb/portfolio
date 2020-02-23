import { SET_CURRENT_USER } from '../action/action-type'

const initialState = {
    user: {}
}

export default function SetUserReducer(state = initialState, action) {
    switch (action.type) {
    case SET_CURRENT_USER:
        return {
            user: action.payload
        }
    default:
        return state
    }
}
