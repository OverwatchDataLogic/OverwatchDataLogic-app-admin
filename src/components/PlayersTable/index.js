import React, { PureComponent, Fragment } from 'react'
import { Table, Badge, Divider } from 'antd'
import styles from './index.less'

class PlayersTable extends PureComponent {
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

    const role = {
      dps: '输出',
      tank: '重装',
      support: '辅助',
      flex: '自由人'
    }
    const rolesMap = {
      offense: 'default',
      tank: 'processing',
      support: 'success',
      flex: 'error'
    }
    const level = {
      owl: '守望先锋联赛',
      oc: '守望先锋挑战赛',
      owod: '守望先锋公开赛'
    }
    const levelsMap = {
      owl: 'default',
      oc: 'processing',
      owod: 'success'
    }
    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '国籍',
        dataIndex: 'nationality'
      },
      {
        title: '等级',
        dataIndex: 'level',
        filters: [
          {
            text: level.owl,
            value: 'owl'
          },
          {
            text: level.oc,
            value: 'oc'
          },
          {
            text: level.owod,
            value: 'owod'
          }
        ],
        render(val) {
          return <Badge status={levelsMap[val]} text={level[val]} />
        }
      },
      {
        title: '角色',
        dataIndex: 'role',
        filters: [
          {
            text: role.offense,
            value: 'offense'
          },
          {
            text: role.tank,
            value: 'tank'
          },
          {
            text: role.support,
            value: 'support'
          },
          {
            text: role.flex,
            value: 'flex'
          }
        ],
        render(val) {
          return <Badge status={rolesMap[val]} text={role[val]} />
        }
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a
              onClick={() =>
                navigateTo(`/players/player/edit/${record.objectId}`)
              }
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a onClick={() => remove(record.objectId)}>删除</a>
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
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.objectId}
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

export default PlayersTable
