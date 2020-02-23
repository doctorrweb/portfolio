import React from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { Layout } from 'antd'
import { Switch, Route, Router, Link, useHistory } from 'react-router-dom'
import Post from './post'
import Formation from './formation'
//import messages from '../translation/'

const { Header, Content, Footer } = Layout

const App = () => {
    
    const history = useHistory()

    const lang = useSelector(state => state.locale.lang)

    return (
        <IntlProvider locale={lang}>
            <Footer style={{ minHeight: 0 }}>
                <Header
                    theme="light"
                    style={{
                        //position: 'fixed',
                        //zIndex: 100,
                        minHeight: '80px',
                        padding: '10px 50px',
                        width: '100%',
                        backgroundColor: '#EFEFEF'
                    }}
                >
            Header
                </Header>
                <Content
                    style={{
                        //background: '#fff',
                        minHeight: '100%',
                        padding: '10px 50px'
                        //marginTop: 100
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
            </Footer>
        </IntlProvider>
    )
}

//const intl = useIntl()

/*
const mapStateToprops = state => {
    return {
        lang: state.locale.lang,
        //sidebar: state.sidebar.sidebar,
        errorStatus: state.error.status
    }
}

const mapDispatchToProps ={

}
*/

export default App