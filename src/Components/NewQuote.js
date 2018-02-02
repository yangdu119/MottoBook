import React, { Component } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllEvents from "../GraphQL/QueryAllEvents";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../Utils";
import DateTimePickerCustomInput from "./DateTimePickerCustomInput";

import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

class NewQuote extends Component {

    static defaultProps = {
        createQuote: () => null,
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

    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

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


        const { quote } = this.state;
        const author = quote.author
        const authorBirthday = quote.authorBirthday
        const authorBirthplace = quote.authorBirthplace
        const authorOccupation = quote.authorOccupation
        const authorQuote = quote.authorQuote

        const { profile } = this.state;
        const userEmail = profile.email

        await this.props.createQuoteMutation({variables: {author, authorBirthday, authorBirthplace, authorOccupation, authorQuote, userEmail}})

        this.props.history.replace('/');

    }

    render() {
        const { quote } = this.state;

        return (
            <div>
                <MottoBookHeader auth={this.props.auth}/>
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
                        <label htmlFor="authorBirthplace">Author Birthplace</label>
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
                        <button className="ui primary button" onClick={this.handleSave}>Save</button>
                    </div>
                </div>

            </div>
                <MottoBookFooter />
            </div>
        );
    }

}



const CREATE_QUOTE_MUTATION = gql`
    mutation CreateQuoteMutation($author: String!, $authorBirthday: String!, 
    $authorBirthplace: String!, $authorOccupation: String!, $authorQuote: String!, $userEmail: String!){
        createQuote(
            author: $author,
            authorBirthday: $authorBirthday,
            authorBirthplace: $authorBirthplace,
            authorOccupation: $authorOccupation,
            authorQuote: $authorQuote,
            authorBirthname: $author,
            likes: 0,
            dislikes: 0,
            imageUrl: "",
            userEmail: $userEmail
            
        ){
            id
            author
            authorQuote
        }
    }
`

const CreatePageWithMutation = graphql(CREATE_QUOTE_MUTATION, {name: 'createQuoteMutation'})(NewQuote)
export default withRouter(CreatePageWithMutation)
//
// export default graphql(
//     MutationcreateQuote,
//     {
//         options: {
//             refetchQueries: [{ query: QueryAllEvents }],
//             update: (proxy, { data: { createQuote } }) => {
//                 const query = QueryAllEvents;
//                 const data = proxy.readQuery({ query });
//
//                 data.listEvents.items.push(createQuote);
//
//                 proxy.writeQuery({ query, data });
//             }
//         },
//         props: (props) => ({
//             createQuote: (event) => {
//                 return props.mutate({
//                     variables: event,
//                     optimisticResponse: () => ({
//                         createQuote: {
//                             ...event, id: uuid(), __typename: 'Event', comments: { __typename: 'CommentConnection', items: [] }
//                         }
//                     }),
//                 })
//             }
//         })
//     }
// )(NewQuote);
