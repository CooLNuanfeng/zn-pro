'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
            'name': '', //require
            'education': '', //require
            'number': '', //require
            'address': '', //require
            'dutyArr': [''],
            'claimArr': [''],
            'curIndex': 0,
            'companyNumber': ['100人以内', '100-1000人', '1000人以上'],
            'officeIndex': 0,
            'officesJson': [//职位分类
            { 'id': '001', 'name': '餐饮/酒店' }, { 'id': '002', 'name': '销售/客服' }, { 'id': '003', 'name': '物业/安保' }, { 'id': '004', 'name': '教育/培训' }, { 'id': '005', 'name': '行政/人事' }, { 'id': '006', 'name': '超市/零售' }, { 'id': '007', 'name': '美发/按摩' }, { 'id': '008', 'name': '技工/普工' }, { 'id': '009', 'name': '物流/仓储' }, { 'id': '010', 'name': '化工/能源' }, { 'id': '011', 'name': '服装/纺织' }, { 'id': '012', 'name': '电气/机械' }, { 'id': '013', 'name': '建筑/房产' }]
        }, _this.methods = {
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
                // console.log(evt.detail);
                this.officeIndex = evt.detail.value;
                console.log(this.officesJson[this.officeIndex].id);
            }
            // submit(){
            //     console.log(this.dutyArr);
            // }

        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobForm;
}(_wepy2.default.component);

