import {Routes, Route} from 'react-router-dom'
import Home from './view/pages/home'
import Users from './view/pages/admin/users'
import InserirAs from './view/pages/ascadastrar'
import ConsultarAs from './view/pages/asconsultar'
import ContainerAS from './view/template/containerAS'
import Perfil from './view/pages/perfil'

export default function mainRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/inserirautorizacao' element={<InserirAs/>}/>
            <Route path='/as' element={<ConsultarAs/>}/>
            <Route path='/as/:id/*' element={<ContainerAS/>}/>
            <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
    )
}