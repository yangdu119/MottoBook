import React from 'react';
import { Container, Divider, List, Segment} from 'semantic-ui-react'

const MottoBookFooter = () =>(
    <div>
        <Segment
            inverted
            vertical
            style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            className={'ui blue'}
        >
            <Container textAlign='center'>

                <Divider inverted section/>

                <List horizontal inverted divided link>
                    <List.Item as='a' href='/'>Home</List.Item>
                    <List.Item as='a' href='/about'>About</List.Item>
                    <List.Item as='a' href='/sitemap.xml'>Site Map</List.Item>
                    <List.Item as='a' href='/allAuthors'>All Authors</List.Item>
                </List>
            </Container>
        </Segment>
    </div>
)

export default MottoBookFooter