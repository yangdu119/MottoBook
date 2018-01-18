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
                <Button as='a' primary>New Quote</Button>
            </Menu.Item>
            <Menu.Item className='item'>
                <Button as='a' primary>Log in</Button>
            </Menu.Item>
        </Menu.Menu>

    </Menu>
)

export default MottoBookHeader