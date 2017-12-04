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
                    console.log(res, 'upload res');
                    imgArr.push(domain + res.imageURL);
                    if (i == len - 1) {
                        console.log(i, 'end', imgArr);
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
            console.log(data, 'send data');
            var onelist = new _newslist2.default(),
                vm = this;
            onelist.set('nickname', data.nickname);
            onelist.set('uid', data.uid);
            onelist.set('title', data.title);
            onelist.set('subtitle', data.subtitle);
            onelist.set('subtitle', data.subtitle);
            onelist.set('phone', data.phone);
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
        key: 'checkSaleFrom',
        value: function checkSaleFrom() {}
    }]);

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsicWluaXVVcGxvYWRlciIsInJlcXVpcmUiLCJnZW5Ub2tlbiIsIm9wdGlvbnMiLCJEYXRlIiwicGFyc2UiLCJ1cGxvYWRUb2tlbiIsIlB1Ymxpc2giLCJkYXRhIiwidGhlbWVpbWciLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJ0eXBlIiwiZm9ybWRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2Jmb3JtIiwic2FsZWZvcm0iLCJob21lZm9ybSIsImNhcmZvcm0iLCJmaW5kZm9ybSIsImZvb2Rmb3JtIiwiZnJpZW5kZm9ybSIsInBldGZvcm0iLCJlZHVmb3JtIiwib3RoZXJmb3JtIiwidG9hc3QiLCJtZXRob2RzIiwidGFwIiwicGFyYW1zIiwiZ2V0Rm9ybSIsInRpdGxlQ2hhbmdlIiwiZXZ0IiwiZGV0YWlsIiwidmFsdWUiLCJzdWJUaXRsZUNoYW5nZSIsInBob25lQ2hhbmdlIiwic3VibWl0IiwiJGJyb2FkY2FzdCIsInJlc3VsdCIsImNoZWNrRm9ybUluZm8iLCJmbGFnIiwiYWpheFNlbmQiLCIkaW52b2tlIiwibWVzc2FnZSIsImluZm8iLCJ2bSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZmlsZVBhdGhzIiwiaW1hZ2VzIiwibGVuIiwibGVuZ3RoIiwiaW1nQXJyIiwiZG9tYWluIiwiaSIsInVwbG9hZCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwiaW1hZ2VVUkwiLCJzYXZlRGF0YSIsImVycm9yIiwicmVnaW9uIiwidXB0b2tlbiIsIm9uZWxpc3QiLCJzZXQiLCJuaWNrbmFtZSIsInVpZCIsInNhdmUiLCJ0aGVuIiwibGlzdCIsImhpZGVMb2FkaW5nIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwiY2F0Y2giLCJlcnIiLCJ1c2VyTmljayIsInVzZXJJbmZvIiwibmlja05hbWUiLCJvYmplY3RJZCIsInNob3dMb2FkaW5nIiwidXBsb2FkSW1ncyIsInNldFRpbWVvdXQiLCJqc29uIiwiY2hlY2tIZWFkZUluZm8iLCJjaGVja0pvYkZyb20iLCJjaGVja1NhbGVGcm9tIiwicGhvbmVSZWciLCJ0ZXN0Iiwiam9iRGF0YSIsImpvYm5hbWUiLCJqb2JwcmljZSIsIm51bWJlciIsImFkZHJlc3MiLCJjb21wYW55TmFtZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQkMsUUFBUSx3QkFBUixDQUF0QjtBQUNBLElBQU1DLFdBQVdELFFBQVEsd0JBQVIsRUFBa0NDLFFBQW5EO0FBQ0EsSUFBTUMsVUFBVTtBQUNkLGFBQVMsUUFESztBQUVkLGdCQUFZQyxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLElBQXlCLElBRnZCO0FBR2QsaUJBQVk7QUFIRSxDQUFoQjtBQUtBLElBQU1FLGNBQWNKLFNBQVMsMENBQVQsRUFBcUQsMENBQXJELEVBQWlHQyxPQUFqRyxDQUFwQjtBQUNBOztJQUVxQkksTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVcsRUFEUjtBQUVIQyxtQkFBUSxFQUZMLEVBRVM7QUFDWkMsc0JBQVcsRUFIUjtBQUlIQyxtQkFBUSxFQUpMLEVBSVM7QUFDWkMsa0JBQU8sS0FMSixFQUtXO0FBQ2RDLHNCQUFXLElBTlIsQ0FNYztBQU5kLFMsUUFRUkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsV0FBVSxFQUFDLGNBQWEsRUFBZCxFQUFYLEVBQTZCLFlBQVcsRUFBeEMsRUFBMkMsWUFBVyxFQUF0RCxFQUF5RCxXQUFVLEVBQW5FLEVBQXNFLFlBQVcsRUFBakYsRUFBb0YsWUFBVyxFQUEvRixFQUFrRyxjQUFhLEVBQS9HLEVBQWtILFdBQVUsRUFBNUgsRUFBK0gs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UEksc0JBQU87QUFGQSxhQUFYO0FBSUEsZ0JBQUkrQyxVQUFVLEtBQUtqRixRQUFuQjtBQUNBLGdCQUFHLENBQUNpRixRQUFRQyxPQUFaLEVBQW9CO0FBQ2hCUCxxQkFBSzdDLElBQUwsR0FBWSxLQUFaO0FBQ0E2QyxxQkFBS3pDLElBQUwsR0FBWSxTQUFaO0FBQ0EsdUJBQU95QyxJQUFQO0FBQ0g7QUFDRCxnQkFBRyxDQUFDTSxRQUFRRSxRQUFaLEVBQXFCO0FBQ2pCUixxQkFBSzdDLElBQUwsR0FBWSxLQUFaO0FBQ0E2QyxxQkFBS3pDLElBQUwsR0FBWSxTQUFaO0FBQ0EsdUJBQU95QyxJQUFQO0FBQ0g7QUFDRCxnQkFBRyxDQUFDTSxRQUFRRyxNQUFaLEVBQW1CO0FBQ2ZULHFCQUFLN0MsSUFBTCxHQUFZLEtBQVo7QUFDQTZDLHFCQUFLekMsSUFBTCxHQUFZLFNBQVo7QUFDQSx1QkFBT3lDLElBQVA7QUFDSDtBQUNELGdCQUFHLENBQUNNLFFBQVFJLE9BQVosRUFBb0I7QUFDaEJWLHFCQUFLN0MsSUFBTCxHQUFZLEtBQVo7QUFDQTZDLHFCQUFLekMsSUFBTCxHQUFZLFNBQVo7QUFDQSx1QkFBT3lDLElBQVA7QUFDSDtBQUNELGdCQUFHLENBQUNNLFFBQVFLLFdBQVosRUFBd0I7QUFDcEJYLHFCQUFLN0MsSUFBTCxHQUFZLEtBQVo7QUFDQTZDLHFCQUFLekMsSUFBTCxHQUFZLFNBQVo7QUFDQSx1QkFBT3lDLElBQVA7QUFDSDtBQUNELG1CQUFPQSxJQUFQO0FBQ0g7Ozt3Q0FDYyxDQUVkOzs7O0VBM05nQyxlQUFLWSxJOztrQkFBckI5RixPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IEpvYkZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2Jmb3JtJztcbmltcG9ydCBTYWxlRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3NhbGVmb3JtJztcbmltcG9ydCBIb21lRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2hvbWVmb3JtJztcbmltcG9ydCBDYXJGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvY2FyZm9ybSc7XG5pbXBvcnQgRmluZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9maW5kZm9ybSc7XG5pbXBvcnQgRm9vZEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9mb29kZm9ybSc7XG5pbXBvcnQgRnJpZW5kRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2ZyaWVuZGZvcm0nO1xuaW1wb3J0IFBldEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9wZXRmb3JtJztcbmltcG9ydCBFZHVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZWR1Zm9ybSc7XG5pbXBvcnQgT3RoZXJGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvb3RoZXJmb3JtJztcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0JztcblxuXG5pbXBvcnQgQVYgZnJvbSAnLi4vdXRpbHMvYXYtd2VhcHAtbWluLmpzJztcbmltcG9ydCBOZXdzTGlzdCBmcm9tICcuLi9tb2RlbHMvbmV3c2xpc3QnO1xuXG5jb25zdCBxaW5pdVVwbG9hZGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL3Fpbml1VXBsb2FkZXJcIik7XG5jb25zdCBnZW5Ub2tlbiA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldFVwVG9rZW4uanMnKS5nZW5Ub2tlbjtcbmNvbnN0IG9wdGlvbnMgPSB7XG4gIFwic2NvcGVcIjogXCJpbWFnZXNcIixcbiAgXCJkZWFkbGluZVwiOiBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpICsgMTgwMCxcbiAgXCJtaW1lTGltaXRcIjpcImltYWdlLypcIlxufVxuY29uc3QgdXBsb2FkVG9rZW4gPSBnZW5Ub2tlbignLTJyUTdqTVd3STFQSGVfaThjNjBXT2d4N2lzZXhFMVNJLUs1ZVNQeCcsICd1V2tXdndEd3VjVEE5ZWtrYlNXTURRUE1CdDR0OEtZdEZSa2t2ck1XJywgb3B0aW9ucyk7XG4vLyBjb25zb2xlLmxvZyh1cGxvYWRUb2tlbilcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdGhlbWVpbWcgOiAnJyxcbiAgICAgICAgdGl0bGUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHN1YnRpdGxlIDogJycsXG4gICAgICAgIHBob25lIDogJycsIC8vcmVxdWlyZVxuICAgICAgICB0eXBlIDogJ2pvYicsIC8vcmVxdWlyZVxuICAgICAgICBmb3JtZGF0YSA6IG51bGwsIC8v5ZCE5Liq6KGo5Y2V55qE5L+h5oGvXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJqb2Jmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9LFwic2FsZWZvcm1cIjp7fSxcImhvbWVmb3JtXCI6e30sXCJjYXJmb3JtXCI6e30sXCJmaW5kZm9ybVwiOnt9LFwiZm9vZGZvcm1cIjp7fSxcImZyaWVuZGZvcm1cIjp7fSxcInBldGZvcm1cIjp7fSxcImVkdWZvcm1cIjp7fSxcIm90aGVyZm9ybVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcImpvYmZvcm1cIjp7XCJ2LW9uOmdldEpvYkZvcm1cIjpcImdldEZvcm1cIn0sXCJzYWxlZm9ybVwiOntcInYtb246Z2V0U2FsZUZvcm1cIjpcImdldEZvcm1cIn0sXCJob21lZm9ybVwiOntcInYtb246Z2V0SG9tZUZvcm1cIjpcImdldEZvcm1cIn0sXCJjYXJmb3JtXCI6e1widi1vbjpnZXRDYXJGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZmluZGZvcm1cIjp7XCJ2LW9uOmdldEZpbmRGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZm9vZGZvcm1cIjp7XCJ2LW9uOmdldEZvb2RGb3JtXCI6XCJnZXRGb3JtXCJ9LFwiZnJpZW5kZm9ybVwiOntcInYtb246Z2V0RmlyZW5kRm9ybVwiOlwiZ2V0Rm9ybVwifSxcInBldGZvcm1cIjp7XCJ2LW9uOmdldFBldEZvcm1cIjpcImdldEZvcm1cIn0sXCJlZHVmb3JtXCI6e1widi1vbjpnZXRFZHVGb3JtXCI6XCJnZXRGb3JtXCJ9LFwib3RoZXJmb3JtXCI6e1widi1vbjpnZXRPdGhlckZvcm1cIjpcImdldEZvcm1cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgam9iZm9ybSA6IEpvYkZvcm0sXG4gICAgICAgIHNhbGVmb3JtIDogU2FsZUZvcm0sXG4gICAgICAgIGhvbWVmb3JtIDogSG9tZUZvcm0sXG4gICAgICAgIGNhcmZvcm0gOiBDYXJGb3JtLFxuICAgICAgICBmaW5kZm9ybSA6IEZpbmRGb3JtLFxuICAgICAgICBmb29kZm9ybSA6IEZvb2RGb3JtLFxuICAgICAgICBmcmllbmRmb3JtIDogRnJpZW5kRm9ybSxcbiAgICAgICAgcGV0Zm9ybSA6IFBldEZvcm0sXG4gICAgICAgIGVkdWZvcm0gOiBFZHVGb3JtLFxuICAgICAgICBvdGhlcmZvcm0gOiBPdGhlckZvcm0sXG4gICAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgdm0udGhlbWVpbWcgPSB2bS4kcGFyZW50Lmdsb2JhbERhdGEudGhlbWVpbWc7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBnZXRGb3JtKGRhdGEpe1xuICAgICAgICAgICAgdGhpcy5mb3JtZGF0YSA9IGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc3ViVGl0bGVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBwaG9uZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5waG9uZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdCgpe1xuICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdmZXRjaCcpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2hlY2tGb3JtSW5mbygpO1xuICAgICAgICAgICAgaWYocmVzdWx0LmZsYWcpe1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmcm9tIGNoaWxkIGZvcm0nLHRoaXMuZm9ybWRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWpheFNlbmQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0LmluZm8sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICB9XG4gICAgdXBsb2FkSW1ncyhkYXRhKXtcbiAgICAgICAgbGV0IGZpbGVQYXRocyA9IGRhdGEuZm9ybWRhdGEuaW1hZ2VzO1xuICAgICAgICBsZXQgbGVuID0gZmlsZVBhdGhzLmxlbmd0aDtcbiAgICAgICAgdmFyIHZtID0gdGhpcyxpbWdBcnIgPSBbXSxkb21haW4gPSB2bS4kcGFyZW50Lmdsb2JhbERhdGEuZG9tYWluO1xuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjtpKyspe1xuICAgICAgICAgICAgcWluaXVVcGxvYWRlci51cGxvYWQoZmlsZVBhdGhzW2ldLCAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywndXBsb2FkIHJlcycpO1xuICAgICAgICAgICAgICBpbWdBcnIucHVzaChkb21haW4rcmVzLmltYWdlVVJMKTtcbiAgICAgICAgICAgICAgaWYoaSA9PSBsZW4tMSl7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpLCdlbmQnLGltZ0Fycik7XG4gICAgICAgICAgICAgICAgICBkYXRhLmZvcm1kYXRhLmltYWdlcyA9IGltZ0FycjtcbiAgICAgICAgICAgICAgICAgIHZtLnNhdmVEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAnRUNOJyxcbiAgICAgICAgICAgICAgICB1cHRva2VuOiB1cGxvYWRUb2tlblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBzYXZlRGF0YShkYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc2VuZCBkYXRhJyk7XG4gICAgICAgIHZhciBvbmVsaXN0ID0gbmV3IE5ld3NMaXN0KCksdm0gPSB0aGlzO1xuICAgICAgICBvbmVsaXN0LnNldCgnbmlja25hbWUnLGRhdGEubmlja25hbWUpO1xuICAgICAgICBvbmVsaXN0LnNldCgndWlkJyxkYXRhLnVpZCk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCd0aXRsZScsZGF0YS50aXRsZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCdzdWJ0aXRsZScsZGF0YS5zdWJ0aXRsZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCdzdWJ0aXRsZScsZGF0YS5zdWJ0aXRsZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCdwaG9uZScsZGF0YS5waG9uZSk7XG4gICAgICAgIG9uZWxpc3Quc2V0KCd0eXBlJyxkYXRhLnR5cGUpO1xuICAgICAgICBvbmVsaXN0LnNldCgnZm9ybWRhdGEnLGRhdGEuZm9ybWRhdGEpO1xuICAgICAgICBvbmVsaXN0LnNhdmUoKS50aGVuKGZ1bmN0aW9uKGxpc3Qpe1xuICAgICAgICAgICAgdm0uaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybCA6ICdzdWNjZXNzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgdm0uaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHZtLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+WPkeW4g+Wksei0pe+8jOivt+mHjeivlScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFqYXhTZW5kKCl7XG4gICAgICAgIGxldCB2bSA9IHRoaXM7XG4gICAgICAgIGxldCB1c2VyTmljayA9IHZtLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyTmljaztcbiAgICAgICAgbGV0IHVzZXJJbmZvID0gdm0uJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIG5pY2tuYW1lIDogdXNlck5pY2submlja05hbWUsXG4gICAgICAgICAgICB1aWQgOiB1c2VySW5mby5vYmplY3RJZCxcbiAgICAgICAgICAgIHRpdGxlIDogdm0udGl0bGUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgc3VidGl0bGUgOiB2bS5zdWJ0aXRsZSxcbiAgICAgICAgICAgIHBob25lIDogdm0ucGhvbmUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgdHlwZSA6IHZtLnR5cGUsIC8vcmVxdWlyZVxuICAgICAgICAgICAgZm9ybWRhdGEgOiB2bS5mb3JtZGF0YSwgLy/ooajljZXnmoTkv6Hmga9cbiAgICAgICAgfVxuICAgICAgICB2bS5zaG93TG9hZGluZygpO1xuICAgICAgICBpZih2bS5mb3JtZGF0YS5pbWFnZXMpe1xuICAgICAgICAgICAgdm0udXBsb2FkSW1ncyhkYXRhKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2bS5zYXZlRGF0YShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBzaG93TG9hZGluZygpe1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZSA6ICfmj5DkuqTkuK0uLi4nXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoaWRlTG9hZGluZygpe1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfSwxMDApXG4gICAgfVxuICAgIGNoZWNrRm9ybUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSBudWxsO1xuICAgICAgICBqc29uID0gdGhpcy5jaGVja0hlYWRlSW5mbygpOyAvL+ajgOa1i+WktOmDqOWIhlxuICAgICAgICBpZihqc29uLmZsYWcpe1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdqb2InOlxuICAgICAgICAgICAgICAgICAgICBqc29uID0gdGhpcy5jaGVja0pvYkZyb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2FsZSc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24gPSB0aGlzLmNoZWNrU2FsZUZyb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGpzb24uaW5mbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH07XG4gICAgLy/mo4DmtYsg5aS06YOo5YiGXG4gICAgY2hlY2tIZWFkZUluZm8oKXtcbiAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICBmbGFnIDogdHJ1ZSxcbiAgICAgICAgICAgIGluZm8gOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGhvbmVSZWcgPSAvXjB7MCwxfTFbMzQ1Njc4OV17MX1bMC05XXs5fSQvaWc7XG4gICAgICAgIGlmKCF0aGlzLnRpdGxlKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+agh+mimOS4jeiDveS4uuepuic7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJ0aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICflia/moIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35LiN6IO95Li656m6JztcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFwaG9uZVJlZy50ZXN0KHRoaXMucGhvbmUpKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+agvOW8j+S4jeato+ehric7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tKb2JGcm9tKCl7XG4gICAgICAgIHZhciBqc29uID0ge1xuICAgICAgICAgICAgZmxhZyA6IHRydWUsXG4gICAgICAgICAgICBpbmZvIDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGpvYkRhdGEgPSB0aGlzLmZvcm1kYXRhO1xuICAgICAgICBpZigham9iRGF0YS5qb2JuYW1lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOiBjOS9jSc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5qb2JwcmljZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnogYzkvY3mnIjolqonO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWpvYkRhdGEubnVtYmVyKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOS6uuaVsCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5hZGRyZXNzKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+ivt+Whq+WGmeaLm+iBmOWcsOWdgCc7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfVxuICAgICAgICBpZigham9iRGF0YS5jb21wYW55TmFtZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICfor7floavlhpnlhazlj7jlkI3np7AnO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNoZWNrU2FsZUZyb20oKXtcblxuICAgIH1cbn1cbiJdfQ==