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
	`
};

export const createRecipeQuery = gql`
	mutation($input: CreateRecipeInput) {
		createRecipe(input: $input) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const createCollectionQuery = gql`
	mutation($input: CreateCollectionInput) {
		createCollection(input: $input) {
			...CollectionTile
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const addRecipeToCollectionQuery = gql`
	mutation($input: AddRecipeToCollection) {
		addRecipeToACollection(input: $input) {
			...CollectionTile
		}
	}
	${fragments.collectionTile}
	${fragments.recipeTile}
`;

export const removeRecipeFromCollectionQuery = gql`
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

export const userCollectionsQuery = gql`
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
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

export const recipeQuery = gql`
	query {
		Recipe(first: 30, orderBy: createdOn_asc) {
			...RecipeTile
		}
	}
	${fragments.recipeTile}
`;

