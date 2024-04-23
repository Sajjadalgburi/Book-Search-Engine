import './App.css';
import { Outlet } from 'react-router-dom'; // Import Outlet for routing
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'; // Import Apollo Client dependencies
import { setContext } from '@apollo/client/link/context';

// components
import Navbar from './components/Navbar';

// created a new http link and assigned it to "/graphql" endpoint
const httpLink = createHttpLink({ uri: '/graphql' });

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an instance of Apollo Client with URI and cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App; // Export the App component
