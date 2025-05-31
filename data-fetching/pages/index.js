import fs from "node:fs";
import path from "node:path";
import util from "node:util";

function HomePage({ products }) {
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const promisifyReadFile = util.promisify(fs.readFile);
	const jsonData = await promisifyReadFile(filePath);
	const data = JSON.parse(jsonData);

	if (data.products.length === 0) {
		return { notFound: true };
	}

	return {
		props: {
			products: data.products,
		},
		revalidate: 10,
	};
}

export default HomePage;
