'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _swiper = require('./../components/swiper.js');

var _swiper2 = _interopRequireDefault(_swiper);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _avWeappMin = require('./../utils/av-weapp-min.js');

var _avWeappMin2 = _interopRequireDefault(_avWeappMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_wepy$page) {
    _inherits(Detail, _wepy$page);

    function Detail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Detail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            title: '',
            subtitle: '',
            publisher: '',
            pubTimer: '',
            phone: '',
            categoryType: '',
            imgUrls: [],
            content: null
        }, _this.$repeat = {}, _this.$props = { "swiper": { "xmlns:wx": "", "xmlns:v-bind": "", "v-bind:imgUrls.sync": "imgUrls" } }, _this.$events = {}, _this.components = {
            swiper: _swiper2.default,
            footer: _footer2.default,
            toast: _toast2.default
        }, _this.methods = {
            doPhone: function doPhone() {
                wx.makePhoneCall({
                    phoneNumber: this.phone
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Detail, [{
        key: 'onLoad',
        value: function onLoad(optins) {
            console.log(optins);
            var vm = this;
            var query = new _avWeappMin2.default.Query('NewsList');
            query.get(optins.id).then(function (data) {
                console.log(data);
                vm.title = data.attributes.title;
                vm.subtitle = data.attributes.subtitle;
                vm.publisher = data.attributes.nickname;
                vm.pubTimer = vm.$parent.timeFormate(data.updatedAt);
                vm.categoryType = data.attributes.type;
                vm.content = data.attributes.formdata;
                vm.phone = data.attributes.phone;
                vm.imgUrls = data.attributes.formdata.images;
                vm.$apply();
            }).catch(function (err) {
                console.log(err);
                vm.$invoke('toast', 'show', {
                    message: '服务异常，请稍后重试'
                });
            });
        }
    }]);

    return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJkYXRhIiwidGl0bGUiLCJzdWJ0aXRsZSIsInB1Ymxpc2hlciIsInB1YlRpbWVyIiwicGhvbmUiLCJjYXRlZ29yeVR5cGUiLCJpbWdVcmxzIiwiY29udGVudCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlciIsImZvb3RlciIsInRvYXN0IiwibWV0aG9kcyIsImRvUGhvbmUiLCJ3eCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIm9wdGlucyIsImNvbnNvbGUiLCJsb2ciLCJ2bSIsInF1ZXJ5IiwiUXVlcnkiLCJnZXQiLCJpZCIsInRoZW4iLCJhdHRyaWJ1dGVzIiwibmlja25hbWUiLCIkcGFyZW50IiwidGltZUZvcm1hdGUiLCJ1cGRhdGVkQXQiLCJ0eXBlIiwiZm9ybWRhdGEiLCJpbWFnZXMiLCIkYXBwbHkiLCJjYXRjaCIsImVyciIsIiRpbnZva2UiLCJtZXNzYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLEksR0FBTztBQUNIQyxtQkFBUSxFQURMO0FBRUhDLHNCQUFVLEVBRlA7QUFHSEMsdUJBQVksRUFIVDtBQUlIQyxzQkFBVyxFQUpSO0FBS0hDLG1CQUFRLEVBTEw7QUFNSEMsMEJBQWMsRUFOWDtBQU9IQyxxQkFBVSxFQVBQO0FBUUhDLHFCQUFVO0FBUlAsUyxRQVVSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsWUFBVyxFQUFaLEVBQWUsZ0JBQWUsRUFBOUIsRUFBaUMsdUJBQXNCLFNBQXZELEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsb0NBRE07QUFFTkMsb0NBRk07QUFHTkM7QUFITSxTLFFBMkJWQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0c7QUFDTEMsbUJBQUdDLGFBQUgsQ0FBaUI7QUFDZkMsaUNBQWEsS0FBS2Y7QUFESCxpQkFBakI7QUFHSDtBQUxLLFM7Ozs7OytCQXRCSGdCLE0sRUFBTztBQUNWQyxvQkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0EsZ0JBQUlHLEtBQUssSUFBVDtBQUNBLGdCQUFJQyxRQUFRLElBQUkscUJBQUdDLEtBQVAsQ0FBYSxVQUFiLENBQVo7QUFDQUQsa0JBQU1FLEdBQU4sQ0FBVU4sT0FBT08sRUFBakIsRUFBcUJDLElBQXJCLENBQTBCLFVBQVM3QixJQUFULEVBQWM7QUFDcENzQix3QkFBUUMsR0FBUixDQUFZdkIsSUFBWjtBQUNBd0IsbUJBQUd2QixLQUFILEdBQVdELEtBQUs4QixVQUFMLENBQWdCN0IsS0FBM0I7QUFDQXVCLG1CQUFHdEIsUUFBSCxHQUFjRixLQUFLOEIsVUFBTCxDQUFnQjVCLFFBQTlCO0FBQ0FzQixtQkFBR3JCLFNBQUgsR0FBZUgsS0FBSzhCLFVBQUwsQ0FBZ0JDLFFBQS9CO0FBQ0FQLG1CQUFHcEIsUUFBSCxHQUFjb0IsR0FBR1EsT0FBSCxDQUFXQyxXQUFYLENBQXVCakMsS0FBS2tDLFNBQTVCLENBQWQ7QUFDQVYsbUJBQUdsQixZQUFILEdBQWtCTixLQUFLOEIsVUFBTCxDQUFnQkssSUFBbEM7QUFDQVgsbUJBQUdoQixPQUFILEdBQWFSLEtBQUs4QixVQUFMLENBQWdCTSxRQUE3QjtBQUNBWixtQkFBR25CLEtBQUgsR0FBV0wsS0FBSzhCLFVBQUwsQ0FBZ0J6QixLQUEzQjtBQUNBbUIsbUJBQUdqQixPQUFILEdBQWFQLEtBQUs4QixVQUFMLENBQWdCTSxRQUFoQixDQUF5QkMsTUFBdEM7QUFDQWIsbUJBQUdjLE1BQUg7QUFDSCxhQVhELEVBV0dDLEtBWEgsQ0FXUyxVQUFTQyxHQUFULEVBQWE7QUFDbEJsQix3QkFBUUMsR0FBUixDQUFZaUIsR0FBWjtBQUNBaEIsbUJBQUdpQixPQUFILENBQVcsT0FBWCxFQUFvQixNQUFwQixFQUE0QjtBQUN4QkMsNkJBQVM7QUFEZSxpQkFBNUI7QUFHSCxhQWhCRDtBQWlCSDs7OztFQXhDK0IsZUFBS0MsSTs7a0JBQXBCNUMsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IFN3aXBlciBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJztcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0JztcblxuaW1wb3J0IEFWIGZyb20gJy4uL3V0aWxzL2F2LXdlYXBwLW1pbi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdGl0bGUgOiAnJyxcbiAgICAgICAgc3VidGl0bGU6ICcnLFxuICAgICAgICBwdWJsaXNoZXIgOiAnJyxcbiAgICAgICAgcHViVGltZXIgOiAnJyxcbiAgICAgICAgcGhvbmUgOiAnJyxcbiAgICAgICAgY2F0ZWdvcnlUeXBlOiAnJyxcbiAgICAgICAgaW1nVXJscyA6IFtdLFxuICAgICAgICBjb250ZW50IDogbnVsbFxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wic3dpcGVyXCI6e1wieG1sbnM6d3hcIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppbWdVcmxzLnN5bmNcIjpcImltZ1VybHNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBzd2lwZXIgOiBTd2lwZXIsXG4gICAgICAgIGZvb3RlcjogRm9vdGVyLFxuICAgICAgICB0b2FzdCA6IFRvYXN0XG4gICAgfVxuICAgIG9uTG9hZChvcHRpbnMpe1xuICAgICAgICBjb25zb2xlLmxvZyhvcHRpbnMpO1xuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnkgPSBuZXcgQVYuUXVlcnkoJ05ld3NMaXN0Jyk7XG4gICAgICAgIHF1ZXJ5LmdldChvcHRpbnMuaWQpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHZtLnRpdGxlID0gZGF0YS5hdHRyaWJ1dGVzLnRpdGxlO1xuICAgICAgICAgICAgdm0uc3VidGl0bGUgPSBkYXRhLmF0dHJpYnV0ZXMuc3VidGl0bGU7XG4gICAgICAgICAgICB2bS5wdWJsaXNoZXIgPSBkYXRhLmF0dHJpYnV0ZXMubmlja25hbWU7XG4gICAgICAgICAgICB2bS5wdWJUaW1lciA9IHZtLiRwYXJlbnQudGltZUZvcm1hdGUoZGF0YS51cGRhdGVkQXQpO1xuICAgICAgICAgICAgdm0uY2F0ZWdvcnlUeXBlID0gZGF0YS5hdHRyaWJ1dGVzLnR5cGU7XG4gICAgICAgICAgICB2bS5jb250ZW50ID0gZGF0YS5hdHRyaWJ1dGVzLmZvcm1kYXRhO1xuICAgICAgICAgICAgdm0ucGhvbmUgPSBkYXRhLmF0dHJpYnV0ZXMucGhvbmU7XG4gICAgICAgICAgICB2bS5pbWdVcmxzID0gZGF0YS5hdHRyaWJ1dGVzLmZvcm1kYXRhLmltYWdlcztcbiAgICAgICAgICAgIHZtLiRhcHBseSgpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIHZtLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+acjeWKoeW8guW4uO+8jOivt+eojeWQjumHjeivlScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBkb1Bob25lKCl7XG4gICAgICAgICAgICB3eC5tYWtlUGhvbmVDYWxsKHtcbiAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHRoaXMucGhvbmVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=