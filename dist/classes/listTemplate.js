//Clase que se encarga de renderizar los elementos de la lista de usuarios
export class listTemplate {
    constructor(Container) {
        this.container = Container;
    }
    //Método que se encarga de renderizar los elementos de la lista de usuarios
    render(userId, userName, userEmail, userAvatar) {
        //Crear elementos de la lista
        const card = document.createElement('figure');
        const div = document.createElement('div');
        const avatar = document.createElement('img');
        const name = document.createElement('h5');
        const email = document.createElement('p');
        const btnremove = document.createElement('button');
        const btnupdate = document.createElement('button');
        let idCache; //Variable que almacena el id del usuario
        //Asignar valores a los elementos
        avatar.src = userAvatar;
        name.textContent = userName;
        email.textContent = userEmail;
        btnremove.textContent = "Eliminar";
        btnremove.dataset.id = userId;
        btnupdate.textContent = "Actualizar";
        btnupdate.dataset.id = userId;
        //Agregar clases al output
        card.classList.add("border", "border-light", "rounded", "text-center", "item");
        avatar.classList.add("img-fluid", "w-100", "pb-3", "rounded");
        div.classList.add("pb-4");
        btnremove.classList.add("btn", "btn-outline-light", "btn-delete", "mx-2", 'btn-remove');
        btnupdate.classList.add('btn-update', "btn", "btn-outline-light", "mx-2");
        //Agregar elementos al div
        div.appendChild(name);
        div.appendChild(email);
        div.appendChild(btnremove);
        div.appendChild(btnupdate);
        //Agregar elementos al contenedor
        card.appendChild(avatar);
        card.appendChild(div);
        //Agregar contenedor al documento
        this.container.appendChild(card);
        console.log('Rendering user:', userId, userName, userEmail, userAvatar);
        console.log('Element:', card);
    }
}
