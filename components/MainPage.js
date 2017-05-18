import React from 'react';
import {injectIntl, defineMessages} from 'react-intl';
import ChangeLanguage from '../containers/ChangeLanguage';

let messages = defineMessages({
    name: {id: 'name'},
    value: {id: 'languageToConverter'}
});

function MainPage(props) {

    return (
        <div className="mainPage">
            <div className="headMain">
                <div className="logo">
                    <img src="/img/logo2.png" width='150' height='30'/>
                </div>

                <ChangeLanguage name={props.intl.formatMessage(messages.name)}
                                value={props.intl.formatMessage(messages.value)} />
            </div>

            <div className="content">
                {props.children}
            </div>
        </div>
    )

}

export default injectIntl(MainPage)




