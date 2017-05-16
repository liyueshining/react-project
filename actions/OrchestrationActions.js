/**
 * Created by root on 17-3-30.
 */
import request from 'superagent'
import util from 'util'
import {GET_VNFDS_FAIL, GET_VNFDS_SUCCESS, GET_VNFDS_SELECT, PUT_VNFDS_FAIL, PUT_VNFDS_SUCCESS} from "../constants/const";


export function getAllVnfds() {
    return dispatch => {
        console.log("in getallvnfd action")
        return request.get('/ume/smallProducts/orchestration')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    dispatch({type: GET_VNFDS_FAIL, vnfds:[]})
                    return
                } else {
                    const content = res.body;

                    console.log("content is : " + util.inspect(content.vnfds))

                    dispatch({type: GET_VNFDS_SUCCESS, vnfds: content.vnfds})

                    dispatch({type: GET_VNFDS_SELECT, vnfds: content.vnfds})
                }
            });
    }
}


export function reOrchestration(vnfds) {
    return dispatch => {
        console.log("in reOrchestration action")
        return request.put('/ume/smallProducts/orchestration')
            .send({vnfds: vnfds})
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    dispatch({type: PUT_VNFDS_FAIL, vnfds:[]})
                    return
                } else {
                    const content = res.body;

                    console.log("content is : " + util.inspect(content.vnfds))

                    dispatch({type: PUT_VNFDS_SUCCESS, vnfds: content.vnfds})

                }
            });
    }
}
