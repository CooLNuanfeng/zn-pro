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
            'saleIndex': 0,
            'saleJson': [{ 'id': '001', 'name': '超市' }, { 'id': '002', 'name': '服饰' }, { 'id': '003', 'name': '餐饮' }, { 'id': '004', 'name': '其他' }]
        }, _this.methods = {
            saleChange: function saleChange(evt) {
                this.saleIndex = evt.detail.value;
            },
            timeChange: function timeChange(evt) {
                console.log(evt);
                this.time = evt.detail.value;
            },
            dateChange: function dateChange(evt) {
                console.log(evt);
                this.date = evt.detail.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGVmb3JtLmpzIl0sIm5hbWVzIjpbIlNhbGVGb3JtIiwiZGF0YSIsIm1ldGhvZHMiLCJzYWxlQ2hhbmdlIiwiZXZ0Iiwic2FsZUluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJ0aW1lQ2hhbmdlIiwiY29uc29sZSIsImxvZyIsInRpbWUiLCJkYXRlQ2hhbmdlIiwiZGF0ZSIsImRhdGVGb3JtYXRlIiwibm93IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTztBQUNILG9CQUFTLEVBRE47QUFFSCxvQkFBUyxPQUZOO0FBR0gseUJBQWMsQ0FIWDtBQUlILHdCQUFhLENBQ1QsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBRFMsRUFFVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFGUyxFQUdULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQUhTLEVBSVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBSlM7QUFKVixTLFFBV1BDLE8sR0FBVTtBQUNOQyxzQkFETSxzQkFDS0MsR0FETCxFQUNTO0FBQ1gscUJBQUtDLFNBQUwsR0FBaUJELElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQUhLO0FBSU5DLHNCQUpNLHNCQUlLSixHQUpMLEVBSVM7QUFDWEssd0JBQVFDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBLHFCQUFLTyxJQUFMLEdBQVlQLElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDSCxhQVBLO0FBUU5LLHNCQVJNLHNCQVFLUixHQVJMLEVBUVM7QUFDWEssd0JBQVFDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBLHFCQUFLUyxJQUFMLEdBQVlULElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDSDtBQVhLLFM7Ozs7O2lDQWFGO0FBQ0osaUJBQUtPLFdBQUw7QUFDSDs7O3NDQUNZO0FBQ1QsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0EsZ0JBQUlDLE9BQU9GLElBQUlHLFdBQUosRUFBWDtBQUNBLGdCQUFJQyxRQUFRSixJQUFJSyxRQUFKLEtBQWlCLENBQTdCO0FBQ0EsZ0JBQUlDLE1BQU1OLElBQUlPLE9BQUosRUFBVjtBQUNBLGlCQUFLVCxJQUFMLEdBQVlJLE9BQU8sR0FBUCxHQUFhRSxLQUFiLEdBQXFCLEdBQXJCLEdBQTJCRSxHQUF2QztBQUNIOzs7O0VBbENrQyxlQUFLRSxTOztrQkFBdkJ2QixRIiwiZmlsZSI6InNhbGVmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2FsZUZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ2RhdGUnIDogJycsXG4gICAgICAgICd0aW1lJyA6ICcwODowMCcsXG4gICAgICAgICdzYWxlSW5kZXgnIDogMCxcbiAgICAgICAgJ3NhbGVKc29uJyA6IFtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon6LaF5biCJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+acjemlsCd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMycsJ25hbWUnOifppJDppa4nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5YW25LuWJ30sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNhbGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc2FsZUluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdGltZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0KTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2dCk7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdGUoKTtcbiAgICB9O1xuICAgIGRhdGVGb3JtYXRlKCl7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuICAgICAgICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gICAgfVxufVxuIl19