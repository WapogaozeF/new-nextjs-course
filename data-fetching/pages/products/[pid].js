import fs from "node:fs";
import path from "node:path";
import util from "node:util";

import { Fragment } from "react";

function ProductDetailPage(props) {
	const { product } = props;

	return (
		<Fragment>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
		</Fragment>
	);
}

async function getData() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const promisifyReadFile = util.promisify(fs.readFile);
	const jsonData = await promisifyReadFile(filePath);
	return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
	const { params } = context;

	const productId = params.pid;

	const data = await getData();

	const product = data.products.find((product) => product.id === productId);

	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const data = await getData();

	const ids = data.products.map((product) => product.id);
	const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: pathWithParams,
		fallback: "blocking",
	};
}

export default ProductDetailPage;
