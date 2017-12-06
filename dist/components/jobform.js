'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _imgupload = require('./imgupload.js');

var _imgupload2 = _interopRequireDefault(_imgupload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JobForm = function (_wepy$component) {
    _inherits(JobForm, _wepy$component);

    function JobForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, JobForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JobForm.__proto__ || Object.getPrototypeOf(JobForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'jobname': '', //require
            'jobprice': '', //require
            'number': '', //require
            'address': '', //require
            'dutyArr': [''],
            'claimArr': [''],
            'companyName': '', //require 公司名称
            'curIndex': 0, //公司规模索引
            'companyNumber': ['100人以内', '100-1000人', '1000人以上'],
            'companyInfo': '', //公司简介
            'officeIndex': 0,
            'officesJson': [//职位分类
            { 'id': '001', 'name': '餐饮/酒店' }, { 'id': '002', 'name': '销售/客服' }, { 'id': '003', 'name': '物业/安保' }, { 'id': '004', 'name': '教育/培训' }, { 'id': '005', 'name': '行政/人事' }, { 'id': '006', 'name': '超市/零售' }, { 'id': '007', 'name': '美发/按摩' }, { 'id': '008', 'name': '技工/普工' }, { 'id': '009', 'name': '物流/仓储' }, { 'id': '010', 'name': '化工/能源' }, { 'id': '011', 'name': '服装/纺织' }, { 'id': '012', 'name': '电气/机械' }, { 'id': '013', 'name': '建筑/房产' }],
            'eduIndex': 0,
            'eduJson': [//学历分类
            { 'id': '001', 'name': '不限' }, { 'id': '002', 'name': '初/高中以上' }, { 'id': '003', 'name': '专科以上' }, { 'id': '004', 'name': '本科以上' }, { 'id': '005', 'name': '硕士研究生以上' }],
            'uploadImgs': null //上传图片地址
        }, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
        }, _this.methods = {
            jobChange: function jobChange(evt) {
                this.jobname = evt.detail.value;
            },
            priceChange: function priceChange(evt) {
                this.jobprice = evt.detail.value;
            },
            jobNumChange: function jobNumChange(evt) {
                this.number = evt.detail.value;
            },
            addressChange: function addressChange(evt) {
                this.address = evt.detail.value;
            },
            companyNameChange: function companyNameChange(evt) {
                this.companyName = evt.detail.value;
            },
            companyInfoChange: function companyInfoChange(evt) {
                this.companyInfo = evt.detail.value;
            },
            addItem: function addItem(type) {
                if (type == 'duty') {
                    this.dutyArr.push('');
                }
                if (type == 'claim') {
                    this.claimArr.push('');
                }
            },
            itemInput: function itemInput(type, index, evt) {
                if (type == 'duty') {
                    this.dutyArr[index] = evt.detail.value;
                }
                if (type == 'claim') {
                    this.claimArr[index] = evt.detail.value;
                }
            },
            deleteItem: function deleteItem(type, index) {
                if (type == 'duty') {
                    this.dutyArr.splice(index, 1);
                }
                if (type == 'claim') {
                    this.claimArr.splice(index, 1);
                }
            },
            pickerChange: function pickerChange(evt) {
                // console.log(evt);
                this.curIndex = evt.detail.value;
            },
            officeChange: function officeChange(evt) {
                this.officeIndex = evt.detail.value;
                // console.log(this.officesJson[this.officeIndex].id);
            },
            eduChange: function eduChange(evt) {
                this.eduIndex = evt.detail.value;
                // console.log(this.eduJson[this.eduIndex].id);
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            jobFetch: function jobFetch() {
                //组织用户填写数据
                var json = {
                    'jobname': this.jobname, //职位 require
                    'jobprice': this.jobprice, //月薪 require
                    'jobType': this.officesJson[this.officeIndex], //职位类型 require
                    'eduType': this.eduJson[this.eduIndex], //学历类型 require
                    'number': this.number, //招聘人数 require
                    'address': this.address, //地址 require
                    'dutyArr': this.dutyArr, //职责
                    'claimArr': this.claimArr, //要求
                    'companyName': this.companyName, //公司名称 require
                    'companyNumber': this.companyNumber[this.curIndex], //公司人数 require
                    'companyInfo': this.companyInfo, //公司简介
                    'images': this.uploadImgs //公司图片
                };
                this.$emit('getJobForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobForm;
}(_wepy2.default.component);

exports.default = JobForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiam9iQ2hhbmdlIiwiZXZ0Iiwiam9ibmFtZSIsImRldGFpbCIsInZhbHVlIiwicHJpY2VDaGFuZ2UiLCJqb2JwcmljZSIsImpvYk51bUNoYW5nZSIsIm51bWJlciIsImFkZHJlc3NDaGFuZ2UiLCJhZGRyZXNzIiwiY29tcGFueU5hbWVDaGFuZ2UiLCJjb21wYW55TmFtZSIsImNvbXBhbnlJbmZvQ2hhbmdlIiwiY29tcGFueUluZm8iLCJhZGRJdGVtIiwidHlwZSIsImR1dHlBcnIiLCJwdXNoIiwiY2xhaW1BcnIiLCJpdGVtSW5wdXQiLCJpbmRleCIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJwaWNrZXJDaGFuZ2UiLCJjdXJJbmRleCIsIm9mZmljZUNoYW5nZSIsIm9mZmljZUluZGV4IiwiZWR1Q2hhbmdlIiwiZWR1SW5kZXgiLCJ1cGxvYWRDaGFuZ2UiLCJpbWdzIiwidXBsb2FkSW1ncyIsImV2ZW50cyIsImpvYkZldGNoIiwianNvbiIsIm9mZmljZXNKc29uIiwiZWR1SnNvbiIsImNvbXBhbnlOdW1iZXIiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSCx1QkFBWSxFQURULEVBQ2E7QUFDaEIsd0JBQVksRUFGVCxFQUVhO0FBQ2hCLHNCQUFXLEVBSFIsRUFHWTtBQUNmLHVCQUFXLEVBSlIsRUFJVztBQUNkLHVCQUFZLENBQUMsRUFBRCxDQUxUO0FBTUgsd0JBQVksQ0FBQyxFQUFELENBTlQ7QUFPSCwyQkFBZ0IsRUFQYixFQU9pQjtBQUNwQix3QkFBYSxDQVJWLEVBUWM7QUFDakIsNkJBQWlCLENBQUMsUUFBRCxFQUFVLFdBQVYsRUFBc0IsU0FBdEIs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WSxLQUFLakMsT0FEVixFQUNvQjtBQUMzQixnQ0FBYSxLQUFLSSxRQUZYLEVBRXFCO0FBQzVCLCtCQUFZLEtBQUs4QixXQUFMLENBQWlCLEtBQUtULFdBQXRCLENBSEwsRUFHeUM7QUFDaEQsK0JBQVksS0FBS1UsT0FBTCxDQUFhLEtBQUtSLFFBQWxCLENBSkwsRUFJa0M7QUFDekMsOEJBQVcsS0FBS3JCLE1BTFQsRUFLaUI7QUFDeEIsK0JBQVksS0FBS0UsT0FOVixFQU1tQjtBQUMxQiwrQkFBWSxLQUFLTyxPQVBWLEVBT21CO0FBQzFCLGdDQUFhLEtBQUtFLFFBUlgsRUFRcUI7QUFDNUIsbUNBQWdCLEtBQUtQLFdBVGQsRUFTMkI7QUFDbEMscUNBQWtCLEtBQUswQixhQUFMLENBQW1CLEtBQUtiLFFBQXhCLENBVlgsRUFVOEM7QUFDckQsbUNBQWdCLEtBQUtYLFdBWGQsRUFXMkI7QUFDbEMsOEJBQVcsS0FBS2tCLFVBWlQsQ0FZcUI7QUFackIsaUJBQVg7QUFjQSxxQkFBS08sS0FBTCxDQUFXLFlBQVgsRUFBd0JKLElBQXhCO0FBQ0g7QUFqQkksUzs7OztFQTFHd0IsZUFBS0ssUzs7a0JBQXJCL0MsTyIsImZpbGUiOiJqb2Jmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBpbWdVcGxvYWRGb3JtIGZyb20gJy4vaW1ndXBsb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRm9ybSBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdqb2JuYW1lJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2pvYnByaWNlJzogJycsIC8vcmVxdWlyZVxuICAgICAgICAnbnVtYmVyJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2FkZHJlc3MnOiAnJywvL3JlcXVpcmVcbiAgICAgICAgJ2R1dHlBcnInIDogWycnXSxcbiAgICAgICAgJ2NsYWltQXJyJzogWycnXSxcbiAgICAgICAgJ2NvbXBhbnlOYW1lJyA6ICcnLCAvL3JlcXVpcmUg5YWs5Y+45ZCN56ewXG4gICAgICAgICdjdXJJbmRleCcgOiAwLCAgLy/lhazlj7jop4TmqKHntKLlvJVcbiAgICAgICAgJ2NvbXBhbnlOdW1iZXInOiBbJzEwMOS6uuS7peWGhScsJzEwMC0xMDAw5Lq6JywnMTAwMOS6uuS7peS4iiddLFxuICAgICAgICAnY29tcGFueUluZm8nIDogJycsIC8v5YWs5Y+4566A5LuLXG4gICAgICAgICdvZmZpY2VJbmRleCcgOiAwLFxuICAgICAgICAnb2ZmaWNlc0pzb24nIDogWyAvL+iBjOS9jeWIhuexu1xuICAgICAgICAgICAgeydpZCc6JzAwMScsJ25hbWUnOifppJDppa4v6YWS5bqXJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+mUgOWUri/lrqLmnI0nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDMnLCduYW1lJzon54mp5LiaL+WuieS/nSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNCcsJ25hbWUnOifmlZnogrIv5Z+56K6tJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA1JywnbmFtZSc6J+ihjOaUvy/kurrkuosnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDYnLCduYW1lJzon6LaF5biCL+mbtuWUrid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNycsJ25hbWUnOifnvo7lj5Ev5oyJ5pGpJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA4JywnbmFtZSc6J+aKgOW3pS/mma7lt6UnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDknLCduYW1lJzon54mp5rWBL+S7k+WCqCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMCcsJ25hbWUnOifljJblt6Uv6IO95rqQJ30sXG4gICAgICAgICAgICB7J2lkJzonMDExJywnbmFtZSc6J+acjeijhS/nurrnu4cnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTInLCduYW1lJzon55S15rCUL+acuuaisCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMycsJ25hbWUnOiflu7rnrZEv5oi/5LqnJ31cbiAgICAgICAgXSxcbiAgICAgICAgJ2VkdUluZGV4JyA6IDAsXG4gICAgICAgICdlZHVKc29uJyA6IFsgLy/lrabljobliIbnsbtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon5LiN6ZmQJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+WInS/pq5jkuK3ku6XkuIonfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDMnLCduYW1lJzon5LiT56eR5Lul5LiKJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA0JywnbmFtZSc6J+acrOenkeS7peS4iid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNScsJ25hbWUnOifnoZXlo6vnoJTnqbbnlJ/ku6XkuIonfSxcbiAgICAgICAgXSxcbiAgICAgICAgJ3VwbG9hZEltZ3MnIDogbnVsbCwgLy/kuIrkvKDlm77niYflnLDlnYBcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInVwbG9hZGZvcm1cIjp7XCJ2LW9uOnVwbG9hZEVuZFwiOlwidXBsb2FkQ2hhbmdlXCIsXCJ2LW9uOnVwbG9hZERlbFwiOlwidXBsb2FkQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICd1cGxvYWRmb3JtJyA6IGltZ1VwbG9hZEZvcm1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGpvYkNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5qb2JuYW1lID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJpY2VDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuam9icHJpY2UgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBqb2JOdW1DaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkcmVzc0NoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGFueU5hbWVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuY29tcGFueU5hbWUgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBjb21wYW55SW5mb0NoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5jb21wYW55SW5mbyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBhZGRJdGVtKHR5cGUpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFyci5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFyci5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KHR5cGUsaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKHR5cGUsaW5kZXgpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwaWNrZXJDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2dCk7XG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmaWNlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLm9mZmljZUluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMub2ZmaWNlc0pzb25bdGhpcy5vZmZpY2VJbmRleF0uaWQpO1xuICAgICAgICB9LFxuICAgICAgICBlZHVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuZWR1SW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5lZHVKc29uW3RoaXMuZWR1SW5kZXhdLmlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkQ2hhbmdlKGltZ3Mpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwbG9hZCBjaGFuZ2UnKTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkSW1ncyA9IGltZ3M7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgam9iRmV0Y2goKXsgLy/nu4Tnu4fnlKjmiLfloavlhpnmlbDmja5cbiAgICAgICAgICAgIHZhciBqc29uID0ge1xuICAgICAgICAgICAgICAgICdqb2JuYW1lJyA6IHRoaXMuam9ibmFtZSwgIC8v6IGM5L2NIHJlcXVpcmVcbiAgICAgICAgICAgICAgICAnam9icHJpY2UnIDogdGhpcy5qb2JwcmljZSwgLy/mnIjolqogcmVxdWlyZVxuICAgICAgICAgICAgICAgICdqb2JUeXBlJyA6IHRoaXMub2ZmaWNlc0pzb25bdGhpcy5vZmZpY2VJbmRleF0sIC8v6IGM5L2N57G75Z6LIHJlcXVpcmVcbiAgICAgICAgICAgICAgICAnZWR1VHlwZScgOiB0aGlzLmVkdUpzb25bdGhpcy5lZHVJbmRleF0sIC8v5a2m5Y6G57G75Z6LIHJlcXVpcmVcbiAgICAgICAgICAgICAgICAnbnVtYmVyJyA6IHRoaXMubnVtYmVyLCAvL+aLm+iBmOS6uuaVsCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnIDogdGhpcy5hZGRyZXNzLCAvL+WcsOWdgCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2R1dHlBcnInIDogdGhpcy5kdXR5QXJyLCAvL+iBjOi0o1xuICAgICAgICAgICAgICAgICdjbGFpbUFycicgOiB0aGlzLmNsYWltQXJyLCAvL+imgeaxglxuICAgICAgICAgICAgICAgICdjb21wYW55TmFtZScgOiB0aGlzLmNvbXBhbnlOYW1lLCAvL+WFrOWPuOWQjeensCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2NvbXBhbnlOdW1iZXInIDogdGhpcy5jb21wYW55TnVtYmVyW3RoaXMuY3VySW5kZXhdLCAvL+WFrOWPuOS6uuaVsCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2NvbXBhbnlJbmZvJyA6IHRoaXMuY29tcGFueUluZm8sIC8v5YWs5Y+4566A5LuLXG4gICAgICAgICAgICAgICAgJ2ltYWdlcycgOiB0aGlzLnVwbG9hZEltZ3MgIC8v5YWs5Y+45Zu+54mHXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Sm9iRm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19