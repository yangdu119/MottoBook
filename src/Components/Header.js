import React, { Component }from 'react';
import {Menu, Button} from 'semantic-ui-react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

class MottoBookHeader extends Component {
    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return(
            <Menu fixed='top' inverted className={'ui blue'}>

                <Menu.Item header as='a' href='/'>
                    <img src="/mottobook2.svg" alt="MottoBook"/>
                    MottoBook
                </Menu.Item>

                <Menu.Item>
                    <SearchBar />
                </Menu.Item>

                <Menu.Menu position='right'>
                    {
                        isAuthenticated() && (
                            <Menu.Item className='item'>
                                <a href="/newquote">New Quote</a>
                            </Menu.Item>
                        )
                    }
                    {
                        isAuthenticated() && (
                            <div>
                                <Menu.Item className='item'>
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.goTo.bind(this, 'profile')}
                                    >Profile</a>
                                </Menu.Item>
                            </div>
                        )
                    }
                    {
                        !isAuthenticated() && (
                            <div>
                                <Menu.Item className='item'>
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.login.bind(this)}
                                    >Login</a>
                                </Menu.Item>
                            </div>
                        )
                    }
                    {
                        (
                            <div>
                                <Menu.Item className='item'>
                                    <Link to="/aboutus">About Us</Link>
                                </Menu.Item>
                            </div>
                        )
                    }
                    {
                        isAuthenticated() && (
                            <div>
                                <Menu.Item className='item'>
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.logout.bind(this)}
                                    >Log Out</a>
                                </Menu.Item>
                            </div>
                        )
                    }



                </Menu.Menu>

            </Menu>
        )
    }
}

export default MottoBookHeader

