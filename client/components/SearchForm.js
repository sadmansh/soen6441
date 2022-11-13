import { use, useState } from 'react'
import { useRouter } from 'next/router'

const SearchForm = () => {
    const [term, setTerm] = useState(null)
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        router.push(`/search?term=${term}`)
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