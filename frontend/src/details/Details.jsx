import React, { Component } from "react";
import axios from "axios";
import './Details.css';
import { Button, Comment, Form} from 'semantic-ui-react';
import { Fragment } from "react"
import { useAuth } from "../common/AuthContext"
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const Details = () => {
    const { currentUser, logoutUser } = useAuth()
    console.log("user: ", currentUser)
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [commentList, setCommentList] = useState([])

    const fetchProducts = async () => {
        var productAddress = "http://localhost:4000/api/products" + window.location.href.slice(29)
        axios.get(productAddress)
            .then(productResponse => {
                var sellerAddress = "http://localhost:4000/api/users/"+productResponse.data.data.sellerID
                axios.get(sellerAddress)
                    .then(sellerPesponse => {
                        setUser(sellerPesponse.data.data);
                    }).catch((error) => {
                        user: {}
                    });
                setProduct(productResponse.data.data)
                setCommentList(productResponse.data.data.commentList) // do not know why...
            }).catch((error) => {
                setProduct({})
            });
    }

    useEffect (() => {
        fetchProducts()
    }, [useLocation()])

    var verified = ""
    if(user.verified){
        verified = "Yes"
    }else{
        verified = "No"
    }
    var cellphone = "N/A"
    
    return (
        <div className="div">
            <section id = "intro">
                <div>
                    <img src={product.productImage}/>
                    {/* <img src="https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image03?v=2021112423"/> */}
                    <h1>{product.productName}</h1>
                    <p class="lead">{product.productDescription}</p>
                </div>
            </section>
            <section id = "seller-info">
                <img src={user.profileImage}/>
                <div class="ui card">
                    <div class="content">
                        <div class="header">{user.name}</div>
                        <div class="meta">UIUC student/faculty certification: {verified}</div>
                        {currentUser
                            ?
                            <div class="description">Cell phone: {cellphone}<br></ br>Email: {user.email}</div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </section>
            <section id="comments">
            {currentUser 
                ? 
                <div>
                    <Comment.Group>
                        {commentList.map(comment => (
                            <Comment>
                                <Comment.Content>
                                    <Comment.Author as='a'>{comment.split("#")[0]}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{comment.split("#")[1]}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.split("#")[2]}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))}
                    </Comment.Group>
                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                </div>
                :
                <div></div>
            }
            </section>
        </div>
    );
}

export default Details;






// import React, { Component } from "react";
// import axios from "axios";
// import './Details.css';
// import { Button, Comment, Form} from 'semantic-ui-react';

// class Details extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             product: {},
//             user: {},
//             commentList: []
//         };
//     }

    
//     // console.log("user: ", currentUser)

//     componentDidMount() {
//         var productAddress = "http://localhost:4000/api/products" + window.location.href.slice(29)
//         axios.get(productAddress)
//             .then(productResponse => {
//                 var sellerAddress = "http://localhost:4000/api/users/"+productResponse.data.data.sellerID
//                 axios.get(sellerAddress)
//                     .then(sellerPesponse => {
//                         this.setState({
//                             user: sellerPesponse.data.data
//                         });
//                     }).catch((error) => {
//                         user: {}
//                     });
//                 this.setState({
//                     product: productResponse.data.data,
//                     commentList: productResponse.data.data.commentList // do not know why...
//                 });
//             }).catch((error) => {
//                 this.setState({
//                     product: {}
//                 });
//             });
//     }

//     render() {
//         var verified = ""
//         if(this.state.user.verified){
//             verified = "Yes"
//         }else{
//             verified = "No"
//         }
//         var cellphone = "N/A"
//         // if(this.state.user.phoneNumber.length && this.state.user.phoneNumber.length > 0){
//         //     cellphone = this.state.user.phoneNumber.length
//         // }
//         return (
//             <div className="div">
//                 <section id = "intro">
//                     <div>
//                         <img src={this.state.product.productImage}/>
//                         {/* <img src="https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image03?v=2021112423"/> */}
//                         <h1>{this.state.product.productName}</h1>
//                         <p class="lead">{this.state.product.productDescription}</p>
//                     </div>
//                 </section>
//                 <section id = "seller-info">
//                     <img src={this.state.user.profileImage}/>
//                     <div class="ui card">
//                         <div class="content">
//                             <div class="header">{this.state.user.name}</div>
//                             <div class="meta">UIUC student/faculty certification: {verified}</div>
//                             <div class="description">Cell phone: {cellphone}<br></ br>Email: {this.state.user.email}</div>
//                         </div>
//                     </div>
//                 </section>
//                 <section id="comments">
//                 <Comment.Group>
//                     {this.state.commentList.map(comment => (
//                         <Comment>
//                             <Comment.Content>
//                                 <Comment.Author as='a'>{comment.split("#")[0]}</Comment.Author>
//                                 <Comment.Metadata>
//                                     <div>{comment.split("#")[1]}</div>
//                                 </Comment.Metadata>
//                                 <Comment.Text>{comment.split("#")[2]}</Comment.Text>
//                             </Comment.Content>
//                         </Comment>
//                     ))}
//                 </Comment.Group>
//                 <Form reply>
//                     <Form.TextArea />
//                     <Button content='Add Comment' labelPosition='left' icon='edit' primary />
//                 </Form>
//                 </section>
//             </div>
//         );
//     }
// }

// export default Details;