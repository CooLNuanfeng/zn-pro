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
            status: 0, //确切到每个
            showBar: false, //是否显示底部删除操作
            startX: 0,
            startY: 0
        }, _this.methods = {
            touchstart: function touchstart(e) {
                this.startX = e.changedTouches[0].clientX;
                this.startY = e.changedTouches[0].clientY;
                console.log('touchstart', e);
            },
            touchmove: function touchmove(e) {
                if (this.status == 1) {
                    return;
                }
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
                    this.status = 0;
                } else {
                    //左滑
                    console.log('touchmove left');
                    this.status = -1;
                }
            },
            edit: function edit() {
                this.status = 1;

                this.showBar = true;
            },
            cancel: function cancel() {
                this.status = 0;
                this.showBar = false;
            },
            deleteSelect: function deleteSelect() {
                //ajax
                this.showBar = false;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVudGlvbi5qcyJdLCJuYW1lcyI6WyJBdHRlbnRpb24iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXR1cyIsInNob3dCYXIiLCJzdGFydFgiLCJzdGFydFkiLCJtZXRob2RzIiwidG91Y2hzdGFydCIsImUiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY29uc29sZSIsImxvZyIsInRvdWNobW92ZSIsInRoYXQiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidG91Y2hNb3ZlWCIsInRvdWNoTW92ZVkiLCJhbmdsZSIsIlgiLCJZIiwiTWF0aCIsImFicyIsImVkaXQiLCJjYW5jZWwiLCJkZWxldGVTZWxlY3QiLCJzdGFydCIsImVuZCIsIl9YIiwiX1kiLCJhdGFuIiwiUEkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Z01BQ2pCQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWE7QUFDVDtBQURTLFMsUUFHYkMsSSxHQUFPO0FBQ0hDLG9CQUFTLENBRE4sRUFDUztBQUNaQyxxQkFBUyxLQUZOLEVBRWE7QUFDaEJDLG9CQUFTLENBSE47QUFJSEMsb0JBQVE7QUFKTCxTLFFBTVBDLE8sR0FBVTtBQUNOQyxzQkFETSxzQkFDS0MsQ0FETCxFQUNPO0FBQ1QscUJBQUtKLE1BQUwsR0FBY0ksRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkMsT0FBbEM7QUFDQSxxQkFBS0wsTUFBTCxHQUFjRyxFQUFFQyxjQUFGLENBQWlCLENBQWpCLEVBQW9CRSxPQUFsQztBQUNBQyx3QkFBUUMsR0FBUixDQUFZLFlBQVosRUFBeUJMLENBQXpCO0FBQ0gsYUFMSztBQU1OTSxxQkFOTSxxQkFNSU4sQ0FOSixFQU1NO0FBQ1Isb0JBQUcsS0FBS04sTUFBTCxJQUFhLENBQWhCLEVBQWtCO0FBQ2Q7QUFDSDtBQUNELG9CQUFJYSxPQUFPLElBQVg7QUFBQSxvQkFDRUMsUUFBUVIsRUFBRVMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEtBRGxDO0FBQUEsb0JBQ3dDO0FBQ3RDWix5QkFBU1csS0FBS1gsTUFGaEI7QUFBQSxvQkFFdUI7QUFDckJDLHlCQUFTVSxLQUFLVixNQUhoQjtBQUFBLG9CQUd1QjtBQUNyQmMsNkJBQWFYLEVBQUVDLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JDLE9BSm5DO0FBQUEsb0JBSTJDO0FBQ3pDVSw2QkFBYVosRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkUsT0FMbkM7QUFBQSxvQkFLMkM7QUFDekM7QUFDQVUsd0JBQVFOLEtBQUtNLEtBQUwsQ0FBVyxFQUFFQyxHQUFHbEIsTUFBTCxFQUFhbUIsR0FBR2xCLE1BQWhCLEVBQVgsRUFBcUMsRUFBRWlCLEdBQUdILFVBQUwsRUFBaUJJLEdBQUdILFVBQXBCLEVBQXJDLENBUFY7QUFRRTtBQUNBLG9CQUFJSSxLQUFLQyxHQUFMLENBQVNKLEtBQVQsSUFBa0IsRUFBdEIsRUFBMEI7QUFDMUIsb0JBQUlGLGFBQWFmLE1BQWpCLEVBQXdCO0FBQUM7QUFDckJRLDRCQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQSx5QkFBS1gsTUFBTCxHQUFjLENBQWQ7QUFDSCxpQkFIRCxNQUdNO0FBQUM7QUFDSFUsNEJBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLHlCQUFLWCxNQUFMLEdBQWMsQ0FBQyxDQUFmO0FBQ0g7QUFDTixhQTNCSztBQTRCTndCLGdCQTVCTSxrQkE0QkE7QUFDRixxQkFBS3hCLE1BQUwsR0FBYyxDQUFkOztBQUVBLHFCQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNILGFBaENLO0FBaUNOd0Isa0JBakNNLG9CQWlDRTtBQUNKLHFCQUFLekIsTUFBTCxHQUFjLENBQWQ7QUFDQSxxQkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDSCxhQXBDSztBQXFDTnlCLHdCQXJDTSwwQkFxQ1E7QUFDVjtBQUNBLHFCQUFLekIsT0FBTCxHQUFlLEtBQWY7QUFDSDtBQXhDSyxTOzs7Ozs4QkEwQ0owQixLLEVBQU9DLEcsRUFBSztBQUNmLGdCQUFJQyxLQUFLRCxJQUFJUixDQUFKLEdBQVFPLE1BQU1QLENBQXZCO0FBQUEsZ0JBQ0VVLEtBQUtGLElBQUlQLENBQUosR0FBUU0sTUFBTU4sQ0FEckI7QUFFQTtBQUNBLG1CQUFPLE1BQU1DLEtBQUtTLElBQUwsQ0FBVUQsS0FBS0QsRUFBZixDQUFOLElBQTRCLElBQUlQLEtBQUtVLEVBQXJDLENBQVA7QUFDRjs7OztFQTFEa0MsZUFBS0MsSTs7a0JBQXZCckMsUyIsImZpbGUiOiJhdHRlbnRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IExpc3ROZXdzIGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdG5ld3MnO1xuaW1wb3J0IE5hdkJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdmJhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGVudGlvbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge307XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgJ25hdi1iYXInIDogTmF2QmFyXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICBzdGF0dXMgOiAwLCAvL+ehruWIh+WIsOavj+S4qlxuICAgICAgICBzaG93QmFyOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrlupXpg6jliKDpmaTmk43kvZxcbiAgICAgICAgc3RhcnRYIDogMCxcbiAgICAgICAgc3RhcnRZOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRvdWNoc3RhcnQoZSl7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoc3RhcnQnLGUpO1xuICAgICAgICB9LFxuICAgICAgICB0b3VjaG1vdmUoZSl7XG4gICAgICAgICAgICBpZih0aGlzLnN0YXR1cz09MSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LC8v5b2T5YmN57Si5byVXG4gICAgICAgICAgICAgIHN0YXJ0WCA9IHRoYXQuc3RhcnRYLC8v5byA5aeLWOWdkOagh1xuICAgICAgICAgICAgICBzdGFydFkgPSB0aGF0LnN0YXJ0WSwvL+W8gOWni1nlnZDmoIdcbiAgICAgICAgICAgICAgdG91Y2hNb3ZlWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwvL+a7keWKqOWPmOWMluWdkOagh1xuICAgICAgICAgICAgICB0b3VjaE1vdmVZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLC8v5ruR5Yqo5Y+Y5YyW5Z2Q5qCHXG4gICAgICAgICAgICAgIC8v6I635Y+W5ruR5Yqo6KeS5bqmXG4gICAgICAgICAgICAgIGFuZ2xlID0gdGhhdC5hbmdsZSh7IFg6IHN0YXJ0WCwgWTogc3RhcnRZIH0sIHsgWDogdG91Y2hNb3ZlWCwgWTogdG91Y2hNb3ZlWSB9KTtcbiAgICAgICAgICAgICAgLy/mu5HliqjotoXov4czMOW6puinkiByZXR1cm5cbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlKSA+IDMwKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmICh0b3VjaE1vdmVYID4gc3RhcnRYKXsvL+WPs+a7kVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNobW92ZSByaWdodCcpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICB9ZWxzZSB7Ly/lt6bmu5FcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b3VjaG1vdmUgbGVmdCcpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAtMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlZGl0KCl7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd0JhciA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpe1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaG93QmFyID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZVNlbGVjdCgpe1xuICAgICAgICAgICAgLy9hamF4XG4gICAgICAgICAgICB0aGlzLnNob3dCYXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbmdsZShzdGFydCwgZW5kKSB7XG4gICAgICAgdmFyIF9YID0gZW5kLlggLSBzdGFydC5YLFxuICAgICAgICAgX1kgPSBlbmQuWSAtIHN0YXJ0LllcbiAgICAgICAvL+i/lOWbnuinkuW6piAvTWF0aC5hdGFuKCnov5Tlm57mlbDlrZfnmoTlj43mraPliIflgLxcbiAgICAgICByZXR1cm4gMzYwICogTWF0aC5hdGFuKF9ZIC8gX1gpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICB9XG59XG4iXX0=