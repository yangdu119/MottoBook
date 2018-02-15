import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string';

import { graphql, compose } from "react-apollo";

import moment from "moment";
import {Card,Icon, Image, Button, Radio, Form} from 'semantic-ui-react'
import xmlToJSON from 'xmltojson'
import 'whatwg-fetch'
import gql from 'graphql-tag'
import QuoteCard from '../../QuoteCard'

const QUOTES_PER_PAGE = 10;
class SearchQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
    }

    filterLoadMore = () => {
        this.props.loadFilterQuotes(this.state.authorName);
    }

    componentWillReceiveProps(nextProps) {
        console.log('SearchQuotes will receive props', nextProps)

        //handle page load
        if (!this.props.filter.allQuotes || !this.props.filter.allQuotes.length){
            this.props.filter.refetch({
                filter: nextProps.authorName
            });
        }

        //     //handle filter value changed
        console.log('SearchQuotes will receive props', nextProps)
        console.log('SearchQuotes will receive props this state authorName', this.state.authorName)
            if (nextProps.authorName != this.state.authorName && this.state.authorName){
                console.log('handle filter value changed:',nextProps.authorName)
                this.props.filter.refetch({
                    filter: nextProps.authorName
                });
            }


        this.setState({authorName: nextProps.authorName});
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('SearchQuotes will receive props', nextProps)
    //
    //     //handle page load
    //     if (!this.props.filter.allQuotes || !this.props.filter.allQuotes.length){
    //         this.props.filter.refetch({
    //             filter: nextProps.authorName
    //         });
    //     }
    //
    //     //handle filter value changed
    //     if (nextProps.authorName != this.state.filter){
    //         console.log('handle filter value changed:',nextProps.authorName)
    //         this.props.filter.refetch({
    //             filter: nextProps.authorName
    //         });
    //     }
    //
    //     this.setState({authorName: nextProps.authorName});
    // }
    componentDidMount(){
        console.log('SearchQuotes componentdidMount props', this.props)
        //handle page load
        if (!this.props.filter.allQuotes){
            this.props.filter.refetch({
                filter: this.state.authorName
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.filter.allQuotes && this.props.filter.allQuotes.map(quote => (
                        <QuoteCard
                            key={quote.id}
                            quote={quote}
                        />))
                }

                {

                    <Button primary onClick={this.filterLoadMore}>
                        Load More Quotes
                    </Button>

                }

            </div>

        );
    }

}

const ALL_AUTHOR_QUOTES_QUERY = gql`
    query allFilterQuery($first: Int!, $skip: Int!, $filter: String!){
        allQuotes(orderBy: createdAt_DESC, first:$first, skip:$skip, filter: {
            OR:[{authorQuote_contains: $filter},{author_contains:$filter}]
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

const allAuthorQuotesGraphql = graphql(ALL_AUTHOR_QUOTES_QUERY, {
    name: 'filter',
    options: {
        variables: {
            skip: 0,
            first: QUOTES_PER_PAGE,
            filter: 'none',
        },
        fetchPolicy: 'cache-and-network',
    },
    props: ({filter}) => ({
        filter,
        loadFilterQuotes: (filterdata) => {
            console.log("click load filter quotes, filterdata", filterdata);
            return filter.fetchMore({
                variables: {
                    skip: filter.allQuotes.length,
                    filter: filterdata,
                },
                updateQuery:(previousResult, {fetchMoreResult}) => {
                    console.log('fetched more results', fetchMoreResult);
                    if(!fetchMoreResult) {
                        return previousResult
                    }
                    console.log('updated quotes', [...previousResult.allQuotes, ...fetchMoreResult.allQuotes])
                    return Object.assign({}, previousResult, {
                        allQuotes: [...previousResult.allQuotes, ...fetchMoreResult.allQuotes]
                    })
                }
            })
        }
    })
})



export default compose(
    allAuthorQuotesGraphql,
)(SearchQuotes)
