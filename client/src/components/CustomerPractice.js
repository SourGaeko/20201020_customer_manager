import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import App from '../App';

const styles = theme => ({
    hidden : {
        display: 'none'
    }
});

class CustomerSpecific extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.readCustomer = this.readCustomer.bind(this)
    }

    readCustomer(props) {
        const url = "api/customers/" + this.props.id;
        fetch(url)
        console.log(`I'm reading with id:${this.props.id}!`)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={(e) => {this.readCustomer(e);}}>
                    A/S
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerSpecific)