import SearchForm from '@/components/SearchForm'
import styles from '@/styles/Header.module.scss'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.Header}>
            <div className='container'>
                <h1>
                    <Link href='/'>RecipeSpace</Link>
                </h1>
                <SearchForm />
            </div>
        </header>
    )
}

export default Header