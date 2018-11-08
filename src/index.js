import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import { Link } from 'react-router-dom';
import './style.css';

class UmutiHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseStatus: 'closed',
            showOrderMenu: false,
            showCustomerMenu: false,
            showConfigMenu: false,
            userData: {}
        };
    this.handleHamburgerIconClick = this.handleHamburgerIconClick.bind(this);
    this.customerHandleHover = this.customerHandleHover.bind(this);
    this.customerHandleLeave = this.customerHandleLeave.bind(this);
    };

    handleHamburgerIconClick(e) {
        e.preventDefault();
        const { collapseStatus } = this.state;
        if (collapseStatus === 'closed') {
            this.setState({
                collapseStatus: 'show'
            });
        } else {
            this.setState({
                collapseStatus: 'closed'
            });
        }
    }
    customerHandleHover () {
        this.setState({ showCustomerMenu: true });
    };
      
    customerHandleLeave () {
        this.setState({ showCustomerMenu: false });
    };

    render() {
        const borderClass = this.props.hasBorder ? ' dashed-border' : '';
        const backgroundColorClass = this.props.hasWhiteBackground ? 'white-background' : '';
        const { children } = this.props;
        const { collapseStatus, userData, clientInfoData } = this.state;
        const collapseClasses = collapseStatus === 'closed' ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        return(
            <div className="common-header">
                <Notifications />

                {/* top panel */}

                <div>
                    {children}
                </div>
                <div className="main-menu row">
                    <button 
                    className="navbar-toggler btn barBtn" 
                    type="button" data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    onClick={this.handleHamburgerIconClick}
                    >
                    <span className="navbar-toggler-icon"><span className="icon-list-view"></span></span>
                    </button>
                    <div className={collapseClasses} id="navbarSupportedContent">
                        <a 
                        className="hamburger-closer"
                        onClick={this.handleHamburgerIconClick}
                        >
                        <span className="not-close icon-icon_close"></span>
                        </a>
                        <nav className="nav nav-container">
                            <ul className="nav__menu">
                                <li className="nav__menu-item">
                                    <Link to="/dashboard" className={this.props.view === 'dashboard' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Dashboard</Link>
                                </li>
                                <li className="nav__menu-item">
                                    <Link to="/orders" className={this.props.view === 'orders' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Requests</Link>
                                </li>
                                <li className="nav__menu-item" onMouseLeave={this.customerHandleLeave}>
                                    <div 
                                    onMouseEnter={this.customerHandleHover} 
                                    className={this.props.view === 'customers' || this.props.view === 'customercreate' ? 'main-menu__item-a active' : 'main-menu__item-a'
                                    }>
                                    Customers
                                    <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                                    </div>
                                    { this.state.showCustomerMenu && 
                                        <ul className="nav__submenu">
                                            <li className="nav__submenu-item ">
                                                <Link to="/customers" className={this.props.view === 'customers' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>All customers</Link>
                                            </li>
                                            <li className="nav__submenu-item ">
                                                <Link to="/customers/create/details" className={this.props.view === 'customercreate' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>Add Customer</Link>
                                            </li>
                                        </ul>
                                    }
                                </li>
                                <li className="nav__menu-item">
                                    <Link to="/invoices" className={this.props.view === 'invoices' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Invoices</Link>
                                </li>
                                <li className="nav__menu-item">
                                    <Link to="/config" className={this.props.view === 'configurations' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Configurations</Link>
                                </li>
                                <li className="nav__menu-item">
                                    <Link to="/messages" className={this.props.view === 'messages' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Messages</Link>
                                </li>
                                <li className="nav__menu-item">
                                    <Link to="/users" className={this.props.view === 'users' ? 'main-menu__item-a active' : 'main-menu__item-a'}>Users</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>   
            </div>         
        );
    }
};

export default UmutiHeader;







  