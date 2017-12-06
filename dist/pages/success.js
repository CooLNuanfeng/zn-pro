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

var Success = function (_wepy$page) {
    _inherits(Success, _wepy$page);

    function Success() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Success);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Success.__proto__ || Object.getPrototypeOf(Success)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            cityname: ''
        }, _this.components = {
            footer: _footer2.default
        }, _this.methods = {
            goPublish: function goPublish() {
                wx.redirectTo({
                    url: 'publish'
                });
            },
            goIndex: function goIndex() {
                var vm = this;
                wx.switchTab({
                    url: 'index',
                    success: function success() {
                        vm.$parent.globalData.refresh = true;
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Success, [{
        key: 'onLoad',
        value: function onLoad() {
            this.cityname = this.$parent.globalData.cityname;
        }
    }]);

    return Success;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Success , 'pages/success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiU3VjY2VzcyIsImRhdGEiLCJjaXR5bmFtZSIsImNvbXBvbmVudHMiLCJmb290ZXIiLCJtZXRob2RzIiwiZ29QdWJsaXNoIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29JbmRleCIsInZtIiwic3dpdGNoVGFiIiwic3VjY2VzcyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicmVmcmVzaCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVc7QUFEUixTLFFBR1BDLFUsR0FBYTtBQUNUQztBQURTLFMsUUFNYkMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNLO0FBQ1BDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdILGFBTEs7QUFNTkMsbUJBTk0scUJBTUc7QUFDTCxvQkFBSUMsS0FBSyxJQUFUO0FBQ0FKLG1CQUFHSyxTQUFILENBQWE7QUFDVEgseUJBQU0sT0FERztBQUVUSSw2QkFBVSxtQkFBVTtBQUNoQkYsMkJBQUdHLE9BQUgsQ0FBV0MsVUFBWCxDQUFzQkMsT0FBdEIsR0FBZ0MsSUFBaEM7QUFDSDtBQUpRLGlCQUFiO0FBTUg7QUFkSyxTOzs7OztpQ0FIRjtBQUNKLGlCQUFLZCxRQUFMLEdBQWdCLEtBQUtZLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmIsUUFBeEM7QUFDSDs7OztFQVRnQyxlQUFLZSxJOztrQkFBckJqQixPIiwiZmlsZSI6InN1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1Y2Nlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGNpdHluYW1lIDogJydcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgZm9vdGVyIDogRm9vdGVyXG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5jaXR5bmFtZSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNpdHluYW1lO1xuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZ29QdWJsaXNoKCl7XG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICB1cmwgOiAncHVibGlzaCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnb0luZGV4KCl7XG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmwgOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2bS4kcGFyZW50Lmdsb2JhbERhdGEucmVmcmVzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=