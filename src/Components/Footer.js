import React from 'react';
import {Menu, Button} from 'semantic-ui-react'
import SearchBar from './SearchBar'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Segment, Card} from 'semantic-ui-react'

const MottoBookFooter = () =>(
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
                <List.Item as='a' href='/aboutus'>About Us</List.Item>
            </List>
        </Container>
    </Segment>
)

export default MottoBookFooter