import React from 'react';
import AppNavigator from './src/AppNavigator';
import {AuthProvider} from './src/contexts/AuthContext';
import {ClassroomProvider} from './src/contexts/ClassroomContext';
import {MsgProvider} from './src/contexts/MsgContext';

const App = () => {
  return (
    <MsgProvider>
      <AuthProvider>
        <ClassroomProvider>
          <AppNavigator />
        </ClassroomProvider>
      </AuthProvider>
    </MsgProvider>
  );
};

export default App;
