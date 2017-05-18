import React from 'react';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {connect} from "react-redux";

import NormalFullButton from './common-components/NormalFullButton';
import Select from './common-components/Select';
import {uploadFile, initUploadFile} from "../actions/UploadActions";
import {
    getUploadedPercent, getUploadResult, getInstallIsFetching, getInstallInfo, getInstallBgColor, getInstallPercent,
    getInstallTotalTime
} from "../reducers/index";
import NewFeature from './newFeatures'
import {installService, initInstall} from "../actions/InstallActions";

class InstallComponent extends React.Component {
    constructor() {
        super()

        this.state = {
            displaySelectFile: "none",
            installProgress: "none"
        }
    }


    setFilePath = (event) => {
        event.preventDefault();

        this.props.initFile()

        let fileName = event.target.files[0].name;
        let fileSize = event.target.files[0].size;
        let fileSizeAndUnit;

        console.log("name is : " + fileName);
        console.log("size is : " + fileSize);

        if (fileName !== null) {

            if (fileSize < 1024 * 1024) {
                fileSizeAndUnit = (fileSize / 1024).toFixed(2) + " KB";
            } else if (fileSize < (1024 * 1024 * 1024)) {
                fileSizeAndUnit = (fileSize / (1024 * 1024)).toFixed(2) + " MB";
            } else if (fileSize < (1024 * 1024 * 1024 * 1024)) {
                fileSizeAndUnit = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + " GB";
            }

            this.setState({
                    fileName: fileName,
                    fileSize: fileSize,
                    fileSizeAndUnit: fileSizeAndUnit,
                    displaySelectFile: "block"
                }
            )
        }
    }


    uploadSelectedFile = () => {
        const myFile = this.refs.file.files[0]
        console.log("this.refs.file.name is : " + myFile.name);

        this.props.upload(myFile)
    }


    deleteSelectedFile = () => {
        this.setState(
            {
                fileName: null,
                fileSize: null,
                fileSizeAndUnit: null,
                displaySelectFile: "none"
            }
        );
    }


    installUME = () => {

        if (this.props.isFetching === true) {
            return
        }

        let address = this.refs.address.value
        console.log('address is: ' + address)
        if (address === ''){
            alert("输入参数必填，请保证格式是IPV4！");
            return
        }

        var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if(re.test(address))
        {
            if(!(RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)){
                alert("输入参数必填，请保证格式是IPV4！");
                return
            }
        }else{
            alert("输入参数必填，请保证格式是IPV4！");
            return
        }


        this.props.initInstall()

        this.setState({
            installProgress: 'block'
        });

        this.props.install(address)
    }


