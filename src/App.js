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
import InputExampleFluid from './Components/InputExampleFluid'
import FeedExampleBasic from './Components/Feed'
import MenuExampleVerticalPointing from './Components/VerticalMenu'

import MottoBookHeader from './Components/Header'
import AboutUs from './Components/AboutUs'
import MottoBookFooter from './Components/Footer'

const Home = () => (
    <div>
        <MottoBookHeader />

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


        <MottoBookFooter />


    </div>
);

const App = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/aboutus" component={AboutUs} />
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
