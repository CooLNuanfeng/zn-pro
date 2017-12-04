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
            this.userInfo = this.$parent.globalData.userNick;
            this.cityname = this.$parent.globalData.cityname;
        }
    }]);

    return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImRhdGEiLCJ1c2VySW5mbyIsImNpdHluYW1lIiwiY29tcG9uZW50cyIsImZvb3RlciIsIm1ldGhvZHMiLCJhYm91dFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJOaWNrIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLEksR0FBTztBQUNIQyxzQkFBVyxJQURSO0FBRUhDLHNCQUFXO0FBRlIsUyxRQUlQQyxVLEdBQWE7QUFDVEM7QUFEUyxTLFFBR2JDLE8sR0FBVTtBQUNOQyxxQkFETSx1QkFDSztBQUNQQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1pDLHlCQUFLO0FBRE8saUJBQWQ7QUFHSDtBQUxLLFM7Ozs7O2lDQU9GO0FBQ0osaUJBQUtSLFFBQUwsR0FBZ0IsS0FBS1MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QztBQUNBLGlCQUFLVixRQUFMLEdBQWdCLEtBQUtRLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlQsUUFBeEM7QUFDSDs7OztFQWxCNkIsZUFBS1csSTs7a0JBQWxCZCxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VySW5mbyA6IG51bGwsXG4gICAgICAgIGNpdHluYW1lIDogJycsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICBmb290ZXIgOiBGb290ZXJcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFib3V0UGFnZSgpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJ2Fib3V0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlck5pY2s7XG4gICAgICAgIHRoaXMuY2l0eW5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaXR5bmFtZTtcbiAgICB9O1xufVxuIl19