import React from 'react';
import { Router, Route, Redirect, Switch} from 'react-router-dom'

import Profile from './Components/Scene/Profile/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

import Home from './Components/Home'
import AboutUs from './Components/AboutUs'
import NewQuote from './Components/NewQuote'
import OccupationCategory from './Components/Scene/OccupationCategory'
import AuthorQuotes from './Components/Scene/AuthorQuotes/AuthorQuotes'
import SearchPage from './Components/Scene/SearchPage/SearchPage'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReactGA from 'react-ga';
import AllAuthorsPage from "./Components/Scene/AllAuthorsPage/AllAuthorsPage";
import NotFound from './Components/Scene/NotFound'
import QuoteDetailPage from './Components/Scene/QuoteDetailPage/QuoteDetailPage'
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
              <Route path="/about" render={(props) => <AboutUs auth={auth} {...props} />} />
              <Route path="/newQuote" render={(props) => <NewQuote auth={auth} {...props} />} />
                <Route path="/allAuthors" render={(props) => <AllAuthorsPage auth={auth} {...props} />} />
                <Route path="/occupationCategory/:category" render={(props) => <OccupationCategory auth={auth} {...props} />} />
                <Route path="/author/:authorName" render={(props) => <AuthorQuotes auth={auth} {...props} />} />
                <Route path="/search/:authorName" render={(props) => <SearchPage auth={auth} {...props} />} />
                    <Route path="/quote/:quoteId" render={(props) => <QuoteDetailPage auth={auth} {...props} />} />
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
                    {/*<Route path="*" render={(props) => <NotFound auth={auth} {...props} />} />*/}
            </div>
          </Router>
      </ApolloProvider>
  );
}

//mottobook-dev
//const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjd20ym271l610102abyehnsy' })

//MottoBookTest, current production
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjde1zc60042w01138sjksteg' })


//mottobook-qa, current dev
//const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjddd8ha42c3n0180sofoohbu' })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})
