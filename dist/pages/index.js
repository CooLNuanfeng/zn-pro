'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _location = require('./../components/location.js');

var _location2 = _interopRequireDefault(_location);

var _grid = require('./../components/grid.js');

var _grid2 = _interopRequireDefault(_grid);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Toast from 'wepy-com-toast'

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
            location: _location2.default,
            gird: _grid2.default,
            footer: _footer2.default
        }, _this.data = {
            themeimg: ''
        }, _this.methods = {
            goDetail: function goDetail(params) {
                console.log(params);
                wx.navigateTo({
                    url: 'detail'
                });
            },
            publish: function publish() {
                wx.navigateTo({
                    url: 'publish'
                });
            },
            about: function about() {
                wx.navigateTo({
                    url: 'about'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.globalData.themeimg;
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImxvY2F0aW9uIiwiZ2lyZCIsImZvb3RlciIsImRhdGEiLCJ0aGVtZWltZyIsIm1ldGhvZHMiLCJnb0RldGFpbCIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwdWJsaXNoIiwiYWJvdXQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTLEUsUUFHVEMsVSxHQUFhO0FBQ1RDLHdDQURTO0FBRVRDLGdDQUZTO0FBR1RDO0FBSFMsUyxRQUtiQyxJLEdBQU87QUFDSEMsc0JBQVc7QUFEUixTLFFBR1BDLE8sR0FBVTtBQUNOQyxvQkFETSxvQkFDR0MsTUFESCxFQUNVO0FBQ1pDLHdCQUFRQyxHQUFSLENBQVlGLE1BQVo7QUFDQUcsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0gsYUFOSztBQU9OQyxtQkFQTSxxQkFPRztBQUNMSCxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSCxhQVhLO0FBWU5FLGlCQVpNLG1CQVlDO0FBQ0hKLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdIO0FBaEJLLFM7Ozs7O2lDQWtCRjtBQUNKLGlCQUFLUixRQUFMLEdBQWdCLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlosUUFBeEM7QUFDSDs7OztFQWhDOEIsZUFBS2EsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9jYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9sb2NhdGlvbidcbiAgaW1wb3J0IEdyaWQgZnJvbSAnLi4vY29tcG9uZW50cy9ncmlkJ1xuICBpbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJ1xuICAvLyBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgY29uZmlnID0ge1xuXG4gICAgICB9O1xuICAgICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgICBsb2NhdGlvbiA6IExvY2F0aW9uLFxuICAgICAgICAgIGdpcmQgOiBHcmlkLFxuICAgICAgICAgIGZvb3RlciA6IEZvb3RlclxuICAgICAgfTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgdGhlbWVpbWcgOiAnJyxcbiAgICAgIH07XG4gICAgICBtZXRob2RzID0ge1xuICAgICAgICAgIGdvRGV0YWlsKHBhcmFtcyl7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsIDogJ2RldGFpbCdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwdWJsaXNoKCl7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsIDogJ3B1Ymxpc2gnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWJvdXQoKXtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmwgOiAnYWJvdXQnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9uTG9hZCgpe1xuICAgICAgICAgIHRoaXMudGhlbWVpbWcgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50aGVtZWltZztcbiAgICAgIH1cbiAgfVxuIl19