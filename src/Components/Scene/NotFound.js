import React, { Component } from 'react'
import MottoBookHeader from '../Header'
import MottoBookFooter from '../Footer'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <h1 style={{ marginTop: '3em' }}>Not Found
                </h1>
                <MottoBookFooter />

            </div>
        )
    }
}
