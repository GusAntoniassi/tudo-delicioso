# Tudo Delicioso
Aplicação GraphQL de exemplo baseada na matéria "GraphQL: Rest in peace?" da edição de agosto de 2018 da revista iMasters.

## Exemplos de queries
### Trazer todas as receitas e autores (front page)
```graphql
{
    recipes {
        id
        name
        category
        author {
        name
        photo
        }
    }
}
```

### Trazer uma receita específica
```graphql
{
    recipes(id: "MQ==") {
        id
        name
        category
        author {
        name
        photo
        }
    }
}
```

### Trazer as receitas do usuário atual e dos amigos
```graphql
{
    recipesByMe: recipes(byMe: true) {
        ...commonFields
    }
    recipesByFriends: recipes(byFriends: true) {
        ...commonFields
        author {
        name
        }
    }
}

fragment commonFields on Recipe {
    id
    name
}
```

### Trazer a lista de autores
```graphql
query ListOfAuthors($name: String, $withFriends: Boolean!) {
    authors(name: $name) {
        id
        name
        photo
        friends @include (if: $withFriends) {
        name
        }
    }
}
```

### Gravar uma receita
```graphql
mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(recipe: $input) {
        recipe {
            id
        }
    }
}
```

Variables:

```json
{
    "input": {
        "name": "Bolo de Fubá",
        "ingredients": [
            "Farinha de Fubá"
        ],
        "steps": [
            "Misture os ingredientes secos"
        ]
    }
}
```

