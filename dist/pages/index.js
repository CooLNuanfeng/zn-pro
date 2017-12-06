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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _avWeappMin = require('./../utils/av-weapp-min.js');

var _avWeappMin2 = _interopRequireDefault(_avWeappMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            // enablePullDownRefresh : true
        }, _this.$repeat = {}, _this.$props = { "v-loading": { "xmlns:v-bind": "", "v-bind:loading.sync": "loading", "v-bind:loadend.sync": "loadend" } }, _this.$events = {}, _this.components = {
            'location': _location2.default,
            'gird': _grid2.default,
            'footer': _footer2.default,
            'toast': _toast2.default,
            'v-loading': _loading2.default
        }, _this.data = {
            themeimg: '',
            listData: null,
            loading: false
        }, _this.methods = {
            goDetail: function goDetail(item) {
                wx.navigateTo({
                    url: 'detail?id=' + item.id
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
            this.fetch();
        }
    }, {
        key: 'onShow',
        value: function onShow(options) {
            if (options && options.from == 'success') {
                console.log('show');
                this.fetch();
            }
        }
    }, {
        key: 'fetch',

        // onPullDownRefresh(){
        //     this.fetch();
        // };
        value: function fetch() {
            var vm = this;
            var query = new _avWeappMin2.default.Query('NewsList');
            var now = new Date();
            query.lessThanOrEqualTo('updatedAt', now);
            query.descending('updatedAt');
            query.limit(30);
            vm.loading = true;
            query.find().then(function (data) {
                vm.loading = false;
                // console.log('query data',data);
                vm.makeParam(data);
            }).catch(function (err) {
                console.log(err);
                vm.loading = false;
                vm.$invoke('toast', 'show', {
                    message: '服务异常，请稍后重试'
                });
            });
        }
    }, {
        key: 'makeParam',
        value: function makeParam(data) {
            var len = data.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                var json = data[i].attributes;
                json.id = data[i].id;
                json.updatedAt = this.$parent.timeFormate(data[i].updatedAt);
                arr.push(json);
            }
            this.listData = arr;
            this.$apply();
            // console.log(this.listData);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInRoZW1laW1nIiwibGlzdERhdGEiLCJsb2FkaW5nIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaXRlbSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwicHVibGlzaCIsImFib3V0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJmZXRjaCIsIm9wdGlvbnMiLCJmcm9tIiwiY29uc29sZSIsImxvZyIsInZtIiwicXVlcnkiLCJRdWVyeSIsIm5vdyIsIkRhdGUiLCJsZXNzVGhhbk9yRXF1YWxUbyIsImRlc2NlbmRpbmciLCJsaW1pdCIsImZpbmQiLCJ0aGVuIiwibWFrZVBhcmFtIiwiY2F0Y2giLCJlcnIiLCIkaW52b2tlIiwibWVzc2FnZSIsImxlbiIsImxlbmd0aCIsImFyciIsImkiLCJqc29uIiwiYXR0cmlidXRlcyIsInVwZGF0ZWRBdCIsInRpbWVGb3JtYXRlIiwicHVzaCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0w7QUFESyxTLFFBR1ZDLE8sR0FBVSxFLFFBQ2ZDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsU0FBekMsRUFBbUQsdUJBQXNCLFNBQXpFLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDSiwwQ0FESTtBQUVKLGtDQUZJO0FBR0osc0NBSEk7QUFJSixvQ0FKSTtBQUtKO0FBTEksUyxRQU9SQyxJLEdBQU87QUFDSEMsc0JBQVcsRUFEUjtBQUVIQyxzQkFBVyxJQUZSO0FBR0hDLHFCQUFVO0FBSFAsUyxRQUtQQyxPLEdBQVU7QUFDTkMsb0JBRE0sb0JBQ0dDLElBREgsRUFDUTtBQUNWQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNLGVBQWFILEtBQUtJO0FBRGQsaUJBQWQ7QUFHSCxhQUxLO0FBTU5DLG1CQU5NLHFCQU1HO0FBQ0xKLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdILGFBVks7QUFXTkcsaUJBWE0sbUJBV0M7QUFDSEwsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0g7QUFmSyxTOzs7OztpQ0FpQkY7QUFDSixpQkFBS1IsUUFBTCxHQUFnQixLQUFLWSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JiLFFBQXhDO0FBQ0EsaUJBQUtjLEtBQUw7QUFDSDs7OytCQUNNQyxPLEVBQVE7QUFDWCxnQkFBR0EsV0FBV0EsUUFBUUMsSUFBUixJQUFnQixTQUE5QixFQUF3QztBQUNwQ0Msd0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EscUJBQUtKLEtBQUw7QUFDSDtBQUNKOzs7O0FBQ0Q7QUFDQTtBQUNBO2dDQUNPO0FBQ0gsZ0JBQUlLLEtBQUssSUFBVDtBQUNBLGdCQUFJQyxRQUFRLElBQUkscUJBQUdDLEtBQVAsQ0FBYSxVQUFiLENBQVo7QUFDQSxnQkFBSUMsTUFBTSxJQUFJQyxJQUFKLEVBQVY7QUFDQUgsa0JBQU1JLGlCQUFOLENBQXdCLFdBQXhCLEVBQXFDRixHQUFyQztBQUNBRixrQkFBTUssVUFBTixDQUFpQixXQUFqQjtBQUNBTCxrQkFBTU0sS0FBTixDQUFZLEVBQVo7QUFDQVAsZUFBR2pCLE9BQUgsR0FBYSxJQUFiO0FBQ0FrQixrQkFBTU8sSUFBTixHQUFhQyxJQUFiLENBQWtCLFVBQVM3QixJQUFULEVBQWM7QUFDNUJvQixtQkFBR2pCLE9BQUgsR0FBYSxLQUFiO0FBQ0E7QUFDQWlCLG1CQUFHVSxTQUFILENBQWE5QixJQUFiO0FBQ0gsYUFKRCxFQUlHK0IsS0FKSCxDQUlTLFVBQVNDLEdBQVQsRUFBYTtBQUNsQmQsd0JBQVFDLEdBQVIsQ0FBWWEsR0FBWjtBQUNBWixtQkFBR2pCLE9BQUgsR0FBYSxLQUFiO0FBQ0FpQixtQkFBR2EsT0FBSCxDQUFXLE9BQVgsRUFBb0IsTUFBcEIsRUFBNEI7QUFDeEJDLDZCQUFTO0FBRGUsaUJBQTVCO0FBR0gsYUFWRDtBQVdIOzs7a0NBQ1NsQyxJLEVBQUs7QUFDWCxnQkFBSW1DLE1BQU1uQyxLQUFLb0MsTUFBZjtBQUNBLGdCQUFJQyxNQUFNLEVBQVY7QUFDQSxpQkFBSSxJQUFJQyxJQUFFLENBQVYsRUFBYUEsSUFBRUgsR0FBZixFQUFvQkcsR0FBcEIsRUFBd0I7QUFDcEIsb0JBQUlDLE9BQU92QyxLQUFLc0MsQ0FBTCxFQUFRRSxVQUFuQjtBQUNBRCxxQkFBSzdCLEVBQUwsR0FBVVYsS0FBS3NDLENBQUwsRUFBUTVCLEVBQWxCO0FBQ0E2QixxQkFBS0UsU0FBTCxHQUFpQixLQUFLNUIsT0FBTCxDQUFhNkIsV0FBYixDQUF5QjFDLEtBQUtzQyxDQUFMLEVBQVFHLFNBQWpDLENBQWpCO0FBQ0FKLG9CQUFJTSxJQUFKLENBQVNKLElBQVQ7QUFDSDtBQUNELGlCQUFLckMsUUFBTCxHQUFnQm1DLEdBQWhCO0FBQ0EsaUJBQUtPLE1BQUw7QUFDQTtBQUNIOzs7O0VBakY4QixlQUFLQyxJOztrQkFBbkJuRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2NhdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL2xvY2F0aW9uJ1xuICBpbXBvcnQgR3JpZCBmcm9tICcuLi9jb21wb25lbnRzL2dyaWQnXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInXG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0JztcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJztcblxuICBpbXBvcnQgQVYgZnJvbSAnLi4vdXRpbHMvYXYtd2VhcHAtbWluLmpzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgICAgLy8gZW5hYmxlUHVsbERvd25SZWZyZXNoIDogdHJ1ZVxuICAgICAgfTtcbiAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ2LWxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvYWRpbmcuc3luY1wiOlwibG9hZGluZ1wiLFwidi1iaW5kOmxvYWRlbmQuc3luY1wiOlwibG9hZGVuZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgJ2xvY2F0aW9uJyA6IExvY2F0aW9uLFxuICAgICAgICAgICdnaXJkJyA6IEdyaWQsXG4gICAgICAgICAgJ2Zvb3RlcicgOiBGb290ZXIsXG4gICAgICAgICAgJ3RvYXN0JzogVG9hc3QsXG4gICAgICAgICAgJ3YtbG9hZGluZycgOiBMb2FkaW5nLFxuICAgICAgfTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgdGhlbWVpbWcgOiAnJyxcbiAgICAgICAgICBsaXN0RGF0YSA6IG51bGwsXG4gICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgZ29EZXRhaWwoaXRlbSl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsIDogJ2RldGFpbD9pZD0nK2l0ZW0uaWRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwdWJsaXNoKCl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsIDogJ3B1Ymxpc2gnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWJvdXQoKXtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAnYWJvdXQnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgIH07XG4gICAgICBvbkxvYWQoKXtcbiAgICAgICAgICB0aGlzLnRoZW1laW1nID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudGhlbWVpbWc7XG4gICAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgfTtcbiAgICAgIG9uU2hvdyhvcHRpb25zKXtcbiAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuZnJvbSA9PSAnc3VjY2Vzcycpe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hvdycpO1xuICAgICAgICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8vIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICAvLyAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgLy8gfTtcbiAgICAgIGZldGNoKCl7XG4gICAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgICB2YXIgcXVlcnkgPSBuZXcgQVYuUXVlcnkoJ05ld3NMaXN0Jyk7XG4gICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgcXVlcnkubGVzc1RoYW5PckVxdWFsVG8oJ3VwZGF0ZWRBdCcsIG5vdyk7XG4gICAgICAgICAgcXVlcnkuZGVzY2VuZGluZygndXBkYXRlZEF0Jyk7XG4gICAgICAgICAgcXVlcnkubGltaXQoMzApO1xuICAgICAgICAgIHZtLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIHF1ZXJ5LmZpbmQoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdxdWVyeSBkYXRhJyxkYXRhKTtcbiAgICAgICAgICAgICAgdm0ubWFrZVBhcmFtKGRhdGEpO1xuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdm0uJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfmnI3liqHlvILluLjvvIzor7fnqI3lkI7ph43or5UnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBtYWtlUGFyYW0oZGF0YSl7XG4gICAgICAgICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XG4gICAgICAgICAgICAgIGxldCBqc29uID0gZGF0YVtpXS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgICBqc29uLmlkID0gZGF0YVtpXS5pZDtcbiAgICAgICAgICAgICAganNvbi51cGRhdGVkQXQgPSB0aGlzLiRwYXJlbnQudGltZUZvcm1hdGUoZGF0YVtpXS51cGRhdGVkQXQpO1xuICAgICAgICAgICAgICBhcnIucHVzaChqc29uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5saXN0RGF0YSA9IGFycjtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubGlzdERhdGEpO1xuICAgICAgfVxuICB9XG4iXX0=