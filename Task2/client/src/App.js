import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Profiles from './components/Profiles/Profiles';
import store from './store';
import { getUsers } from './actions/users';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);
  return (
    <Provider store={store}>
      <Profiles />
    </Provider>
  );
}

export default App;
