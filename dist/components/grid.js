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

var Grid = function (_wepy$component) {
    _inherits(Grid, _wepy$component);

    function Grid() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            themeimg: ''
        }, _this.methods = {
            tap: function tap(params) {
                wx.navigateTo({
                    url: 'category?id=' + params
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Grid, [{
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.$parent.globalData.themeimg;
        }
    }]);

    return Grid;
}(_wepy2.default.component);

exports.default = Grid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWQuanMiXSwibmFtZXMiOlsiR3JpZCIsImRhdGEiLCJ0aGVtZWltZyIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVc7QUFEUixTLFFBR1BDLE8sR0FBVTtBQUNOQyxlQURNLGVBQ0ZDLE1BREUsRUFDSztBQUNQQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNLGlCQUFlSDtBQURYLGlCQUFkO0FBR0g7QUFMSyxTOzs7OztpQ0FPRjtBQUNILGlCQUFLSCxRQUFMLEdBQWdCLEtBQUtPLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsVUFBckIsQ0FBZ0NSLFFBQWhEO0FBQ0o7Ozs7RUFiOEIsZUFBS1MsUzs7a0JBQW5CWCxJIiwiZmlsZSI6ImdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHRoZW1laW1nIDogJydcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ2NhdGVnb3J5P2lkPScrcGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgICB0aGlzLnRoZW1laW1nID0gdGhpcy4kcGFyZW50LiRwYXJlbnQuZ2xvYmFsRGF0YS50aGVtZWltZztcbiAgICB9XG59XG4iXX0=