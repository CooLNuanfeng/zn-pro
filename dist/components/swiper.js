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

var Swiper = function (_wepy$component) {
    _inherits(Swiper, _wepy$component);

    function Swiper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Swiper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            dots: false,
            autoplay: false
        }, _this.props = {
            imgUrls: Object,
            info: Object
        }, _this.watch = {
            imgUrls: function imgUrls(newValue) {
                if (newValue.length > 1) {
                    this.dots = true;
                    this.autoplay = true;
                    this.$apply();
                    console.log(this.dots, this.autoplay);
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Swiper;
}(_wepy2.default.component);

exports.default = Swiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJTd2lwZXIiLCJkYXRhIiwiZG90cyIsImF1dG9wbGF5IiwicHJvcHMiLCJpbWdVcmxzIiwiT2JqZWN0IiwiaW5mbyIsIndhdGNoIiwibmV3VmFsdWUiLCJsZW5ndGgiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxJLEdBQU87QUFDSEMsa0JBQU8sS0FESjtBQUVIQyxzQkFBVztBQUZSLFMsUUFJUEMsSyxHQUFRO0FBQ0pDLHFCQUFVQyxNQUROO0FBRUpDLGtCQUFPRDtBQUZILFMsUUFJUkUsSyxHQUFRO0FBQ0pILG1CQURJLG1CQUNJSSxRQURKLEVBQ2E7QUFDYixvQkFBR0EsU0FBU0MsTUFBVCxHQUFnQixDQUFuQixFQUFxQjtBQUNqQix5QkFBS1IsSUFBTCxHQUFZLElBQVo7QUFDQSx5QkFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLHlCQUFLUSxNQUFMO0FBQ0FDLDRCQUFRQyxHQUFSLENBQVksS0FBS1gsSUFBakIsRUFBc0IsS0FBS0MsUUFBM0I7QUFDSDtBQUNKO0FBUkcsUzs7OztFQVR5QixlQUFLVyxTOztrQkFBckJkLE0iLCJmaWxlIjoic3dpcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVyICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGRvdHMgOiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXkgOiBmYWxzZVxuICAgIH1cbiAgICBwcm9wcyA9IHtcbiAgICAgICAgaW1nVXJscyA6IE9iamVjdCxcbiAgICAgICAgaW5mbyA6IE9iamVjdFxuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICAgICAgaW1nVXJscyhuZXdWYWx1ZSl7XG4gICAgICAgICAgICBpZihuZXdWYWx1ZS5sZW5ndGg+MSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZG90cyx0aGlzLmF1dG9wbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==