import React, { Component } from "react"
import { Link } from 'react-router-dom'
import moment from 'moment'

import ErrorMessage from "../ErrorMessage"

import Api from "../../services/Api"

import "./style.scss"

export default class HackatonList extends Component {
  constructor(props){
    super(props)
    this.state = {
      hackatons: []
    }
  }

  componentDidMount(){
    this.getData()
  }

  async getData(){
    let hackatons = []

    const { data: teams } = await Api.get('/team?name=buggr')

    teams.map(async team => {
      const { data: hackathon } = await Api.get('/hackathon?name=' + team.name)
      hackathon.map(hackathon => hackatons.push(hackathon))
      this.setState({ hackatons })
    })
  }

  render(){
    return (
      <div className="hackatons-container">
        {this.state.hackatons.length ? (
          this.state.hackatons.map((hackaton, index) => (
            <Link 
              to={`/dashboard/hackatons/${hackaton._id}`}
              key={hackaton.name.toLowerCase() + "-" + index}
              state={hackaton}
            >
              <HackatonCard
                hackaton={hackaton}
              />
            </Link>
          ))
        ) : (
          <ErrorMessage
            content={"Você ainda não participou de nenhum hackaton :("}
          />
        )}
      </div>
    )
  }
}

function HackatonCard({ hackaton }) {
  return (
    <div
      className="card-container"
      style={{
        backgroundImage: hackaton.ended
          ? "linear-gradient(to right, #666, #555)"
          : "linear-gradient(to right, #fa256c, #bd0140)"
      }}
    >
      <h1 className="card-title">{hackaton.name}</h1>
      <div className="card-bottom-container">
        <span className="card-bottom-date">{moment(hackaton.createdAt).format('L')}</span>
        <span className="card-bottom-ended">
          {hackaton.ended ? "Finalizado" : "Em Andamento"}
        </span>
      </div>
    </div>
  )
}
