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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCJtZXRob2RzIiwiYWRkSXRlbSIsInR5cGUiLCJkdXR5QXJyIiwicHVzaCIsImNsYWltQXJyIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJwaWNrZXJDaGFuZ2UiLCJjdXJJbmRleCIsIm9mZmljZUNoYW5nZSIsIm9mZmljZUluZGV4IiwiY29uc29sZSIsImxvZyIsIm9mZmljZXNKc29uIiwiaWQiLCJldmVudHMiLCJmZXRjaCIsImpzb24iLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gsb0JBQVMsRUFETixFQUNVO0FBQ2IseUJBQWMsRUFGWCxFQUVlO0FBQ2xCLHNCQUFXLEVBSFIsRUFHWTtBQUNmLHVCQUFXLEVBSlIsRUFJVztBQUNkLHVCQUFZLENBQUMsRUFBRCxDQUxUO0FBTUgsd0JBQVksQ0FBQyxFQUFELENBTlQ7QUFPSCx3QkFBYSxDQVBWO0FBUUgsNkJBQWlCLENBQUMsUUFBRCxFQUFVLFdBQVYsRUFBc0IsU0FBdEIsQ0FSZDtBQVNILDJCQUFnQixDQVRiO0FBVUgsMkJBQWdCLENBQUU7QUFDZCxjQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFEWSxFQUVaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQUZZLEVBR1osRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBSFksRUFJWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFKWSxFQUtaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQUxZLEVBTVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBTlksRUFPWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFQWSxFQVFaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVJZLEVBU1osRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBVFksRUFVWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFWWSxFQVdaLEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxPQUFuQixFQVhZLEVBWVosRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE9BQW5CLEVBWlksRUFhWixFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sT0FBbkIsRUFiWTtBQVZiLFMsUUEwQlBDLE8sR0FBVTtBQUNOQyxtQkFETSxtQkFDRUMsSUFERixFQUNPO0FBQ1Qsb0JBQUdBLFFBQVEsTUFBWCxFQUFrQjtBQUNkLHlCQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsRUFBbEI7QUFDSDtBQUNELG9CQUFHRixRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjRCxJQUFkLENBQW1CLEVBQW5CO0FBQ0g7QUFDSixhQVJLO0FBU05FLHFCQVRNLHFCQVNJSixJQVRKLEVBU1NLLEtBVFQsRUFTZUMsR0FUZixFQVNtQjtBQUNyQixvQkFBR04sUUFBUSxNQUFYLEVBQWtCO0FBQ2QseUJBQUtDLE9BQUwsQ0FBYUksS0FBYixJQUFzQkMsSUFBSUMsTUFBSixDQUFXQyxLQUFqQztBQUNIO0FBQ0Qsb0JBQUdSLFFBQVEsT0FBWCxFQUFtQjtBQUNmLHlCQUFLRyxRQUFMLENBQWNFLEtBQWQsSUFBdUJDLElBQUlDLE1BQUosQ0FBV0MsS0FBbEM7QUFDSDtBQUNKLGFBaEJLO0FBaUJOQyxzQkFqQk0sc0JBaUJLVCxJQWpCTCxFQWlCVUssS0FqQlYsRUFpQmdCO0FBQ2xCLG9CQUFHTCxRQUFRLE1BQVgsRUFBa0I7QUFDZCx5QkFBS0MsT0FBTCxDQUFhUyxNQUFiLENBQW9CTCxLQUFwQixFQUEwQixDQUExQjtBQUNIO0FBQ0Qsb0JBQUdMLFFBQVEsT0FBWCxFQUFtQjtBQUNmLHlCQUFLRyxRQUFMLENBQWNPLE1BQWQsQ0FBcUJMLEtBQXJCLEVBQTJCLENBQTNCO0FBQ0g7QUFDSixhQXhCSztBQXlCTk0sd0JBekJNLHdCQXlCT0wsR0F6QlAsRUF5Qlc7QUFDYjtBQUNBLHFCQUFLTSxRQUFMLEdBQWdCTixJQUFJQyxNQUFKLENBQVdDLEtBQTNCO0FBQ0gsYUE1Qks7QUE2Qk5LLHdCQTdCTSx3QkE2Qk9QLEdBN0JQLEVBNkJXO0FBQ2I7QUFDQSxxQkFBS1EsV0FBTCxHQUFtQlIsSUFBSUMsTUFBSixDQUFXQyxLQUE5QjtBQUNBTyx3QkFBUUMsR0FBUixDQUFZLEtBQUtDLFdBQUwsQ0FBaUIsS0FBS0gsV0FBdEIsRUFBbUNJLEVBQS9DO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7O0FBcENNLFMsUUFzQ1ZDLE0sR0FBUztBQUNMQyxpQkFESyxtQkFDRTtBQUFFO0FBQ0wsb0JBQUlDLE9BQU8sRUFBWDtBQUNBLHFCQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFxQkQsSUFBckI7QUFDSDtBQUpJLFM7Ozs7RUFqRXlCLGVBQUtFLFM7O2tCQUF0QjNCLE8iLCJmaWxlIjoiam9iZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYkZvcm0gIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgJ25hbWUnIDogJycsIC8vcmVxdWlyZVxuICAgICAgICAnZWR1Y2F0aW9uJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ251bWJlcicgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdhZGRyZXNzJzogJycsLy9yZXF1aXJlXG4gICAgICAgICdkdXR5QXJyJyA6IFsnJ10sXG4gICAgICAgICdjbGFpbUFycic6IFsnJ10sXG4gICAgICAgICdjdXJJbmRleCcgOiAwLFxuICAgICAgICAnY29tcGFueU51bWJlcic6IFsnMTAw5Lq65Lul5YaFJywnMTAwLTEwMDDkuronLCcxMDAw5Lq65Lul5LiKJ10sXG4gICAgICAgICdvZmZpY2VJbmRleCcgOiAwLFxuICAgICAgICAnb2ZmaWNlc0pzb24nIDogWyAvL+iBjOS9jeWIhuexu1xuICAgICAgICAgICAgeydpZCc6JzAwMScsJ25hbWUnOifppJDppa4v6YWS5bqXJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+mUgOWUri/lrqLmnI0nfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDMnLCduYW1lJzon54mp5LiaL+WuieS/nSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNCcsJ25hbWUnOifmlZnogrIv5Z+56K6tJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA1JywnbmFtZSc6J+ihjOaUvy/kurrkuosnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDYnLCduYW1lJzon6LaF5biCL+mbtuWUrid9LFxuICAgICAgICAgICAgeydpZCc6JzAwNycsJ25hbWUnOifnvo7lj5Ev5oyJ5pGpJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA4JywnbmFtZSc6J+aKgOW3pS/mma7lt6UnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDknLCduYW1lJzon54mp5rWBL+S7k+WCqCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMCcsJ25hbWUnOifljJblt6Uv6IO95rqQJ30sXG4gICAgICAgICAgICB7J2lkJzonMDExJywnbmFtZSc6J+acjeijhS/nurrnu4cnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMTInLCduYW1lJzon55S15rCUL+acuuaisCd9LFxuICAgICAgICAgICAgeydpZCc6JzAxMycsJ25hbWUnOiflu7rnrZEv5oi/5LqnJ31cbiAgICAgICAgXSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYWRkSXRlbSh0eXBlKXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnIucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnIucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dCh0eXBlLGluZGV4LGV2dCl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlSXRlbSh0eXBlLGluZGV4KXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGlja2VyQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQpO1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZmljZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZ0LmRldGFpbCk7XG4gICAgICAgICAgICB0aGlzLm9mZmljZUluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub2ZmaWNlc0pzb25bdGhpcy5vZmZpY2VJbmRleF0uaWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN1Ym1pdCgpe1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5kdXR5QXJyKTtcbiAgICAgICAgLy8gfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBmZXRjaCgpeyAvL+e7hOe7h+eUqOaIt+Whq+WGmeaVsOaNrlxuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==