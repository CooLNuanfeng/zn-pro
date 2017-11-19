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
            'category': '',
            'price': '',
            'petInfoArr': [''],
            'ageIndex': 0,
            'age': ['一个月', '两个月', '三个月', '一年', '两年', '三年', '三年以上']
        }, _this.methods = {
            ageChange: function ageChange(evt) {
                this.ageIndex = evt.detail.value;
            },
            addItem: function addItem() {
                this.petInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.petInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.petInfoArr.splice(index, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBldGZvcm0uanMiXSwibmFtZXMiOlsiRmluZEZvcm0iLCJkYXRhIiwibWV0aG9kcyIsImFnZUNoYW5nZSIsImV2dCIsImFnZUluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJhZGRJdGVtIiwicGV0SW5mb0FyciIsInB1c2giLCJpdGVtSW5wdXQiLCJpbmRleCIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJldmVudHMiLCJmZXRjaCIsImpzb24iLCIkZW1pdCIsImRhdGVGb3JtYXRlIiwibm93IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiZGF0ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxJLEdBQU87QUFDSCx3QkFBYSxFQURWO0FBRUgscUJBQVUsRUFGUDtBQUdILDBCQUFlLENBQUMsRUFBRCxDQUhaO0FBSUgsd0JBQWEsQ0FKVjtBQUtILG1CQUFRLENBQUMsS0FBRCxFQUFPLEtBQVAsRUFBYSxLQUFiLEVBQW1CLElBQW5CLEVBQXdCLElBQXhCLEVBQTZCLElBQTdCLEVBQWtDLE1BQWxDO0FBTEwsUyxRQU9QQyxPLEdBQVU7QUFDTkMscUJBRE0scUJBQ0lDLEdBREosRUFDUTtBQUNWLHFCQUFLQyxRQUFMLEdBQWdCRCxJQUFJRSxNQUFKLENBQVdDLEtBQTNCO0FBQ0gsYUFISztBQUlOQyxtQkFKTSxxQkFJRztBQUNMLHFCQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixFQUFyQjtBQUNILGFBTks7QUFPTkMscUJBUE0scUJBT0lDLEtBUEosRUFPVVIsR0FQVixFQU9jO0FBQ2hCLHFCQUFLSyxVQUFMLENBQWdCRyxLQUFoQixJQUF5QlIsSUFBSUUsTUFBSixDQUFXQyxLQUFwQztBQUNILGFBVEs7QUFVTk0sc0JBVk0sc0JBVUtELEtBVkwsRUFVVztBQUNiLHFCQUFLSCxVQUFMLENBQWdCSyxNQUFoQixDQUF1QkYsS0FBdkIsRUFBNkIsQ0FBN0I7QUFDSDtBQVpLLFMsUUFjVkcsTSxHQUFTO0FBQ0xDLGlCQURLLG1CQUNFO0FBQ0gsb0JBQUlDLE9BQU8sRUFBWDs7QUFFQSxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBcUJELElBQXJCO0FBQ0g7QUFMSSxTOzs7OztpQ0FPRDtBQUNKLGlCQUFLRSxXQUFMO0FBQ0g7OztzQ0FDWTtBQUNULGdCQUFJQyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUNBLGdCQUFJQyxPQUFPRixJQUFJRyxXQUFKLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUosSUFBSUssUUFBSixLQUFpQixDQUE3QjtBQUNBLGdCQUFJQyxNQUFNTixJQUFJTyxPQUFKLEVBQVY7QUFDQSxpQkFBS0MsSUFBTCxHQUFZTixPQUFPLEdBQVAsR0FBYUUsS0FBYixHQUFxQixHQUFyQixHQUEwQkUsR0FBdEM7QUFDSDs7OztFQXRDa0MsZUFBS0csUzs7a0JBQXZCN0IsUSIsImZpbGUiOiJwZXRmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZEZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ2NhdGVnb3J5JyA6ICcnLFxuICAgICAgICAncHJpY2UnIDogJycsXG4gICAgICAgICdwZXRJbmZvQXJyJyA6IFsnJ10sXG4gICAgICAgICdhZ2VJbmRleCcgOiAwLFxuICAgICAgICAnYWdlJyA6IFsn5LiA5Liq5pyIJywn5Lik5Liq5pyIJywn5LiJ5Liq5pyIJywn5LiA5bm0Jywn5Lik5bm0Jywn5LiJ5bm0Jywn5LiJ5bm05Lul5LiKJ11cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFnZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5hZ2VJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMucGV0SW5mb0Fyci5wdXNoKCcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KGluZGV4LGV2dCl7XG4gICAgICAgICAgICB0aGlzLnBldEluZm9BcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlSXRlbShpbmRleCl7XG4gICAgICAgICAgICB0aGlzLnBldEluZm9BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICAgIGZldGNoKCl7XG4gICAgICAgICAgICB2YXIganNvbiA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRGb3JtJyxqc29uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdGUoKTtcbiAgICB9O1xuICAgIGRhdGVGb3JtYXRlKCl7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuICAgICAgICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgK2RheTtcbiAgICB9XG59XG4iXX0=