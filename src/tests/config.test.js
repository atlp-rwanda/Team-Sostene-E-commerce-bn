const assert = require('assert');
const config = require('../db/config/config');

describe('Configuration', function() {
  describe('development', function() {
    it('should have the correct database credentials', function() {
      assert.strictEqual(config.development.username, process.env.POSTGRES_USER);
      assert.strictEqual(config.development.password, process.env.POSTGRES_PASSWORD);
      assert.strictEqual(config.development.database, process.env.POSTGRES_DB);
      assert.strictEqual(config.development.host, process.env.POSTGRES_HOST);
      assert.strictEqual(config.development.dialect, process.env.POSTGRES_DIALECT);
      assert.strictEqual(config.development.port, process.env.POSTGRES_PORT);
    });
  });

  describe('test', function() {
    it('should have the correct database credentials', function() {
      assert.strictEqual(config.test.username, process.env.POSTGRES_USER);
      assert.strictEqual(config.test.password, process.env.POSTGRES_PASSWORD);
      assert.strictEqual(config.test.database, process.env.POSTGRES_DB);
      assert.strictEqual(config.test.host, process.env.POSTGRES_HOST);
      assert.strictEqual(config.test.dialect, process.env.POSTGRES_DIALECT);
      assert.strictEqual(config.test.port, process.env.POSTGRES_PORT);
    });
  });

  describe('production', function() {
    it('should have the correct database credentials', function() {
      assert.strictEqual(config.production.username, process.env.POSTGRES_USER);
      assert.strictEqual(config.production.password, process.env.POSTGRES_PASSWORD);
      assert.strictEqual(config.production.database, process.env.POSTGRES_DB);
      assert.strictEqual(config.production.host, process.env.POSTGRES_HOST);
      assert.strictEqual(config.production.dialect, process.env.POSTGRES_DIALECT);
      assert.strictEqual(config.production.port, process.env.POSTGRES_PORT);
    });
  });
});
