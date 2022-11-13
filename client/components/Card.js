import styles from '@/styles/Card.module.scss'
import Link from 'next/link'

const Card = ({ recipe }) => {
	return (
		<>
			{recipe &&
				<div className={styles.Card}>
					<Link href={`/recipes/${recipe.id}`}>
						<div className={styles.cardImage}>
							<img src={recipe?.image} alt={recipe?.title} />
						</div>
						<div className={styles.cardDesc}>
							<h2>{recipe?.title}</h2>
						</div>
					</Link>
				</div>
			}
		</>
	)
}

export default Card