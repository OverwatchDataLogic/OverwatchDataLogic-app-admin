import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Form, Icon, Button, Dropdown, Menu } from 'antd'
import TeamsTable from '../../components/TeamsTable'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

//import styles from './Sports.less'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')

@Form.create()
class Teams extends PureComponent {
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
    const { remove } = this.props
    const { selectedRows } = this.state

    if (!selectedRows) return

    switch (e.key) {
      case 'remove':
        remove(selectedRows.map(row => row.id).join(','), () => {
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
    const { sports: { data }, loading, navigateTo, remove } = this.props
    const { selectedRows } = this.state

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    )

    return (
      <PageHeaderLayout title="赛事列表">
        <Card bordered={false}>
          <div>
            <div>
              <Button
                icon="plus"
                type="primary"
                onClick={() => navigateTo('/sports/sport/add')}
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
            <TeamsTable
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
  const { teams, loading } = state
  return {
    teams,
    loading: loading.models.teams
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(routerRedux.push(location))
    },
    get: params => {
      dispatch({
        type: 'teams/get',
        payload: params
      })
    },
    remove: (id, callback) => {
      dispatch({
        type: 'teams/remove',
        payload: id,
        callback: callback
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
