import React, { PureComponent } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableItem from '../EditableItem'

export default class EditableAbilityExtraTable extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '标题',
        dataIndex: 'name',
        render: (text, record) => (
          <EditableItem
            value={text}
            onChange={this.props.handleAbilityExtraChange(record.id, 'name')}
          />
        )
      },
      {
        title: '内容',
        dataIndex: 'value',
        render: (text, record) => (
          <EditableItem
            value={text}
            onChange={this.props.handleAbilityExtraChange(record.id, 'value')}
          />
        )
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return this.state.dataSource.length > 1 ? (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.props.handleAbilityExtraDelete(record.id)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          ) : null
        }
      }
    ]

    this.state = {
      dataSource: [
        {
          id: '0',
          name: 'Edward King 0',
          value: '32'
        },
        {
          id: '1',
          name: 'Edward King 1',
          value: '32'
        }
      ],
      count: 2
    }
  }
  render() {
    const { data } = this.props
    const columns = this.columns
    return (
      <div>
        <Button
          className="editable-add-btn"
          onClick={this.props.handleAbilityExtraAdd}
        >
          新增
        </Button>
        <Table bordered dataSource={data} columns={columns} />
      </div>
    )
  }
}
