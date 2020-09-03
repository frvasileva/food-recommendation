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
import { SetRecipeOfTheDay } from "./admin/RecipeOfTheDay";
import { CollectionList } from "./components/CollectionList/CollectionList";
import { Collections } from "./components/Collections/Collections";
import { PredefinedSearchCategories } from "./admin/PredefinedSearchCategories/PredefinedSearchCategories";
import { SetMainProduct } from "./admin/MainProduct/SetMainProduct/SetMainProduct";
import GuardedRoute from "./shared/guardedRoute";
import tokenHelper from "./helpers/tokenHelper";
import MainContextProvider from "./helpers/mainContext";

const client = new ApolloClient({
	uri: "/api",
	request: (operation) => {
		const token = localStorage.getItem("token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
});

const App = () => {

	var token = tokenHelper();
	var isAutheticated = token.isAuth();
	var userRoles = token.roles();
	var isAdmin = userRoles.indexOf("admin") > -1;

	return (
		<BrowserRouter>
			<MainContextProvider>
				<ApolloProvider client={client}>
					<Header />
					<div className="layout-wrapper">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/recipes" component={RecipeList} />
							<Route exact path="/collections" component={Collections} />
							<Route exact path="/collection/:friendlyUrl" component={CollectionList}/>
							<Route exact path="/recipe/:recipeId" component={RecipeDetails} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profile/:friendlyUrl" component={Profile} />
							
							<GuardedRoute path="/add-recipe" component={CreateRecipe} auth={isAutheticated && isAdmin}/>
							<GuardedRoute exact path="/add-collection" component={CreateCollection} auth={isAutheticated}/>						
							<GuardedRoute path="/profile/edit/:friendlyUrl" component={ProfileEdit} auth={isAutheticated} />
							<GuardedRoute path="/admin/add-product" component={SetMainProduct} auth={isAutheticated && isAdmin} />
							<GuardedRoute path="/admin/add-recipe-of-the-day" component={SetRecipeOfTheDay} auth={isAutheticated && isAdmin} />
							<GuardedRoute path="/admin/add-product" component={SetMainProduct} auth={isAutheticated && isAdmin} />
							<GuardedRoute path='/admin/add-predefined-search-category' component={PredefinedSearchCategories} auth={isAutheticated && isAdmin} />
						</Switch>
					</div>
				</ApolloProvider>
			</MainContextProvider>
		</BrowserRouter>
	);
};

export default App;
