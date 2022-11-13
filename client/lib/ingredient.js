export async function getIngredients() {
    const res = await fetch('http://localhost:3000/api/ingredients')
	return await res.json()
}