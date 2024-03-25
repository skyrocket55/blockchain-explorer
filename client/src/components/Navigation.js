import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

function Navigation() {
  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    <div className='row'>
                        <div className='col'>
                            <Header title="Ethereum Blockchain Explorer" margin="ml-2" icon={faEthereum} size="xl"/>
                        </div>
                    </div>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/transactions" className="nav-link" aria-current="page">
                                <Header title="Transactions" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/transfer" className="nav-link">
                                <Header title="Transfer" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/blocks" className="nav-link">
                                <Header title="Blocks" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navigation