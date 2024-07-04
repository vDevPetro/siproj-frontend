import {Routes, Route} from 'react-router-dom'
import Home from './view/pages/home'
import Users from './view/pages/admin/users'
import InserirAs from './view/pages/ascadastrar'
import ConsultarAs from './view/pages/asconsultar'
import AtualizarAS from './view/pages/asatualizadados'
import InserirEmissao from './view/pages/emissoes'
import ContainerAS from './view/template/containerAS'

export default function mainRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/inserirautorizacao' element={<InserirAs/>}/>
            <Route path='/as' element={<ConsultarAs/>}/>
            <Route path='/as/:id/*' element={<ContainerAS/>}/>
        </Routes>
    )
}