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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
            location: _location2.default,
            gird: _grid2.default,
            footer: _footer2.default,
            toast: _toast2.default
        }, _this.data = {
            themeimg: '',
            listData: null
        }, _this.methods = {
            goDetail: function goDetail(item) {
                console.log(item);
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
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var vm = this;
            var query = new _avWeappMin2.default.Query('NewsList');
            var now = new Date();
            query.lessThanOrEqualTo('updatedAt', now);
            query.descending('updatedAt');
            query.limit(30);
            query.find().then(function (data) {
                // console.log('query data',data);
                vm.makeParam(data);
            }).catch(function (err) {
                console.log(err);
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
            console.log(this.listData);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImxvY2F0aW9uIiwiZ2lyZCIsImZvb3RlciIsInRvYXN0IiwiZGF0YSIsInRoZW1laW1nIiwibGlzdERhdGEiLCJtZXRob2RzIiwiZ29EZXRhaWwiLCJpdGVtIiwiY29uc29sZSIsImxvZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwicHVibGlzaCIsImFib3V0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ2bSIsInF1ZXJ5IiwiUXVlcnkiLCJub3ciLCJEYXRlIiwibGVzc1RoYW5PckVxdWFsVG8iLCJkZXNjZW5kaW5nIiwibGltaXQiLCJmaW5kIiwidGhlbiIsIm1ha2VQYXJhbSIsImNhdGNoIiwiZXJyIiwiJGludm9rZSIsIm1lc3NhZ2UiLCJsZW4iLCJsZW5ndGgiLCJhcnIiLCJpIiwianNvbiIsImF0dHJpYnV0ZXMiLCJ1cGRhdGVkQXQiLCJ0aW1lRm9ybWF0ZSIsInB1c2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVMsRSxRQUdUQyxVLEdBQWE7QUFDVEMsd0NBRFM7QUFFVEMsZ0NBRlM7QUFHVEMsb0NBSFM7QUFJVEM7QUFKUyxTLFFBTWJDLEksR0FBTztBQUNIQyxzQkFBVyxFQURSO0FBRUhDLHNCQUFXO0FBRlIsUyxRQUlQQyxPLEdBQVU7QUFDTkMsb0JBRE0sb0JBQ0dDLElBREgsRUFDUTtBQUNWQyx3QkFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0FHLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU0sZUFBYUwsS0FBS007QUFEZCxpQkFBZDtBQUdILGFBTks7QUFPTkMsbUJBUE0scUJBT0c7QUFDTEosbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0gsYUFYSztBQVlORyxpQkFaTSxtQkFZQztBQUNITCxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSDtBQWhCSyxTOzs7OztpQ0FrQkY7QUFDSixpQkFBS1QsUUFBTCxHQUFnQixLQUFLYSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JkLFFBQXhDO0FBQ0g7OztpQ0FDTztBQUNKLGdCQUFJZSxLQUFLLElBQVQ7QUFDQSxnQkFBSUMsUUFBUSxJQUFJLHFCQUFHQyxLQUFQLENBQWEsVUFBYixDQUFaO0FBQ0EsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0FILGtCQUFNSSxpQkFBTixDQUF3QixXQUF4QixFQUFxQ0YsR0FBckM7QUFDQUYsa0JBQU1LLFVBQU4sQ0FBaUIsV0FBakI7QUFDQUwsa0JBQU1NLEtBQU4sQ0FBWSxFQUFaO0FBQ0FOLGtCQUFNTyxJQUFOLEdBQWFDLElBQWIsQ0FBa0IsVUFBU3pCLElBQVQsRUFBYztBQUM1QjtBQUNBZ0IsbUJBQUdVLFNBQUgsQ0FBYTFCLElBQWI7QUFDSCxhQUhELEVBR0cyQixLQUhILENBR1MsVUFBU0MsR0FBVCxFQUFhO0FBQ2xCdEIsd0JBQVFDLEdBQVIsQ0FBWXFCLEdBQVo7QUFDQVosbUJBQUdhLE9BQUgsQ0FBVyxPQUFYLEVBQW9CLE1BQXBCLEVBQTRCO0FBQ3hCQyw2QkFBUztBQURlLGlCQUE1QjtBQUdILGFBUkQ7QUFTSDs7O2tDQUNTOUIsSSxFQUFLO0FBQ1gsZ0JBQUkrQixNQUFNL0IsS0FBS2dDLE1BQWY7QUFDQSxnQkFBSUMsTUFBTSxFQUFWO0FBQ0EsaUJBQUksSUFBSUMsSUFBRSxDQUFWLEVBQWFBLElBQUVILEdBQWYsRUFBb0JHLEdBQXBCLEVBQXdCO0FBQ3BCLG9CQUFJQyxPQUFPbkMsS0FBS2tDLENBQUwsRUFBUUUsVUFBbkI7QUFDQUQscUJBQUt4QixFQUFMLEdBQVVYLEtBQUtrQyxDQUFMLEVBQVF2QixFQUFsQjtBQUNBd0IscUJBQUtFLFNBQUwsR0FBaUIsS0FBS3ZCLE9BQUwsQ0FBYXdCLFdBQWIsQ0FBeUJ0QyxLQUFLa0MsQ0FBTCxFQUFRRyxTQUFqQyxDQUFqQjtBQUNBSixvQkFBSU0sSUFBSixDQUFTSixJQUFUO0FBQ0g7QUFDRCxpQkFBS2pDLFFBQUwsR0FBZ0IrQixHQUFoQjtBQUNBLGlCQUFLTyxNQUFMO0FBQ0FsQyxvQkFBUUMsR0FBUixDQUFZLEtBQUtMLFFBQWpCO0FBQ0g7Ozs7RUFoRThCLGVBQUt1QyxJOztrQkFBbkJoRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMb2NhdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL2xvY2F0aW9uJ1xuICBpbXBvcnQgR3JpZCBmcm9tICcuLi9jb21wb25lbnRzL2dyaWQnXG4gIGltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInXG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0JztcblxuICBpbXBvcnQgQVYgZnJvbSAnLi4vdXRpbHMvYXYtd2VhcHAtbWluLmpzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICBjb25maWcgPSB7XG5cbiAgICAgIH07XG4gICAgICBjb21wb25lbnRzID0ge1xuICAgICAgICAgIGxvY2F0aW9uIDogTG9jYXRpb24sXG4gICAgICAgICAgZ2lyZCA6IEdyaWQsXG4gICAgICAgICAgZm9vdGVyIDogRm9vdGVyLFxuICAgICAgICAgIHRvYXN0OiBUb2FzdFxuICAgICAgfTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgdGhlbWVpbWcgOiAnJyxcbiAgICAgICAgICBsaXN0RGF0YSA6IG51bGxcbiAgICAgIH07XG4gICAgICBtZXRob2RzID0ge1xuICAgICAgICAgIGdvRGV0YWlsKGl0ZW0pe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAnZGV0YWlsP2lkPScraXRlbS5pZFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHB1Ymxpc2goKXtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAncHVibGlzaCdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhYm91dCgpe1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdhYm91dCdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG9uTG9hZCgpe1xuICAgICAgICAgIHRoaXMudGhlbWVpbWcgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50aGVtZWltZztcbiAgICAgIH07XG4gICAgICBvblNob3coKXtcbiAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgIHZhciBxdWVyeSA9IG5ldyBBVi5RdWVyeSgnTmV3c0xpc3QnKTtcbiAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBxdWVyeS5sZXNzVGhhbk9yRXF1YWxUbygndXBkYXRlZEF0Jywgbm93KTtcbiAgICAgICAgICBxdWVyeS5kZXNjZW5kaW5nKCd1cGRhdGVkQXQnKTtcbiAgICAgICAgICBxdWVyeS5saW1pdCgzMCk7XG4gICAgICAgICAgcXVlcnkuZmluZCgpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdxdWVyeSBkYXRhJyxkYXRhKTtcbiAgICAgICAgICAgICAgdm0ubWFrZVBhcmFtKGRhdGEpO1xuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgIHZtLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAn5pyN5Yqh5byC5bi477yM6K+356iN5ZCO6YeN6K+VJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbWFrZVBhcmFtKGRhdGEpe1xuICAgICAgICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xuICAgICAgICAgICAgICBsZXQganNvbiA9IGRhdGFbaV0uYXR0cmlidXRlcztcbiAgICAgICAgICAgICAganNvbi5pZCA9IGRhdGFbaV0uaWQ7XG4gICAgICAgICAgICAgIGpzb24udXBkYXRlZEF0ID0gdGhpcy4kcGFyZW50LnRpbWVGb3JtYXRlKGRhdGFbaV0udXBkYXRlZEF0KTtcbiAgICAgICAgICAgICAgYXJyLnB1c2goanNvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGlzdERhdGEgPSBhcnI7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3REYXRhKTtcbiAgICAgIH1cbiAgfVxuIl19