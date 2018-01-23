import React, { Component } from 'react'
import { Menu, Sticky } from 'semantic-ui-react'

export default class MenuExampleVerticalPointing extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { activeItem } = this.state
        const { contextRef } = this.state

        return (
            <div>
                <Sticky context={contextRef}>
                <Menu pointing vertical fixed visible >
                    <Menu.Item name='Quotes Feed' active={activeItem === 'home'} onClick={this.handleItemClick} />
                    <Menu.Item name='My MottoBook' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                    <Menu.Item name='My Likes' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                    <Menu.Item name='My Dislikes' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                </Menu>
                </Sticky>
            </div>
        )
    }
}