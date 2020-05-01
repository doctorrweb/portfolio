import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import WorkList from './workList'
import WorkItem from './workItem'
import WorkPost from './workPost'


const Work = () => {

    return (
        <Layout
            style={{
                margin: '10em 15em 5em',
            }}
        >
            <Switch>
                <Route path='/work/:id/:postId'>
                    <WorkPost />
                </Route>
                <Route path='/work/:id'>
                    <WorkItem />
                </Route>
                <Route path='/work'>
                    <WorkList />
                </Route>
            </Switch>
        </Layout>
    )
}

export default Work