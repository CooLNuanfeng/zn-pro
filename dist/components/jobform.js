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
            'claimArr': ['']
        }, _this.methods = {
            addDuty: function addDuty() {
                this.dutyArr.push('');
            },
            dutyinput: function dutyinput(index, evt) {
                // console.log(index,evt);
                this.dutyArr[index] = evt.detail.value;
            },
            deleteduty: function deleteduty(index) {
                console.log(index);
                this.dutyArr.splice(index, 1);
            },
            addClaim: function addClaim() {
                this.claimArr.push('');
            },
            claiminput: function claiminput(index, evt) {
                // console.log(index,evt);
                this.claimArr[index] = evt.detail.value;
            },
            deleteclaim: function deleteclaim(index) {
                console.log(index);
                this.claimArr.splice(index, 1);
            },
            submit: function submit() {
                console.log(this.dutyArr);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobForm;
}(_wepy2.default.component);

exports.default = JobForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYmZvcm0uanMiXSwibmFtZXMiOlsiSm9iRm9ybSIsImRhdGEiLCJtZXRob2RzIiwiYWRkRHV0eSIsImR1dHlBcnIiLCJwdXNoIiwiZHV0eWlucHV0IiwiaW5kZXgiLCJldnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbGV0ZWR1dHkiLCJjb25zb2xlIiwibG9nIiwic3BsaWNlIiwiYWRkQ2xhaW0iLCJjbGFpbUFyciIsImNsYWltaW5wdXQiLCJkZWxldGVjbGFpbSIsInN1Ym1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFPO0FBQ0gsb0JBQVMsRUFETixFQUNVO0FBQ2IseUJBQWMsRUFGWCxFQUVlO0FBQ2xCLHNCQUFXLEVBSFIsRUFHWTtBQUNmLHVCQUFXLEVBSlIsRUFJVztBQUNkLHVCQUFZLENBQUMsRUFBRCxDQUxUO0FBTUgsd0JBQVksQ0FBQyxFQUFEO0FBTlQsUyxRQVFQQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0c7QUFDTCxxQkFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLEVBQWxCO0FBQ0gsYUFISztBQUlOQyxxQkFKTSxxQkFJSUMsS0FKSixFQUlVQyxHQUpWLEVBSWM7QUFDaEI7QUFDQSxxQkFBS0osT0FBTCxDQUFhRyxLQUFiLElBQXNCQyxJQUFJQyxNQUFKLENBQVdDLEtBQWpDO0FBQ0gsYUFQSztBQVFOQyxzQkFSTSxzQkFRS0osS0FSTCxFQVFXO0FBQ2JLLHdCQUFRQyxHQUFSLENBQVlOLEtBQVo7QUFDQSxxQkFBS0gsT0FBTCxDQUFhVSxNQUFiLENBQW9CUCxLQUFwQixFQUEwQixDQUExQjtBQUNILGFBWEs7QUFZTlEsb0JBWk0sc0JBWUk7QUFDTixxQkFBS0MsUUFBTCxDQUFjWCxJQUFkLENBQW1CLEVBQW5CO0FBQ0gsYUFkSztBQWVOWSxzQkFmTSxzQkFlS1YsS0FmTCxFQWVXQyxHQWZYLEVBZWU7QUFDakI7QUFDQSxxQkFBS1EsUUFBTCxDQUFjVCxLQUFkLElBQXVCQyxJQUFJQyxNQUFKLENBQVdDLEtBQWxDO0FBQ0gsYUFsQks7QUFtQk5RLHVCQW5CTSx1QkFtQk1YLEtBbkJOLEVBbUJZO0FBQ2RLLHdCQUFRQyxHQUFSLENBQVlOLEtBQVo7QUFDQSxxQkFBS1MsUUFBTCxDQUFjRixNQUFkLENBQXFCUCxLQUFyQixFQUEyQixDQUEzQjtBQUNILGFBdEJLO0FBdUJOWSxrQkF2Qk0sb0JBdUJFO0FBQ0pQLHdCQUFRQyxHQUFSLENBQVksS0FBS1QsT0FBakI7QUFDSDtBQXpCSyxTOzs7O0VBVHdCLGVBQUtnQixTOztrQkFBdEJwQixPIiwiZmlsZSI6ImpvYmZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICduYW1lJyA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgJ2VkdWNhdGlvbicgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgICdudW1iZXInIDogJycsIC8vcmVxdWlyZVxuICAgICAgICAnYWRkcmVzcyc6ICcnLC8vcmVxdWlyZVxuICAgICAgICAnZHV0eUFycicgOiBbJyddLFxuICAgICAgICAnY2xhaW1BcnInOiBbJyddLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBhZGREdXR5KCl7XG4gICAgICAgICAgICB0aGlzLmR1dHlBcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGR1dHlpbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgsZXZ0KTtcbiAgICAgICAgICAgIHRoaXMuZHV0eUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVkdXR5KGluZGV4KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZHV0eUFyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZENsYWltKCl7XG4gICAgICAgICAgICB0aGlzLmNsYWltQXJyLnB1c2goJycpO1xuICAgICAgICB9LFxuICAgICAgICBjbGFpbWlucHV0KGluZGV4LGV2dCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleCxldnQpO1xuICAgICAgICAgICAgdGhpcy5jbGFpbUFycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVjbGFpbShpbmRleCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmNsYWltQXJyLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0KCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmR1dHlBcnIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19