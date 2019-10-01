import React, { useState, useEffect } from 'react';
import './App.scss';
import { Separator, Text, Stack, StackItem, FontSizes, DefaultPalette } from 'office-ui-fabric-react';

import Todo from './todo/todo.component';
import ITodoItem from './models/ITodoItem.model';

import TodoService from './services/todo.service';
import ITodoService from './services/todo-service.interface';
import TodoMockService from './services/todo-mock.service';
import TodoForm from './todo-form/todo-form.component';

const App: React.FC = () => {

  const [todoItems, setTodoItems] = useState(new Array<ITodoItem>());
  const todoService: ITodoService = new TodoService();

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

  //component did mount
  useEffect(() => {
    todoService.getAll()

      .then((todos: ITodoItem[]) => setTodoItems(todos))

      .catch(error => console.error(error));
  }, []);


  return (
    <div className="App">
      <Text styles={{ root: { fontSize: FontSizes.large } }}>My todo app in react</Text>
      <br />
      {
        todoItems &&
        <Text styles={{ root: { fontSize: FontSizes.small } }}>I found {todoItems.length} todos for you.</Text>
      }
      <Stack styles={{
        root: {
          // backgroundColor: DefaultPalette.neutralLighter,
          margin: 'auto',
          maxWidth: '60%'
        }
      }} tokens={{ childrenGap: 12, padding: 8 }}>
        <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLighterAlt } }} grow={1} >
          <TodoForm onCreate={(todoItem: ITodoItem) => addItem(todoItem)}></TodoForm>
        </StackItem>
        <Separator></Separator>
        {todoItems.map((todo) => {
          return (
            <StackItem key={todo.id} styles={{ root: { backgroundColor: DefaultPalette.neutralLighterAlt } }} grow={1} >
              <Todo item={todo} onUpdate={(id: number) => reloadSingleItem(id)} onDelete={(id: number) => removeItem(id)}></Todo>
            </StackItem>
          );
        })}
      </Stack>
    </div >
  );
}

export default App;
