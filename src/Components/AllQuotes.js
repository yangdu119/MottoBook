import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, compose } from "react-apollo";
import QueryAllQuotes from "../GraphQL/QueryAllQuotes";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";

import moment from "moment";
import {Card,Icon, Image, Button } from 'semantic-ui-react'
import xmlToJSON from 'xmltojson'
import 'whatwg-fetch'
import gql from 'graphql-tag'
import QuoteCard from './QuoteCard'

const QUOTES_PER_PAGE = 10;
class AllQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {images: []}
    }

    static defaultProps = {
        events: [],
        deleteEvent: () => null,
    }

    async handleDeleteClick(event, e) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete quote ${event.id}`)) {
            const { deleteEvent } = this.props;

            await deleteEvent(event);
        }
    }

    render() {
        return (
            <div>
                {this.props.data.allQuotes && this.props.data.allQuotes.map(quote => (
                    <QuoteCard
                        key = {quote.id}
                        quote = {quote}
                        refresh={() => this.props.allQuotesQuery.refetch()}
                        getRandomImage = {this.getRandomImage}
                    />

                ))}
                <Button primary onClick={this.props.loadMoreQuotes}>
                    Load More Quotes
                </Button>
            </div>

        );
    }

}

const ALL_QUOTES_QUERY = gql`
    query allQuotesQuery($first: Int!, $skip: Int!){
        allQuotes(orderBy: createdAt_DESC, first:$first, skip:$skip){
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
        }
    }
`

export default graphql(ALL_QUOTES_QUERY, {
    name: 'data',
    options: {
        variables: {
            skip: 0,
            first: QUOTES_PER_PAGE
        },
        fetchPolicy: 'network-only',
    },
    props: ({data}) => ({
        data,
        loadMoreQuotes: () => {
            console.log("click load more");
            return data.fetchMore({
                variables: {
                    skip: data.allQuotes.length
                },
                updateQuery:(previousResult, {fetchMoreResult}) => {
                    if(!fetchMoreResult) {
                        return previousResult
                    }
                    return Object.assign({}, previousResult, {
                        allQuotes: [...previousResult.allQuotes, ...fetchMoreResult.allQuotes]
                    })
                }
            })
        }
    })
})(AllQuotes)
