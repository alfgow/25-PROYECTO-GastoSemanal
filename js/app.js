//! Variables y selectores

const formulario = document.querySelector("#agregar-gasto");
const gastosListado = document.querySelector("#gastos ul");

//! Eventos

eventListeners();
function eventListeners() {
	document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}

//! Clases
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
	}
}

//! Funciones

function preguntarPresupuesto() {
	const presupuestoUsuario = prompt("Ingresa tu presupuesto semanal");

	switch (presupuestoUsuario) {
		case "":
			alert("El presupuesto no puede estar vacio");
			window.location.reload();
			break;

		case null:
			alert("El presupuesto no puede estar vacio");
			window.location.reload();
			break;

		default:
			if (isNaN(presupuestoUsuario)) {
				alert(
					"El presupuesto no puedes estar en letras"
				);
				window.location.reload();
			} else {
				if (presupuestoUsuario <= 0) {
					alert(
						"El presupuesto no puede ser menor o igual a 0, ingresa un numero mayor a 0"
					);
					window.location.reload();
				}
			}
			break;
	}
}
