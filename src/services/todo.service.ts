import Axios, { AxiosResponse, AxiosError } from 'axios';
import ITodoItem from '../models/ITodoItem.model';

const BASE_URL: string = 'https://localhost:5001/';

export default class TodoService {
    /**
     *
     */
    constructor() {

    }

    public getAll(): Promise<ITodoItem[]> {
        return new Promise<ITodoItem[]>((resolve, reject) => {
            Axios.get(`/api/todoitems`, { baseURL: BASE_URL, })

                .then((response: AxiosResponse) => {
                    if (response.status == 200) {
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