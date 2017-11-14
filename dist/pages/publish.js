'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _jobform = require('./../components/jobform.js');

var _jobform2 = _interopRequireDefault(_jobform);

var _saleform = require('./../components/saleform.js');

var _saleform2 = _interopRequireDefault(_saleform);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_wepy$page) {
    _inherits(Publish, _wepy$page);

    function Publish() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Publish);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publish.__proto__ || Object.getPrototypeOf(Publish)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            title: '', //require
            subtitle: '',
            phone: '', //require
            type: 'job' //require
        }, _this.$repeat = {}, _this.$props = { "jobform": {}, "saleform": {} }, _this.$events = {}, _this.components = {
            jobform: _jobform2.default,
            saleform: _saleform2.default,
            footer: _footer2.default
        }, _this.methods = {
            tap: function tap(params) {
                console.log(params);
                this.type = params;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJ0eXBlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9iZm9ybSIsInNhbGVmb3JtIiwiZm9vdGVyIiwibWV0aG9kcyIsInRhcCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsbUJBQVEsRUFETCxFQUNTO0FBQ1pDLHNCQUFXLEVBRlI7QUFHSEMsbUJBQVEsRUFITCxFQUdTO0FBQ1pDLGtCQUFPLEtBSkosQ0FJVztBQUpYLFMsUUFNUkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsV0FBVSxFQUFYLEVBQWMsWUFBVyxFQUF6QixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOQyxzQ0FETTtBQUVOQyx3Q0FGTTtBQUdOQztBQUhNLFMsUUFLVkMsTyxHQUFVO0FBQ05DLGVBRE0sZUFDRkMsTUFERSxFQUNLO0FBQ1BDLHdCQUFRQyxHQUFSLENBQVlGLE1BQVo7QUFDQSxxQkFBS1YsSUFBTCxHQUFZVSxNQUFaO0FBQ0g7QUFKSyxTOzs7O0VBZnVCLGVBQUtHLEk7O2tCQUFyQmxCLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgSm9iRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2pvYmZvcm0nO1xuaW1wb3J0IFNhbGVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2FsZWZvcm0nO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3Rlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHRpdGxlIDogJycsIC8vcmVxdWlyZVxuICAgICAgICBzdWJ0aXRsZSA6ICcnLFxuICAgICAgICBwaG9uZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgdHlwZSA6ICdqb2InLCAvL3JlcXVpcmVcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImpvYmZvcm1cIjp7fSxcInNhbGVmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgc2FsZWZvcm0gOiBTYWxlRm9ybSxcbiAgICAgICAgZm9vdGVyIDogRm9vdGVyXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==