import React, { Component } from 'react'
import { Button, message } from 'antd'
import Api from '../services/Api'
import Auth from '../services/Auth'

import logo from '../assets/logo.png'

import './Login.scss'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: false,
        }
    }

    componentDidMount(){
        if (Auth.userData) this.props.history.push('/dashboard/hackatons')
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        setTimeout(() => {
            this.setState({ loading: false, error: true })
            if (this.state.error) message.error("Something went wrong!")
        }, 5000)

        event.preventDefault()
        this.setState({ loading: true, email: '', password: '' })

        const result = await Api.post('/users', {
            email: this.state.email,
            password: this.state.password,
        })
        
        if (result.data) {
            Auth.userData = result.data
            this.props.history.push('/dashboard/hackatons')
        }
    }

    render(){
        return (
            <div className="login-container">
                <img className="logo" src={logo} alt="" />
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Type your email" 
                        type="text" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input 
                        placeholder="Your password" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button 
                        htmlType="submit" 
                        loading={this.state.loading}
                    >
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}