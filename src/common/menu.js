import { isUrl } from '../utils/utils'

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    authority: 'admin',
    children: [
      {
        name: '分析页',
        path: 'analysis'
      },
      {
        name: '监控页',
        path: 'monitor'
      },
      {
        name: '工作台',
        path: 'workplace'
        // hideInMenu: true,
      }
    ]
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    authority: 'admin',
    children: [
      {
        name: '基础表单',
        path: 'basic-form'
      },
      {
        name: '分步表单',
        path: 'step-form'
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form'
      }
    ]
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    authority: 'admin',
    children: [
      {
        name: '查询表格',
        path: 'table-list'
      },
      {
        name: '标准列表',
        path: 'basic-list'
      },
      {
        name: '卡片列表',
        path: 'card-list'
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles'
          },
          {
            name: '搜索列表（项目）',
            path: 'projects'
          },
          {
            name: '搜索列表（应用）',
            path: 'applications'
          }
        ]
      }
    ]
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    authority: 'admin',
    children: [
      {
        name: '基础详情页',
        path: 'basic'
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin'
      }
    ]
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success'
      },
      {
        name: '失败',
        path: 'fail'
      }
    ]
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    authority: 'admin',
    children: [
      {
        name: '403',
        path: '403'
      },
      {
        name: '404',
        path: '404'
      },
      {
        name: '500',
        path: '500'
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true
      }
    ]
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login'
      },
      {
        name: '注册',
        path: 'register'
      },
      {
        name: '注册结果',
        path: 'register-result'
      }
    ]
  },
  // {
  //   name: '赛事',
  //   icon: 'user',
  //   path: 'sports',
  //   authority: 'admin',
  //   children: [
  //     {
  //       name: '赛事列表',
  //       path: 'sport/list'
  //     },
  //   ]
  // },
  {
    name: '队伍',
    icon: 'user',
    path: 'teams',
    authority: 'admin',
    children: [
      {
        name: '队伍列表',
        path: 'team/list'
      }
    ]
  },
  {
    name: '选手',
    icon: 'user',
    path: 'players',
    authority: 'admin',
    children: [
      {
        name: '选手列表',
        path: 'player/list'
      }
    ]
  },
  {
    name: '英雄',
    icon: 'user',
    path: 'heroes',
    authority: 'admin',
    children: [
      {
        name: '英雄列表',
        path: 'hero/list'
      }
    ]
  },
  {
    name: '使用文档',
    icon: 'book',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank'
  }
]

function formatter(data, parentPath = '', parentAuthority) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      )
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
