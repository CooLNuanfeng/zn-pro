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

var CarForm = function (_wepy$component) {
    _inherits(CarForm, _wepy$component);

    function CarForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CarForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CarForm.__proto__ || Object.getPrototypeOf(CarForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'price': '',
            'mileage': '',
            'endDate': '',
            'startDate': '',
            'carInfoArr': ['']
        }, _this.methods = {
            startdateChange: function startdateChange(evt) {
                this.startDate = evt.detail.value;
            },
            enddateChange: function enddateChange(evt) {
                this.endDate = evt.detail.value;
            },
            addItem: function addItem() {
                this.carInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.carInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.carInfoArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CarForm, [{
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
            // var day = now.getDate();
            this.startDate = year + '-' + month;
            this.endDate = year + '-' + month;
        }
    }]);

    return CarForm;
}(_wepy2.default.component);

exports.default = CarForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmZvcm0uanMiXSwibmFtZXMiOlsiQ2FyRm9ybSIsImRhdGEiLCJtZXRob2RzIiwic3RhcnRkYXRlQ2hhbmdlIiwiZXZ0Iiwic3RhcnREYXRlIiwiZGV0YWlsIiwidmFsdWUiLCJlbmRkYXRlQ2hhbmdlIiwiZW5kRGF0ZSIsImFkZEl0ZW0iLCJjYXJJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsIiRlbWl0IiwiZGF0ZUZvcm1hdGUiLCJub3ciLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSCxxQkFBVSxFQURQO0FBRUgsdUJBQVksRUFGVDtBQUdILHVCQUFZLEVBSFQ7QUFJSCx5QkFBYyxFQUpYO0FBS0gsMEJBQWUsQ0FBQyxFQUFEO0FBTFosUyxRQU9QQyxPLEdBQVU7QUFDTkMsMkJBRE0sMkJBQ1VDLEdBRFYsRUFDYztBQUNoQixxQkFBS0MsU0FBTCxHQUFpQkQsSUFBSUUsTUFBSixDQUFXQyxLQUE1QjtBQUNILGFBSEs7QUFJTkMseUJBSk0seUJBSVFKLEdBSlIsRUFJWTtBQUNkLHFCQUFLSyxPQUFMLEdBQWVMLElBQUlFLE1BQUosQ0FBV0MsS0FBMUI7QUFDSCxhQU5LO0FBT05HLG1CQVBNLHFCQU9HO0FBQ0wscUJBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLEVBQXJCO0FBQ0gsYUFUSztBQVVOQyxxQkFWTSxxQkFVSUMsS0FWSixFQVVVVixHQVZWLEVBVWM7QUFDaEIscUJBQUtPLFVBQUwsQ0FBZ0JHLEtBQWhCLElBQXlCVixJQUFJRSxNQUFKLENBQVdDLEtBQXBDO0FBQ0gsYUFaSztBQWFOUSxzQkFiTSxzQkFhS0QsS0FiTCxFQWFXO0FBQ2IscUJBQUtILFVBQUwsQ0FBZ0JLLE1BQWhCLENBQXVCRixLQUF2QixFQUE2QixDQUE3QjtBQUNIO0FBZkssUyxRQWlCVkcsTSxHQUFTO0FBQ0xDLGlCQURLLG1CQUNFO0FBQ0gsb0JBQUlDLE9BQU8sRUFBWDs7QUFFQSxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBcUJELElBQXJCO0FBQ0g7QUFMSSxTOzs7OztpQ0FPRDtBQUNKLGlCQUFLRSxXQUFMO0FBQ0g7OztzQ0FDWTtBQUNULGdCQUFJQyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUNBLGdCQUFJQyxPQUFPRixJQUFJRyxXQUFKLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUosSUFBSUssUUFBSixLQUFpQixDQUE3QjtBQUNBO0FBQ0EsaUJBQUt0QixTQUFMLEdBQWlCbUIsT0FBTyxHQUFQLEdBQWFFLEtBQTlCO0FBQ0EsaUJBQUtqQixPQUFMLEdBQWVlLE9BQU8sR0FBUCxHQUFhRSxLQUE1QjtBQUNIOzs7O0VBMUNpQyxlQUFLRSxTOztrQkFBdEI1QixPIiwiZmlsZSI6ImNhcmZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdwcmljZScgOiAnJyxcbiAgICAgICAgJ21pbGVhZ2UnIDogJycsXG4gICAgICAgICdlbmREYXRlJyA6ICcnLFxuICAgICAgICAnc3RhcnREYXRlJyA6ICcnLFxuICAgICAgICAnY2FySW5mb0FycicgOiBbJyddXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzdGFydGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kZGF0ZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbSgpe1xuICAgICAgICAgICAgdGhpcy5jYXJJbmZvQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQoaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuY2FySW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuY2FySW5mb0Fyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgZmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgLy8gdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0geWVhciArICctJyArIG1vbnRoO1xuICAgICAgICB0aGlzLmVuZERhdGUgPSB5ZWFyICsgJy0nICsgbW9udGg7XG4gICAgfVxufVxuIl19