import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '460173cd3d49c3d630172df3de42a8a368cf067b', queries,  });
export default client;
  