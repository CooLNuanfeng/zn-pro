'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _imgupload = require('./imgupload.js');

var _imgupload2 = _interopRequireDefault(_imgupload);

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
            'foodInfoArr': [''],
            'uploadImgs': null
        }, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
        }, _this.methods = {
            priceChange: function priceChange(evt) {
                this.price = evt.detail.value;
            },
            feaChange: function feaChange(evt) {
                this.features = evt.detail.value;
            },
            addressChange: function addressChange(evt) {
                this.address = evt.detail.value;
            },
            addItem: function addItem() {
                this.foodInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.foodInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.foodInfoArr.splice(index, 1);
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            foodFetch: function foodFetch() {
                var json = {};
                json.price = this.price;
                json.address = this.address;
                json.features = this.features;
                json.foodInfoArr = this.foodInfoArr;
                json.images = this.uploadImgs;
                this.$emit('getFoodForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return FindForm;
}(_wepy2.default.component);

exports.default = FindForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb2Rmb3JtLmpzIl0sIm5hbWVzIjpbIkZpbmRGb3JtIiwiZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJwcmljZUNoYW5nZSIsImV2dCIsInByaWNlIiwiZGV0YWlsIiwidmFsdWUiLCJmZWFDaGFuZ2UiLCJmZWF0dXJlcyIsImFkZHJlc3NDaGFuZ2UiLCJhZGRyZXNzIiwiYWRkSXRlbSIsImZvb2RJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsInVwbG9hZENoYW5nZSIsImltZ3MiLCJ1cGxvYWRJbWdzIiwiZXZlbnRzIiwiZm9vZEZldGNoIiwianNvbiIsImltYWdlcyIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTztBQUNILHFCQUFTLEVBRE47QUFFSCx1QkFBWSxFQUZUO0FBR0gsd0JBQWEsRUFIVjtBQUlILDJCQUFnQixDQUFDLEVBQUQsQ0FKYjtBQUtILDBCQUFlO0FBTFosUyxRQU9SQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsY0FBYSxFQUFkLEVBQWQsRSxRQUNUQyxPLEdBQVUsRUFBQyxjQUFhLEVBQUMsa0JBQWlCLGNBQWxCLEVBQWlDLGtCQUFpQixjQUFsRCxFQUFkLEUsUUFDVEMsVSxHQUFhO0FBQ047QUFETSxTLFFBR1ZDLE8sR0FBVTtBQUNOQyx1QkFETSx1QkFDTUMsR0FETixFQUNVO0FBQ1oscUJBQUtDLEtBQUwsR0FBYUQsSUFBSUUsTUFBSixDQUFXQyxLQUF4QjtBQUNILGFBSEs7QUFJTkMscUJBSk0scUJBSUlKLEdBSkosRUFJUTtBQUNWLHFCQUFLSyxRQUFMLEdBQWdCTCxJQUFJRSxNQUFKLENBQVdDLEtBQTNCO0FBQ0gsYUFOSztBQU9ORyx5QkFQTSx5QkFPUU4sR0FQUixFQU9ZO0FBQ2QscUJBQUtPLE9BQUwsR0FBZVAsSUFBSUUsTUFBSixDQUFXQyxLQUExQjtBQUNILGFBVEs7QUFVTkssbUJBVk0scUJBVUc7QUFDTCxxQkFBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsRUFBdEI7QUFDSCxhQVpLO0FBYU5DLHFCQWJNLHFCQWFJQyxLQWJKLEVBYVVaLEdBYlYsRUFhYztBQUNoQixxQkFBS1MsV0FBTCxDQUFpQkcsS0FBakIsSUFBMEJaLElBQUlFLE1BQUosQ0FBV0MsS0FBckM7QUFDSCxhQWZLO0FBZ0JOVSxzQkFoQk0sc0JBZ0JLRCxLQWhCTCxFQWdCVztBQUNiLHFCQUFLSCxXQUFMLENBQWlCSyxNQUFqQixDQUF3QkYsS0FBeEIsRUFBOEIsQ0FBOUI7QUFDSCxhQWxCSztBQW1CTkcsd0JBbkJNLHdCQW1CT0MsSUFuQlAsRUFtQlk7QUFDZDtBQUNBLHFCQUFLQyxVQUFMLEdBQWtCRCxJQUFsQjtBQUNIO0FBdEJLLFMsUUF3QlZFLE0sR0FBUztBQUNMQyxxQkFESyx1QkFDTTtBQUNQLG9CQUFJQyxPQUFPLEVBQVg7QUFDQUEscUJBQUtuQixLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQW1CLHFCQUFLYixPQUFMLEdBQWUsS0FBS0EsT0FBcEI7QUFDQWEscUJBQUtmLFFBQUwsR0FBZ0IsS0FBS0EsUUFBckI7QUFDQWUscUJBQUtYLFdBQUwsR0FBbUIsS0FBS0EsV0FBeEI7QUFDQVcscUJBQUtDLE1BQUwsR0FBYyxLQUFLSixVQUFuQjtBQUNBLHFCQUFLSyxLQUFMLENBQVcsYUFBWCxFQUF5QkYsSUFBekI7QUFDSDtBQVRJLFM7Ozs7RUF0QzBCLGVBQUtHLFM7O2tCQUF2Qi9CLFEiLCJmaWxlIjoiZm9vZGZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGltZ1VwbG9hZEZvcm0gZnJvbSAnLi9pbWd1cGxvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAncHJpY2UnOiAnJyxcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdmZWF0dXJlcycgOiAnJyxcbiAgICAgICAgJ2Zvb2RJbmZvQXJyJyA6IFsnJ10sXG4gICAgICAgICd1cGxvYWRJbWdzJyA6IG51bGwsXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widXBsb2FkZm9ybVwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1widi1vbjp1cGxvYWRFbmRcIjpcInVwbG9hZENoYW5nZVwiLFwidi1vbjp1cGxvYWREZWxcIjpcInVwbG9hZENoYW5nZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAndXBsb2FkZm9ybScgOiBpbWdVcGxvYWRGb3JtXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBwcmljZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5wcmljZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGZlYUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5mZWF0dXJlcyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3NDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuZm9vZEluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5mb29kSW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuZm9vZEluZm9BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRDaGFuZ2UoaW1ncyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBsb2FkIGNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRJbWdzID0gaW1ncztcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmb29kRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLnByaWNlID0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgIGpzb24uYWRkcmVzcyA9IHRoaXMuYWRkcmVzcztcbiAgICAgICAgICAgIGpzb24uZmVhdHVyZXMgPSB0aGlzLmZlYXR1cmVzO1xuICAgICAgICAgICAganNvbi5mb29kSW5mb0FyciA9IHRoaXMuZm9vZEluZm9BcnI7XG4gICAgICAgICAgICBqc29uLmltYWdlcyA9IHRoaXMudXBsb2FkSW1ncztcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvb2RGb3JtJyxqc29uKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=