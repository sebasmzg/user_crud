//Clase que se encarga de renderizar los elementos de la lista de usuarios

export class listTemplate {
    private container: HTMLUListElement;
    constructor(Container: HTMLUListElement){
        this.container = Container;
    }

    //Método que se encarga de renderizar los elementos de la lista de usuarios

    render(userId: string,userName: string,userEmail:string, userAvatar:string): void {
        //Crear elementos de la lista
        const li = document.createElement('li');
        const avatar = document.createElement('img');
        const name = document.createElement('h4');
        const id = document.createElement('p');
        const email = document.createElement('p');
        const btnremove = document.createElement('button');
        const btnupdate = document.createElement('button');
        let idCache: undefined | string; //Variable que almacena el id del usuario

        //Agregar clases y contenido a los elementos

        id.textContent = userId;
        id.classList.add('id');
        avatar.src = userAvatar;
        name.textContent = userName;
        email.textContent = userEmail;

        btnremove.textContent = "Eliminar";
        btnremove.dataset.id = userId;
        btnremove.classList.add('btn-remove');

        btnupdate.textContent = "Actualizar";
        btnupdate.dataset.id = userId;
        btnupdate.classList.add('btn-update');

        //Agregar elementos a la lista
        li.append(id, name, email,avatar);
        li.append(btnupdate);
        li.append(btnremove);

        //Agregar la lista al contenedor
        this.container.append(li);
    }
}


