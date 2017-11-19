'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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
            'price': '',
            'address': '',
            'features': '',
            'foodInfoArr': ['']
        }, _this.methods = {
            addItem: function addItem() {
                this.foodInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.foodInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.foodInfoArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return FindForm;
}(_wepy2.default.component);

exports.default = FindForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb2Rmb3JtLmpzIl0sIm5hbWVzIjpbIkZpbmRGb3JtIiwiZGF0YSIsIm1ldGhvZHMiLCJhZGRJdGVtIiwiZm9vZEluZm9BcnIiLCJwdXNoIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJldmVudHMiLCJmZXRjaCIsImpzb24iLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gscUJBQVMsRUFETjtBQUVILHVCQUFZLEVBRlQ7QUFHSCx3QkFBYSxFQUhWO0FBSUgsMkJBQWdCLENBQUMsRUFBRDtBQUpiLFMsUUFNUEMsTyxHQUFVO0FBQ05DLG1CQURNLHFCQUNHO0FBQ0wscUJBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQ0gsYUFISztBQUlOQyxxQkFKTSxxQkFJSUMsS0FKSixFQUlVQyxHQUpWLEVBSWM7QUFDaEIscUJBQUtKLFdBQUwsQ0FBaUJHLEtBQWpCLElBQTBCQyxJQUFJQyxNQUFKLENBQVdDLEtBQXJDO0FBQ0gsYUFOSztBQU9OQyxzQkFQTSxzQkFPS0osS0FQTCxFQU9XO0FBQ2IscUJBQUtILFdBQUwsQ0FBaUJRLE1BQWpCLENBQXdCTCxLQUF4QixFQUE4QixDQUE5QjtBQUNIO0FBVEssUyxRQVdWTSxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFDSCxvQkFBSUMsT0FBTyxFQUFYOztBQUVBLHFCQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFxQkQsSUFBckI7QUFDSDtBQUxJLFM7Ozs7RUFsQjBCLGVBQUtFLFM7O2tCQUF2QmpCLFEiLCJmaWxlIjoiZm9vZGZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAncHJpY2UnOiAnJyxcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdmZWF0dXJlcycgOiAnJyxcbiAgICAgICAgJ2Zvb2RJbmZvQXJyJyA6IFsnJ11cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuZm9vZEluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5mb29kSW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuZm9vZEluZm9BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICAgIGZldGNoKCl7XG4gICAgICAgICAgICB2YXIganNvbiA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRGb3JtJyxqc29uKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=