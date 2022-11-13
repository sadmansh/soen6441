export async function getTypes() {
    const res = await fetch('http://localhost:3000/api/types')
	return await res.json()
}