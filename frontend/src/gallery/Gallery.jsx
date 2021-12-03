import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Gallery.css'

// since we don't have api now, i use the imdb movie api.

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          query: "",
          sortValue: "relevant", //relevant or price
          sortOrder: "descending" //des or asc
        };
    }

    handleSortOrderChange(sortOrder){this.setState({sortOrder})}
    handleSortValueChange(sortValue){this.setState({sortValue})}
    handleQueryChange(query){this.setState({query})}

    getItems(){
        let newUrl;
        if (this.state.query === ""){
            newUrl = "https://61aa812fbfb110001773f27b.mockapi.io/products";
        }else{
            newUrl = "https://61aa812fbfb110001773f27b.mockapi.io/products";
            // newUrl = `https://61aa812fbfb110001773f27b.mockapi.io/products?where{"name": /${this.state.query}/}`
        }
        axios
            .get(newUrl).then(res =>
                this.setState({
                    items: res.data
                    // items: res.data.results.sort(
                    //     function(a, b) {
                    //         if(this.state.sortValue === "relevant"){
                    //             if(this.state.sortOrder === "ascending"){
                    //                 return a.productPrice - b.productPrice
                    //             }else{
                    //                 return b.productPrice - a.productPrice
                    //             }
                    //         }else{
                    //             if(this.state.sortOrder === "ascending"){
                    //                 return a.productPrice - b.productPrice
                    //             }else{
                    //                 return b.productPrice - a.productPrice
                    //             }
                    //         }
                    //     }.bind(this)
                    // )
                })
            );
    }

    render(){
        return (
            <div className="user">
                <header className='header'>
                    <h1>Flea Illinois</h1>
                    <form className='form-search-bar'>
                        <input
                        type="search"
                        value={this.state.query}
                        onChange={event => this.handleQueryChange(event.target.value)}
                        placeholder="search items here"
                        className="search-block"
                        />
                        <button  onClick = {this.getItems()} >
                            Search
                        </button>
                        <label>
                            &nbsp;&nbsp;&nbsp;
                            <b>Sort by</b>
                            &nbsp;
                            <select
                            value={this.state.sortValue}
                            onChange={event => this.handleSortValueChange(event.target.value)}
                            className="select1"
                            >
                                <option value="relevant">Relevant</option>
                                <option value="price">Price</option>
                            </select>
                        </label>

                        <label>
                            &nbsp;&nbsp;&nbsp;
                            <b>Order</b>
                            &nbsp;
                            <select
                            value={this.state.sortOrder}
                            onChange={event => this.handleSortOrderChange(event.target.value)}
                            className="select1"
                            >
                                <option value="descending">Descending</option>
                                <option value="ascending">Ascending</option>
                            </select>
                        </label>
                    </form>
                    <div className="container-headings">
                        <Link to='/user' className='link-heading'>Post Product</Link>
                        <Link to='/user' className='link-heading'>My account</Link>
                    </div>
                </header>

                <div className="items-container">
                {this.state.items.map((item, index) => (
                    <div className="item-picture" key={item.id}>
                    <Link
                        to={{
                        pathname: `/${item.id}`,
                        state: { 
                            itemlist: this.state.items,
                            curIdx: index
                        }
                        }}
                    >
                        <img src="http://via.placeholder.com/200x200" alt=" "/>
                        <h6>{item.productName}</h6>
                        <h6>{item.productPrice}</h6>
                    </Link>


                    </div>
                ))}
                </div>
            </div>
        )
    }
}

export default Gallery