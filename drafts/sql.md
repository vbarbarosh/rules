new formatting rules for mysql:

bad

```
    await knex.raw(`update user_identities set primary_at = verified_at where id in (
        select id from (select min(id) as id from user_identities where type = 'email' and verified_at is not null group by user_id) as oldest
    )`);
```

good
```
    await knex.raw(`
        UPDATE
            user_identities
        SET
            primary_at = verified_at
        WHERE id IN (
            SELECT id FROM (
                SELECT MIN(id) AS id
                FROM user_identities
                WHERE type = 'email' AND verified_at IS NOT NULL GROUP BY user_id
            ) AS oldest
        )
    `);
```

- all mysql keywords are upper case
- at the very top level: SELECT, then on a new line, indented four spaces, the select list; then FROM, also on a new line; every JOIN on a new line too
- an expression like WHERE (SELECT ...) can stay on one line when it is short

```
    await knex.raw(`
        CREATE UNIQUE INDEX
            user_identities_primary_user_id_unique
        ON
            user_identities (user_id)
        WHERE
            primary_at IS NOT NULL
    `);

    await knex.raw(`
        ALTER TABLE
            user_identities
        ADD COLUMN
            primary_user_id INT UNSIGNED GENERATED ALWAYS AS (IF(primary_at IS NULL, NULL, user_id)) VIRTUAL AFTER primary_at,
        ADD UNIQUE INDEX
            user_identities_primary_user_id_unique (primary_user_id)
    `);

    await knex.raw(`
        ALTER TABLE
            user_identities
        DROP INDEX
            user_identities_primary_user_id_unique,
        DROP COLUMN
            primary_user_id
    `);

    await knex.raw(`
        DROP INDEX
            user_identities_primary_user_id_unique
    `);
```

# SQL

A MySQL query inside JavaScript is laid out like code: the reader sees its
structure before reading a word of it.

## The string

A query that spans lines opens its template literal with a line break and
closes it on a line of its own. The query itself is indented one level deeper
than the call that runs it, so the backticks frame it:

```js
await knex.raw(`
    UPDATE
        user_identities
    ...
`);
```

## Case

Every keyword, type and function is upper case: `SELECT`, `FROM`, `JOIN`,
`UPDATE`, `SET`, `WHERE`, `IN`, `AND`, `IS NOT NULL`, `GROUP BY`, `AS`,
`INT UNSIGNED`, `VIRTUAL`, `MIN`, `IF`. Tables, columns, indexes and aliases
stay lower case, spelled as the schema spells them:
`user_identities`, `verified_at`, `oldest`.

## Top-level clauses

At the top level of a statement, each clause starts a line of its own:
`SELECT`, `FROM`, every `JOIN`, `UPDATE`, `SET`, `CREATE UNIQUE INDEX`, `ON`,
`WHERE`, `ALTER TABLE`, `DROP INDEX`. A keyword of several words, such as
`CREATE UNIQUE INDEX`, stays on one line. What the clause takes, such as the
select list, a table, an index name, the assignments or a condition, goes on
the next line, indented four spaces:

```sql
SELECT
    ...
FROM
    user_identities

UPDATE
    user_identities
SET
    primary_at = verified_at

CREATE UNIQUE INDEX
    user_identities_primary_user_id_unique
ON
    user_identities (user_id)
WHERE
    primary_at IS NOT NULL

DROP INDEX
    user_identities_primary_user_id_unique
```

## ALTER TABLE

Each action of an `ALTER TABLE` is a clause of its own: `ADD COLUMN`,
`ADD UNIQUE INDEX`, `DROP INDEX`, `DROP COLUMN`. The comma between two actions
ends the line of the first one's operand. A column definition stays whole on
its line, however long it is:

```sql
ALTER TABLE
    user_identities
ADD COLUMN
    primary_user_id INT UNSIGNED GENERATED ALWAYS AS (IF(primary_at IS NULL, NULL, user_id)) VIRTUAL AFTER primary_at,
ADD UNIQUE INDEX
    user_identities_primary_user_id_unique (primary_user_id)

ALTER TABLE
    user_identities
DROP INDEX
    user_identities_primary_user_id_unique,
DROP COLUMN
    primary_user_id
```

## Short expressions

An expression that is short stays on one line. A `WHERE` that opens a
subquery stays on one line with it, `WHERE id IN (`, even at the top level.
So do the clauses inside a subquery: `SELECT MIN(id) AS id`, then
`FROM user_identities`, then the `WHERE`.

## Subqueries

A subquery opens with `(` at the end of the line that uses it. Its body is
indented one level, and `)` closes it on a line of its own, at the indent of
that line. The alias follows the closing parenthesis: `) AS oldest`.

```sql
WHERE id IN (
    SELECT id FROM (
        SELECT MIN(id) AS id
        ...
    ) AS oldest
)
```
