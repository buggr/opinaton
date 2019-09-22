import React, { Component } from 'react'
import { Spin } from 'antd'
import Fade from 'react-reveal/Fade'
import { withUserAgent } from 'react-useragent'
import Auth from '../services/Auth'

import ErrorMessage from '../components/ErrorMessage'

import './Main.scss'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: !this.props.ua.mobile,
        }
    }

    componentDidMount(){
        setTimeout(() => {
            if (Auth.userData) this.props.history.push('/dashboard/hackatons')
            else if (!this.state.error) this.props.history.push('/login')
        }, 1000)
    }

    render(){
        return (
            <Fade>
                <div className="main-container">
                    {
                        !this.state.error 
                        ?   <Spin 
                                style={{margin: "auto"}} 
                                size="large" 
                            />
                        :   <ErrorMessage 
                                style={{margin: "auto"}} 
                                color={"#FFF"}
                                content={"This app is only supposed to work on mobile devices"} 
                            />
                    }
                </div>
            </Fade>
        )
    }
}

export default withUserAgent(Main)