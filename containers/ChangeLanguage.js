import {connect} from 'react-redux';
import {updateIntl} from 'react-intl-redux'
import zh_CN from '../data/zh_CN'
import en_US from '../data/en_US'

import LanguageConverter from '../components/common-components/LanguageConverter'

const mapStateToProps = (state, ownProps) => ({
    title: ownProps.value
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log("locale is : " + ownProps.name)
        let locale
        let messages
        if(ownProps.name === 'en'){
            locale = 'zh'
            messages = zh_CN
        }
        if (ownProps.name === 'zh'){
            locale = 'en'
            messages = en_US
        }

        dispatch(updateIntl({locale:locale, messages:messages}))
    }
})

const ChangeLanguage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageConverter)

export default ChangeLanguage
