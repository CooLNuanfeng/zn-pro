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

// import imgUploadForm from './imgupload';

var SaleForm = function (_wepy$component) {
    _inherits(SaleForm, _wepy$component);

    function SaleForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SaleForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SaleForm.__proto__ || Object.getPrototypeOf(SaleForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'date': '',
            'time': '08:00',
            'address': '',
            'activityArr': [''],
            'saleIndex': 0,
            'saleJson': [{ 'id': '001', 'name': '超市' }, { 'id': '002', 'name': '服饰' }, { 'id': '003', 'name': '餐饮' }, { 'id': '004', 'name': '其他' }]
        }, _this.porps = {}, _this.components = {
            // 'uploadform' : imgUploadForm
        }, _this.methods = {
            saleChange: function saleChange(evt) {
                this.saleIndex = evt.detail.value;
            },
            timeChange: function timeChange(evt) {
                this.time = evt.detail.value;
            },
            dateChange: function dateChange(evt) {
                this.date = evt.detail.value;
            },
            addItem: function addItem() {
                this.activityArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.activityArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.activityArr.splice(index, 1);
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};
                json.date = this.date;
                json.time = this.time;
                json.address = this.address;
                json.saleId = this.saleJson[this.saleIndex].id;
                json.sale = this.saleJson[this.saleIndex].name;
                json.activityArr = this.activityArr;
                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SaleForm, [{
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

    return SaleForm;
}(_wepy2.default.component);

exports.default = SaleForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGVmb3JtLmpzIl0sIm5hbWVzIjpbIlNhbGVGb3JtIiwiZGF0YSIsInBvcnBzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJzYWxlQ2hhbmdlIiwiZXZ0Iiwic2FsZUluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJ0aW1lQ2hhbmdlIiwidGltZSIsImRhdGVDaGFuZ2UiLCJkYXRlIiwiYWRkSXRlbSIsImFjdGl2aXR5QXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsImFkZHJlc3MiLCJzYWxlSWQiLCJzYWxlSnNvbiIsImlkIiwic2FsZSIsIm5hbWUiLCIkZW1pdCIsImRhdGVGb3JtYXRlIiwibm93IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBTztBQUNILG9CQUFTLEVBRE47QUFFSCxvQkFBUyxPQUZOO0FBR0gsdUJBQVksRUFIVDtBQUlILDJCQUFnQixDQUFDLEVBQUQsQ0FKYjtBQUtILHlCQUFjLENBTFg7QUFNSCx3QkFBYSxDQUNULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQURTLEVBRVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBRlMsRUFHVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFIUyxFQUlULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQUpTO0FBTlYsUyxRQWFQQyxLLEdBQVEsRSxRQUNSQyxVLEdBQWE7QUFDVDtBQURTLFMsUUFHYkMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxHQURMLEVBQ1M7QUFDWCxxQkFBS0MsU0FBTCxHQUFpQkQsSUFBSUUsTUFBSixDQUFXQyxLQUE1QjtBQUNILGFBSEs7QUFJTkMsc0JBSk0sc0JBSUtKLEdBSkwsRUFJUztBQUNYLHFCQUFLSyxJQUFMLEdBQVlMLElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDSCxhQU5LO0FBT05HLHNCQVBNLHNCQU9LTixHQVBMLEVBT1M7QUFDWCxxQkFBS08sSUFBTCxHQUFZUCxJQUFJRSxNQUFKLENBQVdDLEtBQXZCO0FBQ0gsYUFUSztBQVVOSyxtQkFWTSxxQkFVRztBQUNMLHFCQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUFzQixFQUF0QjtBQUNILGFBWks7QUFhTkMscUJBYk0scUJBYUlDLEtBYkosRUFhVVosR0FiVixFQWFjO0FBQ2hCLHFCQUFLUyxXQUFMLENBQWlCRyxLQUFqQixJQUEwQlosSUFBSUUsTUFBSixDQUFXQyxLQUFyQztBQUNILGFBZks7QUFnQk5VLHNCQWhCTSxzQkFnQktELEtBaEJMLEVBZ0JXO0FBQ2IscUJBQUtILFdBQUwsQ0FBaUJLLE1BQWpCLENBQXdCRixLQUF4QixFQUE4QixDQUE5QjtBQUNIO0FBbEJLLFMsUUFvQlZHLE0sR0FBUztBQUNMQyxpQkFESyxtQkFDRTtBQUNILG9CQUFJQyxPQUFPLEVBQVg7QUFDQUEscUJBQUtWLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNBVSxxQkFBS1osSUFBTCxHQUFZLEtBQUtBLElBQWpCO0FBQ0FZLHFCQUFLQyxPQUFMLEdBQWUsS0FBS0EsT0FBcEI7QUFDQUQscUJBQUtFLE1BQUwsR0FBYyxLQUFLQyxRQUFMLENBQWMsS0FBS25CLFNBQW5CLEVBQThCb0IsRUFBNUM7QUFDQUoscUJBQUtLLElBQUwsR0FBWSxLQUFLRixRQUFMLENBQWMsS0FBS25CLFNBQW5CLEVBQThCc0IsSUFBMUM7QUFDQU4scUJBQUtSLFdBQUwsR0FBbUIsS0FBS0EsV0FBeEI7QUFDQSxxQkFBS2UsS0FBTCxDQUFXLFNBQVgsRUFBcUJQLElBQXJCO0FBRUg7QUFYSSxTOzs7OztpQ0FhRDtBQUNKLGlCQUFLUSxXQUFMO0FBQ0g7OztzQ0FDWTtBQUNULGdCQUFJQyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUNBLGdCQUFJQyxPQUFPRixJQUFJRyxXQUFKLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUosSUFBSUssUUFBSixLQUFpQixDQUE3QjtBQUNBLGdCQUFJQyxNQUFNTixJQUFJTyxPQUFKLEVBQVY7QUFDQSxpQkFBSzFCLElBQUwsR0FBWXFCLE9BQU8sR0FBUCxHQUFhRSxLQUFiLEdBQXFCLEdBQXJCLEdBQTJCRSxHQUF2QztBQUNIOzs7O0VBNURrQyxlQUFLRSxTOztrQkFBdkJ4QyxRIiwiZmlsZSI6InNhbGVmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5Jztcbi8vIGltcG9ydCBpbWdVcGxvYWRGb3JtIGZyb20gJy4vaW1ndXBsb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2FsZUZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ2RhdGUnIDogJycsXG4gICAgICAgICd0aW1lJyA6ICcwODowMCcsXG4gICAgICAgICdhZGRyZXNzJyA6ICcnLFxuICAgICAgICAnYWN0aXZpdHlBcnInIDogWycnXSxcbiAgICAgICAgJ3NhbGVJbmRleCcgOiAwLFxuICAgICAgICAnc2FsZUpzb24nIDogW1xuICAgICAgICAgICAgeydpZCc6JzAwMScsJ25hbWUnOifotoXluIInfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDInLCduYW1lJzon5pyN6aWwJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+mkkOmlrid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNCcsJ25hbWUnOiflhbbku5YnfSxcbiAgICAgICAgXVxuICAgIH07XG4gICAgcG9ycHMgPSB7fTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICAvLyAndXBsb2FkZm9ybScgOiBpbWdVcGxvYWRGb3JtXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzYWxlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnNhbGVJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICAgIGZldGNoKCl7XG4gICAgICAgICAgICB2YXIganNvbiA9IHt9O1xuICAgICAgICAgICAganNvbi5kYXRlID0gdGhpcy5kYXRlO1xuICAgICAgICAgICAganNvbi50aW1lID0gdGhpcy50aW1lO1xuICAgICAgICAgICAganNvbi5hZGRyZXNzID0gdGhpcy5hZGRyZXNzO1xuICAgICAgICAgICAganNvbi5zYWxlSWQgPSB0aGlzLnNhbGVKc29uW3RoaXMuc2FsZUluZGV4XS5pZDtcbiAgICAgICAgICAgIGpzb24uc2FsZSA9IHRoaXMuc2FsZUpzb25bdGhpcy5zYWxlSW5kZXhdLm5hbWU7XG4gICAgICAgICAgICBqc29uLmFjdGl2aXR5QXJyID0gdGhpcy5hY3Rpdml0eUFycjtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvcm0nLGpzb24pO1xuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmRhdGVGb3JtYXRlKCk7XG4gICAgfTtcbiAgICBkYXRlRm9ybWF0ZSgpe1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdmFyIG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xuICAgICAgICB2YXIgZGF5ID0gbm93LmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRlID0geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICAgIH1cbn1cbiJdfQ==