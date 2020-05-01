import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import BlogList from './blogList'
import BlogItem from './blogItem'

const Work = () => {
    return (
        <Layout
            style={{
                margin: '10em 15em 5em',
            }}
        >
            <Switch>
                <Route path="/blog/:id">
                    <BlogItem />
                </Route>
                <Route path="/blog">
                    <BlogList />
                </Route>
            </Switch>
        </Layout>
    )
}

export default Work
