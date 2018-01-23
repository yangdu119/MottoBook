import React, { Component } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllEvents from "../GraphQL/QueryAllEvents";
import MutationCreateEvent from "../GraphQL/MutationCreateEvent";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../Utils";
import DateTimePickerCustomInput from "./DateTimePickerCustomInput";

import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'

class NewQuote extends Component {

    static defaultProps = {
        createEvent: () => null,
    }

    state = {
        quote: {
            author: '',
            authorBirthday: '',
            authorBirthplace: '',
            authorOccupation: '',
            authorQuote:''
        }
    };

    handleChange(field, { target: { value } }) {
        const { quote } = this.state;

        quote[field] = value;

        this.setState({ quote });
    }

    handleDateChange(field, value) {
        this.handleChange(field, { target: { value: value.format() } });
    }

    handleSave = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const { createEvent, history } = this.props;
        const { event } = this.state;

        await createEvent(event);

        history.push('/');
    }

    render() {
        const { quote } = this.state;

        return (
            <div>
                <MottoBookHeader />
                <br /><br /><br />
            <div className="ui container raised very padded segment">

                <h1 className="ui header">Add a new Quote</h1>
                <div className="ui form">
                    <div className="field required eight wide">
                        <label htmlFor="author">Author Name</label>
                        <input type="text" id="author" value={quote.author} onChange={this.handleChange.bind(this, 'author')} />
                    </div>

                    <div className="field required eight wide">
                        <label htmlFor="authorBirthday">Author Birthday</label>
                        <input type="text" id="authorBirthday" value={quote.authorBirthday} onChange={this.handleChange.bind(this, 'authorBirthday')} />
                    </div>

                    <div className="field required eight wide">
                        <label htmlFor="authorBirthplace">Author Birthday</label>
                        <input type="text" id="authorBirthplace" value={quote.authorBirthplace} onChange={this.handleChange.bind(this, 'authorBirthplace')} />
                    </div>

                    <div className="field required eight wide">
                        <label htmlFor="authorOccupation">Author Occupation</label>
                        <input type="text" id="authorOccupation" value={quote.authorOccupation} onChange={this.handleChange.bind(this, 'authorOccupation')} />
                    </div>

                    <div className="field required eight wide">
                        <label htmlFor="authorQuote">Author Quote</label>
                        <textarea name="authorQuote" id="authorQuote" rows="10" value={quote.authorQuote}
                                  onChange={this.handleChange.bind(this, 'authorQuote')}></textarea>
                    </div>
                    <div className="ui buttons">
                        <Link to="/" className="ui button">Cancel</Link>
                        <div className="or"></div>
                        <button className="ui positive button" onClick={this.handleSave}>Save</button>
                    </div>
                </div>

            </div>
                <MottoBookFooter />
            </div>
        );
    }

}

export default graphql(
    MutationCreateEvent,
    {
        options: {
            refetchQueries: [{ query: QueryAllEvents }],
            update: (proxy, { data: { createEvent } }) => {
                const query = QueryAllEvents;
                const data = proxy.readQuery({ query });

                data.listEvents.items.push(createEvent);

                proxy.writeQuery({ query, data });
            }
        },
        props: (props) => ({
            createEvent: (event) => {
                return props.mutate({
                    variables: event,
                    optimisticResponse: () => ({
                        createEvent: {
                            ...event, id: uuid(), __typename: 'Event', comments: { __typename: 'CommentConnection', items: [] }
                        }
                    }),
                })
            }
        })
    }
)(NewQuote);
