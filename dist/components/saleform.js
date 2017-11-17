'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaleForm = function (_wepy$component) {
    _inherits(SaleForm, _wepy$component);

    function SaleForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SaleForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SaleForm.__proto__ || Object.getPrototypeOf(SaleForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'date': '',
            'time': '08:00',
            'address': '',
            'activityArr': [''],
            'saleIndex': 0,
            'saleJson': [{ 'id': '001', 'name': '超市' }, { 'id': '002', 'name': '服饰' }, { 'id': '003', 'name': '餐饮' }, { 'id': '004', 'name': '其他' }]
        }, _this.porps = {}, _this.methods = {
            saleChange: function saleChange(evt) {
                this.saleIndex = evt.detail.value;
            },
            timeChange: function timeChange(evt) {
                this.time = evt.detail.value;
            },
            dateChange: function dateChange(evt) {
                this.date = evt.detail.value;
            },
            addItem: function addItem() {
                this.activityArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.activityArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.activityArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};
                json.date = this.date;
                json.time = this.time;
                json.address = this.address;
                json.saleId = this.saleJson[this.saleIndex].id;
                json.sale = this.saleJson[this.saleIndex].name;
                json.activityArr = this.activityArr;
                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SaleForm, [{
        key: 'onLoad',
        value: function onLoad() {
            this.dateFormate();
        }
    }, {
        key: 'dateFormate',
        value: function dateFormate() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            this.date = year + '-' + month + '-' + day;
        }
    }]);

    return SaleForm;
}(_wepy2.default.component);

