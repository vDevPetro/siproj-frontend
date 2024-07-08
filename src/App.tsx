import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rotas from './Router';
import { auth } from './controller/ConnectionFactory';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import Login from './view/pages/login';
import Header from './view/template/header';
import { FilterProvider } from './context/HomeFilter';

const AppContainer = styled.div`
`;

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
          setUser(user);
      }
      else{
        setUser(undefined);
      }
    })
  }, []);

  if(user === undefined){
    return (<Login/>);
  }
  else{
    return (
      <AppContainer> 
        <FilterProvider>
        <Router>
          <Header/>
          <Rotas/>
        </Router>
        </FilterProvider>
      </AppContainer>
    );
  }
}

export default App;
