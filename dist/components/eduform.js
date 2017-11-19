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

var EduForm = function (_wepy$component) {
    _inherits(EduForm, _wepy$component);

    function EduForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, EduForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EduForm.__proto__ || Object.getPrototypeOf(EduForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'price': '',
            'address': '',
            'endDate': '',
            'startDate': '',
            'eduInfoArr': ['']
        }, _this.methods = {
            startdateChange: function startdateChange(evt) {
                this.startDate = evt.detail.value;
            },
            enddateChange: function enddateChange(evt) {
                this.endDate = evt.detail.value;
            },
            addItem: function addItem() {
                this.eduInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.eduInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.eduInfoArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EduForm, [{
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
            this.startDate = year + '-' + month + '-' + day;
            this.endDate = year + '-' + month + '-' + day;
        }
    }]);

    return EduForm;
}(_wepy2.default.component);

exports.default = EduForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkdWZvcm0uanMiXSwibmFtZXMiOlsiRWR1Rm9ybSIsImRhdGEiLCJtZXRob2RzIiwic3RhcnRkYXRlQ2hhbmdlIiwiZXZ0Iiwic3RhcnREYXRlIiwiZGV0YWlsIiwidmFsdWUiLCJlbmRkYXRlQ2hhbmdlIiwiZW5kRGF0ZSIsImFkZEl0ZW0iLCJlZHVJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsIiRlbWl0IiwiZGF0ZUZvcm1hdGUiLCJub3ciLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gscUJBQVUsRUFEUDtBQUVILHVCQUFZLEVBRlQ7QUFHSCx1QkFBWSxFQUhUO0FBSUgseUJBQWMsRUFKWDtBQUtILDBCQUFlLENBQUMsRUFBRDtBQUxaLFMsUUFPUEMsTyxHQUFVO0FBQ05DLDJCQURNLDJCQUNVQyxHQURWLEVBQ2M7QUFDaEIscUJBQUtDLFNBQUwsR0FBaUJELElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQUhLO0FBSU5DLHlCQUpNLHlCQUlRSixHQUpSLEVBSVk7QUFDZCxxQkFBS0ssT0FBTCxHQUFlTCxJQUFJRSxNQUFKLENBQVdDLEtBQTFCO0FBQ0gsYUFOSztBQU9ORyxtQkFQTSxxQkFPRztBQUNMLHFCQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixFQUFyQjtBQUNILGFBVEs7QUFVTkMscUJBVk0scUJBVUlDLEtBVkosRUFVVVYsR0FWVixFQVVjO0FBQ2hCLHFCQUFLTyxVQUFMLENBQWdCRyxLQUFoQixJQUF5QlYsSUFBSUUsTUFBSixDQUFXQyxLQUFwQztBQUNILGFBWks7QUFhTlEsc0JBYk0sc0JBYUtELEtBYkwsRUFhVztBQUNiLHFCQUFLSCxVQUFMLENBQWdCSyxNQUFoQixDQUF1QkYsS0FBdkIsRUFBNkIsQ0FBN0I7QUFDSDtBQWZLLFMsUUFpQlZHLE0sR0FBUztBQUNMQyxpQkFESyxtQkFDRTtBQUNILG9CQUFJQyxPQUFPLEVBQVg7O0FBRUEscUJBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXFCRCxJQUFyQjtBQUNIO0FBTEksUzs7Ozs7aUNBT0Q7QUFDSixpQkFBS0UsV0FBTDtBQUNIOzs7c0NBQ1k7QUFDVCxnQkFBSUMsTUFBTSxJQUFJQyxJQUFKLEVBQVY7QUFDQSxnQkFBSUMsT0FBT0YsSUFBSUcsV0FBSixFQUFYO0FBQ0EsZ0JBQUlDLFFBQVFKLElBQUlLLFFBQUosS0FBaUIsQ0FBN0I7QUFDQSxnQkFBSUMsTUFBTU4sSUFBSU8sT0FBSixFQUFWO0FBQ0EsaUJBQUt4QixTQUFMLEdBQWlCbUIsT0FBTyxHQUFQLEdBQWFFLEtBQWIsR0FBcUIsR0FBckIsR0FBMkJFLEdBQTVDO0FBQ0EsaUJBQUtuQixPQUFMLEdBQWVlLE9BQU8sR0FBUCxHQUFhRSxLQUFiLEdBQXFCLEdBQXJCLEdBQTJCRSxHQUExQztBQUNIOzs7O0VBMUNpQyxlQUFLRSxTOztrQkFBdEI5QixPIiwiZmlsZSI6ImVkdWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZHVGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdwcmljZScgOiAnJyxcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdlbmREYXRlJyA6ICcnLFxuICAgICAgICAnc3RhcnREYXRlJyA6ICcnLFxuICAgICAgICAnZWR1SW5mb0FycicgOiBbJyddXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzdGFydGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kZGF0ZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbSgpe1xuICAgICAgICAgICAgdGhpcy5lZHVJbmZvQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQoaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZWR1SW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuZWR1SW5mb0Fyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgZmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICAgICAgICB0aGlzLmVuZERhdGUgPSB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gICAgfVxufVxuIl19