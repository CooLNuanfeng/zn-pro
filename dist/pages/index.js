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
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9jYXRpb24iLCJnaXJkIiwiZm9vdGVyIiwiZGF0YSIsImNpdHluYW1lIiwiY2l0eWlkIiwibWV0aG9kcyIsImdvRGV0YWlsIiwicGFyYW1zIiwiY29uc29sZSIsImxvZyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsInB1Ymxpc2giLCJjaXR5SW5mbyIsIiRwYXJlbnQiLCJnZXRsb2FjdGlvbkluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUyxFLFFBR1ZDLE8sR0FBVSxFLFFBQ2ZDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix3QkFBdUIsVUFBMUMsRUFBcUQsc0JBQXFCLFFBQTFFLEVBQVosRUFBZ0csVUFBUyxFQUFDLHdCQUF1QixVQUF4QixFQUFtQyxzQkFBcUIsUUFBeEQsRUFBekcsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDSkMsd0NBREk7QUFFSkMsZ0NBRkk7QUFHSkM7QUFISSxTLFFBS1JDLEksR0FBTztBQUNIQyxzQkFBVyxFQURSO0FBRUhDLG9CQUFTO0FBRk4sUyxRQUlQQyxPLEdBQVU7QUFDTkMsb0JBRE0sb0JBQ0dDLE1BREgsRUFDVTtBQUNaQyx3QkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0FHLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQU07QUFESSxpQkFBZDtBQUdILGFBTks7QUFPTkMsbUJBUE0scUJBT0c7QUFDTEgsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0g7QUFYSyxTOzs7OztpQ0FhRjtBQUNKLGdCQUFJRSxXQUFXLEtBQUtDLE9BQUwsQ0FBYUMsZUFBYixFQUFmO0FBQ0EsaUJBQUtiLFFBQUwsR0FBaUJXLFNBQVNYLFFBQTFCO0FBQ0EsaUJBQUtDLE1BQUwsR0FBY1UsU0FBU1YsTUFBdkI7QUFDSDs7OztFQWpDOEIsZUFBS2EsSTs7a0JBQW5CeEIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9jYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9sb2NhdGlvbidcbiAgaW1wb3J0IEdyaWQgZnJvbSAnLi4vY29tcG9uZW50cy9ncmlkJ1xuICBpbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZm9vdGVyJ1xuICAvLyBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgY29uZmlnID0ge1xuXG4gICAgICB9O1xuICAgICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImxvY2F0aW9uXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjaXR5bmFtZS5zeW5jXCI6XCJjaXR5bmFtZVwiLFwidi1iaW5kOmNpdHlpZC5zeW5jXCI6XCJjaXR5aWRcIn0sXCJmb290ZXJcIjp7XCJ2LWJpbmQ6Y2l0eW5hbWUuc3luY1wiOlwiY2l0eW5hbWVcIixcInYtYmluZDpjaXR5aWQuc3luY1wiOlwiY2l0eWlkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgICBsb2NhdGlvbiA6IExvY2F0aW9uLFxuICAgICAgICAgIGdpcmQgOiBHcmlkLFxuICAgICAgICAgIGZvb3RlciA6IEZvb3RlclxuICAgICAgfTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgY2l0eW5hbWUgOiAnJyxcbiAgICAgICAgICBjaXR5aWQgOiAnJ1xuICAgICAgfVxuICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICBnb0RldGFpbChwYXJhbXMpe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdkZXRhaWwnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHVibGlzaCgpe1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybCA6ICdwdWJsaXNoJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBvbkxvYWQoKXtcbiAgICAgICAgICBsZXQgY2l0eUluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0bG9hY3Rpb25JbmZvKCk7XG4gICAgICAgICAgdGhpcy5jaXR5bmFtZSAgPSBjaXR5SW5mby5jaXR5bmFtZTtcbiAgICAgICAgICB0aGlzLmNpdHlpZCA9IGNpdHlJbmZvLmNpdHlpZDtcbiAgICAgIH1cbiAgfVxuIl19