import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'; 
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

ReactDOM.render(
  <Router>
  <ApolloProvider client={client}>
    
    <App />
    
  </ApolloProvider>
  </Router> , 
  document.getElementById('root')
);

registerServiceWorker();
