import React, { Component } from 'react'
import { Grid, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import FeedExampleBasic from '../Feed'
import VerticalMenu from '../VerticalMenu'
import FilterQuotes from './FilterQuotes'
import MottoBookHeader from '../Header'
import MottoBookFooter from '../Footer'

export default class NotFound extends Component {
    constructor() {
        super();
    }

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
