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

var wilddog = require('./utils/wilddog-weapp-all.js');

var willddogConfig = {
  syncURL: 'https://wd7517932122kqjqww.wilddogio.com',
  authDomain: 'wd7517932122kqjqww.wilddog.com'

  //themeColor
};var myConfig = {
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
      pages: ['pages/index', 'pages/attention', 'pages/user', 'pages/category', 'pages/detail', 'pages/publish', 'pages/about'],
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
      cityname: myConfig.cityname,
      cityid: myConfig.cityid,
      themeimg: myConfig.themeimg
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var self = this;
      wilddog.initializeApp(willddogConfig);
      // self.getUserInfo();
      //这个地方使用野狗登录微信小程序的方法,可以获得微信返回的openId,用户名称等等信息,这些信息会存在野狗的控制台的身份人认证部分。
      wilddog.auth().signInWeapp().then(function (user) {
        console.log(user, 'user wilddog');
        self.globalData.userInfo = {
          nickName: user.displayName,
          avatarUrl: user.photoURL,
          uid: user.uid
        };
      }).catch(function (err) {
        console.log(err, '认证异常');
      });
    }
  }, {
    key: 'getWilddogData',
    value: function getWilddogData() {
      return wilddog;
    }

    // getUserInfo(cb) {
    //   const that = this;
    //   if (this.globalData.userInfo) {
    //     return this.globalData.userInfo
    //   }
    //   wepy.getUserInfo({
    //     success (res) {
    //       that.globalData.userInfo = res.userInfo
    //       cb && cb(res.userInfo)
    //     }
    //   })
    // }

  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ3aWxkZG9nIiwicmVxdWlyZSIsIndpbGxkZG9nQ29uZmlnIiwic3luY1VSTCIsImF1dGhEb21haW4iLCJteUNvbmZpZyIsInRoZW1lQ29sb3IiLCJ0aGVtZWltZyIsImNpdHluYW1lIiwiY2l0eWlkIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwibGlzdCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInNlbGYiLCJpbml0aWFsaXplQXBwIiwiYXV0aCIsInNpZ25JbldlYXBwIiwidGhlbiIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwibmlja05hbWUiLCJkaXNwbGF5TmFtZSIsImF2YXRhclVybCIsInBob3RvVVJMIiwidWlkIiwiY2F0Y2giLCJlcnIiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxVQUFVQyxRQUFRLDJCQUFSLENBQWQ7O0FBRUEsSUFBSUMsaUJBQWlCO0FBQ2pCQyxXQUFTLDBDQURRO0FBRWpCQyxjQUFZOztBQUdoQjtBQUxxQixDQUFyQixDQU1BLElBQUlDLFdBQVc7QUFDWEMsY0FBYSxTQURGO0FBRVhDLFlBQVcsUUFGQTtBQUdYQyxZQUFXLFNBSEE7QUFJWEMsVUFBUztBQUpFLENBQWY7Ozs7O0FBMERFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFsRGZDLE1Ba0RlLEdBbEROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsaUJBRkssRUFHTCxZQUhLLEVBSUwsZ0JBSkssRUFLTCxjQUxLLEVBTUwsZUFOSyxFQU9MLGFBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsU0FIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BVkQ7QUFnQk5DLGNBQVE7QUFDSEMsZUFBTyxNQURKO0FBRUhDLHVCQUFnQixTQUZiLEVBRXdCO0FBQzNCQyx5QkFBa0IsTUFIZjtBQUlIQyxjQUFNLENBQ0Y7QUFDSSxzQkFBWSxhQURoQjtBQUVJLDhCQUFvQix3QkFGeEIsRUFFa0Q7QUFDOUMsc0JBQVksMEJBSGhCO0FBSUksa0JBQVE7QUFKWixTQURFLEVBT0Y7QUFDSSxzQkFBWSxpQkFEaEI7QUFFSSw4QkFBb0IsNEJBRnhCLEVBRXNEO0FBQ2xELHNCQUFZLDhCQUhoQjtBQUlJLGtCQUFRO0FBSlosU0FQRSxFQWFGO0FBQ0ksc0JBQVksWUFEaEI7QUFFSSw4QkFBb0IsdUJBRnhCLEVBRWlEO0FBQzdDLHNCQUFZLHlCQUhoQjtBQUlJLGtCQUFRO0FBSlosU0FiRTtBQUpIO0FBaEJGLEtBa0RNO0FBQUEsVUFQZkMsVUFPZSxHQVBGO0FBQ1hDLGdCQUFVLElBREM7QUFFWGYsZ0JBQVdILFNBQVNHLFFBRlQ7QUFHWEMsY0FBU0osU0FBU0ksTUFIUDtBQUlYRixnQkFBV0YsU0FBU0U7QUFKVCxLQU9FO0FBQUE7QUFFZDs7OzsrQkFFVTtBQUNULFVBQUlpQixPQUFPLElBQVg7QUFDQXhCLGNBQVF5QixhQUFSLENBQXNCdkIsY0FBdEI7QUFDQTtBQUNBO0FBQ0FGLGNBQVEwQixJQUFSLEdBQWVDLFdBQWYsR0FBNkJDLElBQTdCLENBQWtDLFVBQVNDLElBQVQsRUFBYztBQUM5Q0MsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBWixFQUFpQixjQUFqQjtBQUNBTCxhQUFLRixVQUFMLENBQWdCQyxRQUFoQixHQUEyQjtBQUN6QlMsb0JBQVdILEtBQUtJLFdBRFM7QUFFekJDLHFCQUFZTCxLQUFLTSxRQUZRO0FBR3pCQyxlQUFNUCxLQUFLTztBQUhjLFNBQTNCO0FBS0QsT0FQRCxFQU9HQyxLQVBILENBT1MsVUFBU0MsR0FBVCxFQUFhO0FBQ3BCUixnQkFBUUMsR0FBUixDQUFZTyxHQUFaLEVBQWdCLE1BQWhCO0FBQ0QsT0FURDtBQVVEOzs7cUNBRWU7QUFDZCxhQUFPdEMsT0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUF2RjJCLGVBQUt1QyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcblxyXG52YXIgd2lsZGRvZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2lsZGRvZy13ZWFwcC1hbGwnKTtcclxuXHJcbnZhciB3aWxsZGRvZ0NvbmZpZyA9IHtcclxuICAgIHN5bmNVUkw6ICdodHRwczovL3dkNzUxNzkzMjEyMmtxanF3dy53aWxkZG9naW8uY29tJyxcclxuICAgIGF1dGhEb21haW46ICd3ZDc1MTc5MzIxMjJrcWpxd3cud2lsZGRvZy5jb20nXHJcbn1cclxuXHJcbi8vdGhlbWVDb2xvclxyXG52YXIgbXlDb25maWcgPSB7XHJcbiAgICB0aGVtZUNvbG9yIDogJyM1MWU4ODYnLFxyXG4gICAgdGhlbWVpbWcgOiAnZ3JlZW4vJyxcclxuICAgIGNpdHluYW1lIDogJ015IENpdHknLFxyXG4gICAgY2l0eWlkIDogJzM3MDY4MidcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2F0dGVudGlvbicsXHJcbiAgICAgICdwYWdlcy91c2VyJyxcclxuICAgICAgJ3BhZ2VzL2NhdGVnb3J5JyxcclxuICAgICAgJ3BhZ2VzL2RldGFpbCcsXHJcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcclxuICAgICAgJ3BhZ2VzL2Fib3V0JyxcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnTXkgQ2l0eScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICB9LFxyXG4gICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3IgOiAnIzUxZTg4NicsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogJyNmZmYnLFxyXG4gICAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9ncmVlbi9pbmRleC5wbmdcIiwgLy90aGVtZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaW5kZXhfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2F0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvZ3JlZW4vYXR0ZW50aW9uLnBuZ1wiLCAvL3RoZW1lQ29sb3JcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9hdHRlbnRpb25fZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5YWz5rOoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3VzZXJcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL3VzZXIucG5nXCIsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL3VzZXJfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIGNpdHluYW1lIDogbXlDb25maWcuY2l0eW5hbWUsXHJcbiAgICBjaXR5aWQgOiBteUNvbmZpZy5jaXR5aWQsXHJcbiAgICB0aGVtZWltZyA6IG15Q29uZmlnLnRoZW1laW1nXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHdpbGRkb2cuaW5pdGlhbGl6ZUFwcCh3aWxsZGRvZ0NvbmZpZyk7XHJcbiAgICAvLyBzZWxmLmdldFVzZXJJbmZvKCk7XHJcbiAgICAvL+i/meS4quWcsOaWueS9v+eUqOmHjueLl+eZu+W9leW+ruS/oeWwj+eoi+W6j+eahOaWueazlSzlj6/ku6Xojrflvpflvq7kv6Hov5Tlm57nmoRvcGVuSWQs55So5oi35ZCN56ew562J562J5L+h5oGvLOi/meS6m+S/oeaBr+S8muWtmOWcqOmHjueLl+eahOaOp+WItuWPsOeahOi6q+S7veS6uuiupOivgemDqOWIhuOAglxyXG4gICAgd2lsZGRvZy5hdXRoKCkuc2lnbkluV2VhcHAoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xyXG4gICAgICBjb25zb2xlLmxvZyh1c2VyLCd1c2VyIHdpbGRkb2cnKTtcclxuICAgICAgc2VsZi5nbG9iYWxEYXRhLnVzZXJJbmZvID0ge1xyXG4gICAgICAgIG5pY2tOYW1lIDogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICBhdmF0YXJVcmwgOiB1c2VyLnBob3RvVVJMLFxyXG4gICAgICAgIHVpZCA6IHVzZXIudWlkXHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVyciwn6K6k6K+B5byC5bi4Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFdpbGRkb2dEYXRhKCl7XHJcbiAgICByZXR1cm4gd2lsZGRvZztcclxuICB9XHJcblxyXG4gIC8vIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgLy8gICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAvLyAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAvLyAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gIC8vICAgfVxyXG4gIC8vICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgLy8gICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gIC8vICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gIC8vICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcbn1cclxuIl19