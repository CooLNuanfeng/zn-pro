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
            'findInfoArr': [''],
            'uploadImgs': null
        }, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
        }, _this.methods = {
            addressChange: function addressChange(evt) {
                this.address = evt.detail.value;
            },
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
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            findFetch: function findFetch() {
                var json = {};
                json.address = this.address;
                json.date = this.date;
                json.findInfoArr = this.findInfoArr;
                json.images = this.uploadImgs;
                this.$emit('getFindForm', json);
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
            this.date = year + '-' + this.$parent.$parent.toDouble(month) + '-' + this.$parent.$parent.toDouble(day);
        }
    }]);

    return FindForm;
}(_wepy2.default.component);

exports.default = FindForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmRmb3JtLmpzIl0sIm5hbWVzIjpbIkZpbmRGb3JtIiwiZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJhZGRyZXNzQ2hhbmdlIiwiZXZ0IiwiYWRkcmVzcyIsImRldGFpbCIsInZhbHVlIiwiZGF0ZUNoYW5nZSIsImRhdGUiLCJhZGRJdGVtIiwiZmluZEluZm9BcnIiLCJwdXNoIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJkZWxldGVJdGVtIiwic3BsaWNlIiwidXBsb2FkQ2hhbmdlIiwiaW1ncyIsInVwbG9hZEltZ3MiLCJldmVudHMiLCJmaW5kRmV0Y2giLCJqc29uIiwiaW1hZ2VzIiwiJGVtaXQiLCJkYXRlRm9ybWF0ZSIsIm5vdyIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsIiRwYXJlbnQiLCJ0b0RvdWJsZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTztBQUNILHVCQUFZLEVBRFQ7QUFFSCxvQkFBUyxFQUZOO0FBR0gsMkJBQWdCLENBQUMsRUFBRCxDQUhiO0FBSUgsMEJBQWU7QUFKWixTLFFBTVJDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxjQUFhLEVBQWQsRUFBZCxFLFFBQ1RDLE8sR0FBVSxFQUFDLGNBQWEsRUFBQyxrQkFBaUIsY0FBbEIsRUFBaUMsa0JBQWlCLGNBQWxELEVBQWQsRSxRQUNUQyxVLEdBQWE7QUFDTjtBQURNLFMsUUFHVkMsTyxHQUFVO0FBQ05DLHlCQURNLHlCQUNRQyxHQURSLEVBQ1k7QUFDZCxxQkFBS0MsT0FBTCxHQUFlRCxJQUFJRSxNQUFKLENBQVdDLEtBQTFCO0FBQ0gsYUFISztBQUlOQyxzQkFKTSxzQkFJS0osR0FKTCxFQUlTO0FBQ1gscUJBQUtLLElBQUwsR0FBWUwsSUFBSUUsTUFBSixDQUFXQyxLQUF2QjtBQUNILGFBTks7QUFPTkcsbUJBUE0scUJBT0c7QUFDTCxxQkFBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsRUFBdEI7QUFDSCxhQVRLO0FBVU5DLHFCQVZNLHFCQVVJQyxLQVZKLEVBVVVWLEdBVlYsRUFVYztBQUNoQixxQkFBS08sV0FBTCxDQUFpQkcsS0FBakIsSUFBMEJWLElBQUlFLE1BQUosQ0FBV0MsS0FBckM7QUFDSCxhQVpLO0FBYU5RLHNCQWJNLHNCQWFLRCxLQWJMLEVBYVc7QUFDYixxQkFBS0gsV0FBTCxDQUFpQkssTUFBakIsQ0FBd0JGLEtBQXhCLEVBQThCLENBQTlCO0FBQ0gsYUFmSztBQWdCTkcsd0JBaEJNLHdCQWdCT0MsSUFoQlAsRUFnQlk7QUFDZDtBQUNBLHFCQUFLQyxVQUFMLEdBQWtCRCxJQUFsQjtBQUNIO0FBbkJLLFMsUUFxQlZFLE0sR0FBUztBQUNMQyxxQkFESyx1QkFDTTtBQUNQLG9CQUFJQyxPQUFPLEVBQVg7QUFDQUEscUJBQUtqQixPQUFMLEdBQWUsS0FBS0EsT0FBcEI7QUFDQWlCLHFCQUFLYixJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQWEscUJBQUtYLFdBQUwsR0FBbUIsS0FBS0EsV0FBeEI7QUFDQVcscUJBQUtDLE1BQUwsR0FBYyxLQUFLSixVQUFuQjtBQUNBLHFCQUFLSyxLQUFMLENBQVcsYUFBWCxFQUF5QkYsSUFBekI7QUFDSDtBQVJJLFM7Ozs7O2lDQVVEO0FBQ0osaUJBQUtHLFdBQUw7QUFDSDs7O3NDQUNZO0FBQ1QsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0EsZ0JBQUlDLE9BQU9GLElBQUlHLFdBQUosRUFBWDtBQUNBLGdCQUFJQyxRQUFRSixJQUFJSyxRQUFKLEtBQWlCLENBQTdCO0FBQ0EsZ0JBQUlDLE1BQU1OLElBQUlPLE9BQUosRUFBVjtBQUNBLGlCQUFLeEIsSUFBTCxHQUFZbUIsT0FBTyxHQUFQLEdBQWEsS0FBS00sT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxRQUFyQixDQUE4QkwsS0FBOUIsQ0FBYixHQUFvRCxHQUFwRCxHQUF5RCxLQUFLSSxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFFBQXJCLENBQThCSCxHQUE5QixDQUFyRTtBQUNIOzs7O0VBckRrQyxlQUFLSSxTOztrQkFBdkJ4QyxRIiwiZmlsZSI6ImZpbmRmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBpbWdVcGxvYWRGb3JtIGZyb20gJy4vaW1ndXBsb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZEZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdkYXRlJyA6ICcnLFxuICAgICAgICAnZmluZEluZm9BcnInIDogWycnXSxcbiAgICAgICAgJ3VwbG9hZEltZ3MnIDogbnVsbCxcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInVwbG9hZGZvcm1cIjp7XCJ2LW9uOnVwbG9hZEVuZFwiOlwidXBsb2FkQ2hhbmdlXCIsXCJ2LW9uOnVwbG9hZERlbFwiOlwidXBsb2FkQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICd1cGxvYWRmb3JtJyA6IGltZ1VwbG9hZEZvcm1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFkZHJlc3NDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuZmluZEluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5maW5kSW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuZmluZEluZm9BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRDaGFuZ2UoaW1ncyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBsb2FkIGNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRJbWdzID0gaW1ncztcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmaW5kRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLmFkZHJlc3MgPSB0aGlzLmFkZHJlc3M7XG4gICAgICAgICAgICBqc29uLmRhdGUgPSB0aGlzLmRhdGU7XG4gICAgICAgICAgICBqc29uLmZpbmRJbmZvQXJyID0gdGhpcy5maW5kSW5mb0FycjtcbiAgICAgICAgICAgIGpzb24uaW1hZ2VzID0gdGhpcy51cGxvYWRJbWdzO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0RmluZEZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0ZSgpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUoKXtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG5vdy5nZXRNb250aCgpICsgMTtcbiAgICAgICAgdmFyIGRheSA9IG5vdy5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHllYXIgKyAnLScgKyB0aGlzLiRwYXJlbnQuJHBhcmVudC50b0RvdWJsZShtb250aCkgKyAnLScgK3RoaXMuJHBhcmVudC4kcGFyZW50LnRvRG91YmxlKGRheSk7XG4gICAgfVxufVxuIl19