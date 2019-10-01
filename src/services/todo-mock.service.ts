import ITodoItem from "../models/ITodoItem.model";

export default class TodoMockService {
    public getAll() {
        return new Promise<ITodoItem[]>((resolve) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            id: 1,
                            name: "Walk dog",
                            description: "Get the dog, the leash and walk out of the house. Don't forget to attach the leash to the dog!",
                            isImportant: true,
                            isComplete: true
                        },
                        {
                            id: 2,
                            name: "Feed dog",
                            description: "Put dog food into the dog's thing... you know, his bowl which he eats from.",
                            isImportant: true,
                            isComplete: false
                        },
                        {
                            id: 1,
                            name: "Pet dog",
                            description: "PET THE DOG!",
                            isImportant: false,
                            isComplete: false
                        },
                    ]);
            }, 300);
        });
    }

    public getById(id: number): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve) => { });
    }

    public update(id: number, todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve) => { });
    }

    public create(todoItem: ITodoItem): Promise<ITodoItem> {
        return new Promise<ITodoItem>((resolve) => { });
    }

    public deleteById(id: number): Promise<void> {
        return new Promise<void>((resolve) => { });
    }
}