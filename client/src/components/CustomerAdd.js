import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            date: '',
            machine: '',
            file: null,
            tvid: '',
            fileName: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
        })
        this.setState({
            userName: '',
            date: '',
            machine: '',
            file: null,
            tvid: '',
            fileName: ''
        })
        window.location.reload();
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer(){
        const url = "/api/customers";
        const formData = new FormData();
        formData.append('name', this.state.userName)
        formData.append('date', this.state.date)
        formData.append('machine', this.state.machine)
        formData.append('image', this.state.file)
        formData.append('tvid', this.state.tvid)
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                업체명: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                설치일자: <input type="text" name="date" value={this.state.date} onChange={this.handleValueChange} /><br/>
                설치기기: <input type="text" name="machine" value={this.state.machine} onChange={this.handleValueChange} /><br/>
                설치사진: <input type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                TeamViewerID: <input type="text" name="tvid" value={this.state.tvid} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd