import { Switch, Route } from "react-router";
import React from "react";
import { Home } from "../components/Home/Home";
import { RecipeList } from "../components/RecipeList/RecipeList";
import { Collections } from "../components/Collections/Collections";
import { CollectionList } from "../components/CollectionList/CollectionList";
import { RecipeDetails } from "../components/RecipeDetails/RecipeDetails";
import { Register } from "../components/Register/Register";
import { Login } from "../components/Login/Login";
import { Profile } from "../components/Profile/Profile";
import GuardedRoute from "../shared/guardedRoute";
import { CreateRecipe } from "../components/CreateRecipe/CreateRecipe";
import { CreateCollection } from "../components/CreateCollection/CreateCollection";
import { SetMainProduct } from "../admin/MainProduct/SetMainProduct/SetMainProduct";
import { SetRecipeOfTheDay } from "../admin/RecipeOfTheDay";
import { PredefinedSearchCategories } from "../admin/PredefinedSearchCategories/PredefinedSearchCategories";
import tokenHelper from "../helpers/tokenHelper";
import { ProfileEdit } from "../components/Profile/ProfileEdit";

export const Routing = () => {
	var token = tokenHelper();
	var isAutheticated = token.isAuth();
	var userRoles = token.roles();
	var isAdmin = userRoles.indexOf("admin") > -1;

	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/recipes" component={RecipeList} />
			<Route exact path="/collections" component={Collections} />
			<Route exact path="/collection/:friendlyUrl" component={CollectionList} />
			<Route exact path="/recipe/:friendlyUrl" component={RecipeDetails} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/profile/:friendlyUrl" component={Profile} />

			<GuardedRoute
				path="/add-recipe"
				component={CreateRecipe}
				auth={isAutheticated && isAdmin}
			/>
			<GuardedRoute
				exact
				path="/add-collection"
				component={CreateCollection}
				auth={isAutheticated}
			/>
			<GuardedRoute
				path="/profile-edit/:friendlyUrl"
				component={ProfileEdit}
				auth={isAutheticated}
			/>
			<GuardedRoute
				path="/admin/add-product"
				component={SetMainProduct}
				auth={isAutheticated && isAdmin}
			/>
			<GuardedRoute
				path="/admin/add-recipe-of-the-day"
				component={SetRecipeOfTheDay}
				auth={isAutheticated && isAdmin}
			/>
			<GuardedRoute
				path="/admin/add-product"
				component={SetMainProduct}
				auth={isAutheticated && isAdmin}
			/>
			<GuardedRoute
				path="/admin/add-predefined-search-category"
				component={PredefinedSearchCategories}
				auth={isAutheticated && isAdmin}
			/>
		</Switch>
	);
};

export default Routing;
