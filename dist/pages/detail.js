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
            imgUrls: [],
            cityname: '',
            cityid: ''
        }, _this.$repeat = {}, _this.$props = { "swiper": { "xmlns:v-bind": "", "v-bind:imgUrls.sync": "imgUrls" }, "footer": { "v-bind:cityname.sync": "cityname", "v-bind:cityid.sync": "cityid" } }, _this.$events = {}, _this.components = {
            swiper: _swiper2.default,
            footer: _footer2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Detail, [{
        key: 'onLoad',
        value: function onLoad() {
            this.imgUrls = ['http://dummyimage.com/750x500', 'http://dummyimage.com/750x500'];
            var cityInfo = this.$parent.getloactionInfo();
            this.cityname = cityInfo.cityname;
            this.cityid = cityInfo.cityid;
        }
    }]);

    return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJkYXRhIiwiY2F0ZWdvcnlUeXBlIiwiaW1nVXJscyIsImNpdHluYW1lIiwiY2l0eWlkIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVyIiwiZm9vdGVyIiwiY2l0eUluZm8iLCIkcGFyZW50IiwiZ2V0bG9hY3Rpb25JbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsSSxHQUFPO0FBQ0hDLDBCQUFjLE1BRFg7QUFFSEMscUJBQVUsRUFGUDtBQUdIQyxzQkFBVSxFQUhQO0FBSUhDLG9CQUFTO0FBSk4sUyxRQU1SQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQVYsRUFBOEQsVUFBUyxFQUFDLHdCQUF1QixVQUF4QixFQUFtQyxzQkFBcUIsUUFBeEQsRUFBdkUsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsb0NBRE07QUFFTkM7QUFGTSxTOzs7OztpQ0FJRjtBQUNKLGlCQUFLUixPQUFMLEdBQWUsQ0FDWCwrQkFEVyxFQUVYLCtCQUZXLENBQWY7QUFJQSxnQkFBSVMsV0FBVyxLQUFLQyxPQUFMLENBQWFDLGVBQWIsRUFBZjtBQUNBLGlCQUFLVixRQUFMLEdBQWlCUSxTQUFTUixRQUExQjtBQUNBLGlCQUFLQyxNQUFMLEdBQWNPLFNBQVNQLE1BQXZCO0FBQ0g7Ozs7RUF0QitCLGVBQUtVLEk7O2tCQUFwQmYsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IFN3aXBlciBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICBjYXRlZ29yeVR5cGU6ICdzYWxlJyxcbiAgICAgICAgaW1nVXJscyA6IFtdLFxuICAgICAgICBjaXR5bmFtZTogJycsXG4gICAgICAgIGNpdHlpZCA6ICcnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzd2lwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmltZ1VybHMuc3luY1wiOlwiaW1nVXJsc1wifSxcImZvb3RlclwiOntcInYtYmluZDpjaXR5bmFtZS5zeW5jXCI6XCJjaXR5bmFtZVwiLFwidi1iaW5kOmNpdHlpZC5zeW5jXCI6XCJjaXR5aWRcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBzd2lwZXIgOiBTd2lwZXIsXG4gICAgICAgIGZvb3RlcjogRm9vdGVyXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmltZ1VybHMgPSBbXG4gICAgICAgICAgICAnaHR0cDovL2R1bW15aW1hZ2UuY29tLzc1MHg1MDAnLFxuICAgICAgICAgICAgJ2h0dHA6Ly9kdW1teWltYWdlLmNvbS83NTB4NTAwJ1xuICAgICAgICBdXG4gICAgICAgIGxldCBjaXR5SW5mbyA9IHRoaXMuJHBhcmVudC5nZXRsb2FjdGlvbkluZm8oKTtcbiAgICAgICAgdGhpcy5jaXR5bmFtZSAgPSBjaXR5SW5mby5jaXR5bmFtZTtcbiAgICAgICAgdGhpcy5jaXR5aWQgPSBjaXR5SW5mby5jaXR5aWQ7XG4gICAgfVxufVxuIl19