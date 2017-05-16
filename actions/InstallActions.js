import request from 'superagent'
import util from 'util'

import {showInfos, showTotalTime, convertProgressBgColor, showInstallPercent} from "./NotificationActions";
import {
    INSTALL_REQUEST_START,
    INSTALL_REQUEST_FAIL,
    INSTALL_REQUEST_OVER,
    SAVE_POLLING_TIMER,
    CLEAR_POLLING_TIMER
} from "../constants/const";


export function installService(address) {
    return dispatch => {
        dispatch({type: INSTALL_REQUEST_START})

        return request.post('/install')
            .query({host: address})
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    dispatch(showInfos({info: err.message || "Install Fail!"}));
                    dispatch({type: INSTALL_REQUEST_FAIL})
                    return
                } else {
                    const taskId = res.body.taskId;
                    const totalTime = res.body.totalTime

                    dispatch(showTotalTime({totalTime: totalTime}))

                    dispatch(polling(taskId))
                }
            });
    }
}

function polling(taskId) {
    return dispatch => {
        const timer = setInterval(
            () => {
                request.get('/query')
                    .query({taskId: taskId})
                    .set('Accept', 'application/json')
                    .end(function (err, res) {
                        if (err || !res.ok) {
                            dispatch(clearPollingTimer())
                            dispatch({type: INSTALL_REQUEST_FAIL})
                            return
                        } else {
                            const isFinished = res.body.isFinished
                            const taskStatus = res.body.taskStatus
                            const taskProgress = res.body.taskProgress
                            const totalTime = res.body.totalTime

                            const info = dealWith(res.body.stepInfo)

                            dispatch(showInstallPercent({installPercent: taskProgress}))
                            dispatch(showInfos({info: info}))

                            if (isFinished === 1) {
                                dispatch(showTotalTime({totalTime: 0}))

                                if (taskStatus === 'fail') {
                                    dispatch(convertProgressBgColor({value: 'red'}))

                                    dispatch({type: INSTALL_REQUEST_FAIL})
                                    dispatch(clearPollingTimer())
                                    return
                                }
                                dispatch({type: INSTALL_REQUEST_OVER})
                                dispatch(clearPollingTimer())

                            } else {
                                dispatch(showTotalTime({totalTime: totalTime}))
                            }
                        }
                    });

            }, 1000)
        dispatch(savePollingTimer(timer))
    }
}

function dealWith(steps) {
    let info = ''
    for (let counter = 0; counter < steps.length; counter++) {
        if (steps[counter].stepStatus !== 'waiting'
            || steps[counter].stepStatus !== 'inexcution') {

            info = info + '[' + steps[counter].stepName + ']  '
                + steps[counter].stepStatus + ' '
                + steps[counter].stepProgress + '% \r\n'
                + steps[counter].stepHistoryLogs.join('\r\n')
        }
    }
    return info
}


function savePollingTimer(timer) {
    return {
        type: SAVE_POLLING_TIMER,
        timer
    }
}

function clearPollingTimer() {
    return (dispatch, getState) => {
        const state = getState();
        clearInterval(state.reducers.install.timer.pollingTimer);
        dispatch({type: CLEAR_POLLING_TIMER});
    };
}

export function initInstall() {
    return dispatch => {
        dispatch(showInstallPercent({installPercent: 0}))

        dispatch(showTotalTime({totalTime: 0}))

        dispatch(showInfos({info: ''}))

        dispatch(convertProgressBgColor({value: '#00abff'}))
    }
}
