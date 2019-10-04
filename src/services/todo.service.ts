import Axios, { AxiosResponse, AxiosError } from 'axios';
import ITodoItem from '../models/ITodoItem.model';
import ITodoService from './todo-service.interface';

const BASE_URL: string = 'https://localhost:5001/';

export default class TodoService implements ITodoService {

    public getAll(showCompleted:boolean): Promise<ITodoItem[]> {
        return new Promise<ITodoItem[]>((resolve, reject) => {
            Axios.get(`/api/todoitems`, { baseURL: BASE_URL, })

                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        console.error(`Status does not indicate success! -> ${response.status}`);
                        reject(response);
                    }
                })

                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public getById(id: number): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve, reject) => {
            Axios.get(`/api/todoitems/${id}`, { baseURL: BASE_URL, })

                .then((response: AxiosResponse) => {
                    if ((response.status % 200) < 100) {
                        resolve(response.data);
                    } else {
                        console.error(`Status does not indicate success! -> ${response.status}`);
                        reject(response);
                    }
                })

                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public update(id: number, todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve, reject) => {
            Axios.put(`/api/todoItems/${id}`, todoItem, { baseURL: BASE_URL })

                .then((response: AxiosResponse) => {
                    if ((response.status % 200) < 100) {
                        resolve(response.data);
                    } else {
                        console.error(`Status does not indicate success! -> ${response.status}`);
                        reject(response);
                    }
                })

                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public create(todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve, reject) => {
            Axios.post(`/api/todoItems/`, todoItem, { baseURL: BASE_URL })

                .then((response: AxiosResponse) => {
                    if ((response.status % 200) < 100) {
                        resolve(response.data);
                    } else {
                        console.error(`Status does not indicate success! -> ${response.status}`);
                        reject(response);
                    }
                })

                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public deleteById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Axios.delete(`/api/todoitems/${id}`, { baseURL: BASE_URL, })

                .then((response: AxiosResponse) => {
                    if ((response.status % 200) < 100) {
                        resolve(response.data);
                    } else {
                        console.error(`Status does not indicate success! -> ${response.status}`);
                        reject(response);
                    }
                })

                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

}
