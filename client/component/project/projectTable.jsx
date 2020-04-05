import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columTableProject'
import { readAllClients } from '../../action/client'

const ProjectTable = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const projects = useSelector(state => state.projects.projects)
    const clients = useSelector(state => state.clients.clients)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        dispatch(readAllClients())
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(projects)
    }, [projects])

    const findoutClient = (projectClient) => {
        const client = clients.find(client => client._id === projectClient)
        if (client === undefined) {
            return '...loading'
        }
        return client.name
    }

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(project => tmpData.push({
                title: project.title,
                client: findoutClient(project.client),
                category: project.category,
                status: project.status,
                startDate: project.startDate,
                endDate: project.endDate,
                key: project._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.projectTable}
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

export default ProjectTable