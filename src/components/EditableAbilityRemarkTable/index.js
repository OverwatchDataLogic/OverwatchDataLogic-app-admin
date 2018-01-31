import React, { PureComponent } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableItem from '../EditableItem'

export default class EditableAbilityRemarkTable extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '内容',
        dataIndex: 'value',
        render: (text, record) => (
          <EditableItem
            value={text}
            onChange={this.props.handleAbilityRemarkChange(record.id, 'value')}
          />
        )
      },
      {
        title: '操作',
        render: (text, record) => {
          return this.props.data.extra.length > 0 ? (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.props.handleAbilityRemarkDelete(record.id)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          ) : null
        }
      }
    ]
  }
  render() {
    const { data } = this.props
    const columns = this.columns
    return (
      <div>
        <Button
          className="editable-add-btn"
          onClick={() => this.props.handleAbilityRemarkAdd()}
        >
          新增
        </Button>
        <Table bordered dataSource={data.remark} columns={columns} />
      </div>
    )
  }
}
