import React, { Component } from 'react'
import { Spin, Rate, Button, message } from 'antd'
import Auth from '../../services/Auth'
import { API_URL } from '../../services/Api'

import './style.scss'
import Api from '../../services/Api'

import socketIOClient from "socket.io-client"

const socket = socketIOClient(API_URL)

export default class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            team: '',
            rate: 0,
            feedback: '',
            loading: false,
            team_id: '',
            project_id: '',
            project: [],
            voted: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        socket.emit('enteredPresentation', Auth.userData._id)
        socket.on('runingPresentation', async (team_id, users) => {
            const currentUser = users.filter(user => user.user_id === Auth.userData._id)
            const votedTeams = currentUser[0].teams.map(team => team.voted && team.team_id)

            if (!currentUser[0].voted && !votedTeams.includes(team_id)){
                this.setState({ team_id, ready: true})
                await this.getData()
            }
        })
    }

    async getData(){
        const { data: teams } = await Api.get('/team?_id=' + this.state.team_id)
        this.setState({ project_id: teams[0].projects.length && teams[0].projects[0]._id, team: teams[0].name })
    }

    handleRate = rate => this.setState({ rate })

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(){
        //socket.emit('leavedPresentation')

        this.state.project.push({
            score: this.state.rate, 
            notes: this.state.feedback
        })

        this.setState({
            ready: false,
            rate: 0,
            feedback: ''
        })

        socket.emit('voted', Auth.userData._id, this.state.team_id)
        this.postData()
        message.success("Votação realizada com sucesso")
    }

    async postData() {
        await Api.post(`/projects/${this.state.project_id}`, {feedback: this.state.project[0]})
        await Api.put(`/teams/${this.state.team_id}/project/${this.state.project_id}`)
    }

    render(){
        return(
            <div className="feedback-container">
                {
                    this.state.ready
                    ?   <>
                            <h1 className="presentation-name">A equipe <strong>{this.state.team}</strong> está apresentando!</h1>
                            <h1 className="presentation-opnion">Dê sua opinião!</h1>
                            <Rate 
                                value={this.state.rate} 
                                onChange={rate => this.handleRate(rate)}
                                style={{margin: "0 auto"}}
                            />
                            <textarea 
                                placeholder="Deseja dizer algo para a equipe?"
                                onChange={event => this.handleChange(event)}
                                value={this.state.feedback}
                                name="feedback"
                                type="text"
                            />
                            <Button 
                                htmlType="submit" 
                                loading={this.state.loading}
                                onClick={this.handleSubmit}
                            >
                                Votar
                            </Button>
                        </>
                    :   <div className="feedback-loading">
                            <h1>Aguardando alguma sala ser aberta...</h1>
                            <Spin 
                                size="large" 
                            />
                        </div>
                }
            </div>
        )
    }
}