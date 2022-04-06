//! Variables y selectores

const formulario = document.querySelector("#agregar-gasto");
const gastosListado = document.querySelector("#gastos ul");

//! Eventos

eventListeners();
function eventListeners() {
	document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
	formulario.addEventListener("submit", agregarGasto);
}

//! Clases
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
		this.gastos = [];
	}

	nuevoGasto(gasto) {
		this.gastos = [...this.gastos, gasto];
		this.calcularRestante();
	}

	calcularRestante(gasto) {
		const gastado = this.gastos.reduce(
			(total, gasto) => total + gasto.cantidad,
			0
		);
		this.restante = this.presupuesto - gastado;
	}

	eliminarGasto(id) {
		this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
		console.log(this.gastos);
		this.calcularRestante();
	}
}

class UI {
	insertarPresupuesto(cantidad) {
		// Extrayendo el valor
		const { presupuesto, restante } = cantidad;

		// Agregando al  HTML
		document.querySelector("#total").textContent = presupuesto;
	}
	imprimirAlerta(mensaje, tipo) {
		// Creando el div
		const divMensaje = document.createElement("div");
		divMensaje.classList.add("text-center", "alert");

		// Validamos el tipo de mensaje
		if (tipo === "error") {
			divMensaje.classList.add("alert-danger");
		} else {
			divMensaje.classList.add("alert-success");
		}

		// Agregando el texto al mensaje
		divMensaje.textContent = mensaje;

		// Agregando el mensaje al HTML
		document.querySelector(".primario").insertBefore(
			divMensaje,
			formulario
		);

		//ELimnando el mensaje despues de 3 segundos
		setTimeout(() => {
			divMensaje.remove();
		}, 3000);
	}

	mostrarGastos(gastos) {
		this.limpiarHTML();

		// Iterando los gastos
		gastos.forEach((gasto) => {
			const { nombre, cantidad, id } = gasto;

			// Crear un li
			const nuevoGasto = document.createElement("li");
			nuevoGasto.className =
				"list-group-item d-flex justify-content-between align-items-center";
			nuevoGasto.dataset.id = id;

			// Agregar el HTML del gasto
			nuevoGasto.innerHTML = `
        ${nombre}<span class = 'badge badge-primary badge-pill'>$${cantidad}</span>
      `;

			// Boton pata borrar el gasto
			const btnBorrar = document.createElement("button");
			btnBorrar.classList.add(
				"btn",
				"btn-danger",
				"borrar-gasto"
			);
			btnBorrar.textContent = "x  Borrar";
			btnBorrar.onclick = () => {
				eliminarGasto(id);
			};
			nuevoGasto.appendChild(btnBorrar);

			// Agregar al HTML
			gastosListado.appendChild(nuevoGasto);
		});
	}

	limpiarHTML() {
		while (gastosListado.firstChild) {
			gastosListado.removeChild(gastosListado.firstChild);
		}
	}

	actualizarRestante(restante) {
		document.querySelector("#restante").textContent = restante;
	}

	comprobarPresupuesto(presupuestoObj) {
		const { presupuesto, restante } = presupuestoObj;
		const restanteDiv = document.querySelector(".restante");

		// Comprobar 25%

		if (presupuesto / 4 > restante) {
			restanteDiv.classList.remove(
				"alert-success",
				"alert-warning"
			);
			restanteDiv.classList.add("alert-danger");
		} else if (presupuesto / 2 > restante) {
			restanteDiv.classList.remove(
				"alert-success",
				"alert-danger"
			);
			restanteDiv.classList.add("alert-warning");
		} else {
			restanteDiv.classList.remove(
				"alert-warning",
				"alert-danger"
			);
			restanteDiv.classList.add("alert-success");
		}

		if (restante <= 0) {
			ui.imprimirAlerta(
				"Se ha terminado el presupuesto",
				"error"
			);
			formulario.querySelector(
				'button[type="submit"]'
			).disabled = true;
		}
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

function agregarGasto(e) {
	e.preventDefault();

	// Leer los datos del formulario
	const nombre = document.querySelector("#gasto").value;
	const cantidad = Number(document.querySelector("#cantidad").value);

	if (nombre === "" || cantidad === "") {
		ui.imprimirAlerta("Ambos campos son obligatorios", "error");
		return;
	} else if (cantidad <= 0 || isNaN(cantidad)) {
		ui.imprimirAlerta("La cantidad es incorrecta", "error");
		return;
	}

	// Genera un objeto con el gasto
	const gasto = { nombre, cantidad, id: Date.now() };

	// Anade un nuevo hasto
	presupuesto.nuevoGasto(gasto);

	// Mensaje de todo bien
	ui.imprimirAlerta("Gasto agregado correctamente");

	// Imprime el gasto'
	const { gastos, restante } = presupuesto;
	ui.mostrarGastos(gastos);
	ui.actualizarRestante(restante);
	ui.comprobarPresupuesto(presupuesto);

	// Reinicia el Formulario
	formulario.reset();
}

function eliminarGasto(id) {
	presupuesto.eliminarGasto(id);
	const { gastos, restante } = presupuesto;
	ui.mostrarGastos(gastos);
	ui.actualizarRestante(restante);
	ui.comprobarPresupuesto(presupuesto);
	formulario.querySelector('button[type="submit"]').disabled = false;
}
