import React from 'react'
import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import moment from 'moment'

const TutoTabList = ({data, history}) => {
    return (
        <List
            grid={{
                gutter: 16,
                column: 1,
            }}
            dataSource={data}
            size="small"
            pagination={{
                onChange: (page) => {
                    console.log(page)
                },
                pageSize: 20,
                size: 'small',
            }}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        bordered={true}
                        size="small"
                        onClick={() => history.push(`/tutorial/${item._id}`)}
                    >
                        <h3 style={{ color: '#FF9900' }}>{item.title || item.name}</h3>
                        <div>
                            {`Published ${moment(item.creationDate).fromNow()}`}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

TutoTabList.propTypes = {
    data: PropTypes.array,
    history: PropTypes.object
}

export default TutoTabList
