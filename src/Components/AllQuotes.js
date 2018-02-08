import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, compose } from "react-apollo";
import QueryAllQuotes from "../GraphQL/QueryAllQuotes";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";

import moment from "moment";
import {Card,Icon, Image, Button, Radio, Form} from 'semantic-ui-react'
import xmlToJSON from 'xmltojson'
import 'whatwg-fetch'
import gql from 'graphql-tag'
import QuoteCard from './QuoteCard'

const QUOTES_PER_PAGE = 10;
const RANDOM_SKIP_NUMBER = Math.floor(Math.random() * 150);
class AllQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterValue: 'clear'
        }
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

    handleFilterChange = (e, { value }) => {
        //e.persist();
        console.log('handleFilterChange', value);
        this.setState({filterValue: value});
        this.props.filter.refetch({
                filter: value
        });
    }

    filterLoadMore = () => {
        console.log('state filterValue: ', this.state.filterValue);
        this.props.loadFilterQuotes(this.state.filterValue);
    }

    componentWillReceiveProps(nextProps) {
        console.log("will receive props",nextProps)

        if (nextProps.radioSelected !== this.state.filterValue) {
            console.log('handleFilterChange', nextProps.radioSelected);
            this.setState({filterValue: nextProps.radioSelected});
            this.props.filterCount.refetch({
                filter: nextProps.radioSelected
            });
            console.log("")
            this.props.filter.refetch({
                filter: nextProps.radioSelected
            });
        }


    }

    render() {
        console.log('allQuotes props', this.props);
        const isFilterClear = this.state.filterValue === 'clear';
        console.log("this.state.filterValue", this.state.filterValue)
        console.log('isFilterClear', isFilterClear);
        return (
            <div>
                {
                    isFilterClear ?
                        this.props.data.allQuotes && this.props.data.allQuotes.map(quote => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                            />))
                        :
                        this.props.filter.allQuotes && this.props.filter.allQuotes.map(quote => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                            />))
                }

                {
                    isFilterClear? (
                        <Button primary onClick={this.props.loadMoreQuotes}>
                            Load More Quotes
                        </Button>
                    ): (
                        <Button primary onClick={this.filterLoadMore}>
                            Load More Quotes
                        </Button>
                    )
                }

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

const ALL_FILTER_QUERY = gql`
    query allFilterQuery($first: Int!, $skip: Int!, $filter: String!){
        allQuotes(orderBy: createdAt_DESC, first:$first, skip:$skip, filter: {
            authorCategory_contains: $filter
        }){
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

const FILTER_COUNT_QUERY = gql`
    query FilterCountQuery($filter: String!){
        _allQuotesMeta( filter: {
            authorCategory_contains: $filter
        }){
            count
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
        fetchPolicy: 'network-only',
    },
    props: ({data}) => ({
        data,
        loadMoreQuotes: () => {
            //console.log("click load more");
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
})

const allFilterGraphql = graphql(ALL_FILTER_QUERY, {
    name: 'filter',
    options: {
        variables: {
            skip: RANDOM_SKIP_NUMBER,
            first: QUOTES_PER_PAGE,
            filter: 'none',
        },
        fetchPolicy: 'network-only',
    },
    props: ({filter}) => ({
        filter,
        loadFilterQuotes: (filterdata) => {
            //console.log("click load filter quotes");
            return filter.fetchMore({
                variables: {
                    skip: filter.allQuotes.length,
                    filter: filterdata,
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
})

const filterCountGraphql = graphql(FILTER_COUNT_QUERY, {
    name: 'filterCount',
    options: {
        variables: {
            filter: 'none',
        },
        fetchPolicy: 'network-only',
    },
    props: ({filterCount}) => ({
        filterCount
    })
})



export default compose(
    allQuotesGraphql,
    allFilterGraphql,
    filterCountGraphql

)(AllQuotes)
