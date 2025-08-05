import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Home from './components/Home'

function App() {
  const myData =   {
    user: "Robyn",
    store: [
      { item: "XSPS Pro Player", price: 800, discount: 0.2, hottest: false },
      { item: "Gizem Backwatch", price: 230, discount: 0.6, hottest: false },
      { item: "Surround Sound Pelican", price: 3099, discount: 0.05, hottest: true }
    ],
    shouldDiscount: true,
    currentPage: "Landing"
  };
  let [store , updateStore] = useState(myData)

  const buttonClick = function(){
    let mode = store.currentPage;
    mode = mode === "Landing" ? "Home" : "Landing";
    updateStore({...store, currentPage: mode});
  }

  return (
    <div>
      {store.currentPage === "Landing" ? <Landing user={store.user} hottest = {store.store.find(e => e.hottest === true)}/> : <Home data={store.store} disMode={store.shouldDiscount}/>}
      <button onClick={buttonClick}>Change Mode</button>
    </div>
  )
}

export default App
