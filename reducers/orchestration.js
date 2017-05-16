/**
 * Created by root on 17-3-31.
 */
import {GET_VNFDS_FAIL, GET_VNFDS_SUCCESS, GET_VNFDS_SELECT} from "../constants/const";
import {combineReducers} from "redux";

const all = (state = [], action) => {
    switch (action.type) {
        case GET_VNFDS_FAIL:
            return state

        case GET_VNFDS_SUCCESS:
            return action.vnfds

        default:
            return state
    }
}

const select = (state = [], action) => {
    switch (action.type) {
        case GET_VNFDS_SELECT:
            return  (action.vnfds.filter((vnfd) => {
                return vnfd.name.startsWith('ranoss-necontrol')
            }))[0].nfd

        default:
            return state
    }
}

const orchestration = combineReducers({
    all,
    select
})

export default orchestration

export const getAll = (state) => {
    return state.all
}

export const getSelect = (state) => {
    return state.select
}
