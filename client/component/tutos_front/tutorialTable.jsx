import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { List, Card } from 'antd'
import moment from 'moment'

const TutorialTable = ({ data }) => {

    const history = useHistory()

    return (
        <List
            grid={{
                gutter: 16,
                lg: 4,
                md: 3,
                sm: 2,
                xs: 1,
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
                        onClick={() => history.push(`/tutorial/${item._id}`)}
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

TutorialTable.propTypes = {
    data: PropTypes.array,
}

export default TutorialTable
