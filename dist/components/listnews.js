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

var ListNews = function (_wepy$component) {
    _inherits(ListNews, _wepy$component);

    function ListNews() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListNews);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListNews.__proto__ || Object.getPrototypeOf(ListNews)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.methods = {
            goDetail: function goDetail(params) {
                console.log(params);
                wx.navigateTo({
                    url: 'detail'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ListNews;
}(_wepy2.default.component);

exports.default = ListNews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3RuZXdzLmpzIl0sIm5hbWVzIjpbIkxpc3ROZXdzIiwiZGF0YSIsIm1ldGhvZHMiLCJnb0RldGFpbCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTyxFLFFBR1BDLE8sR0FBVTtBQUNOQyxvQkFETSxvQkFDR0MsTUFESCxFQUNVO0FBQ1pDLHdCQUFRQyxHQUFSLENBQVlGLE1BQVo7QUFDQUcsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0g7QUFOSyxTOzs7O0VBSndCLGVBQUtDLFM7O2tCQUF0QlYsUSIsImZpbGUiOiJsaXN0bmV3cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0TmV3cyBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG5cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZ29EZXRhaWwocGFyYW1zKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmwgOiAnZGV0YWlsJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=