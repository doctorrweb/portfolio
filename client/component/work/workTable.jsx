import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
    List,
    Card
} from 'antd'
import moment from 'moment'


const WorkTable = ({ data }) => {

    const history = useHistory()

    return (
        <List
            grid={{
                gutter: 16, 
                lg: 4,
                md: 3,
                sm: 2,
                xs: 1
            }}
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
                        onClick={() => history.push(`/work/${item._id}`)}
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