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

var FriendForm = function (_wepy$component) {
    _inherits(FriendForm, _wepy$component);

    function FriendForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FriendForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FriendForm.__proto__ || Object.getPrototypeOf(FriendForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'address': '',
            'qqnumber': '',
            'wechartnumber': '',
            'aboutMeArr': [''],
            'hopeTaArr': ['']
        }, _this.methods = {
            addMeItem: function addMeItem() {
                this.aboutMeArr.push('');
            },
            itemMeInput: function itemMeInput(index, evt) {
                this.aboutMeArr[index] = evt.detail.value;
            },
            deleteMeItem: function deleteMeItem(index) {
                this.aboutMeArr.splice(index, 1);
            },
            addTaItem: function addTaItem() {
                this.hopeTaArr.push('');
            },
            itemTaInput: function itemTaInput(index, evt) {
                this.hopeTaArr[index] = evt.detail.value;
            },
            deleteTaItem: function deleteTaItem(index) {
                this.hopeTaArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return FriendForm;
}(_wepy2.default.component);

exports.default = FriendForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyaWVuZGZvcm0uanMiXSwibmFtZXMiOlsiRnJpZW5kRm9ybSIsImRhdGEiLCJtZXRob2RzIiwiYWRkTWVJdGVtIiwiYWJvdXRNZUFyciIsInB1c2giLCJpdGVtTWVJbnB1dCIsImluZGV4IiwiZXZ0IiwiZGV0YWlsIiwidmFsdWUiLCJkZWxldGVNZUl0ZW0iLCJzcGxpY2UiLCJhZGRUYUl0ZW0iLCJob3BlVGFBcnIiLCJpdGVtVGFJbnB1dCIsImRlbGV0ZVRhSXRlbSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxJLEdBQU87QUFDSCx1QkFBWSxFQURUO0FBRUgsd0JBQWEsRUFGVjtBQUdILDZCQUFrQixFQUhmO0FBSUgsMEJBQWUsQ0FBQyxFQUFELENBSlo7QUFLSCx5QkFBYyxDQUFDLEVBQUQ7QUFMWCxTLFFBT1BDLE8sR0FBVTtBQUNOQyxxQkFETSx1QkFDSztBQUNQLHFCQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixFQUFyQjtBQUNILGFBSEs7QUFJTkMsdUJBSk0sdUJBSU1DLEtBSk4sRUFJWUMsR0FKWixFQUlnQjtBQUNsQixxQkFBS0osVUFBTCxDQUFnQkcsS0FBaEIsSUFBeUJDLElBQUlDLE1BQUosQ0FBV0MsS0FBcEM7QUFDSCxhQU5LO0FBT05DLHdCQVBNLHdCQU9PSixLQVBQLEVBT2E7QUFDZixxQkFBS0gsVUFBTCxDQUFnQlEsTUFBaEIsQ0FBdUJMLEtBQXZCLEVBQTZCLENBQTdCO0FBQ0gsYUFUSztBQVVOTSxxQkFWTSx1QkFVSztBQUNQLHFCQUFLQyxTQUFMLENBQWVULElBQWYsQ0FBb0IsRUFBcEI7QUFDSCxhQVpLO0FBYU5VLHVCQWJNLHVCQWFNUixLQWJOLEVBYVlDLEdBYlosRUFhZ0I7QUFDbEIscUJBQUtNLFNBQUwsQ0FBZVAsS0FBZixJQUF3QkMsSUFBSUMsTUFBSixDQUFXQyxLQUFuQztBQUNILGFBZks7QUFnQk5NLHdCQWhCTSx3QkFnQk9ULEtBaEJQLEVBZ0JhO0FBQ2YscUJBQUtPLFNBQUwsQ0FBZUYsTUFBZixDQUFzQkwsS0FBdEIsRUFBNEIsQ0FBNUI7QUFDSDtBQWxCSyxTLFFBb0JWVSxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFDSCxvQkFBSUMsT0FBTyxFQUFYOztBQUVBLHFCQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFxQkQsSUFBckI7QUFDSDtBQUxJLFM7Ozs7RUE1QjRCLGVBQUtFLFM7O2tCQUF6QnJCLFUiLCJmaWxlIjoiZnJpZW5kZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyaWVuZEZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdxcW51bWJlcicgOiAnJyxcbiAgICAgICAgJ3dlY2hhcnRudW1iZXInIDogJycsXG4gICAgICAgICdhYm91dE1lQXJyJyA6IFsnJ10sXG4gICAgICAgICdob3BlVGFBcnInIDogWycnXSxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFkZE1lSXRlbSgpe1xuICAgICAgICAgICAgdGhpcy5hYm91dE1lQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtTWVJbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5hYm91dE1lQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZU1lSXRlbShpbmRleCl7XG4gICAgICAgICAgICB0aGlzLmFib3V0TWVBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRUYUl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuaG9wZVRhQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtVGFJbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5ob3BlVGFBcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlVGFJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuaG9wZVRhQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpe1xuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Rm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19