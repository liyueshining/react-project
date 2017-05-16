import {PERCENT_SHOW, PERCENT_HIDE} from "../constants/const";

const percent = (state = 0, action) => {
    switch (action.type) {
        case PERCENT_SHOW:
            return action.percent

        case PERCENT_HIDE:
            return 0

        default:
            return state
    }
}

export default percent

export const getPercent = (state) => {
    return state.percent
}
