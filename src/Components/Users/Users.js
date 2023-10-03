import React, { Component } from 'react';
import axios from 'axios';
import './Users.css';
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usersData:[],
            searchText:"",
            usersDataForDisplay:[],
         }
    }
    componentDidMount(){
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then((data)=>{
            console.log(data.data)
            this.setState({usersData:data.data})
            this.setState({usersDataForDisplay:data.data})
        })
    }
    handleSearchTextChange(e){
        
        this.setState({searchText:e.target.value})
       
        if(e.target.value.length >=2){
        let displayUser = [];
        for(const user of this.state.usersData){
            if(user.fullName.toLowerCase().includes(e.target.value.toLowerCase())){

                displayUser.push(user)
            }
        }      
        this.setState({usersDataForDisplay:displayUser})
    }

    }

    handleSearchReset = () => {
        this.setState({searchText:""})
        this.setState({usersDataForDisplay:this.state.usersData})
    }

    render() { 
        return ( 
        
            <>
            <div className="outer-wrapper">
        <h1 className="main-heading">Users</h1>
        <div>
            <form onSubmit={(e)=>{e.preventDefault()}} className="userlist-filter" id="search-form">
                <input name="searchBox" onKeyUp={(e)=>{
                    if(e.key === 'Enter'){
                        if(e.target.value.length<2){
                            alert('Please Enter atleast Two Character ')
                        }
                    }
                }}  className="userlist-searchbox" type="search" id="searchBox" value={this.state.searchText} onChange={this.handleSearchTextChange.bind(this)} placeholder="Search by Name"></input>
                <input type="reset" className="userlist-reset-btn" value="Reset" onClick={this.handleSearchReset.bind(this)} id="resetBtn"></input>
            </form>
            <div style={{"width":"100%"}}>
                <table className="order-table">
                    <tr>
                        <th>ID</th>
                        <th>User Avatar</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Current Location</th>
                    </tr>
                    <tbody id="table-body">
                        {this.state.usersDataForDisplay.map((item,index)=>{
                    return(
                    <tr className="table-row" key={index}>
                        <td className="secondary-text">{item.id}</td>
                        <td className="secondary-text"><img src={item.profilePic } alt=""></img></td>
                        <td className="secondary-text">{item.fullName}</td>
                        <td className="primary-text">{item.dob}</td>
                        <td className="secondary-text">{item.gender}</td>
                        <td className="secondary-text">{item.currentCity},{item.currentCountry}</td>
                    </tr>)})}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
            </>
         );
    }
}
 
export default Users;