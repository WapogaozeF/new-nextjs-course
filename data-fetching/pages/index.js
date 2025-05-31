import fs from "node:fs";
import path from "node:path";
import util from "node:util";

import Link from "next/link";

function HomePage({ products }) {
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>{product.title}</Link>
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const promisifyReadFile = util.promisify(fs.readFile);
	const jsonData = await promisifyReadFile(filePath);
	const data = JSON.parse(jsonData);

	if (!data) {
		return {
			redirect: {
				destination: "/no-data",
			},
		};
	}

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
