import React, { Component } from 'react';
import axios from 'axios';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsData:[],
            productsDataForDisplay:[],
            activeFilters:{
                "expired":true,
                "low_stock":true,
            },

          }
    }

    componentDidMount(){
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        .then((data)=>{
            console.log(data.data)
            this.setState({productsData:data.data})
            this.setState({productsDataForDisplay:data.data})
        })
    }

    handleFilterCheck = e => {
        const filters=this.state.activeFilters;
        filters[e.target.name] = e.target.checked;
        this.setState({activeFilters:filters});
        console.log(this.state.activeFilters)
        this._updateDisplayOrders();
    }

    myParser (date) {
        var arr = date.split('-');
        return arr.join(' ')
    }

    
    _updateDisplayOrders = () => {
        if(this.state.activeFilters['expired'] && this.state.activeFilters['low_stock']) {
            this.setState({productsDataForDisplay:this.state.productsData})
            
            return;
        }
        const dispProds=[];
        for(const product of this.state.productsData) {
            let { expiryDate, stock } = product;
            if(this.state.activeFilters['expired']===true && !this.state.activeFilters['low_stock']) {
                if(stock>100){dispProds.push(product);}  
                 
            }
            if(this.state.activeFilters["low_stock"]===true && !this.state.activeFilters['expired']) {
                expiryDate = new Date(this.myParser(product.expiryDate)).getTime();
                const now = new Date().getTime();
                if(expiryDate>now){
                    dispProds.push(product);}
            }
            if(this.state.activeFilters['expired'] === false && this.state.activeFilters['low_stock'] ===false){
                expiryDate = new Date(this.myParser(product.expiryDate)).getTime();
                const now = new Date().getTime();
                if((expiryDate > now)  && (stock > 100)){
                    dispProds.push(product);
                }

            }
        }
        this.setState({productsDataForDisplay:dispProds})
        
    }










    render() { 
    
        let count = this.state.productsDataForDisplay.length
        return ( 
            <>
            <div className="outer-wrapper">
        <h1 className="main-heading">Products</h1>
        <div className="inner-wrapper">
            <div className="filter-wrapper">
                <h3>Filters</h3>
                <div className="filter-option">
                    <p>Count:<span id="count">{count}</span></p>
                    <label  className="filter-checkbox"><input type="checkbox" name="expired" id="expiredCheckBox" onChange={this.handleFilterCheck.bind(this)} checked={this.state.activeFilters['expired']}></input>Expired</label>
                    <label className="filter-checkbox"><input type="checkbox" onChange={this.handleFilterCheck.bind(this)} name="low_stock" id="lowStockCheckBox" checked={this.state.activeFilters['low_stock']}></input>Low Stock</label>
                    
                </div>
            </div>
            <div style={{"width": "100%"}}>
                <table className="order-table">
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Product Brand</th>
                        <th>Expiry Date</th>
                        <th>Unit Price</th>
                        <th>Stock</th>
                    </tr>
                    <tbody id="table-body">
               
        {this.state.productsDataForDisplay.map((item,index)=>{
            return(
                <tr className="table-row" key={index}>
                    <td className="secondary-text">{item.id}</td>
                    <td className="primary-text">{item.medicineName}</td>
                    <td className="secondary-text">{item.medicineBrand}</td>
                    <td className="primary-text">{item.expiryDate}</td>
                    <td className="secondary-text">{item.unitPrice}</td>
                    <td className="secondary-text">{item.stock}</td>
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
 
export default Products;