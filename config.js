exports.DATABASE_URL = process.env.DATABASE_URL ||
                      'mongodb://localhost/idim-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/test-idim-app';
exports.PORT = process.env.PORT || 8080;