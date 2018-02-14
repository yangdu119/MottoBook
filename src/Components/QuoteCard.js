import React from 'react'
import { Link } from 'react-router-dom'
import {Card, Image, Icon} from 'semantic-ui-react'

export default class QuoteCard extends React.Component {

    render() {
        const autorLink = `/author/${this.props.quote.author}`
        return (
            <div className="card" >
                <Card style={{ width: '500px' }}>
                    <Card.Content>
                        <Card.Header>
                            {this.props.quote.authorQuote}
                        </Card.Header>
                        <Card.Description>
                            <Link to={autorLink}>{this.props.quote.author}</Link>
                        </Card.Description>
                        <Card.Description className={'black'}>
                            {this.props.quote.authorOccupation}
                        </Card.Description>
                        <Image src={this.props.quote.imageUrl} />
                        <Card.Description>
                            Born: {this.props.quote.authorBirthday}, {this.props.quote.authorBirthplace}
                        </Card.Description>

                    </Card.Content>

                    <Card.Content extra>
                        <a>
                            <Icon name='like outline' />
                            {this.props.quote.likes}
                        </a>

                        <a style={{ marginLeft: '2em' }}>
                            <Icon name='dislike outline' />
                            {this.props.quote.dislikes}
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
        )
    }

}