import Head from 'next/head'
import Header from '@/components/Header'
import Card from '@/components/Card'
import { getAllRecipes } from '@/lib/recipe'
import styles from '@/styles/Type.module.scss'
import Link from 'next/link'

const TypePage = ({ count, recipes }) => {
	return (
		<>
			<Head>
				<title>All recipes - RecipeSpace</title>
			</Head>
			<Header />
			<main className={styles.TypePage}>
				<div className='container'>
					<h1>All recipes</h1>

					<div className="recipeCards">
						{recipes?.map(recipe => (
							<Card key={recipe.id} recipe={recipe} />
						))}
					</div>

					<div className={styles.pagination}>
						{Array.from(Array(Math.round(count / 20))).map((x, i) => (
							<Link key={i} href={i === 0 ? '/all' : `?page=${i + 1}`}>{i + 1}</Link>
						))}
					</div>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ query: { page } }) {
	const { recipes, count } = await getAllRecipes(page * 20 - 20)
	return {
		props: {
			recipes,
			count
		},
	}
}

export default TypePage