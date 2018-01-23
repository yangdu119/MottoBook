import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, compose } from "react-apollo";
import QueryAllQuotes from "../GraphQL/QueryAllQuotes";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";

import moment from "moment";
import {Card,Icon, Image, Button } from 'semantic-ui-react'
import xmlToJSON from 'xmltojson'
import 'whatwg-fetch'

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

            allItems.forEach(function(item){
                let filename = item['Key'][0]['_text'];
                let url = request.url+filename
                images.push(url)
            })

            self.setState({'images': images});


        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    getRandomImage = () =>{
        let length = this.state.images.length
        let randomNumber = Math.floor(Math.random() * Math.floor(length))
        return this.state.images[randomNumber];

    }

    renderQuote = (quote) => (
        <div className="card" >
            <Card style={{ width: '500px' }}>
                <Card.Content>
                    <Card.Header>
                        {quote.content}
                    </Card.Header>
                    <Card.Description>
                        {quote.author}
                    </Card.Description>
                    <Image src={this.getRandomImage()} />
                    <Card.Description className={'black'}>
                        {quote.authorOccupation}
                    </Card.Description>
                    <Card.Description>
                        Born: {quote.authorBirthday}, {quote.authorBirthplace}
                    </Card.Description>

                </Card.Content>

                <Card.Content extra>
                    <a>
                        <Icon name='like outline' />
                        {quote.likes}
                    </a>

                    <a style={{ marginLeft: '2em' }}>
                        <Icon name='dislike outline' />
                        {quote.dislikes}
                    </a>

                    <a style={{ marginLeft: '2em' }}>
                        <Icon name='heart outline' />
                        Add to my MottoBook
                    </a>

                    <a style={{ marginLeft: '2em' }}>
                        <Icon name='comments' />
                        Comments
                    </a>

                    <a style={{ marginLeft: '2em' }}>
                        <Icon name='share' />
                        Share
                    </a>
                </Card.Content>

            </Card>
            <br/>
        </div>
    );



    render() {
        const { events, nextToken } = this.props;

        return (
            <div>
                {[].concat(events).sort((a, b) => a.createdDate.localeCompare(b.createdDate)).map(this.renderQuote)}

                <Button primary onClick={this.props.loadOlderMessages}>
                    Load More Quotes
                </Button>
            </div>

        );
    }

}

export default compose(
    graphql(
        QueryAllQuotes,
        {
            options: {
                fetchPolicy: 'cache-and-network',
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
    graphql(
        MutationDeleteEvent,
        {
            options: {
                fetchPolicy: 'cache-and-network',
                refetchQueries: [{ query: QueryAllQuotes }],
                update: (proxy, { data: { deleteEvent } }) => {
                    const query = QueryAllQuotes;
                    const data = proxy.readQuery({ query });

                    data.listEvents.items = data.listEvents.items.filter(event => event.id !== deleteEvent.id);

                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                deleteEvent: (event) => {
                    return props.mutate({
                        variables: { id: event.id },
                        optimisticResponse: () => ({
                            deleteEvent: {
                                ...event, __typename: 'Event', comments: { __typename: 'CommentConnection', items: [] }
                            }
                        }),
                    });
                }
            })
        }
    )
)(AllQuotes);
