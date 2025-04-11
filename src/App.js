import { useState } from 'react'

import './App.css';
import { PriceContext } from './context/PriceContext'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'
import MainContainer from './components/common/MainContrainer/MainContainer'
import Price from './components/Price/Price';

function App() {
  const [ price, setPrice ] = useState({})

  return (
    <PriceContext.Provider value={price}>
      <header>
        <NavBar />
        <MainContainer>
          <Form setPrice={setPrice} />
          {price.total && (
            <Price />
          )}
        </MainContainer>
      </header>
    </PriceContext.Provider>
  );
}

export default App;
