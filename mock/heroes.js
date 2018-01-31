import { getUrlParams } from './utils'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'

let tableListDataSource = [
  {
    id: uuidv4(),
    name: '安娜',
    description:
      '安娜全方位的武器配备让她可以应对战场上的所有情况。她的生物步枪和生物手雷可以用来治疗队友并对敌人造成伤害，同时还能对敌人造成负面影响；她的副武器可以麻醉重要目标，而纳米激素则可以大大强化她的一名队友。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '安娜·艾玛莉',
    age: 60,
    height: '',
    profession: '赏金猎人',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '埃及，开罗',
    difficulty: 3,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/ana/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Ana_portrait.png',
    abilities: [
      {
        id: uuidv4(),
        name: '生物步枪',
        description:
          '安娜可以用手中的步枪射出飞镖为队友恢复生命值或对敌人造成持续性伤害。她也可以用步枪的瞄准镜进行放大瞄准以便更精准地击中目标。',
        icon:
          'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/f/fc/Ability-ana1.png',
        extra: [
          {
            id: uuidv4(),
            name: '大招',
            value: '否'
          }
        ],
        remark: [
          {
            id: uuidv4(),
            value:
              '生物步枪能够对敌方托比昂的炮台造成伤害，但不能治疗友方托比昂的炮台。'
          }
        ]
      },
      {
        id: uuidv4(),
        name: '麻醉镖',
        description:
          '安娜可以用她的副武器射出飞镖，使敌人失去意识（目标受到任何伤害后将会醒来）。',
        icon:
          'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/5/58/Ability-ana2.png',
        extra: [
          {
            id: uuidv4(),
            name: '大招',
            value: '否'
          }
        ],
        remark: [
          {
            id: uuidv4(),
            value: '麻醉镖对托比昂的炮台没有作用。'
          }
        ]
      },
      {
        id: uuidv4(),
        name: '生物手雷',
        description:
          '安娜扔出一颗生物手雷；当手雷爆炸后，对小范围内的敌人造成伤害并治疗队友。受影响的队友在短时间内受到的所有治疗效果将会提高，而受影响的敌人则会在短时间内无法受到治疗。',
        icon:
          'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/0/0c/Ability-ana3.png',
        extra: [
          {
            id: uuidv4(),
            name: '大招',
            value: '否'
          }
        ],
        remark: [
          {
            id: uuidv4(),
            value:
              '队友受到的治疗量额外提高100%，同时敌人受到的治疗量减少100%。'
          }
        ]
      },
      {
        id: uuidv4(),
        name: '纳米激素',
        description:
          '安娜用激素强化一位队友，在短时间内提高目标队友造成的伤害并且降低其受到的伤害。',
        icon:
          'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/9/97/Ability-ana4.png',
        extra: [
          {
            id: uuidv4(),
            name: '大招',
            value: '是'
          }
        ],
        remark: []
      }
    ]
  },
  {
    id: uuidv4(),
    name: '堡垒',
    description:
      '“堡垒”具有自我修复的能力，还可以在哨卫模式、侦查模式以及极具毁灭性的坦克模式间进行切换。',
    comment: '',
    health: 200,
    armour: 100,
    shield: 0,
    real_name: 'SST实验型攻城机兵E54“堡垒”',
    age: 30,
    height: 220,
    profession: '全自动战斗机器人',
    affiliation: '',
    base_of_operations: '',
    difficulty: 1,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/bastion/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Bastion_portrait.png'
  },
  {
    id: uuidv4(),
    name: 'D.Va',
    description:
      'D.Va拥有一部强大的机甲，它具有两台全自动的近距离聚变机炮、可以使机甲飞跃敌人或障碍物的推进器、 还有可以抵御来自正面的远程攻击的deffense矩阵。',
    comment: '',
    health: 200,
    armour: 400,
    shield: 0,
    real_name: '宋哈娜',
    age: 19,
    height: '',
    profession: '（前）职业玩家，机甲驾驶员',
    affiliation: '韩国陆军特别机动部队',
    base_of_operations: '韩国，釜山',
    difficulty: 2,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/dva/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/DVa_portrait.png'
  },
  {
    id: uuidv4(),
    name: '源氏',
    description:
      '源氏可以用致命而准确的手里剑重创敌人，他的高科技武士刀可以用来反弹敌人的远程攻击，或是对敌人施展一次快速攻击。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '岛田源氏',
    age: 35,
    height: '',
    profession: '冒险家',
    affiliation: '（前）岛田家，（前）守望先锋',
    base_of_operations: '尼泊尔，香巴里寺庙',
    difficulty: 3,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/genji/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Genji_portrait.png'
  },
  {
    id: uuidv4(),
    name: '半藏',
    description:
      '半藏的弓箭具备有不同的功能，既可以侦测敌情，也可以分散成数股箭矢攻击多个敌人。他还可以攀爬墙壁，从高处攻击敌人，或是召唤巨大的巨龙之魂冲击敌人。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '岛田半藏',
    age: 38,
    height: 173,
    profession: '雇佣兵、刺客',
    affiliation: '岛田家',
    base_of_operations: '日本，花村（前）',
    difficulty: 3,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/hanzo/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Hanzo_portrait.png'
  },
  {
    id: uuidv4(),
    name: '狂鼠',
    description:
      '“狂鼠”具有强大的范围攻击能力，他的榴弹发射器可以射出弹跳的榴弹攻击敌人，震荡地雷可以对敌人造成伤害并击飞他们，捕兽夹则可以困住不小心落入陷阱的敌人。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '詹米森•法尔克斯',
    age: 25,
    height: 195,
    profession: '无政府主义者、小偷、爆破手、雇佣兵、渣客',
    affiliation: '（前）渣客',
    base_of_operations: '（前）澳大利亚，渣客镇',
    difficulty: 2,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/junkrat/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Junkrat_portrait.png'
  },
  {
    id: uuidv4(),
    name: '卢西奥',
    description:
      '卢西奥的音速扩音器可以射出音速飞弹攻击敌人，还可以用声波将其击退。他播放的音乐可以为队友恢复生命值，或者为他们提供移动速度加成，而且他可以在这两种音乐中随心切换。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '卢西奥•科雷亚•多斯桑托斯',
    age: 26,
    height: 160,
    profession: '国际DJ、自由战士',
    affiliation: '',
    base_of_operations: '巴西，里约热内卢',
    difficulty: 2,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/lucio/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Lucio_portrait.png'
  },
  {
    id: uuidv4(),
    name: '麦克雷',
    description:
      '麦克雷拥有一把维和者左轮手枪，他可以用神射手精准解决他的目标，也可以用战术翻滚如苍鹰般在战场中出入自如。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '杰西·麦克雷',
    age: 37,
    height: 185,
    profession: '赏金猎人',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '美国新墨西哥州，圣达菲',
    difficulty: 2,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/mccree/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/McCree_portrait.png'
  },
  {
    id: uuidv4(),
    name: '美',
    description:
      '美的天气控制设备可以使敌人减速或是进行区域控制。她的冰霜冲击枪可以射出冰锥或是冷气对敌人造成伤害。她可以将自己急冻在冰块中治疗自己或者抵挡伤害，还可以用冰墙来阻碍敌方的行动。',
    comment: '',
    health: 250,
    armour: 0,
    shield: 0,
    real_name: '周美灵',
    age: 31,
    height: 160,
    profession: '气候学家、冒险家',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '中国，西安',
    difficulty: 2,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/mei/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Mei_portrait.png'
  },
  {
    id: uuidv4(),
    name: '天使',
    description:
      '“天使”的女武神作战服可以让她像守护天使一样保护战场上的队友。她的治疗杖可以射出两种光束，治疗或是强化队友，她还可以使用复活技能使队友死而复生。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '安吉拉·齐格勒',
    age: 37,
    height: 170,
    profession: '战地医师、特派急救员',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '瑞士，苏黎世',
    difficulty: 1,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/mercy/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Mercy_portrait.png'
  },
  {
    id: uuidv4(),
    name: '法老之鹰',
    description:
      '可以通过喷气作战服翱翔天际，也能用火箭发射器投下高爆火箭，“法老之鹰”代表着一股让你无法忽视的强大力量。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '法芮尔·艾玛莉',
    age: 32,
    height: 180,
    profession: '首席安全官',
    affiliation: '海力士国际安保公司',
    base_of_operations: '埃及，吉萨',
    difficulty: 1,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/pharah/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Pharah_portrait.png'
  },
  {
    id: uuidv4(),
    name: '死神',
    description:
      '”死神”能用地狱火霰弹枪造成巨大伤害，能够用幽灵形态躲避伤害，还能用暗影步在各个地点来回穿梭，这些能力让他足以成为最致命的杀手。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '',
    age: '',
    height: 185,
    profession: '雇佣兵',
    affiliation: '',
    base_of_operations: '',
    difficulty: 1,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/reaper/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Reaper_portrait.png'
  },
  {
    id: uuidv4(),
    name: '莱因哈特',
    description:
      '莱因哈特穿着一套厚重的动力装甲，既可以挥舞着火箭重锤，用强大的冲锋杀入敌阵，也能用巨大的能量屏障保护盟友。',
    comment: '',
    health: 200,
    armour: 300,
    shield: 0,
    real_name: '莱因哈特·威尔海姆',
    age: 61,
    height: 223,
    profession: '冒险家',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '德国，斯图加特',
    difficulty: 1,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/reinhardt/full-portrait.png',
    avatar:
      'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Reinhardt_portrait.png'
  },
  {
    id: uuidv4(),
    name: '路霸',
    description:
      '“路霸”可以用他标志性的链钩将敌人勾到他的身边，然后用爆裂枪重创他们。他能够承受巨大的伤害，还可以通过呼吸器恢复生命值。',
    comment: '',
    health: 600,
    armour: 0,
    shield: 0,
    real_name: '马可•拉特莱奇',
    age: 48,
    height: 220,
    profession: '（前）打手、保镖',
    affiliation: '（前）渣客',
    base_of_operations: '（前）澳大利亚，渣客镇',
    difficulty: 1,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/roadhog/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Roadhog_portrait.png'
  },
  {
    id: uuidv4(),
    name: '士兵76',
    description:
      '他装备有最先进的武器，一把试验性的可以发射螺旋高爆火箭的脉冲步枪，而且他还是经过专业训练的战斗人员，拥有强大的机动以及辅助能力。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '',
    age: 55,
    height: 185,
    profession: '',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '',
    difficulty: 1,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/soldier-76/full-portrait.png',
    avatar:
      'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Soldier76_portrait.png'
  },
  {
    id: uuidv4(),
    name: '秩序之光',
    description:
      '“秩序之光”能够使用光子发射器来分解敌人，为队友提供护盾，建造传送面板或是部署粒子哨戒炮。',
    comment: '',
    health: 100,
    armour: 0,
    shield: 100,
    real_name: '塞特娅·法斯瓦尼',
    age: 28,
    height: 170,
    profession: '光子架构师',
    affiliation: '费斯卡集团',
    base_of_operations: '印度，乌托邦',
    difficulty: 2,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/symmetra/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Symmetra_portrait.png'
  },
  {
    id: uuidv4(),
    name: '托比昂',
    description:
      '托比昂的主要武器是一把锤子以及一把铆钉枪。他随身携带的熔炉让他可以放置可升级的炮台，或是铸造护甲包供盟友使用。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '托比昂·林德霍姆',
    age: 57,
    height: 140,
    profession: '武器设计师',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '瑞典，哥德堡',
    difficulty: 2,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/torbjorn/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Torbjorn_portrait.png'
  },
  {
    id: uuidv4(),
    name: '猎空',
    description:
      '“猎空”的武器有两把脉冲手枪，强大的脉冲炸弹以及永不停歇的欢声笑语。猎空能够通过闪现快速移动并且利用闪回调整自己的状态，然后以这些强大的能力除尽世上的邪恶。',
    comment: '',
    health: 150,
    armour: 0,
    shield: 0,
    real_name: '莉娜·奥克斯顿',
    age: 26,
    height: 162,
    profession: '冒险家',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '英国，伦敦',
    difficulty: 2,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/tracer/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Tracer_portrait.png'
  },
  {
    id: uuidv4(),
    name: '黑百合',
    description:
      '“黑百合”全身都是致命的武器，包括能够放出致命毒素的诡雷、能够为队友提供红外视野的护目镜以及一把可以在狙击和自动模式间切换的强大步枪。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '艾米丽·拉克瓦',
    age: 33,
    height: 175,
    profession: '刺客',
    affiliation: '黑爪',
    base_of_operations: '法国，安纳西',
    difficulty: 2,
    role: 'deffense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/widowmaker/full-portrait.png',
    avatar:
      'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Widowmaker_portrait.png'
  },
  {
    id: uuidv4(),
    name: '温斯顿',
    description:
      '温斯顿拥有他创造的强大发明，包括了喷射背包、特斯拉炮以及屏障发射器。不仅如此，他还有与生俱来强大的猩猩力量。',
    comment: '',
    health: 400,
    armour: 100,
    shield: 0,
    real_name: '温斯顿',
    age: 29,
    height: 220,
    profession: '科学家、冒险家',
    affiliation: '（前）守望先锋成员',
    base_of_operations: '（前）“地平线”月球殖民地',
    difficulty: 2,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/winston/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Winston_portrait.png'
  },
  {
    id: uuidv4(),
    name: '查莉娅',
    description:
      '查莉娅可以为自己或队友施加护盾，吸收伤害并且提升她粒子炮的能量，因此查莉雅具备有前线作战的强大实力。',
    comment: '',
    health: 200,
    armour: 200,
    shield: 0,
    real_name: '亚历山德拉·查莉娅诺娃',
    age: 28,
    height: 195,
    profession: '士兵',
    affiliation: '俄罗斯deffense部队',
    base_of_operations: '俄罗斯，克拉斯诺亚尔斯克前线',
    difficulty: 2,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/zarya/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Zenyatta_portrait.png'
  },
  {
    id: uuidv4(),
    name: '禅雅塔',
    description:
      '禅雅塔可以用和“谐”治愈盟友，也可以用“乱”削弱敌人，还可以在短时间内进入超凡入圣的状态，获得短暂的无敌效果。',
    comment: '',
    health: 50,
    armour: 0,
    shield: 150,
    real_name: '泰哈撒·禅雅塔',
    age: 20,
    height: 172,
    profession: '流浪僧侣、冒险家',
    affiliation: '香巴里僧院',
    base_of_operations: '尼泊尔，香巴里僧院（前）',
    difficulty: 3,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/zenyatta/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Zenyatta_portrait.png'
  },
  {
    id: uuidv4(),
    name: '黑影',
    description:
      '隐身与削弱敌人的能力让“黑影”成为了一个强大的渗透者。她的黑客入侵技能可以干扰敌人，使其更容易被击杀，而她的电磁脉冲可以在对付多个敌人时获得先手优势。“黑影”的位移传动和隐秘潜行也让她难以被敌人压制。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '░░░░░░',
    age: 30,
    height: '',
    profession: '黑客',
    affiliation: '黑爪、（前）骷髅帮',
    base_of_operations: '墨西哥，多拉多',
    difficulty: 3,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/sombra/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Sombra_portrait.png'
  },
  {
    id: uuidv4(),
    name: '奥丽莎',
    description:
      '奥丽莎是团队的核心，可以用防护屏障掩护前线队友。她可以从远距离进行攻击、强化自身的deffense、发射重力弹使敌人减速并打乱阵型，同时还能部署超充能器强化范围多个队友的伤害输出。',
    comment: '',
    health: 200,
    armour: 200,
    shield: 0,
    real_name: '奥丽莎',
    age: '',
    height: '',
    profession: '防卫机器人',
    affiliation: '',
    base_of_operations: '努巴尼',
    difficulty: 2,
    role: 'tank',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/orisa/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Orisa_portrait.png'
  },
  {
    id: uuidv4(),
    name: '末日铁拳',
    description:
      '“末日铁拳”身上的机械元件使他成为一名高机动力、高破坏力的前线战士。除了用手炮从远距离造成伤害，”末日铁拳”还能猛击地面，将敌人击飞或令其失去平衡，或者用火箭重拳冲进战场。当面对一群阵型紧密的敌人时，”末日铁拳”可以跳到敌人视野之外，紧接着以毁天灭地之势坠落强袭。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '阿坎·奥古迪姆',
    age: 45,
    height: '',
    profession: '雇佣兵',
    affiliation: '黑爪',
    base_of_operations: '尼日利亚，奥约',
    difficulty: 3,
    role: 'offense',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/doomfist/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Doomfist_portrait.png'
  },
  {
    id: uuidv4(),
    name: '莫伊拉',
    description:
      '莫伊拉可以运用生化能量提供治疗或输出伤害——但一切都是为了她自己的利益。',
    comment: '',
    health: 200,
    armour: 0,
    shield: 0,
    real_name: '莫伊拉·奥德莱恩',
    age: 48,
    height: '',
    profession: '基因科学家',
    affiliation: '爱尔兰，都伯林；伊拉克，绿洲城',
    base_of_operations: '黑爪，（前）暗影守望成员',
    difficulty: 2,
    role: 'support',
    extra: [],
    remark: [],
    fullshot:
      'http://overwatch.nos.netease.com/1/assets/images/hero/moira/full-portrait.png',
    avatar: 'http://p2f9yvxck.bkt.clouddn.com/hero/avatar/Moira_portrait.png'
  }
]

