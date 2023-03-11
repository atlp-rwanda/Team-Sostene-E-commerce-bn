"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This is where routers will be

// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 * 
 */

const Router = _express.default.Router();
Router.get('/test', (req, res) => {
  res.status(200).json({
    "message": "TESTED"
  });
});
var _default = Router;
exports.default = _default;