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

var Footer = function (_wepy$component) {
    _inherits(Footer, _wepy$component);

    function Footer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Footer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Footer.__proto__ || Object.getPrototypeOf(Footer)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            cityname: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Footer, [{
        key: 'onLoad',
        value: function onLoad() {
            // console.log(this.$parent.$parent.globalData);
            this.cityname = this.$parent.$parent.globalData.cityname;
        }
    }]);

    return Footer;
}(_wepy2.default.component);

exports.default = Footer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyJdLCJuYW1lcyI6WyJGb290ZXIiLCJkYXRhIiwiY2l0eW5hbWUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVc7QUFEUixTOzs7OztpQ0FHQztBQUNKO0FBQ0EsaUJBQUtBLFFBQUwsR0FBZ0IsS0FBS0MsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ0YsUUFBaEQ7QUFDSDs7OztFQVArQixlQUFLRyxTOztrQkFBcEJMLE0iLCJmaWxlIjoiZm9vdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgY2l0eW5hbWUgOiAnJyxcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEpO1xuICAgICAgICB0aGlzLmNpdHluYW1lID0gdGhpcy4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS5jaXR5bmFtZTtcbiAgICB9XG59XG4iXX0=