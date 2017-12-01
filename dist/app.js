'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wilddogWeappAll = require('./utils/wilddog-weapp-all.js');

var _wilddogWeappAll2 = _interopRequireDefault(_wilddogWeappAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var wilddog = require('./utils/wilddog-weapp-all.js');

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
      cityname: myConfig.cityname,
      cityid: myConfig.cityid,
      themeimg: myConfig.themeimg
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var vm = this;
      _wilddogWeappAll2.default.initializeApp(willddogConfig);
      // vm.getUserInfo();
      //这个地方使用野狗登录微信小程序的方法,可以获得微信返回的openId,用户名称等等信息,这些信息会存在野狗的控制台的身份人认证部分。
      _wilddogWeappAll2.default.auth().signInWeapp().then(function (user) {
        console.log(user, 'user wilddog');
        vm.globalData.userInfo = {
          nickName: user.displayName,
          avatarUrl: user.photoURL,
          uid: user.uid
        };
      }).catch(function (err) {
        console.log(err, '认证异常');
      });
    }
  }, {
    key: 'getWilddog',
    value: function getWilddog(key) {
      // wilddog.initializeApp(willddogConfig);
      var $ref = _wilddogWeappAll2.default.sync().ref(key);
      console.log($ref, '$ref');
      return $ref;
    }
  }, {
    key: 'getTimeStamp',
    value: function getTimeStamp() {
      return _wilddogWeappAll2.default.sync().ServerValue.TIMESTAMP;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ3aWxsZGRvZ0NvbmZpZyIsInN5bmNVUkwiLCJhdXRoRG9tYWluIiwibXlDb25maWciLCJ0aGVtZUNvbG9yIiwidGhlbWVpbWciLCJjaXR5bmFtZSIsImNpdHlpZCIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImxpc3QiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ2bSIsImluaXRpYWxpemVBcHAiLCJhdXRoIiwic2lnbkluV2VhcHAiLCJ0aGVuIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJuaWNrTmFtZSIsImRpc3BsYXlOYW1lIiwiYXZhdGFyVXJsIiwicGhvdG9VUkwiLCJ1aWQiLCJjYXRjaCIsImVyciIsImtleSIsIiRyZWYiLCJzeW5jIiwicmVmIiwiU2VydmVyVmFsdWUiLCJUSU1FU1RBTVAiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBLElBQUlBLGlCQUFpQjtBQUNqQkMsV0FBUywwQ0FEUTtBQUVqQkMsY0FBWTs7QUFHaEI7QUFMcUIsQ0FBckIsQ0FNQSxJQUFJQyxXQUFXO0FBQ1hDLGNBQWEsU0FERjtBQUVYQyxZQUFXLFFBRkE7QUFHWEMsWUFBVyxTQUhBO0FBSVhDLFVBQVM7QUFKRSxDQUFmOzs7OztBQTJERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBbkRmQyxNQW1EZSxHQW5ETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGlCQUZLLEVBR0wsWUFISyxFQUlMLGdCQUpLLEVBS0wsY0FMSyxFQU1MLGVBTkssRUFPTCxhQVBLLEVBUUwsZUFSSyxDQURBO0FBV1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixTQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FYRDtBQWlCTkMsY0FBUTtBQUNIQyxlQUFPLE1BREo7QUFFSEMsdUJBQWdCLFNBRmIsRUFFd0I7QUFDM0JDLHlCQUFrQixNQUhmO0FBSUhDLGNBQU0sQ0FDRjtBQUNJLHNCQUFZLGFBRGhCO0FBRUksOEJBQW9CLHdCQUZ4QixFQUVrRDtBQUM5QyxzQkFBWSwwQkFIaEI7QUFJSSxrQkFBUTtBQUpaLFNBREUsRUFPRjtBQUNJLHNCQUFZLGlCQURoQjtBQUVJLDhCQUFvQiw0QkFGeEIsRUFFc0Q7QUFDbEQsc0JBQVksOEJBSGhCO0FBSUksa0JBQVE7QUFKWixTQVBFLEVBYUY7QUFDSSxzQkFBWSxZQURoQjtBQUVJLDhCQUFvQix1QkFGeEIsRUFFaUQ7QUFDN0Msc0JBQVkseUJBSGhCO0FBSUksa0JBQVE7QUFKWixTQWJFO0FBSkg7QUFqQkYsS0FtRE07QUFBQSxVQVBmQyxVQU9lLEdBUEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYZixnQkFBV0gsU0FBU0csUUFGVDtBQUdYQyxjQUFTSixTQUFTSSxNQUhQO0FBSVhGLGdCQUFXRixTQUFTRTtBQUpULEtBT0U7QUFBQTtBQUVkOzs7OytCQUVVO0FBQ1QsVUFBSWlCLEtBQUssSUFBVDtBQUNBLGdDQUFRQyxhQUFSLENBQXNCdkIsY0FBdEI7QUFDQTtBQUNBO0FBQ0EsZ0NBQVF3QixJQUFSLEdBQWVDLFdBQWYsR0FBNkJDLElBQTdCLENBQWtDLFVBQVNDLElBQVQsRUFBYztBQUM5Q0MsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBWixFQUFpQixjQUFqQjtBQUNBTCxXQUFHRixVQUFILENBQWNDLFFBQWQsR0FBeUI7QUFDdkJTLG9CQUFXSCxLQUFLSSxXQURPO0FBRXZCQyxxQkFBWUwsS0FBS00sUUFGTTtBQUd2QkMsZUFBTVAsS0FBS087QUFIWSxTQUF6QjtBQUtELE9BUEQsRUFPR0MsS0FQSCxDQU9TLFVBQVNDLEdBQVQsRUFBYTtBQUNwQlIsZ0JBQVFDLEdBQVIsQ0FBWU8sR0FBWixFQUFnQixNQUFoQjtBQUNELE9BVEQ7QUFVRDs7OytCQUVVQyxHLEVBQUk7QUFDWDtBQUNBLFVBQUlDLE9BQU8sMEJBQVFDLElBQVIsR0FBZUMsR0FBZixDQUFtQkgsR0FBbkIsQ0FBWDtBQUNBVCxjQUFRQyxHQUFSLENBQVlTLElBQVosRUFBaUIsTUFBakI7QUFDQSxhQUFPQSxJQUFQO0FBQ0g7OzttQ0FFYTtBQUNYLGFBQU8sMEJBQVFDLElBQVIsR0FBZUUsV0FBZixDQUEyQkMsU0FBbEM7QUFDRjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBL0YyQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgd2lsZGRvZyBmcm9tICcuL3V0aWxzL3dpbGRkb2ctd2VhcHAtYWxsJztcclxuLy8gdmFyIHdpbGRkb2cgPSByZXF1aXJlKCcuL3V0aWxzL3dpbGRkb2ctd2VhcHAtYWxsJyk7XHJcblxyXG52YXIgd2lsbGRkb2dDb25maWcgPSB7XHJcbiAgICBzeW5jVVJMOiAnaHR0cHM6Ly93ZDc1MTc5MzIxMjJrcWpxd3cud2lsZGRvZ2lvLmNvbScsXHJcbiAgICBhdXRoRG9tYWluOiAnd2Q3NTE3OTMyMTIya3FqcXd3LndpbGRkb2cuY29tJ1xyXG59XHJcblxyXG4vL3RoZW1lQ29sb3JcclxudmFyIG15Q29uZmlnID0ge1xyXG4gICAgdGhlbWVDb2xvciA6ICcjNTFlODg2JyxcclxuICAgIHRoZW1laW1nIDogJ2dyZWVuLycsXHJcbiAgICBjaXR5bmFtZSA6ICdNeSBDaXR5JyxcclxuICAgIGNpdHlpZCA6ICczNzA2ODInXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICdwYWdlcy9hdHRlbnRpb24nLFxyXG4gICAgICAncGFnZXMvdXNlcicsXHJcbiAgICAgICdwYWdlcy9jYXRlZ29yeScsXHJcbiAgICAgICdwYWdlcy9kZXRhaWwnLFxyXG4gICAgICAncGFnZXMvcHVibGlzaCcsXHJcbiAgICAgICdwYWdlcy9hYm91dCcsXHJcbiAgICAgICdwYWdlcy9zdWNjZXNzJyxcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnTXkgQ2l0eScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICB9LFxyXG4gICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3IgOiAnIzUxZTg4NicsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogJyNmZmYnLFxyXG4gICAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9ncmVlbi9pbmRleC5wbmdcIiwgLy90aGVtZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaW5kZXhfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2F0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvZ3JlZW4vYXR0ZW50aW9uLnBuZ1wiLCAvL3RoZW1lQ29sb3JcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9hdHRlbnRpb25fZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5YWz5rOoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3VzZXJcIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL3VzZXIucG5nXCIsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL3VzZXJfZGlzYWJsZS5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIGNpdHluYW1lIDogbXlDb25maWcuY2l0eW5hbWUsXHJcbiAgICBjaXR5aWQgOiBteUNvbmZpZy5jaXR5aWQsXHJcbiAgICB0aGVtZWltZyA6IG15Q29uZmlnLnRoZW1laW1nXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB3aWxkZG9nLmluaXRpYWxpemVBcHAod2lsbGRkb2dDb25maWcpO1xyXG4gICAgLy8gdm0uZ2V0VXNlckluZm8oKTtcclxuICAgIC8v6L+Z5Liq5Zyw5pa55L2/55So6YeO54uX55m75b2V5b6u5L+h5bCP56iL5bqP55qE5pa55rOVLOWPr+S7peiOt+W+l+W+ruS/oei/lOWbnueahG9wZW5JZCznlKjmiLflkI3np7DnrYnnrYnkv6Hmga8s6L+Z5Lqb5L+h5oGv5Lya5a2Y5Zyo6YeO54uX55qE5o6n5Yi25Y+w55qE6Lqr5Lu95Lq66K6k6K+B6YOo5YiG44CCXHJcbiAgICB3aWxkZG9nLmF1dGgoKS5zaWduSW5XZWFwcCgpLnRoZW4oZnVuY3Rpb24odXNlcil7XHJcbiAgICAgIGNvbnNvbGUubG9nKHVzZXIsJ3VzZXIgd2lsZGRvZycpO1xyXG4gICAgICB2bS5nbG9iYWxEYXRhLnVzZXJJbmZvID0ge1xyXG4gICAgICAgIG5pY2tOYW1lIDogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICBhdmF0YXJVcmwgOiB1c2VyLnBob3RvVVJMLFxyXG4gICAgICAgIHVpZCA6IHVzZXIudWlkXHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVyciwn6K6k6K+B5byC5bi4Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFdpbGRkb2coa2V5KXtcclxuICAgICAgLy8gd2lsZGRvZy5pbml0aWFsaXplQXBwKHdpbGxkZG9nQ29uZmlnKTtcclxuICAgICAgbGV0ICRyZWYgPSB3aWxkZG9nLnN5bmMoKS5yZWYoa2V5KTtcclxuICAgICAgY29uc29sZS5sb2coJHJlZiwnJHJlZicpO1xyXG4gICAgICByZXR1cm4gJHJlZjtcclxuICB9XHJcblxyXG4gIGdldFRpbWVTdGFtcCgpe1xyXG4gICAgIHJldHVybiB3aWxkZG9nLnN5bmMoKS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVA7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRVc2VySW5mbyhjYikge1xyXG4gIC8vICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgLy8gICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgLy8gICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAvLyAgIH1cclxuICAvLyAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gIC8vICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAvLyAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAvLyAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG59XHJcbiJdfQ==