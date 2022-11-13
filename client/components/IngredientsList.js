import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const IngredientsList = () => {
	const [ingredients, setIngredients] = useState(null)
	const [showAll, setShowAll] = useState(false)

	const getIngredients = async () => {
		const res = await fetch('/api/ingredients')
		const ingredients = await res.json()
		setIngredients(showAll ? ingredients : ingredients.slice(0, 12))
	}

	useEffect(() => {
		getIngredients()
	}, [showAll])

	return (
		<div className={styles.IngredientsList}>
			<h2>Explore recipes by ingredient</h2>

			<ul>
				{ingredients && ingredients.map(ingredient => (
					<li key={ingredient.id}>
						<Link href={`/ingredients/${ingredient.id}`}>{ingredient.name}</Link>
					</li>
				))}
			</ul>
			<button type="button" className={styles.button} onClick={() => setShowAll(!showAll)}>
				{showAll ? 'See less' : 'See all ingredients'}
			</button>
		</div>
	)
}

export default IngredientsList