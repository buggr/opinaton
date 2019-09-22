import React, { Component } from 'react'
import { Spin, Avatar, Modal, Button, Icon, Rate } from 'antd'

import Api from '../../services/Api'

import './style.scss'

export default class HackatonInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            hackaton_id: this.props.match.params.hackaton_id,
            hackaton: {},
            ready: false,
            modal: false,
            teams: [],
            project: {}
        }

        this.handleFeedbacks = this.handleFeedbacks.bind(this)
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        const { data: teams } = await Api.get('/team?name=buggr')
        const { data: hackatons } = await Api.get('/hackathons')
        const [ hackaton ] = hackatons.filter(hackaton => hackaton._id === this.state.hackaton_id)
        const feedback = teams[0].projects[0].feedback.sort((a, b) => b.score - a.score)
        this.setState({ hackaton, team: teams[0], project: teams[0].projects[0], feedback, ready: true })
    }

    handleFeedbacks(){
        if (!this.state.feedback.length) return

        this.setState({ modal: true })
    }

    render(){
        return(
            <div className="hackaton-info-container">
                {
                    this.state.ready
                    ?   (<>
                            <button
                                onClick={this.handleFeedbacks}
                                style={{
                                    backgroundColor: this.state.feedback.length ? "#ff1060" : "#666"
                                }}
                            >
                                {this.state.feedback.length ? "VER FEEDBACK" : "FEEDBACK INDISPONÍVEL"}
                            </button>
                            <HackatonAboutCard hackaton={this.state.hackaton} />
                            <TeamAboutCard team={this.state.team} />
                            <ProjectAboutCard project={this.state.project} />
                            <Modal
                                title="Feedbacks"
                                onCancel={() => this.setState({ modal: false })}
                                onOk={() => this.setState({ modal: false })}
                                visible={this.state.modal}
                                footer={[
                                    <Button 
                                        key="submit" 
                                        type="primary" 
                                        onClick={() => this.setState({ modal: false })}
                                    >
                                        Fechar
                                    </Button>
                                ]}
                            >
                                <FeedbackList feedback={this.state.feedback} />
                            </Modal>
                        </>)
                    :   <Spin 
                            style={{ margin: "auto" }} 
                            size="large" 
                        />
                }
            </div>
        )
    }
}

function HackatonAboutCard({ hackaton }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="info-circle" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Hackaton</h1>
            </div>
            <p>
                <strong>Name: </strong>{hackaton.name}
                <br></br>
                <strong>Status: </strong>{hackaton.ended ? 'Finalizado' : 'Em Andamento'}
            </p>
        </div>
    )
}

function TeamAboutCard({ team }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="team" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Team</h1>
            </div>
            <p style={{marginBottom: 10}}><strong>Name: </strong>{team.name}</p>
            {
                team.participants.map(participant => 
                    <Avatar 
                        key={participant._id} 
                        style={{ marginRight: 5 }} 
                        src={participant.avatar_url} 
                        icon="user" 
                        size={40} 
                    />
                )
            }
        </div>
    )
}

function ProjectAboutCard({ project }){
    return(
        <div className="about-card-container">
            <div className="card-header">
                <Icon type="project" size={26} style={{ marginRight: 10 }} />
                <h1 className="header-title">Project</h1>
            </div>
            <p>
                <strong>Name: </strong>{project.name}
                <br></br>
                <strong>Description: </strong>{project.description}
            </p>
        </div>
    )
}

function FeedbackList({ feedback }){
    return(<>
        {
            feedback.map((feedback, index) => 
                <div 
                    className="feedback-card-container"
                    key={'feedback' + index}
                >
                    <div className="feedback-side">
                        <Rate value={feedback.score} />
                    </div>
                    <p>{feedback.notes}</p>
                </div>    
            )
        }
    </>)
}