import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rotas from './Router';
import { auth } from './controller/ConnectionFactory';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import Login from './view/pages/login';
import Header from './view/template/header';
import { FilterProvider } from './context/HomeFilter';
import { UserProvider } from './context/UserContext';

const AppContainer = styled.div`
`;

function App() {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
          setUser(user);
          setEmail(user.email);
      }
      else{
        setUser(undefined);
      }
    })
  }, []);

  if(!email || user === undefined){
    return (<Login/>);
  }
  else{
    return (
      <AppContainer> 
        <UserProvider email={email}>
        <FilterProvider>
        <Router>
          <Header/>
          <Rotas/>
        </Router>
        </FilterProvider>
        </UserProvider>
      </AppContainer>
    );
  }
}

export default App;
