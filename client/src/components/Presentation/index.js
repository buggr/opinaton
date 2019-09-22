import React, { Component } from 'react'
import { Icon } from 'antd'

import './style.scss'
import Api, { API_URL } from '../../services/Api'
import socketIOClient from "socket.io-client"

const socket = socketIOClient(API_URL)

let teams = []
let t

for(let i=0; i<10; i++){
    teams.push({name: 'buggr' + i, id: i})
}

export default class Presentation extends Component {
    constructor(props){
        super(props)
        this.state = {
            current_team: 1,
            presentation: false,
            teams: []
        }
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        const { data: teams } = await Api.get('/teams')
        this.setState({ teams })
    }

    handlePresentation = (team_id) => {
        if(this.state.presentation && this.state.current_team === team_id){
            this.setState({
                presentation: false,
                current_team: team_id
            })

            stop()
        }
        else if(!this.state.presentation){
            this.setState({
                presentation: true,
                current_team: team_id
            })

            t = setInterval(() => {
                socket.emit('presentation', this.state.current_team)
            }, 500)
        }

        function stop() {
            clearInterval(t)
        }
    }

    render(){
        return(
            <div className="presentation-container">
                {
                    this.state.teams.map(team => 
                        <div 
                            className="team-card" 
                            style={{
                                opacity: this.state.presentation && this.state.current_team !== team._id ? 0.5 : 1
                            }}
                            key={team._id}
                        >
                            <h1>{team.name}</h1>
                            <div 
                                className="status" 
                                style={{
                                    backgroundColor: this.state.presentation && this.state.current_team === team._id ? "#db2222" : "#199719"
                                }}
                            >
                                <Icon 
                                    type={this.state.presentation && this.state.current_team === team._id ? "close" : "check"} 
                                    onClick={() => this.handlePresentation(team._id)}
                                    style={{ 
                                        fontSize: 20, 
                                        margin: "auto", 
                                        color: "#FFF",
                                    }} 
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}