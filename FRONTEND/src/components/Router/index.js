import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LoadableComponet from '../Loadable'
import Login from '../../scenes/Login'
import 'antd/dist/antd.css';

const Router = () => {
    const [token,setToken] = useState('');
    useEffect(() => {
        if(localStorage.getItem('token')){
            const newToken = localStorage.getItem('token')
            setToken(newToken)
        }
    },[])
    return (
        <Switch>
            <Route path = "/" exact component = {LoadableComponet(() => import('../../scenes/Home'))  }/>
            <Route path = "/courses" exact component = {LoadableComponet(() => import('../../scenes/Courses'))}/>
            <Route path = "/courses/:id" exact component = {LoadableComponet(() => import('../../scenes/Courses/components/CourseDetail'))}/>
            <Route path = "/teachers/:id" component = {LoadableComponet(() => import('../../scenes/TeacherDetail'))}/>
            <Route path = "/teachers" component = {LoadableComponet(() => import('../../scenes/Teacher'))}/>
            <Route path = "/profile" component = {LoadableComponet(() => import('../../scenes/Profile'))}/>
            <Route path = "/my-courses" component = {LoadableComponet(() => import('../../scenes/MyCourses'))}/>
            <Route path = "/about" component = {LoadableComponet(() => import('../../scenes/About'))}/>
            <Route path = "/login">
                {token && <Redirect to="/"/>}
                {!token && <Login/>}
            </Route>
            <Route  render = {() => LoadableComponet(() => import('../../scenes/NotFound'))}/>
        </Switch>
    )
}
export default Router