import {Routes, Route} from 'react-router-dom'
import Home from './view/pages/home'
import Users from './view/pages/admin/users'

export default function mainRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
        </Routes>
    )
}