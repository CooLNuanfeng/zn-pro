'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _avWeappMin = require('./utils/av-weapp-min.js');

var _avWeappMin2 = _interopRequireDefault(_avWeappMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//themeColor
var myConfig = {
  themeColor: '#51e886',
  themeimg: 'green/',
  cityname: 'My City',
  cityid: '370682'
};

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/attention', 'pages/user', 'pages/category', 'pages/detail', 'pages/publish', 'pages/about', 'pages/success'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'My City',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#999',
        selectedColor: '#51e886', //themeColor
        backgroundColor: '#fff',
        list: [{
          "pagePath": "pages/index",
          "selectedIconPath": "images/green/index.png", //themeColor
          "iconPath": "images/index_disable.png",
          "text": "首页"
        }, {
          "pagePath": "pages/attention",
          "selectedIconPath": "images/green/attention.png", //themeColor
          "iconPath": "images/attention_disable.png",
          "text": "关注"
        }, {
          "pagePath": "pages/user",
          "selectedIconPath": "images/green/user.png", //themeColor
          "iconPath": "images/user_disable.png",
          "text": "我的"
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      userNick: null,
      cityname: myConfig.cityname,
      cityid: myConfig.cityid,
      themeimg: myConfig.themeimg,
      domain: 'https://oyo2k3vrc.bkt.clouddn.com'
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var _this2 = this;

      var vm = this;
      vm.getUserInfo();

      _avWeappMin2.default.init({
        appId: 'jrFmFaxGJEJpF5hjhUkbiGtJ-gzGzoHsz',
        appKey: 'k8F2aQ6iRTCL0ULe6c8a4sRg'
      });
      _avWeappMin2.default.User.loginWithWeapp().then(function (user) {
        _this2.globalData.userInfo = user.toJSON();
        console.log(user.toJSON());
      }).catch(console.error);
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userNick) {
        return this.globalData.userNick;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userNick = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }, {
    key: 'timeFormate',
    value: function timeFormate(utc) {
      var oDate = new Date(utc);
      var year = oDate.getFullYear();
      var month = oDate.getMonth();
      var day = oDate.getDate();
      var hour = oDate.getHours();
      var min = oDate.getMinutes();
      var sec = oDate.getSeconds();
      return year + '-' + this.toDouble(month + 1) + '-' + this.toDouble(day) + ' ' + this.toDouble(hour) + ':' + this.toDouble(min);
    }
  }, {
    key: 'toDouble',
    value: function toDouble(number) {
      if (number < 9) {
        return '0' + number;
      } else {
        return number;
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJteUNvbmZpZyIsInRoZW1lQ29sb3IiLCJ0aGVtZWltZyIsImNpdHluYW1lIiwiY2l0eWlkIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwibGlzdCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJOaWNrIiwiZG9tYWluIiwidm0iLCJnZXRVc2VySW5mbyIsImluaXQiLCJhcHBJZCIsImFwcEtleSIsIlVzZXIiLCJsb2dpbldpdGhXZWFwcCIsInRoZW4iLCJ1c2VyIiwidG9KU09OIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJjYiIsInRoYXQiLCJzdWNjZXNzIiwicmVzIiwidXRjIiwib0RhdGUiLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW4iLCJnZXRNaW51dGVzIiwic2VjIiwiZ2V0U2Vjb25kcyIsInRvRG91YmxlIiwibnVtYmVyIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFHQTtBQUNBLElBQUlBLFdBQVc7QUFDWEMsY0FBYSxTQURGO0FBRVhDLFlBQVcsUUFGQTtBQUdYQyxZQUFXLFNBSEE7QUFJWEMsVUFBUztBQUpFLENBQWY7Ozs7O0FBNkRFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFyRGZDLE1BcURlLEdBckROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsaUJBRkssRUFHTCxZQUhLLEVBSUwsZ0JBSkssRUFLTCxjQUxLLEVBTUwsZUFOSyxF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RyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IEFWIGZyb20gJy4vdXRpbHMvYXYtd2VhcHAtbWluLmpzJztcclxuXHJcblxyXG4vL3RoZW1lQ29sb3JcclxudmFyIG15Q29uZmlnID0ge1xyXG4gICAgdGhlbWVDb2xvciA6ICcjNTFlODg2JyxcclxuICAgIHRoZW1laW1nIDogJ2dyZWVuLycsXHJcbiAgICBjaXR5bmFtZSA6ICdNeSBDaXR5JyxcclxuICAgIGNpdHlpZCA6ICczNzA2ODInXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9hdHRlbnRpb24nLFxyXG4gICAgICAncGFnZXMvdXNlcicsXHJcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXHJcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxyXG4gICAgICAncGFnZXMvcHVibGlzaCcsXHJcbiAgICAgICdwYWdlcy9hYm91dCcsXHJcbiAgICAgICdwYWdlcy9zdWNjZXNzJyxcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnTXkgQ2l0eScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICB9LFxyXG4gICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3IgOiAnIzUxZTg4NicsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogJyNmZmYnLFxyXG4gICAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9ncmVlbi9pbmRleC5wbmdcIiwgLy90aGVtZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaW5kZXhfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2F0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvZ3JlZW4vYXR0ZW50aW9uLnBuZ1wiLCAvL3RoZW1lQ29sb3JcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9hdHRlbnRpb25fZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5YWz5rOoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3VzZXJcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL3VzZXIucG5nXCIsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL3VzZXJfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHVzZXJOaWNrIDogbnVsbCxcclxuICAgIGNpdHluYW1lIDogbXlDb25maWcuY2l0eW5hbWUsXHJcbiAgICBjaXR5aWQgOiBteUNvbmZpZy5jaXR5aWQsXHJcbiAgICB0aGVtZWltZyA6IG15Q29uZmlnLnRoZW1laW1nLFxyXG4gICAgZG9tYWluIDogJ2h0dHBzOi8vb3lvMmszdnJjLmJrdC5jbG91ZGRuLmNvbScsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB2bS5nZXRVc2VySW5mbygpO1xyXG5cclxuXHJcbiAgICBBVi5pbml0KHtcclxuICAgICBhcHBJZDogJ2pyRm1GYXhHSkVKcEY1aGpoVWtiaUd0Si1nekd6b0hzeicsXHJcbiAgICAgYXBwS2V5OiAnazhGMmFRNmlSVENMMFVMZTZjOGE0c1JnJyxcclxuICAgIH0pO1xyXG4gICAgQVYuVXNlci5sb2dpbldpdGhXZWFwcCgpLnRoZW4odXNlciA9PiB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXIudG9KU09OKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXIudG9KU09OKCkpO1xyXG4gICAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlck5pY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VyTmljaztcclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlck5pY2sgPSByZXMudXNlckluZm87XHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHRpbWVGb3JtYXRlKHV0Yyl7XHJcbiAgICB2YXIgb0RhdGUgPSBuZXcgRGF0ZSh1dGMpO1xyXG4gICAgdmFyIHllYXIgPSBvRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG1vbnRoID0gb0RhdGUuZ2V0TW9udGgoKTtcclxuICAgIHZhciBkYXkgPSBvRGF0ZS5nZXREYXRlKCk7XHJcbiAgICB2YXIgaG91ciA9IG9EYXRlLmdldEhvdXJzKCk7XHJcbiAgICB2YXIgbWluID0gb0RhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgdmFyIHNlYyA9IG9EYXRlLmdldFNlY29uZHMoKTtcclxuICAgIHJldHVybiB5ZWFyKyctJyt0aGlzLnRvRG91YmxlKG1vbnRoKzEpKyctJyt0aGlzLnRvRG91YmxlKGRheSkrJyAnK3RoaXMudG9Eb3VibGUoaG91cikrJzonK3RoaXMudG9Eb3VibGUobWluKTtcclxuICB9XHJcbiAgdG9Eb3VibGUobnVtYmVyKXtcclxuICAgICAgaWYobnVtYmVyPDkpe1xyXG4gICAgICAgICAgcmV0dXJuICcwJytudW1iZXI7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19