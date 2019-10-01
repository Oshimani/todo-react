import React, { useState, useEffect } from 'react';
import './App.scss';
import { Text, Stack, StackItem, FontSizes, DefaultPalette } from 'office-ui-fabric-react';

import Todo from './todo/todo.component';
import ITodoItem from './models/ITodoItem.model';
import TodoService from './services/todo.service';

const App: React.FC = () => {

  const [todoItems, setTodoItems] = useState(new Array<ITodoItem>());
  const todoService: TodoService = new TodoService();

  //component did mount
  useEffect(() => {
    todoService.getAll()

      .then((todos: ITodoItem[]) => setTodoItems(todos))

      .catch(error => console.error(error));
  }, []);


  return (
    <div className="App">
      <Text styles={{ root: { fontSize: FontSizes.large } }}>My todo app in react</Text>
      <Stack styles={{
        root: {
          // backgroundColor: DefaultPalette.neutralLighter,
          margin: 'auto',
          maxWidth: '60%'
        }
      }} tokens={{ childrenGap: 12, padding: 8 }}>
        {todoItems.map(todo => {
          return (
            <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLight } }} grow={1} >
              <Todo item={todo}></Todo>
            </StackItem>
          );
        })}
        {/* <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLight } }} grow={1} >
          <Todo></Todo>
        </StackItem>
        <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLight } }} grow={1} >
          <Todo></Todo>
        </StackItem> */}
      </Stack>
    </div>
  );
}

export default App;
