import React, { useState, useEffect, useContext } from 'react';
import {
  Separator,
  Text,
  Stack,
  StackItem,
  FontSizes,
  FontWeights,
  Toggle,
  ActionButton,
  getTheme
} from 'office-ui-fabric-react';

import Todo from './todo/todo.component';
import ITodoItem from './models/ITodoItem.model';

import ITodoService from './services/todo-service.interface';
import TodoForm from './todo-form/todo-form.component';
import DataSourceContext from './contexts/data-source.context';
import { initializeTodoService } from './services/todo-service-helper';

const App: React.FC = () => {

  const [todoItems, setTodoItems] = useState(new Array<ITodoItem>());
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const todoService: ITodoService =
    initializeTodoService(useContext(DataSourceContext));

  const reloadSingleItem = (id: number) => {
    console.log(`Reloading item: ${id}`);

    todoService.getById(id)

      .then(todoItem => {
        // replace updated item
        setTodoItems(todoItems.map(item => {
          if (item.id === todoItem.id) {
            return todoItem
          };
          return item;
        }));
      })
  };

  const removeItem = (id: number) => {
    console.log(`Removing item: ${id}`);

    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const addItem = (todoItem: ITodoItem) => {
    console.log(`Adding item: ${todoItem.id}`);

    // Array.prototyle.push return new length instead of new array -> I use concat
    setTodoItems(todoItems.concat(todoItem));
  }

  const loadItems = (show: boolean) => {
    return new Promise<any>((resolve, reject) => {
      todoService.getAll(show)

        .then((todos: ITodoItem[]) => { setTodoItems(todos); resolve() })

        .catch(error => { console.error(error); reject() });
    });
  };

  const toggleShowCompleted = (value: boolean) => {
    setShowCompleted(value);
    loadItems(value);
  };

  const clickedDeleteAllItems = () => {
    const promises = new Array<Promise<any>>();
    todoItems.forEach(item => {
      if (item.isComplete)
        promises.push(todoService.deleteById(item.id));
    });
    Promise.all(promises)

      .then(() => loadItems(showCompleted))

      .catch(error => console.error(error));
  }

  //component did mount
  useEffect(() => {
    loadItems(showCompleted);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
        <Text styles={{ root: { fontSize: FontSizes.large } }}>My todo app in react</Text>
        <br />
        {
          todoItems &&
          <Text styles={{
            root: {
              fontSize: FontSizes.medium,
              fontWeight: FontWeights.semilight,
              selectors: { 'span': { fontWeight: FontWeights.semibold } }
            }
          }}>I found <span>{todoItems.length}</span> todos for you.</Text>
        }
        <Stack styles={{
          root: {
            margin: 'auto',
            maxWidth: '60%',
            minWidth: 350
          }
        }} tokens={{ childrenGap: 12, padding: 8 }}>
          <StackItem styles={{ root: { backgroundColor: getTheme().palette.neutralLighterAlt } }} grow={1} >
            <TodoForm onCreate={(todoItem: ITodoItem) => addItem(todoItem)}></TodoForm>
          </StackItem>
          <Separator></Separator>

          <StackItem styles={{ root: { textAlign: 'initial' } }}>
            <Stack horizontal>
              <StackItem grow>
                <Toggle label="Show completed todos" defaultChecked onText="On" offText="Off"
                  onChange={(event, checked) => toggleShowCompleted(Boolean(checked))} />
              </StackItem>
              <StackItem align='end'>
                <ActionButton iconProps={{ iconName: 'RecycleBin' }}
                  text='Delete completed todos'
                  onClick={() => clickedDeleteAllItems()}></ActionButton>
              </StackItem>
            </Stack>
          </StackItem>
          {todoItems.map((todo) => {
            return (
              <StackItem key={todo.id} styles={{ root: { backgroundColor: getTheme().palette.neutralLighterAlt } }} grow={1} >
                <Todo item={todo} onUpdate={(id: number) => reloadSingleItem(id)} onDelete={(id: number) => removeItem(id)}></Todo>
              </StackItem>
            );
          })}
        </Stack>
    </div>
  );
}

export default App;
