import './App.css';
import { Outlet } from 'react-router-dom'; // Import Outlet for routing
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import Apollo Client dependencies
import Navbar from './components/Navbar';

// Create an instance of Apollo Client with URI and cache
const client = new ApolloClient({
  uri: '/graphql',
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
