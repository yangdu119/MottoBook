import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import AuthorQuotes from './AuthorQuotes'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'

export default class AuthorQuotesPage extends Component {

    // componentWillReceiveProps(nextProps) {
    //     let authorName = nextProps.match.params.authorName
    //     if (authorName !==this.props.match.params.authorName) {
    //         this.setState({
    //             authorName: authorName
    //         })
    //     }
    // }
    // componentDidMount() {
    //     let authorName = this.props.match.params.authorName
    //     this.setState({
    //         authorName
    //     })
    // }

    render() {

        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <AuthorQuotes {...this.props} auth={this.props.auth}/>
                    </Grid.Column>
                </Grid>
                <MottoBookFooter />
            </div>
        )
    }
}
