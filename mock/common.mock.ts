import { defineMock } from 'vite-plugin-mock-dev-server'
import Mock from 'mockjs'
export default defineMock([
  {
    url: '/api/login',
    enabled: true,
    // methods: "POST",
    delay: 300,
    body({ headers, query, body, params }) {
      return Mock.mock({
        code: 0,
        message: 'success',
        data: {
          'id|3': '@integer',
          name: '@cname',
          'token|64': '@string',
          roleId: ['@string']
        }
      })
    }
  },
  {
    url: '/api/getDemoOptions',
    enabled: true,
    // methods: "POST",
    delay: 300,
    body({ headers, query, body, params }) {
      return Mock.mock({
        code: 0,
        message: 'success',
        'data|10': [
          {
            'id|+1': 1,
            value: '@string',
            label: '@ctitle'
          }
        ]
      })
    }
  }
])
