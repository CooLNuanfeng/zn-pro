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
            fetch: function fetch() {
                //组织用户填写数据
                var json = {
                    'jobname': this.jobname, //职位 require
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiam9iQ2hhbmdlIiwiZXZ0Iiwiam9ibmFtZSIsImRldGFpbCIsInZhbHVlIiwiam9iTnVtQ2hhbmdlIiwibnVtYmVyIiwiYWRkcmVzc0NoYW5nZSIsImFkZHJlc3MiLCJjb21wYW55TmFtZUNoYW5nZSIsImNvbXBhbnlOYW1lIiwiY29tcGFueUluZm9DaGFuZ2UiLCJjb21wYW55SW5mbyIsImFkZEl0ZW0iLCJ0eXBlIiwiZHV0eUFyciIsInB1c2giLCJjbGFpbUFyciIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsInBpY2tlckNoYW5nZSIsImN1ckluZGV4Iiwib2ZmaWNlQ2hhbmdlIiwib2ZmaWNlSW5kZXgiLCJlZHVDaGFuZ2UiLCJlZHVJbmRleCIsInVwbG9hZENoYW5nZSIsImltZ3MiLCJ1cGxvYWRJbWdzIiwiZXZlbnRzIiwiZmV0Y2giLCJqc29uIiwib2ZmaWNlc0pzb24iLCJlZHVKc29uIiwiY29tcGFueU51bWJlciIsIiRlbWl0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNILHVCQUFZLEVBRFQsRUFDYTtBQUNoQixzQkFBVyxFQUZSLEVBRVk7QUFDZix1QkFBVyxFQUhSLEVBR1c7QUFDZCx1QkFBWSxDQUFDLEVBQUQsQ0FKVDtBQUtILHdCQUFZLENBQUMsRUFBRCxDQUxUO0FBTUgsMkJBQWdCLEVBTmIsRUFNaUI7QUFDcEIsd0JBQWEsQ0FQVixFQU9jO0FBQ2pCLDZCQUFpQixDQUFDLFFBQUQsRUFBVSxXQUFWLEVBQXNCLFNBQXRCLENBUmQ7QUFTSCwyQkFBZ0IsRUFUYixFQVNpQjtBQUNwQiwyQkFBZ0IsQ0FWYjtBQVdI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LE1BSlQsRUFJaUI7QUFDeEIsK0JBQVksS0FBS0UsT0FMVixFQUttQjtBQUMxQiwrQkFBWSxLQUFLTyxPQU5WLEVBTW1CO0FBQzFCLGdDQUFhLEtBQUtFLFFBUFgsRUFPcUI7QUFDNUIsbUNBQWdCLEtBQUtQLFdBUmQsRUFRMkI7QUFDbEMscUNBQWtCLEtBQUswQixhQUFMLENBQW1CLEtBQUtiLFFBQXhCLENBVFgsRUFTOEM7QUFDckQsbUNBQWdCLEtBQUtYLFdBVmQsRUFVMkI7QUFDbEMsOEJBQVcsS0FBS2tCLFVBWFQsQ0FXcUI7QUFYckIsaUJBQVg7QUFhQSxxQkFBS08sS0FBTCxDQUFXLFlBQVgsRUFBd0JKLElBQXhCO0FBQ0g7QUFoQkksUzs7OztFQXRHd0IsZUFBS0ssUzs7a0JBQXJCN0MsTyIsImZpbGUiOiJqb2Jmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBpbWdVcGxvYWRGb3JtIGZyb20gJy4vaW1ndXBsb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRm9ybSBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICdqb2JuYW1lJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ251bWJlcicgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdhZGRyZXNzJzogJycsLy9yZXF1aXJlXG4gICAgICAgICdkdXR5QXJyJyA6IFsnJ10sXG4gICAgICAgICdjbGFpbUFycic6IFsnJ10sXG4gICAgICAgICdjb21wYW55TmFtZScgOiAnJywgLy9yZXF1aXJlIOWFrOWPuOWQjeensFxuICAgICAgICAnY3VySW5kZXgnIDogMCwgIC8v5YWs5Y+46KeE5qih57Si5byVXG4gICAgICAgICdjb21wYW55TnVtYmVyJzogWycxMDDkurrku6XlhoUnLCcxMDAtMTAwMOS6uicsJzEwMDDkurrku6XkuIonXSxcbiAgICAgICAgJ2NvbXBhbnlJbmZvJyA6ICcnLCAvL+WFrOWPuOeugOS7i1xuICAgICAgICAnb2ZmaWNlSW5kZXgnIDogMCxcbiAgICAgICAgJ29mZmljZXNKc29uJyA6IFsgLy/ogYzkvY3liIbnsbtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon6aSQ6aWuL+mFkuW6lyd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifplIDllK4v5a6i5pyNJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+eJqeS4mi/lronkv50nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5pWZ6IKyL+WfueiurSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNScsJ25hbWUnOifooYzmlL8v5Lq65LqLJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA2JywnbmFtZSc6J+i2heW4gi/pm7bllK4nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDcnLCduYW1lJzon576O5Y+RL+aMieaRqSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwOCcsJ25hbWUnOifmioDlt6Uv5pmu5belJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA5JywnbmFtZSc6J+eJqea1gS/ku5PlgqgnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTAnLCduYW1lJzon5YyW5belL+iDvea6kCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMScsJ25hbWUnOifmnI3oo4Uv57q657uHJ30sXG4gICAgICAgICAgICB7J2lkJzonMDEyJywnbmFtZSc6J+eUteawlC/mnLrmorAnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTMnLCduYW1lJzon5bu6562RL+aIv+S6pyd9XG4gICAgICAgIF0sXG4gICAgICAgICdlZHVJbmRleCcgOiAwLFxuICAgICAgICAnZWR1SnNvbicgOiBbIC8v5a2m5Y6G5YiG57G7XG4gICAgICAgICAgICB7J2lkJzonMDAxJywnbmFtZSc6J+S4jemZkCd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifliJ0v6auY5Lit5Lul5LiKJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+S4k+enkeS7peS4iid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNCcsJ25hbWUnOifmnKznp5Hku6XkuIonfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDUnLCduYW1lJzon56GV5aOr56CU56m255Sf5Lul5LiKJ30sXG4gICAgICAgIF0sXG4gICAgICAgICd1cGxvYWRJbWdzJyA6IG51bGwsIC8v5LiK5Lyg5Zu+54mH5Zyw5Z2AXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widXBsb2FkZm9ybVwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1widi1vbjp1cGxvYWRFbmRcIjpcInVwbG9hZENoYW5nZVwiLFwidi1vbjp1cGxvYWREZWxcIjpcInVwbG9hZENoYW5nZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICAndXBsb2FkZm9ybScgOiBpbWdVcGxvYWRGb3JtXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBqb2JDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuam9ibmFtZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGpvYk51bUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBjb21wYW55TmFtZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5jb21wYW55TmFtZSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBhbnlJbmZvQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlJbmZvID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIGFkZEl0ZW0odHlwZSl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyLnB1c2goJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyLnB1c2goJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQodHlwZSxpbmRleCxldnQpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0odHlwZSxpbmRleCl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBpY2tlckNoYW5nZShldnQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0KTtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvZmZpY2VDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMub2ZmaWNlSW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vZmZpY2VzSnNvblt0aGlzLm9mZmljZUluZGV4XS5pZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVkdUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy5lZHVJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmVkdUpzb25bdGhpcy5lZHVJbmRleF0uaWQpO1xuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRDaGFuZ2UoaW1ncyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBsb2FkIGNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRJbWdzID0gaW1ncztcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpeyAvL+e7hOe7h+eUqOaIt+Whq+WGmeaVsOaNrlxuICAgICAgICAgICAgdmFyIGpzb24gPSB7XG4gICAgICAgICAgICAgICAgJ2pvYm5hbWUnIDogdGhpcy5qb2JuYW1lLCAgLy/ogYzkvY0gcmVxdWlyZVxuICAgICAgICAgICAgICAgICdqb2JUeXBlJyA6IHRoaXMub2ZmaWNlc0pzb25bdGhpcy5vZmZpY2VJbmRleF0sIC8v6IGM5L2N57G75Z6LIHJlcXVpcmVcbiAgICAgICAgICAgICAgICAnZWR1VHlwZScgOiB0aGlzLmVkdUpzb25bdGhpcy5lZHVJbmRleF0sIC8v5a2m5Y6G57G75Z6LIHJlcXVpcmVcbiAgICAgICAgICAgICAgICAnbnVtYmVyJyA6IHRoaXMubnVtYmVyLCAvL+aLm+iBmOS6uuaVsCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3MnIDogdGhpcy5hZGRyZXNzLCAvL+WcsOWdgCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2R1dHlBcnInIDogdGhpcy5kdXR5QXJyLCAvL+iBjOi0o1xuICAgICAgICAgICAgICAgICdjbGFpbUFycicgOiB0aGlzLmNsYWltQXJyLCAvL+imgeaxglxuICAgICAgICAgICAgICAgICdjb21wYW55TmFtZScgOiB0aGlzLmNvbXBhbnlOYW1lLCAvL+WFrOWPuOWQjeensCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2NvbXBhbnlOdW1iZXInIDogdGhpcy5jb21wYW55TnVtYmVyW3RoaXMuY3VySW5kZXhdLCAvL+WFrOWPuOS6uuaVsCByZXF1aXJlXG4gICAgICAgICAgICAgICAgJ2NvbXBhbnlJbmZvJyA6IHRoaXMuY29tcGFueUluZm8sIC8v5YWs5Y+4566A5LuLXG4gICAgICAgICAgICAgICAgJ2ltYWdlcycgOiB0aGlzLnVwbG9hZEltZ3MgIC8v5YWs5Y+45Zu+54mHXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Sm9iRm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19