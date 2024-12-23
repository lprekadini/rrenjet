import React  from 'react';
import './App.css';
import EventsList from './Components/EventsList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Event Management
      </header>

      <EventsList />

    </div>
  );
}

export default App;
