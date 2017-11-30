'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListNews.__proto__ || Object.getPrototypeOf(ListNews)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            themeimg: ''
        }, _this.methods = {
            goDetail: function goDetail(params) {
                console.log(params);
                wx.navigateTo({
                    url: 'detail'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListNews, [{
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.$parent.globalData.themeimg;
        }
    }]);

    return ListNews;
}(_wepy2.default.component);

exports.default = ListNews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3RuZXdzLmpzIl0sIm5hbWVzIjpbIkxpc3ROZXdzIiwiZGF0YSIsInRoZW1laW1nIiwibWV0aG9kcyIsImdvRGV0YWlsIiwicGFyYW1zIiwiY29uc29sZSIsImxvZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTztBQUNIQyxzQkFBVztBQURSLFMsUUFHUEMsTyxHQUFVO0FBQ05DLG9CQURNLG9CQUNHQyxNQURILEVBQ1U7QUFDWkMsd0JBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBRyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSDtBQU5LLFM7Ozs7O2lDQVFGO0FBQ0osaUJBQUtSLFFBQUwsR0FBZ0IsS0FBS1MsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ1YsUUFBaEQ7QUFDSDs7OztFQWRpQyxlQUFLVyxTOztrQkFBdEJiLFEiLCJmaWxlIjoibGlzdG5ld3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdE5ld3MgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aGVtZWltZyA6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGdvRGV0YWlsKHBhcmFtcyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ2RldGFpbCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy50aGVtZWltZyA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEudGhlbWVpbWc7XG4gICAgfVxufVxuIl19