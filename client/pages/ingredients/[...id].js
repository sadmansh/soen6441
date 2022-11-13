import Head from 'next/head'
import Header from '@/components/Header'
import Card from '@/components/Card'
import { getIngredients } from '@/lib/ingredient'
import { getRecipesByIngredient } from '@/lib/recipe'
import styles from '@/styles/Type.module.scss'

const IngredientPage = ({ ingredient, recipes }) => {
	return (
		<>
			<Head>
				<title>RecipeSpace</title>
			</Head>
			<Header />
			<main className={styles.IngredientPage}>
				<div className='container'>
					<h1>{`All recipes tagged ${ingredient?.name}`}</h1>

					<div className="recipeCards">
						{recipes?.map(recipe => (
							<Card recipe={recipe} />
						))}
					</div>
				</div>
			</main>
		</>
	)
}

export async function getStaticProps(context) {
	const [id] = context.params.id
	const ingredients = await getIngredients()
	const ingredient = ingredients.find(t => t.id === parseInt(id))
	
	const recipes = await getRecipesByIngredient(ingredient.id)

	return {
		props: {
			ingredient,
			recipes
		},
		revalidate: 1
	}
}

export async function getStaticPaths() {
	const ingredients = await getIngredients()
	const paths = ingredients.map((ingredient) => ({
		params: {
			id: [`${ingredient.id}`]
		}
	}))

	return {
		paths,
		fallback: true
	}
}

export default IngredientPage