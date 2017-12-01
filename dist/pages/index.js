'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _location = require('./../components/location.js');

var _location2 = _interopRequireDefault(_location);

var _grid = require('./../components/grid.js');

var _grid2 = _interopRequireDefault(_grid);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Toast from 'wepy-com-toast'

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
            location: _location2.default,
            gird: _grid2.default,
            footer: _footer2.default
        }, _this.data = {
            themeimg: ''
        }, _this.methods = {
            goDetail: function goDetail(params) {
                console.log(params);
                wx.navigateTo({
                    url: 'detail'
                });
            },
            publish: function publish() {
                wx.navigateTo({
                    url: 'publish'
                });
            },
            about: function about() {
                wx.navigateTo({
                    url: 'about'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.globalData.themeimg;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var ref = this.$parent.getWilddog('/newslist');
            ref.orderByChild('updated').limitToLast(20).on('value', function (snapshot) {
                console.log(snapshot.val());
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImxvY2F0aW9uIiwiZ2lyZCIsImZvb3RlciIsImRhdGEiLCJ0aGVtZWltZyIsIm1ldGhvZHMiLCJnb0RldGFpbCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwdWJsaXNoIiwiYWJvdXQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInJlZiIsImdldFdpbGRkb2ciLCJvcmRlckJ5Q2hpbGQiLCJsaW1pdFRvTGFzdCIsIm9uIiwic25hcHNob3QiLCJ2YWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUyxFLFFBR1RDLFUsR0FBYTtBQUNUQyx3Q0FEUztBQUVUQyxnQ0FGUztBQUdUQztBQUhTLFMsUUFLYkMsSSxHQUFPO0FBQ0hDLHNCQUFXO0FBRFIsUyxRQUdQQyxPLEdBQVU7QUFDTkMsb0JBRE0sb0JBQ0dDLE1BREgsRUFDVTtBQUNaQyx3QkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0FHLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdILGFBTks7QUFPTkMsbUJBUE0scUJBT0c7QUFDTEgsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0gsYUFYSztBQVlORSxpQkFaTSxtQkFZQztBQUNISixtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSDtBQWhCSyxTOzs7OztpQ0FrQkY7QUFDSixpQkFBS1IsUUFBTCxHQUFnQixLQUFLVyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JaLFFBQXhDO0FBQ0g7OztpQ0FDTztBQUNKLGdCQUFJYSxNQUFNLEtBQUtGLE9BQUwsQ0FBYUcsVUFBYixDQUF3QixXQUF4QixDQUFWO0FBQ0FELGdCQUFJRSxZQUFKLENBQWlCLFNBQWpCLEVBQTRCQyxXQUE1QixDQUF3QyxFQUF4QyxFQUE0Q0MsRUFBNUMsQ0FBK0MsT0FBL0MsRUFBdUQsVUFBU0MsUUFBVCxFQUFrQjtBQUN0RWQsd0JBQVFDLEdBQVIsQ0FBWWEsU0FBU0MsR0FBVCxFQUFaO0FBQ0YsYUFGRDtBQUdIOzs7O0VBdEM4QixlQUFLQyxJOztrQkFBbkIzQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2NhdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL2xvY2F0aW9uJ1xuICBpbXBvcnQgR3JpZCBmcm9tICcuLi9jb21wb25lbnRzL2dyaWQnXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInXG4gIC8vIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICBjb25maWcgPSB7XG5cbiAgICAgIH07XG4gICAgICBjb21wb25lbnRzID0ge1xuICAgICAgICAgIGxvY2F0aW9uIDogTG9jYXRpb24sXG4gICAgICAgICAgZ2lyZCA6IEdyaWQsXG4gICAgICAgICAgZm9vdGVyIDogRm9vdGVyXG4gICAgICB9O1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgICB0aGVtZWltZyA6ICcnLFxuICAgICAgfTtcbiAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgZ29EZXRhaWwocGFyYW1zKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAnZGV0YWlsJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHB1Ymxpc2goKXtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAncHVibGlzaCdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhYm91dCgpe1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdhYm91dCdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgb25Mb2FkKCl7XG4gICAgICAgICAgdGhpcy50aGVtZWltZyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRoZW1laW1nO1xuICAgICAgfVxuICAgICAgb25TaG93KCl7XG4gICAgICAgICAgdmFyIHJlZiA9IHRoaXMuJHBhcmVudC5nZXRXaWxkZG9nKCcvbmV3c2xpc3QnKTtcbiAgICAgICAgICByZWYub3JkZXJCeUNoaWxkKCd1cGRhdGVkJykubGltaXRUb0xhc3QoMjApLm9uKCd2YWx1ZScsZnVuY3Rpb24oc25hcHNob3Qpe1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgfVxuIl19