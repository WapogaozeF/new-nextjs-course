import { useRouter } from "next/router";

function ClientProjectsPage() {
	const router = useRouter();

	function loadProjectHandler() {
		router.push("/clients/max/projecta");
	}

	return (
		<div>
			<h1>The Project of a Given Client</h1>
			<button onClick={loadProjectHandler} type="button">
				Load Project A
			</button>
		</div>
	);
}

export default ClientProjectsPage;
