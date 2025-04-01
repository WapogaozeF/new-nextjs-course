export default function MealPage({ params }) {
	return (
		<main>
			<h1>Meal Page</h1>
			<p>{params.slug}</p>
		</main>
	);
}
