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
            'startdate': '',
            'enddate': '',
            'starttime': '08:00',
            'endtime': '18:00',
            'address': '',
            'activityArr': [''],
            'saleIndex': 0,
            'saleJson': [{ 'id': '001', 'name': '超市' }, { 'id': '002', 'name': '服饰' }, { 'id': '003', 'name': '餐饮' }, { 'id': '004', 'name': '其他' }],
            'uploadImgs': null
        }, _this.porps = {}, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
        }, _this.methods = {
            saleChange: function saleChange(evt) {
                this.saleIndex = evt.detail.value;
            },
            starttimeChange: function starttimeChange(evt) {
                this.starttime = evt.detail.value;
            },
            endtimeChange: function endtimeChange(evt) {
                this.endtime = evt.detail.value;
            },
            startdateChange: function startdateChange(evt) {
                this.startdate = evt.detail.value;
            },
            enddateChange: function enddateChange(evt) {
                this.enddate = evt.detail.value;
            },
            addressChange: function addressChange(evt) {
                this.address = evt.detail.value;
            },
            addItem: function addItem() {
                this.activityArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.activityArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.activityArr.splice(index, 1);
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            saleFetch: function saleFetch() {
                var json = {};
                json.startdate = this.startdate;
                json.enddate = this.enddate;
                json.starttime = this.starttime;
                json.endtime = this.endtime;
                json.address = this.address;
                json.saleJson = this.saleJson[this.saleIndex];
                json.activityArr = this.activityArr;
                json.images = this.uploadImgs;
                this.$emit('getSaleForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SaleForm, [{
        key: 'onLoad',
        value: function onLoad() {
            var now = new Date();
            this.startdate = this.dateFormate(now);
            this.enddate = this.dateFormate(now);
        }
    }, {
        key: 'dateFormate',
        value: function dateFormate(oDate) {
            var year = oDate.getFullYear();
            var month = oDate.getMonth() + 1;
            var day = oDate.getDate();
            return year + '-' + this.toDouble(month) + '-' + this.toDouble(day);
        }
    }, {
        key: 'toDouble',
        value: function toDouble(number) {
            if (number < 10) {
                return '0' + number;
            } else {
                return number;
            }
        }
    }]);

    return SaleForm;
}(_wepy2.default.component);

