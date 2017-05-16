import request from 'superagent'

import {
    showNotification,
    showPercent, hideNotification, hidePercent
} from './NotificationActions'


export function uploadFile(file) {

    return dispatch => {

        return request.post('/api/file')
            .attach('file', file)
            .set('Accept', 'text/plain')
            .on('progress', (e) => {
                const percent = e.percent
                console.log('Percentage done: ', percent);
                if (typeof(percent) !== 'undefined') {
                    dispatch(showPercent({
                            percent: percent
                        })
                    )
                }
            })
            .end((err, res) => {
                if (!res.ok) {
                    dispatch(showNotification({
                        status: 'err',
                        text: 'Failed'
                    }))
                } else {
                    if (res.text === 'success') {
                        dispatch(showNotification({
                            status: 'ok',
                            text: 'Completed'
                        }))
                    } else {
                        dispatch(showNotification({
                            status: 'err',
                            text: 'Failed'
                        }))
                    }
                }

                if (err) {
                    dispatch(showNotification({
                        status: 'err',
                        text: err.message
                    }))
                }
            });
    }
}

export function initUploadFile() {
    return dispatch => {
        dispatch(hideNotification({
            status: 'init',
            text: ''
        }))

        dispatch(hidePercent({
            percent: 0
        }))
    }
}
