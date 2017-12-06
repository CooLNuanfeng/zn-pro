'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _imgupload = require('./imgupload.js');

var _imgupload2 = _interopRequireDefault(_imgupload);

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
            'carInfoArr': [''],
            'uploadImgs': null
        }, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
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
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            carFetch: function carFetch() {
                var json = {};

                this.$emit('getCarForm', json);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmZvcm0uanMiXSwibmFtZXMiOlsiQ2FyRm9ybSIsImRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwic3RhcnRkYXRlQ2hhbmdlIiwiZXZ0Iiwic3RhcnREYXRlIiwiZGV0YWlsIiwidmFsdWUiLCJlbmRkYXRlQ2hhbmdlIiwiZW5kRGF0ZSIsImFkZEl0ZW0iLCJjYXJJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsInVwbG9hZENoYW5nZSIsImltZ3MiLCJ1cGxvYWRJbWdzIiwiZXZlbnRzIiwiY2FyRmV0Y2giLCJqc29uIiwiJGVtaXQiLCJkYXRlRm9ybWF0ZSIsIm5vdyIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gscUJBQVUsRUFEUDtBQUVILHVCQUFZLEVBRlQ7QUFHSCx1QkFBWSxFQUhUO0FBSUgseUJBQWMsRUFKWDtBQUtILDBCQUFlLENBQUMsRUFBRCxDQUxaO0FBTUgsMEJBQWU7QUFOWixTLFFBUVJDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxjQUFhLEVBQWQsRUFBZCxFLFFBQ1RDLE8sR0FBVSxFQUFDLGNBQWEsRUFBQyxrQkFBaUIsY0FBbEIsRUFBaUMsa0JBQWlCLGNBQWxELEVBQWQsRSxRQUNUQyxVLEdBQWE7QUFDTjtBQURNLFMsUUFHVkMsTyxHQUFVO0FBQ05DLDJCQURNLDJCQUNVQyxHQURWLEVBQ2M7QUFDaEIscUJBQUtDLFNBQUwsR0FBaUJELElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQUhLO0FBSU5DLHlCQUpNLHlCQUlRSixHQUpSLEVBSVk7QUFDZCxxQkFBS0ssT0FBTCxHQUFlTCxJQUFJRSxNQUFKLENBQVdDLEtBQTFCO0FBQ0gsYUFOSztBQU9ORyxtQkFQTSxxQkFPRztBQUNMLHFCQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixFQUFyQjtBQUNILGFBVEs7QUFVTkMscUJBVk0scUJBVUlDLEtBVkosRUFVVVYsR0FWVixFQVVjO0FBQ2hCLHFCQUFLTyxVQUFMLENBQWdCRyxLQUFoQixJQUF5QlYsSUFBSUUsTUFBSixDQUFXQyxLQUFwQztBQUNILGFBWks7QUFhTlEsc0JBYk0sc0JBYUtELEtBYkwsRUFhVztBQUNiLHFCQUFLSCxVQUFMLENBQWdCSyxNQUFoQixDQUF1QkYsS0FBdkIsRUFBNkIsQ0FBN0I7QUFDSCxhQWZLO0FBZ0JORyx3QkFoQk0sd0JBZ0JPQyxJQWhCUCxFQWdCWTtBQUNkO0FBQ0EscUJBQUtDLFVBQUwsR0FBa0JELElBQWxCO0FBQ0g7QUFuQkssUyxRQXFCVkUsTSxHQUFTO0FBQ0xDLG9CQURLLHNCQUNLO0FBQ04sb0JBQUlDLE9BQU8sRUFBWDs7QUFFQSxxQkFBS0MsS0FBTCxDQUFXLFlBQVgsRUFBd0JELElBQXhCO0FBQ0g7QUFMSSxTOzs7OztpQ0FPRDtBQUNKLGlCQUFLRSxXQUFMO0FBQ0g7OztzQ0FDWTtBQUNULGdCQUFJQyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUNBLGdCQUFJQyxPQUFPRixJQUFJRyxXQUFKLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUosSUFBSUssUUFBSixLQUFpQixDQUE3QjtBQUNBO0FBQ0EsaUJBQUt6QixTQUFMLEdBQWlCc0IsT0FBTyxHQUFQLEdBQWFFLEtBQTlCO0FBQ0EsaUJBQUtwQixPQUFMLEdBQWVrQixPQUFPLEdBQVAsR0FBYUUsS0FBNUI7QUFDSDs7OztFQXJEaUMsZUFBS0UsUzs7a0JBQXRCbkMsTyIsImZpbGUiOiJjYXJmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBpbWdVcGxvYWRGb3JtIGZyb20gJy4vaW1ndXBsb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAncHJpY2UnIDogJycsXG4gICAgICAgICdtaWxlYWdlJyA6ICcnLFxuICAgICAgICAnZW5kRGF0ZScgOiAnJyxcbiAgICAgICAgJ3N0YXJ0RGF0ZScgOiAnJyxcbiAgICAgICAgJ2NhckluZm9BcnInIDogWycnXSxcbiAgICAgICAgJ3VwbG9hZEltZ3MnIDogbnVsbCxcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInVwbG9hZGZvcm1cIjp7XCJ2LW9uOnVwbG9hZEVuZFwiOlwidXBsb2FkQ2hhbmdlXCIsXCJ2LW9uOnVwbG9hZERlbFwiOlwidXBsb2FkQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICd1cGxvYWRmb3JtJyA6IGltZ1VwbG9hZEZvcm1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHN0YXJ0ZGF0ZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbmRkYXRlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtKCl7XG4gICAgICAgICAgICB0aGlzLmNhckluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5jYXJJbmZvQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0oaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5jYXJJbmZvQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkQ2hhbmdlKGltZ3Mpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwbG9hZCBjaGFuZ2UnKTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkSW1ncyA9IGltZ3M7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgY2FyRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldENhckZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgLy8gdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0geWVhciArICctJyArIG1vbnRoO1xuICAgICAgICB0aGlzLmVuZERhdGUgPSB5ZWFyICsgJy0nICsgbW9udGg7XG4gICAgfVxufVxuIl19