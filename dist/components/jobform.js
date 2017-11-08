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
            'companyNumber': ['100人以内', '100-1000人', '1000人以上']
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
                console.log(evt);
                this.curIndex = evt.detail.value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobForm;
}(_wepy2.default.component);

exports.default = JobForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCJtZXRob2RzIiwiYWRkSXRlbSIsInR5cGUiLCJkdXR5QXJyIiwicHVzaCIsImNsYWltQXJyIiwiaXRlbUlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJwaWNrZXJDaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiY3VySW5kZXgiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNILG9CQUFTLEVBRE4sRUFDVTtBQUNiLHlCQUFjLEVBRlgsRUFFZTtBQUNsQixzQkFBVyxFQUhSLEVBR1k7QUFDZix1QkFBVyxFQUpSLEVBSVc7QUFDZCx1QkFBWSxDQUFDLEVBQUQsQ0FMVDtBQU1ILHdCQUFZLENBQUMsRUFBRCxDQU5UO0FBT0gsd0JBQWEsQ0FQVjtBQVFILDZCQUFpQixDQUFDLFFBQUQsRUFBVSxXQUFWLEVBQXNCLFNBQXRCO0FBUmQsUyxRQVVQQyxPLEdBQVU7QUFDTkMsbUJBRE0sbUJBQ0VDLElBREYsRUFDTztBQUNULG9CQUFHQSxRQUFRLE1BQVgsRUFBa0I7QUFDZCx5QkFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLEVBQWxCO0FBQ0g7QUFDRCxvQkFBR0YsUUFBUSxPQUFYLEVBQW1CO0FBQ2YseUJBQUtHLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixFQUFuQjtBQUNIO0FBQ0osYUFSSztBQVNORSxxQkFUTSxxQkFTSUosSUFUSixFQVNTSyxLQVRULEVBU2VDLEdBVGYsRUFTbUI7QUFDckIsb0JBQUdOLFFBQVEsTUFBWCxFQUFrQjtBQUNkLHlCQUFLQyxPQUFMLENBQWFJLEtBQWIsSUFBc0JDLElBQUlDLE1BQUosQ0FBV0MsS0FBakM7QUFDSDtBQUNELG9CQUFHUixRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjRSxLQUFkLElBQXVCQyxJQUFJQyxNQUFKLENBQVdDLEtBQWxDO0FBQ0g7QUFDSixhQWhCSztBQWlCTkMsc0JBakJNLHNCQWlCS1QsSUFqQkwsRUFpQlVLLEtBakJWLEVBaUJnQjtBQUNsQixvQkFBR0wsUUFBUSxNQUFYLEVBQWtCO0FBQ2QseUJBQUtDLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkwsS0FBcEIsRUFBMEIsQ0FBMUI7QUFDSDtBQUNELG9CQUFHTCxRQUFRLE9BQVgsRUFBbUI7QUFDZix5QkFBS0csUUFBTCxDQUFjTyxNQUFkLENBQXFCTCxLQUFyQixFQUEyQixDQUEzQjtBQUNIO0FBQ0osYUF4Qks7QUF5Qk5NLHdCQXpCTSx3QkF5Qk9MLEdBekJQLEVBeUJXO0FBQ2JNLHdCQUFRQyxHQUFSLENBQVlQLEdBQVo7QUFDQSxxQkFBS1EsUUFBTCxHQUFnQlIsSUFBSUMsTUFBSixDQUFXQyxLQUEzQjtBQUNIO0FBNUJLLFM7Ozs7RUFYd0IsZUFBS08sUzs7a0JBQXRCbkIsTyIsImZpbGUiOiJqb2Jmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRm9ybSAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgICBkYXRhID0ge1xuICAgICAgICAnbmFtZScgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdlZHVjYXRpb24nIDogJycsIC8vcmVxdWlyZVxuICAgICAgICAnbnVtYmVyJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2FkZHJlc3MnOiAnJywvL3JlcXVpcmVcbiAgICAgICAgJ2R1dHlBcnInIDogWycnXSxcbiAgICAgICAgJ2NsYWltQXJyJzogWycnXSxcbiAgICAgICAgJ2N1ckluZGV4JyA6IDAsXG4gICAgICAgICdjb21wYW55TnVtYmVyJzogWycxMDDkurrku6XlhoUnLCcxMDAtMTAwMOS6uicsJzEwMDDkurrku6XkuIonXSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYWRkSXRlbSh0eXBlKXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnIucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnIucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dCh0eXBlLGluZGV4LGV2dCl7XG4gICAgICAgICAgICBpZih0eXBlID09ICdkdXR5Jyl7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXR5QXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlID09ICdjbGFpbScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BcnJbaW5kZXhdID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlSXRlbSh0eXBlLGluZGV4KXtcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2R1dHknKXtcbiAgICAgICAgICAgICAgICB0aGlzLmR1dHlBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY2xhaW0nKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYWltQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGlja2VyQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldnQpO1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHN1Ym1pdCgpe1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5kdXR5QXJyKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cbiJdfQ==