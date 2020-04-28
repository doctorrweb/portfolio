import React from 'react'
import PropTypes from 'prop-types'

import {
    List,
    Card
} from 'antd'
import moment from 'moment'


const WorkTable = ({ data }) => {

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            size="small"
            pagination={{
                onChange: (page) => {
                    console.log(page)
                },
                pageSize: 30,
            }}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        cover={<img src={item.image.path} width={100} height={150} style={{ objectFit: 'cover' }} />}
                    >
                        <h3 style={{ color: '#FF9900' }}>{item.title}</h3>
                        <div><b>Client:</b> {item.client.name}</div>
                        <div><b>Start date:</b> {moment(item.startDate).format('LL')}</div>
                        <div><b>End date:</b> {moment(item.endDate).format('LL')}</div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

WorkTable.propTypes = {
    data: PropTypes.array
}

export default WorkTable