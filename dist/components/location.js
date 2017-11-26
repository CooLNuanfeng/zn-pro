'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = function (_wepy$component) {
    _inherits(Location, _wepy$component);

    function Location() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Location);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Location.__proto__ || Object.getPrototypeOf(Location)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            searchText: '',
            cityname: ''
        }, _this.methods = {
            input: function input(evt) {
                this.searchText = evt.detail.value;
            },
            search: function search() {
                console.log(this.searchText, 'tap');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Location, [{
        key: 'onLoad',
        value: function onLoad() {
            this.cityname = this.$parent.$parent.globalData.cityname;
        }
    }]);

    return Location;
}(_wepy2.default.component);

exports.default = Location;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkxvY2F0aW9uIiwiZGF0YSIsInNlYXJjaFRleHQiLCJjaXR5bmFtZSIsIm1ldGhvZHMiLCJpbnB1dCIsImV2dCIsImRldGFpbCIsInZhbHVlIiwic2VhcmNoIiwiY29uc29sZSIsImxvZyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDZkMsSSxHQUFPO0FBQ0hDLHdCQUFhLEVBRFY7QUFFSEMsc0JBQVc7QUFGUixTLFFBSVBDLE8sR0FBVTtBQUNOQyxpQkFETSxpQkFDQUMsR0FEQSxFQUNJO0FBQ04scUJBQUtKLFVBQUwsR0FBa0JJLElBQUlDLE1BQUosQ0FBV0MsS0FBN0I7QUFDSCxhQUhLO0FBSU5DLGtCQUpNLG9CQUlFO0FBQ0pDLHdCQUFRQyxHQUFSLENBQVksS0FBS1QsVUFBakIsRUFBNEIsS0FBNUI7QUFDSDtBQU5LLFM7Ozs7O2lDQVFGO0FBQ0osaUJBQUtDLFFBQUwsR0FBZ0IsS0FBS1MsT0FBTCxDQUFhQSxPQUFiLENBQXFCQyxVQUFyQixDQUFnQ1YsUUFBaEQ7QUFDSDs7OztFQWYrQixlQUFLVyxTOztrQkFBdEJkLFEiLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYXRpb24gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBzZWFyY2hUZXh0IDogJycsXG4gICAgICAgICAgICBjaXR5bmFtZSA6ICcnXG4gICAgICAgIH1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGlucHV0KGV2dCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2goKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlYXJjaFRleHQsJ3RhcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uTG9hZCgpe1xuICAgICAgICAgICAgdGhpcy5jaXR5bmFtZSA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEuY2l0eW5hbWU7XG4gICAgICAgIH1cbiAgfVxuIl19