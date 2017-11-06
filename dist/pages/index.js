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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.$repeat = {}, _this.$props = { "location": { "xmlns:v-bind": "", "v-bind:cityname.sync": "cityname", "v-bind:cityid.sync": "cityid" }, "footer": { "v-bind:cityname.sync": "cityname", "v-bind:cityid.sync": "cityid" } }, _this.$events = {}, _this.components = {
            location: _location2.default,
            gird: _grid2.default,
            footer: _footer2.default
        }, _this.data = {
            cityname: '',
            cityid: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var cityInfo = this.$parent.getloactionInfo();
            this.cityname = cityInfo.cityname;
            this.cityid = cityInfo.cityid;
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9jYXRpb24iLCJnaXJkIiwiZm9vdGVyIiwiZGF0YSIsImNpdHluYW1lIiwiY2l0eWlkIiwiY2l0eUluZm8iLCIkcGFyZW50IiwiZ2V0bG9hY3Rpb25JbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVMsRSxRQUdWQyxPLEdBQVUsRSxRQUNmQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXFELHNCQUFxQixRQUExRSxFQUFaLEVBQWdHLFVBQVMsRUFBQyx3QkFBdUIsVUFBeEIsRUFBbUMsc0JBQXFCLFFBQXhELEVBQXpHLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ0pDLHdDQURJO0FBRUpDLGdDQUZJO0FBR0pDO0FBSEksUyxRQUtSQyxJLEdBQU87QUFDSEMsc0JBQVcsRUFEUjtBQUVIQyxvQkFBUztBQUZOLFM7Ozs7O2lDQUlDO0FBQ0osZ0JBQUlDLFdBQVcsS0FBS0MsT0FBTCxDQUFhQyxlQUFiLEVBQWY7QUFDQSxpQkFBS0osUUFBTCxHQUFpQkUsU0FBU0YsUUFBMUI7QUFDQSxpQkFBS0MsTUFBTCxHQUFjQyxTQUFTRCxNQUF2QjtBQUNIOzs7O0VBcEI4QixlQUFLSSxJOztrQkFBbkJmLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExvY2F0aW9uIGZyb20gJy4uL2NvbXBvbmVudHMvbG9jYXRpb24nXG4gIGltcG9ydCBHcmlkIGZyb20gJy4uL2NvbXBvbmVudHMvZ3JpZCdcbiAgaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcidcbiAgLy8gaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgIGNvbmZpZyA9IHtcblxuICAgICAgfTtcbiAgICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJsb2NhdGlvblwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2l0eW5hbWUuc3luY1wiOlwiY2l0eW5hbWVcIixcInYtYmluZDpjaXR5aWQuc3luY1wiOlwiY2l0eWlkXCJ9LFwiZm9vdGVyXCI6e1widi1iaW5kOmNpdHluYW1lLnN5bmNcIjpcImNpdHluYW1lXCIsXCJ2LWJpbmQ6Y2l0eWlkLnN5bmNcIjpcImNpdHlpZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgbG9jYXRpb24gOiBMb2NhdGlvbixcbiAgICAgICAgICBnaXJkIDogR3JpZCxcbiAgICAgICAgICBmb290ZXIgOiBGb290ZXJcbiAgICAgIH07XG4gICAgICBkYXRhID0ge1xuICAgICAgICAgIGNpdHluYW1lIDogJycsXG4gICAgICAgICAgY2l0eWlkIDogJydcbiAgICAgIH1cbiAgICAgIG9uTG9hZCgpe1xuICAgICAgICAgIGxldCBjaXR5SW5mbyA9IHRoaXMuJHBhcmVudC5nZXRsb2FjdGlvbkluZm8oKTtcbiAgICAgICAgICB0aGlzLmNpdHluYW1lICA9IGNpdHlJbmZvLmNpdHluYW1lO1xuICAgICAgICAgIHRoaXMuY2l0eWlkID0gY2l0eUluZm8uY2l0eWlkO1xuICAgICAgfVxuICB9XG4iXX0=