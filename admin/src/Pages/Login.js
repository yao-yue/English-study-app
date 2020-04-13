import React, { useState,useEffect } from 'react';
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import { Card, Input, Button, Spin ,message } from 'antd';
import {
    UserOutlined,LockOutlined
} from '@ant-design/icons';
import {  Redirect} from 'react-router-dom'
// import {reqLogin} from '../api'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //isLoading用户控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{

    },[])

    const checkLogin = async () => {
        // setIsLoading(true)

        // if (!username) {
        //     message.error('用户名不能为空')
        //     return false
        // } else if (!password) {
        //     message.error('密码不能为空')
        //     return false
        // }
        // const res = await reqLogin(username, password)
        // if(res.status === '1') {
        //     setIsLoading(false)
        //     localStorage.setItem('openId', res.openId)
        //     props.history.push('/index')
        // } else {
        //     message.error('用户名或密码错误')
        // }

        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1000)
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log('hello')
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        props.history.push('/index')
    }



    // 如果用户已经登陆, 自动跳转到管理界面
    const openId = localStorage.getItem('openId')
    if(openId) {
      return <Redirect to='/index'/>
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="雅思学习小程序管理后台" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your username"
                        prefix={<UserOutlined/>}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<LockOutlined />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )

}
export default Login