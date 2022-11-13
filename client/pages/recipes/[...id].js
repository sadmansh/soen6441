import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'
import { getRecipeById } from '@/lib/recipe'
import styles from '@/styles/Recipe.module.scss'

const Recipe = ({ recipe }) => {
	console.log(JSON.parse(recipe?.types))
	return (
		<>
			<Head>
				<title>{recipe?.title} - RecipeSpace</title>
			</Head>
			<Header />
			<main className={styles.RecipePage}>
				<div className='container'>
					<div className={styles.recipeWrapper}>
						<h1>{recipe?.title}</h1>

						{recipe?.types && 
							<ul className={styles.recipeTypes}>
								{Object.entries(JSON.parse(recipe.types)).map(([id, type]) => (
									<li key={id}>
										<Link href={`/types/${id}`}>{type}</Link>
									</li>
								))}
							</ul>
						}

						<div className={styles.recipeImage}>
							<img src={recipe?.image} />
						</div>
						{recipe?.summary &&
							<div className={styles.recipeContent}>
								<h2>Summary</h2>
								<div className={styles.recipeSummary} dangerouslySetInnerHTML={{__html: recipe?.summary }}></div>
							</div>
						}

						{recipe?.ingredients &&
							<div className={styles.recipeIngredients}>
								<h2>Ingredients</h2>
								<ul>
									{Object.entries(JSON.parse(recipe.ingredients)).map(([id, amount]) => (
										<li key={id}>
											<Link href={`/ingredients/${id}`}>{amount}</Link>
										</li>
									))}
								</ul>
							</div>
						}

						{recipe?.instructions &&
                            <div className={styles.recipeContent}>
                                <h2>Instructions</h2>
                                <div 
									className={styles.recipeInstructions} 
									dangerouslySetInnerHTML={{ __html: `<ol><li>${recipe.instructions.replace(/\n/g, '</li><li>')}</li></ol>` }} />
                            </div>
                        }
					</div>
					
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ params: { id } }) {
	const recipe = await getRecipeById(parseInt(id))

	return {
		props: {
			recipe
		}
	}
}

export default Recipe