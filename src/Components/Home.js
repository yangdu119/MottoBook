import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import VerticalMenu from './VerticalMenu'

import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'
import AllQuotes from './AllQuotes';

export default class Home extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated()){
            console.log('authenticated, get userid')
            this.props.auth.getUserIDHelper();
        }
    }

    render() {
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
