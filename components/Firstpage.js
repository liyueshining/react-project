import React from 'react';
import {browserHistory} from 'react-router';

import BackgroundImageAndTitle from './BackgroundImageAndTitle.js';


class FirstPage extends React.Component {

    constructor() {
        super();
    }

    /*componentDidMount() {
     this.timer = setTimeout(function () {
     browserHistory.push('/oki');
     }.bind(this), 3000);
     };

     componentWillUnmount() {
     clearTimeout(this.timer);
     };*/

    chooseIaas = () => {
        browserHistory.push("/oki-ui/iaas")
    }

    choosePaas = () => {
        browserHistory.push("/oki-ui/paas")
    }

    chooseUme = () => {
        browserHistory.push("/oki-ui/app")
    }


    render() {
        const titles = {
            title: "One Key Installer",
            logo: "TE"
        }

        return (
            <div className="firstLayout">
                <div className="mainTitle">
                    <BackgroundImageAndTitle>
                        <div><img src="/img/logo.png" width='150' height='56'/></div>
                        <div>{titles.title}</div>
                    </BackgroundImageAndTitle>
                </div>


                <div className="components">
                    <div className="banners_li" style={{borderRight: '1px lightGray solid'}}>
                        <a id="tecs" className="item" onClick={this.chooseIaas}>
                            <img className="alignCenter" src="/img/openstack.png"/>
                        </a>
                    </div>

                    <div className="banners_li" style={{borderRight: '1px lightGray solid'}}>
                        <a id="palette" className="item" onClick={this.choosePaas}>
                            <img className="alignCenter" src="/img/paas.png"/>
                        </a>
                    </div>

                    <div className="banners_li">
                        <a id="ume" className="item" onClick={this.chooseUme}>
                            <img className="alignCenter" src="/img/app.png"/>
                        </a>
                    </div>
                </div>

            </div>
        )
    }

}

export default FirstPage
