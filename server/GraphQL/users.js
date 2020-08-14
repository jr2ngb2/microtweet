const { gql } = require('apollo-server-express');
const db =  require('../database');

export const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }
    type User {
        id: ID!
        email: String
        name: String
    }
`;

export const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
};