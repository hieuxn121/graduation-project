import React from 'react'
import Router from './components/Router'
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <div style = {{backgroundColor:'white', height:"100vh"}}>
      <Header/>
      <Router/>
      <Footer/>
    </div>
  )
}

export default App;
