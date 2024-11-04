import { ApolloServer } from '@apollo/server'; // preserve-line
import { startStandaloneServer } from '@apollo/server/standalone'; // preserve-line
import { buildSchema } from 'type-graphql'
import "reflect-metadata";
import { dataSource } from "../db/client";

import RepoResolver from "./repos/repo.resolver";

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { host: '0.0.0.0', port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();