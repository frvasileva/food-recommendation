import { gql } from "apollo-boost";

const fragments: any = {
	recipeTile: gql`
		fragment RecipeTile on Recipe {
			id
			name
			preparationTime
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
			collections(orderBy: createdOn_desc) {
				...CollectionTile
			}
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const RECIPE_BY_ID_QUERY = gql`
	query($recipeId: ID) {
		Recipe: Recipe(id: $recipeId) {
			...RecipeTile
		}
		RecipeRandomList: findSimiliarRecipe(recipeId: $recipeId, limit: 3) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
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
			recipes(first: 3, orderBy: ratings_desc) {
				...RecipeTile
			}
		}
		newestRecipes: Recipe(first: 6, orderBy: createdOn_desc) {
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
		collections: Collection(first: 30) {
			name
			friendlyUrl
			recipes(first: 12, orderBy: ratings_desc) {
				...RecipeTile
			}
		}
	}

	${fragments.recipeTile}
`;

// export const RECIPE_BY_ID_QUERY = gql`
// 	query($recipeId: ID) {
// 		Recipe: Recipe(id: $recipeId) {
// 			...RecipeTile
// 		}
// 		RecipeRandomList: findSimiliarRecipe(recipeId: $recipeId, limit: 3) {
// 			...RecipeTile
// 		}
// 	}
// 	${fragments.recipeTile}
// `;
