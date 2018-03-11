import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {Button, Dimmer, Loader} from 'semantic-ui-react'
import gql from 'graphql-tag'
import QuoteCard from './QuoteCard'

const QUOTES_PER_PAGE = 10;
const RANDOM_SKIP_NUMBER = Math.floor(Math.random() * 150);
class AllQuotes extends Component {

    filterLoadMore = () => {
        console.log('state filterValue: ', this.state.filterValue);
        this.props.loadFilterQuotes(this.state.filterValue);
    }

    render() {
        const { data: { loading, error } } = this.props;
        if (loading) {
            return (
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        } else if (error) {
            return <p>Error!</p>;
        } else {
            return (
                <div>
                    {
                        this.props.data.quotes && this.props.data.quotes.map(quote => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                                auth={this.props.auth}
                            />))

                    }

                    {

                        <Button primary onClick={this.props.loadMoreQuotes}>
                            Load More Quotes
                        </Button>

                    }

                </div>

            );
        }
    }

}

const ALL_QUOTES_QUERY = gql`
    query allQuotesQuery($first: Int!, $skip: Int!){
        quotes(orderBy: createdAt_DESC, first:$first, skip:$skip){
            id
            authorQuote
            authorBirthday
            authorBirthplace
            authorBirthname
            authorOccupation
            author
            likes
            dislikes
            imageUrl
            createdAt
            dislikedBy{
                id
                name
            }
            likedBy{
                id
                name
            }
        }
    }
`





const allQuotesGraphql = graphql(ALL_QUOTES_QUERY, {
    name: 'data',
    options: {
        variables: {
            skip: RANDOM_SKIP_NUMBER,
            first: QUOTES_PER_PAGE
        },
        fetchPolicy: 'cache-and-network',
    },
    props: ({data}) => ({
        data,
        loadMoreQuotes: () => {
            //console.log("click load more");
            return data.fetchMore({
                variables: {
                    skip: data.quotes.length
                },
                updateQuery:(previousResult, {fetchMoreResult}) => {
                    if(!fetchMoreResult) {
                        return previousResult
                    }
                    return Object.assign({}, previousResult, {
                        quotes: [...previousResult.quotes, ...fetchMoreResult.quotes]
                    })
                }
            })
        }
    })
})

export default compose(
    allQuotesGraphql,
)(AllQuotes)
