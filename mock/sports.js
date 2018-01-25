import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [
  {
    id: '000000001',
    title: '守望先锋职业战队联赛',
    abbreviatedTitle: 'OTS',
    englishTitle: 'OverWatch Team Story',
    description:
      '战旗官方电竞赛事品牌，拥有国内一流的赛事策划和执行团队，旗下的赛事将采用覆盖全年四季的联赛模式，更注重对赛事和选手的包装，打造专业、完善的赛事体系，为中国电竞行业的发展助力！',
    logo: 'https://static.zhanqi.tv/assets/web/static/images/ots/new-ots-logo.png',
    pic: 'https://static.zhanqi.tv/assets/web/static/i/ots-2018/bg-1.jpg',
    startDate: '2017-08-09',
    endDate: '2018-08-09',
    status: 'PENDING',
    prize: 30,
  },
  {
    id: '000000002',
    title: '守望先锋联赛',
    abbreviatedTitle: 'OWL',
    englishTitle: 'OverWatch League',
    description:
      '《守望先锋联赛》是全球首个以城市战队为单位的大型电竞联赛，旨在通过暴雪娱乐的热门游戏《守望先锋》，共襄电子竞技的巅峰盛况。我们的目标是打造世界一流的电竞联赛，让职业战队和选手不断茁壮成长。',
    logo: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/JEUWQ6CN33BR1507857496436.svg',
    pic: 'https://cms-origin-cn.battle.net/cms/blog_header/ma/MAKL0K8V1PGA1509650594083.jpg',
    startDate: '2017-08-09',
    endDate: '2018-08-09',
    status: 'PENDING',
    prize: 2000,
  },
];

export function getSports(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.status === s)
      );
    });
    dataSource = filterDataSource;
  }

  if (params.id) {
    dataSource = dataSource.filter(data => data.id.indexOf(params.id) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postSports(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getSports,
  postSports,
};
