import React from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { Layout } from 'antd'
import { Switch, Route, Router, useHistory } from 'react-router-dom'
import NavBar from './navBar'
import About from './about'
import Work from './work'
import Blog from './blog'
import Tutorial from './tutorial'
import Project from './project'
import Contact from './contact'
import Dashboard from './dashboard'
import CustomFooter from './customFooter'
import MainMenu from '../component/mainMenu'
import Home from './home'
import messages from '../translation/'

const { Header } = Layout

const App = () => {
    
    const history = useHistory()

    const lang = useSelector(state => state.locale.lang)

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <Layout
                style={{
                    minHeight: 0,
                    backgroundColor: 'transparent'
                }}
            >
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        minHeight: '100px',
                        padding: '18px 50px',
                        width: '100%',
                        background: 'none'
                    }}
                >
                    <NavBar />
                </Header>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/work">
                            <Work />
                        </Route>
                        <Route path="/blog">
                            <Blog />
                        </Route>
                        <Route path="/tutorial">
                            <Tutorial />
                        </Route>
                        <Route path="/project">
                            <Project />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Router>
                <MainMenu />
                <CustomFooter />
            </Layout>
        </IntlProvider>
    )
}

export default App