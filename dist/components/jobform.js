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
        }, _this.components = {
            'uploadform': _imgupload2.default
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

        }, _this.events = {
            fetch: function fetch() {
                //组织用户填写数据
                var json = {};
                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobForm;
}(_wepy2.default.component);

exports.default = JobForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImFkZEl0ZW0iLCJ0eXBlIiwiZHV0eUFyciIsInB1c2giLCJjbGFpbUFyciIsIml0ZW1JbnB1dCIsImluZGV4IiwiZXZ0IiwiZGV0YWlsIiwidmFsdWUiLCJkZWxldGVJdGVtIiwic3BsaWNlIiwicGlja2VyQ2hhbmdlIiwiY3VySW5kZXgiLCJvZmZpY2VDaGFuZ2UiLCJvZmZpY2VJbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvZmZpY2VzSnNvbiIsImlkIiwiZXZlbnRzIiwiZmV0Y2giLCJqc29uIiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gsb0JBQVMsRUFETixFQUNVO0FBQ2IseUJBQWMsRUFGWCxFQUVlO0FBQ2xCLHNCQUFXLEVBSFIsRUFHWTtBQUNmLHVCQUFXLEVBSlIsRUFJVztBQUNkLHVCQUFZLENBQUMsRUFBRCxDQUxUO0FBTUgsd0JBQVksQ0FBQyxFQUFELENBTlQ7QUFPSCx3QkFBYSxDQVBWO0FBUUgsNkJBQWlCLENBQUMsUUFBRCxFQUFVLFdBQVYsRUFBc0IsU0FBdEIsQ0FSZDtBQVNILDJCQUFnQixDQVRiO0FBVUgsMkJBQWdCLENBQUU7QUFDZCxjQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFEWSxFQUVaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQUZZLEVBR1osRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBSFksRUFJWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFKWSxFQUtaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQUxZLEVBTVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBTlksRUFPWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFQWSxFQVFaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVJZLEVBU1osRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBVFksRUFVWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFWWSxFQVdaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVhZLEVBWVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBWlksRUFhWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFiWTtBQVZiLFMsUUEwQlBDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQUdiQyxPLEdBQVU7QUFDTkMsbUJBRE0sbUJBQ0VDLElBREYsRUFDTztBQUNULG9CQUFHQSxRQUFRLE1BQVgsRUFBa0I7QUFDZCx5QkFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLEVBQWxCO0FBQ0g7QUFDRCxvQkFBR0YsUUFBUSxPQUFYLEVBQW1CO0FBQ2YseUJBQUtHLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixFQUFuQjtBQUNIO0FBQ0osYUFSSztBQVNORSxxQkFUTSxxQkFTSUosSUFUSixFQVNTSyxLQVRULEVBU2VDLEdBVGYsRUFTbUI7QUFDckIsb0JBQUdOLFFBQVEsTUFBWCxFQUFrQjtBQUNkLHlCQUFLQyxPQUFMLENBQWFJLEtBQWIsSUFBc0JDLElBQUlDLE1BQUosQ0FBV0MsS0FBakM7QUFDSDtBQUNELG9CQUFHUixRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjRSxLQUFkLElBQXVCQyxJQUFJQyxNQUFKLENBQVdDLEtBQWxDO0FBQ0g7QUFDSixhQWhCSztBQWlCTkMsc0JBakJNLHNCQWlCS1QsSUFqQkwsRUFpQlVLLEtBakJWLEVBaUJnQjtBQUNsQixvQkFBR0wsUUFBUSxNQUFYLEVBQWtCO0FBQ2QseUJBQUtDLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkwsS0FBcEIsRUFBMEIsQ0FBMUI7QUFDSDtBQUNELG9CQUFHTCxRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjTyxNQUFkLENBQXFCTCxLQUFyQixFQUEyQixDQUEzQjtBQUNIO0FBQ0osYUF4Qks7QUF5Qk5NLHdCQXpCTSx3QkF5Qk9MLEdBekJQLEVBeUJXO0FBQ2I7QUFDQSxxQkFBS00sUUFBTCxHQUFnQk4sSUFBSUMsTUFBSixDQUFXQyxLQUEzQjtBQUNILGFBNUJLO0FBNkJOSyx3QkE3Qk0sd0JBNkJPUCxHQTdCUCxFQTZCVztBQUNiO0FBQ0EscUJBQUtRLFdBQUwsR0FBbUJSLElBQUlDLE1BQUosQ0FBV0MsS0FBOUI7QUFDQU8sd0JBQVFDLEdBQVIsQ0FBWSxLQUFLQyxXQUFMLENBQWlCLEtBQUtILFdBQXRCLEVBQW1DSSxFQUEvQztBQUNIO0FBQ0Q7QUFDQTtBQUNBOztBQXBDTSxTLFFBc0NWQyxNLEdBQVM7QUFDTEMsaUJBREssbUJBQ0U7QUFBRTtBQUNMLG9CQUFJQyxPQUFPLEVBQVg7QUFDQSxxQkFBS0MsS0FBTCxDQUFXLFNBQVgsRUFBcUJELElBQXJCO0FBQ0g7QUFKSSxTOzs7O0VBcEV5QixlQUFLRSxTOztrQkFBdEI1QixPIiwiZmlsZSI6ImpvYmZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGltZ1VwbG9hZEZvcm0gZnJvbSAnLi9pbWd1cGxvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICduYW1lJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2VkdWNhdGlvbicgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdudW1iZXInIDogJycsIC8vcmVxdWlyZVxuICAgICAgICAnYWRkcmVzcyc6ICcnLC8vcmVxdWlyZVxuICAgICAgICAnZHV0eUFycicgOiBbJyddLFxuICAgICAgICAnY2xhaW1BcnInOiBbJyddLFxuICAgICAgICAnY3VySW5kZXgnIDogMCxcbiAgICAgICAgJ2NvbXBhbnlOdW1iZXInOiBbJzEwMOS6uuS7peWGhScsJzEwMC0xMDAw5Lq6JywnMTAwMOS6uuS7peS4iiddLFxuICAgICAgICAnb2ZmaWNlSW5kZXgnIDogMCxcbiAgICAgICAgJ29mZmljZXNKc29uJyA6IFsgLy/ogYzkvY3liIbnsbtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon6aSQ6aWuL+mFkuW6lyd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifplIDllK4v5a6i5pyNJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAzJywnbmFtZSc6J+eJqeS4mi/lronkv50nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5pWZ6IKyL+WfueiurSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNScsJ25hbWUnOifooYzmlL8v5Lq65LqLJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA2JywnbmFtZSc6J+i2heW4gi/pm7bllK4nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDcnLCduYW1lJzon576O5Y+RL+aMieaRqSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwOCcsJ25hbWUnOifmioDlt6Uv5pmu5belJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA5JywnbmFtZSc6J+eJqea1gS/ku5PlgqgnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTAnLCduYW1lJzon5YyW5belL+iDvea6kCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMScsJ25hbWUnOifmnI3oo4Uv57q657uHJ30sXG4gICAgICAgICAgICB7J2lkJzonMDEyJywnbmFtZSc6J+eUteawlC/mnLrmorAnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTMnLCduYW1lJzon5bu6562RL+aIv+S6pyd9XG4gICAgICAgIF0sXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICAndXBsb2FkZm9ybScgOiBpbWdVcGxvYWRGb3JtXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBhZGRJdGVtKHR5cGUpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFyci5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFyci5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KHR5cGUsaW5kZXgsZXZ0KXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NsYWltJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKHR5cGUsaW5kZXgpe1xuICAgICAgICAgICAgaWYodHlwZSA9PSAnZHV0eScpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHV0eUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwaWNrZXJDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2dCk7XG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmaWNlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQuZGV0YWlsKTtcbiAgICAgICAgICAgIHRoaXMub2ZmaWNlSW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5vZmZpY2VzSnNvblt0aGlzLm9mZmljZUluZGV4XS5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VibWl0KCl7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLmR1dHlBcnIpO1xuICAgICAgICAvLyB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICAgIGZldGNoKCl7IC8v57uE57uH55So5oi35aGr5YaZ5pWw5o2uXG4gICAgICAgICAgICB2YXIganNvbiA9IHt9O1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZ2V0Rm9ybScsanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19