import React from 'react'
import Typewriter from 'typewriter-effect'
import { Row, Col } from 'antd'

const bgImgUri = 'img/background-code.png'

const developer = `<pre class='typewriter'>
                            <span class="const-highlight">const</span> webDeveloper = {
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

const Intro = () => {
    return (
        <Row 
            className='content' 
            justify='center' 
            style={{
                minHeight: '100%',
                backgroundImage: `url(${bgImgUri})`,
                overflow: 'hidden'
            }}>
            <Col
                // className='subcontent' 
                lg={24} md={24} sm={24} xs={24}
                style={{
                    marginTop: '12em'
                }}
            >
                <Typewriter
                    options={{
                        strings: [developer],
                        autoStart: true,
                        loop: true,
                        delay: 35,
                        deleteSpeed: 40
                    }}
                />
            </Col>
            
        </Row>
    )
}

export default Intro