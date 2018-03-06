import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'
import QuoteCard from '../../QuoteCard'
import {compose, graphql} from "react-apollo/index";
import gql from "graphql-tag";

class QuoteDetailPage extends Component {

    componentWillReceiveProps(nextProps) {
        let quoteId = nextProps.match.params.quoteId
        if (nextProps.match.params.quoteId !== this.props.match.params.quoteId){
            this.props.quoteGql.refetch({
                id: quoteId
            });
        }
    }

    componentDidMount(){
        //handle page load
        if (!this.props.quoteGql.quote){
            this.props.quoteGql.refetch({
                id: this.props.match.params.quoteId
            });
        }
    }

    render() {
        const quote = this.props.quoteGql.quote
        console.log("this props", this.props);
        return (
            <div>
                <MottoBookHeader auth={this.props.auth} {...this.props} />
                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                        {
                            quote &&
                        <QuoteCard
                            key={this.props.match.params.quoteId}
                            quote={quote}
                            auth={this.props.auth}
                        />
                        }
                    </Grid.Column>
                </Grid>
                <MottoBookFooter/>
            </div>
        )
    }
}

const QUOTE_QUERY = gql`
    query quoteQuery($id: ID!){
        quote(where:{id:$id}){
            id
            authorQuote
            authorBirthday
            authorBirthplace
            authorOccupation
            author
            likes
            dislikes
            imageUrl
            createdAt
        }
    }
`
const quoteGraphql = graphql(QUOTE_QUERY, {
    name: 'quoteGql',
    options: {
        variables: {
            id: 'none'
        },
        fetchPolicy: 'cache-and-network',
    }
})

export default compose(
    quoteGraphql,
)(QuoteDetailPage)
