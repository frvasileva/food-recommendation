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

	const query_by_term = useQuery(RECIPE_FULL_TEXT_SEARCH_BY_NAME_QUERY, {
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
	const query_by_filter = useQuery(RECIPE_BY_INGREDIENTS_QUERY, {
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

	const scrollElement = (e: any) => {
		var scroll = document.documentElement;
		if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
			if (isSearchByTerm) {
				query_by_term.fetchMore({
					variables: {
						skip: query_by_term.data.recipeList.length,
					},
					updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
						if (!fetchMoreResult) return prev;
						query_by_term.variables.skip = query_by_term.variables.skip + 10;
						return {
							recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList],
						};
					},
				});
			} else {
				query_by_filter.fetchMore({
					variables: {
						skip: query_by_filter.data.recipeList.length,
					},
					updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
						if (!fetchMoreResult) return prev;
						query_by_filter.variables.skip =
							query_by_filter.variables.skip + 10;
						return {
							recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList],
						};
					},
				});
			}
		}
	};

	React.useEffect(() => {
		window.addEventListener("scroll", scrollElement);
		return () => {
			window.removeEventListener("scroll", scrollElement);
		};
	});

	if (query_by_term.loading || query_by_filter.loading)
		return <LoadingScreen />;
	if (query_by_term.error || query_by_filter.error)
		return <ErrorScreen error={query_by_term.error} />;

	console.log("query_by_term", query_by_term.data);
	console.log("query_by_filter", query_by_filter.data);

	var recipes = [];
	if (isSearchByTerm) {
		recipes = query_by_term.data.recipeList;
	} else {
		recipes = query_by_filter.data.recipeList;
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
						<div
							key={recipe.name}
							className="col-lg-3 col-md-4 col-sm-6 col-12"
						>
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
