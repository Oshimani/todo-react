import ITodoItem from "../models/ITodoItem.model";

export default interface ITodoService {
    getAll(showCompleted:boolean): Promise<ITodoItem[]>;
    getById(id: number): Promise<ITodoItem>;
    update(id: number, todoItem: ITodoItem): Promise<ITodoItem>;
    create(todoItem: ITodoItem): Promise<ITodoItem>;
    deleteById(id: number): Promise<void>;
}
