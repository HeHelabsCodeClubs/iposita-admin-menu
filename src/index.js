import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import Notifications from 'react-notify-toast';
import { Link } from 'react-router-dom';
import './style.css';

class IpositaHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseStatus: 'closed',
            showAbundanceMenu: false,
            showCustomerMenu: false,
            showConfigMenu: false,
            userData: {}
        };
    this.handleHamburgerIconClick = this.handleHamburgerIconClick.bind(this);
    this.customerHandleHover = this.customerHandleHover.bind(this);
    this.customerHandleLeave = this.customerHandleLeave.bind(this);
    this.abundanceHandleHover = this.abundanceHandleHover.bind(this);
    this.abundanceHandleLeave = this.abundanceHandleLeave.bind(this);
    this.renderViews = this.renderViews.bind(this);
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

    abundanceHandleHover () {
        this.setState({ showAbundanceMenu: true });
    };
      
    abundanceHandleLeave () {
        this.setState({ showAbundanceMenu: false });
    };

    renderViews(viewsData, clientData) {
        if (!isEmpty(viewsData)) {
            const viewsList = [];
            for(let i = 0; i < viewsData.length; i++) {
                const { name, label } = viewsData[i];
                if (name !== 'customers') {
                    viewsList.push(<li className="nav__menu-item" key={name}>
                    <Link to={`/${name}`} className='main-menu__item-a'>
                        {label}
                    </Link>
                    </li>);
                } else if (name === 'customers') {
                    viewsList.push(
                        <li className="nav__menu-item" onMouseLeave={this.customerHandleLeave} key={name}>
                            <div 
                            onMouseEnter={this.customerHandleHover} 
                            className='main-menu__item-a'>
                            {viewsData[i].label}
                            <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                            </div>
                            { this.state.showCustomerMenu && 
                                <ul className="nav__submenu">
                                    <li className="nav__submenu-item" key={'menu_one'}>
                                        <Link to={`/${name}`} className={this.props.view === 'customers' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>All customers</Link>
                                    </li>
                                    <li className="nav__submenu-item" key={'menu_two'}>
                                        <Link to={`/${name}/create/details`} className={this.props.view === 'customercreate' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>Add Customer</Link>
                                    </li>
                                </ul>
                            }
                        </li>
                    );
                } 
            }
            if (clientData.admin_site === "https://dmmhehe.shypt.hehe.rw") {
                viewsList.push(
                    <li className="nav__menu-item" onMouseLeave={this.abundanceHandleLeave} key='abundance'>
                        <div 
                            onMouseEnter={this.abundanceHandleHover} 
                            className='main-menu__item-a'>
                            Abundance
                            <span className={this.state.showAbundanceMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                        </div>
                        { this.state.showAbundanceMenu && 
                            <ul className="nav__submenu">
                                <li className="nav__submenu-item" key={'menu_one'}>
                                    <Link to={`/abundance/sourcing`} className={this.props.view === 'abundancesourcing' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>Sourcing</Link>
                                </li>
                                <li className="nav__submenu-item" key={'menu_two'}>
                                    <Link to={`/abundance/shopping-lists`} className={this.props.view === 'abundanceshoppinglists' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>Shopping Lists</Link>
                                </li>
                                <li className="nav__submenu-item" key={'menu_three'}>
                                    <Link to={`/members`} className={this.props.view === 'abundancemembers' ? 'sub-menu__item-a active' : 'sub-menu__item-a'}>Members</Link>
                                </li>
                            </ul>
                        }
                    </li>
                );
            }
            return (
                <ul className="nav__menu">
                    {viewsList}
                </ul>
            );
        }
        return <div>Loading...</div>
    }

    render() {
        //const borderClass = this.props.hasBorder ? ' dashed-border' : '';
        //const backgroundColorClass = this.props.hasWhiteBackground ? 'white-background' : '';
        const { children, viewData, clientData } = this.props;
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
                            {this.renderViews(viewData, clientData)}
                        </nav>
                    </div>
                </div>   
            </div>         
        );
    }
};

export default IpositaHeader;







  