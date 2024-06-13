import {Routes, Route} from 'react-router-dom'
import Home from './view/pages/home'
import Users from './view/pages/admin/users'
import CadastrarEmpresa from './view/pages/admin/cadastrarEmpresa'
import BuscarEmpresa from './view/pages/admin/buscarEmpresa'
import CadastrarContrato from './view/pages/admin/cadastrarContrato'

export default function mainRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/contrato/cadastrarempresa' element={<CadastrarEmpresa/>}/>
            <Route path='/contrato/buscarempresa' element={<BuscarEmpresa/>}/>
            <Route path='/contrato/cadastrarcontrato' element={<CadastrarContrato/>}/>
        </Routes>
    )
}