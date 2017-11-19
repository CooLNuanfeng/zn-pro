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
            'date': '',
            'time': '08:00',
            'address': '',
            'activityArr': [''],
            'saleIndex': 0,
            'saleJson': [{ 'id': '001', 'name': '超市' }, { 'id': '002', 'name': '服饰' }, { 'id': '003', 'name': '餐饮' }, { 'id': '004', 'name': '其他' }]
        }, _this.porps = {}, _this.components = {
            'uploadform': _imgupload2.default
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGVmb3JtLmpzIl0sIm5hbWVzIjpbIlNhbGVGb3JtIiwiZGF0YSIsInBvcnBzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJzYWxlQ2hhbmdlIiwiZXZ0Iiwic2FsZUluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJ0aW1lQ2hhbmdlIiwidGltZSIsImRhdGVDaGFuZ2UiLCJkYXRlIiwiYWRkSXRlbSIsImFjdGl2aXR5QXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsImV2ZW50cyIsImZldGNoIiwianNvbiIsImFkZHJlc3MiLCJzYWxlSWQiLCJzYWxlSnNvbiIsImlkIiwic2FsZSIsIm5hbWUiLCIkZW1pdCIsImRhdGVGb3JtYXRlIiwibm93IiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gsb0JBQVMsRUFETjtBQUVILG9CQUFTLE9BRk47QUFHSCx1QkFBWSxFQUhUO0FBSUgsMkJBQWdCLENBQUMsRUFBRCxDQUpiO0FBS0gseUJBQWMsQ0FMWDtBQU1ILHdCQUFhLENBQ1QsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBRFMsRUFFVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFGUyxFQUdULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQUhTLEVBSVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLElBQW5CLEVBSlM7QUFOVixTLFFBYVBDLEssR0FBUSxFLFFBQ1JDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQUdiQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ0tDLEdBREwsRUFDUztBQUNYLHFCQUFLQyxTQUFMLEdBQWlCRCxJQUFJRSxNQUFKLENBQVdDLEtBQTVCO0FBQ0gsYUFISztBQUlOQyxzQkFKTSxzQkFJS0osR0FKTCxFQUlTO0FBQ1gscUJBQUtLLElBQUwsR0FBWUwsSUFBSUUsTUFBSixDQUFXQyxLQUF2QjtBQUNILGFBTks7QUFPTkcsc0JBUE0sc0JBT0tOLEdBUEwsRUFPUztBQUNYLHFCQUFLTyxJQUFMLEdBQVlQLElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDSCxhQVRLO0FBVU5LLG1CQVZNLHFCQVVHO0FBQ0wscUJBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQ0gsYUFaSztBQWFOQyxxQkFiTSxxQkFhSUMsS0FiSixFQWFVWixHQWJWLEVBYWM7QUFDaEIscUJBQUtTLFdBQUwsQ0FBaUJHLEtBQWpCLElBQTBCWixJQUFJRSxNQUFKLENBQVdDLEtBQXJDO0FBQ0gsYUFmSztBQWdCTlUsc0JBaEJNLHNCQWdCS0QsS0FoQkwsRUFnQlc7QUFDYixxQkFBS0gsV0FBTCxDQUFpQkssTUFBakIsQ0FBd0JGLEtBQXhCLEVBQThCLENBQTlCO0FBQ0g7QUFsQkssUyxRQW9CVkcsTSxHQUFTO0FBQ0xDLGlCQURLLG1CQUNFO0FBQ0gsb0JBQUlDLE9BQU8sRUFBWDtBQUNBQSxxQkFBS1YsSUFBTCxHQUFZLEtBQUtBLElBQWpCO0FBQ0FVLHFCQUFLWixJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQVkscUJBQUtDLE9BQUwsR0FBZSxLQUFLQSxPQUFwQjtBQUNBRCxxQkFBS0UsTUFBTCxHQUFjLEtBQUtDLFFBQUwsQ0FBYyxLQUFLbkIsU0FBbkIsRUFBOEJvQixFQUE1QztBQUNBSixxQkFBS0ssSUFBTCxHQUFZLEtBQUtGLFFBQUwsQ0FBYyxLQUFLbkIsU0FBbkIsRUFBOEJzQixJQUExQztBQUNBTixxQkFBS1IsV0FBTCxHQUFtQixLQUFLQSxXQUF4QjtBQUNBLHFCQUFLZSxLQUFMLENBQVcsU0FBWCxFQUFxQlAsSUFBckI7QUFFSDtBQVhJLFM7Ozs7O2lDQWFEO0FBQ0osaUJBQUtRLFdBQUw7QUFDSDs7O3NDQUNZO0FBQ1QsZ0JBQUlDLE1BQU0sSUFBSUMsSUFBSixFQUFWO0FBQ0EsZ0JBQUlDLE9BQU9GLElBQUlHLFdBQUosRUFBWDtBQUNBLGdCQUFJQyxRQUFRSixJQUFJSyxRQUFKLEtBQWlCLENBQTdCO0FBQ0EsZ0JBQUlDLE1BQU1OLElBQUlPLE9BQUosRUFBVjtBQUNBLGlCQUFLMUIsSUFBTCxHQUFZcUIsT0FBTyxHQUFQLEdBQWFFLEtBQWIsR0FBcUIsR0FBckIsR0FBMkJFLEdBQXZDO0FBQ0g7Ozs7RUE1RGtDLGVBQUtFLFM7O2tCQUF2QnhDLFEiLCJmaWxlIjoic2FsZWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGltZ1VwbG9hZEZvcm0gZnJvbSAnLi9pbWd1cGxvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTYWxlRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAnZGF0ZScgOiAnJyxcbiAgICAgICAgJ3RpbWUnIDogJzA4OjAwJyxcbiAgICAgICAgJ2FkZHJlc3MnIDogJycsXG4gICAgICAgICdhY3Rpdml0eUFycicgOiBbJyddLFxuICAgICAgICAnc2FsZUluZGV4JyA6IDAsXG4gICAgICAgICdzYWxlSnNvbicgOiBbXG4gICAgICAgICAgICB7J2lkJzonMDAxJywnbmFtZSc6J+i2heW4gid9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifmnI3ppbAnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDMnLCduYW1lJzon6aSQ6aWuJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA0JywnbmFtZSc6J+WFtuS7lid9LFxuICAgICAgICBdXG4gICAgfTtcbiAgICBwb3JwcyA9IHt9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICd1cGxvYWRmb3JtJyA6IGltZ1VwbG9hZEZvcm1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNhbGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc2FsZUluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdGltZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy50aW1lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbSgpe1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFyci5wdXNoKCcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KGluZGV4LGV2dCl7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0oaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgZmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLmRhdGUgPSB0aGlzLmRhdGU7XG4gICAgICAgICAgICBqc29uLnRpbWUgPSB0aGlzLnRpbWU7XG4gICAgICAgICAgICBqc29uLmFkZHJlc3MgPSB0aGlzLmFkZHJlc3M7XG4gICAgICAgICAgICBqc29uLnNhbGVJZCA9IHRoaXMuc2FsZUpzb25bdGhpcy5zYWxlSW5kZXhdLmlkO1xuICAgICAgICAgICAganNvbi5zYWxlID0gdGhpcy5zYWxlSnNvblt0aGlzLnNhbGVJbmRleF0ubmFtZTtcbiAgICAgICAgICAgIGpzb24uYWN0aXZpdHlBcnIgPSB0aGlzLmFjdGl2aXR5QXJyO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Rm9ybScsanNvbik7XG5cbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdGUoKTtcbiAgICB9O1xuICAgIGRhdGVGb3JtYXRlKCl7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuICAgICAgICB2YXIgbW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIHZhciBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gICAgfVxufVxuIl19