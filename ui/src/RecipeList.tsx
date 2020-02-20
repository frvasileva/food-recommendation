import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
query ($ingredients: [String]) {
  whatToCook(ingredient: $ingredients, allergens: [], first: 3) {
    name
    ingredients
  }
}`;

export const RecipeList = (props: any) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            ingredients: [props.searchTerm]
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data.whatToCook.map(({ name, ingredients }: any) => (
                <div key={name}>
                    <p>
                        {name}
                    </p>
                    <ul>
                        {ingredients.map((ingredient: string) => (
                            <li key={ingredient}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </ul>
    );
}
