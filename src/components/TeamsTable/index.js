import React, { PureComponent, Fragment } from 'react'
import { Table, Badge, Divider } from 'antd'
//import styles from './index.less'

class TeamsTable extends PureComponent {
  state = {
    selectedRowKeys: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: []
      })
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows)
    }
    this.setState({ selectedRowKeys })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  render() {
    const { selectedRowKeys } = this.state
    const {
      data: { list, pagination },
      loading,
      navigateTo,
      remove
    } = this.props

    const columns = [
      {
        title: '队伍名称',
        dataIndex: 'name'
      },
      {
        title: '队伍名称',
        dataIndex: 'description'
      },
      {
        title: '城市',
        dataIndex: 'homeLocation'
      },
      {
        title: '主色调',
        dataIndex: 'primaryColor',
      },
      {
        title: '成立时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => navigateTo(`/temas/team/edit/${record.id}`)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a onClick={() => remove(record.id)}>删除</a>
          </Fragment>
        )
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled
      })
    }

    return (
      <div>
        <Table
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default TeamsTable
