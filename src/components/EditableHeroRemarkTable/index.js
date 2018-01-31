import React, { PureComponent } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import EditableItem from '../EditableItem'

export default class EditableHeroRemarkTable extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '内容',
        dataIndex: 'value',
        render: (text, record) => (
          <EditableItem
            value={text}
            onChange={this.props.handleHeroRemarkChange(record.id, 'value')}
          />
        )
      },
      {
        title: '操作',
        render: (text, record) => {
          return this.props.data.length > 0 ? (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.props.handleHeroRemarkDelete(record.id)}
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
          onClick={this.props.handleHeroRemarkAdd}
        >
          新增
        </Button>
        <Table bordered dataSource={data} columns={columns} />
      </div>
    )
  }
}
