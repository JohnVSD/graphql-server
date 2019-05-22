/**
 * 对象类型
 * 参考地址：http://graphql.cn/graphql-js/object-types/
 */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// 用class构造一个摇筛子函数；
class RandomDie {
  // numSides：点数
  constructor(numSides) {
    this.numSides = numSides;
  }

  // 一个筛子
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  // 多个筛子 numRolls：筛子个数
  roll({numRolls}) {
    let output = [];
    for (let i = 0; i < numRolls; i++ ) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// 根节点为每个 API 入口端点提供一个 resolver 函数
const root = {
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
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