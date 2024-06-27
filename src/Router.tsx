import {Routes, Route} from 'react-router-dom'
import Home from './view/pages/home'
import Users from './view/pages/admin/users'
import InserirAs from './view/pages/ascadastrar'
import ConsultarAs from './view/pages/asconsultar'

export default function mainRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/inserirautorizacao' element={<InserirAs/>}/>
            <Route path='/consultarautorizacao' element={<ConsultarAs/>}/>
        </Routes>
    )
}