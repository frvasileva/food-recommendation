import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { RecipeList } from './RecipeList';
import { ApolloProvider } from '@apollo/react-hooks';
import { Search } from './Search';

const client = new ApolloClient({
  uri: 'http://0.0.0.0:38509/',
});

const App = () => {
  const [term, setTerm] = React.useState('');

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Search onSearch={setTerm} />
        <RecipeList searchTerm={term} />
      </div>
    </ApolloProvider>
  );
}

export default App;
