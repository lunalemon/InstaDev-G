import React from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Landing />
     <Footer />
      </div>
  );
}

export default App;
