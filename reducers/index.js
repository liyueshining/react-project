import {combineReducers} from "redux";
import result, * as fromNotification from "./notification";
import percent, * as fromUploaded from "./percent";
import install, * as fromInstall from "./install";
import util from 'util'
import orchestration, * as fromOrchestration from "./orchestration";

const reducers = combineReducers({
    result,
    percent,
    install,
    orchestration
})

export default reducers

//UPLOADED
export const getUploadedPercent = (state) => {
    console.log('state is : ' + util.inspect(state))
    return fromUploaded.getPercent(state.reducers)
}

export const getUploadResult = (state) => {
    return fromNotification.getResult(state.reducers)
}


export const getInstallIsFetching = (state) => {
    return fromInstall.getIsFetching(state.reducers.install)
}

export const getInstallPercent = (state) => {
    return fromInstall.getInstallPercent(state.reducers.install)
}

export const getInstallTotalTime = (state) => {
    return fromInstall.getTotalTime(state.reducers.install)
}

export const getInstallBgColor = (state) => {
    return fromInstall.getBgColor(state.reducers.install)
}

export const getInstallInfo = (state) => {
    console.log('info is : ' + util.inspect(state))
    return fromInstall.getInfo(state.reducers.install)
}

//orchestration
export const getAll = (state) => {
    return fromOrchestration.getAll(state.reducers.orchestration)
}

export const getVnfdsToShow = (state) => {
    return fromOrchestration.getSelect(state.reducers.orchestration)

}
