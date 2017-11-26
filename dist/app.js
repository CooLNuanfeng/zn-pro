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
      pages: ['pages/index', 'pages/attention', 'pages/user', 'pages/category', 'pages/detail', 'pages/publish', 'pages/about'],
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
          "selectedIconPath": "images/green/index.png",
          "iconPath": "images/index_disable.png",
          "text": "首页"
        }, {
          "pagePath": "pages/attention",
          "selectedIconPath": "images/green/attention.png",
          "iconPath": "images/attention_disable.png",
          "text": "关注"
        }, {
          "pagePath": "pages/user",
          "selectedIconPath": "images/green/user.png",
          "iconPath": "images/user_disable.png",
          "text": "我的"
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      cityname: 'My City',
      cityid: '370682',
      themeimg: 'green/'
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.getUserInfo();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiY2l0eW5hbWUiLCJjaXR5aWQiLCJ0aGVtZWltZyIsImdldFVzZXJJbmZvIiwiY2IiLCJ0aGF0Iiwic3VjY2VzcyIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQXFERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBbERmQSxNQWtEZSxHQWxETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGlCQUZLLEVBR0wsWUFISyxFQUlMLGdCQUpLLEVBS0wsY0FMSyxFQU1MLGVBTkssRUFPTCxhQVBLLENBREE7QUFVUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFNBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVZEO0FBZ0JOQyxjQUFRO0FBQ0hDLGVBQU8sTUFESjtBQUVIQyx1QkFBZ0IsU0FGYjtBQUdIQyx5QkFBa0IsTUFIZjtBQUlIQyxjQUFNLENBQ0Y7QUFDSSxzQkFBWSxhQURoQjtBQUVJLDhCQUFvQix3QkFGeEI7QUFHSSxzQkFBWSwwQkFIaEI7QUFJSSxrQkFBUTtBQUpaLFNBREUsRUFPRjtBQUNJLHNCQUFZLGlCQURoQjtBQUVJLDhCQUFvQiw0QkFGeEI7QUFHSSxzQkFBWSw4QkFIaEI7QUFJSSxrQkFBUTtBQUpaLFNBUEUsRUFhRjtBQUNJLHNCQUFZLFlBRGhCO0FBRUksOEJBQW9CLHVCQUZ4QjtBQUdJLHNCQUFZLHlCQUhoQjtBQUlJLGtCQUFRO0FBSlosU0FiRTtBQUpIO0FBaEJGLEtBa0RNO0FBQUEsVUFQZkMsVUFPZSxHQVBGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsZ0JBQVcsU0FGQTtBQUdYQyxjQUFTLFFBSEU7QUFJWEMsZ0JBQVc7QUFKQSxLQU9FO0FBQUE7QUFFZDs7OzsrQkFFVTtBQUNQLFdBQUtDLFdBQUw7QUFDSDs7O2dDQUdXQyxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtQLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLSSxXQUFMLENBQWlCO0FBQ2ZHLGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNaRixlQUFLUCxVQUFMLENBQWdCQyxRQUFoQixHQUEyQlEsSUFBSVIsUUFBL0I7QUFDQUssZ0JBQU1BLEdBQUdHLElBQUlSLFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQXZFMEIsZUFBS1MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2F0dGVudGlvbicsXHJcbiAgICAgICdwYWdlcy91c2VyJyxcclxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcclxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcclxuICAgICAgJ3BhZ2VzL2Fib3V0JyxcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnTXkgQ2l0eScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICB9LFxyXG4gICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3IgOiAnIzUxZTg4NicsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnI2ZmZicsXHJcbiAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5kZXhcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL2luZGV4LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2luZGV4X2Rpc2FibGUucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIummlumhtVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9hdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL2F0dGVudGlvbi5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9hdHRlbnRpb25fZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5YWz5rOoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3VzZXJcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL3VzZXIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvdXNlcl9kaXNhYmxlLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLmiJHnmoRcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgY2l0eW5hbWUgOiAnTXkgQ2l0eScsXHJcbiAgICBjaXR5aWQgOiAnMzcwNjgyJyxcclxuICAgIHRoZW1laW1nIDogJ2dyZWVuLydcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgICB0aGlzLmdldFVzZXJJbmZvKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==