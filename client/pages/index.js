import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import SearchForm from '@/components/SearchForm'
import TypesList from '@/components/TypesList'
import IngredientsList from '@/components/IngredientsList'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>RecipeSpace</title>
			</Head>

			<main className={styles.main}>
				<SearchForm />
				<TypesList />
				<IngredientsList />
			</main>

			<footer className={styles.footer}>
				
			</footer>
		</div>
	)
}
