require("colors");
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    completarTareas(ids = []) {
        this.listadoArr.forEach(tarea => {
            if (ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = new Date().toISOString();
            } else {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(element => {
            this._listado[element.id] = element;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        console.log();
        if (this.listadoArr.length <= 0)
            console.log('  No hay tareas pendientes'.cyan);
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? "Completado".green : "Pendiente".red;
            console.log(`  ${idx}. ${desc} :: ${estado}`);

        })
    }

    listarPedientesCompletadas(completadas = true) {
        let idx = 0;
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? completadoEn.green : "Pendiente".red;
            if (completadas) {
                if (completadoEn) {
                    idx++;
                    console.log(`  ${(idx + '.').green} ${desc} :: ${estado}`);

                }
            } else {
                if (!completadoEn) {
                    idx++;
                    console.log(`  ${(idx + '.').green} ${desc} :: ${estado}`);

                }
            }

        })
        if (idx == 0)
            console.log(`  No hay tareas ${completadas ? 'completadas' : 'pendientes'}`.cyan);
    }




}
module.exports = Tareas;