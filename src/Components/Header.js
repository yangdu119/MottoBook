import React from 'react';
import {Menu, Button} from 'semantic-ui-react'
import SearchBar from './SearchBar'

const MottoBookHeader = () =>(

    <Menu fixed='top' inverted className={'ui blue'}>
        <Menu.Item style={{ marginLeft: '6em' }} as='a' header >
            MottoBook
        </Menu.Item>

        <SearchBar />

        <Menu.Menu position='right' style={{ marginRight: '6em' }}>
            <Menu.Item className='item'>
                <a href="/newquote">New Quote</a>
            </Menu.Item>
            <Menu.Item className='item'>
                <a href="/newquote">Login</a>
            </Menu.Item>
            <Menu.Item className='item'>
                <a href="/newquote">Sign up</a>
            </Menu.Item>
        </Menu.Menu>

    </Menu>
)

export default MottoBookHeader