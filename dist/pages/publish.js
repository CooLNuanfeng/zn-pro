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
        }, _this.$repeat = {}, _this.$props = { "jobform": { "xmlns:v-on": "" }, "saleform": {}, "homeform": {} }, _this.$events = { "jobform": { "v-on:getForm": "getForm" }, "saleform": { "v-on:getForm": "getForm" }, "homeform": { "v-on:getForm": "getForm" } }, _this.components = {
            jobform: _jobform2.default,
            saleform: _saleform2.default,
            homeform: _homeform2.default,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJ0eXBlIiwiZm9ybWRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJqb2Jmb3JtIiwic2FsZWZvcm0iLCJob21lZm9ybSIsImZvb3RlciIsInRvYXN0IiwibWV0aG9kcyIsInRhcCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRGb3JtIiwic3VibWl0IiwiJGJyb2FkY2FzdCIsImNoZWNrRm9ybUluZm8iLCJmbGFnIiwianNvbiIsImNoZWNrSGVhZGVJbmZvIiwiY2hlY2tKb2JGcm9tIiwiY2hlY2tTYWxlRnJvbSIsIiRpbnZva2UiLCJpbmZvIiwicGhvbmVSZWciLCJ0ZXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFRLEVBREwsRUFDUztBQUNaQyxzQkFBVyxFQUZSO0FBR0hDLG1CQUFRLEVBSEwsRUFHUztBQUNaQyxrQkFBTyxLQUpKLEVBSVc7QUFDZEMsc0JBQVcsSUFMUixDQUtjO0FBTGQsUyxRQU9SQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsY0FBYSxFQUFkLEVBQVgsRUFBNkIsWUFBVyxFQUF4QyxFQUEyQyxZQUFXLEVBQXRELEUsUUFDVEMsTyxHQUFVLEVBQUMsV0FBVSxFQUFDLGdCQUFlLFNBQWhCLEVBQVgsRUFBc0MsWUFBVyxFQUFDLGdCQUFlLFNBQWhCLEVBQWpELEVBQTRFLFlBQVcsRUFBQyxnQkFBZSxTQUFoQixFQUF2RixFLFFBQ1RDLFUsR0FBYTtBQUNOQyxzQ0FETTtBQUVOQyx3Q0FGTTtBQUdOQyx3Q0FITTtBQUlOQyxvQ0FKTTtBQUtOQztBQUxNLFMsUUFPVkMsTyxHQUFVO0FBQ05DLGVBRE0sZUFDRkMsTUFERSxFQUNLO0FBQ1BDLHdCQUFRQyxHQUFSLENBQVlGLE1BQVo7QUFDQSxxQkFBS2IsSUFBTCxHQUFZYSxNQUFaO0FBQ0gsYUFKSztBQUtORyxtQkFMTSxtQkFLRXBCLElBTEYsRUFLTztBQUNULHFCQUFLSyxRQUFMLEdBQWdCTCxJQUFoQjtBQUNILGFBUEs7QUFRTnFCLGtCQVJNLG9CQVFFO0FBQ0oscUJBQUtDLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDQSxvQkFBRyxLQUFLQyxhQUFMLEdBQXFCQyxJQUF4QixFQUE2QjtBQUN6Qk4sNEJBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUE4QixLQUFLZCxRQUFuQztBQUNIO0FBRUo7QUFkSyxTOzs7Ozt3Q0FnQks7QUFDWCxnQkFBSW9CLE9BQU8sSUFBWDtBQUNBQSxtQkFBTyxLQUFLQyxjQUFMLEVBQVA7QUFDQSxnQkFBR0QsS0FBS0QsSUFBUixFQUFhO0FBQ1Qsd0JBQVEsS0FBS3BCLElBQWI7QUFDSSx5QkFBSyxLQUFMO0FBQ0lxQiw2QkFBS0QsSUFBTCxHQUFZLEtBQUtHLFlBQUwsRUFBWjtBQUNBO0FBQ0oseUJBQUssTUFBTDtBQUNJRiw2QkFBS0QsSUFBTCxHQUFZLEtBQUtJLGFBQUwsRUFBWjtBQUNBOztBQU5SO0FBU0g7QUFDRCxnQkFBRyxDQUFDSCxLQUFLRCxJQUFULEVBQWM7QUFDVixxQkFBS0ssT0FBTCxDQUFhLE9BQWIsRUFBc0IsTUFBdEIsRUFBOEI7QUFDMUI1QiwyQkFBT3dCLEtBQUtLO0FBRGMsaUJBQTlCO0FBR0g7QUFDRCxtQkFBT0wsSUFBUDtBQUNIOzs7eUNBQ2U7QUFDWixnQkFBSUEsT0FBTyxFQUFYO0FBQ0EsZ0JBQUlELE9BQU8sSUFBWDtBQUNBLGdCQUFJTyxXQUFXLCtCQUFmO0FBQ0EsZ0JBQUcsQ0FBQyxLQUFLOUIsS0FBVCxFQUFlO0FBQ1h3QixxQkFBS0QsSUFBTCxHQUFZLEtBQVo7QUFDQUMscUJBQUtLLElBQUwsR0FBWSxRQUFaO0FBQ0g7QUFDRCxnQkFBRyxDQUFDLEtBQUs1QixRQUFULEVBQWtCO0FBQ2R1QixxQkFBS0QsSUFBTCxHQUFZLEtBQVo7QUFDQUMscUJBQUtLLElBQUwsR0FBWSxTQUFaO0FBQ0g7QUFDRCxnQkFBRyxDQUFDLEtBQUszQixLQUFULEVBQWU7QUFDWHNCLHFCQUFLRCxJQUFMLEdBQVksS0FBWjtBQUNBQyxxQkFBS0ssSUFBTCxHQUFZLFNBQVo7QUFDSDtBQUNELGdCQUFHLENBQUNDLFNBQVNDLElBQVQsQ0FBYyxLQUFLN0IsS0FBbkIsQ0FBSixFQUE4QjtBQUMxQnNCLHFCQUFLRCxJQUFMLEdBQVksS0FBWjtBQUNBQyxxQkFBS0ssSUFBTCxHQUFZLFVBQVo7QUFDSDtBQUNELG1CQUFPTCxJQUFQO0FBQ0g7Ozt1Q0FDYSxDQUViOzs7d0NBQ2MsQ0FFZDs7OztFQWxGZ0MsZUFBS1EsSTs7a0JBQXJCbEMsTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBKb2JGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iZm9ybSc7XG5pbXBvcnQgU2FsZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9zYWxlZm9ybSc7XG5pbXBvcnQgSG9tZUZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ob21lZm9ybSc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJztcbmltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHRpdGxlIDogJycsIC8vcmVxdWlyZVxuICAgICAgICBzdWJ0aXRsZSA6ICcnLFxuICAgICAgICBwaG9uZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgdHlwZSA6ICdqb2InLCAvL3JlcXVpcmVcbiAgICAgICAgZm9ybWRhdGEgOiBudWxsLCAvL+WQhOS4quihqOWNleeahOS/oeaBr1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiam9iZm9ybVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcInNhbGVmb3JtXCI6e30sXCJob21lZm9ybVwiOnt9fTtcclxuJGV2ZW50cyA9IHtcImpvYmZvcm1cIjp7XCJ2LW9uOmdldEZvcm1cIjpcImdldEZvcm1cIn0sXCJzYWxlZm9ybVwiOntcInYtb246Z2V0Rm9ybVwiOlwiZ2V0Rm9ybVwifSxcImhvbWVmb3JtXCI6e1widi1vbjpnZXRGb3JtXCI6XCJnZXRGb3JtXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGpvYmZvcm0gOiBKb2JGb3JtLFxuICAgICAgICBzYWxlZm9ybSA6IFNhbGVGb3JtLFxuICAgICAgICBob21lZm9ybSA6IEhvbWVGb3JtLFxuICAgICAgICBmb290ZXIgOiBGb290ZXIsXG4gICAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAocGFyYW1zKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZvcm0oZGF0YSl7XG4gICAgICAgICAgICB0aGlzLmZvcm1kYXRhID0gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0KCl7XG4gICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ2ZldGNoJyk7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrRm9ybUluZm8oKS5mbGFnKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZnJvbSBjaGlsZCBmb3JtJyx0aGlzLmZvcm1kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgIH1cbiAgICBjaGVja0Zvcm1JbmZvKCl7XG4gICAgICAgIHZhciBqc29uID0gbnVsbDtcbiAgICAgICAganNvbiA9IHRoaXMuY2hlY2tIZWFkZUluZm8oKTtcbiAgICAgICAgaWYoanNvbi5mbGFnKXtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnam9iJzpcbiAgICAgICAgICAgICAgICAgICAganNvbi5mbGFnID0gdGhpcy5jaGVja0pvYkZyb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2FsZSc6XG4gICAgICAgICAgICAgICAgICAgIGpzb24uZmxhZyA9IHRoaXMuY2hlY2tTYWxlRnJvbSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCFqc29uLmZsYWcpe1xuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBqc29uLmluZm8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9O1xuICAgIGNoZWNrSGVhZGVJbmZvKCl7XG4gICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZTtcbiAgICAgICAgdmFyIHBob25lUmVnID0gL14wezAsMX0xWzM0NTc4XXsxfVswLTldezl9JC9pZztcbiAgICAgICAgaWYoIXRoaXMudGl0bGUpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5qCH6aKY5LiN6IO95Li656m6JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJ0aXRsZSl7XG4gICAgICAgICAgICBqc29uLmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIGpzb24uaW5mbyA9ICflia/moIfpopjkuI3og73kuLrnqbonO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnBob25lKXtcbiAgICAgICAgICAgIGpzb24uZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAganNvbi5pbmZvID0gJ+aJi+acuuWPt+S4jeiDveS4uuepuic7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXBob25lUmVnLnRlc3QodGhpcy5waG9uZSkpe1xuICAgICAgICAgICAganNvbi5mbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBqc29uLmluZm8gPSAn5omL5py65Y+35qC85byP5LiN5q2j56GuJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gICAgY2hlY2tKb2JGcm9tKCl7XG5cbiAgICB9XG4gICAgY2hlY2tTYWxlRnJvbSgpe1xuXG4gICAgfVxufVxuIl19