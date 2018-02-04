import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Form, Icon, Button, Dropdown, Menu } from 'antd'
import PlayersTable from '../../components/PlayersTable'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

import styles from './Players.less'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')

@Form.create()
class Players extends PureComponent {
  state = {
    selectedRows: []
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { get } = this.props
    const { formValues } = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    get(params)
  }

  handleMenuClick = e => {
    const { removeAll } = this.props
    const { selectedRows } = this.state

    if (!selectedRows) return

    switch (e.key) {
      case 'remove':
        removeAll(selectedRows.map(row => row.objectId), () => {
          this.setState({
            selectedRows: []
          })
        })
        break
      default:
        break
    }
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows
    })
  }

  render() {
    const { players: { data }, loading, navigateTo, remove } = this.props
    const { selectedRows } = this.state

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="选手列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => navigateTo('/players/player/add')}
              >
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <PlayersTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              navigateTo={navigateTo}
              remove={remove}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { players, loading } = state
  return {
    players,
    loading: loading.models.players
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(routerRedux.push(location))
    },
    get: params => {
      dispatch({
        type: 'players/get',
        payload: params
      })
    },
    remove: objectId => {
      dispatch({
        type: 'players/remove',
        payload: { objectId: objectId }
      })
    },
    removeAll: (objectId, callback) => {
      dispatch({
        type: 'players/removeAll',
        payload: { objectId: objectId },
        callback: callback
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players)
