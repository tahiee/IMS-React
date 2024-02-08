import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Admission from '../screens/Admission'
import ResponsiveAppBar from '../components/Navbar'
import AdminDash from '../screens/Admin-Dashboard/AdminDash'
import StudentDash from '../screens/Student-Dashboard/StudentDash'
import ProtectedRoutes from './ProtectedRoutes'

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/admin/*' element={<ProtectedRoutes component={<AdminDash />} />} />
                <Route path='/student' element={<ProtectedRoutes component={<StudentDash />} />} />
                <Route path='/admission' element={<ProtectedRoutes component={<Admission />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig