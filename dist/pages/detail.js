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
            nickname: '',
            publisher: '',
            pubTimer: '',
            phone: '',
            categoryType: '',
            imgUrls: [],
            content: null
        }, _this.$repeat = {}, _this.$props = { "swiper": { "xmlns:v-bind": "", "v-bind:imgUrls.sync": "imgUrls" } }, _this.$events = {}, _this.components = {
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
                vm.nickname = data.attributes.nickname;
                vm.publisher = data.attributes.publishername;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJkYXRhIiwidGl0bGUiLCJzdWJ0aXRsZSIsIm5pY2tuYW1lIiwicHVibGlzaGVyIiwicHViVGltZXIiLCJwaG9uZSIsImNhdGVnb3J5VHlwZSIsImltZ1VybHMiLCJjb250ZW50IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVyIiwiZm9vdGVyIiwidG9hc3QiLCJtZXRob2RzIiwiZG9QaG9uZSIsInd4IiwibWFrZVBob25lQ2FsbCIsInBob25lTnVtYmVyIiwib3B0aW5zIiwiY29uc29sZSIsImxvZyIsInZtIiwicXVlcnkiLCJRdWVyeSIsImdldCIsImlkIiwidGhlbiIsImF0dHJpYnV0ZXMiLCJwdWJsaXNoZXJuYW1lIiwiJHBhcmVudCIsInRpbWVGb3JtYXRlIiwidXBkYXRlZEF0IiwidHlwZSIsImZvcm1kYXRhIiwiaW1hZ2VzIiwiJGFwcGx5IiwiY2F0Y2giLCJlcnIiLCIkaW52b2tlIiwibWVzc2FnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxJLEdBQU87QUFDSEMsbUJBQVEsRUFETDtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLHNCQUFXLEVBSFI7QUFJSEMsdUJBQVksRUFKVDtBQUtIQyxzQkFBVyxFQUxSO0FBTUhDLG1CQUFRLEVBTkw7QUFPSEMsMEJBQWMsRUFQWDtBQVFIQyxxQkFBVSxFQVJQO0FBU0hDLHFCQUFVO0FBVFAsUyxRQVdSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsb0NBRE07QUFFTkMsb0NBRk07QUFHTkM7QUFITSxTLFFBNEJWQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0c7QUFDTEMsbUJBQUdDLGFBQUgsQ0FBaUI7QUFDZkMsaUNBQWEsS0FBS2Y7QUFESCxpQkFBakI7QUFHSDtBQUxLLFM7Ozs7OytCQXZCSGdCLE0sRUFBTztBQUNWQyxvQkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0EsZ0JBQUlHLEtBQUssSUFBVDtBQUNBLGdCQUFJQyxRQUFRLElBQUkscUJBQUdDLEtBQVAsQ0FBYSxVQUFiLENBQVo7QUFDQUQsa0JBQU1FLEdBQU4sQ0FBVU4sT0FBT08sRUFBakIsRUFBcUJDLElBQXJCLENBQTBCLFVBQVM5QixJQUFULEVBQWM7QUFDcEN1Qix3QkFBUUMsR0FBUixDQUFZeEIsSUFBWjtBQUNBeUIsbUJBQUd4QixLQUFILEdBQVdELEtBQUsrQixVQUFMLENBQWdCOUIsS0FBM0I7QUFDQXdCLG1CQUFHdkIsUUFBSCxHQUFjRixLQUFLK0IsVUFBTCxDQUFnQjdCLFFBQTlCO0FBQ0F1QixtQkFBR3RCLFFBQUgsR0FBY0gsS0FBSytCLFVBQUwsQ0FBZ0I1QixRQUE5QjtBQUNBc0IsbUJBQUdyQixTQUFILEdBQWVKLEtBQUsrQixVQUFMLENBQWdCQyxhQUEvQjtBQUNBUCxtQkFBR3BCLFFBQUgsR0FBY29CLEdBQUdRLE9BQUgsQ0FBV0MsV0FBWCxDQUF1QmxDLEtBQUttQyxTQUE1QixDQUFkO0FBQ0FWLG1CQUFHbEIsWUFBSCxHQUFrQlAsS0FBSytCLFVBQUwsQ0FBZ0JLLElBQWxDO0FBQ0FYLG1CQUFHaEIsT0FBSCxHQUFhVCxLQUFLK0IsVUFBTCxDQUFnQk0sUUFBN0I7QUFDQVosbUJBQUduQixLQUFILEdBQVdOLEtBQUsrQixVQUFMLENBQWdCekIsS0FBM0I7QUFDQW1CLG1CQUFHakIsT0FBSCxHQUFhUixLQUFLK0IsVUFBTCxDQUFnQk0sUUFBaEIsQ0FBeUJDLE1BQXRDO0FBQ0FiLG1CQUFHYyxNQUFIO0FBQ0gsYUFaRCxFQVlHQyxLQVpILENBWVMsVUFBU0MsR0FBVCxFQUFhO0FBQ2xCbEIsd0JBQVFDLEdBQVIsQ0FBWWlCLEdBQVo7QUFDQWhCLG1CQUFHaUIsT0FBSCxDQUFXLE9BQVgsRUFBb0IsTUFBcEIsRUFBNEI7QUFDeEJDLDZCQUFTO0FBRGUsaUJBQTVCO0FBR0gsYUFqQkQ7QUFrQkg7Ozs7RUExQytCLGVBQUtDLEk7O2tCQUFwQjdDLE0iLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBTd2lwZXIgZnJvbSAnLi4vY29tcG9uZW50cy9zd2lwZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3Rlcic7XG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCc7XG5cbmltcG9ydCBBViBmcm9tICcuLi91dGlscy9hdi13ZWFwcC1taW4uanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHRpdGxlIDogJycsXG4gICAgICAgIHN1YnRpdGxlOiAnJyxcbiAgICAgICAgbmlja25hbWUgOiAnJyxcbiAgICAgICAgcHVibGlzaGVyIDogJycsXG4gICAgICAgIHB1YlRpbWVyIDogJycsXG4gICAgICAgIHBob25lIDogJycsXG4gICAgICAgIGNhdGVnb3J5VHlwZTogJycsXG4gICAgICAgIGltZ1VybHMgOiBbXSxcbiAgICAgICAgY29udGVudCA6IG51bGxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInN3aXBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aW1nVXJscy5zeW5jXCI6XCJpbWdVcmxzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgc3dpcGVyIDogU3dpcGVyLFxuICAgICAgICBmb290ZXI6IEZvb3RlcixcbiAgICAgICAgdG9hc3QgOiBUb2FzdFxuICAgIH1cbiAgICBvbkxvYWQob3B0aW5zKXtcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW5zKTtcbiAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgdmFyIHF1ZXJ5ID0gbmV3IEFWLlF1ZXJ5KCdOZXdzTGlzdCcpO1xuICAgICAgICBxdWVyeS5nZXQob3B0aW5zLmlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2bS50aXRsZSA9IGRhdGEuYXR0cmlidXRlcy50aXRsZTtcbiAgICAgICAgICAgIHZtLnN1YnRpdGxlID0gZGF0YS5hdHRyaWJ1dGVzLnN1YnRpdGxlO1xuICAgICAgICAgICAgdm0ubmlja25hbWUgPSBkYXRhLmF0dHJpYnV0ZXMubmlja25hbWU7XG4gICAgICAgICAgICB2bS5wdWJsaXNoZXIgPSBkYXRhLmF0dHJpYnV0ZXMucHVibGlzaGVybmFtZTtcbiAgICAgICAgICAgIHZtLnB1YlRpbWVyID0gdm0uJHBhcmVudC50aW1lRm9ybWF0ZShkYXRhLnVwZGF0ZWRBdCk7XG4gICAgICAgICAgICB2bS5jYXRlZ29yeVR5cGUgPSBkYXRhLmF0dHJpYnV0ZXMudHlwZTtcbiAgICAgICAgICAgIHZtLmNvbnRlbnQgPSBkYXRhLmF0dHJpYnV0ZXMuZm9ybWRhdGE7XG4gICAgICAgICAgICB2bS5waG9uZSA9IGRhdGEuYXR0cmlidXRlcy5waG9uZTtcbiAgICAgICAgICAgIHZtLmltZ1VybHMgPSBkYXRhLmF0dHJpYnV0ZXMuZm9ybWRhdGEuaW1hZ2VzO1xuICAgICAgICAgICAgdm0uJGFwcGx5KCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgdm0uJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAn5pyN5Yqh5byC5bi477yM6K+356iN5ZCO6YeN6K+VJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGRvUGhvbmUoKXtcbiAgICAgICAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogdGhpcy5waG9uZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==