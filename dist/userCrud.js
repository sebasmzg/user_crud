var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { listTemplate } from './classes/listTemplate.js';
import { Crud } from './classes/crud.js';
//Definir las constantes y variables
const url_base = 'http://localhost:3000/users'; //URL de la API
//elementos del DOM
const card = document.querySelector('.users-list');
const form = document.querySelector('.form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const avatar = document.querySelector('#avatar');
//Variable que almacena el id del usuario
let idCache;
//Instanciar la clase listTemplate
const list = new listTemplate(card);
//Agregar eventos al formulario 
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    //Crear un nuevo usuario si idCache es undefined
    if (idCache === undefined) {
        const crud = new Crud(url_base);
        yield crud.create(name, avatar, email);
        confirm(`Se ha agregado el usuario ${name.value}`);
    }
    //Actualizar un usuario si idCache no es undefined, es decir, si se ha seleccionado un usuario
    else {
        const crud = new Crud(`${url_base}/${idCache}`);
        yield crud.update(idCache, name, avatar, email);
        idCache = undefined;
    }
    form.reset(); //Limpiar el formulario
    getUser(); //Obtener los usuarios
}));
//Agregar eventos a la lista de usuarios, para actualizar o eliminar un usuario usando los botones
card.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    //Actualizar un usuario
    if (e.target instanceof HTMLButtonElement && e.target.classList.contains('btn-update')) {
        idCache = e.target.dataset.id;
        const crud = new Crud(url_base);
        if (idCache) {
            const user = yield crud.read(idCache);
            name.value = user.name;
            email.value = user.email;
            avatar.value = user.avatar;
        }
    }
    //Eliminar un usuario
    else if (e.target instanceof HTMLButtonElement && e.target.classList.contains('btn-remove')) {
        const userId = e.target.dataset.id;
        const crud = new Crud(url_base);
        if (userId) {
            confirm('¿Estás seguro de eliminar el usuario?');
            yield crud.delete(userId);
            idCache = undefined;
            getUser();
        }
    }
}));
//Método que se encarga de obtener los usuarios
export function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            card.innerHTML = ''; //Limpiar la lista de usuarios
            const res = yield fetch(url_base);
            const users = yield res.json();
            for (const user of users) { //Recorrer los usuarios y pintarlos en la pantalla
                list.render(user.id, user.name, user.email, user.avatar);
            }
        }
        catch (error) {
            console.log('error', error);
        }
    });
}
getUser(); //Obtener los usuarios al cargar la página
