'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Success = function (_wepy$page) {
    _inherits(Success, _wepy$page);

    function Success() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Success);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Success.__proto__ || Object.getPrototypeOf(Success)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            cityname: ''
        }, _this.components = {
            footer: _footer2.default
        }, _this.methods = {
            goPublish: function goPublish() {
                wx.redirectTo({
                    url: 'publish'
                });
            },
            goIndex: function goIndex() {
                wx.switchTab({
                    url: 'index'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Success, [{
        key: 'onLoad',
        value: function onLoad() {
            this.cityname = this.$parent.globalData.cityname;
        }
    }]);

    return Success;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Success , 'pages/success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiU3VjY2VzcyIsImRhdGEiLCJjaXR5bmFtZSIsImNvbXBvbmVudHMiLCJmb290ZXIiLCJtZXRob2RzIiwiZ29QdWJsaXNoIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwiZ29JbmRleCIsInN3aXRjaFRhYiIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyxzQkFBVztBQURSLFMsUUFHUEMsVSxHQUFhO0FBQ1RDO0FBRFMsUyxRQU1iQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ0s7QUFDUEMsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBTTtBQURJLGlCQUFkO0FBR0gsYUFMSztBQU1OQyxtQkFOTSxxQkFNRztBQUNMSCxtQkFBR0ksU0FBSCxDQUFhO0FBQ1RGLHlCQUFNO0FBREcsaUJBQWI7QUFHSDtBQVZLLFM7Ozs7O2lDQUhGO0FBQ0osaUJBQUtQLFFBQUwsR0FBZ0IsS0FBS1UsT0FBTCxDQUFhQyxVQUFiLENBQXdCWCxRQUF4QztBQUNIOzs7O0VBVGdDLGVBQUtZLEk7O2tCQUFyQmQsTyIsImZpbGUiOiJzdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWNjZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICBjaXR5bmFtZSA6ICcnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGZvb3RlciA6IEZvb3RlclxuICAgIH07XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuY2l0eW5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaXR5bmFtZTtcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGdvUHVibGlzaCgpe1xuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ3B1Ymxpc2gnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ29JbmRleCgpe1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmwgOiAnaW5kZXgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==