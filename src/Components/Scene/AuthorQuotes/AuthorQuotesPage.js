import React, { Component } from 'react'
import { Grid, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import AuthorQuotes from './AuthorQuotes'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'

export default class AuthorQuotesPage extends Component {
    constructor() {
        super();

        this.state = {
        }
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    handleCategoryClick = (item) => {

        this.setState({
            radioSelected: item.value
        })
    }

    componentWillReceiveProps(nextProps) {
        let authorName = nextProps.match.params.authorName
        console.log('AuthorQuotesPage willReceiveProps: ',authorName)
        this.setState({
            radioSelected: authorName
        })
    }
    componentDidMount() {
        console.log('AuthorQuotesPage componentDidMount props', this.props);
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
                <h1>{this.props.match.params.name}</h1>
                <Grid centered style={{ marginTop: '3em' }}>

                    <div ref={this.handleContextRef}>
                        <Segment>
                            <Grid.Column width={8}>
                                <AuthorQuotes {...this.state}/>
                            </Grid.Column>

                        </Segment>
                    </div>

                </Grid>
            </div>
        )
    }
}
