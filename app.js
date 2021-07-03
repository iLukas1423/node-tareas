const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, leerInput, listadoTareasBorrar, confirmar, mostrarCheckList, pausa } = require('./helpers/inquirier');
const Tareas = require('./models/tareas');

require('colors');
console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarPedientesCompletadas();
                break;
            case '4':
                tareas.listarPedientesCompletadas(false);
                break;
            case '5':
                if (tareas.listadoArr.length > 0) {
                    const ids = await mostrarCheckList(tareas.listadoArr);
                    const confirm = await confirmar('Estás seguro?');
                    if (confirm)
                        tareas.completarTareas(ids);
                } else {
                    const confirm = await confirmar('No hay tareas para completar.');
                }
                break;
            case '6':
                if (tareas.listadoArr.length > 0) {
                    const id = await listadoTareasBorrar(tareas.listadoArr);
                    if (id !== '0') {
                        const confirm = await confirmar('Estás seguro?');
                        if (confirm)
                            tareas.borrarTarea(id);
                    }
                } else {
                    const confirm = await confirmar('No hay tareas para borrar.');
                }

                break;
        }


        guardarDB(tareas.listadoArr);
        console.log(); await pausa();

    } while (opt != 0);
}

main()