exports.default = SaleForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGVmb3JtLmpzIl0sIm5hbWVzIjpbIlNhbGVGb3JtIiwiZGF0YSIsInBvcnBzIiwibWV0aG9kcyIsInNhbGVDaGFuZ2UiLCJldnQiLCJzYWxlSW5kZXgiLCJkZXRhaWwiLCJ2YWx1ZSIsInRpbWVDaGFuZ2UiLCJ0aW1lIiwiZGF0ZUNoYW5nZSIsImRhdGUiLCJhZGRJdGVtIiwiYWN0aXZpdHlBcnIiLCJwdXNoIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJkZWxldGVJdGVtIiwic3BsaWNlIiwiZXZlbnRzIiwiZmV0Y2giLCJqc29uIiwiYWRkcmVzcyIsInNhbGVJZCIsInNhbGVKc29uIiwiaWQiLCJzYWxlIiwibmFtZSIsIiRlbWl0IiwiZGF0ZUZvcm1hdGUiLCJub3ciLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gsb0JBQVMsRUFETjtBQUVILG9CQUFTLE9BRk47QUFHSCx1QkFBWSxFQUhUO0FBSUgsMkJBQWdCLENBQUMsRUFBRCxDQUpiO0FBS0gseUJBQWMsQ0FMWDtBQU1ILHdCQUFhLENBQ1QsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBRFMsRUFFVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFGUyxFQUdULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQUhTLEVBSVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBSlM7QUFOVixTLFFBYVBDLEssR0FBUSxFLFFBQ1JDLE8sR0FBVTtBQUNOQyxzQkFETSxzQkFDS0MsR0FETCxFQUNTO0FBQ1gscUJBQUtDLFNBQUwsR0FBaUJELElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQUhLO0FBSU5DLHNCQUpNLHNCQUlLSixHQUpMLEVBSVM7QUFDWCxxQkFBS0ssSUFBTCxHQUFZTCxJQUFJRSxNQUFKLENBQVdDLEtBQXZCO0FBQ0gsYUFOSztBQU9ORyxzQkFQTSxzQkFPS04sR0FQTCxFQU9TO0FBQ1gscUJBQUtPLElBQUwsR0FBWVAsSUFBSUUsTUFBSixDQUFXQyxLQUF2QjtBQUNILGFBVEs7QUFVTkssbUJBVk0scUJBVUc7QUFDTCxxQkFBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsRUFBdEI7QUFDSCxhQVpLO0FBYU5DLHFCQWJNLHFCQWFJQyxLQWJKLEVBYVVaLEdBYlYsRUFhYztBQUNoQixxQkFBS1MsV0FBTCxDQUFpQkcsS0FBakIsSUFBMEJaLElBQUlFLE1BQUosQ0FBV0MsS0FBckM7QUFDSCxhQWZLO0FBZ0JOVSxzQkFoQk0sc0JBZ0JLRCxLQWhCTCxFQWdCVztBQUNiLHFCQUFLSCxXQUFMLENBQWlCSyxNQUFqQixDQUF3QkYsS0FBeEIsRUFBOEIsQ0FBOUI7QUFDSDtBQWxCSyxTLFFBb0JWRyxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFDSCxvQkFBSUMsT0FBTyxFQUFYO0FBQ0FBLHFCQUFLVixJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQVUscUJBQUtaLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNBWSxxQkFBS0MsT0FBTCxHQUFlLEtBQUtBLE9BQXBCO0FBQ0FELHFCQUFLRSxNQUFMLEdBQWMsS0FBS0MsUUFBTCxDQUFjLEtBQUtuQixTQUFuQixFQUE4Qm9CLEVBQTVDO0FBQ0FKLHFCQUFLSyxJQUFMLEdBQVksS0FBS0YsUUFBTCxDQUFjLEtBQUtuQixTQUFuQixFQUE4QnNCLElBQTFDO0FBQ0FOLHFCQUFLUixXQUFMLEdBQW1CLEtBQUtBLFdBQXhCO0FBQ0EscUJBQUtlLEtBQUwsQ0FBVyxTQUFYLEVBQXFCUCxJQUFyQjtBQUVIO0FBWEksUzs7Ozs7aUNBYUQ7QUFDSixpQkFBS1EsV0FBTDtBQUNIOzs7c0NBQ1k7QUFDVCxnQkFBSUMsTUFBTSxJQUFJQyxJQUFKLEVBQVY7QUFDQSxnQkFBSUMsT0FBT0YsSUFBSUcsV0FBSixFQUFYO0FBQ0EsZ0JBQUlDLFFBQVFKLElBQUlLLFFBQUosS0FBaUIsQ0FBN0I7QUFDQSxnQkFBSUMsTUFBTU4sSUFBSU8sT0FBSixFQUFWO0FBQ0EsaUJBQUsxQixJQUFMLEdBQVlxQixPQUFPLEdBQVAsR0FBYUUsS0FBYixHQUFxQixHQUFyQixHQUEyQkUsR0FBdkM7QUFDSDs7OztFQXpEa0MsZUFBS0UsUzs7a0JBQXZCdkMsUSIsImZpbGUiOiJzYWxlZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhbGVGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdkYXRlJyA6ICcnLFxuICAgICAgICAndGltZScgOiAnMDg6MDAnLFxuICAgICAgICAnYWRkcmVzcycgOiAnJyxcbiAgICAgICAgJ2FjdGl2aXR5QXJyJyA6IFsnJ10sXG4gICAgICAgICdzYWxlSW5kZXgnIDogMCxcbiAgICAgICAgJ3NhbGVKc29uJyA6IFtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon6LaF5biCJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+acjemlsCd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMycsJ25hbWUnOifppJDppa4nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5YW25LuWJ30sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIHBvcnBzID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2FsZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5zYWxlSW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICB0aW1lQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkYXRlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtKCl7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQoaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlSXRlbShpbmRleCl7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpe1xuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcbiAgICAgICAgICAgIGpzb24uZGF0ZSA9IHRoaXMuZGF0ZTtcbiAgICAgICAgICAgIGpzb24udGltZSA9IHRoaXMudGltZTtcbiAgICAgICAgICAgIGpzb24uYWRkcmVzcyA9IHRoaXMuYWRkcmVzcztcbiAgICAgICAgICAgIGpzb24uc2FsZUlkID0gdGhpcy5zYWxlSnNvblt0aGlzLnNhbGVJbmRleF0uaWQ7XG4gICAgICAgICAgICBqc29uLnNhbGUgPSB0aGlzLnNhbGVKc29uW3RoaXMuc2FsZUluZGV4XS5uYW1lO1xuICAgICAgICAgICAganNvbi5hY3Rpdml0eUFyciA9IHRoaXMuYWN0aXZpdHlBcnI7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRGb3JtJyxqc29uKTtcblxuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgICB9XG59XG4iXX0=