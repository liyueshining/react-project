import {NOTIFICATION_SHOW, NOTIFICATION_HIDE} from "../constants/const";

const result = (state = '', action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return action.text

        case NOTIFICATION_HIDE:
            return ''

        default:
            return state
    }
}

export default result

export const getResult = (state) => {
    return state.result
}
