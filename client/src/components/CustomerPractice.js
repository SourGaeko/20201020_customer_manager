import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import App from '../App';
import { get } from 'axios';

const styles = theme => ({
    hidden : {
        display: 'none'
    },
    table: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    tableRow: {
        backgroundColor: "red",
        "&:hover" : {
          backgroundcolor: "red"
        }
    }
});

class CustomerSpecific extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            date: '',
            machine: '',
            tvid: '',
            image: '',
            open: false
        }
        this.readCustomer = this.readCustomer.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
    }

    readCustomer() {
        const url = "api/customers/" + this.props.id;
        get(url)
            .then((response) => {
                console.log(response.data[0])
                this.setState({
                    userName: response.data[0].name,
                    date: response.data[0].date,
                    machine: response.data[0].machine,
                    tvid: response.data[0].tvid,
                    image: response.data[0].image
                })
            })
            .catch(function (err) {
                console.log(err)
            })
            .finally(function () {
                // always executed
            })
        console.log(`I'm reading with id:${this.props.id}!`)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }

    render() {
        const { classes } = this.props;
        const cellList = [{id:1, name:"번호"}, {id:2, name:"업체명"}, {id:3, name:"설치일자"}, {id:4, name:"설치기기"}, {id:5, name:"설치사진"}, {id:6, name:"TeamViewerID"}, {id:7, name:"설정"}]
        return (
            <div>
                <Button variant="contained" color="primary" onClick={(e) => {this.handleClickOpen(e); this.readCustomer(this.props);}}>
                    A/S
                </Button>
                <Dialog open={this.state.open}>
                    <DialogTitle>{this.state.userName}</DialogTitle>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className={classes.tableRow}>
                            <TableRow hover className={classes.tableRow}>
                                {cellList.map(c => {
                                return <TableCell key={c.id} style={{textAlign: "center"}} className={classes.tableHead}>{c.name}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                
                            </TableRow>
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerSpecific)