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

var User = function (_wepy$page) {
    _inherits(User, _wepy$page);

    function User() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, User);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            userInfo: null,
            cityname: ''
        }, _this.components = {
            footer: _footer2.default
        }, _this.methods = {
            aboutPage: function aboutPage() {
                wx.navigateTo({
                    url: 'about'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(User, [{
        key: 'onLoad',
        value: function onLoad() {
            this.userInfo = this.$parent.globalData.userInfo;
            this.cityname = this.$parent.globalData.cityname;
            console.log(this.userInfo);
        }
    }]);

    return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImRhdGEiLCJ1c2VySW5mbyIsImNpdHluYW1lIiwiY29tcG9uZW50cyIsImZvb3RlciIsIm1ldGhvZHMiLCJhYm91dFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFXLElBRFI7QUFFSEMsc0JBQVc7QUFGUixTLFFBSVBDLFUsR0FBYTtBQUNUQztBQURTLFMsUUFHYkMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNLO0FBQ1BDLG1CQUFHQyxVQUFILENBQWM7QUFDWkMseUJBQUs7QUFETyxpQkFBZDtBQUdIO0FBTEssUzs7Ozs7aUNBT0Y7QUFDSixpQkFBS1IsUUFBTCxHQUFnQixLQUFLUyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JWLFFBQXhDO0FBQ0EsaUJBQUtDLFFBQUwsR0FBZ0IsS0FBS1EsT0FBTCxDQUFhQyxVQUFiLENBQXdCVCxRQUF4QztBQUNBVSxvQkFBUUMsR0FBUixDQUFZLEtBQUtaLFFBQWpCO0FBQ0g7Ozs7RUFuQjZCLGVBQUthLEk7O2tCQUFsQmYsSSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlckluZm8gOiBudWxsLFxuICAgICAgICBjaXR5bmFtZSA6ICcnLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgZm9vdGVyIDogRm9vdGVyXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBhYm91dFBhZ2UoKXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICdhYm91dCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xuICAgICAgICB0aGlzLmNpdHluYW1lID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2l0eW5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckluZm8pO1xuICAgIH07XG59XG4iXX0=