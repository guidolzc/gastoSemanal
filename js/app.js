// variables 
const presupuestoUsuario = prompt ('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');

let cantidadPresupuesto;
// clases
// clase de prosupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number (presupuesto);
        this.restante = Number(presupuesto);
    }
    // Metodo para ir restando el presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number (cantidad);
    }
}
// clases de interfaz maneja todo lo relacionado

class Interfaz {
    insertarPresupuesto(cantidad){
       const presupuestoSpan = document.querySelector('span#total');
       const restanteSpan = document.querySelector('span#restante');
       // console.log(cantidad);
    
       // INSERTAR AL HTML
       presupuestoSpan.innerHTML = `${cantidad}`;
       restanteSpan.innerHTML = `${cantidad}`;
    }
        
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');

        }else{
            divMensaje.classList.add('alert-success');
            
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // insertar en el DOM antes del FORMULARIO INDICANDO BIEN DONDE QUIERO QUE VALLA EL MENSAJE DE ALERTA ERROR 
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
     
        // QUITAR el alert despues de 3 seg creamos el REMOVE en 3 seg 
            setTimeout(function() {
                document.querySelector('.primario .alert').remove();
                // resetiamos el formulario
                formulario.reset();
            }, 3000);
    } 
    // Insertar los gastos a la lista
    agregarGastoListado(nombre , cantidad){ 
        const gastosListado = document.querySelector('#gastos ul');

        // crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item de-flex justify-content-between aling-items-center';
        // Insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>


        
        `;
        gastosListado.appendChild(li);

    }
    
    //comprueba el presupuesto
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        
        //console.log(presupuestoRestanteUsuario);



        this.comprobarPresupuesto();
    }
    /* CAMBIA DE COLOR EL PRESUPUESTO RESTANTE accede a los numeros 
    para tomarlos en cuenta para cambiar el color*/

        comprobarPresupuesto(){
            //console.log(cantidadPresupuesto);

            const presupuestoTotal= cantidadPresupuesto.presupuesto;
            const presupuestoRestante = cantidadPresupuesto.restante;

            // comprobar el 25 % del gasto
            if ( (presupuestoTotal / 4) > presupuestoRestante) {
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success', 'alert-warning');
                restante.classList.add('alert-danger');
            
            }else if( (presupuestoTotal / 2 ) > presupuestoRestante ){
                const restante = document.querySelector('.restante');
                restante.classList.remove('alert-success');
                restante.classList.add('alert-warning');
            }


        }

        
}
// even listeners

document.addEventListener('DOMContentLoaded', function(){
    // para que si o si carge datos al tirar NULL
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();

    } else {
        // Instanciar un prosupuesto
       // console.log('agregado correctamente');
       cantidadPresupuesto = new Presupuesto (presupuestoUsuario);
       //console.log(cantidadPresupuesto);

       // instanciar la clase de INTERFAZ
       // avilitar algo del constructor para que lo lea INSERTAR PROSUPUESTO = ejemplo prosupuesto
       const ui = new Interfaz();
       ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
}); 

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    //console.log('Enviado');

    // Leer del formulario de Gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // INSTANCIAR LA INTERFAZ
    const ui = new Interfaz();

    // comprobar que los campos no esten vacios
    if(nombreGasto === ''|| cantidadGasto === '') { 

        //console.log('hubo un error');
        // 2 PARAMETROS : MENSAJE Y TIPO
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
       // console.log('el gasto se agrego');

        // Insertar en el HTML
        ui.imprimirMensaje('Correcto' , 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

});
