/**
 * GraphQL.js 练习
 * 参考地址：https://graphql.cn/graphql-js/
 */
const { graphql, buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
const root = {
  hello: () => {
    return 'Hello world!';
  }
};

// 运行 GraphQL query '{ hello }' ，输出响应
graphql(schema, '{ hello }', root).then((res) => {
  console.log(res);
});