/**
 * 传递参数
 * 参考地址：http://graphql.cn/graphql-js/passing-arguments/
 */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
const schema = buildSchema(`
  type Query {
    rollThreeDice(numDice: Int!, numSides: Int!): [Int]
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
const root = {
  rollThreeDice: ({ numDice, numSides }) => {
    let output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    };
    return output;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');