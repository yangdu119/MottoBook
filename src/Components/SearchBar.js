import React from 'react'
import { Input, Form} from 'semantic-ui-react'
import history from '../history'

export default class SearchBar extends React.Component {
    constructor(){
        super()
    }
    state = {
        searchTerm: ""
    }

    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            searchTerm: ""
        })
        history.push(`/search/${this.processLink(this.state.searchTerm)}`);
    }
    handleChange = event => {
        //console.log('change value', event.target.value);
        this.setState({
            searchTerm: event.target.value
        })
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    icon={{name: 'search', circular: true, link: true}}
                    placeholder='Search...'
                    onChange = {this.handleChange}
                />
            </Form>
        )
    }
}

