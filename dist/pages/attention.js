'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _listnews = require('./../components/listnews.js');

var _listnews2 = _interopRequireDefault(_listnews);

var _navbar = require('./../components/navbar.js');

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attention = function (_wepy$page) {
    _inherits(Attention, _wepy$page);

    function Attention() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Attention);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Attention.__proto__ || Object.getPrototypeOf(Attention)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
            'nav-bar': _navbar2.default
        }, _this.data = {
            startX: 0,
            startY: 0
        }, _this.methods = {
            touchstart: function touchstart(e) {
                this.startX = e.changedTouches[0].clientX;
                this.startY = e.changedTouches[0].clientY;
                console.log('touchstart', e);
            },
            touchmove: function touchmove(e) {
                var that = this,
                    index = e.currentTarget.dataset.index,
                    //当前索引
                startX = that.startX,
                    //开始X坐标
                startY = that.startY,
                    //开始Y坐标
                touchMoveX = e.changedTouches[0].clientX,
                    //滑动变化坐标
                touchMoveY = e.changedTouches[0].clientY,
                    //滑动变化坐标
                //获取滑动角度
                angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
                //滑动超过30度角 return
                if (Math.abs(angle) > 30) return;
                if (touchMoveX > startX) {
                    //右滑
                    console.log('touchmove right');
                } else {
                    //左滑
                    console.log('touchmove left');
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Attention, [{
        key: 'angle',
        value: function angle(start, end) {
            var _X = end.X - start.X,
                _Y = end.Y - start.Y;
            //返回角度 /Math.atan()返回数字的反正切值
            return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
        }
    }]);

    return Attention;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Attention , 'pages/attention'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVudGlvbi5qcyJdLCJuYW1lcyI6WyJBdHRlbnRpb24iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXJ0WCIsInN0YXJ0WSIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb25zb2xlIiwibG9nIiwidG91Y2htb3ZlIiwidGhhdCIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ0b3VjaE1vdmVYIiwidG91Y2hNb3ZlWSIsImFuZ2xlIiwiWCIsIlkiLCJNYXRoIiwiYWJzIiwic3RhcnQiLCJlbmQiLCJfWCIsIl9ZIiwiYXRhbiIsIlBJIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhO0FBQ1Q7QUFEUyxTLFFBR2JDLEksR0FBTztBQUNIQyxvQkFBUyxDQUROO0FBRUhDLG9CQUFRO0FBRkwsUyxRQUlQQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ0tDLENBREwsRUFDTztBQUNULHFCQUFLSixNQUFMLEdBQWNJLEVBQUVDLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JDLE9BQWxDO0FBQ0EscUJBQUtMLE1BQUwsR0FBY0csRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkUsT0FBbEM7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxZQUFaLEVBQXlCTCxDQUF6QjtBQUNILGFBTEs7QUFNTk0scUJBTk0scUJBTUlOLENBTkosRUFNTTtBQUNSLG9CQUFJTyxPQUFPLElBQVg7QUFBQSxvQkFDRUMsUUFBUVIsRUFBRVMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEtBRGxDO0FBQUEsb0JBQ3dDO0FBQ3RDWix5QkFBU1csS0FBS1gsTUFGaEI7QUFBQSxvQkFFdUI7QUFDckJDLHlCQUFTVSxLQUFLVixNQUhoQjtBQUFBLG9CQUd1QjtBQUNyQmMsNkJBQWFYLEVBQUVDLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JDLE9BSm5DO0FBQUEsb0JBSTJDO0FBQ3pDVSw2QkFBYVosRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkUsT0FMbkM7QUFBQSxvQkFLMkM7QUFDekM7QUFDQVUsd0JBQVFOLEtBQUtNLEtBQUwsQ0FBVyxFQUFFQyxHQUFHbEIsTUFBTCxFQUFhbUIsR0FBR2xCLE1BQWhCLEVBQVgsRUFBcUMsRUFBRWlCLEdBQUdILFVBQUwsRUFBaUJJLEdBQUdILFVBQXBCLEVBQXJDLENBUFY7QUFRRTtBQUNBLG9CQUFJSSxLQUFLQyxHQUFMLENBQVNKLEtBQVQsSUFBa0IsRUFBdEIsRUFBMEI7QUFDMUIsb0JBQUlGLGFBQWFmLE1BQWpCLEVBQXdCO0FBQUM7QUFDckJRLDRCQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDSCxpQkFGRCxNQUVNO0FBQUM7QUFDSEQsNEJBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNIO0FBQ047QUF0QkssUzs7Ozs7OEJBd0JKYSxLLEVBQU9DLEcsRUFBSztBQUNmLGdCQUFJQyxLQUFLRCxJQUFJTCxDQUFKLEdBQVFJLE1BQU1KLENBQXZCO0FBQUEsZ0JBQ0VPLEtBQUtGLElBQUlKLENBQUosR0FBUUcsTUFBTUgsQ0FEckI7QUFFQTtBQUNBLG1CQUFPLE1BQU1DLEtBQUtNLElBQUwsQ0FBVUQsS0FBS0QsRUFBZixDQUFOLElBQTRCLElBQUlKLEtBQUtPLEVBQXJDLENBQVA7QUFDRjs7OztFQXRDa0MsZUFBS0MsSTs7a0JBQXZCaEMsUyIsImZpbGUiOiJhdHRlbnRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IExpc3ROZXdzIGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdG5ld3MnO1xuaW1wb3J0IE5hdkJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdmJhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGVudGlvbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge307XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgJ25hdi1iYXInIDogTmF2QmFyXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICBzdGFydFggOiAwLFxuICAgICAgICBzdGFydFk6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgdG91Y2hzdGFydChlKXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5zdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG91Y2hzdGFydCcsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNobW92ZShlKXtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwvL+W9k+WJjee0ouW8lVxuICAgICAgICAgICAgICBzdGFydFggPSB0aGF0LnN0YXJ0WCwvL+W8gOWni1jlnZDmoIdcbiAgICAgICAgICAgICAgc3RhcnRZID0gdGhhdC5zdGFydFksLy/lvIDlp4tZ5Z2Q5qCHXG4gICAgICAgICAgICAgIHRvdWNoTW92ZVggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsLy/mu5Hliqjlj5jljJblnZDmoIdcbiAgICAgICAgICAgICAgdG91Y2hNb3ZlWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwvL+a7keWKqOWPmOWMluWdkOagh1xuICAgICAgICAgICAgICAvL+iOt+WPlua7keWKqOinkuW6plxuICAgICAgICAgICAgICBhbmdsZSA9IHRoYXQuYW5nbGUoeyBYOiBzdGFydFgsIFk6IHN0YXJ0WSB9LCB7IFg6IHRvdWNoTW92ZVgsIFk6IHRvdWNoTW92ZVkgfSk7XG4gICAgICAgICAgICAgIC8v5ruR5Yqo6LaF6L+HMzDluqbop5IgcmV0dXJuXG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPiAzMCkgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAodG91Y2hNb3ZlWCA+IHN0YXJ0WCl7Ly/lj7Pmu5FcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b3VjaG1vdmUgcmlnaHQnKTtcbiAgICAgICAgICAgICAgfWVsc2Ugey8v5bem5ruRXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG91Y2htb3ZlIGxlZnQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbiAgICBhbmdsZShzdGFydCwgZW5kKSB7XG4gICAgICAgdmFyIF9YID0gZW5kLlggLSBzdGFydC5YLFxuICAgICAgICAgX1kgPSBlbmQuWSAtIHN0YXJ0LllcbiAgICAgICAvL+i/lOWbnuinkuW6piAvTWF0aC5hdGFuKCnov5Tlm57mlbDlrZfnmoTlj43mraPliIflgLxcbiAgICAgICByZXR1cm4gMzYwICogTWF0aC5hdGFuKF9ZIC8gX1gpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICB9XG59XG4iXX0=