import React, { Component } from 'react';
import './navigation.css'
import logo from '../../flight.svg'

const Navigation = (props) => {
    if (props.names === 'Book Now') {
        return (
            <a href="#" className="book-button">
                <span>{props.names}</span>
            </a>
        )
    }

    if (props.names === 'RN adventure') {
        let name = props.names.split(' ')
        return (
            <a href="#" className="brand-name">
                <img src={logo} className="logo"/>
                <span>{name[0]}</span><span className="adventure">{name[1]}</span>
            </a>
        )
    }

    return (
        <a href="#" className="links">
            <span>{props.names}</span>
        </a>
    )
}

export default Navigation