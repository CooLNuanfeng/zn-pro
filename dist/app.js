'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/attention', 'pages/user', 'pages/category', 'pages/detail', 'pages/publish'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'My City',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#999',
        selectedColor: '#51e886',
        backgroundColor: '#fff',
        list: [{
          "pagePath": "pages/index",
          "selectedIconPath": "images/index.png",
          "iconPath": "images/index_disable.png",
          "text": "首页"
        }, {
          "pagePath": "pages/attention",
          "selectedIconPath": "images/attention.png",
          "iconPath": "images/attention_disable.png",
          "text": "关注"
        }, {
          "pagePath": "pages/user",
          "selectedIconPath": "images/user.png",
          "iconPath": "images/user_disable.png",
          "text": "我的"
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }, {
    key: 'getloactionInfo',
    value: function getloactionInfo() {
      return {
        cityname: 'My City',
        cityid: '370682'
      };
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiY2l0eW5hbWUiLCJjaXR5aWQiLCJjYiIsInRoYXQiLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFpREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTlDZkEsTUE4Q2UsR0E5Q047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxpQkFGSyxFQUdMLFlBSEssRUFJTCxnQkFKSyxFQUtMLGNBTEssRUFNTCxlQU5LLENBREE7QUFTUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFNBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVREO0FBZU5DLGNBQVE7QUFDSEMsZUFBTyxNQURKO0FBRUhDLHVCQUFnQixTQUZiO0FBR0hDLHlCQUFrQixNQUhmO0FBSUhDLGNBQU0sQ0FDRjtBQUNJLHNCQUFZLGFBRGhCO0FBRUksOEJBQW9CLGtCQUZ4QjtBQUdJLHNCQUFZLDBCQUhoQjtBQUlJLGtCQUFRO0FBSlosU0FERSxFQU9GO0FBQ0ksc0JBQVksaUJBRGhCO0FBRUksOEJBQW9CLHNCQUZ4QjtBQUdJLHNCQUFZLDhCQUhoQjtBQUlJLGtCQUFRO0FBSlosU0FQRSxFQWFGO0FBQ0ksc0JBQVksWUFEaEI7QUFFSSw4QkFBb0IsaUJBRnhCO0FBR0ksc0JBQVkseUJBSGhCO0FBSUksa0JBQVE7QUFKWixTQWJFO0FBSkg7QUFmRixLQThDTTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7QUFBQTtBQUVkOzs7OytCQUVVLENBRVY7OztzQ0FFZ0I7QUFDYixhQUFPO0FBQ0hDLGtCQUFXLFNBRFI7QUFFSEMsZ0JBQVM7QUFGTixPQUFQO0FBSUg7OztnQ0FFV0MsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLTCxVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS0ssV0FBTCxDQUFpQjtBQUNmQyxlQURlLG1CQUNOQyxHQURNLEVBQ0Q7QUFDWkgsZUFBS0wsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJPLElBQUlQLFFBQS9CO0FBQ0FHLGdCQUFNQSxHQUFHSSxJQUFJUCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUF6RTBCLGVBQUtRLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9hdHRlbnRpb24nLFxyXG4gICAgICAncGFnZXMvdXNlcicsXHJcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXHJcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxyXG4gICAgICAncGFnZXMvcHVibGlzaCdcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnTXkgQ2l0eScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICB9LFxyXG4gICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3IgOiAnIzUxZTg4NicsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnI2ZmZicsXHJcbiAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5kZXhcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2luZGV4LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2luZGV4X2Rpc2FibGUucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIummlumhtVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9hdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2F0dGVudGlvbi5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9hdHRlbnRpb25fZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5YWz5rOoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3VzZXJcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL3VzZXIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvdXNlcl9kaXNhYmxlLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLmiJHnmoRcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBnZXRsb2FjdGlvbkluZm8oKXtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGNpdHluYW1lIDogJ015IENpdHknLFxyXG4gICAgICAgICAgY2l0eWlkIDogJzM3MDY4MidcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==