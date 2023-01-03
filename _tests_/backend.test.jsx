import { createServer } from 'trpc-server-mock';
import { client } from 'trpc';

let server;

beforeEach(() => {
  server = createServer();

  server.mock({
    query: `
      mutation CreateRace($input: CreateRaceInput!) {
        createRace(input: $input) {
          name
          str
          dex
          con
          int
          wis
          char
        }
      }
    `,
    variables: {
      input: {
        name: 'Human',
      },
    },
    result: {
      data: {
        createRace: {
          name: 'Human',
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          char: 0,
        },
      },
    },
  });

  server.start();
});

afterEach(() => {
  server.stop();
});

describe('createRace', () => {
  it('creates a new race', async () => {
    const result = await client.mutate({
      mutation: `
        mutation CreateRace($input: CreateRaceInput!) {
          createRace(input: $input) {
            name
            str
            dex
            con
            int
            wis
            char
          }
        }
      `,
      variables: {
        input: {
          name: 'Human',
        },
      },
    });

    expect(result.data.createRace).toEqual({
      name: 'Human',
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      char: 0,
    });
  });
});