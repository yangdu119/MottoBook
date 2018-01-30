import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App-Auth0';
//import Home from './Home/Home';
import Profile from './Profile/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

import Home from './Components/Home'
import AboutUs from './Components/AboutUs'
import NewQuote from './Components/NewQuote'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-113147944-1'); //Unique Google Analytics tracking number
ReactGA.pageview(window.location.pathname + window.location.search);

function fireTracking() {
    ReactGA.pageview(window.location.hash);
}

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <ApolloProvider client={client}>
        <Router history={history} onUpdate={fireTracking}>
            <div>
              <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
              <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
              <Route path="/aboutus" render={(props) => <AboutUs auth={auth} {...props} />} />
              <Route path="/newQuote" render={(props) => <NewQuote auth={auth} {...props} />} />
              <Route path="/profile" render={(props) => (
                !auth.isAuthenticated() ? (
                  <Redirect to="/"/>
                ) : (
                  <Profile auth={auth} {...props} />
                )
              )} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }}/>
            </div>
          </Router>
      </ApolloProvider>
  );
}

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcud5d771y9e01508r4eio8f' })
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})
