import React, { Component } from "react";
import axios from "axios";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            user: {}
        };
    }

    componentDidMount() {
        var productAddress = "http://localhost:4000/api/products" + window.location.href.slice(29)
        axios.get(productAddress)
            .then(productResponse => {
                var sellerAddress = "http://localhost:4000/api/users/"+productResponse.data.data.sellerID
                axios.get(sellerAddress)
                    .then(sellerPesponse => {
                        this.setState({
                            user: sellerPesponse.data.data
                        });
                    }).catch((error) => {
                        user: {}
                    });
                this.setState({
                    product: productResponse.data.data
                });
            }).catch((error) => {
                this.setState({
                    product: {}
                });
            });
    }

    render() {
        var verified = ""
        if(this.state.user.verified){
            verified = "Yes"
        }else{
            verified = "No"
        }
        return (
            <div>
                <section id = "intro">
                    <div>
                        <img src={this.state.product.productImage}/>
                        {/* <img src="https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image03?v=2021112423"/> */}
                        <h1>{this.state.product.productName}</h1>
                        <p class="lead">{this.state.product.productDescription}</p>
                    </div>
                </section>
                <section id = "seller-info">
                    <img src={this.state.user.profileImage}/>
                    <h3>Seller: {this.state.user.name}</h3>
                    <h3>UIUC student/faculty certification: {verified}</h3>
                    <h3>Cell phone: N/A</h3>
                    <h3>Email: {this.state.user.email}</h3>
                    <button>Contact seller</button>
                </section>
            </div>
        );
    }
}

export default Details;

