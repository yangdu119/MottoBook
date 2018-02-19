import React from 'react'
import { Link } from 'react-router-dom'
import {Card, Image, Icon, List} from 'semantic-ui-react'

export default class QuoteCard extends React.Component {

    processLink(authorName) {
        authorName = authorName.replace(/ /g,"_");
        return authorName
    }

    handleLike = () => {
        console.log('like clicked', this.props.quote.id);
        console.log('props', this.props)
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }
    }

    handleDislike = () => {
        console.log('like clicked', this.props.quote.id);
        console.log('props', this.props)
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }
    }

    handleComments = () => {
        const { isAuthenticated } = this.props.auth;
        if (!isAuthenticated()){
            this.props.auth.login();
            console.log('navigate to login page')
        }
    }

    processOccupationLink(occupation) {
        return `/search/${occupation}`
    }

    render() {
        //console.log('QuoteCard props', this.props);
        const autorLink = `/author/${this.processLink(this.props.quote.author)}`
        const quoteDetailLink = `/quote/${this.props.quote.id}`
        const occupationList = this.props.quote.authorOccupation.split(",").map(Function.prototype.call, String.prototype.trim);
        //console.log(occupationList);

        return (
            <div className="card" >
                <Card fluid>
                    <Card.Content>
                        <Card.Header href={quoteDetailLink}>
                            {this.props.quote.authorQuote}
                        </Card.Header>
                        <Card.Description>
                            <Link to={autorLink}>{this.props.quote.author}</Link>
                        </Card.Description>

                        <Card.Description className={'black'}>
                            <List horizontal divided>
                                {occupationList.map(occu =>
                                    <List.Item key={occu.toString()}>
                                        <Link to={`/search/${occu}`}>{occu}</Link>
                                    </List.Item>
                                )}
                            </List>
                        </Card.Description>

                        <Image src={this.props.quote.imageUrl} href={quoteDetailLink}/>

                        <Card.Description>
                            Born: {this.props.quote.authorBirthday}, {this.props.quote.authorBirthplace}
                        </Card.Description>


                    </Card.Content>

                    <Card.Content extra>
                        <a onClick={this.handleLike}>
                            <Icon name='like outline' />
                            {this.props.quote.likes}
                        </a>

                        <a style={{ marginLeft: '2em' }} onClick={this.handleDislike}>
                            <Icon name='dislike outline' />
                            {this.props.quote.dislikes}
                        </a>

                        <a style={{ marginLeft: '2em' }} onClick={this.handleComments}>
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
        )
    }

}