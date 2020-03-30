import React from 'react'
import Typewriter from 'typewriter-effect'
import { Row, Col } from 'antd'

const bgImgUri = 'img/background-code.png'

const developer = `<pre class='typewriter'>
                            <span class="const-highlight">const</span> Developer = {
                                name: <span class="string-highlight">'doctorrWeb'</span>,
                                title: <span class="string-highlight">'Developer FullStack JS'</span>,
                                location: <span class="string-highlight">'Zurich (Switzerland)'</span>,
                                stack:[
                                    <span class="string-highlight">'Node JS'</span>,
                                    <span class="string-highlight">'React JS'</span>,
                                    <span class="string-highlight">...otherTechno</span>
                                ]}
                        </pre>`

/*
const message = `<pre class='typewriter'>
                            <span class='const-highlight'>continue</span> ? <span class='func-highlight'>mainMenu.click()</span> : <span class='func-highlight'>leave()</span>
                        </pre>`
*/

const IntroMessage = () => {
    return (
        <Row 
            className='content' 
            justify='center' 
            style={{
                minHeight: '100%',
                backgroundImage: `url(${bgImgUri})`,
                overflow: 'hidden'
            }}>
            <Col className='subcontent' lg={24} md={0} sm={0} xs={0}>
                <Typewriter
                    options={{
                        strings: [developer],
                        autoStart: true,
                        loop: true,
                        delay: 35,
                        deleteSpeed: 10
                    }}
                />
            </Col>
        </Row>
    )
}

export default IntroMessage