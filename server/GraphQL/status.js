const { gql } = require('apollo-server-express');
const db = require('../database');

export const typeDefs = gql`
    extend type Query {
        allStatus: [Status]
        status(id: ID!): Status
    }
    type Status {
        id: ID!
        slug: String
        name: String
    }
`;

export const resolvers = {
    Query: {
        allStatus: async () => db.status.findAll(),
        status: async (obj, args, context, info) => db.status.findByPk(args.id),
    },
};