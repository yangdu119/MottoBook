import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Button, Loader, Dimmer} from 'semantic-ui-react'
import gql from 'graphql-tag'
import QuoteCard from '../QuoteCard'

const QUOTES_PER_PAGE = 10;
const RANDOM_SKIP_NUMBER = Math.floor(Math.random() * 150);
class FilterQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterValue: 'clear',
            authorName: '',
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
        console.log('FilterQuotes will receive props', this.props)

        //handle page load
        if (!this.props.filter.quotes){
            this.props.filter.refetch({
                filter: nextProps.radioSelected
            });
        }

        //handle filter value changed
        if (nextProps.radioSelected !== this.state.filterValue){
            this.props.filter.refetch({
                filter: nextProps.radioSelected
            });
        }

        this.setState({filterValue: nextProps.radioSelected});
    }
    componentDidMount(){
        console.log('FilterQuotes componentdidMount props', this.props)
    }

    render() {
        const { filter: { loading, error } } = this.props;
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
                        this.props.filter.quotes && this.props.filter.quotes.map(quote => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                                auth={this.props.auth}
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

}

const ALL_FILTER_QUERY = gql`
    query allFilterQuery($first: Int!, $skip: Int!, $filter: String!){
        quotes(orderBy: createdAt_DESC, first:$first, skip:$skip, where: {
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

const allFilterGraphql = graphql(ALL_FILTER_QUERY, {
    name: 'filter',
    options: {
        variables: {
            skip: RANDOM_SKIP_NUMBER,
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
                    skip: filter.quotes.length,
                    filter: filterdata,
                },
                updateQuery:(previousResult, {fetchMoreResult}) => {
                    console.log('fetched more results', fetchMoreResult);
                    if(!fetchMoreResult) {
                        return previousResult
                    }
                    console.log('updated quotes', [...previousResult.quotes, ...fetchMoreResult.quotes])
                    return Object.assign({}, previousResult, {
                        quotes: [...previousResult.quotes, ...fetchMoreResult.quotes]
                    })
                }
            })
        }
    })
})



export default compose(
    allFilterGraphql,
)(FilterQuotes)
