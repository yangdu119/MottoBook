import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {Button, Dimmer, Loader} from 'semantic-ui-react'
import gql from 'graphql-tag'
import QuoteCard from '../../QuoteCard'
import { Grid } from 'semantic-ui-react'
import MottoBookHeader from '../../Header'
import MottoBookFooter from '../../Footer'
import graphqlEndPoint from "../../../GraphQLConfig";
import {createApolloFetch} from "apollo-fetch/dist/index";

const QUOTES_PER_PAGE = 10;
class AuthorQuotes extends Component {

    filterLoadMore = () => {
        this.props.loadFilterQuotes(this.props.match.params.authorName);
    }

    constructor(props){
        super(props);
        this.state = {
            quotesCounts: 0,
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log('componentwillreceiveprops this props',this.props)
        if (nextProps.match.params.authorName !== this.props.match.params.authorName){
            let authorName = nextProps.match.params.authorName
            this.props.filter.refetch({
                filter: authorName
            });
        }


        if (!this.props.filter.quotes){
            this.props.filter.refetch({
                filter: this.props.match.params.authorName
            });
        }
    }

    getAuthorTotalQuotes = (name) => new Promise(function(resolve, reject){
        const uri = graphqlEndPoint.prisma
        const apolloFetch = createApolloFetch({uri})
        const query = `
          query getQuotesCount {
              quotesConnection(
                where: {author_contains: "${name}"}) {
                aggregate {
                  count
                }
              }
            }
      `

        apolloFetch({query})
            .then(result => {
                const {data} = result;
                if (data){
                    resolve(data.quotesConnection.aggregate.count)
                }
            })
    })

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.filter.quotes !== this.props.filter.quotes){
            if (nextProps.filter.quotes.length > 0){
                return true
            }else{
                return false;
            }

        }else{
            return false;
        }
    }

    async getCounts(){
        const count = await this.getAuthorTotalQuotes(this.props.match.params.authorName)
        this.setState({
            quotesCounts: count,
        })
        return count
    }

    componentDidMount(){
        if (!this.props.filter.quotes){
            this.props.filter.refetch({
                filter: this.props.match.params.authorName
            });
        }
        const count = this.getCounts();
    }


    render() {
        const length = this.props.filter.quotes && this.props.filter.quotes.length;
        const { filter: { loading, error } } = this.props;
        const foundQuotes = this.props.filter.quotes;
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
                        this.props.filter.quotes && this.props.filter.quotes.map(quote => (
                        <QuoteCard
                        key={quote.id}
                        quote={quote}
                        auth={this.props.auth}
                        />))
                    }

                    {
                        (this.state.quotesCounts !==length) && foundQuotes && foundQuotes.length>0 &&
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
        quotes(orderBy: createdAt_DESC, first:$first, skip:$skip, where: {
            author_contains: $filter
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
                    skip: filter.quotes.length,
                    filter: filterdata,
                },
                updateQuery:(previousResult, {fetchMoreResult}) => {
                    console.log('fetched more results', fetchMoreResult);
                    if(!fetchMoreResult) {
                        return previousResult
                    }
                    const allNewQuotes = [...previousResult.quotes, ...fetchMoreResult.quotes]
                    const previousQuotes = [...previousResult.quotes]
                    return Object.assign({}, previousResult, {
                        quotes: [...previousResult.quotes, ...fetchMoreResult.quotes]
                    })
                }
            })
        }
    })
})



export default compose(
    allAuthorQuotesGraphql,
)(AuthorQuotes)
