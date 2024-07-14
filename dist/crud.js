"use strict";
/* import { Users } from './interfaces/interface';
import { listTemplate } from './classes/listTemplate.js';


export const url_base = 'http://localhost:3000/users';

const ul = document.querySelector('.users-list') as HTMLUListElement;
const list = new listTemplate(ul);

export const getUsers = async (): Promise<Users[]> => {
    try {
        const res = await fetch(url_base);
        if (!res.ok) throw new Error('Error al obtener los datos');
        const data: Users[] = await res.json();
        console.log(data);
        return data;
        
    } catch (error) {
        console.log('error al obtener datos', error);
        return [];
    }
};

getUsers().then((users)=>{
    users.forEach(user =>{
        list.render(user.id,user.name,user.email,user.avatar)
    })
}) */
