import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

import appSyncConfig from "./AppSync";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

// import './App.css';
import AllEvents from './Components/AllEvents';
import AllQuotes from './Components/AllQuotes';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Card, Button} from 'semantic-ui-react'
import QuoteCard from './Components/Card'
import SearchBar from './Components/SearchBar'
import InputExampleFluid from './Components/InputExampleFluid'
import FeedExampleBasic from './Components/Feed'
import MenuExampleVerticalPointing from './Components/VerticalMenu'

// const Home = () => (
//   <div className="ui container">
//     <h1 className="ui header">All Quotes</h1>
//     <AllQuotes />
//   </div>
// );

const Home = () => (
    <div>
        <Menu fixed='top' inverted className={'ui blue'}>
            <Menu.Item style={{ marginLeft: '6em' }} as='a' header >
                MottoBook
            </Menu.Item>

            <SearchBar />

            <Menu.Menu position='right' style={{ marginRight: '6em' }}>
                <Menu.Item className='item'>
                    <Button as='a' primary>New Quote</Button>
                </Menu.Item>
                <Menu.Item className='item'>
                    <Button as='a' primary>Log in</Button>
                </Menu.Item>
            </Menu.Menu>

        </Menu>

        <div class="ui grid container" style={{ marginTop: '1em' }}>
            <div class="three wide column" >
                <MenuExampleVerticalPointing />
            </div>
            <div class="eight wide column">
                <div className={"ui"} >
                    <AllQuotes />

                </div>
            </div>
            <div class="five wide column">
                <FeedExampleBasic />
            </div>

        </div>




        <Segment
            inverted
            vertical
            style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            className={'ui blue'}
        >
            <Container textAlign='center'>

                <Divider inverted section/>

                <List horizontal inverted divided link>
                    <List.Item as='a' href='#'>Site Map</List.Item>
                    <List.Item as='a' href='#'>Contact Us</List.Item>
                    <List.Item as='a' href='#'>Terms and Conditions</List.Item>
                    <List.Item as='a' href='#'>Privacy Policy</List.Item>
                </List>
            </Container>
        </Segment>
    </div>
);

const App = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/newEvent" component={NewEvent} />
    </div>
  </Router>
);

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
