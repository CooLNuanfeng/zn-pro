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

var _avWeappMin = require('./../utils/av-weapp-min.js');

var _avWeappMin2 = _interopRequireDefault(_avWeappMin);

var _newslist = require('./../models/newslist.js');

var _newslist2 = _interopRequireDefault(_newslist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var qiniuUploader = require('./../utils/qiniuUploader.js');
var genToken = require('./../utils/getUpToken.js').genToken;
var options = {
    "scope": "images",
    "deadline": Date.parse(new Date()) + 1800,
    "mimeLimit": "image/*"
};
var uploadToken = genToken('-2rQ7jMWwI1PHe_i8c60WOgx7isexE1SI-K5eSPx', 'uWkWvwDwucTA9ekkbSWMDQPMBt4t8KYtFRkkvrMW', options);
// console.log(uploadToken)

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
            subtitle: '', //require
            phone: '', //require
            publishername: '',
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
            nameChange: function nameChange(evt) {
                this.publishername = evt.detail.value;
            },
            submit: function submit() {
                var fetchType = this.type + 'Fetch';
                this.$broadcast(fetchType);
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
            var vm = this;
            vm.themeimg = vm.$parent.globalData.themeimg;
        }
    }, {
        key: 'uploadImgs',
        value: function uploadImgs(data) {
            var filePaths = data.formdata.images;
            var len = filePaths.length;
            var vm = this,
                imgArr = [],
                domain = vm.$parent.globalData.domain;

            var _loop = function _loop(i) {
                qiniuUploader.upload(filePaths[i], function (res) {
                    // console.log(res,'upload res');
                    imgArr.push(domain + res.imageURL);
                    if (i == len - 1) {
                        // console.log(i,'end',imgArr);
                        data.formdata.images = imgArr;
                        vm.saveData(data);
                    }
                }, function (error) {
                    console.log('error: ' + error);
                }, {
                    region: 'ECN',
                    uptoken: uploadToken
                });
            };

            for (var i = 0; i < len; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'saveData',
        value: function saveData(data) {
            // console.log(data,'send data');
            // return;
            var onelist = new _newslist2.default(),
                vm = this;
            onelist.set('nickname', data.nickname);
            onelist.set('uid', data.uid);
            onelist.set('title', data.title);
            onelist.set('subtitle', data.subtitle);
            onelist.set('subtitle', data.subtitle);
            onelist.set('phone', data.phone);
            onelist.set('publishername', data.publishername);
            onelist.set('type', data.type);
            onelist.set('formdata', data.formdata);
            onelist.save().then(function (list) {
                vm.hideLoading();
                wx.redirectTo({
                    url: 'success'
                });
            }).catch(function (err) {
                console.log(err);
                vm.hideLoading();
                vm.$invoke('toast', 'show', {
                    message: '发布失败，请重试'
                });
            });
        }
    }, {
        key: 'ajaxSend',
        value: function ajaxSend() {
            var vm = this;
            var userNick = vm.$parent.globalData.userNick;
            var userInfo = vm.$parent.globalData.userInfo;
            var data = {
                nickname: userNick.nickName,
                uid: userInfo.objectId,
                title: vm.title, //require
                subtitle: vm.subtitle,
                publishername: vm.publishername,
                phone: vm.phone, //require
                type: vm.type, //require
                formdata: vm.formdata //表单的信息
            };
            vm.showLoading();
            if (vm.formdata.images) {
                vm.uploadImgs(data);
            } else {
                vm.saveData(data);
            }
        }
    }, {
        key: 'showLoading',
        value: function showLoading() {
            wx.showLoading({
                title: '提交中...'
            });
        }
    }, {
        key: 'hideLoading',
        value: function hideLoading() {
            setTimeout(function () {
                wx.hideLoading();
            }, 100);
        }
    }, {
        key: 'checkFormInfo',
        value: function checkFormInfo() {
            var json = null;
            json = this.checkHeadeInfo(); //检测头部分
            if (json.flag) {
                switch (this.type) {
                    case 'job':
                        json = this.checkJobForm();
                        break;
                    case 'sale':
                        json = this.checkSaleForm();
                        break;
                    case 'home':
                        json = this.checkHomeForm();
                        break;
                    case 'car':
                        json = this.checkCarForm();
                        break;
                    case 'find':
                        json = this.checkFindForm();
                        break;
                    case 'food':
                        json = this.checkFoodForm();
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
        key: 'checkJobForm',
        value: function checkJobForm() {
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
            if (!jobData.jobprice) {
                json.flag = false;
                json.info = '请填写职位月薪';
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
        key: 'checkSaleForm',
        value: function checkSaleForm() {
            var json = {
                flag: true,
                info: ''
            };
            var saleData = this.formdata;
            if (!saleData.address) {
                json.flag = false;
                json.info = '请填写活动地址';
                return json;
            }
            return json;
        }
    }, {
        key: 'checkHomeForm',
        value: function checkHomeForm() {
            var json = {
                flag: true,
                info: ''
            };
            var homeData = this.formdata;
            if (!homeData.address) {
                json.flag = false;
                json.info = '请填写房屋地址';
                return json;
            }
            if (!homeData.price) {
                json.flag = false;
                json.info = '请填写房屋价格';
                return json;
            }
            return json;
        }
    }, {
        key: 'checkCarForm',
        value: function checkCarForm() {
            var json = {
                flag: true,
                info: ''
            };
            var carData = this.formdata;
            if (!carData.price) {
                json.flag = false;
                json.info = '请填写车辆价格';
                return json;
            }
            if (!carData.mileage) {
                json.flag = false;
                json.info = '请填写行驶里程';
                return json;
            }
            return json;
        }
    }, {
        key: 'checkFindForm',
        value: function checkFindForm() {
            var json = {
                flag: true,
                info: ''
            };
            var findData = this.formdata;
            if (!findData.address) {
                json.flag = false;
                json.info = '请填写丢失地点';
                return json;
            }
            return json;
        }
    }, {
        key: 'checkFoodForm',
        value: function checkFoodForm() {
            var json = {
                flag: true,
                info: ''
            };
            var foodData = this.formdata;
            if (!foodData.price) {
                json.flag = false;
                json.info = '请填写人均消费';
                return json;
            }
            if (!foodData.address) {
                json.flag = false;
                json.info = '请填写美食地点';
                return json;
            }
            return json;
        }
    }]);

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsicWluaXVVcGxvYWRlciIsInJlcXVpcmUiLCJnZW5Ub2tlbiIsIm9wdGlvbnMiLCJEYXRlIiwicGFyc2UiLCJ1cGxvYWRUb2tlbiIsIlB1Ymxpc2giLCJkYXRhIiwidGhlbWVpbWciLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJwdWJsaXNoZXJuYW1lIiwidHlwZSIsImZvcm1kYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9iZm9ybSIsInNhbGVmb3JtIiwiaG9tZWZvcm0iLCJjYXJmb3JtIiwiZmluZGZvcm0iLCJmb29kZm9ybSIsImZyaWVuZGZvcm0iLCJwZXRmb3JtIiwiZWR1Zm9ybSIsIm90aGVyZm9ybSIsInRvYXN0IiwibWV0aG9kcyIsInRhcCIsInBhcmFtcyIsImdldEZvcm0iLCJ0aXRsZUNoYW5nZSIsImV2dCIsImRldGFpbCIsInZhbHVlIiwic3ViVGl0bGVDaGFuZ2UiLCJwaG9uZUNoYW5nZSIsIm5hbWVDaGFuZ2UiLCJzdWJtaXQiLCJmZXRjaFR5cGUiLCIkYnJvYWRjYXN0IiwicmVzdWx0IiwiY2hlY2tGb3JtSW5mbyIsImZsYWciLCJhamF4U2VuZCIsIiRpbnZva2UiLCJtZXNzYWdlIiwiaW5mbyIsInZtIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJmaWxlUGF0aHMiLCJpbWFnZXMiLCJsZW4iLCJsZW5ndGgiLCJpbWdBcnIiLCJkb21haW4iLCJpIiwidXBsb2FkIiwicmVzIiwicHVzaCIsImltYWdlVVJMIiwic2F2ZURhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJyZWdpb24iLCJ1cHRva2VuIiwib25lbGlzdCIsInNldCIsIm5pY2tuYW1lIiwidWlkIiwic2F2ZSIsInRoZW4iLCJsaXN0IiwiaGlkZUxvYWRpbmciLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJjYXRjaCIsImVyciIsInVzZXJOaWNrIiwidXNlckluZm8iLCJuaWNrTmFtZSIsIm9iamVjdElkIiwic2hvd0xvYWRpbmciLCJ1cGxvYWRJbWdzIiwic2V0VGltZW91dCIsImpzb24iLCJjaGVja0hlYWRlSW5mbyIsImNoZWNrSm9iRm9ybSIsImNoZWNrU2FsZUZvcm0iLCJjaGVja0hvbWVGb3JtIiwiY2hlY2tDYXJGb3JtIiwiY2hlY2tGaW5kRm9ybSIsImNoZWNrRm9vZEZvcm0iLCJwaG9uZVJlZyIsInRlc3QiLCJqb2JEYXRhIiwiam9ibmFtZSIsImpvYnByaWNlIiwibnVtYmVyIiwiYWRkcmVzcyIsImNvbXBhbnlOYW1lIiwic2FsZURhdGEiLCJob21lRGF0YSIsInByaWNlIiwiY2FyRGF0YSIsIm1pbGVhZ2UiLCJmaW5kRGF0YSIsImZvb2REYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCQyxRQUFRLHdCQUFSLENBQXRCO0FBQ0EsSUFBTUMsV0FBV0QsUUFBUSx3QkFBUixFQUFrQ0MsUUFBbkQ7QUFDQSxJQUFNQyxVQUFVO0FBQ2QsYUFBUyxRQURLO0FBRWQsZ0JBQVlDLEtBQUtDLEtBQUwsQ0FBVyxJQUFJRCxJQUFKLEVBQVgsSUFBeUIsSUFGdkI7QUFHZCxpQkFBWTtBQUhFLENBQWhCO0FBS0EsSUFBTUUsY0FBY0osU0FBUywwQ0FBVCxFQUFxRCwwQ0FBckQsRUFBaUdDLE9BQWpHLENBQXBCO0FBQ0E7O0lBRXFCSSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyxzQkFBVyxFQURSO0FBRUhDLG1CQUFRLEVBRkwsRUFFUztBQUNaQyxzQkFBVyxFQUhSLEVBR1k7QUFDZkMsbUJBQVEsRUFKTCxFQUlTO0FBQ1pDLDJCQUFnQixFQUxiO0FBTUhDLGtCQUFPLEtBTkosRUFNVztBQUNkQyxzQkFBVyxJ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LEk7O2tCQUFyQjVHLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgSm9iRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2pvYmZvcm0nO1xuaW1wb3J0IFNhbGVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2FsZWZvcm0nO1xuaW1wb3J0IEhvbWVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvaG9tZWZvcm0nO1xuaW1wb3J0IENhckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9jYXJmb3JtJztcbmltcG9ydCBGaW5kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbmRmb3JtJztcbmltcG9ydCBGb29kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2Zvb2Rmb3JtJztcbmltcG9ydCBGcmllbmRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZnJpZW5kZm9ybSc7XG5pbXBvcnQgUGV0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3BldGZvcm0nO1xuaW1wb3J0IEVkdUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9lZHVmb3JtJztcbmltcG9ydCBPdGhlckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9vdGhlcmZvcm0nO1xuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnO1xuXG5cbmltcG9ydCBBViBmcm9tICcuLi91dGlscy9hdi13ZWFwcC1taW4uanMnO1xuaW1wb3J0IE5ld3NMaXN0IGZyb20gJy4uL21vZGVscy9uZXdzbGlzdCc7XG5cbmNvbnN0IHFpbml1VXBsb2FkZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvcWluaXVVcGxvYWRlclwiKTtcbmNvbnN0IGdlblRva2VuID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0VXBUb2tlbi5qcycpLmdlblRva2VuO1xuY29uc3Qgb3B0aW9ucyA9IHtcbiAgXCJzY29wZVwiOiBcImltYWdlc1wiLFxuICBcImRlYWRsaW5lXCI6IERhdGUucGFyc2UobmV3IERhdGUoKSkgKyAxODAwLFxuICBcIm1pbWVMaW1pdFwiOlwiaW1hZ2UvKlwiXG59XG5jb25zdCB1cGxvYWRUb2tlbiA9IGdlblRva2VuKCctMnJRN2pNV3dJMVBIZV9pOGM2MFdPZ3g3aXNleEUxU0ktSzVlU1B4JywgJ3VXa1d2d0R3dWNUQTlla2tiU1dNRFFQTUJ0NHQ4S1l0RlJra3ZyTVcnLCBvcHRpb25zKTtcbi8vIGNvbnNvbGUubG9nKHVwbG9hZFRva2VuKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aGVtZWltZyA6ICcnLFxuICAgICAgICB0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgc3VidGl0bGUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHBob25lIDogJycsIC8vcmVxdWlyZVxuICAgICAgICBwdWJsaXNoZXJuYW1lIDogJycsXG4gICAgICAgIHR5cGUgOiAnam9iJywgLy9yZXF1aXJlXG4gICAgICAgIGZvcm1kYXRhIDogbnVsbCwgLy/lkITkuKrooajljZXnmoTkv6Hmga9cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvYmZvcm1cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJzYWxlZm9ybVwiOnt9LFwiaG9tZWZvcm1cIjp7fSxcImNhcmZvcm1cIjp7fSxcImZpbmRmb3JtXCI6e30sXCJmb29kZm9ybVwiOnt9LFwiZnJpZW5kZm9ybVwiOnt9LFwicGV0Zm9ybVwiOnt9LFwiZWR1Zm9ybVwiOnt9LFwib3RoZXJmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge1wiam9iZm9ybVwiOntcInYtb246Z2V0Sm9iRm9ybVwiOlwiZ2V0Rm9ybVwifSxcInNhbGVmb3JtXCI6e1widi1vbjpnZXRTYWxlRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImhvbWVmb3JtXCI6e1widi1vbjpnZXRIb21lRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImNhcmZvcm1cIjp7XCJ2LW9uOmdldENhckZvcm1cIjpcImdldEZvcm1cIn0sXCJmaW5kZm9ybVwiOntcInYtb246Z2V0RmluZEZvcm1cIjpcImdldEZvcm1cIn0sXCJmb29kZm9ybVwiOntcInYtb246Z2V0Rm9vZEZvcm1cIjpcImdldEZvcm1cIn0sXCJmcmllbmRmb3JtXCI6e1widi1vbjpnZXRGaXJlbmRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwicGV0Zm9ybVwiOntcInYtb246Z2V0UGV0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImVkdWZvcm1cIjp7XCJ2LW9uOmdldEVkdUZvcm1cIjpcImdldEZvcm1cIn0sXCJvdGhlcmZvcm1cIjp7XCJ2LW9uOmdldE90aGVyRm9ybVwiOlwiZ2V0Rm9ybVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgc2FsZWZvcm0gOiBTYWxlRm9ybSxcbiAgICAgICAgaG9tZWZvcm0gOiBIb21lRm9ybSxcbiAgICAgICAgY2FyZm9ybSA6IENhckZvcm0sXG4gICAgICAgIGZpbmRmb3JtIDogRmluZEZvcm0sXG4gICAgICAgIGZvb2Rmb3JtIDogRm9vZEZvcm0sXG4gICAgICAgIGZyaWVuZGZvcm0gOiBGcmllbmRGb3JtLFxuICAgICAgICBwZXRmb3JtIDogUGV0Rm9ybSxcbiAgICAgICAgZWR1Zm9ybSA6IEVkdUZvcm0sXG4gICAgICAgIG90aGVyZm9ybSA6IE90aGVyRm9ybSxcbiAgICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICB2bS50aGVtZWltZyA9IHZtLiRwYXJlbnQuZ2xvYmFsRGF0YS50aGVtZWltZztcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgdGFwKHBhcmFtcyl7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZvcm0oZGF0YSl7XG4gICAgICAgICAgICB0aGlzLmZvcm1kYXRhID0gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzdWJUaXRsZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5zdWJ0aXRsZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHBob25lQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnBob25lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5wdWJsaXNoZXJuYW1lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0KCl7XG4gICAgICAgICAgICB2YXIgZmV0Y2hUeXBlID0gdGhpcy50eXBlKydGZXRjaCc7XG4gICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoZmV0Y2hUeXBlKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmNoZWNrRm9ybUluZm8oKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5mbGFnKXtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZnJvbSBjaGlsZCBmb3JtJyx0aGlzLmZvcm1kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFqYXhTZW5kKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3VsdC5pbmZvLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgfVxuICAgIHVwbG9hZEltZ3MoZGF0YSl7XG4gICAgICAgIGxldCBmaWxlUGF0aHMgPSBkYXRhLmZvcm1kYXRhLmltYWdlcztcbiAgICAgICAgbGV0IGxlbiA9IGZpbGVQYXRocy5sZW5ndGg7XG4gICAgICAgIHZhciB2bSA9IHRoaXMsaW1nQXJyID0gW10sZG9tYWluID0gdm0uJHBhcmVudC5nbG9iYWxEYXRhLmRvbWFpbjtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47aSsrKXtcbiAgICAgICAgICAgIHFpbml1VXBsb2FkZXIudXBsb2FkKGZpbGVQYXRoc1tpXSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMsJ3VwbG9hZCByZXMnKTtcbiAgICAgICAgICAgICAgaW1nQXJyLnB1c2goZG9tYWluK3Jlcy5pbWFnZVVSTCk7XG4gICAgICAgICAgICAgIGlmKGkgPT0gbGVuLTEpe1xuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaSwnZW5kJyxpbWdBcnIpO1xuICAgICAgICAgICAgICAgICAgZGF0YS5mb3JtZGF0YS5pbWFnZXMgPSBpbWdBcnI7XG4gICAgICAgICAgICAgICAgICB2bS5zYXZlRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICByZWdpb246ICdFQ04nLFxuICAgICAgICAgICAgICAgIHVwdG9rZW46IHVwbG9hZFRva2VuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHNhdmVEYXRhKGRhdGEpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLCdzZW5kIGRhdGEnKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgICB2YXIgb25lbGlzdCA9IG5ldyBOZXdzTGlzdCgpLHZtID0gdGhpcztcbiAgICAgICAgb25lbGlzdC5zZXQoJ25pY2tuYW1lJyxkYXRhLm5pY2tuYW1lKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3VpZCcsZGF0YS51aWQpO1xuICAgICAgICBvbmVsaXN0LnNldCgndGl0bGUnLGRhdGEudGl0bGUpO1xuICAgICAgICBvbmVsaXN0LnNldCgnc3VidGl0bGUnLGRhdGEuc3VidGl0bGUpO1xuICAgICAgICBvbmVsaXN0LnNldCgnc3VidGl0bGUnLGRhdGEuc3VidGl0bGUpO1xuICAgICAgICBvbmVsaXN0LnNldCgncGhvbmUnLGRhdGEucGhvbmUpO1xuICAgICAgICBvbmVsaXN0LnNldCgncHVibGlzaGVybmFtZScsZGF0YS5wdWJsaXNoZXJuYW1lKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3R5cGUnLGRhdGEudHlwZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCdmb3JtZGF0YScsZGF0YS5mb3JtZGF0YSk7XG4gICAgICAgIG9uZWxpc3Quc2F2ZSgpLnRoZW4oZnVuY3Rpb24obGlzdCl7XG4gICAgICAgICAgICB2bS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ3N1Y2Nlc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB2bS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgdm0uJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAn5Y+R5biD5aSx6LSl77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWpheFNlbmQoKXtcbiAgICAgICAgbGV0IHZtID0gdGhpcztcbiAgICAgICAgbGV0IHVzZXJOaWNrID0gdm0uJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJOaWNrO1xuICAgICAgICBsZXQgdXNlckluZm8gPSB2bS4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm87XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmlja25hbWUgOiB1c2VyTmljay5uaWNrTmFtZSxcbiAgICAgICAgICAgIHVpZCA6IHVzZXJJbmZvLm9iamVjdElkLFxuICAgICAgICAgICAgdGl0bGUgOiB2bS50aXRsZSwgLy9yZXF1aXJlXG4gICAgICAgICAgICBzdWJ0aXRsZSA6IHZtLnN1YnRpdGxlLFxuICAgICAgICAgICAgcHVibGlzaGVybmFtZSA6IHZtLnB1Ymxpc2hlcm5hbWUsXG4gICAgICAgICAgICBwaG9uZSA6IHZtLnBob25lLCAvL3JlcXVpcmVcbiAgICAgICAgICAgIHR5cGUgOiB2bS50eXBlLCAvL3JlcXVpcmVcbiAgICAgICAgICAgIGZvcm1kYXRhIDogdm0uZm9ybWRhdGEsIC8v6KGo5Y2V55qE5L+h5oGvXG4gICAgICAgIH1cbiAgICAgICAgdm0uc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgaWYodm0uZm9ybWRhdGEuaW1hZ2VzKXtcbiAgICAgICAgICAgIHZtLnVwbG9hZEltZ3MoZGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdm0uc2F2ZURhdGEoZGF0YSk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgc2hvd0xvYWRpbmcoKXtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGUgOiAn5o+Q5Lqk5LitLi4uJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGlkZUxvYWRpbmcoKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIH0sMTAwKTtcbiAgICB9XG4gICAgY2hlY2tGb3JtSW5mbygpe1xuICAgICAgICB2YXIganNvbiA9IG51bGw7XG4gICAgICAgIGpzb24gPSB0aGlzLmNoZWNrSGVhZGVJbmZvKCk7IC8v5qOA5rWL5aS06YOo5YiGXG4gICAgICAgIGlmKGpzb24uZmxhZyl7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2pvYic6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrSm9iRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzYWxlJzpcbiAgICAgICAgICAgICAgICAgICAganNvbiA9IHRoaXMuY2hlY2tTYWxlRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdob21lJzpcbiAgICAgICAgICAgICAgICAgICAganNvbiA9IHRoaXMuY2hlY2tIb21lRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjYXInOlxuICAgICAgICAgICAgICAgICAgICBqc29uID0gdGhpcy5jaGVja0NhckZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmluZCc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrRmluZEZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vZCc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrRm9vZEZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGpzb24uaW5mbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH07XG4gICAgLy/mo4DmtYsg5aS06YOo5YiGXG4gICAgY2hlY2tIZWFkZUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGhvbmVSZWcgPSAvXjB7MCwxfTFbMzQ1Njc4OV17MX1bMC05XXs5fSQvaWc7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJ0aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICflia/moIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35LiN6IO95Li656m6JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFwaG9uZVJlZy50ZXN0KHRoaXMucGhvbmUpKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+agvOW8j+S4jeato+ehric7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tKb2JGb3JtKCl7XG4gICAgICAgIHZhciBqc29uID0ge1xuICAgICAgICAgICAgZmxhZyA6IHRydWUsXG4gICAgICAgICAgICBpbmZvIDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGpvYkRhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZigham9iRGF0YS5qb2JuYW1lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOiBjOS9jSc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5qb2JwcmljZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnogYzkvY3mnIjolqonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWpvYkRhdGEubnVtYmVyKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOS6uuaVsCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5hZGRyZXNzKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOWcsOWdgCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5jb21wYW55TmFtZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnlhazlj7jlkI3np7AnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrU2FsZUZvcm0oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2FsZURhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZighc2FsZURhdGEuYWRkcmVzcyl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnmtLvliqjlnLDlnYAnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrSG9tZUZvcm0oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaG9tZURhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZighaG9tZURhdGEuYWRkcmVzcyl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnmiL/lsYvlnLDlnYAnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWhvbWVEYXRhLnByaWNlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaIv+Wxi+S7t+agvCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tDYXJGb3JtKCl7XG4gICAgICAgIHZhciBqc29uID0ge1xuICAgICAgICAgICAgZmxhZyA6IHRydWUsXG4gICAgICAgICAgICBpbmZvIDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNhckRhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZighY2FyRGF0YS5wcmljZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnovabovobku7fmoLwnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWNhckRhdGEubWlsZWFnZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnooYzpqbbph4znqIsnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrRmluZEZvcm0oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZmluZERhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZighZmluZERhdGEuYWRkcmVzcyl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnkuKLlpLHlnLDngrknO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrRm9vZEZvcm0oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZm9vZERhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZighZm9vZERhdGEucHJpY2Upe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5Lq65Z2H5raI6LS5JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFmb29kRGF0YS5hZGRyZXNzKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmee+jumjn+WcsOeCuSc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG59XG4iXX0=