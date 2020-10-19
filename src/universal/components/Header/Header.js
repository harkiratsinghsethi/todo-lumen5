import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './styles.less'

const Header = () => {
    const [welcomeUser, setWelcomeUser] = useState('')

    return (
        <nav className="navbar navbar-default header-primary header">

            <div className="collapse navbar-collapse text-right">
                <Link to="/" className="header--logo d-inline">
                    {'Home'} {welcomeUser}
                </Link>

                <Link to="/" onClick={() => window.location.reload()} className="logout--logo d-inline">
                    {'Logout'}
                </Link>
            </div>
        </nav>
    )
};


export default Header;
