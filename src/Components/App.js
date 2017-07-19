import React, { Component } from 'react';
import Navigation from './Navigation/Navigation'
import '../App.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className="navbar">
                    {menu.linkNames.map((link, index) =>
                        <Navigation css={menu.css} key={index} names={link}/>
                    )}
                </div>
            </div>
        )
    }
}

const menu = {
    linkNames: ['RN adventure', 'About Us', 'Package', 'Places', 'Contact Us', 'Book Now'],
    css: 'links'
}

export default App;
