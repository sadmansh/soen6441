# SOEN 6441 term project

## Todos
1. Write script to insert data into SQL database from `store.json`
2. Add CRUD queries & routes
3. Add auth
4. Add front end 

## Data insertion
Run the command `yarn fetch` to insert data from `store.json` into MySQL database


## Flow
1. User logs in
2. User sees menu: find by ingredients, type
3. User selects find by ingredients
4. User enters comma-separated ingredients
5. Search term is passed to API
6. API runs sql query with search terms
7. API returns data
8. Client lists matched recipes
9. User adds recipe/s to their personal list


## Drop all tables
```
SET FOREIGN_KEY_CHECKS = 0;
drop table if exists foodtype;
drop table if exists foodtyperelationship;
drop table if exists ingredient;
drop table if exists ingredientrelationship;
drop table if exists recipe;
SET FOREIGN_KEY_CHECKS = 1;
```