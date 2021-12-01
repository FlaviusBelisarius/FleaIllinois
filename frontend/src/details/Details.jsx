import React, { Component } from "react";
import Header from '../common/Header';
import './Details.css'

class Details extends Component {
    render() {
        return (
            <div>
                <Header/>
                <section id = "intro">
                    <div>
                        <img src="https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image03?v=2021112423"/>
                        <h1>99% new switch</h1>
                        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque 
                        volutpat ac tincidunt vitae. Sed arcu non odio euismod lacinia at quis 
                        risus. Nec ultrices dui sapien eget. Non tellus orci ac auctor augue 
                        mauris augue neque. Accumsan lacus vel facilisis volutpat est. Blandit 
                        turpis cursus in hac habitasse platea dictumst. Nunc eget lorem dolor 
                        sed viverra ipsum nunc aliquet bibendum. Ligula ullamcorper malesuada 
                        proin libero nunc. Elit eget gravida cum sociis natoque penatibus et. 
                        Cursus turpis massa tincidunt dui ut ornare lectus. Amet venenatis 
                        urna cursus eget nunc scelerisque viverra mauris in. </p>
                    </div>
                </section>
                <section id = "seller-info">
                    <img src="https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"/>
                    <h3>Seller: wubba lubba dub dub!</h3>
                    <h3>UIUC student/faculty certification: Yes</h3>
                    <h3>Cell phone: N/A</h3>
                    <h3>Email: wldd@illinois.edu</h3>
                    <button>Contact seller</button>
                </section>
            </div>
        );
    }
}

export default Details;

