const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    { buildSchema } = require('graphql')
;

var schema = buildSchema(`
  type Query {
    recipes(id: ID, byMe: Boolean, byFriends: Boolean): [Recipe]
    authors(name: String, showFriends: Boolean): [Author]
  }

  type Mutation {
    createRecipe(recipe: CreateRecipeInput!): CreateRecipePayload
  }

  type Recipe {
    id: ID!
    name: String!
    category: Category!
    author: [Author]!
    ingredients: [String]!
    steps: [Step]!
  }

  type Author {
    id: ID!
    name: String!
    photo: String
    friends: [Author]
  }

  type Step {
    description: String!
  }

  enum Category {
    salgado
    doce
  }

  input CreateRecipeInput {
    name: String!
    ingredients: [String]!
    steps: [String]!
  }

  type CreateRecipePayload {
    recipe: Recipe
  }
`);

var root = { 
    recipes: (parent, args, context, info) => {
        // @TODO: Filtrar baseado nos args

        return [
            {
                "id": "MQ==",
                "name": "Torta de legumes",
                "category": "salgado",
                "author": [{
                    "name": "Paulo Panela",
                    "photo": "https://photo.co"
                }]
            },
            {
                "id": "Mg==",
                "name": "Pudim de Chocolate",
                "category": "doce",
                "author": [{
                    "name": "Maria Cacau",
                    "photo": "https://photo.co"
                }]
            }
        ]
    },
    authors: (parent, args, context, info) => {
        // @TODO: Filtrar baseado nos args
        
        return [
            {
                "id": 1,
                "name": "João da Silva",
                "photo": "https://photo.co",
                "friends": [
                    {
                        "name": "Paulo Panela",
                    },
                    {
                        "name": "Rodrigo Cardoso",
                    },
                ]
            },
            {
                "id": 2,
                "name": "Maria Cacau",
                "photo": "https://photo.co",
                "friends": [
                    {
                        "name": "Paulo Panela",
                    }
                ]
            },
        ]
    },
    createRecipe: (parent, args, context, info) => ({
        "recipe": {
            "id": "MTAw"
        }
    })
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));