import React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {/* TODO: Highlight the current page */}
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-light" href="/login">
                                Log In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
