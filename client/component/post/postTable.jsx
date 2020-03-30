import React, { useState, useEffect }  from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from '../../helper/columnTable'

const PostTable = () => {

    const intl = useIntl()
    

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const posts = useSelector(state => state.posts.posts)
    
    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => { 
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(posts)
    }, [posts])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(post => tmpData.push({
                title: post.title,
                category: post.category,
                status: post.status,
                creationDate: moment(post.creationDate).format('LLL'),
                key: post._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.postTable}
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