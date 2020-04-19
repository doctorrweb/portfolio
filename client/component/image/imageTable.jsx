import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableimage'

const ImageTable = ({images}) => {

    const intl = useIntl()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        console.log('images', images)
    })

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(images)
    }, [images])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(img => tmpData.push({
                name: img.name,
                path: img.path,
                creationDate: img.creationDate,
                status: img.status,
                key: img._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns}
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

ImageTable.propTypes = {
    images: PropTypes.array
}

export default ImageTable