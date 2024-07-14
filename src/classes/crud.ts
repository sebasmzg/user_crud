// Definir la clase Crud que se encarga de realizar las operaciones CRUD en la aplicación.

export class Crud {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    //Método que se encarga de crear un nuevo usuario
    async create(name:HTMLInputElement, avatar:HTMLInputElement, email:HTMLInputElement):Promise<void>{
        const newUser = {
            name: name.value,
            avatar:avatar.value,
            email:email.value
        }
        await fetch(this.url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).catch (error => console.error('error',error));
    }

    //Método que se encarga de leer un usuario
    async read(id:string | undefined){
        const res = await fetch(`${this.url}/${id}`);
        return await res.json();
    }

    //Método que se encarga de actualizar un usuario
    async update(id:string | undefined, name:HTMLInputElement,avatar:HTMLInputElement,email:HTMLInputElement){
        const updatedUser = {
            name: name.value,
            avatar:avatar.value,
            email:email.value
        }
        await fetch(`${this.url}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }).catch (error => console.error('error',error));
    }
    
    //Método que se encarga de eliminar un usuario
    async delete(id:string | undefined){
        await fetch(`${this.url}/${id}`,{
            method: 'DELETE'
        }).catch (error => console.error('error',error));
    }
}