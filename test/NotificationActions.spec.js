/**
 * Created by root on 17-2-28.
 */
import chai from 'chai'
import {showInfos} from '../actions/NotificationActions'
import {LOG_SHOW} from '../constants/const'

let expect = chai.expect

describe('Notification actions', () => {

    it('should create an action for show info', () => {
        const text = 'something going wrong'
        const expectedAction = {
            type: LOG_SHOW,
            info: text,
        }

        expect(showInfos({
            info: text,
        })).to.deep.equal(expectedAction)
    })

})
