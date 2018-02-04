import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Button, Icon, List } from 'antd'
import Ellipsis from '../../components/Ellipsis'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Heroes.less'

class Heroes extends PureComponent {
  render() {
    const { heroes: { data }, loading, navigateTo, remove } = this.props

    return (
      <PageHeaderLayout title="英雄列表">
        <div className={styles.cardList}>
          <List
            rowKey="objectId"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...data.list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.objectId}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a
                        onClick={() =>
                          navigateTo(`/heroes/hero/edit/${item.objectId}`)
                        }
                      >
                        编辑
                      </a>,
                      <a
                        onClick={() => {
                          remove(item.objectId)
                        }}
                      >
                        删除
                      </a>
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.avatar}
                        />
                      }
                      title={<a href="#">{item.name}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={() => navigateTo('/heroes/hero/add')}
                  >
                    <Icon type="plus" /> 新增英雄
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { heroes, loading } = state
  return {
    heroes,
    loading: loading.models.heroes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(routerRedux.push(location))
    },
    remove: (objectId, callback) => {
      dispatch({
        type: 'heroes/remove',
        payload: { objectId },
        callback: callback
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Heroes)
