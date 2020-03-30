import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableTutorial'

const PostTable = () => {

    const intl = useIntl()


    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const tutorials = useSelector(state => state.tutorials.tutorials)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(tutorials)
    }, [tutorials])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(tutorial => tmpData.push({
                title: tutorial.title,
                category: tutorial.category,
                status: tutorial.status,
                creationDate: moment(tutorial.creationDate).format('LLL'),
                key: tutorial._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.tutorialTable}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300 }}
        size='small'
        pagination={{
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} ${intl.formatMessage({ id: 'of' })} ${total} ${intl.formatMessage({ id: 'items' })}`,
            showQuickJumper: true,
            pageSize: 10,
            pageSizeOptions: ['10', '30', '60', '80', '100']
        }}
    />
}

export default PostTable