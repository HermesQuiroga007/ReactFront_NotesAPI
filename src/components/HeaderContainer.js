import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imagen from '../img/conf.png';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.props.showUserInfo && this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.props.toggleUserInfo();
        }
    };

    render() {
        const { isAuthenticated, showUserInfo, toggleUserInfo, emailUsuario, handleLogout } = this.props;

        return (
            <header className="text-white" style={{ backgroundColor: '#D6EFF6' }}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="chn text-dark m-1"><strong>Home</strong></Link></li>
                        </ul>
                        <div className="text-end">
                            {!isAuthenticated && (
                                <Link to="/login" className="btn btn-outline-dark m-1">Login</Link>
                            )}
                            {!isAuthenticated && (
                                <Link to="/register" className="btn btn-outline-dark m-1">Register</Link>
                            )}

                            {isAuthenticated && (
                                <div ref={this.dropdownRef} className='dropdown'>
                                    <button className='button bg-transparent' onClick={toggleUserInfo}>
                                        <img className='imgapp' src={imagen} alt="Descripción de la imagen" height={'30px'} width={'30px'} />
                                    </button>
                                    {showUserInfo && (
                                        <div className="panelUsuario text-white">
                                            <p>Bienvenido {emailUsuario || 'Correo no disponible'}</p>
                                            <button className="btn btb m-2" onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderContainer;
