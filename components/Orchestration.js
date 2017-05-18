import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getAll, getVnfdsToShow} from "../reducers/index";
import {getAllVnfds, reOrchestration} from "../actions/OrchestrationAction";
import {connect} from "react-redux";
import util from 'util'


class Orchestration extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            allvnds: [],
            vnfdsToShow: []
        }
    }

    componentWillMount() {
        console.log("in component will mount")
        this.props.getVnfds()
    };

    onDeleteRow = (rows) => {
        let temp = this.props.vnfdsToShow

        let remainNfds = temp.filter((nfd) => {
            return !rows.includes(nfd.name)
        })

        let allvnds = this.props.vnfds

        allvnds = allvnds.map((vnfd) => {
            if (vnfd.name.startsWith("ranoss-necontrol")) {
                vnfd.nfd = remainNfds
            }
            return vnfd
        })


        this.props.modifyVnfds(allvnds)
    }

    render() {
        const options = {
            onDeleteRow: this.onDeleteRow
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        }


        return (
            <BootstrapTable data={ this.props.vnfdsToShow } striped hover
                            options={ options }
                            selectRow={ selectRow }
                            deleteRow>
                <TableHeaderColumn isKey dataField='name'>Available NFD Name</TableHeaderColumn>
            </BootstrapTable>
        )

    }
}

const mapStateToProps = (state) => ({
    vnfds: getAll(state),
    vnfdsToShow: getVnfdsToShow(state)
})

const mapDispatchToProps = (dispatch) => ({
    getVnfds: () => dispatch(getAllVnfds()),
    modifyVnfds: (vnfds) => dispatch(reOrchestration(vnfds))
})

export default connect(mapStateToProps, mapDispatchToProps)(Orchestration)
