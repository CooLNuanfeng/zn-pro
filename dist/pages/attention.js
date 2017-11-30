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
            themeimg: '',
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
            goDetail: function goDetail(params) {
                console.log(params);
                wx.navigateTo({
                    url: 'detail'
                });
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
        key: 'onLoad',
        value: function onLoad() {
            this.themeimg = this.$parent.globalData.themeimg;
        }
    }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVudGlvbi5qcyJdLCJuYW1lcyI6WyJBdHRlbnRpb24iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInRoZW1laW1nIiwic3RhdHVzIiwic2hvd0JhciIsInN0YXJ0WCIsInN0YXJ0WSIsIm1ldGhvZHMiLCJ0b3VjaHN0YXJ0IiwiZSIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb25zb2xlIiwibG9nIiwidG91Y2htb3ZlIiwidGhhdCIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ0b3VjaE1vdmVYIiwidG91Y2hNb3ZlWSIsImFuZ2xlIiwiWCIsIlkiLCJNYXRoIiwiYWJzIiwiZ29EZXRhaWwiLCJwYXJhbXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlZGl0IiwiY2FuY2VsIiwiZGVsZXRlU2VsZWN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdGFydCIsImVuZCIsIl9YIiwiX1kiLCJhdGFuIiwiUEkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Z01BQ2pCQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWE7QUFDVDtBQURTLFMsUUFHYkMsSSxHQUFPO0FBQ0hDLHNCQUFXLEVBRFI7QUFFSEMsb0JBQVMsQ0FGTixFQUVTO0FBQ1pDLHFCQUFTLEtBSE4sRUFHYTtBQUNoQkMsb0JBQVMsQ0FKTjtBQUtIQyxvQkFBUTtBQUxMLFMsUUFPUEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxDQURMLEVBQ087QUFDVCxxQkFBS0osTUFBTCxHQUFjSSxFQUFFQyxjQUFGLENBQWlCLENBQWpCLEVBQW9CQyxPQUFsQztBQUNBLHFCQUFLTCxNQUFMLEdBQWNHLEVBQUVDLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JFLE9BQWxDO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVksWUFBWixFQUF5QkwsQ0FBekI7QUFDSCxhQUxLO0FBTU5NLHFCQU5NLHFCQU1JTixDQU5KLEVBTU07QUFDUixvQkFBRyxLQUFLTixNQUFMLElBQWEsQ0FBaEIsRUFBa0I7QUFDZDtBQUNIO0FBQ0Qsb0JBQUlhLE9BQU8sSUFBWDtBQUFBLG9CQUNFQyxRQUFRUixFQUFFUyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsS0FEbEM7QUFBQSxvQkFDd0M7QUFDdENaLHlCQUFTVyxLQUFLWCxNQUZoQjtBQUFBLG9CQUV1QjtBQUNyQkMseUJBQVNVLEtBQUtWLE1BSGhCO0FBQUEsb0JBR3VCO0FBQ3JCYyw2QkFBYVgsRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkMsT0FKbkM7QUFBQSxvQkFJMkM7QUFDekNVLDZCQUFhWixFQUFFQyxjQUFGLENBQWlCLENBQWpCLEVBQW9CRSxPQUxuQztBQUFBLG9CQUsyQztBQUN6QztBQUNBVSx3QkFBUU4sS0FBS00sS0FBTCxDQUFXLEVBQUVDLEdBQUdsQixNQUFMLEVBQWFtQixHQUFHbEIsTUFBaEIsRUFBWCxFQUFxQyxFQUFFaUIsR0FBR0gsVUFBTCxFQUFpQkksR0FBR0gsVUFBcEIsRUFBckMsQ0FQVjtBQVFFO0FBQ0Esb0JBQUlJLEtBQUtDLEdBQUwsQ0FBU0osS0FBVCxJQUFrQixFQUF0QixFQUEwQjtBQUMxQixvQkFBSUYsYUFBYWYsTUFBakIsRUFBd0I7QUFBQztBQUNyQlEsNEJBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLHlCQUFLWCxNQUFMLEdBQWMsQ0FBZDtBQUNILGlCQUhELE1BR007QUFBQztBQUNIVSw0QkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0EseUJBQUtYLE1BQUwsR0FBYyxDQUFDLENBQWY7QUFDSDtBQUNOLGFBM0JLO0FBNEJOd0Isb0JBNUJNLG9CQTRCR0MsTUE1QkgsRUE0QlU7QUFDWmYsd0JBQVFDLEdBQVIsQ0FBWWMsTUFBWjtBQUNBQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSCxhQWpDSztBQWtDTkMsZ0JBbENNLGtCQWtDQTtBQUNGLHFCQUFLN0IsTUFBTCxHQUFjLENBQWQ7O0FBRUEscUJBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0gsYUF0Q0s7QUF1Q042QixrQkF2Q00sb0JBdUNFO0FBQ0oscUJBQUs5QixNQUFMLEdBQWMsQ0FBZDtBQUNBLHFCQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNILGFBMUNLO0FBMkNOOEIsd0JBM0NNLDBCQTJDUTtBQUNWO0FBQ0EscUJBQUs5QixPQUFMLEdBQWUsS0FBZjtBQUNIO0FBOUNLLFM7Ozs7O2lDQWdERjtBQUNKLGlCQUFLRixRQUFMLEdBQWdCLEtBQUtpQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JsQyxRQUF4QztBQUNIOzs7OEJBQ0ttQyxLLEVBQU9DLEcsRUFBSztBQUNmLGdCQUFJQyxLQUFLRCxJQUFJZixDQUFKLEdBQVFjLE1BQU1kLENBQXZCO0FBQUEsZ0JBQ0VpQixLQUFLRixJQUFJZCxDQUFKLEdBQVFhLE1BQU1iLENBRHJCO0FBRUE7QUFDQSxtQkFBTyxNQUFNQyxLQUFLZ0IsSUFBTCxDQUFVRCxLQUFLRCxFQUFmLENBQU4sSUFBNEIsSUFBSWQsS0FBS2lCLEVBQXJDLENBQVA7QUFDRjs7OztFQXBFa0MsZUFBS0MsSTs7a0JBQXZCN0MsUyIsImZpbGUiOiJhdHRlbnRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IExpc3ROZXdzIGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdG5ld3MnO1xuaW1wb3J0IE5hdkJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdmJhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGVudGlvbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge307XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgJ25hdi1iYXInIDogTmF2QmFyXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICB0aGVtZWltZyA6ICcnLFxuICAgICAgICBzdGF0dXMgOiAwLCAvL+ehruWIh+WIsOavj+S4qlxuICAgICAgICBzaG93QmFyOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrlupXpg6jliKDpmaTmk43kvZxcbiAgICAgICAgc3RhcnRYIDogMCxcbiAgICAgICAgc3RhcnRZOiAwXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRvdWNoc3RhcnQoZSl7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoc3RhcnQnLGUpO1xuICAgICAgICB9LFxuICAgICAgICB0b3VjaG1vdmUoZSl7XG4gICAgICAgICAgICBpZih0aGlzLnN0YXR1cz09MSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LC8v5b2T5YmN57Si5byVXG4gICAgICAgICAgICAgIHN0YXJ0WCA9IHRoYXQuc3RhcnRYLC8v5byA5aeLWOWdkOagh1xuICAgICAgICAgICAgICBzdGFydFkgPSB0aGF0LnN0YXJ0WSwvL+W8gOWni1nlnZDmoIdcbiAgICAgICAgICAgICAgdG91Y2hNb3ZlWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwvL+a7keWKqOWPmOWMluWdkOagh1xuICAgICAgICAgICAgICB0b3VjaE1vdmVZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLC8v5ruR5Yqo5Y+Y5YyW5Z2Q5qCHXG4gICAgICAgICAgICAgIC8v6I635Y+W5ruR5Yqo6KeS5bqmXG4gICAgICAgICAgICAgIGFuZ2xlID0gdGhhdC5hbmdsZSh7IFg6IHN0YXJ0WCwgWTogc3RhcnRZIH0sIHsgWDogdG91Y2hNb3ZlWCwgWTogdG91Y2hNb3ZlWSB9KTtcbiAgICAgICAgICAgICAgLy/mu5HliqjotoXov4czMOW6puinkiByZXR1cm5cbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlKSA+IDMwKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmICh0b3VjaE1vdmVYID4gc3RhcnRYKXsvL+WPs+a7kVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNobW92ZSByaWdodCcpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICB9ZWxzZSB7Ly/lt6bmu5FcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b3VjaG1vdmUgbGVmdCcpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAtMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnb0RldGFpbChwYXJhbXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybCA6ICdkZXRhaWwnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdCgpe1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnNob3dCYXIgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvd0JhciA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVTZWxlY3QoKXtcbiAgICAgICAgICAgIC8vYWpheFxuICAgICAgICAgICAgdGhpcy5zaG93QmFyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMudGhlbWVpbWcgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS50aGVtZWltZztcbiAgICB9XG4gICAgYW5nbGUoc3RhcnQsIGVuZCkge1xuICAgICAgIHZhciBfWCA9IGVuZC5YIC0gc3RhcnQuWCxcbiAgICAgICAgIF9ZID0gZW5kLlkgLSBzdGFydC5ZXG4gICAgICAgLy/ov5Tlm57op5LluqYgL01hdGguYXRhbigp6L+U5Zue5pWw5a2X55qE5Y+N5q2j5YiH5YC8XG4gICAgICAgcmV0dXJuIDM2MCAqIE1hdGguYXRhbihfWSAvIF9YKSAvICgyICogTWF0aC5QSSk7XG4gICAgfVxufVxuIl19