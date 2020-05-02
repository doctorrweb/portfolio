import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import TutoList from './tutoList'
import TutoItem from './tutoItem'

const Tutorial = () => {
    return (
        <Layout
            style={{
                margin: '10%',
            }}
        >
            <Switch>
                <Route path="/tutorial/:id">
                    <TutoItem />
                </Route>
                <Route path="/tutorial">
                    <TutoList />
                </Route>
            </Switch>
        </Layout>
    )
}

export default Tutorial