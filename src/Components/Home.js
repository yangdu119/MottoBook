import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'

import { Container, Divider, Dropdown,
     List, Menu, Card,
    Button} from 'semantic-ui-react'
import QuoteCard from './Card'
import InputExampleFluid from './InputExampleFluid'
import FeedExampleBasic from './Feed'
import VerticalMenu from './VerticalMenu'

import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'
import AllQuotes from './AllQuotes';

const Placeholder = () => <Image src='/assets/images/wireframe/paragraph.png' />

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            radioSelected: 'clear',
        }
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    handleCategoryClick = (item) => {

        this.setState({
            radioSelected: item.value
        })
    }

    // handleAuthorNameChange = (name) =>{
    //     this.setState({
    //         authorName: name
    //     })
    // }
    //
    // handleAuthorNameSubmit = () => {
    //
    // }

    render() {

        const { contextRef } = this.state
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                        <Grid.Column computer={'3'} only={'computer'}>
                            <VerticalMenu onCategoryClick={this.handleCategoryClick} />
                        </Grid.Column>
                        <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                            <AllQuotes {...this.state} auth={this.props.auth}/>
                        </Grid.Column>
                        {/*<Grid.Column computer={'3'} only={'computer'}>*/}
                            {/*<FeedExampleBasic />*/}
                        {/*</Grid.Column>*/}
                </Grid>
                <MottoBookFooter />
            </div>

        )
    }
}
