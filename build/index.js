"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _index = _interopRequireDefault(require("./routes/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
_dotenv.default.config();
const PORT = process.env.PORT;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Library",
      version: 1.0,
      description: "Swagger Api Documentation"
    },
    servers: [{
      url: process.env.SWAGGER_URL // Port Number on this URL must be the same as the Server Port Number 
    }]
  },

  apis: ['./src/routes/index.js', './src/config/swagger.js']
};
const specs = (0, _swaggerJsdoc.default)(options);
app.use('/myapi', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
app.use('', _index.default);
app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
var _default = app;
exports.default = _default;