export function getHeroes(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url // eslint-disable-line
  }

  const params = getUrlParams(url)

  let dataSource = tableListDataSource

  if (params.sorter) {
    const s = params.sorter.split('_')
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]]
      }
      return prev[s[0]] - next[s[0]]
    })
  }

  if (params.role) {
    const role = params.role.split(',')
    let filterDataSource = []
    role.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.role === s)
      )
    })
    dataSource = filterDataSource
  }

  if (params.id) {
    dataSource = dataSource.filter(data => data.id.indexOf(params.id) > -1)
  }

  let pageSize = 10
  if (params.pageSize) {
    pageSize = params.pageSize * 1
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1
    }
  }

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function getHeroById(req, res) {
  const { id } = req.params

  const result = tableListDataSource.filter(x => x.id === id)[0]

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function postHeroes(req, res, b) {
  const body = (b && b.body) || req.body
  const {
    name,
    description,
    comment,
    health,
    armour,
    shield,
    real_name,
    age,
    height,
    profession,
    affiliation,
    base_of_operations,
    difficulty,
    role,
    fullshot,
    avatar
  } = body

  const result = {
    id: uuidv4(),
    name,
    description,
    comment,
    health,
    armour,
    shield,
    real_name,
    age,
    height,
    profession,
    affiliation,
    base_of_operations,
    difficulty,
    role,
    fullshot,
    avatar
  }

  tableListDataSource.unshift(result)

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function putHeroes(req, res, b) {
  const body = (b && b.body) || req.body
  const { id } = body

  tableListDataSource.forEach(item => {
    if (item.id === id) {
      const data = Object.assign(item, body)
      return data
    } else {
      return item
    }
  })

  const result = tableListDataSource.filter(x => x.id === id)[0]

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export function deleteHeroes(req, res) {
  const { id } = req.params
  let result = []

  id.split(',').forEach(x => {
    const r = _.remove(tableListDataSource, i => i.id === x)
    result = result.concat(r)
  })

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export default {
  getHeroes,
  getHeroById,
  postHeroes,
  putHeroes,
  deleteHeroes
}
