import React from 'react'
import { Divider } from 'antd'
import Intro from '../component/intro'
import Technos from '../component/technos'

const bgImgUri = 'img/background-code.png'

const Home = () => {
    return (
        <div
            className="content"
            style={{
                Height: '100%',
                overflow: 'hidden',
                backgroundImage: `url(${bgImgUri})`
            }}
        >
            <Intro />
            <Divider 
                orientation="left" 
                style={{ 
                    color: '#333', 
                    fontWeight: 'normal',
                    marginTop: 150
                }}>
      doctorrWeb
            </Divider>
            <Technos />
        </div>
    )
}

export default Home