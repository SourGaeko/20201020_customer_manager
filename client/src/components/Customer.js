import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';
import CustomerPractice from './CustomerPractice';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const teamViewer = {
    height: "30px",
    weight: "30px"
}

class Customer extends React.Component {
    render() {
        const teamViewerUrl = `https://start.teamviewer.com/${this.props.tvid}`;
        return (
            <TableRow hover>
                <TableCell style={{textAlign: "center"}}>{this.props.id}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.name}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.date}</TableCell>
                <TableCell style={{textAlign: "center"}}>{this.props.machine}</TableCell>
                <TableCell style={{textAlign: "center"}}>
                    <Zoom>
                        <img className="table__image" src={this.props.image} alt="profile" onError={this.onerror=null}/>
                    </Zoom>
                </TableCell>
                <TableCell style={{textAlign: "center"}}><a href={teamViewerUrl} target="_blank" rel="noopener noreferrer"><img src="/images/teamviewer.png" style={teamViewer}  alt="teamviewer"/></a></TableCell>
                <TableCell style={{display: "flex", flexDirection: "row", justifyContent: "space-around",  textAlign: "center"}}>
                    <CustomerPractice stateRefresh={this.props.stateRefresh} id={this.props.id} />
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/>
                </TableCell>
            </TableRow>
        )
    }
}

export default Customer;