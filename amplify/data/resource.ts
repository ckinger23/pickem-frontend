import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Team: a
    .model({
      teamName: a.string(),
      spreadRecord: a.customType({
        spreadWins: a.integer(),
        spreadLosses: a.integer()
      })
    })
    .authorization((allow) => [allow.guest()]),
  Game: a
    .model({
      weekId: a.id(),
      week: a.belongsTo('Week', ' weekId'),
      homeTeam: a.ref('Team'),
      visitingTeam: a.ref('Team'),
      spread: a.float(),
      overUnder: a.float(),
      result: a.customType({
        homeScore: a.integer(),
        visitingScore: a.integer()
      })
    }),
  Week: a
    .model({
      weekNumber: a.integer(),
      seasonId: a.id(),
      season: a.belongsTo('Season', 'seasonId'),
      games: a.hasMany('Game', 'weekId'),
      scoreboard: a.hasOne('WeeklyScoreboard', 'weekId')
    }),
  WeeklyScoreboard: a
    .model({
      weekId: a.id(),
      week: a.belongsTo('Week', 'weekId'),
      userId: a.ref('User'),
      pointsEarned: a.integer()
    }),
  Season: a
    .model({
      weeks: a.hasMany('Week', 'seasonId'),
      scoreboard: a.hasOne('SeasonScoreboard', 'seasonId')
    }),
  SeasonScoreboard: a
    .model({
      seasonId: a.id(),
      season: a.belongsTo('Season', ' seasonId'),
      userId: a.ref('User'),
      pointsAccrued: a.integer()
    }),
  Pick: a
    .model({
      game: a.ref('Game'),
      user: a.ref('User'),
      spread: a.boolean(),
      overUnder: a.boolean()
    }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
