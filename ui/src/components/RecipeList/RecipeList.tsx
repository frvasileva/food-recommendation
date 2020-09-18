import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import {
	RECIPE_FULL_TEXT_SEARCH_BY_NAME_QUERY,
	RECIPE_BY_INGREDIENTS_QUERY,
} from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { useLocation } from "react-router-dom";

export const RecipeList = () => {
	const LIMIT_QUERY_RESULT = 12;
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	var searchTerm = searchParams.get("term") ?? "";
	console.log(searchTerm);
	var isSearchByTerm = searchTerm !== "";
	console.log("isSearchByTerm", isSearchByTerm);

	var searchedIngredients = searchParams.get("ingredients") ?? "";
	var searchIngredientsArray: string[] = [];

	if (searchedIngredients !== "") {
		searchIngredientsArray = searchedIngredients.split(",");
	}

	var sPrepTimeRange: number[] = [];
	var fPrepTimeRange = searchParams.get("prepTime");
	if (fPrepTimeRange !== null) {
		sPrepTimeRange = fPrepTimeRange.split(",").map(Number) || [];
	}

	var sCookingTimeRange: number[] = [];
	var fCookingTimeRange = searchParams.get("cookingTime");
	if (fCookingTimeRange !== null) {
		sCookingTimeRange = fCookingTimeRange.split(",").map(Number) || [];
	}

	var sSkillLevel: string[] = [];
	var fSkillLevel = searchParams.get("skillLevel");
	if (fSkillLevel !== null) {
		sSkillLevel = fSkillLevel.split(",") || [];
	}

	const query = useQuery(RECIPE_FULL_TEXT_SEARCH_BY_NAME_QUERY, {
		variables: {
			term: searchTerm,
			ingredients: searchIngredientsArray,
			preparationTimeRange: sPrepTimeRange,
			cookingTimeRange: sCookingTimeRange,
			skillLevel: sSkillLevel,
			skip: 0,
			limit: LIMIT_QUERY_RESULT,
		},
		skip: !isSearchByTerm,
	});
	const query2 = useQuery(RECIPE_BY_INGREDIENTS_QUERY, {
		variables: {
			ingredients: searchIngredientsArray,
			preparationTimeRange: sPrepTimeRange,
			cookingTimeRange: sCookingTimeRange,
			skillLevel: sSkillLevel,
			skip: 0,
			limit: LIMIT_QUERY_RESULT,
		},
		skip: isSearchByTerm,
	});

	// const scrollElement = (e: any) => {
	// 	var scroll = document.documentElement;
	// 	if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
	// 		query.fetchMore({
	// 			variables: {
	// 				skip: query.data.recipeList.length,
	// 			},
	// 			updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
	// 				if (!fetchMoreResult) return prev;
	// 				query.variables.skip = query.variables.skip + 10;
	// 				return {
	// 					recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList],
	// 				};
	// 			},
	// 		});
	// 	}
	// };

	// React.useEffect(() => {
	// 	window.addEventListener("scroll", scrollElement);
	// 	return () => {
	// 		window.removeEventListener("scroll", scrollElement);
	// 	};
	// });

	if (query.loading || query2.loading) return <LoadingScreen />;
	if (query.error || query2.error) return <ErrorScreen error={query.error} />;

	console.log("111", query.data);
	console.log("222", query2.data);

	var recipes = [];
	var queryListLenght = 0;
	if (query.data !== undefined) {
		recipes = query.data.recipeList;
		queryListLenght = query.data.recipeList.length;
	} else if (query2.data !== undefined) {
		recipes = query2.data.recipeList;
		queryListLenght = query2.data.recipeList.length;
	}

	console.log(recipes);

	return (
		<div>
			<div className="search-component-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Search term={searchParams.get("term")} />
						</div>
					</div>
				</div>
			</div>
			<div className="container search-result-wrapper">
				<div className="row recipe-wrapper">
					{recipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-4 col-sm-6">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
