import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'

import { Container, Divider, Dropdown,
     List, Menu, Card,
    Button} from 'semantic-ui-react'
import QuoteCard from './Card'
import InputExampleFluid from './InputExampleFluid'
import FeedExampleBasic from './Feed'
import MenuExampleVerticalPointing from './VerticalMenu'

import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'
import AllQuotes from './AllQuotes';

const Placeholder = () => <Image src='/assets/images/wireframe/paragraph.png' />

// const Home = () => (
//
//     <div>
//         <MottoBookHeader />
//
//         <div className="ui grid container" style={{ marginTop: '1em' }}>
//
//             <div className="three wide column" >
//                 <MenuExampleVerticalPointing />
//             </div>
//             <div className="eight wide column">
//                 <div className={"ui"} >
//                     <AllQuotes />
//
//                 </div>
//             </div>
//             <div class="five wide column">
//                 <FeedExampleBasic />
//             </div>
//
//         </div>
//
//
//         <MottoBookFooter />
//
//     </div>
// );

export default class Home extends Component {
    state = {}

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { contextRef } = this.state

        return (
            <div>
                <MottoBookHeader />
                <Grid centered style={{ marginTop: '3em' }}>

                        <div ref={this.handleContextRef}>
                            <Segment>
                                <Grid.Column width={8}>
                                <AllQuotes />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                <Rail position='left'>
                                    <Sticky context={contextRef} offset={70}>
                                        <MenuExampleVerticalPointing />
                                    </Sticky>
                                </Rail>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                <Rail position='right'>
                                    <Sticky context={contextRef} offset={70}>
                                        <FeedExampleBasic />
                                    </Sticky>
                                </Rail>
                                </Grid.Column>
                            </Segment>
                        </div>

                </Grid>
                <MottoBookFooter />
            </div>
        )
    }
}
