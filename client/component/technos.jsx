import React from 'react'
import { Row, Col } from 'antd'

const Technos = () => {

    return (
        <Row 
            justify="center"
            gutter={[32, 8]}
        >
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/javascript.svg" height={30} />
            </Col>
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/nodejs.svg" height={40} />
            </Col>
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/express.svg" height={25} />
            </Col>
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/react.svg" height={30} />
            </Col>
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/graphql.svg" height={35} />
            </Col>
            <Col 
                lg={{span: 2}}
                md={{span: 2}}
                sm={{span: 0}}
                xs={{span: 0}}
            >
                <img src="img/mongodb.svg" height={30} />
            </Col>
        </Row>
    )
    
}

export default Technos