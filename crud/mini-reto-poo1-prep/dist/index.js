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
export const url_base = 'http://localhost:3000/users';
const ul = document.querySelector('.users-list');
const list = new listTemplate(ul);
export const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(url_base);
        if (!res.ok)
            throw new Error('Error al obtener los datos');
        const data = yield res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error al obtener datos', error);
        return [];
    }
});
getUsers().then((users) => {
    users.forEach(user => {
        list.render(user.id, user.name, user.email, user.avatar);
    });
});
document.addEventListener('DOMContentLoaded', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const btnremove = document.querySelectorAll('.users-list button');
    btnremove.forEach((btn) => {
        btn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const id = (_b = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.id')) === null || _b === void 0 ? void 0 : _b.textContent;
            console.log(id);
        }));
    });
}));
