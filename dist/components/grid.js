'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_wepy$component) {
    _inherits(Grid, _wepy$component);

    function Grid() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(args))), _this), _this.methods = {
            tap: function tap(params) {
                wx.navigateTo({
                    url: 'category?id=' + params
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Grid;
}(_wepy2.default.component);

exports.default = Grid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWQuanMiXSwibmFtZXMiOlsiR3JpZCIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE8sR0FBVTtBQUNOQyxlQURNLGVBQ0ZDLE1BREUsRUFDSztBQUNQQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNLGlCQUFlSDtBQURYLGlCQUFkO0FBR0g7QUFMSyxTOzs7O0VBRHFCLGVBQUtJLFM7O2tCQUFuQlAsSSIsImZpbGUiOiJncmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAocGFyYW1zKXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybCA6ICdjYXRlZ29yeT9pZD0nK3BhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=