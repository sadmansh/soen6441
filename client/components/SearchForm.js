import { useState } from 'react'

const SearchForm = () => {
    const [term, setTerm] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(term)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Search for recipes</h2>
            <input type="text" onChange={e => setTerm(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm