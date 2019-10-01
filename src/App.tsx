import React from 'react';
import './App.scss';
import { Text, Stack, StackItem, FontSizes, DefaultPalette } from 'office-ui-fabric-react';

import Todo from './todo/todo.component';

const App: React.FC = () => {
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
        <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLight } }} grow={1} >
          <Todo></Todo>
        </StackItem>
        <StackItem styles={{ root: { backgroundColor: DefaultPalette.neutralLight } }} grow={1} >
          <Todo></Todo>
        </StackItem>
      </Stack>
    </div>
  );
}

export default App;
