import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/moviex.png';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <Link to="/" className="logo">
                        <img src={logo} alt="" />
                        <h4>Movio</h4>
                    </Link>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/movie">Movies</Link>
                        <Link to="/tv">TV Series</Link>
                    </div>
                    <div className="footer__content__menu">
                        {/* <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link> */}
                    </div>
                    <div className="footer__content__menu">
                        {/* <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
