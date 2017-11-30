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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aGVtZWltZyIsInRpdGxlIiwic3VidGl0bGUiLCJwaG9uZSIsInR5cGUiLCJmb3JtZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImpvYmZvcm0iLCJzYWxlZm9ybSIsImhvbWVmb3JtIiwiY2FyZm9ybSIsImZpbmRmb3JtIiwiZm9vZGZvcm0iLCJmcmllbmRmb3JtIiwicGV0Zm9ybSIsImVkdWZvcm0iLCJvdGhlcmZvcm0iLCJ0b2FzdCIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0Rm9ybSIsInN1Ym1pdCIsIiRicm9hZGNhc3QiLCJjaGVja0Zvcm1JbmZvIiwiZmxhZyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwianNvbiIsImNoZWNrSGVhZGVJbmZvIiwiY2hlY2tKb2JGcm9tIiwiY2hlY2tTYWxlRnJvbSIsIiRpbnZva2UiLCJpbmZvIiwicGhvbmVSZWciLCJ0ZXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFXLEVBRFI7QUFFSEMsbUJBQVEsRUFGTCxFQUVTO0FBQ1pDLHNCQUFXLEVBSFI7QUFJSEMsbUJBQVEsRUFKTCxFQUlTO0FBQ1pDLGtCQUFPLEtBTEosRUFLVztBQUNkQyxzQkFBVyxJQU5SLENBTWM7QUFOZCxTLFFBUVJDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLFdBQVUsRUFBQyxjQUFhLEVBQWQsRUFBWCxFQUE2QixZQUFXLEVBQXhDLEVBQTJDLFlBQVcsRUFBdEQsRUFBeUQsV0FBVSxFQUFuRSxFQUFz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SixFQUE4QjtBQUMxQjhCLHFCQUFLSCxJQUFMLEdBQVksS0FBWjtBQUNBRyxxQkFBS0ssSUFBTCxHQUFZLFVBQVo7QUFDSDtBQUNELG1CQUFPTCxJQUFQO0FBQ0g7Ozt1Q0FDYSxDQUViOzs7d0NBQ2MsQ0FFZDs7OztFQTVGZ0MsZUFBS1EsSTs7a0JBQXJCM0MsTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBKb2JGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iZm9ybSc7XG5pbXBvcnQgU2FsZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9zYWxlZm9ybSc7XG5pbXBvcnQgSG9tZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ob21lZm9ybSc7XG5pbXBvcnQgQ2FyRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2NhcmZvcm0nO1xuaW1wb3J0IEZpbmRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZmluZGZvcm0nO1xuaW1wb3J0IEZvb2RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vZGZvcm0nO1xuaW1wb3J0IEZyaWVuZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9mcmllbmRmb3JtJztcbmltcG9ydCBQZXRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvcGV0Zm9ybSc7XG5pbXBvcnQgRWR1Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2VkdWZvcm0nO1xuaW1wb3J0IE90aGVyRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL290aGVyZm9ybSc7XG5pbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aGVtZWltZyA6ICcnLFxuICAgICAgICB0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgc3VidGl0bGUgOiAnJyxcbiAgICAgICAgcGhvbmUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHR5cGUgOiAnam9iJywgLy9yZXF1aXJlXG4gICAgICAgIGZvcm1kYXRhIDogbnVsbCwgLy/lkITkuKrooajljZXnmoTkv6Hmga9cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvYmZvcm1cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJzYWxlZm9ybVwiOnt9LFwiaG9tZWZvcm1cIjp7fSxcImNhcmZvcm1cIjp7fSxcImZpbmRmb3JtXCI6e30sXCJmb29kZm9ybVwiOnt9LFwiZnJpZW5kZm9ybVwiOnt9LFwicGV0Zm9ybVwiOnt9LFwiZWR1Zm9ybVwiOnt9LFwib3RoZXJmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9iZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcInNhbGVmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiaG9tZWZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJjYXJmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZmluZGZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJmb29kZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZyaWVuZGZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJwZXRmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZWR1Zm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcIm90aGVyZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgc2FsZWZvcm0gOiBTYWxlRm9ybSxcbiAgICAgICAgaG9tZWZvcm0gOiBIb21lRm9ybSxcbiAgICAgICAgY2FyZm9ybSA6IENhckZvcm0sXG4gICAgICAgIGZpbmRmb3JtIDogRmluZEZvcm0sXG4gICAgICAgIGZvb2Rmb3JtIDogRm9vZEZvcm0sXG4gICAgICAgIGZyaWVuZGZvcm0gOiBGcmllbmRGb3JtLFxuICAgICAgICBwZXRmb3JtIDogUGV0Rm9ybSxcbiAgICAgICAgZWR1Zm9ybSA6IEVkdUZvcm0sXG4gICAgICAgIG90aGVyZm9ybSA6IE90aGVyRm9ybSxcbiAgICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rm9ybShkYXRhKXtcbiAgICAgICAgICAgIHRoaXMuZm9ybWRhdGEgPSBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQoKXtcbiAgICAgICAgICAgIHRoaXMuJGJyb2FkY2FzdCgnZmV0Y2gnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tGb3JtSW5mbygpLmZsYWcpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmcm9tIGNoaWxkIGZvcm0nLHRoaXMuZm9ybWRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLnRoZW1laW1nID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudGhlbWVpbWc7XG4gICAgfVxuICAgIGNoZWNrRm9ybUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSBudWxsO1xuICAgICAgICBqc29uID0gdGhpcy5jaGVja0hlYWRlSW5mbygpO1xuICAgICAgICBpZihqc29uLmZsYWcpe1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdqb2InOlxuICAgICAgICAgICAgICAgICAgICBqc29uLmZsYWcgPSB0aGlzLmNoZWNrSm9iRnJvbSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzYWxlJzpcbiAgICAgICAgICAgICAgICAgICAganNvbi5mbGFnID0gdGhpcy5jaGVja1NhbGVGcm9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWpzb24uZmxhZyl7XG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGpzb24uaW5mbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH07XG4gICAgY2hlY2tIZWFkZUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7fTtcbiAgICAgICAgdmFyIGZsYWcgPSB0cnVlO1xuICAgICAgICB2YXIgcGhvbmVSZWcgPSAvXjB7MCwxfTFbMzQ1NzhdezF9WzAtOV17OX0kL2lnO1xuICAgICAgICBpZighdGhpcy50aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfmoIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnN1YnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+WJr+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35LiN6IO95Li656m6JztcbiAgICAgICAgfVxuICAgICAgICBpZighcGhvbmVSZWcudGVzdCh0aGlzLnBob25lKSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfmiYvmnLrlj7fmoLzlvI/kuI3mraPnoa4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgICBjaGVja0pvYkZyb20oKXtcblxuICAgIH1cbiAgICBjaGVja1NhbGVGcm9tKCl7XG5cbiAgICB9XG59XG4iXX0=