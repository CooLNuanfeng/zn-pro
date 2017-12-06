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
      domain: 'https://oyo2k3vrc.bkt.clouddn.com',
      refresh: false //是否刷新
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
      if (number < 10) {
        return '0' + number;
      } else {
        return number;
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJteUNvbmZpZyIsInRoZW1lQ29sb3IiLCJ0aGVtZWltZyIsImNpdHluYW1lIiwiY2l0eWlkIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwidGFiQmFyIiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwibGlzdCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZXJOaWNrIiwiZG9tYWluIiwicmVmcmVzaCIsInZtIiwiZ2V0VXNlckluZm8iLCJpbml0IiwiYXBwSWQiLCJhcHBLZXkiLCJVc2VyIiwibG9naW5XaXRoV2VhcHAiLCJ0aGVuIiwidXNlciIsInRvSlNPTiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwiY2IiLCJ0aGF0Iiwic3VjY2VzcyIsInJlcyIsInV0YyIsIm9EYXRlIiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWluIiwiZ2V0TWludXRlcyIsInNlYyIsImdldFNlY29uZHMiLCJ0b0RvdWJsZSIsIm51bWJlciIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBR0E7QUFDQSxJQUFJQSxXQUFXO0FBQ1hDLGNBQWEsU0FERjtBQUVYQyxZQUFXLFFBRkE7QUFHWEMsWUFBVyxTQUhBO0FBSVhDLFVBQVM7QUFKRSxDQUFmOzs7OztBQThERSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBdERmQyxNQXNEZSxHQXRETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGlCQUZLLEVBR0wsWUFISyxFQUlMLGdCQUpLLEVBS0wsY0FMSyxF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ZUFBT0EsTUFBUDtBQUNIO0FBQ0o7Ozs7RUF6RzBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBBViBmcm9tICcuL3V0aWxzL2F2LXdlYXBwLW1pbi5qcyc7XHJcblxyXG5cclxuLy90aGVtZUNvbG9yXHJcbnZhciBteUNvbmZpZyA9IHtcclxuICAgIHRoZW1lQ29sb3IgOiAnIzUxZTg4NicsXHJcbiAgICB0aGVtZWltZyA6ICdncmVlbi8nLFxyXG4gICAgY2l0eW5hbWUgOiAnTXkgQ2l0eScsXHJcbiAgICBjaXR5aWQgOiAnMzcwNjgyJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAncGFnZXMvYXR0ZW50aW9uJyxcclxuICAgICAgJ3BhZ2VzL3VzZXInLFxyXG4gICAgICAncGFnZXMvY2F0ZWdvcnknLFxyXG4gICAgICAncGFnZXMvZGV0YWlsJyxcclxuICAgICAgJ3BhZ2VzL3B1Ymxpc2gnLFxyXG4gICAgICAncGFnZXMvYWJvdXQnLFxyXG4gICAgICAncGFnZXMvc3VjY2VzcycsXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ015IENpdHknLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICAgfSxcclxuICAgICB0YWJCYXI6IHtcclxuICAgICAgICAgIGNvbG9yOiAnIzk5OScsXHJcbiAgICAgICAgICBzZWxlY3RlZENvbG9yIDogJyM1MWU4ODYnLCAvL3RoZW1lQ29sb3JcclxuICAgICAgICAgIGJhY2tncm91bmRDb2xvciA6ICcjZmZmJyxcclxuICAgICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmRleFwiLFxyXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvZ3JlZW4vaW5kZXgucG5nXCIsIC8vdGhlbWVDb2xvclxyXG4gICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2luZGV4X2Rpc2FibGUucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIummlumhtVwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9hdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2dyZWVuL2F0dGVudGlvbi5wbmdcIiwgLy90aGVtZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvYXR0ZW50aW9uX2Rpc2FibGUucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuWFs+azqFwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy91c2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9ncmVlbi91c2VyLnBuZ1wiLCAvL3RoZW1lQ29sb3JcclxuICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy91c2VyX2Rpc2FibGUucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuaIkeeahFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICB1c2VyTmljayA6IG51bGwsXHJcbiAgICBjaXR5bmFtZSA6IG15Q29uZmlnLmNpdHluYW1lLFxyXG4gICAgY2l0eWlkIDogbXlDb25maWcuY2l0eWlkLFxyXG4gICAgdGhlbWVpbWcgOiBteUNvbmZpZy50aGVtZWltZyxcclxuICAgIGRvbWFpbiA6ICdodHRwczovL295bzJrM3ZyYy5ia3QuY2xvdWRkbi5jb20nLFxyXG4gICAgcmVmcmVzaCA6IGZhbHNlLCAvL+aYr+WQpuWIt+aWsFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZ2V0VXNlckluZm8oKTtcclxuXHJcblxyXG4gICAgQVYuaW5pdCh7XHJcbiAgICAgYXBwSWQ6ICdqckZtRmF4R0pFSnBGNWhqaFVrYmlHdEotZ3pHem9Ic3onLFxyXG4gICAgIGFwcEtleTogJ2s4RjJhUTZpUlRDTDBVTGU2YzhhNHNSZycsXHJcbiAgICB9KTtcclxuICAgIEFWLlVzZXIubG9naW5XaXRoV2VhcHAoKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSB1c2VyLnRvSlNPTigpO1xyXG4gICAgICBjb25zb2xlLmxvZyh1c2VyLnRvSlNPTigpKTtcclxuICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJOaWNrKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlck5pY2s7XHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJOaWNrID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB0aW1lRm9ybWF0ZSh1dGMpe1xyXG4gICAgdmFyIG9EYXRlID0gbmV3IERhdGUodXRjKTtcclxuICAgIHZhciB5ZWFyID0gb0RhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHZhciBtb250aCA9IG9EYXRlLmdldE1vbnRoKCk7XHJcbiAgICB2YXIgZGF5ID0gb0RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIGhvdXIgPSBvRGF0ZS5nZXRIb3VycygpO1xyXG4gICAgdmFyIG1pbiA9IG9EYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgIHZhciBzZWMgPSBvRGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICByZXR1cm4geWVhcisnLScrdGhpcy50b0RvdWJsZShtb250aCsxKSsnLScrdGhpcy50b0RvdWJsZShkYXkpKycgJyt0aGlzLnRvRG91YmxlKGhvdXIpKyc6Jyt0aGlzLnRvRG91YmxlKG1pbik7XHJcbiAgfVxyXG4gIHRvRG91YmxlKG51bWJlcil7XHJcbiAgICAgIGlmKG51bWJlcjwxMCl7XHJcbiAgICAgICAgICByZXR1cm4gJzAnK251bWJlcjtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gbnVtYmVyO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=