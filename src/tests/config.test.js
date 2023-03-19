const assert = require('assert');
const config = require('../database/config/config');

describe('Configuration', () => {
  describe('development', () => {
    it('should have the correct database credentials', () => {
      assert.strictEqual(config.development.url, process.env.DEV_DATABASE_URL);
      assert.strictEqual(config.development.dialect, process.env.POSTGRES_DIALECT);
    });
  });

  describe('test', () => {
    it('should have the correct database credentials', () => {
      assert.strictEqual(config.test.url, process.env.TEST_DATABASE_URL);
      assert.strictEqual(config.test.dialect, process.env.POSTGRES_DIALECT);
    });
  });

  describe('production', () => {
    it('should have the correct database credentials', () => {
      assert.strictEqual(config.production.url, process.env.DATABASE_URL);
      assert.strictEqual(config.production.dialect, process.env.POSTGRES_DIALECT);
    });
  });
});
