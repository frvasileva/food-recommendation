import { gql } from "apollo-boost";

const fragments: any = {
	recipeTile: gql`
		fragment RecipeTile on Recipe {
			id
			name
			friendlyUrl
			preparationTime
			imagePath
			skillLevel
			cookingTime
			ratings
			cusine
			suitableAge
			createdOn {
				formatted
			}

		}
	`,
	recipeTileDetailed: gql`
		fragment RecipeTileDetailed on Recipe {
			id
			name
			preparationTime
			imagePath
			ingredients {
				name
				quantity
				quantityType
			 }
			description
			skillLevel
			cookingTime
			ratings
			nutritionInfo
			cusine
			friendlyUrl
			createdOn {
				formatted
			}
		}
	`,
	collectionTile: gql`
		fragment CollectionTile on Collection {
			id
			name
			createdOn {
				formatted
			}
			recipes {
				...RecipeTile
			}
		}
	`,
};

export const CREATE_RECIPE_QUERY = gql`
	mutation($input: CreateRecipeInput) {
		createRecipe(input: $input) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const CREATE_COLLECTION_QUERY = gql`
	mutation($input: CreateCollectionInput) {
		createCollection(input: $input) {
			...CollectionTile
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const ADD_RECIPE_TO_COLLECTION_QUERY = gql`
	mutation($input: AddRecipeToCollection) {
		addRecipeToACollection(input: $input) {
			...CollectionTile
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const REMOVE_RECIPE_TO_COLLECTION_QUERY = gql`
	mutation($input: AddRecipeToCollection) {
		removeRecipeFromCollection(input: $input) {
			...CollectionTile
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const LOGIN_USER_QUERY = gql`
	mutation($email: String, $password: String) {
		loginUser(email: $email, password: $password)
	}
`;
export const LOGIN_FACEBOOK_USER_QUERY = gql`
	mutation($input: FacebookLoginInput) {
		loginFacebookUser(input: $input)
	}
`;

export const SET_SESSION_QUERY = gql`
	mutation($input: CreateSessionInput) {
		createUserSession(input: $input)
	}
`;
export const SET_SEARCHED_TERM = gql`
	mutation($input: SetSearchInputInput) {
		createSearchTerm(input: $input) {
			term
		}
	}
`;

export const SET_PREDEFINED_SEARCH_CATEGORY = gql`
	mutation($friendlyUrl: String) {
		setPredefinedSearchCategory(friendlyUrl: $friendlyUrl) {
			name
		}
	}
`;

export const REGISTER_USER_QUERY = gql`
	mutation($input: RegisterUserInput) {
		registerUser(input: $input)
	}
`;

export const SET_RECIPE_OF_THE_DAY = gql`
	mutation($recipeId: String) {
		setRecipeOfTheDay(recipeId: $recipeId) {
			name
		}
	}
`;

export const GET_RECIPE_OF_THE_DAY = gql`
	query {
		getRecipeOfTheDay {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const GET_PREDEFINED_SEARCH_CATEGORY = gql`
	query {
		getPredefinedSearchCategories {
			name
			friendlyUrl
		}
	}
`;

export const USER_COLLECTION_QUERY = gql`
	query($friendlyUrl: String) {
		User(friendlyUrl: $friendlyUrl) {
			id
			email
			friendlyUrl
			collections {
				...CollectionTile
			}
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;
export const TOP_INGREDIENTS_QUERY = gql`
	query {
		topIngredients: getMostPopularIngredients(first: 30) {
			name
		}
	}
`;

export const RECIPE_BY_ID_QUERY = gql`
	query($friendlyUrl: String, $limit: Int) {
		Recipe: Recipe(friendlyUrl: $friendlyUrl) {
			...RecipeTileDetailed
		}
		RecipeRandomList: findSimiliarRecipe(friendlyUrl: $friendlyUrl, limit: $limit) {
			...RecipeTileDetailed
		}
	}
	${fragments.recipeTileDetailed}
`;

export const NEWEST_RECIPES_QUERY = gql`
	query {
		Recipe(first: 8, orderBy: createdOn_desc) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const RECIPE_LIST_QUERY = gql`
	query($skip: Int, $limit: Int, $ingredients: [String], $allergens: [String]) {
		recipeList(
			skip: $skip
			limit: $limit
			ingredients: $ingredients
			allergens: $allergens
		) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;
export const RECIPE_FULL_TEXT_SEARCH_BY_NAME_QUERY = gql`
	query(
		$term: String
		$ingredients: [String]
		$preparationTimeRange: [Int]
		$cookingTimeRange: [Int]
		$skillLevel: [String]
		$skip: Int
		$limit: Int
	) {
		recipeList: recipeFullTextSearch(
			term: $term
			ingredients: $ingredients
			preparationTimeRange: $preparationTimeRange
			cookingTimeRange: $cookingTimeRange
			skillLevel: $skillLevel
			skip: $skip
			limit: $limit
			offset:$skip
			first:$limit
		) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const RECIPE_INGREDIENTS_FULLTEXT_QUERY = gql`
	query($searchTerm: String) {
		recipeAndProductFullTextSearch(searchTerm: $searchTerm) {
			__typename
			... on Recipe {
				name
				ingredients
			}

			... on Ingredient {
				name
			}
		}
	}
`;

export const GET_POPULAR_COLLECTIONS_QUERY = gql`
	query {
		getPopularCollections(first: 10) {
			name
			friendlyUrl
			recipes(first: 3, orderBy: ratings_desc) {
				...RecipeTile
			}
		}
	}
	${fragments.recipeTile}
`;

export const HOME_PAGE_DATA_QUERY = gql`
	query {
		popularCollections: getPopularCollections(first: 12) {
			name
			friendlyUrl
		}
		newestRecipes: getNewestRecipes(first: 4) {
			...RecipeTile
		}
		recipeOfTheDay: getRecipeOfTheDay {
			...RecipeTile
		}
	}

	${fragments.recipeTile}
`;

export const GET_COLLECTION_DETAILS = gql`
	query collectionDetails($friendlyUrl: String, $skip: Int) {
		collectionDetails: Collection(
			first: 10
			filter: { friendlyUrl: $friendlyUrl }
		) {
			name
			friendlyUrl
			recipes(first: 12, orderBy: ratings_desc, offset: $skip) {
				...RecipeTile
			}
		}
	}

	${fragments.recipeTile}
`;

export const GET_COLLECTIONS = gql`
	query collections {
		collections: Collection(first: 32) {
			name
			friendlyUrl
			recipes(first: 3, orderBy: ratings_desc) {
				...RecipeTile
			}
		}
	}

	${fragments.recipeTile}
`;

export const SET_MAIN_PRODUCT = gql`
	mutation($name: String) {
		setMainProduct(name: $name) {
			name
		}
	}
`;

export const REMOVE_MAIN_PRODUCT = gql`
	mutation($ingredientId: String) {
		deleteMainProduct(ingredientId: $ingredientId) {
			friendlyUrl
			name
		}
	}
`;

export const GET_MAIN_PRODUCTS = gql`
	query mainProducts {
		MainProduct{
			name
			friendlyUrl
		}
	}
`;
