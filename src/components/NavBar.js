import React from 'react';

function NavBar(){
    
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar1">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> <a href="/users"  className="btn btn-link nav-link text-white" >Users</a></li>
                            <li className="nav-item"> <a href="/books" className="btn btn-link nav-link text-white" >Books</a></li>
                        </ul>
                    </div>
                </div>
        </nav>
    );
};

export default NavBar;