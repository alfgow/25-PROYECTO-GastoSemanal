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
		this.restante = Number(presupuesto);
		this.gastos = [];
	}
}

class UI {
	insertarPresupuesto(cantidad) {
		const { presupuesto, restante } = cantidad;
		document.querySelector("#total").textContent = presupuesto;
		document.querySelector("#restante").textContent = restante;
	}
}

//! Instanciando
let presupuesto;
const ui = new UI();

//! Funciones

function preguntarPresupuesto() {
	const presupuestoUsuario = prompt("Ingresa tu presupuesto semanal");

	if (
		presupuestoUsuario == null ||
		presupuestoUsuario == "" ||
		isNaN(presupuestoUsuario) ||
		presupuestoUsuario < 0
	) {
		alert("Debes ingresar un presupuesto valido");
		preguntarPresupuesto();
	}

	//! Presupuesto valido
	presupuesto = new Presupuesto(presupuestoUsuario);

	ui.insertarPresupuesto(presupuesto);
}
