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
        value: function onShow() {
            var vm = this;
            setTimeout(function () {
                var refresh = vm.$parent.globalData.refresh;
                // console.log(refresh,'refresh');
                if (refresh) {
                    vm.fetch();
                    vm.$parent.globalData.refresh = false;
                }
            }, 100);
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
                wx.stopPullDownRefresh();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInRoZW1laW1nIiwibGlzdERhdGEiLCJsb2FkaW5nIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaXRlbSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwicHVibGlzaCIsImFib3V0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJmZXRjaCIsInZtIiwic2V0VGltZW91dCIsInJlZnJlc2giLCJxdWVyeSIsIlF1ZXJ5Iiwibm93IiwiRGF0ZSIsImxlc3NUaGFuT3JFcXVhbFRvIiwiZGVzY2VuZGluZyIsImxpbWl0IiwiZmluZCIsInRoZW4iLCJtYWtlUGFyYW0iLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiJGludm9rZSIsIm1lc3NhZ2UiLCJsZW4iLCJsZW5ndGgiLCJhcnIiLCJpIiwianNvbiIsImF0dHJpYnV0ZXMiLCJ1cGRhdGVkQXQiLCJ0aW1lRm9ybWF0ZSIsInB1c2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMO0FBREssUyxRQUdWQyxPLEdBQVUsRSxRQUNmQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQW1ELHVCQUFzQixTQUF6RSxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ0osMENBREk7QUFFSixrQ0FGSTtBQUdKLHNDQUhJO0FBSUosb0NBSkk7QUFLSjtBQUxJLFMsUUFPUkMsSSxHQUFPO0FBQ0hDLHNCQUFXLEVBRFI7QUFFSEMsc0JBQVcsSUFGUjtBQUdIQyxxQkFBVTtBQUhQLFMsUUFLUEMsTyxHQUFVO0FBQ05DLG9CQURNLG9CQUNHQyxJQURILEVBQ1E7QUFDVkMsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTSxlQUFhSCxLQUFLSTtBQURkLGlCQUFkO0FBR0gsYUFMSztBQU1OQyxtQkFOTSxxQkFNRztBQUNMSixtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSCxhQVZLO0FBV05HLGlCQVhNLG1CQVdDO0FBQ0hMLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdIO0FBZkssUzs7Ozs7aUNBaUJGO0FBQ0osaUJBQUtSLFFBQUwsR0FBZ0IsS0FBS1ksT0FBTCxDQUFhQyxVQUFiLENBQXdCYixRQUF4QztBQUNBLGlCQUFLYyxLQUFMO0FBQ0g7OztpQ0FDTztBQUNKLGdCQUFJQyxLQUFLLElBQVQ7QUFDQUMsdUJBQVcsWUFBVTtBQUNqQixvQkFBSUMsVUFBVUYsR0FBR0gsT0FBSCxDQUFXQyxVQUFYLENBQXNCSSxPQUFwQztBQUNBO0FBQ0Esb0JBQUdBLE9BQUgsRUFBVztBQUNQRix1QkFBR0QsS0FBSDtBQUNBQyx1QkFBR0gsT0FBSCxDQUFXQyxVQUFYLENBQXNCSSxPQUF0QixHQUFnQyxLQUFoQztBQUNIO0FBQ0osYUFQRCxFQU9FLEdBUEY7QUFRSDs7OztBQUNEO0FBQ0E7QUFDQTtnQ0FDTztBQUNILGdCQUFJRixLQUFLLElBQVQ7QUFDQSxnQkFBSUcsUUFBUSxJQUFJLHFCQUFHQyxLQUFQLENBQWEsVUFBYixDQUFaO0FBQ0EsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0FILGtCQUFNSSxpQkFBTixDQUF3QixXQUF4QixFQUFxQ0YsR0FBckM7QUFDQUYsa0JBQU1LLFVBQU4sQ0FBaUIsV0FBakI7QUFDQUwsa0JBQU1NLEtBQU4sQ0FBWSxFQUFaO0FBQ0FULGVBQUdiLE9BQUgsR0FBYSxJQUFiO0FBQ0FnQixrQkFBTU8sSUFBTixHQUFhQyxJQUFiLENBQWtCLFVBQVMzQixJQUFULEVBQWM7QUFDNUJnQixtQkFBR2IsT0FBSCxHQUFhLEtBQWI7QUFDQTtBQUNBYSxtQkFBR1ksU0FBSCxDQUFhNUIsSUFBYjtBQUNBTyxtQkFBR3NCLG1CQUFIO0FBQ0gsYUFMRCxFQUtHQyxLQUxILENBS1MsVUFBU0MsR0FBVCxFQUFhO0FBQ2xCQyx3QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0FmLG1CQUFHYixPQUFILEdBQWEsS0FBYjtBQUNBYSxtQkFBR2tCLE9BQUgsQ0FBVyxPQUFYLEVBQW9CLE1BQXBCLEVBQTRCO0FBQ3hCQyw2QkFBUztBQURlLGlCQUE1QjtBQUdILGFBWEQ7QUFZSDs7O2tDQUNTbkMsSSxFQUFLO0FBQ1gsZ0JBQUlvQyxNQUFNcEMsS0FBS3FDLE1BQWY7QUFDQSxnQkFBSUMsTUFBTSxFQUFWO0FBQ0EsaUJBQUksSUFBSUMsSUFBRSxDQUFWLEVBQWFBLElBQUVILEdBQWYsRUFBb0JHLEdBQXBCLEVBQXdCO0FBQ3BCLG9CQUFJQyxPQUFPeEMsS0FBS3VDLENBQUwsRUFBUUUsVUFBbkI7QUFDQUQscUJBQUs5QixFQUFMLEdBQVVWLEtBQUt1QyxDQUFMLEVBQVE3QixFQUFsQjtBQUNBOEIscUJBQUtFLFNBQUwsR0FBaUIsS0FBSzdCLE9BQUwsQ0FBYThCLFdBQWIsQ0FBeUIzQyxLQUFLdUMsQ0FBTCxFQUFRRyxTQUFqQyxDQUFqQjtBQUNBSixvQkFBSU0sSUFBSixDQUFTSixJQUFUO0FBQ0g7QUFDRCxpQkFBS3RDLFFBQUwsR0FBZ0JvQyxHQUFoQjtBQUNBLGlCQUFLTyxNQUFMO0FBQ0E7QUFDSDs7OztFQXZGOEIsZUFBS0MsSTs7a0JBQW5CcEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9jYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9sb2NhdGlvbidcbiAgaW1wb3J0IEdyaWQgZnJvbSAnLi4vY29tcG9uZW50cy9ncmlkJ1xuICBpbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJ1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCc7XG4gIGltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZyc7XG5cbiAgaW1wb3J0IEFWIGZyb20gJy4uL3V0aWxzL2F2LXdlYXBwLW1pbi5qcyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICAgIC8vIGVuYWJsZVB1bGxEb3duUmVmcmVzaCA6IHRydWVcbiAgICAgIH07XG4gICAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widi1sb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsb2FkaW5nLnN5bmNcIjpcImxvYWRpbmdcIixcInYtYmluZDpsb2FkZW5kLnN5bmNcIjpcImxvYWRlbmRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAgICdsb2NhdGlvbicgOiBMb2NhdGlvbixcbiAgICAgICAgICAnZ2lyZCcgOiBHcmlkLFxuICAgICAgICAgICdmb290ZXInIDogRm9vdGVyLFxuICAgICAgICAgICd0b2FzdCc6IFRvYXN0LFxuICAgICAgICAgICd2LWxvYWRpbmcnIDogTG9hZGluZyxcbiAgICAgIH07XG4gICAgICBkYXRhID0ge1xuICAgICAgICAgIHRoZW1laW1nIDogJycsXG4gICAgICAgICAgbGlzdERhdGEgOiBudWxsLFxuICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcbiAgICAgIH07XG4gICAgICBtZXRob2RzID0ge1xuICAgICAgICAgIGdvRGV0YWlsKGl0ZW0pe1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdkZXRhaWw/aWQ9JytpdGVtLmlkXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHVibGlzaCgpe1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdwdWJsaXNoJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFib3V0KCl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsIDogJ2Fib3V0J1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICB9O1xuICAgICAgb25Mb2FkKCl7XG4gICAgICAgICAgdGhpcy50aGVtZWltZyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRoZW1laW1nO1xuICAgICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICAgIH07XG4gICAgICBvblNob3coKXtcbiAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIHJlZnJlc2ggPSB2bS4kcGFyZW50Lmdsb2JhbERhdGEucmVmcmVzaDtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVmcmVzaCwncmVmcmVzaCcpO1xuICAgICAgICAgICAgICBpZihyZWZyZXNoKXtcbiAgICAgICAgICAgICAgICAgIHZtLmZldGNoKCk7XG4gICAgICAgICAgICAgICAgICB2bS4kcGFyZW50Lmdsb2JhbERhdGEucmVmcmVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSwxMDApO1xuICAgICAgfTtcbiAgICAgIC8vIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICAvLyAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgLy8gfTtcbiAgICAgIGZldGNoKCl7XG4gICAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgICB2YXIgcXVlcnkgPSBuZXcgQVYuUXVlcnkoJ05ld3NMaXN0Jyk7XG4gICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgcXVlcnkubGVzc1RoYW5PckVxdWFsVG8oJ3VwZGF0ZWRBdCcsIG5vdyk7XG4gICAgICAgICAgcXVlcnkuZGVzY2VuZGluZygndXBkYXRlZEF0Jyk7XG4gICAgICAgICAgcXVlcnkubGltaXQoMzApO1xuICAgICAgICAgIHZtLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIHF1ZXJ5LmZpbmQoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdxdWVyeSBkYXRhJyxkYXRhKTtcbiAgICAgICAgICAgICAgdm0ubWFrZVBhcmFtKGRhdGEpO1xuICAgICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB2bS4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ+acjeWKoeW8guW4uO+8jOivt+eojeWQjumHjeivlScsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIG1ha2VQYXJhbShkYXRhKXtcbiAgICAgICAgICB2YXIgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgbGV0IGpzb24gPSBkYXRhW2ldLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgIGpzb24uaWQgPSBkYXRhW2ldLmlkO1xuICAgICAgICAgICAgICBqc29uLnVwZGF0ZWRBdCA9IHRoaXMuJHBhcmVudC50aW1lRm9ybWF0ZShkYXRhW2ldLnVwZGF0ZWRBdCk7XG4gICAgICAgICAgICAgIGFyci5wdXNoKGpzb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxpc3REYXRhID0gYXJyO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5saXN0RGF0YSk7XG4gICAgICB9XG4gIH1cbiJdfQ==