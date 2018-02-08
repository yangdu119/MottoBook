import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

// import './App.css';
import AllEvents from './Components/AllEvents';

import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
import AboutUs from './Components/AboutUs'
import Home from './Components/Home'
import NewQuote from './Components/NewQuote'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReactDOM from 'react-dom'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-113147944-1'); //Unique Google Analytics tracking number
ReactGA.pageview(window.location.pathname + window.location.search);

function fireTracking() {
    ReactGA.pageview(window.location.hash);
}

const App = () => (
    <ApolloProvider client={client}>
        <Router onUpdate={fireTracking}>
            <div>
                <Route exact path='/' component={Home} />
                <Route path="/aboutus" component={AboutUs} />
                <Route path="/newQuote" component={NewQuote}/>
                {/*<Route path='/create' component={CreatePage} />*/}
                {/*<Route path='/post/:id' component={DetailPage} />*/}
            </div>
        </Router>
    </ApolloProvider>
);

//graphcool dev (current production)
//const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcud5d771y9e01508r4eio8f' })

//graphcool qa
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjddd8ha42c3n0180sofoohbu' })


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

// const client = new AWSAppSyncClient({
//   url: appSyncConfig.graphqlEndpoint,
//   region: appSyncConfig.region,
//   auth: {
//     type: appSyncConfig.authenticationType,
//     apiKey: appSyncConfig.apiKey,
//   }
// });





// const WithProvider = () => (
//   <ApolloProvider client={client}>
//     <Rehydrated>
//       <App />
//     </Rehydrated>
//   </ApolloProvider>
// );
//
export default App;
