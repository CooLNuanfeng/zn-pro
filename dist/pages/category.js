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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Category.__proto__ || Object.getPrototypeOf(Category)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.$repeat = {}, _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:loading.once": "loading" } }, _this.$events = {}, _this.components = {
            'nav-bar': _navbar2.default,
            'news-list': _listnews2.default,
            'loading': _loading2.default
        }, _this.data = {
            loading: false
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImxvYWRpbmciLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsImlkIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVMsRSxRQUNWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQVgsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTix1Q0FETTtBQUVOLDJDQUZNO0FBR047QUFITSxTLFFBS1ZDLEksR0FBTztBQUNIQyxxQkFBVTtBQURQLFM7Ozs7OytCQUdBQyxPLEVBQVM7QUFDWkMsb0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXFCRixRQUFRRyxFQUE3QjtBQUNIOzs7O0VBZmlDLGVBQUtDLEk7O2tCQUF0QlosUSIsImZpbGUiOiJjYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4uL2NvbXBvbmVudHMvbmF2YmFyJztcbmltcG9ydCBMaXN0TmV3cyBmcm9tICcuLi9jb21wb25lbnRzL2xpc3RuZXdzJztcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7fTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bG9hZGluZy5vbmNlXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgJ25hdi1iYXInIDogTmF2QmFyLFxuICAgICAgICAnbmV3cy1saXN0JzogTGlzdE5ld3MsXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBsb2FkaW5nIDogZmFsc2VcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcsb3B0aW9ucy5pZCk7XG4gICAgfTtcbn1cbiJdfQ==