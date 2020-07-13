const { PORT, NODE_ENV, TEST_DATABASE_URL, JWT_SECRET } = process.env;

module.exports = {
  PORT: PORT || 8080,
  NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://rallier@localhost/rally",
  TEST_DATABASE_URL,
  JWT_SECRET
};