import Head from 'next/head'
import Header from '@/components/Header'
import Card from '@/components/Card'
import { getTypes } from '@/lib/type'
import { getRecipesByType } from '@/lib/recipe'
import styles from '@/styles/Type.module.scss'

const TypePage = ({ type, recipes }) => {
	return (
		<>
			<Head>
				<title>RecipeSpace</title>
			</Head>
			<Header />
			<main className={styles.TypePage}>
				<div className='container'>
					<h1>{`All recipes tagged ${type?.name}`}</h1>

					<div className="recipeCards">
						{recipes?.map(recipe => (
							<Card key={recipe.id} recipe={recipe} />
						))}
					</div>
				</div>
			</main>
		</>
	)
}

export async function getStaticProps(context) {
	const [id] = context.params.id
	const types = await getTypes()
	const type = types.find(t => t.id === parseInt(id))
	
	const recipes = await getRecipesByType(type.id)

	return {
		props: {
			type,
			recipes
		},
		revalidate: 1
	}
}

export async function getStaticPaths() {
	const types = await getTypes()
	const paths = types.map((type) => ({
		params: {
			id: [`${type.id}`]
		}
	}))

	return {
		paths,
		fallback: true
	}
}

export default TypePage