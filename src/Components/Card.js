import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import faker from 'faker'


const QuoteCard = () => (
    <Card style={{ width: '500px' }}>
        <Image src={faker.random.image()} />
        <Card.Content>
            <Card.Header>
                {faker.name.findName()}
            </Card.Header>
            <Card.Meta>
            </Card.Meta>
            <Card.Description>
                {faker.lorem.sentences()}
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            <a>
                <Icon name='like outline' />
                22 Likes
            </a>

            <a style={{ marginLeft: '6em' }}>
                <Icon name='dislike outline' />
                30 Dislikes
            </a>
        </Card.Content>

    </Card>
)

export default QuoteCard
