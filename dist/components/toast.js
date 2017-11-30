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

var timer = null;

var Toast = function (_wepy$component) {
    _inherits(Toast, _wepy$component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            hidden: true,
            infoObj: null
        }, _this.methods = {
            show: function show(params) {
                var _this2 = this;

                this.infoObj = params;
                this.hidden = false;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    _this2.hidden = true;
                    _this2.$apply();
                }, 2000);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Toast;
}(_wepy2.default.component);

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwiVG9hc3QiLCJkYXRhIiwiaGlkZGVuIiwiaW5mb09iaiIsIm1ldGhvZHMiLCJzaG93IiwicGFyYW1zIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxRQUFRLElBQVo7O0lBQ3FCQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTztBQUNIQyxvQkFBUyxJQUROO0FBRUhDLHFCQUFVO0FBRlAsUyxRQUlQQyxPLEdBQVU7QUFDTkMsZ0JBRE0sZ0JBQ0RDLE1BREMsRUFDTTtBQUFBOztBQUNSLHFCQUFLSCxPQUFMLEdBQWVHLE1BQWY7QUFDQSxxQkFBS0osTUFBTCxHQUFjLEtBQWQ7QUFDQUssNkJBQWFSLEtBQWI7QUFDQUEsd0JBQVFTLFdBQVcsWUFBTTtBQUNyQiwyQkFBS04sTUFBTCxHQUFjLElBQWQ7QUFDQSwyQkFBS08sTUFBTDtBQUNILGlCQUhPLEVBR0wsSUFISyxDQUFSO0FBSUg7QUFUSyxTOzs7O0VBTHFCLGVBQUtDLFM7O2tCQUFuQlYsSyIsImZpbGUiOiJ0b2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG52YXIgdGltZXIgPSBudWxsO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9hc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICBoaWRkZW4gOiB0cnVlLFxuICAgICAgICBpbmZvT2JqIDogbnVsbFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzaG93KHBhcmFtcyl7XG4gICAgICAgICAgICB0aGlzLmluZm9PYmogPSBwYXJhbXM7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==