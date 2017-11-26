'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _swiper = require('./../components/swiper.js');

var _swiper2 = _interopRequireDefault(_swiper);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_wepy$page) {
    _inherits(Detail, _wepy$page);

    function Detail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Detail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            categoryType: 'sale',
            imgUrls: []
        }, _this.$repeat = {}, _this.$props = { "swiper": { "xmlns:v-bind": "", "v-bind:imgUrls.sync": "imgUrls" } }, _this.$events = {}, _this.components = {
            swiper: _swiper2.default,
            footer: _footer2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Detail, [{
        key: 'onLoad',
        value: function onLoad() {
            this.imgUrls = ['http://dummyimage.com/750x500', 'http://dummyimage.com/750x500'];
        }
    }]);

    return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJkYXRhIiwiY2F0ZWdvcnlUeXBlIiwiaW1nVXJscyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlciIsImZvb3RlciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLEksR0FBTztBQUNIQywwQkFBYyxNQURYO0FBRUhDLHFCQUFVO0FBRlAsUyxRQUlSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsb0NBRE07QUFFTkM7QUFGTSxTOzs7OztpQ0FJRjtBQUNKLGlCQUFLTixPQUFMLEdBQWUsQ0FDWCwrQkFEVyxFQUVYLCtCQUZXLENBQWY7QUFJSDs7OztFQWpCK0IsZUFBS08sSTs7a0JBQXBCVixNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgU3dpcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc3dpcGVyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGNhdGVnb3J5VHlwZTogJ3NhbGUnLFxuICAgICAgICBpbWdVcmxzIDogW10sXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzd2lwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmltZ1VybHMuc3luY1wiOlwiaW1nVXJsc1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIHN3aXBlciA6IFN3aXBlcixcbiAgICAgICAgZm9vdGVyOiBGb290ZXJcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuaW1nVXJscyA9IFtcbiAgICAgICAgICAgICdodHRwOi8vZHVtbXlpbWFnZS5jb20vNzUweDUwMCcsXG4gICAgICAgICAgICAnaHR0cDovL2R1bW15aW1hZ2UuY29tLzc1MHg1MDAnXG4gICAgICAgIF1cbiAgICB9XG59XG4iXX0=