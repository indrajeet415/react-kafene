import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersDataForDisplay:[],
            ordersData:[],
            activeFilters:{
                "New":true,
                "Packed":true,
                "InTransit": true,
                "Delivered": true
            },
            count:'',
          }
    }

    componentDidMount(){
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
        .then((data)=>{
            console.log(data.data)
            this.setState({ordersData:data.data})
            this.setState({ordersDataForDisplay:data.data})
        })
    }

    handleFilterCheck(e){    
        const filters=this.state.activeFilters;
        filters[e.target.name] = e.target.checked;
        this.setState({activeFilters:filters})
        console.log(this.state.activeFilters)
        this._updateDisplayOrders(); 

    }
    
    _updateDisplayOrders = () => {
        const displayOrds = this.state.ordersData.filter(order => this.state.activeFilters[order.orderStatus]);
        this.setState({ordersDataForDisplay:displayOrds})

    }



    render() { 
    var count = this.state.ordersDataForDisplay.length
        return ( 
            <>

            
    <div className="outer-wrapper">
        <h1 className="main-heading">Orders</h1>
        <div className="inner-wrapper">
            <div className="filter-wrapper">
                <h3>Filters</h3>
                <div className="filter-option">
                    <p>Count: <span id="count">{count}</span></p>
                    <label className="filter-checkbox"><input  onChange={this.handleFilterCheck.bind(this)} type="checkbox" id="newCheckBox" name="New"  checked={this.state.activeFilters['New']}></input>New</label>
                    <label className="filter-checkbox"><input  onChange={this.handleFilterCheck.bind(this)} type="checkbox" id="PackedCheckBox"name="Packed"  checked={this.state.activeFilters['Packed']}></input>Packed</label>
                    <label className="filter-checkbox"><input  onChange={this.handleFilterCheck.bind(this)} type="checkbox" id="IntransitcheckBox" name="InTransit"  checked={this.state.activeFilters['InTransit']}></input>InTransit</label>
                    <label className="filter-checkbox"><input  onChange={this.handleFilterCheck.bind(this)} type="checkbox" id="DeliveredCheckBox"name="Delivered"  checked={this.state.activeFilters['Delivered']}></input>Delivered</label>
                </div>
            </div>
            <div style={{"width": "100%"}}>
                <table className="order-table">
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    <tbody id="table-body">
        {this.state.ordersDataForDisplay.map((item,index)=>{
            return(
                <tr className="table-row" key={index}>
                    <td className="secondary-text">
                    <Link to={`/order/${item.id}`} style={{textDecoration:'none', color:'inherit'}}>
                                        {item.id}
                                    </Link>
                                   </td>
                    <td className="primary-text">{item.customerName}</td>
                    <td className="primary-text">{item.orderDate}<br></br><span className="secondary-text">{item.orderTime}</span></td>
                    <td className="secondary-text">{item.amount}</td>
                    <td className="primary-text">{item.orderStatus}</td>

                </tr>
            )
        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

            </>
         );
    }
}
 
export default Orders;