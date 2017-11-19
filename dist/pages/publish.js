'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _jobform = require('./../components/jobform.js');

var _jobform2 = _interopRequireDefault(_jobform);

var _saleform = require('./../components/saleform.js');

var _saleform2 = _interopRequireDefault(_saleform);

var _homeform = require('./../components/homeform.js');

var _homeform2 = _interopRequireDefault(_homeform);

var _carform = require('./../components/carform.js');

var _carform2 = _interopRequireDefault(_carform);

var _findform = require('./../components/findform.js');

var _findform2 = _interopRequireDefault(_findform);

var _foodform = require('./../components/foodform.js');

var _foodform2 = _interopRequireDefault(_foodform);

var _friendform = require('./../components/friendform.js');

var _friendform2 = _interopRequireDefault(_friendform);

var _petform = require('./../components/petform.js');

var _petform2 = _interopRequireDefault(_petform);

var _eduform = require('./../components/eduform.js');

var _eduform2 = _interopRequireDefault(_eduform);

var _otherform = require('./../components/otherform.js');

var _otherform2 = _interopRequireDefault(_otherform);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_wepy$page) {
    _inherits(Publish, _wepy$page);

    function Publish() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Publish);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publish.__proto__ || Object.getPrototypeOf(Publish)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            title: '', //require
            subtitle: '',
            phone: '', //require
            type: 'job', //require
            formdata: null //各个表单的信息
        }, _this.$repeat = {}, _this.$props = { "jobform": { "xmlns:v-on": "" }, "saleform": {}, "homeform": {}, "carform": {}, "findform": {}, "foodform": {}, "friendform": {}, "petform": {}, "eduform": {}, "otherform": {} }, _this.$events = { "jobform": { "v-on:getForm": "getForm" }, "saleform": { "v-on:getForm": "getForm" }, "homeform": { "v-on:getForm": "getForm" }, "carform": { "v-on:getForm": "getForm" }, "findform": { "v-on:getForm": "getForm" }, "foodform": { "v-on:getForm": "getForm" }, "friendform": { "v-on:getForm": "getForm" }, "petform": { "v-on:getForm": "getForm" }, "eduform": { "v-on:getForm": "getForm" }, "otherform": { "v-on:getForm": "getForm" } }, _this.components = {
            jobform: _jobform2.default,
            saleform: _saleform2.default,
            homeform: _homeform2.default,
            carform: _carform2.default,
            findform: _findform2.default,
            foodform: _foodform2.default,
            friendform: _friendform2.default,
            petform: _petform2.default,
            eduform: _eduform2.default,
            otherform: _otherform2.default,
            footer: _footer2.default,
            toast: _wepyComToast2.default
        }, _this.methods = {
            tap: function tap(params) {
                console.log(params);
                this.type = params;
            },
            getForm: function getForm(data) {
                this.formdata = data;
            },
            submit: function submit() {
                this.$broadcast('fetch');
                if (this.checkFormInfo().flag) {
                    console.log('from child form', this.formdata);
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Publish, [{
        key: 'checkFormInfo',
        value: function checkFormInfo() {
            var json = null;
            json = this.checkHeadeInfo();
            if (json.flag) {
                switch (this.type) {
                    case 'job':
                        json.flag = this.checkJobFrom();
                        break;
                    case 'sale':
                        json.flag = this.checkSaleFrom();
                        break;

                }
            }
            if (!json.flag) {
                this.$invoke('toast', 'show', {
                    title: json.info
                });
            }
            return json;
        }
    }, {
        key: 'checkHeadeInfo',
        value: function checkHeadeInfo() {
            var json = {};
            var flag = true;
            var phoneReg = /^0{0,1}1[34578]{1}[0-9]{9}$/ig;
            if (!this.title) {
                json.flag = false;
                json.info = '标题不能为空';
            }
            if (!this.subtitle) {
                json.flag = false;
                json.info = '副标题不能为空';
            }
            if (!this.phone) {
                json.flag = false;
                json.info = '手机号不能为空';
            }
            if (!phoneReg.test(this.phone)) {
                json.flag = false;
                json.info = '手机号格式不正确';
            }
            return json;
        }
    }, {
        key: 'checkJobFrom',
        value: function checkJobFrom() {}
    }, {
        key: 'checkSaleFrom',
        value: function checkSaleFrom() {}
    }]);

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJ0eXBlIiwiZm9ybWRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2Jmb3JtIiwic2FsZWZvcm0iLCJob21lZm9ybSIsImNhcmZvcm0iLCJmaW5kZm9ybSIsImZvb2Rmb3JtIiwiZnJpZW5kZm9ybSIsInBldGZvcm0iLCJlZHVmb3JtIiwib3RoZXJmb3JtIiwiZm9vdGVyIiwidG9hc3QiLCJtZXRob2RzIiwidGFwIiwicGFyYW1zIiwiY29uc29sZSIsImxvZyIsImdldEZvcm0iLCJzdWJtaXQiLCIkYnJvYWRjYXN0IiwiY2hlY2tGb3JtSW5mbyIsImZsYWciLCJqc29uIiwiY2hlY2tIZWFkZUluZm8iLCJjaGVja0pvYkZyb20iLCJjaGVja1NhbGVGcm9tIiwiJGludm9rZSIsImluZm8iLCJwaG9uZVJlZyIsInRlc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyxtQkFBUSxFQURMLEVBQ1M7QUFDWkMsc0JBQVcsRUFGUjtBQUdIQyxtQkFBUSxFQUhMLEVBR1M7QUFDWkMsa0JBQU8sS0FKSixFQUlXO0FBQ2RDLHNCQUFXLElBTFIsQ0FLYztBQUxkLFMsUUFPUkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsV0FBVSxFQUFDLGNBQWEsRUFBZCxFQUFYLEVBQTZCLFlBQVcsRUFBeEMsRUFBMkMsWUFBVyxFQUF0RCxFQUF5RCxXQUFVLEVBQW5FLEVBQXNFLFlBQVcsRUFBakYsRUFBb0YsWUFBVyxFQUEvRixFQUFrRyxjQUFhLEVBQS9HLEVBQWtILFdBQVUsRUFBNUgsRUFBK0gsV0FBVSxFQUF6SSxFQUE0SSxhQUFZLEVBQXhKLEUsUUFDVEMsTyxHQUFVLEVBQUMsV0FBVSxFQUFDLGdCQUFlLFNBQWhCLEVBQVgsRUFBc0MsWUFBVyxFQUFDLGdCQUFlLFNBQWhCLEVBQWpELEVBQTRFLFlBQVcsRUFBQyxnQkFBZSxTQUFoQixFQUF2RixFQUFrSCxXQUFVLEVBQUMsZ0JBQWUsU0FBaEIsRUFBNUgsRUFBdUosWUFBVyxFQUFDLGdCQUFlLFNBQWhCLEVBQWxLLEVBQTZMLFlBQVcsRUFBQyxnQkFBZSxTQUFoQixFQUF4TSxFQUFtTyxjQUFhLEVBQUMsZ0JBQWUsU0FBaEIsRUFBaFAsRUFBMlEsV0FBVSxFQUFDLGdCQUFlLFNBQWhCLEVBQXJSLEVBQWdULFdBQVUsRUFBQyxnQkFBZSxTQUFoQixFQUExVCxFQUFxVixhQUFZLEVBQUMsZ0JBQWUsU0FBaEIsRUFBalcsRSxRQUNUQyxVLEdBQWE7QUFDTkMsc0NBRE07QUFFTkMsd0NBRk07QUFHTkMsd0NBSE07QUFJTkMsc0NBSk07QUFLTkMsd0NBTE07QUFNTkMsd0NBTk07QUFPTkMsNENBUE07QUFRTkMsc0NBUk07QUFTTkMsc0NBVE07QUFVTkMsMENBVk07QUFXTkMsb0NBWE07QUFZTkM7QUFaTSxTLFFBY1ZDLE8sR0FBVTtBQUNOQyxlQURNLGVBQ0ZDLE1BREUsRUFDSztBQUNQQyx3QkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0EscUJBQUtwQixJQUFMLEdBQVlvQixNQUFaO0FBQ0gsYUFKSztBQUtORyxtQkFMTSxtQkFLRTNCLElBTEYsRUFLTztBQUNULHFCQUFLSyxRQUFMLEdBQWdCTCxJQUFoQjtBQUNILGFBUEs7QUFRTjRCLGtCQVJNLG9CQVFFO0FBQ0oscUJBQUtDLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDQSxvQkFBRyxLQUFLQyxhQUFMLEdBQXFCQyxJQUF4QixFQUE2QjtBQUN6Qk4sNEJBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUE4QixLQUFLckIsUUFBbkM7QUFDSDtBQUVKO0FBZEssUzs7Ozs7d0NBZ0JLO0FBQ1gsZ0JBQUkyQixPQUFPLElBQVg7QUFDQUEsbUJBQU8sS0FBS0MsY0FBTCxFQUFQO0FBQ0EsZ0JBQUdELEtBQUtELElBQVIsRUFBYTtBQUNULHdCQUFRLEtBQUszQixJQUFiO0FBQ0kseUJBQUssS0FBTDtBQUNJNEIsNkJBQUtELElBQUwsR0FBWSxLQUFLRyxZQUFMLEVBQVo7QUFDQTtBQUNKLHlCQUFLLE1BQUw7QUFDSUYsNkJBQUtELElBQUwsR0FBWSxLQUFLSSxhQUFMLEVBQVo7QUFDQTs7QUFOUjtBQVNIO0FBQ0QsZ0JBQUcsQ0FBQ0gsS0FBS0QsSUFBVCxFQUFjO0FBQ1YscUJBQUtLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzFCbkMsMkJBQU8rQixLQUFLSztBQURjLGlCQUE5QjtBQUdIO0FBQ0QsbUJBQU9MLElBQVA7QUFDSDs7O3lDQUNlO0FBQ1osZ0JBQUlBLE9BQU8sRUFBWDtBQUNBLGdCQUFJRCxPQUFPLElBQVg7QUFDQSxnQkFBSU8sV0FBVywrQkFBZjtBQUNBLGdCQUFHLENBQUMsS0FBS3JDLEtBQVQsRUFBZTtBQUNYK0IscUJBQUtELElBQUwsR0FBWSxLQUFaO0FBQ0FDLHFCQUFLSyxJQUFMLEdBQVksUUFBWjtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQyxLQUFLbkMsUUFBVCxFQUFrQjtBQUNkOEIscUJBQUtELElBQUwsR0FBWSxLQUFaO0FBQ0FDLHFCQUFLSyxJQUFMLEdBQVksU0FBWjtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQyxLQUFLbEMsS0FBVCxFQUFlO0FBQ1g2QixxQkFBS0QsSUFBTCxHQUFZLEtBQVo7QUFDQUMscUJBQUtLLElBQUwsR0FBWSxTQUFaO0FBQ0g7QUFDRCxnQkFBRyxDQUFDQyxTQUFTQyxJQUFULENBQWMsS0FBS3BDLEtBQW5CLENBQUosRUFBOEI7QUFDMUI2QixxQkFBS0QsSUFBTCxHQUFZLEtBQVo7QUFDQUMscUJBQUtLLElBQUwsR0FBWSxVQUFaO0FBQ0g7QUFDRCxtQkFBT0wsSUFBUDtBQUNIOzs7dUNBQ2EsQ0FFYjs7O3dDQUNjLENBRWQ7Ozs7RUF6RmdDLGVBQUtRLEk7O2tCQUFyQnpDLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgSm9iRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2pvYmZvcm0nO1xuaW1wb3J0IFNhbGVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2FsZWZvcm0nO1xuaW1wb3J0IEhvbWVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZWZvcm0nO1xuaW1wb3J0IENhckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9jYXJmb3JtJztcbmltcG9ydCBGaW5kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbmRmb3JtJztcbmltcG9ydCBGb29kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2Zvb2Rmb3JtJztcbmltcG9ydCBGcmllbmRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZnJpZW5kZm9ybSc7XG5pbXBvcnQgUGV0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3BldGZvcm0nO1xuaW1wb3J0IEVkdUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9lZHVmb3JtJztcbmltcG9ydCBPdGhlckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9vdGhlcmZvcm0nO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3Rlcic7XG5pbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgc3VidGl0bGUgOiAnJyxcbiAgICAgICAgcGhvbmUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHR5cGUgOiAnam9iJywgLy9yZXF1aXJlXG4gICAgICAgIGZvcm1kYXRhIDogbnVsbCwgLy/lkITkuKrooajljZXnmoTkv6Hmga9cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvYmZvcm1cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJzYWxlZm9ybVwiOnt9LFwiaG9tZWZvcm1cIjp7fSxcImNhcmZvcm1cIjp7fSxcImZpbmRmb3JtXCI6e30sXCJmb29kZm9ybVwiOnt9LFwiZnJpZW5kZm9ybVwiOnt9LFwicGV0Zm9ybVwiOnt9LFwiZWR1Zm9ybVwiOnt9LFwib3RoZXJmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9iZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcInNhbGVmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiaG9tZWZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJjYXJmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZmluZGZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJmb29kZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZyaWVuZGZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJwZXRmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZWR1Zm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcIm90aGVyZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgc2FsZWZvcm0gOiBTYWxlRm9ybSxcbiAgICAgICAgaG9tZWZvcm0gOiBIb21lRm9ybSxcbiAgICAgICAgY2FyZm9ybSA6IENhckZvcm0sXG4gICAgICAgIGZpbmRmb3JtIDogRmluZEZvcm0sXG4gICAgICAgIGZvb2Rmb3JtIDogRm9vZEZvcm0sXG4gICAgICAgIGZyaWVuZGZvcm0gOiBGcmllbmRGb3JtLFxuICAgICAgICBwZXRmb3JtIDogUGV0Rm9ybSxcbiAgICAgICAgZWR1Zm9ybSA6IEVkdUZvcm0sXG4gICAgICAgIG90aGVyZm9ybSA6IE90aGVyRm9ybSxcbiAgICAgICAgZm9vdGVyIDogRm9vdGVyLFxuICAgICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgdGFwKHBhcmFtcyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBnZXRGb3JtKGRhdGEpe1xuICAgICAgICAgICAgdGhpcy5mb3JtZGF0YSA9IGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdCgpe1xuICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdmZXRjaCcpO1xuICAgICAgICAgICAgaWYodGhpcy5jaGVja0Zvcm1JbmZvKCkuZmxhZyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zyb20gY2hpbGQgZm9ybScsdGhpcy5mb3JtZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICB9XG4gICAgY2hlY2tGb3JtSW5mbygpe1xuICAgICAgICB2YXIganNvbiA9IG51bGw7XG4gICAgICAgIGpzb24gPSB0aGlzLmNoZWNrSGVhZGVJbmZvKCk7XG4gICAgICAgIGlmKGpzb24uZmxhZyl7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2pvYic6XG4gICAgICAgICAgICAgICAgICAgIGpzb24uZmxhZyA9IHRoaXMuY2hlY2tKb2JGcm9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NhbGUnOlxuICAgICAgICAgICAgICAgICAgICBqc29uLmZsYWcgPSB0aGlzLmNoZWNrU2FsZUZyb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighanNvbi5mbGFnKXtcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICB0aXRsZToganNvbi5pbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfTtcbiAgICBjaGVja0hlYWRlSW5mbygpe1xuICAgICAgICB2YXIganNvbiA9IHt9O1xuICAgICAgICB2YXIgZmxhZyA9IHRydWU7XG4gICAgICAgIHZhciBwaG9uZVJlZyA9IC9eMHswLDF9MVszNDU3OF17MX1bMC05XXs5fSQvaWc7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuc3VidGl0bGUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5Ymv5qCH6aKY5LiN6IO95Li656m6JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5waG9uZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfmiYvmnLrlj7fkuI3og73kuLrnqbonO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFwaG9uZVJlZy50ZXN0KHRoaXMucGhvbmUpKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+agvOW8j+S4jeato+ehric7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrSm9iRnJvbSgpe1xuXG4gICAgfVxuICAgIGNoZWNrU2FsZUZyb20oKXtcblxuICAgIH1cbn1cbiJdfQ==