import React, { Component }from 'react';
import {Menu, Button} from 'semantic-ui-react'
import SearchBar from './SearchBar'

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
                <Menu.Item style={{ marginLeft: '6em' }} header as='a' href='/'>MottoBook</Menu.Item>

                <SearchBar />

                <Menu.Menu position='right' style={{ marginRight: '6em' }}>
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

