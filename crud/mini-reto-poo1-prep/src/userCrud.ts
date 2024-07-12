// importar las interfaces y clases
import { Users } from './interfaces/interface.js';
import { listTemplate } from './classes/listTemplate.js';
import { Crud } from './classes/crud.js';

//Definir las constantes y variables
const url_base = 'http://localhost:3000/users'; //URL de la API

//elementos del DOM
const ul = document.querySelector('.users-list') as HTMLUListElement;
const form = document.querySelector('.form') as HTMLFormElement;
const name =document.querySelector('#name') as HTMLInputElement;
const email = document.querySelector('#email') as HTMLInputElement;
const avatar = document.querySelector('#avatar') as HTMLInputElement;

//Variable que almacena el id del usuario
let idCache: undefined | string; 
//Instanciar la clase listTemplate
const list = new listTemplate(ul);

//Agregar eventos al formulario 
form.addEventListener('submit', async (e:Event)=>{
    e.preventDefault();

    //Crear un nuevo usuario si idCache es undefined
    if(idCache === undefined){ 
        const crud = new Crud(url_base);
        await crud.create(name,avatar,email);
        confirm(`Se ha agregado el usuario ${name.value}`)
    } 
    //Actualizar un usuario si idCache no es undefined, es decir, si se ha seleccionado un usuario
    else {
        const crud = new Crud(`${url_base}/${idCache}`);
        await crud.update(idCache,name,avatar,email);
        idCache = undefined
    }

    form.reset(); //Limpiar el formulario
    getUser(); //Obtener los usuarios
})

//Agregar eventos a la lista de usuarios, para actualizar o eliminar un usuario usando los botones
ul.addEventListener('click', async (e:Event)=>{
    //Actualizar un usuario
    if (e.target instanceof HTMLButtonElement && e.target.classList.contains('btn-update')){
        idCache = e.target.dataset.id;
        const crud = new Crud(url_base);
        if(idCache){
            const user = await crud.read(idCache);
            name.value = user.name;
            email.value = user.email;
            avatar.value = user.avatar;
        }
    } 
    //Eliminar un usuario
    else if (e.target instanceof HTMLButtonElement && e.target.classList.contains('btn-remove')){
        const userId = e.target.dataset.id;
        const crud = new Crud(url_base);
        if (userId){
            confirm('¿Estás seguro de eliminar el usuario?');
            await crud.delete(userId);
            idCache = undefined;
            getUser();
        }
    }
})

//Método que se encarga de obtener los usuarios
export async function getUser(){
    try {
        ul.innerHTML = ''; //Limpiar la lista de usuarios
        const res = await fetch(url_base); 
        const users: Users[] = await res.json(); 
        for (const user of users){ //Recorrer los usuarios y pintarlos en la pantalla
            list.render(user.id,user.name,user.email,user.avatar);
        }
    } catch (error) {
        console.log('error',error);
    }
}

getUser(); //Obtener los usuarios al cargar la página