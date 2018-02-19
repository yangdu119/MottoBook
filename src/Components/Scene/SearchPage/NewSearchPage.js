import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {Button, Dimmer, Loader} from 'semantic-ui-react'
import gql from 'graphql-tag'
import QuoteCard from '../../QuoteCard'
import { Grid } from 'semantic-ui-react'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'

const QUOTES_PER_PAGE = 10;
class NewSearchPage extends Component {

    filterLoadMore = () => {
        this.props.loadFilterQuotes(this.props.match.params.authorName);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentwillreceiveprops this props',this.props)
        if (nextProps.match.params.authorName !== this.props.match.params.authorName){
            console.log(' nextProps', nextProps.match.params.authorName)
            console.log('this Props', this.props.match.params.authorName)
            console.log('nextProps changes, update')
            let authorName = nextProps.match.params.authorName
            this.props.filter.refetch({
                filter: authorName
            });
        }


        if (!this.props.filter.allQuotes){
            this.props.filter.refetch({
                filter: this.props.match.params.authorName
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.filter.allQuotes !== this.props.filter.allQuotes){
            if (nextProps.filter.allQuotes.length > 0){
                return true
            }else{
                return false;
            }

        }else{
            return false;
        }
        console.log('shouldComponentUpdate, nextProps',nextProps)
    }

    componentDidMount(){
        //handle page load
        console.log('componentDidMount this props', this.props)
        if (!this.props.filter.allQuotes){
            this.props.filter.refetch({
                filter: this.props.match.params.authorName
            });
        }
    }


    render() {

        const { filter: { loading, error } } = this.props;
        const foundQuotes = this.props.filter.allQuotes;
        if (loading) {
            return (
                <div>
                    <MottoBookHeader auth={this.props.auth} {...this.props} />
                    <Grid centered columns={3} style={{ marginTop: '3em' }}>
                        <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                            <Dimmer active inverted>
                                <Loader>Loading</Loader>
                            </Dimmer>
                        </Grid.Column>
                    </Grid>
                    <MottoBookFooter />
                </div>
            )
        } else if (error) {
            return (
                <div>
                    <MottoBookHeader auth={this.props.auth} {...this.props} />
                    <Grid centered columns={3} style={{ marginTop: '3em' }}>
                        <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                            <p>Error!</p>
                        </Grid.Column>
                    </Grid>
                    <MottoBookFooter />
                </div>
            )
        } else {
            console.log('render this props', this.props)
            return (
                <div>
                    <MottoBookHeader auth={this.props.auth} {...this.props} />
                    <Grid centered columns={3} style={{ marginTop: '3em' }}>
                        <Grid.Column mobile={'16'} textAlign={'center'} computer={'7'}>
                            <div>
                                {
                                    this.props.filter.allQuotes && this.props.filter.allQuotes.map(quote => (
                                        <QuoteCard
                                            key={quote.id}
                                            quote={quote}
                                            auth={this.props.auth}
                                        />))
                                }

                                {
                                    foundQuotes && foundQuotes.length>0 &&
                                    <Button primary onClick={this.filterLoadMore}>
                                        Load More Quotes
                                    </Button>
                                }

                                {
                                    foundQuotes && foundQuotes.length===0 &&
                                    <p>No Quotes Found</p>

                                }

                            </div>
                        </Grid.Column>
                    </Grid>
                    <MottoBookFooter />
                </div>



            );
        }
    }

}

const ALL_AUTHOR_QUOTES_QUERY = gql`
    query allFilterQuery($first: Int!, $skip: Int!, $filter: String!){
        allQuotes(orderBy: createdAt_DESC, first:$first, skip:$skip, filter: {
            OR:[{authorQuote_contains: $filter},{author_contains:$filter},{authorOccupation_contains:$filter}]
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
        fetchPolicy: 'network-only',
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
)(NewSearchPage)
