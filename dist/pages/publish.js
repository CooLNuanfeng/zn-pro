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
    }]);

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsicWluaXVVcGxvYWRlciIsInJlcXVpcmUiLCJnZW5Ub2tlbiIsIm9wdGlvbnMiLCJEYXRlIiwicGFyc2UiLCJ1cGxvYWRUb2tlbiIsIlB1Ymxpc2giLCJkYXRhIiwidGhlbWVpbWciLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJwdWJsaXNoZXJuYW1lIiwidHlwZSIsImZvcm1kYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9iZm9ybSIsInNhbGVmb3JtIiwiaG9tZWZvcm0iLCJjYXJmb3JtIiwiZmluZGZvcm0iLCJmb29kZm9ybSIsImZyaWVuZGZvcm0iLCJwZXRmb3JtIiwiZWR1Zm9ybSIsIm90aGVyZm9ybSIsInRvYXN0IiwibWV0aG9kcyIsInRhcCIsInBhcmFtcyIsImdldEZvcm0iLCJ0aXRsZUNoYW5nZSIsImV2dCIsImRldGFpbCIsInZhbHVlIiwic3ViVGl0bGVDaGFuZ2UiLCJwaG9uZUNoYW5nZSIsIm5hbWVDaGFuZ2UiLCJzdWJtaXQiLCJmZXRjaFR5cGUiLCIkYnJvYWRjYXN0IiwicmVzdWx0IiwiY2hlY2tGb3JtSW5mbyIsImZsYWciLCJhamF4U2VuZCIsIiRpbnZva2UiLCJtZXNzYWdlIiwiaW5mbyIsInZtIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJmaWxlUGF0aHMiLCJpbWFnZXMiLCJsZW4iLCJsZW5ndGgiLCJpbWdBcnIiLCJkb21haW4iLCJpIiwidXBsb2FkIiwicmVzIiwicHVzaCIsImltYWdlVVJMIiwic2F2ZURhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJyZWdpb24iLCJ1cHRva2VuIiwib25lbGlzdCIsInNldCIsIm5pY2tuYW1lIiwidWlkIiwic2F2ZSIsInRoZW4iLCJsaXN0IiwiaGlkZUxvYWRpbmciLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJjYXRjaCIsImVyciIsInVzZXJOaWNrIiwidXNlckluZm8iLCJuaWNrTmFtZSIsIm9iamVjdElkIiwic2hvd0xvYWRpbmciLCJ1cGxvYWRJbWdzIiwic2V0VGltZW91dCIsImpzb24iLCJjaGVja0hlYWRlSW5mbyIsImNoZWNrSm9iRm9ybSIsImNoZWNrU2FsZUZvcm0iLCJjaGVja0hvbWVGb3JtIiwicGhvbmVSZWciLCJ0ZXN0Iiwiam9iRGF0YSIsImpvYm5hbWUiLCJqb2JwcmljZSIsIm51bWJlciIsImFkZHJlc3MiLCJjb21wYW55TmFtZSIsInNhbGVEYXRhIiwiaG9tZURhdGEiLCJwcmljZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQkMsUUFBUSx3QkFBUixDQUF0QjtBQUNBLElBQU1DLFdBQVdELFFBQVEsd0JBQVIsRUFBa0NDLFFBQW5EO0FBQ0EsSUFBTUMsVUFBVTtBQUNkLGFBQVMsUUFESztBQUVkLGdCQUFZQyxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLElBQXlCLElBRnZCO0FBR2QsaUJBQVk7QUFIRSxDQUFoQjtBQUtBLElBQU1FLGNBQWNKLFNBQVMsMENBQVQsRUFBcUQsMENBQXJELEVBQWlHQyxPQUFqRyxDQUFwQjtBQUNBOztJQUVxQkksTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVcsRUFEUjtBQUVIQyxtQkFBUSxFQUZMLEVBRVM7QUFDWkMsc0JBQVcsRUFIUixFQUdZO0FBQ2ZDLG1CQUFRLEVBSkwsRUFJUztBQUNaQywyQkFBZ0IsRUFMYjtBQU1IQyxrQkFBTyxLQU5KLEVBTVc7QUFDZEMsc0JBQVcsSUFQUixDQU9jO0FBUGQsUyxRQVNSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsY0FBYSxFQUFkLEVBQVgsRUFBNkIsWUFBVyxFQUF4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QUNIOzs7d0NBQ2M7QUFDWCxnQkFBSUEsT0FBTztBQUNQN0Msc0JBQU8sSUFEQTtBQUVQSSxzQkFBTztBQUZBLGFBQVg7QUFJQSxnQkFBSXNELFdBQVcsS0FBSzFGLFFBQXBCO0FBQ0EsZ0JBQUcsQ0FBQzBGLFNBQVNGLE9BQWIsRUFBcUI7QUFDakJYLHFCQUFLN0MsSUFBTCxHQUFZLEtBQVo7QUFDQTZDLHFCQUFLekMsSUFBTCxHQUFZLFNBQVo7QUFDQSx1QkFBT3lDLElBQVA7QUFDSDtBQUNELG1CQUFPQSxJQUFQO0FBQ0g7Ozt3Q0FDYztBQUNYLGdCQUFJQSxPQUFPO0FBQ1A3QyxzQkFBTyxJQURBO0FBRVBJLHNCQUFPO0FBRkEsYUFBWDtBQUlBLGdCQUFJdUQsV0FBVyxLQUFLM0YsUUFBcEI7QUFDQSxnQkFBRyxDQUFDMkYsU0FBU0gsT0FBYixFQUFxQjtBQUNqQlgscUJBQUs3QyxJQUFMLEdBQVksS0FBWjtBQUNBNkMscUJBQUt6QyxJQUFMLEdBQVksU0FBWjtBQUNBLHVCQUFPeUMsSUFBUDtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQ2MsU0FBU0MsS0FBYixFQUFtQjtBQUNmZixxQkFBSzdDLElBQUwsR0FBWSxLQUFaO0FBQ0E2QyxxQkFBS3pDLElBQUwsR0FBWSxTQUFaO0FBQ0EsdUJBQU95QyxJQUFQO0FBQ0g7QUFDRCxtQkFBT0EsSUFBUDtBQUNIOzs7O0VBalFnQyxlQUFLZ0IsSTs7a0JBQXJCckcsTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBKb2JGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iZm9ybSc7XG5pbXBvcnQgU2FsZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9zYWxlZm9ybSc7XG5pbXBvcnQgSG9tZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ob21lZm9ybSc7XG5pbXBvcnQgQ2FyRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2NhcmZvcm0nO1xuaW1wb3J0IEZpbmRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZmluZGZvcm0nO1xuaW1wb3J0IEZvb2RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vZGZvcm0nO1xuaW1wb3J0IEZyaWVuZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9mcmllbmRmb3JtJztcbmltcG9ydCBQZXRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvcGV0Zm9ybSc7XG5pbXBvcnQgRWR1Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2VkdWZvcm0nO1xuaW1wb3J0IE90aGVyRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL290aGVyZm9ybSc7XG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCc7XG5cblxuaW1wb3J0IEFWIGZyb20gJy4uL3V0aWxzL2F2LXdlYXBwLW1pbi5qcyc7XG5pbXBvcnQgTmV3c0xpc3QgZnJvbSAnLi4vbW9kZWxzL25ld3NsaXN0JztcblxuY29uc3QgcWluaXVVcGxvYWRlciA9IHJlcXVpcmUoXCIuLi91dGlscy9xaW5pdVVwbG9hZGVyXCIpO1xuY29uc3QgZ2VuVG9rZW4gPSByZXF1aXJlKCcuLi91dGlscy9nZXRVcFRva2VuLmpzJykuZ2VuVG9rZW47XG5jb25zdCBvcHRpb25zID0ge1xuICBcInNjb3BlXCI6IFwiaW1hZ2VzXCIsXG4gIFwiZGVhZGxpbmVcIjogRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSArIDE4MDAsXG4gIFwibWltZUxpbWl0XCI6XCJpbWFnZS8qXCJcbn1cbmNvbnN0IHVwbG9hZFRva2VuID0gZ2VuVG9rZW4oJy0yclE3ak1Xd0kxUEhlX2k4YzYwV09neDdpc2V4RTFTSS1LNWVTUHgnLCAndVdrV3Z3RHd1Y1RBOWVra2JTV01EUVBNQnQ0dDhLWXRGUmtrdnJNVycsIG9wdGlvbnMpO1xuLy8gY29uc29sZS5sb2codXBsb2FkVG9rZW4pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHRoZW1laW1nIDogJycsXG4gICAgICAgIHRpdGxlIDogJycsIC8vcmVxdWlyZVxuICAgICAgICBzdWJ0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgcGhvbmUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHB1Ymxpc2hlcm5hbWUgOiAnJyxcbiAgICAgICAgdHlwZSA6ICdqb2InLCAvL3JlcXVpcmVcbiAgICAgICAgZm9ybWRhdGEgOiBudWxsLCAvL+WQhOS4quihqOWNleeahOS/oeaBr1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9iZm9ybVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcInNhbGVmb3JtXCI6e30sXCJob21lZm9ybVwiOnt9LFwiY2FyZm9ybVwiOnt9LFwiZmluZGZvcm1cIjp7fSxcImZvb2Rmb3JtXCI6e30sXCJmcmllbmRmb3JtXCI6e30sXCJwZXRmb3JtXCI6e30sXCJlZHVmb3JtXCI6e30sXCJvdGhlcmZvcm1cIjp7fX07XHJcbiRldmVudHMgPSB7XCJqb2Jmb3JtXCI6e1widi1vbjpnZXRKb2JGb3JtXCI6XCJnZXRGb3JtXCJ9LFwic2FsZWZvcm1cIjp7XCJ2LW9uOmdldFNhbGVGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiaG9tZWZvcm1cIjp7XCJ2LW9uOmdldEhvbWVGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiY2FyZm9ybVwiOntcInYtb246Z2V0Q2FyRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZpbmRmb3JtXCI6e1widi1vbjpnZXRGaW5kRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZvb2Rmb3JtXCI6e1widi1vbjpnZXRGb29kRm9ybVwiOlwiZ2V0Rm9ybVwifSxcImZyaWVuZGZvcm1cIjp7XCJ2LW9uOmdldEZpcmVuZEZvcm1cIjpcImdldEZvcm1cIn0sXCJwZXRmb3JtXCI6e1widi1vbjpnZXRQZXRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZWR1Zm9ybVwiOntcInYtb246Z2V0RWR1Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcIm90aGVyZm9ybVwiOntcInYtb246Z2V0T3RoZXJGb3JtXCI6XCJnZXRGb3JtXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGpvYmZvcm0gOiBKb2JGb3JtLFxuICAgICAgICBzYWxlZm9ybSA6IFNhbGVGb3JtLFxuICAgICAgICBob21lZm9ybSA6IEhvbWVGb3JtLFxuICAgICAgICBjYXJmb3JtIDogQ2FyRm9ybSxcbiAgICAgICAgZmluZGZvcm0gOiBGaW5kRm9ybSxcbiAgICAgICAgZm9vZGZvcm0gOiBGb29kRm9ybSxcbiAgICAgICAgZnJpZW5kZm9ybSA6IEZyaWVuZEZvcm0sXG4gICAgICAgIHBldGZvcm0gOiBQZXRGb3JtLFxuICAgICAgICBlZHVmb3JtIDogRWR1Rm9ybSxcbiAgICAgICAgb3RoZXJmb3JtIDogT3RoZXJGb3JtLFxuICAgICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgIHZtLnRoZW1laW1nID0gdm0uJHBhcmVudC5nbG9iYWxEYXRhLnRoZW1laW1nO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAocGFyYW1zKXtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rm9ybShkYXRhKXtcbiAgICAgICAgICAgIHRoaXMuZm9ybWRhdGEgPSBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICB0aXRsZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHN1YlRpdGxlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnN1YnRpdGxlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcGhvbmVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMucGhvbmUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBuYW1lQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hlcm5hbWUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQoKXtcbiAgICAgICAgICAgIHZhciBmZXRjaFR5cGUgPSB0aGlzLnR5cGUrJ0ZldGNoJztcbiAgICAgICAgICAgIHRoaXMuJGJyb2FkY2FzdChmZXRjaFR5cGUpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2hlY2tGb3JtSW5mbygpO1xuICAgICAgICAgICAgaWYocmVzdWx0LmZsYWcpe1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmcm9tIGNoaWxkIGZvcm0nLHRoaXMuZm9ybWRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWpheFNlbmQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0LmluZm8sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICB9XG4gICAgdXBsb2FkSW1ncyhkYXRhKXtcbiAgICAgICAgbGV0IGZpbGVQYXRocyA9IGRhdGEuZm9ybWRhdGEuaW1hZ2VzO1xuICAgICAgICBsZXQgbGVuID0gZmlsZVBhdGhzLmxlbmd0aDtcbiAgICAgICAgdmFyIHZtID0gdGhpcyxpbWdBcnIgPSBbXSxkb21haW4gPSB2bS4kcGFyZW50Lmdsb2JhbERhdGEuZG9tYWluO1xuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjtpKyspe1xuICAgICAgICAgICAgcWluaXVVcGxvYWRlci51cGxvYWQoZmlsZVBhdGhzW2ldLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcywndXBsb2FkIHJlcycpO1xuICAgICAgICAgICAgICBpbWdBcnIucHVzaChkb21haW4rcmVzLmltYWdlVVJMKTtcbiAgICAgICAgICAgICAgaWYoaSA9PSBsZW4tMSl7XG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpLCdlbmQnLGltZ0Fycik7XG4gICAgICAgICAgICAgICAgICBkYXRhLmZvcm1kYXRhLmltYWdlcyA9IGltZ0FycjtcbiAgICAgICAgICAgICAgICAgIHZtLnNhdmVEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAnRUNOJyxcbiAgICAgICAgICAgICAgICB1cHRva2VuOiB1cGxvYWRUb2tlblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBzYXZlRGF0YShkYXRhKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSwnc2VuZCBkYXRhJyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgICAgdmFyIG9uZWxpc3QgPSBuZXcgTmV3c0xpc3QoKSx2bSA9IHRoaXM7XG4gICAgICAgIG9uZWxpc3Quc2V0KCduaWNrbmFtZScsZGF0YS5uaWNrbmFtZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCd1aWQnLGRhdGEudWlkKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3RpdGxlJyxkYXRhLnRpdGxlKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3N1YnRpdGxlJyxkYXRhLnN1YnRpdGxlKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3N1YnRpdGxlJyxkYXRhLnN1YnRpdGxlKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3Bob25lJyxkYXRhLnBob25lKTtcbiAgICAgICAgb25lbGlzdC5zZXQoJ3B1Ymxpc2hlcm5hbWUnLGRhdGEucHVibGlzaGVybmFtZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCd0eXBlJyxkYXRhLnR5cGUpO1xuICAgICAgICBvbmVsaXN0LnNldCgnZm9ybWRhdGEnLGRhdGEuZm9ybWRhdGEpO1xuICAgICAgICBvbmVsaXN0LnNhdmUoKS50aGVuKGZ1bmN0aW9uKGxpc3Qpe1xuICAgICAgICAgICAgdm0uaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybCA6ICdzdWNjZXNzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgdm0uaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHZtLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+WPkeW4g+Wksei0pe+8jOivt+mHjeivlScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFqYXhTZW5kKCl7XG4gICAgICAgIGxldCB2bSA9IHRoaXM7XG4gICAgICAgIGxldCB1c2VyTmljayA9IHZtLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTmljaztcbiAgICAgICAgbGV0IHVzZXJJbmZvID0gdm0uJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIG5pY2tuYW1lIDogdXNlck5pY2submlja05hbWUsXG4gICAgICAgICAgICB1aWQgOiB1c2VySW5mby5vYmplY3RJZCxcbiAgICAgICAgICAgIHRpdGxlIDogdm0udGl0bGUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgc3VidGl0bGUgOiB2bS5zdWJ0aXRsZSxcbiAgICAgICAgICAgIHB1Ymxpc2hlcm5hbWUgOiB2bS5wdWJsaXNoZXJuYW1lLFxuICAgICAgICAgICAgcGhvbmUgOiB2bS5waG9uZSwgLy9yZXF1aXJlXG4gICAgICAgICAgICB0eXBlIDogdm0udHlwZSwgLy9yZXF1aXJlXG4gICAgICAgICAgICBmb3JtZGF0YSA6IHZtLmZvcm1kYXRhLCAvL+ihqOWNleeahOS/oeaBr1xuICAgICAgICB9XG4gICAgICAgIHZtLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIGlmKHZtLmZvcm1kYXRhLmltYWdlcyl7XG4gICAgICAgICAgICB2bS51cGxvYWRJbWdzKGRhdGEpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZtLnNhdmVEYXRhKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHNob3dMb2FkaW5nKCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlIDogJ+aPkOS6pOS4rS4uLidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhpZGVMb2FkaW5nKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9LDEwMCk7XG4gICAgfVxuICAgIGNoZWNrRm9ybUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSBudWxsO1xuICAgICAgICBqc29uID0gdGhpcy5jaGVja0hlYWRlSW5mbygpOyAvL+ajgOa1i+WktOmDqOWIhlxuICAgICAgICBpZihqc29uLmZsYWcpe1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdqb2InOlxuICAgICAgICAgICAgICAgICAgICBqc29uID0gdGhpcy5jaGVja0pvYkZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2FsZSc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrU2FsZUZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrSG9tZUZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZToganNvbi5pbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfTtcbiAgICAvL+ajgOa1iyDlpLTpg6jliIZcbiAgICBjaGVja0hlYWRlSW5mbygpe1xuICAgICAgICB2YXIganNvbiA9IHtcbiAgICAgICAgICAgIGZsYWcgOiB0cnVlLFxuICAgICAgICAgICAgaW5mbyA6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwaG9uZVJlZyA9IC9eMHswLDF9MVszNDU2Nzg5XXsxfVswLTldezl9JC9pZztcbiAgICAgICAgaWYoIXRoaXMudGl0bGUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5qCH6aKY5LiN6IO95Li656m6JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnN1YnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+WJr+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5waG9uZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfmiYvmnLrlj7fkuI3og73kuLrnqbonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXBob25lUmVnLnRlc3QodGhpcy5waG9uZSkpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35qC85byP5LiN5q2j56GuJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgICBjaGVja0pvYkZvcm0oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgam9iRGF0YSA9IHRoaXMuZm9ybWRhdGE7XG4gICAgICAgIGlmKCFqb2JEYXRhLmpvYm5hbWUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oub6IGY6IGM5L2NJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFqb2JEYXRhLmpvYnByaWNlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeiBjOS9jeaciOiWqic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5udW1iZXIpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oub6IGY5Lq65pWwJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFqb2JEYXRhLmFkZHJlc3Mpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oub6IGY5Zyw5Z2AJztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFqb2JEYXRhLmNvbXBhbnlOYW1lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeWFrOWPuOWQjeensCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tTYWxlRm9ybSgpe1xuICAgICAgICB2YXIganNvbiA9IHtcbiAgICAgICAgICAgIGZsYWcgOiB0cnVlLFxuICAgICAgICAgICAgaW5mbyA6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBzYWxlRGF0YSA9IHRoaXMuZm9ybWRhdGE7XG4gICAgICAgIGlmKCFzYWxlRGF0YS5hZGRyZXNzKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmea0u+WKqOWcsOWdgCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tIb21lRm9ybSgpe1xuICAgICAgICB2YXIganNvbiA9IHtcbiAgICAgICAgICAgIGZsYWcgOiB0cnVlLFxuICAgICAgICAgICAgaW5mbyA6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBob21lRGF0YSA9IHRoaXMuZm9ybWRhdGE7XG4gICAgICAgIGlmKCFob21lRGF0YS5hZGRyZXNzKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaIv+Wxi+WcsOWdgCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighaG9tZURhdGEucHJpY2Upe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn6K+35aGr5YaZ5oi/5bGL5Lu35qC8JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbn1cbiJdfQ==