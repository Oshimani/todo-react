import Axios, { AxiosResponse, AxiosError } from 'axios';
import ITodoItem from '../models/ITodoItem.model';
import ITodoService from './todo-service.interface';

const DB_NAME: string = 'todo-Database';

export default class TodoLocalStorateService implements ITodoService {

    constructor() {
        // init local storage db
        if (!localStorage.getItem(DB_NAME)) {
            localStorage.setItem(DB_NAME, JSON.stringify(new Array<ITodoItem>()));
        }
    }

    // pretend to be remote data
    private _getDelay(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private _getItems(): ITodoItem[] {
        return JSON.parse(String(localStorage.getItem(DB_NAME)));
    }

    private _setItems(items: ITodoItem[]): void {
        localStorage.setItem(DB_NAME, JSON.stringify(items));
    }

    public getAll() {
        return new Promise<ITodoItem[]>((resolve) => {
            setTimeout(() => {
                resolve(
                    this._getItems()
                );
            }, this._getDelay(100, 1000));
        });
    }

    public getById(id: number): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve, reject) => {
            setTimeout(() => {
                const items: ITodoItem[] = this._getItems();

                const item = items.find(todo => todo.id === id);
                if (item) resolve(item);

                reject(new Error('Item does not exist!'));
            }, this._getDelay(100, 1000));
        });
    }

    public update(id: number, todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve, reject) => {
            const items: ITodoItem[] = this._getItems();

            let item = items.find(todo => todo.id === id);
            if (item) {
                item = todoItem;
                this._setItems(items);
                resolve(item);
            }

            reject(new Error('Item does not exist!'));
        });
    }

    public create(todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve) => {
            const items: ITodoItem[] = this._getItems();
            items.push({ ...todoItem, id: items.length });
            this._setItems(items);

            resolve(todoItem);
        });
    }

    public deleteById(id: number): Promise<void> {
        return new Promise<void>((resolve) => {
            const items: ITodoItem[] = this._getItems();
            const index = items.findIndex(item => item.id === id);
            if (index) items.splice(index, 1);
            this._setItems(items);
            resolve();
        });
    }
}