    render() {
        let messages = defineMessages({
            placeholder: {id: 'installPage.placeholder'}
        })

        return (
            <div className="mainArea">
                <div className="operationArea">
                    <div className="form-horizontal" style={{display: 'none'}}>
                        <div className="form-group">
                            <h3 className="col-sm-4"><FormattedMessage id='installPage.tile'/></h3>

                            <div className=" col-sm-12">
                                <hr/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label"><FormattedMessage
                                id='installPage.vManagerAddress'/></label>
                            <div className="col-sm-9">
                                <input type="text" ref="address" className="input-text"
                                       placeholder={this.props.intl.formatMessage(messages.placeholder)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 control-label"><FormattedMessage
                                id='installPage.umeLocation'/></label>

                            <div className="col-sm-9">
                                <a className="file"><FormattedMessage id='installPage.chooseFile'/>
                                    <input type="file" ref="file" onChange={this.setFilePath}/>
                                </a>
                            </div>
                        </div>

                        <div className="form-group" style={{display: this.state.displaySelectFile}}>

                            <label className="col-sm-3 control-label sr-only">aa</label>
                            <div className="col-sm-9">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th style={{width: '50%'}}><FormattedMessage id='installPage.choosedFileName'/>
                                        </th>
                                        <th style={{width: '25%'}}><FormattedMessage id='installPage.choosedFileSize'/>
                                        </th>
                                        <th style={{width: '25%'}}><FormattedMessage id='installPage.fileOperations'/>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{this.state.fileName}</td>
                                        <td>{this.state.fileSizeAndUnit}</td>
                                        <td>
                                            <button className="btn btn-link" onClick={this.uploadSelectedFile}>
                                                <FormattedMessage
                                                    id='installPage.upload'/></button>
                                            <button className="btn btn-link" onClick={this.deleteSelectedFile}>
                                                <FormattedMessage
                                                    id='installPage.delete'/></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="form-group" style={{display: this.state.displaySelectFile}}>
                            <div className="col-sm-offset-3 col-sm-9"><FormattedMessage
                                id='installPage.uploadProgress'/>{this.props.result}</div>
                            <div className="col-sm-offset-3 col-sm-9">
                                <div className="progress">
                                    <div className="progress-bar" aria-valuenow="10"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{width: this.props.percent + "%", backgroundColor: '#00abff'}}>
                                        <span>{this.props.percent}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-9">
                                <NormalFullButton onClick={this.installUME}><FormattedMessage
                                    id='installPage.install'/></NormalFullButton>
                            </div>
                        </div>


                        <div className="form-group" style={{display: this.state.installProgress}}>
                            <div className="col-sm-offset-3 col-sm-9">
                                <label>预计安装需要时间：{this.props.totalTime}</label>

                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="0"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{
                                             width: this.props.installPercent + "%",
                                             backgroundColor: this.props.bgColor
                                         }}>
                                        <span>{this.props.installPercent}%</span>
                                    </div>
                                </div>

                                <textarea rows="15" className="form-control" value={this.props.info} readOnly>
                                </textarea>

                            </div>
                        </div>


                    </div>


                    <div className="form-horizontal">
                        <div className="form-group">
                            <h3 className="col-sm-4"><FormattedMessage id='installPage.tile'/></h3>

                            <div className=" col-sm-12">
                                <hr/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className=" col-sm-12">
                                <label className="control-label" style={{
                                    display: 'inline-block',
                                    marginRight: '20px',
                                    align: 'left',
                                    textAlign: 'center'
                                }}>
                                    <FormattedMessage id='installPage.vManagerAddress'/>
                                </label>

                                <div style={{display: 'inline-block', marginRight: '20px', width: '400px'}}>
                                    <input type="text" ref="address" className="input-text"
                                           placeholder={this.props.intl.formatMessage(messages.placeholder)}
                                    />
                                </div>

                                <div style={{display: 'inline-block', width: '100px'}}>
                                    <NormalFullButton onClick={this.installUME}><FormattedMessage
                                        id='installPage.install'/></NormalFullButton>
                                </div>
                            </div>
                        </div>


                        <div className="form-group" style={{display: this.state.installProgress}}>
                            <div className="col-sm-12">
                                <label>预计安装需要时间：{this.props.totalTime}</label>

                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="0"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{
                                             width: this.props.installPercent + "%",
                                             backgroundColor: this.props.bgColor,
                                             textAlign: 'right'
                                         }}>
                                        <span>{this.props.installPercent}%</span>
                                    </div>
                                </div>

                                <textarea rows="20" className="form-control" value={this.props.info} readOnly>
                                </textarea>

                            </div>
                        </div>


                    </div>

                </div>

                <div className="showArea">
                    <NewFeature />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    result: getUploadResult(state),
    percent: getUploadedPercent(state),

    isFetching: getInstallIsFetching(state),
    totalTime: getInstallTotalTime(state),
    installPercent: getInstallPercent(state),
    bgColor: getInstallBgColor(state),
    info: getInstallInfo(state),

})

const mapDispatchToProps = (dispatch) => ({
    initFile: () => dispatch(initUploadFile()),
    upload: (file) => dispatch(uploadFile(file)),
    initInstall: () => dispatch(initInstall()),
    install: (address) => dispatch(installService(address))
})


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(InstallComponent))
