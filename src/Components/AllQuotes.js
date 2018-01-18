import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, compose } from "react-apollo";
import QueryAllQuotes from "../GraphQL/QueryAllQuotes";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";

import moment from "moment";
import { Card, Icon, Image } from 'semantic-ui-react'
import faker from 'faker'

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
            //console.log('length', length);
            //console.log('result', result);
            //console.log('randomeNumber', randomNumber)
            let allItems = result['ListBucketResult'][0]['Contents'];
            let images = []

            allItems.forEach(function(item){
                let filename = item['Key'][0]['_text'];
                let url = request.url+filename
                images.push(url)
            })

            self.setState({'images': images});

            // let item = result['ListBucketResult'][0]['Contents'][randomNumber];
            // let filename = item['Key'][0]['_text']
            // //console.log('filename', filename)
            // let url = "https://s3-us-west-2.amazonaws.com/mottobook-images/"+filename
            // //console.log('url', url);
            // return url;
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    getRandomImage = () =>{
        let length = this.state.images.length
        let randomNumber = Math.floor(Math.random() * Math.floor(length))
        return this.state.images[randomNumber];

    }

    // renderEvent = (event) => (
    //     <Link to={`/event/${event.id}`} className="card" key={event.id}>
    //         <div className="content">
    //             <div className="header">{event.content}</div>
    //         </div>
    //         <div className="content">
    //             <p><i className="icon calendar"></i>{moment(event.createdDate).format('LL')}</p>
    //             <p><i className="icon marker"></i>{event.author}</p>
    //         </div>
    //         <div className="content">
    //             <div className="description"><i className="icon info circle"></i>{event.content}</div>
    //         </div>
    //         <div className="extra content">
    //             <i className="icon comment"></i> {event.comments.items.length} comments
    //         </div>
    //         <button className="ui bottom attached button" onClick={this.handleDeleteClick.bind(this, event)}>
    //             <i className="trash icon"></i>
    //             Delete
    //         </button>
    //     </Link>
    // );
    renderQuote = (quote) => (
        <Link to={`/event/${quote.id}`} className="card" key={quote.id}>
            <Card style={{ width: '500px' }}>
                <Image src={this.getRandomImage()} />
                <Card.Content>
                    <Card.Header>
                        {quote.author}
                    </Card.Header>
                    <Card.Meta>
                    </Card.Meta>
                    <Card.Description>
                        {quote.content}
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
                </Card.Content>
            </Card>
            <br/>
        </Link>
    );

    // render() {
    //     const { events } = this.props;
    //     console.log("events:", events);
    //
    //     return (
    //         <div className="ui link cards">
    //             <div className="card blue">
    //                 <Link to="/newEvent" className="new-event content center aligned">
    //                     <i className="icon add massive"></i>
    //                     <p>Create new event</p>
    //                 </Link>
    //             </div>
    //             {[].concat(events).sort((a, b) => a.createdDate.localeCompare(b.createdDate)).map(this.renderEvent)}
    //         </div>
    //     );
    // }

    render() {
        const { events, nextToken } = this.props;
        //console.log("events:", events);
        //console.log("nextToken", nextToken);

        return (
            <div>
                {/*<div className="card blue">*/}
                    {/*<Link to="/newEvent" className="new-event content center aligned">*/}
                        {/*<i className="icon add massive"></i>*/}
                        {/*<p>Create new event</p>*/}
                    {/*</Link>*/}
                {/*</div>*/}
                {[].concat(events).sort((a, b) => a.createdDate.localeCompare(b.createdDate)).map(this.renderQuote)}

                <button onClick={this.props.loadOlderMessages}>
                    Load More Quotes
                </button>
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
