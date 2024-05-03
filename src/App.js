import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import JobsList from './components/JobsList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <JobsList />
    </Provider>
  );
}

export default App;