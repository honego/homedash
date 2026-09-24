export const siteConfig = {
  siteName: 'Homedash',
  siteUrl: 'https://dash.honeok.dev',
  description: 'Personal dashboard and digital home.',
  locale: 'zh-CN',
  navigation: [{ label: '主页', href: '/', icon: 'home' }] as const,
  home: {
    name: 'Hamster1963',
    tagline: '开发者、业余吉他手。',
    profileUrl: 'https://github.com/hamster1963',
    greeting: '大家好，我是',
    openSource: '我从 2021 年开始参与开源项目。',
    passion: '我热爱构建与发掘那些经过用心打磨的产品。',
    rolePrefix: '我目前是',
    roleMiddle: '的核心开发者之一，主要负责',
    roleSuffix: '的开发工作。',
    brands: {
      nezha: {
        label: '哪吒监控',
        url: 'https://github.com/nezhahq',
        icon: '/brands/nezha.png',
      },
      dashboard: {
        label: 'nezha-dash',
        url: 'https://github.com/hamster1963/nezha-dash',
        icon: '/brands/nezha-dash.png',
        darkIcon: '/brands/nezha-dash-dark.png',
      },
    },
  },
} as const
