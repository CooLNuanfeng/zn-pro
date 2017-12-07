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
            priceChange: function priceChange(evt) {
                this.price = evt.detail.value;
            },
            mileChange: function mileChange(evt) {
                this.mileage = evt.detail.value;
            },
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
                json.price = this.price;
                json.mileage = this.mileage;
                json.endDate = this.endDate;
                json.startDate = this.startDate;
                json.carInfoArr = this.carInfoArr;
                json.images = this.uploadImgs;
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
            this.startDate = year + '-' + this.$parent.$parent.toDouble(month);
            this.endDate = year + '-' + this.$parent.$parent.toDouble(month);
        }
    }]);

    return CarForm;
}(_wepy2.default.component);

exports.default = CarForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmZvcm0uanMiXSwibmFtZXMiOlsiQ2FyRm9ybSIsImRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwicHJpY2VDaGFuZ2UiLCJldnQiLCJwcmljZSIsImRldGFpbCIsInZhbHVlIiwibWlsZUNoYW5nZSIsIm1pbGVhZ2UiLCJzdGFydGRhdGVDaGFuZ2UiLCJzdGFydERhdGUiLCJlbmRkYXRlQ2hhbmdlIiwiZW5kRGF0ZSIsImFkZEl0ZW0iLCJjYXJJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsInVwbG9hZENoYW5nZSIsImltZ3MiLCJ1cGxvYWRJbWdzIiwiZXZlbnRzIiwiY2FyRmV0Y2giLCJqc29uIiwiaW1hZ2VzIiwiJGVtaXQiLCJkYXRlRm9ybWF0ZSIsIm5vdyIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiJHBhcmVudCIsInRvRG91YmxlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gscUJBQVUsRUFEUDtBQUVILHVCQUFZLEVBRlQ7QUFHSCx1QkFBWSxFQUhUO0FBSUgseUJBQWMsRUFKWDtBQUtILDBCQUFlLENBQUMsRUFBRCxDQUxaO0FBTUgsMEJBQWU7QUFOWixTLFFBUVJDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxjQUFhLEVBQWQsRUFBZCxFLFFBQ1RDLE8sR0FBVSxFQUFDLGNBQWEsRUFBQyxrQkFBaUIsY0FBbEIsRUFBaUMsa0JBQWlCLGNBQWxELEVBQWQsRSxRQUNUQyxVLEdBQWE7QUFDTjtBQURNLFMsUUFHVkMsTyxHQUFVO0FBQ05DLHVCQURNLHVCQUNNQyxHQUROLEVBQ1U7QUFDWixxQkFBS0MsS0FBTCxHQUFhRCxJQUFJRSxNQUFKLENBQVdDLEtBQXhCO0FBQ0gsYUFISztBQUlOQyxzQkFKTSxzQkFJS0osR0FKTCxFQUlTO0FBQ1gscUJBQUtLLE9BQUwsR0FBZUwsSUFBSUUsTUFBSixDQUFXQyxLQUExQjtBQUNILGFBTks7QUFPTkcsMkJBUE0sMkJBT1VOLEdBUFYsRUFPYztBQUNoQixxQkFBS08sU0FBTCxHQUFpQlAsSUFBSUUsTUFBSixDQUFXQyxLQUE1QjtBQUNILGFBVEs7QUFVTksseUJBVk0seUJBVVFSLEdBVlIsRUFVWTtBQUNkLHFCQUFLUyxPQUFMLEdBQWVULElBQUlFLE1BQUosQ0FBV0MsS0FBMUI7QUFDSCxhQVpLO0FBYU5PLG1CQWJNLHFCQWFHO0FBQ0wscUJBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLEVBQXJCO0FBQ0gsYUFmSztBQWdCTkMscUJBaEJNLHFCQWdCSUMsS0FoQkosRUFnQlVkLEdBaEJWLEVBZ0JjO0FBQ2hCLHFCQUFLVyxVQUFMLENBQWdCRyxLQUFoQixJQUF5QmQsSUFBSUUsTUFBSixDQUFXQyxLQUFwQztBQUNILGFBbEJLO0FBbUJOWSxzQkFuQk0sc0JBbUJLRCxLQW5CTCxFQW1CVztBQUNiLHFCQUFLSCxVQUFMLENBQWdCSyxNQUFoQixDQUF1QkYsS0FBdkIsRUFBNkIsQ0FBN0I7QUFDSCxhQXJCSztBQXNCTkcsd0JBdEJNLHdCQXNCT0MsSUF0QlAsRUFzQlk7QUFDZDtBQUNBLHFCQUFLQyxVQUFMLEdBQWtCRCxJQUFsQjtBQUNIO0FBekJLLFMsUUEyQlZFLE0sR0FBUztBQUNMQyxvQkFESyxzQkFDSztBQUNOLG9CQUFJQyxPQUFPLEVBQVg7QUFDQUEscUJBQUtyQixLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQXFCLHFCQUFLakIsT0FBTCxHQUFlLEtBQUtBLE9BQXBCO0FBQ0FpQixxQkFBS2IsT0FBTCxHQUFlLEtBQUtBLE9BQXBCO0FBQ0FhLHFCQUFLZixTQUFMLEdBQWlCLEtBQUtBLFNBQXRCO0FBQ0FlLHFCQUFLWCxVQUFMLEdBQWtCLEtBQUtBLFVBQXZCO0FBQ0FXLHFCQUFLQyxNQUFMLEdBQWMsS0FBS0osVUFBbkI7QUFDQSxxQkFBS0ssS0FBTCxDQUFXLFlBQVgsRUFBd0JGLElBQXhCO0FBQ0g7QUFWSSxTOzs7OztpQ0FZRDtBQUNKLGlCQUFLRyxXQUFMO0FBQ0g7OztzQ0FDWTtBQUNULGdCQUFJQyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUNBLGdCQUFJQyxPQUFPRixJQUFJRyxXQUFKLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUosSUFBSUssUUFBSixLQUFpQixDQUE3QjtBQUNBO0FBQ0EsaUJBQUt4QixTQUFMLEdBQWlCcUIsT0FBTyxHQUFQLEdBQWEsS0FBS0ksT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxRQUFyQixDQUE4QkgsS0FBOUIsQ0FBOUI7QUFDQSxpQkFBS3JCLE9BQUwsR0FBZW1CLE9BQU8sR0FBUCxHQUFhLEtBQUtJLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsUUFBckIsQ0FBOEJILEtBQTlCLENBQTVCO0FBQ0g7Ozs7RUFoRWlDLGVBQUtJLFM7O2tCQUF0QjFDLE8iLCJmaWxlIjoiY2FyZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgaW1nVXBsb2FkRm9ybSBmcm9tICcuL2ltZ3VwbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhckZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ3ByaWNlJyA6ICcnLFxuICAgICAgICAnbWlsZWFnZScgOiAnJyxcbiAgICAgICAgJ2VuZERhdGUnIDogJycsXG4gICAgICAgICdzdGFydERhdGUnIDogJycsXG4gICAgICAgICdjYXJJbmZvQXJyJyA6IFsnJ10sXG4gICAgICAgICd1cGxvYWRJbWdzJyA6IG51bGwsXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widXBsb2FkZm9ybVwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1widi1vbjp1cGxvYWRFbmRcIjpcInVwbG9hZENoYW5nZVwiLFwidi1vbjp1cGxvYWREZWxcIjpcInVwbG9hZENoYW5nZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAndXBsb2FkZm9ybScgOiBpbWdVcGxvYWRGb3JtXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBwcmljZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5wcmljZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIG1pbGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMubWlsZWFnZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0ZGF0ZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbmRkYXRlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtKCl7XG4gICAgICAgICAgICB0aGlzLmNhckluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5jYXJJbmZvQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0oaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5jYXJJbmZvQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkQ2hhbmdlKGltZ3Mpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwbG9hZCBjaGFuZ2UnKTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkSW1ncyA9IGltZ3M7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgY2FyRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLnByaWNlID0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgIGpzb24ubWlsZWFnZSA9IHRoaXMubWlsZWFnZTtcbiAgICAgICAgICAgIGpzb24uZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZTtcbiAgICAgICAgICAgIGpzb24uc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGU7XG4gICAgICAgICAgICBqc29uLmNhckluZm9BcnIgPSB0aGlzLmNhckluZm9BcnI7XG4gICAgICAgICAgICBqc29uLmltYWdlcyA9IHRoaXMudXBsb2FkSW1ncztcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldENhckZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgLy8gdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0geWVhciArICctJyArIHRoaXMuJHBhcmVudC4kcGFyZW50LnRvRG91YmxlKG1vbnRoKTtcbiAgICAgICAgdGhpcy5lbmREYXRlID0geWVhciArICctJyArIHRoaXMuJHBhcmVudC4kcGFyZW50LnRvRG91YmxlKG1vbnRoKTtcbiAgICB9XG59XG4iXX0=