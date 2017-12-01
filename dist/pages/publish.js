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
            ref: null, //野狗数据对象
            themeimg: '',
            title: '', //require
            subtitle: '',
            phone: '', //require
            type: 'job', //require
            formdata: null //各个表单的信息
        }, _this.$repeat = {}, _this.$props = { "jobform": { "xmlns:v-on": "" }, "saleform": {}, "homeform": {}, "carform": {}, "findform": {}, "foodform": {}, "friendform": {}, "petform": {}, "eduform": {}, "otherform": {} }, _this.$events = { "jobform": { "v-on:getJobForm": "getForm" }, "saleform": { "v-on:getSaleForm": "getForm" }, "homeform": { "v-on:getHomeForm": "getForm" }, "carform": { "v-on:getCarForm": "getForm" }, "findform": { "v-on:getFindForm": "getForm" }, "foodform": { "v-on:getFoodForm": "getForm" }, "friendform": { "v-on:getFirendForm": "getForm" }, "petform": { "v-on:getPetForm": "getForm" }, "eduform": { "v-on:getEduForm": "getForm" }, "otherform": { "v-on:getOtherForm": "getForm" } }, _this.components = {
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
                this.type = params;
            },
            getForm: function getForm(data) {
                this.formdata = data;
            },
            titleChange: function titleChange(evt) {
                this.title = evt.detail.value;
            },
            subTitleChange: function subTitleChange(evt) {
                this.subtitle = evt.detail.value;
            },
            phoneChange: function phoneChange(evt) {
                this.phone = evt.detail.value;
            },
            submit: function submit() {
                this.$broadcast('fetch');
                var result = this.checkFormInfo();
                if (result.flag) {
                    // console.log('from child form',this.formdata);
                    this.ajaxSend();
                } else {
                    this.$invoke('toast', 'show', {
                        message: result.info
                    });
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
        key: 'ajaxSend',
        value: function ajaxSend() {
            var vm = this;
            var timestamp = this.$parent.getTimeStamp();
            var data = {
                title: this.title, //require
                subtitle: this.subtitle,
                phone: this.phone, //require
                type: this.type, //require
                formdata: this.formdata, //表单的信息
                created: timestamp, //创建时间
                updated: timestamp //更新时间
            };
            console.log('save data', data);
            var ref = vm.$parent.getWilddog('/');
            ref.child('newslist').push(data).then(function () {
                // console.log('success send');
                wx.redirectTo({
                    url: 'success'
                });
            }).catch(function (err) {
                vm.$invoke('toast', 'show', {
                    message: '发布失败，请重试'
                });
            });
        }
    }, {
        key: 'checkFormInfo',
        value: function checkFormInfo() {
            var json = null;
            json = this.checkHeadeInfo(); //检测头部分
            if (json.flag) {
                switch (this.type) {
                    case 'job':
                        json = this.checkJobFrom();
                        break;
                    case 'sale':
                        json = this.checkSaleFrom();
                        break;

                }
            } else {
                this.$invoke('toast', 'show', {
                    message: json.info
                });
            }
            return json;
        }
    }, {
        key: 'checkHeadeInfo',

        //检测 头部分
        value: function checkHeadeInfo() {
            var json = {
                flag: true,
                info: ''
            };
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
            return json;
        }
    }, {
        key: 'checkJobFrom',
        value: function checkJobFrom() {
            var json = {
                flag: true,
                info: ''
            };
            var jobData = this.formdata;
            if (!jobData.jobname) {
                json.flag = false;
                json.info = '请填写招聘职位';
                return json;
            }
            if (!jobData.number) {
                json.flag = false;
                json.info = '请填写招聘人数';
                return json;
            }
            if (!jobData.address) {
                json.flag = false;
                json.info = '请填写招聘地址';
                return json;
            }
            if (!jobData.companyName) {
                json.flag = false;
                json.info = '请填写公司名称';
                return json;
            }
            return json;
        }
    }, {
        key: 'checkSaleFrom',
        value: function checkSaleFrom() {}
    }]);

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJyZWYiLCJ0aGVtZWltZyIsInRpdGxlIiwic3VidGl0bGUiLCJwaG9uZSIsInR5cGUiLCJmb3JtZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImpvYmZvcm0iLCJzYWxlZm9ybSIsImhvbWVmb3JtIiwiY2FyZm9ybSIsImZpbmRmb3JtIiwiZm9vZGZvcm0iLCJmcmllbmRmb3JtIiwicGV0Zm9ybSIsImVkdWZvcm0iLCJvdGhlcmZvcm0iLCJ0b2FzdCIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJnZXRGb3JtIiwidGl0bGVDaGFuZ2UiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsInN1YlRpdGxlQ2hhbmdlIiwicGhvbmVDaGFuZ2UiLCJzdWJtaXQiLCIkYnJvYWRjYXN0IiwicmVzdWx0IiwiY2hlY2tGb3JtSW5mbyIsImZsYWciLCJhamF4U2VuZCIsIiRpbnZva2UiLCJtZXNzYWdlIiwiaW5mbyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidm0iLCJ0aW1lc3RhbXAiLCJnZXRUaW1lU3RhbXAiLCJjcmVhdGVkIiwidXBkYXRlZCIsImNvbnNvbGUiLCJsb2ciLCJnZXRXaWxkZG9nIiwiY2hpbGQiLCJwdXNoIiwidGhlbiIsInd4IiwicmVkaXJlY3RUbyIsInVybCIsImNhdGNoIiwiZXJyIiwianNvbiIsImNoZWNrSGVhZGVJbmZvIiwiY2hlY2tKb2JGcm9tIiwiY2hlY2tTYWxlRnJvbSIsInBob25lUmVnIiwidGVzdCIsImpvYkRhdGEiLCJqb2JuYW1lIiwibnVtYmVyIiwiYWRkcmVzcyIsImNvbXBhbnlOYW1lIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7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QUcsQ0FBQ00sUUFBUUcsT0FBWixFQUFvQjtBQUNoQlQscUJBQUt2QixJQUFMLEdBQVksS0FBWjtBQUNBdUIscUJBQUtuQixJQUFMLEdBQVksU0FBWjtBQUNBLHVCQUFPbUIsSUFBUDtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQ00sUUFBUUksV0FBWixFQUF3QjtBQUNwQlYscUJBQUt2QixJQUFMLEdBQVksS0FBWjtBQUNBdUIscUJBQUtuQixJQUFMLEdBQVksU0FBWjtBQUNBLHVCQUFPbUIsSUFBUDtBQUNIO0FBQ0QsbUJBQU9BLElBQVA7QUFDSDs7O3dDQUNjLENBRWQ7Ozs7RUFuS2dDLGVBQUtXLEk7O2tCQUFyQnhFLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgSm9iRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2pvYmZvcm0nO1xuaW1wb3J0IFNhbGVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2FsZWZvcm0nO1xuaW1wb3J0IEhvbWVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZWZvcm0nO1xuaW1wb3J0IENhckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9jYXJmb3JtJztcbmltcG9ydCBGaW5kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbmRmb3JtJztcbmltcG9ydCBGb29kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2Zvb2Rmb3JtJztcbmltcG9ydCBGcmllbmRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZnJpZW5kZm9ybSc7XG5pbXBvcnQgUGV0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3BldGZvcm0nO1xuaW1wb3J0IEVkdUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9lZHVmb3JtJztcbmltcG9ydCBPdGhlckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9vdGhlcmZvcm0nO1xuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICByZWYgOiBudWxsLCAvL+mHjueLl+aVsOaNruWvueixoVxuICAgICAgICB0aGVtZWltZyA6ICcnLFxuICAgICAgICB0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgc3VidGl0bGUgOiAnJyxcbiAgICAgICAgcGhvbmUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHR5cGUgOiAnam9iJywgLy9yZXF1aXJlXG4gICAgICAgIGZvcm1kYXRhIDogbnVsbCwgLy/lkITkuKrooajljZXnmoTkv6Hmga9cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvYmZvcm1cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJzYWxlZm9ybVwiOnt9LFwiaG9tZWZvcm1cIjp7fSxcImNhcmZvcm1cIjp7fSxcImZpbmRmb3JtXCI6e30sXCJmb29kZm9ybVwiOnt9LFwiZnJpZW5kZm9ybVwiOnt9LFwicGV0Zm9ybVwiOnt9LFwiZWR1Zm9ybVwiOnt9LFwib3RoZXJmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9iZm9ybVwiOntcInYtb246Z2V0Sm9iRm9ybVwiOlwiZ2V0Rm9ybVwifSxcInNhbGVmb3JtXCI6e1widi1vbjpnZXRTYWxlRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImhvbWVmb3JtXCI6e1widi1vbjpnZXRIb21lRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImNhcmZvcm1cIjp7XCJ2LW9uOmdldENhckZvcm1cIjpcImdldEZvcm1cIn0sXCJmaW5kZm9ybVwiOntcInYtb246Z2V0RmluZEZvcm1cIjpcImdldEZvcm1cIn0sXCJmb29kZm9ybVwiOntcInYtb246Z2V0Rm9vZEZvcm1cIjpcImdldEZvcm1cIn0sXCJmcmllbmRmb3JtXCI6e1widi1vbjpnZXRGaXJlbmRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwicGV0Zm9ybVwiOntcInYtb246Z2V0UGV0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImVkdWZvcm1cIjp7XCJ2LW9uOmdldEVkdUZvcm1cIjpcImdldEZvcm1cIn0sXCJvdGhlcmZvcm1cIjp7XCJ2LW9uOmdldE90aGVyRm9ybVwiOlwiZ2V0Rm9ybVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgc2FsZWZvcm0gOiBTYWxlRm9ybSxcbiAgICAgICAgaG9tZWZvcm0gOiBIb21lRm9ybSxcbiAgICAgICAgY2FyZm9ybSA6IENhckZvcm0sXG4gICAgICAgIGZpbmRmb3JtIDogRmluZEZvcm0sXG4gICAgICAgIGZvb2Rmb3JtIDogRm9vZEZvcm0sXG4gICAgICAgIGZyaWVuZGZvcm0gOiBGcmllbmRGb3JtLFxuICAgICAgICBwZXRmb3JtIDogUGV0Rm9ybSxcbiAgICAgICAgZWR1Zm9ybSA6IEVkdUZvcm0sXG4gICAgICAgIG90aGVyZm9ybSA6IE90aGVyRm9ybSxcbiAgICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLnRoZW1laW1nID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudGhlbWVpbWc7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBnZXRGb3JtKGRhdGEpe1xuICAgICAgICAgICAgdGhpcy5mb3JtZGF0YSA9IGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3ViVGl0bGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBwaG9uZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5waG9uZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdCgpe1xuICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdmZXRjaCcpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2hlY2tGb3JtSW5mbygpO1xuICAgICAgICAgICAgaWYocmVzdWx0LmZsYWcpe1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmcm9tIGNoaWxkIGZvcm0nLHRoaXMuZm9ybWRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWpheFNlbmQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0LmluZm8sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICB9XG4gICAgYWpheFNlbmQoKXtcbiAgICAgICAgbGV0IHZtID0gdGhpcztcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMuJHBhcmVudC5nZXRUaW1lU3RhbXAoKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0aXRsZSA6IHRoaXMudGl0bGUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgc3VidGl0bGUgOiB0aGlzLnN1YnRpdGxlLFxuICAgICAgICAgICAgcGhvbmUgOiB0aGlzLnBob25lLCAvL3JlcXVpcmVcbiAgICAgICAgICAgIHR5cGUgOiB0aGlzLnR5cGUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgZm9ybWRhdGEgOiB0aGlzLmZvcm1kYXRhLCAvL+ihqOWNleeahOS/oeaBr1xuICAgICAgICAgICAgY3JlYXRlZCA6IHRpbWVzdGFtcCwgLy/liJvlu7rml7bpl7RcbiAgICAgICAgICAgIHVwZGF0ZWQgOiB0aW1lc3RhbXAsIC8v5pu05paw5pe26Ze0XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgZGF0YScsZGF0YSk7XG4gICAgICAgIHZhciByZWYgPSB2bS4kcGFyZW50LmdldFdpbGRkb2coJy8nKTtcbiAgICAgICAgcmVmLmNoaWxkKCduZXdzbGlzdCcpLnB1c2goZGF0YSkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1Y2Nlc3Mgc2VuZCcpO1xuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ3N1Y2Nlc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIHZtLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+WPkeW4g+Wksei0pe+8jOivt+mHjeivlScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjaGVja0Zvcm1JbmZvKCl7XG4gICAgICAgIHZhciBqc29uID0gbnVsbDtcbiAgICAgICAganNvbiA9IHRoaXMuY2hlY2tIZWFkZUluZm8oKTsgLy/mo4DmtYvlpLTpg6jliIZcbiAgICAgICAgaWYoanNvbi5mbGFnKXtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnam9iJzpcbiAgICAgICAgICAgICAgICAgICAganNvbiA9IHRoaXMuY2hlY2tKb2JGcm9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NhbGUnOlxuICAgICAgICAgICAgICAgICAgICBqc29uID0gdGhpcy5jaGVja1NhbGVGcm9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGpzb24uaW5mbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH07XG4gICAgLy/mo4DmtYsg5aS06YOo5YiGXG4gICAgY2hlY2tIZWFkZUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGhvbmVSZWcgPSAvXjB7MCwxfTFbMzQ1Njc4OV17MX1bMC05XXs5fSQvaWc7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJ0aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICflia/moIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35LiN6IO95Li656m6JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFwaG9uZVJlZy50ZXN0KHRoaXMucGhvbmUpKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+agvOW8j+S4jeato+ehric7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tKb2JGcm9tKCl7XG4gICAgICAgIHZhciBqc29uID0ge1xuICAgICAgICAgICAgZmxhZyA6IHRydWUsXG4gICAgICAgICAgICBpbmZvIDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGpvYkRhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZigham9iRGF0YS5qb2JuYW1lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOiBjOS9jSc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5udW1iZXIpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oub6IGY5Lq65pWwJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFqb2JEYXRhLmFkZHJlc3Mpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oub6IGY5Zyw5Z2AJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFqb2JEYXRhLmNvbXBhbnlOYW1lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeWFrOWPuOWQjeensCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tTYWxlRnJvbSgpe1xuXG4gICAgfVxufVxuIl19