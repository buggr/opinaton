import React, { Component } from "react"
import { Layout, Menu, Icon, Avatar } from "antd"
import { Link } from "react-router-dom"

import Auth from "../services/Auth"

import { DashboardRoutes } from "../routes"

import "./Dashboard.scss"

const { Header, Content, Sider } = Layout

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      page: ['hackatons'],
      ready: false,
      userData: {},
    }

    this.getCurrentPage = this.getCurrentPage.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  getCurrentPage(){
    const pagesList = ['hackatons', 'feedback', 'presentation']
    const pageName = pagesList.filter(page => this.props.history.location.pathname.includes(page))
    if (pageName.length) this.setState({ page: pageName })
  }

  handleLogout(){
    Auth.logout()
  }

  componentDidMount(){
    if (!Auth.userData) this.props.history.push('/login')
    this.getCurrentPage()
    this.setState({ ready: true, userData: Auth.userData })
  }

  render() {
    return (
      this.state.ready && (
        <Layout className="dashboard-container">
          <Sider
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {

            }}
            onCollapse={(collapsed, type) => {
              this.setState({ collapsed })
            }}
            collapsed={this.state.collapsed}
          >
            <div className="user-container">
              <Avatar className="user-avatar" icon="user" size={40} src={this.state.userData.avatar_url} />
              <span className="user-name">{this.state.userData.nickname}</span>
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={this.state.page}
            >
              <Menu.Item key="hackatons">
                <Link
                  to="/dashboard/hackatons"
                  onClick={() => this.setState({ page: ['hackatons'], collapsed: true })}
                >
                  <Icon type="home" />
                  <span className="nav-text">Hackatons</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="feedback">
                <Link
                  to="/dashboard/feedback"
                  onClick={() => this.setState({ page: ['feedback'], collapsed: true })}
                >
                  <Icon type="user" />
                  <span className="nav-text">Feedback</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="presentation">
                <Link
                  to="/dashboard/presentation"
                  onClick={() => this.setState({ page: ['presentation'], collapsed: true })}
                >
                  <Icon type="tool" />
                  <span className="nav-text">Apresentação</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, display: "flex" }}>
              <Menu
                theme="white"
                mode="horizontal"
                style={{ lineHeight: "64px", margin: "auto 0 auto auto" }}
              >
                <Menu.Item key="1" onClick={this.handleLogout}>
                  Logout
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <DashboardRoutes />
            </Content>
          </Layout>
        </Layout>
      )
    )
  }
}
