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
                // minHeight: 950,
                overflow: 'hidden',
                backgroundImage: `url(${bgImgUri})`,
                backgroundSize: 'cover'
            }}
        >
            <Intro />
            <Divider 
                orientation="right" 
                style={{ 
                    color: '#333', 
                    fontWeight: 'normal',
                    marginTop: 200
                }}>
      My Stack
            </Divider>
            <Technos />
        </div>
    )
}

export default Home