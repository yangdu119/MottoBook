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

import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
import AboutUs from './Components/AboutUs'
import Home from './Components/Home'
import NewQuote from './Components/NewQuote'

const App = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={Home} />
        <Route path="/aboutus" component={AboutUs} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/newEvent" component={NewEvent} />
        <Route path="/newQuote" component={NewQuote}/>
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
