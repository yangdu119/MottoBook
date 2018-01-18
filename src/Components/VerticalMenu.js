import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleVerticalPointing extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu pointing vertical fixed visible>
                <Menu.Item name='Quotes Feed' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item name='My Likes' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                <Menu.Item name='My Motto' active={activeItem === 'messages'} onClick={this.handleItemClick} />
            </Menu>
        )
    }
}