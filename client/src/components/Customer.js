import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';
import CustomerAs from './CustomerAs';
const teamViewer = {
    height: "30px",
    weight: "30px"
}


class Customer extends React.Component {
    render() {
        const teamViewerUrl = `https://start.teamviewer.com/${this.props.tvid}`;
        return (
            <TableRow>
                <TableCell style={{textAlign: "center"}}>{this.props.id}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.name}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.date}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.machine}</TableCell>
                <TableCell style={{textAlign: "center"}}><img className="table__image" src={this.props.image} alt="profile" onError="this.onerror=null"/></TableCell>
                <TableCell style={{textAlign: "center"}}><a href={teamViewerUrl} target="_blank" rel="noopener noreferrer" onClick="location.href"><img src="/images/teamviewer.png" style={teamViewer} /></a></TableCell>
                <TableCell style={{textAlign: "center"}}>
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/>
                </TableCell>
            </TableRow>
        )
    }
}

export default Customer;