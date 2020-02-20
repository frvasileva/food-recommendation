import React from 'react';

export const Search = (props: any) => {
    const [term, setTerm] = React.useState('');
    
    const updateTerm = (e: any) => {
        setTerm(e.target.value)
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        props.onSearch(term);
        setTerm('');
    }

    return (
        <form onSubmit={submitForm}>
            <input value={term} onChange={updateTerm} />
            <button type='submit'>Search</button>
        </form>
    )
};