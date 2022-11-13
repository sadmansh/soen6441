import Head from 'next/head'
import Header from '@/components/Header'
import Card from '@/components/Card'
import { searchRecipe } from '@/lib/recipe'
import styles from '@/styles/Type.module.scss'

const TypePage = ({ term, recipes }) => {

	return (
		<>
			<Head>
				<title>RecipeSpace</title>
			</Head>
			<Header />
			<main className={styles.TypePage}>
				<div className='container'>
					<h1>{`Search results for ${term}`}</h1>

                    {recipes.length ?
                        <div className="recipeCards">
                            {recipes?.map(recipe => (
                                <Card key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                        : <p>Sorry, there are no recipes matching "{term}"</p>
                    }
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ query: { term } }) {
	const recipes = await searchRecipe(term)

	return {
        props: {
            term,
            recipes
        }
    }
}

export default TypePage