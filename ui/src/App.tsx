import React from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Switch, Route } from "react-router-dom";

import { Header } from "./layout/Header/Header";
import { Home } from "./components/Home/Home";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";

import "./App.css";
import "./layout/layout.scss";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeDetails } from "./components/RecipeDetails/RecipeDetails";
import { CreateCollection } from "./components/CreateCollection/CreateCollection";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { ProfileEdit } from "./components/ProfileEdit/ProfileEdit";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	request: operation => {
		const token = localStorage.getItem("token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : ""
			}
		});
	}
});

const App = () => {
	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<Header />
				<div className="layout-wrapper">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/recipes" component={RecipeList} />
						<Route exact path="/recipe/:recipeId" component={RecipeDetails} />
						<Route exact path="/add-recipe" component={CreateRecipe} />
						<Route exact path="/add-collection" component={CreateCollection} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profile/:friendlyUrl" component={Profile} />
						<Route
							exact
							path="/profile/edit/:friendlyUrl"
							component={ProfileEdit}
						/>
					</Switch>
				</div>
			</ApolloProvider>
		</BrowserRouter>
	);
};

export default App;
