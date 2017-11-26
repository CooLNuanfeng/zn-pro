'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_wepy$page) {
    _inherits(About, _wepy$page);

    function About() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, About);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = About.__proto__ || Object.getPrototypeOf(About)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            cityname: ''
        }, _this.components = {
            footer: _footer2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(About, [{
        key: 'onLoad',
        value: function onLoad() {
            this.cityname = this.$parent.globalData.cityname;
        }
    }]);

    return About;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(About , 'pages/about'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LmpzIl0sIm5hbWVzIjpbIkFib3V0IiwiZGF0YSIsImNpdHluYW1lIiwiY29tcG9uZW50cyIsImZvb3RlciIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTztBQUNIQyxzQkFBVztBQURSLFMsUUFHUEMsVSxHQUFhO0FBQ1RDO0FBRFMsUzs7Ozs7aUNBR0w7QUFDSixpQkFBS0YsUUFBTCxHQUFnQixLQUFLRyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JKLFFBQXhDO0FBQ0g7Ozs7RUFUOEIsZUFBS0ssSTs7a0JBQW5CUCxLIiwiZmlsZSI6ImFib3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJvdXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGNpdHluYW1lIDogJydcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGZvb3RlciA6IEZvb3RlclxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuY2l0eW5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaXR5bmFtZTtcbiAgICB9XG59XG4iXX0=