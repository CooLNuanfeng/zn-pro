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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
            themeimg: '',
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
            toast: _toast2.default
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
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.globalData.themeimg;
        }
    }, {
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
                    message: json.info
                });
            }
            return json;
        }
    }, {
        key: 'checkHeadeInfo',
        value: function checkHeadeInfo() {
            var json = {};
            var flag = true;
            var phoneReg = /^0{0,1}1[3456789]{1}[0-9]{9}$/ig;
            if (!this.title) {
                json.flag = false;
                json.info = '标题不能为空';
                return json;
            }
            if (!this.subtitle) {
                json.flag = false;
                json.info = '副标题不能为空';
                return json;
            }
            if (!this.phone) {
                json.flag = false;
                json.info = '手机号不能为空';
                return json;
            }
            if (!phoneReg.test(this.phone)) {
                json.flag = false;
                json.info = '手机号格式不正确';
                return json;
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aGVtZWltZyIsInRpdGxlIiwic3VidGl0bGUiLCJwaG9uZSIsInR5cGUiLCJmb3JtZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImpvYmZvcm0iLCJzYWxlZm9ybSIsImhvbWVmb3JtIiwiY2FyZm9ybSIsImZpbmRmb3JtIiwiZm9vZGZvcm0iLCJmcmllbmRmb3JtIiwicGV0Zm9ybSIsImVkdWZvcm0iLCJvdGhlcmZvcm0iLCJ0b2FzdCIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0Rm9ybSIsInN1Ym1pdCIsIiRicm9hZGNhc3QiLCJjaGVja0Zvcm1JbmZvIiwiZmxhZyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwianNvbiIsImNoZWNrSGVhZGVJbmZvIiwiY2hlY2tKb2JGcm9tIiwiY2hlY2tTYWxlRnJvbSIsIiRpbnZva2UiLCJtZXNzYWdlIiwiaW5mbyIsInBob25lUmVnIiwidGVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyxzQkFBVyxFQURSO0FBRUhDLG1CQUFRLEVBRkwsRUFFUztBQUNaQyxzQkFBVyxFQUhSO0FBSUhDLG1CQUFRLEVBSkwsRUFJUztBQUNaQyxrQkFBTyxLQUxKLEVBS1c7QUFDZEMsc0JBQVcsSUFOUixDQU1jO0FBTmQsUyxRQVFSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsY0FBYSxFQUFkLEVBQVgsRUFBNkIsWUFBVyxFQUF4QyxFQUEyQyxZQUFXLEVBQXRELEVBQXlELFdBQVUs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SUFBUDtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQ08sU0FBU0MsSUFBVCxDQUFjLEtBQUt0QyxLQUFuQixDQUFKLEVBQThCO0FBQzFCOEIscUJBQUtILElBQUwsR0FBWSxLQUFaO0FBQ0FHLHFCQUFLTSxJQUFMLEdBQVksVUFBWjtBQUNBLHVCQUFPTixJQUFQO0FBQ0g7QUFDSjs7O3VDQUNhLENBRWI7Ozt3Q0FDYyxDQUVkOzs7O0VBL0ZnQyxlQUFLUyxJOztrQkFBckI1QyxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IEpvYkZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2Jmb3JtJztcbmltcG9ydCBTYWxlRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3NhbGVmb3JtJztcbmltcG9ydCBIb21lRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2hvbWVmb3JtJztcbmltcG9ydCBDYXJGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvY2FyZm9ybSc7XG5pbXBvcnQgRmluZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9maW5kZm9ybSc7XG5pbXBvcnQgRm9vZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9mb29kZm9ybSc7XG5pbXBvcnQgRnJpZW5kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2ZyaWVuZGZvcm0nO1xuaW1wb3J0IFBldEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9wZXRmb3JtJztcbmltcG9ydCBFZHVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZWR1Zm9ybSc7XG5pbXBvcnQgT3RoZXJGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvb3RoZXJmb3JtJztcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdGhlbWVpbWcgOiAnJyxcbiAgICAgICAgdGl0bGUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHN1YnRpdGxlIDogJycsXG4gICAgICAgIHBob25lIDogJycsIC8vcmVxdWlyZVxuICAgICAgICB0eXBlIDogJ2pvYicsIC8vcmVxdWlyZVxuICAgICAgICBmb3JtZGF0YSA6IG51bGwsIC8v5ZCE5Liq6KGo5Y2V55qE5L+h5oGvXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJqb2Jmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9LFwic2FsZWZvcm1cIjp7fSxcImhvbWVmb3JtXCI6e30sXCJjYXJmb3JtXCI6e30sXCJmaW5kZm9ybVwiOnt9LFwiZm9vZGZvcm1cIjp7fSxcImZyaWVuZGZvcm1cIjp7fSxcInBldGZvcm1cIjp7fSxcImVkdWZvcm1cIjp7fSxcIm90aGVyZm9ybVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcImpvYmZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJzYWxlZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImhvbWVmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiY2FyZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZpbmRmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZm9vZGZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJmcmllbmRmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwicGV0Zm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImVkdWZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJvdGhlcmZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgam9iZm9ybSA6IEpvYkZvcm0sXG4gICAgICAgIHNhbGVmb3JtIDogU2FsZUZvcm0sXG4gICAgICAgIGhvbWVmb3JtIDogSG9tZUZvcm0sXG4gICAgICAgIGNhcmZvcm0gOiBDYXJGb3JtLFxuICAgICAgICBmaW5kZm9ybSA6IEZpbmRGb3JtLFxuICAgICAgICBmb29kZm9ybSA6IEZvb2RGb3JtLFxuICAgICAgICBmcmllbmRmb3JtIDogRnJpZW5kRm9ybSxcbiAgICAgICAgcGV0Zm9ybSA6IFBldEZvcm0sXG4gICAgICAgIGVkdWZvcm0gOiBFZHVGb3JtLFxuICAgICAgICBvdGhlcmZvcm0gOiBPdGhlckZvcm0sXG4gICAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAocGFyYW1zKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZvcm0oZGF0YSl7XG4gICAgICAgICAgICB0aGlzLmZvcm1kYXRhID0gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0KCl7XG4gICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ2ZldGNoJyk7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrRm9ybUluZm8oKS5mbGFnKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZnJvbSBjaGlsZCBmb3JtJyx0aGlzLmZvcm1kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy50aGVtZWltZyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnRoZW1laW1nO1xuICAgIH1cbiAgICBjaGVja0Zvcm1JbmZvKCl7XG4gICAgICAgIHZhciBqc29uID0gbnVsbDtcbiAgICAgICAganNvbiA9IHRoaXMuY2hlY2tIZWFkZUluZm8oKTtcbiAgICAgICAgaWYoanNvbi5mbGFnKXtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnam9iJzpcbiAgICAgICAgICAgICAgICAgICAganNvbi5mbGFnID0gdGhpcy5jaGVja0pvYkZyb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2FsZSc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24uZmxhZyA9IHRoaXMuY2hlY2tTYWxlRnJvbSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCFqc29uLmZsYWcpe1xuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGpzb24uaW5mbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH07XG4gICAgY2hlY2tIZWFkZUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7fTtcbiAgICAgICAgdmFyIGZsYWcgPSB0cnVlO1xuICAgICAgICB2YXIgcGhvbmVSZWcgPSAvXjB7MCwxfTFbMzQ1Njc4OV17MX1bMC05XXs5fSQvaWc7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJ0aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICflia/moIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35LiN6IO95Li656m6JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFwaG9uZVJlZy50ZXN0KHRoaXMucGhvbmUpKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+agvOW8j+S4jeato+ehric7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0pvYkZyb20oKXtcblxuICAgIH1cbiAgICBjaGVja1NhbGVGcm9tKCl7XG5cbiAgICB9XG59XG4iXX0=