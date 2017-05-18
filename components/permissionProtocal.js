import React from 'react';
import {browserHistory} from 'react-router';
import { FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import NormalFullRightButton from './common-components/NormalFullRightButton';


class PermissionProtocal extends React.Component{

    constructor(){
        super()

        this.acceptProtocal = this.acceptProtocal.bind(this)
    }

    acceptProtocal() {
        browserHistory.push('/oki-ui/ume/install');
    }


    render(){
        let messages = defineMessages({
            defaultValue: {id: 'permissionContent'}
        });

        return (
            <div>
                <div className="form-group">
                    <label style={{color: 'red'}}><FormattedMessage id='permissionTitle'/></label>
                    <textarea className="form-control" rows="25" defaultValue={this.props.intl.formatMessage(messages.defaultValue)} readOnly>
                    </textarea>
                </div>
                <div className="form-group">
                    <NormalFullRightButton onClick={this.acceptProtocal}><FormattedMessage id='acceptButton'/></NormalFullRightButton>
                </div>
            </div>)
    }
}

export default injectIntl(PermissionProtocal)
