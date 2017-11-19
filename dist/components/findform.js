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

var FindForm = function (_wepy$component) {
    _inherits(FindForm, _wepy$component);

    function FindForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FindForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FindForm.__proto__ || Object.getPrototypeOf(FindForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'address': '',
            'date': '',
            'findInfoArr': ['']
        }, _this.methods = {
            dateChange: function dateChange(evt) {
                this.date = evt.detail.value;
            },
            addItem: function addItem() {
                this.findInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.findInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.findInfoArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FindForm, [{
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

    return FindForm;
}(_wepy2.default.component);

exports.default = FindForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmRmb3JtLmpzIl0sIm5hbWVzIjpbIkZpbmRGb3JtIiwiZGF0YSIsIm1ldGhvZHMiLCJkYXRlQ2hhbmdlIiwiZXZ0IiwiZGF0ZSIsImRldGFpbCIsInZhbHVlIiwiYWRkSXRlbSIsImZpbmRJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsIiRlbWl0IiwiZGF0ZUZvcm1hdGUiLCJub3ciLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gsdUJBQVksRUFEVDtBQUVILG9CQUFTLEVBRk47QUFHSCwyQkFBZ0IsQ0FBQyxFQUFEO0FBSGIsUyxRQUtQQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ0tDLEdBREwsRUFDUztBQUNYLHFCQUFLQyxJQUFMLEdBQVlELElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDSCxhQUhLO0FBSU5DLG1CQUpNLHFCQUlHO0FBQ0wscUJBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQ0gsYUFOSztBQU9OQyxxQkFQTSxxQkFPSUMsS0FQSixFQU9VUixHQVBWLEVBT2M7QUFDaEIscUJBQUtLLFdBQUwsQ0FBaUJHLEtBQWpCLElBQTBCUixJQUFJRSxNQUFKLENBQVdDLEtBQXJDO0FBQ0gsYUFUSztBQVVOTSxzQkFWTSxzQkFVS0QsS0FWTCxFQVVXO0FBQ2IscUJBQUtILFdBQUwsQ0FBaUJLLE1BQWpCLENBQXdCRixLQUF4QixFQUE4QixDQUE5QjtBQUNIO0FBWkssUyxRQWNWRyxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFDSCxvQkFBSUMsT0FBTyxFQUFYOztBQUVBLHFCQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFxQkQsSUFBckI7QUFDSDtBQUxJLFM7Ozs7O2lDQU9EO0FBQ0osaUJBQUtFLFdBQUw7QUFDSDs7O3NDQUNZO0FBQ1QsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0EsZ0JBQUlDLE9BQU9GLElBQUlHLFdBQUosRUFBWDtBQUNBLGdCQUFJQyxRQUFRSixJQUFJSyxRQUFKLEtBQWlCLENBQTdCO0FBQ0EsZ0JBQUlDLE1BQU1OLElBQUlPLE9BQUosRUFBVjtBQUNBLGlCQUFLdEIsSUFBTCxHQUFZaUIsT0FBTyxHQUFQLEdBQWFFLEtBQWIsR0FBcUIsR0FBckIsR0FBMEJFLEdBQXRDO0FBQ0g7Ozs7RUFwQ2tDLGVBQUtFLFM7O2tCQUF2QjVCLFEiLCJmaWxlIjoiZmluZGZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAnYWRkcmVzcycgOiAnJyxcbiAgICAgICAgJ2RhdGUnIDogJycsXG4gICAgICAgICdmaW5kSW5mb0FycicgOiBbJyddXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBkYXRlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtKCl7XG4gICAgICAgICAgICB0aGlzLmZpbmRJbmZvQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQoaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZmluZEluZm9BcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlSXRlbShpbmRleCl7XG4gICAgICAgICAgICB0aGlzLmZpbmRJbmZvQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpe1xuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Rm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmRhdGVGb3JtYXRlKCk7XG4gICAgfTtcbiAgICBkYXRlRm9ybWF0ZSgpe1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdmFyIG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xuICAgICAgICB2YXIgZGF5ID0gbm93LmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRlID0geWVhciArICctJyArIG1vbnRoICsgJy0nICtkYXk7XG4gICAgfVxufVxuIl19