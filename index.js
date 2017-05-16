import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {addLocaleData} from 'react-intl'
import {IntlProvider, intlReducer} from 'react-intl-redux'
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import FirstPage from './components/FirstPage';
import MainPage from './components/MainPage';
import PermissionProtocal from './components/permissionProtocal.js';
import InstallComponent from './components/installComponent.js';
import Orchestration from './components/Orchestration.js';
import zh_CN from './data/zh_CN'
import en_US from './data/en_US'

import reducers from './reducers/index'

addLocaleData([...en, ...zh])

function chooseLocale() {
    console.log("local language is " + navigator.language)
    switch (navigator.language.split('-')[0]) {
        case 'en':
            return en_US;
            break;
        case 'zh':
            return zh_CN;
            break;
        default:
            return en_US;
            break;
    }
}

const reducer = combineReducers({
    reducers,
    intl: intlReducer,
})

const initialState = {
    intl: {
        defaultLocale: 'en',
        locale: navigator.language.split('-')[0],
        messages: chooseLocale()
    },
}

const store = compose(
    applyMiddleware(thunkMiddleware)
)(createStore)(reducer, initialState)

ReactDOM.render(
    <Provider store={ store }>
        <IntlProvider>
            <Router history={ browserHistory }>
                <Route path="/oki-ui" component={ FirstPage }/>
                <Route path="/oki-ui/:name" component={ MainPage }>
                    <IndexRoute component={ PermissionProtocal }/>
                    <Route path="/oki-ui/ume/install" component={ InstallComponent }/>
                    <Route path="/oki-ui/ume/orchestration" component={ Orchestration }/>
                </Route>

            </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('app'));
