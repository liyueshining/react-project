import React from 'react';
import {shallow, render, mount} from 'enzyme';
import chai from 'chai';

import FirstPage from '../components/FirstPage'
import BackgroundImageAndTitle from '../components/BackgroundImageAndTitle.js';

let expect = chai.expect

describe('firstpage by enzyme', function () {
    const wrapper = shallow(<FirstPage/>);

    it('FirstPage should have BackgroundImageAndTitle', function () {
        expect(wrapper.find(BackgroundImageAndTitle)).to.have.length(1);
    });


    it('FirstPage should have three a items', function () {
        expect(wrapper.find('a')).to.have.length(3);
    });

});
