'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _jobform = require('./../components/jobform.js');

var _jobform2 = _interopRequireDefault(_jobform);

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
        }, _this.$repeat = {}, _this.$props = { "jobform": {} }, _this.$events = {}, _this.components = {
            jobform: _jobform2.default,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImRhdGEiLCJ0aXRsZSIsInN1YnRpdGxlIiwicGhvbmUiLCJ0eXBlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiam9iZm9ybSIsImZvb3RlciIsIm1ldGhvZHMiLCJ0YXAiLCJwYXJhbXMiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyxtQkFBUSxFQURMLEVBQ1M7QUFDWkMsc0JBQVcsRUFGUjtBQUdIQyxtQkFBUSxFQUhMLEVBR1M7QUFDWkMsa0JBQU8sS0FKSixDQUlXO0FBSlgsUyxRQU1SQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxXQUFVLEVBQVgsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsc0NBRE07QUFFTkM7QUFGTSxTLFFBSVZDLE8sR0FBVTtBQUNOQyxlQURNLGVBQ0ZDLE1BREUsRUFDSztBQUNQQyx3QkFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0EscUJBQUtULElBQUwsR0FBWVMsTUFBWjtBQUNIO0FBSkssUzs7OztFQWR1QixlQUFLRyxJOztrQkFBckJqQixPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IEpvYkZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2Jmb3JtJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9mb290ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aXRsZSA6ICcnLCAvL3JlcXVpcmVcbiAgICAgICAgc3VidGl0bGUgOiAnJyxcbiAgICAgICAgcGhvbmUgOiAnJywgLy9yZXF1aXJlXG4gICAgICAgIHR5cGUgOiAnam9iJywgLy9yZXF1aXJlXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJqb2Jmb3JtXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBqb2Jmb3JtIDogSm9iRm9ybSxcbiAgICAgICAgZm9vdGVyIDogRm9vdGVyXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcChwYXJhbXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==