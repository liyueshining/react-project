import {NOTIFICATION_SHOW, NOTIFICATION_HIDE, PERCENT_SHOW, PERCENT_HIDE, LOG_SHOW, TOTAL_TIME_SHOW,
    INSTALL_PERCENT_SHOW, CONVERT_PROGRESS_BG_COLOR
} from "../constants/const";

export function showNotification(params) {
    return {
        type: NOTIFICATION_SHOW,
        status: params.status,
        text: params.text
    }
}

export function hideNotification(params) {
    return {
        type: NOTIFICATION_HIDE,
        status: params.status,
        text: params.text
    }
}

export function showPercent(params) {
    return {
        type: PERCENT_SHOW,
        percent: params.percent
    }
}

export function hidePercent(params) {
    return {
        type: PERCENT_HIDE,
        percent: params.percent
    }
}

export function showTotalTime(params){
    return {
        type: TOTAL_TIME_SHOW,
        totalTime: params.totalTime
    }
}

export function showInstallPercent(params){
    return {
        type: INSTALL_PERCENT_SHOW,
        installPercent: params.installPercent
    }
}

export function showInfos(params){
    return {
        type: LOG_SHOW,
        info: params.info
    }
}

export function convertProgressBgColor(params) {
    return {
        type: CONVERT_PROGRESS_BG_COLOR,
        value: params.value
    }
}
