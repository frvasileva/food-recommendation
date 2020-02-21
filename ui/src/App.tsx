import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { ApolloProvider } from "@apollo/react-hooks";
import { Search } from "./components/Search/Search";
import { Header } from "./layout/Header/Header";
import "./layout/layout.scss";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const App = () => {
  const [term, setTerm] = React.useState("");

  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <div className="row">
          <Search onSearch={setTerm} />
        </div>{" "}
        <RecipeList searchTerm={term} />
      </div>
    </ApolloProvider>
  );
};

export default App;
