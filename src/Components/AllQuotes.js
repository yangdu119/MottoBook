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

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.location.key !== nextProps.location.key) {
    //         this.props.quotes.refetch()
    //     }
    // }

    componentDidMount = () => {
        let request = {};
        request.headers = { 'Accept': 'text/html,application/xhtml+xml,application/xml'}
        request.url = 'https://s3-us-west-2.amazonaws.com/mottobook-images/';
        let self = this;
        fetch(request.url, request)
            .then(function(response) {
                return response.text()
            }).then(function(xml) {
            let result = xmlToJSON.parseString(xml);
            let length = result['ListBucketResult'][0]['Contents'].length
            let allItems = result['ListBucketResult'][0]['Contents'];
            let images = []

            console.log("length", length);

            // allItems.forEach(function(item){
            //     let filename = item['Key'][0]['_text'];
            //     let url = request.url+filename
            //     images.push(url)
            // })
            //
            // self.setState({'images': images});


        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    render() {
        console.log("allQuoteQuery", this.props.allQuotesQuery);
        return (
            <div>
                {this.props.allQuotesQuery.allQuotes && this.props.allQuotesQuery.allQuotes.map(quote => (
                    <QuoteCard
                        key = {quote.id}
                        quote = {quote}
                        refresh={() => this.props.allQuotesQuery.refetch()}
                        getRandomImage = {this.getRandomImage}
                    />

                ))}
                <Button primary onClick={this.props.loadOlderMessages}>
                    Load More Quotes
                </Button>
            </div>

        );
    }

}

const ALL_QUOTES_QUERY = gql`
    query allQuotesQuery{
        allQuotes{
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
        }
    }
`

const ListPageWithQuery = graphql(ALL_QUOTES_QUERY, {
    name: 'allQuotesQuery',
    options: {
        fetchPolicy: 'network-only',
    },
})(AllQuotes)

export default ListPageWithQuery


/*

export default compose(
    graphql(
        QueryAllQuotes,
        {
            options: {
                fetchPolicy: 'network-only',
            },
            props: ({ data: { allQuote = { items: [] }, fetchMore } }) => ({
                events: allQuote.items,

                nextToken: allQuote.nextToken,

                loadOlderMessages: () => {
                    return fetchMore({
                        variables: {
                            nextToken: allQuote.nextToken,
                        },
                        updateQuery(previousResult, {fetchMoreResult}) {
                            console.log('previousResult', previousResult)
                            console.log('fetchMoreResult', fetchMoreResult)
                            const prevMessageFeed =
                                previousResult.allQuote.items;
                            const newMessageFeed =
                                fetchMoreResult.allQuote.items;
                            const newChannelData = {
                                ...previousResult.allQuote,
                                allQuote: {
                                    items: [
                                        ...prevMessageFeed,
                                        ...newMessageFeed
                                    ],
                                    nextToken: fetchMoreResult.allQuote.nextToken
                                }
                            }

                            console.log('newChannelData', newChannelData);
                            const newData = {
                                ...previousResult,
                                allQuote: newChannelData.allQuote,
                                nextToken: newChannelData.allQuote.nextToken
                            };
                            return newData;
                        }
                    });
                }
            })
        }
    ),

)(AllQuotes);
*/
