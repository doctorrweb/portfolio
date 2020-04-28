import React from 'react'
import PropTypes from 'prop-types'

import { List, Card } from 'antd'
import moment from 'moment'

const BlogTable = ({ data }) => {
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
                        cover={
                            <img
                                src={item.image.path}
                                width={100}
                                height={150}
                                style={{ objectFit: 'cover' }}
                            />
                        }
                    >
                        <h3 style={{ color: '#FF9900' }}>{item.title}</h3>
                        <div>
                            {`Published ${moment(item.creationDate).fromNow()}`}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

BlogTable.propTypes = {
    data: PropTypes.array,
}

export default BlogTable
