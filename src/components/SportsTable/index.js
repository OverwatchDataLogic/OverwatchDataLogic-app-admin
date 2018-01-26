import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Badge, Divider } from 'antd';
import styles from './index.less';

class SportsTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { list, pagination }, loading } = this.props;
    const statusMap = { PENDING: 'default', LIVING: 'processing', CONCLUDED: 'success' };
    const status = { PENDING: '未开始', LIVING: '进行中', CONCLUDED: '已结束' };
    const columns = [
      {
        title: '赛事简称',
        dataIndex: 'abbreviatedTitle',
      },
      {
        title: '赛事名称',
        dataIndex: 'title',
      },
      {
        title: '奖金',
        dataIndex: 'prize',
        sorter: true,
        align: 'right',
        render: val => `${val} 万`,
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status.PENDING,
            value: 'PENDING',
          },
          {
            text: status.LIVING,
            value: 'LIVING',
          },
          {
            text: status.CONCLUDED,
            value: 'CONCLUDED',
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">删除</a>
          </Fragment>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
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
    );
  }
}

export default SportsTable;
