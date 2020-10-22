import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.date}</TableCell>
                <TableCell>{this.props.machine}</TableCell>
                <TableCell><img className="table__image" src={this.props.image} alt = "profile"/></TableCell>
                <TableCell>{this.props.tvid}</TableCell>
            </TableRow>
        )
    }
}

export default Customer;