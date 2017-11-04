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
            searchText: ''
        }, _this.props = {
            cityname: String,
            cityid: Number
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
        value: function onLoad() {}
    }]);

    return Location;
}(_wepy2.default.component);

exports.default = Location;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2F0aW9uLmpzIl0sIm5hbWVzIjpbIkxvY2F0aW9uIiwiZGF0YSIsInNlYXJjaFRleHQiLCJwcm9wcyIsImNpdHluYW1lIiwiU3RyaW5nIiwiY2l0eWlkIiwiTnVtYmVyIiwibWV0aG9kcyIsImlucHV0IiwiZXZ0IiwiZGV0YWlsIiwidmFsdWUiLCJzZWFyY2giLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDZkMsSSxHQUFPO0FBQ0hDLHdCQUFhO0FBRFYsUyxRQUdQQyxLLEdBQVE7QUFDSkMsc0JBQVdDLE1BRFA7QUFFSkMsb0JBQVNDO0FBRkwsUyxRQUlSQyxPLEdBQVU7QUFDTkMsaUJBRE0saUJBQ0FDLEdBREEsRUFDSTtBQUNOLHFCQUFLUixVQUFMLEdBQWtCUSxJQUFJQyxNQUFKLENBQVdDLEtBQTdCO0FBQ0gsYUFISztBQUlOQyxrQkFKTSxvQkFJRTtBQUNKQyx3QkFBUUMsR0FBUixDQUFZLEtBQUtiLFVBQWpCLEVBQTRCLEtBQTVCO0FBQ0g7QUFOSyxTOzs7OztpQ0FRRixDQUVQOzs7O0VBbEIrQixlQUFLYyxTOztrQkFBdEJoQixRIiwiZmlsZSI6ImxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2F0aW9uIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgc2VhcmNoVGV4dCA6ICcnXG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICBjaXR5bmFtZSA6IFN0cmluZyxcbiAgICAgICAgICAgIGNpdHlpZCA6IE51bWJlclxuICAgICAgICB9XG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBpbnB1dChldnQpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWFyY2hUZXh0LCd0YXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvbkxvYWQoKXtcblxuICAgICAgICB9XG4gIH1cbiJdfQ==