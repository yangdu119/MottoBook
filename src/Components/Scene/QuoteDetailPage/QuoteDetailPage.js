import React, { Component } from 'react'
import { Grid, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import SearchQuotes from './SearchQuotes'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'

export default class QuoteDetailPage extends Component {
    constructor() {
        super();

        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        let authorName = nextProps.match.params.authorName
        if (authorName !=this.state.authorName) {
            console.log('SearchPage willReceiveProps: ', authorName)
            this.setState({
                authorName
            })
        }
    }
    componentDidMount() {
        console.log('SearchPage componentDidMount props', this.props);
        let authorName = this.props.match.params.authorName
        console.log('authorName: ',authorName)
        this.setState({
            authorName
        })
    }

    render() {

        const { contextRef } = this.state
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <SearchQuotes {...this.state}/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
