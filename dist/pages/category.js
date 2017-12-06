'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _navbar = require('./../components/navbar.js');

var _navbar2 = _interopRequireDefault(_navbar);

var _listnews = require('./../components/listnews.js');

var _listnews2 = _interopRequireDefault(_listnews);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Category = function (_wepy$page) {
    _inherits(Category, _wepy$page);

    function Category() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Category);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Category.__proto__ || Object.getPrototypeOf(Category)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.$repeat = {}, _this.$props = { "v-loading": { "xmlns:v-bind": "", "v-bind:loading.once": "loading", "v-bind:loadend.once": "loadend" } }, _this.$events = {}, _this.components = {
            'nav-bar': _navbar2.default,
            'news-list': _listnews2.default,
            'v-loading': _loading2.default
        }, _this.data = {
            loading: true,
            loadend: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Category, [{
        key: 'onLoad',
        value: function onLoad(options) {
            console.log('onLoad', options.id);
        }
    }]);

    return Category;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Category , 'pages/category'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImxvYWRpbmciLCJsb2FkZW5kIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJpZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsTSxHQUFTLEUsUUFDVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixTQUF6QyxFQUFtRCx1QkFBc0IsU0FBekUsRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOLHVDQURNO0FBRU4sMkNBRk07QUFHTjtBQUhNLFMsUUFLVkMsSSxHQUFPO0FBQ0hDLHFCQUFVLElBRFA7QUFFSEMscUJBQVU7QUFGUCxTOzs7OzsrQkFJQUMsTyxFQUFTO0FBQ1pDLG9CQUFRQyxHQUFSLENBQVksUUFBWixFQUFxQkYsUUFBUUcsRUFBN0I7QUFDSDs7OztFQWhCaUMsZUFBS0MsSTs7a0JBQXRCYixRIiwiZmlsZSI6ImNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IExpc3ROZXdzIGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdG5ld3MnO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHt9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ2LWxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvYWRpbmcub25jZVwiOlwibG9hZGluZ1wiLFwidi1iaW5kOmxvYWRlbmQub25jZVwiOlwibG9hZGVuZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICduYXYtYmFyJyA6IE5hdkJhcixcbiAgICAgICAgJ25ld3MtbGlzdCc6IExpc3ROZXdzLFxuICAgICAgICAndi1sb2FkaW5nJzogTG9hZGluZ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBsb2FkaW5nIDogdHJ1ZSxcbiAgICAgICAgbG9hZGVuZCA6IGZhbHNlXG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnLG9wdGlvbnMuaWQpO1xuICAgIH07XG59XG4iXX0=