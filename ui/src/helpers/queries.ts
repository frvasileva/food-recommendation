import { gql } from "apollo-boost";

const fragments = {
	recipeTile: gql`
		fragment RecipeTile on Recipe {
			id
			name
			preparationTime
			ingredients
			description
			skillLevel
			cookingTime
			collections {
				id
				name
				recipes {
					id
					name
					description
					ingredients
					createdOn
					cookingTime
					preparationTime
					dietType
					friendlyUrl
					collections {
						id
						name
					}
				}
			}
		}
	`
};

export const createRecipeQuery = gql`
	mutation($input: CreateRecipeInput) {
		createRecipe(input: $input) {
			id
			name
			description
			friendlyUrl
		}
	}
`;

export const createCollectionQuery = gql`
	mutation($input: CreateCollectionInput) {
		createCollection(input: $input) {
			id
			name
		}
	}
`;

export const addRecipeToCollectionQuery = gql`
	mutation($input: AddRecipeToCollection) {
		addRecipeToACollection(input: $input) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const removeRecipeFromCollectionQuery = gql`
	mutation($input: AddRecipeToCollection) {
		remvoeRecipeFromACollection(input: $input) {
			...RecipeTile
		}
	}
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

export const userCollectionsQuery = gql`
	query($friendlyUrl: String) {
		User(friendlyUrl: $friendlyUrl) {
			id
			email
			friendlyUrl
			collections {
				id
				name
				recipes {
					...RecipeTile
				}
			}
		}
	}
	${fragments.recipeTile}
`;

export const recipeByIdQuery = gql`
	query($recipeId: ID) {
		Recipe: Recipe(id: $recipeId) {
			...RecipeTile
		}
		RecipeRandomList: Recipe(first: 3) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const recipeByIngredientsQuery = gql`
	query($ingredients: [String]) {
		whatToCook(
			ingredient: $ingredients
			allergens: []
			first: 3
			orderBy: createdOn_asc
		) {
			id
			name
			preparationTime
			description
			skillLevel
			cookingTime
			createdOn
		}
	}
`;

export const recipeQuery = gql`
	query {
		Recipe(first: 10, orderBy: createdOn_asc) {
			id
			name
			preparationTime
			description
			skillLevel
			cookingTime
			createdOn
		}
	}
`;

export const collectionsByUserQuery = gql`
	query($userId: String) {
		collections: collectionsByUser(userId: $userId) {
			id
			name
		}
	}
`;
