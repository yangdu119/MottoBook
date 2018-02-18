import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import SearchQuotes from './SearchQuotes'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'

export default class SearchPage extends Component {


    componentWillReceiveProps(nextProps) {
        let authorName = nextProps.match.params.authorName
        if (authorName !==this.props.match.params.authorName){
            console.log('SearchPage willReceiveProps: ',authorName)
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
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        <SearchQuotes {...this.state} {...this.props}/>
                    </Grid.Column>
                </Grid>
                <MottoBookFooter />
            </div>
        )
    }
}