exports.default = JobForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCJtZXRob2RzIiwiYWRkSXRlbSIsInR5cGUiLCJkdXR5QXJyIiwicHVzaCIsImNsYWltQXJyIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJwaWNrZXJDaGFuZ2UiLCJjdXJJbmRleCIsIm9mZmljZUNoYW5nZSIsIm9mZmljZUluZGV4IiwiY29uc29sZSIsImxvZyIsIm9mZmljZXNKc29uIiwiaWQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNILG9CQUFTLEVBRE4sRUFDVTtBQUNiLHlCQUFjLEVBRlgsRUFFZTtBQUNsQixzQkFBVyxFQUhSLEVBR1k7QUFDZix1QkFBVyxFQUpSLEVBSVc7QUFDZCx1QkFBWSxDQUFDLEVBQUQsQ0FMVDtBQU1ILHdCQUFZLENBQUMsRUFBRCxDQU5UO0FBT0gsd0JBQWEsQ0FQVjtBQVFILDZCQUFpQixDQUFDLFFBQUQsRUFBVSxXQUFWLEVBQXNCLFNBQXRCLENBUmQ7QUFTSCwyQkFBZ0IsQ0FUYjtBQVVILDJCQUFnQixDQUFFO0FBQ2QsY0FBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBRFksRUFFWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFGWSxFQUdaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQUhZLEVBSVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBSlksRUFLWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFMWSxFQU1aLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQU5ZLEVBT1osRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBUFksRUFRWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFSWSxFQVNaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVRZLEVBVVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBVlksRUFXWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFYWSxFQVlaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVpZLEVBYVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBYlk7QUFWYixTLFFBMEJQQyxPLEdBQVU7QUFDTkMsbUJBRE0sbUJBQ0VDLElBREYsRUFDTztBQUNULG9CQUFHQSxRQUFRLE1BQVgsRUFBa0I7QUFDZCx5QkFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLEVBQWxCO0FBQ0g7QUFDRCxvQkFBR0YsUUFBUSxPQUFYLEVBQW1CO0FBQ2YseUJBQUtHLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixFQUFuQjtBQUNIO0FBQ0osYUFSSztBQVNORSxxQkFUTSxxQkFTSUosSUFUSixFQVNTSyxLQVRULEVBU2VDLEdBVGYsRUFTbUI7QUFDckIsb0JBQUdOLFFBQVEsTUFBWCxFQUFrQjtBQUNkLHlCQUFLQyxPQUFMLENBQWFJLEtBQWIsSUFBc0JDLElBQUlDLE1BQUosQ0FBV0MsS0FBakM7QUFDSDtBQUNELG9CQUFHUixRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjRSxLQUFkLElBQXVCQyxJQUFJQyxNQUFKLENBQVdDLEtBQWxDO0FBQ0g7QUFDSixhQWhCSztBQWlCTkMsc0JBakJNLHNCQWlCS1QsSUFqQkwsRUFpQlVLLEtBakJWLEVBaUJnQjtBQUNsQixvQkFBR0wsUUFBUSxNQUFYLEVBQWtCO0FBQ2QseUJBQUtDLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkwsS0FBcEIsRUFBMEIsQ0FBMUI7QUFDSDtBQUNELG9CQUFHTCxRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjTyxNQUFkLENBQXFCTCxLQUFyQixFQUEyQixDQUEzQjtBQUNIO0FBQ0osYUF4Qks7QUF5Qk5NLHdCQXpCTSx3QkF5Qk9MLEdBekJQLEVBeUJXO0FBQ2I7QUFDQSxxQkFBS00sUUFBTCxHQUFnQk4sSUFBSUMsTUFBSixDQUFXQyxLQUEzQjtBQUNILGFBNUJLO0FBNkJOSyx3QkE3Qk0sd0JBNkJPUCxHQTdCUCxFQTZCVztBQUNiO0FBQ0EscUJBQUtRLFdBQUwsR0FBbUJSLElBQUlDLE1BQUosQ0FBV0MsS0FBOUI7QUFDQU8sd0JBQVFDLEdBQVIsQ0FBWSxLQUFLQyxXQUFMLENBQWlCLEtBQUtILFdBQXRCLEVBQW1DSSxFQUEvQztBQUNIO0FBQ0Q7QUFDQTtBQUNBOztBQXBDTSxTOzs7O0VBM0J3QixlQUFLQyxTOztrQkFBdEJ2QixPIiwiZmlsZSI6ImpvYmZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICduYW1lJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2VkdWNhdGlvbicgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdudW1iZXInIDogJycsIC8vcmVxdWlyZVxuICAgICAgICAnYWRkcmVzcyc6ICcnLC8vcmVxdWlyZVxuICAgICAgICAnZHV0eUFycicgOiBbJyddLFxuICAgICAgICAnY2xhaW1BcnInOiBbJyddLFxuICAgICAgICAnY3VySW5kZXgnIDogMCxcbiAgICAgICAgJ2NvbXBhbnlOdW1iZXInOiBbJzEwMOS6uuS7peWGhScsJzEwMC0xMDAw5Lq6JywnMTAwMOS6uuS7peS4iiddLFxuICAgICAgICAnb2ZmaWNlSW5kZXgnIDogMCxcbiAgICAgICAgJ29mZmljZXNKc29uJyA6IFsgLy/ogYzkvY3liIbnsbtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon6aSQ6aWuL+mFkuW6lyd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifplIDllK4v5a6i5pyNJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+eJqeS4mi/lronkv50nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5pWZ6IKyL+WfueiurSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNScsJ25hbWUnOifooYzmlL8v5Lq65LqLJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA2JywnbmFtZSc6J+i2heW4gi/pm7bllK4nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDcnLCduYW1lJzon576O5Y+RL+aMieaRqSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwOCcsJ25hbWUnOifmioDlt6Uv5pmu5belJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA5JywnbmFtZSc6J+eJqea1gS/ku5PlgqgnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTAnLCduYW1lJzon5YyW5belL+iDvea6kCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMScsJ25hbWUnOifmnI3oo4Uv57q657uHJ30sXG4gICAgICAgICAgICB7J2lkJzonMDEyJywnbmFtZSc6J+eUteawlC/mnLrmorAnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTMnLCduYW1lJzon5bu6562RL+aIv+S6pyd9XG4gICAgICAgIF0sXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFkZEl0ZW0odHlwZSl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyLnB1c2goJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyLnB1c2goJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpdGVtSW5wdXQodHlwZSxpbmRleCxldnQpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0odHlwZSxpbmRleCl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBpY2tlckNoYW5nZShldnQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0KTtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvZmZpY2VDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2dC5kZXRhaWwpO1xuICAgICAgICAgICAgdGhpcy5vZmZpY2VJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9mZmljZXNKc29uW3RoaXMub2ZmaWNlSW5kZXhdLmlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdWJtaXQoKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuZHV0eUFycik7XG4gICAgICAgIC8vIH1cbiAgICB9XG59XG4iXX0=