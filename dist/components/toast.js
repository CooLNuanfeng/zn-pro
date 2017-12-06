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
            load: false,
            hidden: true,
            infoObj: null
        }, _this.methods = {
            show: function show(params) {
                var vm = this;
                vm.infoObj = params;
                vm.hidden = false;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    vm.hidden = true;
                    vm.$apply();
                }, 2000);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Toast, [{
        key: 'onLoad',
        value: function onLoad() {
            this.load = true;
        }
    }]);

    return Toast;
}(_wepy2.default.component);

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbInRpbWVyIiwiVG9hc3QiLCJkYXRhIiwibG9hZCIsImhpZGRlbiIsImluZm9PYmoiLCJtZXRob2RzIiwic2hvdyIsInBhcmFtcyIsInZtIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVEsSUFBWjs7SUFDcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLGtCQUFPLEtBREo7QUFFSEMsb0JBQVMsSUFGTjtBQUdIQyxxQkFBVTtBQUhQLFMsUUFLUEMsTyxHQUFVO0FBQ05DLGdCQURNLGdCQUNEQyxNQURDLEVBQ007QUFDUixvQkFBSUMsS0FBSyxJQUFUO0FBQ0FBLG1CQUFHSixPQUFILEdBQWFHLE1BQWI7QUFDQUMsbUJBQUdMLE1BQUgsR0FBWSxLQUFaO0FBQ0FNLDZCQUFhVixLQUFiO0FBQ0FBLHdCQUFRVyxXQUFXLFlBQU07QUFDckJGLHVCQUFHTCxNQUFILEdBQVksSUFBWjtBQUNBSyx1QkFBR0csTUFBSDtBQUNILGlCQUhPLEVBR0wsSUFISyxDQUFSO0FBSUg7QUFWSyxTOzs7OztpQ0FZRjtBQUNKLGlCQUFLVCxJQUFMLEdBQVksSUFBWjtBQUNIOzs7O0VBcEI4QixlQUFLVSxTOztrQkFBbkJaLEsiLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xudmFyIHRpbWVyID0gbnVsbDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvYXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgbG9hZCA6IGZhbHNlLFxuICAgICAgICBoaWRkZW4gOiB0cnVlLFxuICAgICAgICBpbmZvT2JqIDogbnVsbFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzaG93KHBhcmFtcyl7XG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgdm0uaW5mb09iaiA9IHBhcmFtcztcbiAgICAgICAgICAgIHZtLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdm0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2bS4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmxvYWQgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==