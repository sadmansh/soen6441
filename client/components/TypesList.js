import { getTypes as getAllTypes } from '@/lib/type'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const TypesList = () => {
	const [types, setTypes] = useState(null)

	const getTypes = async () => {
		const types = await getAllTypes()
		setTypes(types)
	}

	useEffect(() => {
		getTypes()
	}, [])

	return (
		<div className={styles.TypesList}>
			<h2>Explore recipes by type</h2>

			<ul>
				{types && types.map(type => (
					<li key={type.id}>
						<Link href={`/types/${type.id}`}>{type.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TypesList