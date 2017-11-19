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

var OtherForm = function (_wepy$component) {
    _inherits(OtherForm, _wepy$component);

    function OtherForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OtherForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OtherForm.__proto__ || Object.getPrototypeOf(OtherForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'otherInfoArr': ['']
        }, _this.methods = {
            addItem: function addItem() {
                this.otherInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.otherInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.otherInfoArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return OtherForm;
}(_wepy2.default.component);

exports.default = OtherForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm90aGVyZm9ybS5qcyJdLCJuYW1lcyI6WyJPdGhlckZvcm0iLCJkYXRhIiwibWV0aG9kcyIsImFkZEl0ZW0iLCJvdGhlckluZm9BcnIiLCJwdXNoIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJldmVudHMiLCJmZXRjaCIsImpzb24iLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0gsNEJBQWlCLENBQUMsRUFBRDtBQURkLFMsUUFHUEMsTyxHQUFVO0FBQ05DLG1CQURNLHFCQUNHO0FBQ0wscUJBQUtDLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLEVBQXZCO0FBQ0gsYUFISztBQUlOQyxxQkFKTSxxQkFJSUMsS0FKSixFQUlVQyxHQUpWLEVBSWM7QUFDaEIscUJBQUtKLFlBQUwsQ0FBa0JHLEtBQWxCLElBQTJCQyxJQUFJQyxNQUFKLENBQVdDLEtBQXRDO0FBQ0gsYUFOSztBQU9OQyxzQkFQTSxzQkFPS0osS0FQTCxFQU9XO0FBQ2IscUJBQUtILFlBQUwsQ0FBa0JRLE1BQWxCLENBQXlCTCxLQUF6QixFQUErQixDQUEvQjtBQUNIO0FBVEssUyxRQVdWTSxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFDSCxvQkFBSUMsT0FBTyxFQUFYOztBQUVBLHFCQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFxQkQsSUFBckI7QUFDSDtBQUxJLFM7Ozs7RUFmMkIsZUFBS0UsUzs7a0JBQXhCakIsUyIsImZpbGUiOiJvdGhlcmZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdGhlckZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ290aGVySW5mb0FycicgOiBbJyddXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBhZGRJdGVtKCl7XG4gICAgICAgICAgICB0aGlzLm90aGVySW5mb0Fyci5wdXNoKCcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KGluZGV4LGV2dCl7XG4gICAgICAgICAgICB0aGlzLm90aGVySW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMub3RoZXJJbmZvQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpe1xuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Rm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19