import Button from "../shared/button/Button";

export default function EmptyList() {
	return (
		<div>
			<p>Aún no tenemos anuncios para mostrarte.</p>
			<p>¡Sé el primero en crear uno!</p>
			<Button variant="link" to="/adverts/new">Crear anuncio</Button>
		</div>
	);
}
