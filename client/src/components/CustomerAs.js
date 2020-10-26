import React from 'react';
import { get, post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display: 'none'
    }
});

class CustomerAs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.name,
            asPerson: '',
            asDate: '',
            asSpecific: '',
            tvid: this.props.tvid,
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addAs = this.addAs.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addAs()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            userName: '',
            asPerson: '',
            asDate: '',
            asSpecific: '',
            tvid: '',
            open: false
        })
    }

    addAs(id){
        const url = "/customers/" + id;
        const formData = new FormData();
        formData.append('customer_name', this.state.userName)
        formData.append('as_person', this.state.asPerson)
        formData.append('as_createdDate', this.state.asDate)
        formData.append('as_specific', this.state.asSpecific)
        formData.append('customer_tvid', this.state.tvid)
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    readCustomer(id){
        console.log(id)
    }
    handleClickOpen() {
        this.setState({
            open: true
        })
        this.readCustomer()
    }

    handleClose() {
        this.setState({
            userName: '',
            asPerson: '',
            asDate: '',
            asSpecific: '',
            tvid: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    A/S
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>상세A/S정보</DialogTitle>
                    <DialogContent>
                        <div><h2>111{this.props.userName}</h2></div>
                        <TextField label="업명" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                        <TextField label="담당자명" type="text" name="date" value={this.state.date} onChange={this.handleValueChange} /><br/>
                        <TextField label="처리일자" type="text" name="machine" value={this.state.machine} onChange={this.handleValueChange} /><br/>
                        <TextField label="처리시간" type="text" name="machine" value={this.state.machine} onChange={this.handleValueChange} /><br/>
                        <TextField label="TeamViewerID" type="text" name="tvid" value={this.state.tvid} onChange={this.handleValueChange} /><br/> 
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAs)