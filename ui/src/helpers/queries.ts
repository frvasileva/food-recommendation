import { gql } from "apollo-boost";

const fragments: any = {
	recipeTile: gql`
		fragment RecipeTile on Recipe {
			id
			name
			preparationTime
			ingredients
			description
			skillLevel
			cookingTime
			ratings
			nutritionInfo
			cusine
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

export const loginUserQuery = gql`
	mutation($email: String, $password: String) {
		loginUser(email: $email, password: $password)
	}
`;

export const registerUserQuery = gql`
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
