import React from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { Layout } from 'antd'
import { Switch, Route, Router, Link, useHistory } from 'react-router-dom'
import NavBar from './navBar'
import Post from './post'
import Formation from './formation'
import messages from '../translation/'

const { Header, Content, Footer } = Layout

const App = () => {
    
    const history = useHistory()

    const lang = useSelector(state => state.locale.lang)

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <Layout style={{ minHeight: 0 }}>
                <Header
                    //theme="light"
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        minHeight: '100px',
                        padding: '18px 50px',
                        width: '100%',
                        backgroundColor: '#EFEFEF',
                        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <NavBar />
                </Header>
                <Content
                    style={{
                        background: '#fff',
                        minHeight: '100%',
                        padding: '10px 50px',
                        marginTop: 100
                    }}
                >
                    <Router history={history}>
                        <Switch>
                            <Route path="/posts" component={Post} />
                            <Route path="/formations" component={Formation} />
                        </Switch>
                    </Router>
                    
                    <Link to="/posts">posts</Link>
                    <hr />
                    <Link to="/formations">formations</Link>
                </Content>
                <Footer
                    style={{
                        //background: '#fff',
                        //minHeight: '100%',
                        padding: '10px 50px'
                        //marginTop: 100
                    }}
                >
                    Footer
                </Footer>
            </Layout>
        </IntlProvider>
    )
}

export default App