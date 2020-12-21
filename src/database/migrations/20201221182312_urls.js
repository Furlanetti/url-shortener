exports.up = function (knex) {
  return knex.schema.createTable("urls", function (table) {
    table.increments();
    table.string("url").notNullable().unique();
    table.decimal("counter");
    table.string("code");
    table.string("title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("urls");
};
