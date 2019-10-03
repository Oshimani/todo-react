import DataSourceType from '../models/data-source-type.model'
import TodoService from './todo.service';
import TodoLocalStorateService from './todo-local-storage.service';

export const initializeTodoService = (dataSourceType: string) => {
    switch (dataSourceType) {
        case DataSourceType.localAPI:
            return new TodoService();

        default:
            return new TodoLocalStorateService();
    }
};