exports.default = SaleForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGVmb3JtLmpzIl0sIm5hbWVzIjpbIlNhbGVGb3JtIiwiZGF0YSIsInBvcnBzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInNhbGVDaGFuZ2UiLCJldnQiLCJzYWxlSW5kZXgiLCJkZXRhaWwiLCJ2YWx1ZSIsInN0YXJ0dGltZUNoYW5nZSIsInN0YXJ0dGltZSIsImVuZHRpbWVDaGFuZ2UiLCJlbmR0aW1lIiwic3RhcnRkYXRlQ2hhbmdlIiwic3RhcnRkYXRlIiwiZW5kZGF0ZUNoYW5nZSIsImVuZGRhdGUiLCJhZGRyZXNzQ2hhbmdlIiwiYWRkcmVzcyIsImFkZEl0ZW0iLCJhY3Rpdml0eUFyciIsInB1c2giLCJpdGVtSW5wdXQiLCJpbmRleCIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJ1cGxvYWRDaGFuZ2UiLCJpbWdzIiwidXBsb2FkSW1ncyIsImV2ZW50cyIsInNhbGVGZXRjaCIsImpzb24iLCJzYWxlSnNvbiIsImltYWdlcyIsIiRlbWl0Iiwibm93IiwiRGF0ZSIsImRhdGVGb3JtYXRlIiwib0RhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsInRvRG91YmxlIiwibnVtYmVyIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gseUJBQWMsRUFEWDtBQUVILHVCQUFZLEVBRlQ7QUFHSCx5QkFBYyxPQUhYO0FBSUgsdUJBQVksT0FKVDtBQUtILHVCQUFZLEVBTFQ7QUFNSCwyQkFBZ0IsQ0FBQyxFQUFELENBTmI7QUFPSCx5QkFBYyxDQVBYO0FBUUgsd0JBQWEsQ0FDVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFEUyxFQUVULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQUZTLEVB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QUFOLEVBQVg7QUFDQSxnQkFBSUMsUUFBUUgsTUFBTUksUUFBTixLQUFtQixDQUEvQjtBQUNBLGdCQUFJQyxNQUFNTCxNQUFNTSxPQUFOLEVBQVY7QUFDQSxtQkFBT0wsT0FBTyxHQUFQLEdBQWEsS0FBS00sUUFBTCxDQUFjSixLQUFkLENBQWIsR0FBb0MsR0FBcEMsR0FBMEMsS0FBS0ksUUFBTCxDQUFjRixHQUFkLENBQWpEO0FBQ0g7OztpQ0FDUUcsTSxFQUFPO0FBQ1osZ0JBQUdBLFNBQU8sRUFBVixFQUFhO0FBQ1QsdUJBQU8sTUFBSUEsTUFBWDtBQUNILGFBRkQsTUFFSztBQUNELHVCQUFPQSxNQUFQO0FBQ0g7QUFDSjs7OztFQXpGa0MsZUFBS0MsUzs7a0JBQXZCbkQsUSIsImZpbGUiOiJzYWxlZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgaW1nVXBsb2FkRm9ybSBmcm9tICcuL2ltZ3VwbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhbGVGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdzdGFydGRhdGUnIDogJycsXG4gICAgICAgICdlbmRkYXRlJyA6ICcnLFxuICAgICAgICAnc3RhcnR0aW1lJyA6ICcwODowMCcsXG4gICAgICAgICdlbmR0aW1lJyA6ICcxODowMCcsXG4gICAgICAgICdhZGRyZXNzJyA6ICcnLFxuICAgICAgICAnYWN0aXZpdHlBcnInIDogWycnXSxcbiAgICAgICAgJ3NhbGVJbmRleCcgOiAwLFxuICAgICAgICAnc2FsZUpzb24nIDogW1xuICAgICAgICAgICAgeydpZCc6JzAwMScsJ25hbWUnOifotoXluIInfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDInLCduYW1lJzon5pyN6aWwJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+mkkOmlrid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNCcsJ25hbWUnOiflhbbku5YnfSxcbiAgICAgICAgXSxcbiAgICAgICAgJ3VwbG9hZEltZ3MnIDogbnVsbCxcbiAgICB9O1xuICAgIHBvcnBzID0ge307XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInVwbG9hZGZvcm1cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1widXBsb2FkZm9ybVwiOntcInYtb246dXBsb2FkRW5kXCI6XCJ1cGxvYWRDaGFuZ2VcIixcInYtb246dXBsb2FkRGVsXCI6XCJ1cGxvYWRDaGFuZ2VcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgJ3VwbG9hZGZvcm0nIDogaW1nVXBsb2FkRm9ybVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2FsZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5zYWxlSW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzdGFydHRpbWVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kdGltZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5lbmR0aW1lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRkYXRlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZGF0ZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZGRhdGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZW5kZGF0ZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3NDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRDaGFuZ2UoaW1ncyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBsb2FkIGNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRJbWdzID0gaW1ncztcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBzYWxlRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLnN0YXJ0ZGF0ZSA9IHRoaXMuc3RhcnRkYXRlO1xuICAgICAgICAgICAganNvbi5lbmRkYXRlID0gdGhpcy5lbmRkYXRlO1xuICAgICAgICAgICAganNvbi5zdGFydHRpbWUgPSB0aGlzLnN0YXJ0dGltZTtcbiAgICAgICAgICAgIGpzb24uZW5kdGltZSA9IHRoaXMuZW5kdGltZTtcbiAgICAgICAgICAgIGpzb24uYWRkcmVzcyA9IHRoaXMuYWRkcmVzcztcbiAgICAgICAgICAgIGpzb24uc2FsZUpzb24gPSB0aGlzLnNhbGVKc29uW3RoaXMuc2FsZUluZGV4XTtcbiAgICAgICAgICAgIGpzb24uYWN0aXZpdHlBcnIgPSB0aGlzLmFjdGl2aXR5QXJyO1xuICAgICAgICAgICAganNvbi5pbWFnZXMgPSB0aGlzLnVwbG9hZEltZ3M7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRTYWxlRm9ybScsanNvbik7XG5cbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnN0YXJ0ZGF0ZSA9IHRoaXMuZGF0ZUZvcm1hdGUobm93KTtcbiAgICAgICAgdGhpcy5lbmRkYXRlID0gdGhpcy5kYXRlRm9ybWF0ZShub3cpO1xuICAgIH07XG4gICAgZGF0ZUZvcm1hdGUob0RhdGUpe1xuICAgICAgICB2YXIgeWVhciA9IG9EYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHZhciBtb250aCA9IG9EYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICB2YXIgZGF5ID0gb0RhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICByZXR1cm4geWVhciArICctJyArIHRoaXMudG9Eb3VibGUobW9udGgpICsgJy0nICsgdGhpcy50b0RvdWJsZShkYXkpO1xuICAgIH07XG4gICAgdG9Eb3VibGUobnVtYmVyKXtcbiAgICAgICAgaWYobnVtYmVyPDEwKXtcbiAgICAgICAgICAgIHJldHVybiAnMCcrbnVtYmVyO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=