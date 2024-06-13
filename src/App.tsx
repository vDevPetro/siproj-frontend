import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rotas from './Router';
import { auth } from './controller/ConnectionFactory';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import Login from './view/pages/login';
import Sidenav from './view/template/sidenav';
import Header from './view/template/header';
import { Usuario } from './model/Usuario';
import { getUser } from './controller/Users';

const AppContainer = styled.div`
`;

function App() {
  const [user, setUser] = useState<User>();
  const [userDoc, setUserDoc] = useState<Usuario>();

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
        <Router>
          <Header/>
          <Sidenav/>
          <Rotas/>
        </Router>
      </AppContainer>
    );
  }
}

export default App;
