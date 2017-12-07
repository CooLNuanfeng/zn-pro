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

var Swiper = function (_wepy$component) {
    _inherits(Swiper, _wepy$component);

    function Swiper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Swiper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            dots: false,
            autoplay: false
        }, _this.props = {
            imgUrls: Object,
            info: Object
        }, _this.watch = {
            imgUrls: function imgUrls(newValue, oldValue) {
                console.log('newValue', newValue);
                console.log('oldValue', oldValue);
                if (newValue && newValue.length > 1) {
                    this.dots = true;
                    this.autoplay = true;
                    this.$apply();
                    console.log(this.dots, this.autoplay);
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Swiper;
}(_wepy2.default.component);

exports.default = Swiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJTd2lwZXIiLCJkYXRhIiwiZG90cyIsImF1dG9wbGF5IiwicHJvcHMiLCJpbWdVcmxzIiwiT2JqZWN0IiwiaW5mbyIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLEksR0FBTztBQUNIQyxrQkFBTyxLQURKO0FBRUhDLHNCQUFXO0FBRlIsUyxRQUlQQyxLLEdBQVE7QUFDSkMscUJBQVVDLE1BRE47QUFFSkMsa0JBQU9EO0FBRkgsUyxRQUlSRSxLLEdBQVE7QUFDSkgsbUJBREksbUJBQ0lJLFFBREosRUFDYUMsUUFEYixFQUNzQjtBQUN0QkMsd0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXVCSCxRQUF2QjtBQUNBRSx3QkFBUUMsR0FBUixDQUFZLFVBQVosRUFBdUJGLFFBQXZCO0FBQ0Esb0JBQUdELFlBQVlBLFNBQVNJLE1BQVQsR0FBZ0IsQ0FBL0IsRUFBaUM7QUFDN0IseUJBQUtYLElBQUwsR0FBWSxJQUFaO0FBQ0EseUJBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSx5QkFBS1csTUFBTDtBQUNBSCw0QkFBUUMsR0FBUixDQUFZLEtBQUtWLElBQWpCLEVBQXNCLEtBQUtDLFFBQTNCO0FBQ0g7QUFDSjtBQVZHLFM7Ozs7RUFUd0IsZUFBS1ksUzs7a0JBQXBCZixNIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3aXBlciBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGRvdHMgOiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXkgOiBmYWxzZVxuICAgIH1cbiAgICBwcm9wcyA9IHtcbiAgICAgICAgaW1nVXJscyA6IE9iamVjdCxcbiAgICAgICAgaW5mbyA6IE9iamVjdFxuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICAgICAgaW1nVXJscyhuZXdWYWx1ZSxvbGRWYWx1ZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3VmFsdWUnLG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbGRWYWx1ZScsb2xkVmFsdWUpO1xuICAgICAgICAgICAgaWYobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoPjEpe1xuICAgICAgICAgICAgICAgIHRoaXMuZG90cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRvdHMsdGhpcy5hdXRvcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=