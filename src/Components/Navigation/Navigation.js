import React, { Component } from 'react';
import './navigation.css'
import logo from '../../flight.svg'

export default class Navigation extends Component {
    render() {
        return (
            <div className="navbar">
                <div>
                    <a href="#" className="brand-name links">
                        <img src={logo} className="logo"/>
                        <span>RN<span className="adventure">adventure</span></span>
                    </a>
                    <a className="links" href="#">
                        <span>About Us</span>
                    </a>
                    <a className="links" href="#">
                        <span>Package</span>
                    </a>
                    <a className="links" href="#">
                        <span>Places</span>
                    </a>
                    <a className="links" href="#">
                        <span>Contact Us</span>
                    </a>
                    <a href="#" className="book-button">
                        <span>Book Now</span>
                    </a>
                </div>
            </div>
        )
    }
}