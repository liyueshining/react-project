import {TOTAL_TIME_SHOW, INSTALL_PERCENT_SHOW, LOG_SHOW, CONVERT_PROGRESS_BG_COLOR, INSTALL_REQUEST_START,
    INSTALL_REQUEST_FAIL, INSTALL_REQUEST_OVER
} from "../constants/const";
import {combineReducers} from "redux";

const isFetching = (state=false, action) => {
    switch (action.type){
        case INSTALL_REQUEST_START:
            return true
        case INSTALL_REQUEST_FAIL:
        case INSTALL_REQUEST_OVER:
            return false
        default:
            return false
    }
}

const totalTime = (state = 0, action) => {
    switch (action.type){
        case TOTAL_TIME_SHOW:
            return action.totalTime
        default:
            return state
    }
}

const installPercent = (state = 0, action) => {
    switch (action.type){
        case INSTALL_PERCENT_SHOW:
            return action.installPercent
        default:
            return state
    }
}

const bgColor = (state = '#00abff', action) => {
    switch (action.type){
        case CONVERT_PROGRESS_BG_COLOR:
            return action.value
        default:
            return state
    }
}

const info = (state = '', action) => {
    switch (action.type){
        case LOG_SHOW:
            return action.info
        default:
            return state
    }
}

function timer(state = {pollingTimer: undefined}, action){
    switch (action.type) {
        case 'SAVE_POLLING_TIMER':
            return Object.assign({}, state, {pollingTimer: action.timer});

        case 'CLEAR_POLLING_TIMER':
            return Object.assign({}, state, {pollingTimer: undefined});

        default:
            return state;
    }
}

const install = combineReducers({
    isFetching,
    totalTime,
    installPercent,
    bgColor,
    info,
    timer
})

export default install

export const getIsFetching = (state) => state.isFetching
export const getTotalTime = (state) => state.totalTime
export const getInstallPercent = (state) => state.installPercent
export const getBgColor = (state) => state.bgColor
export const getInfo = (state) => state.info

