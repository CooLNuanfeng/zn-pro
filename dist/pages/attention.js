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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dGVudGlvbi5qcyJdLCJuYW1lcyI6WyJBdHRlbnRpb24iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXR1cyIsInNob3dCYXIiLCJzdGFydFgiLCJzdGFydFkiLCJtZXRob2RzIiwidG91Y2hzdGFydCIsImUiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY29uc29sZSIsImxvZyIsInRvdWNobW92ZSIsInRoYXQiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidG91Y2hNb3ZlWCIsInRvdWNoTW92ZVkiLCJhbmdsZSIsIlgiLCJZIiwiTWF0aCIsImFicyIsImdvRGV0YWlsIiwicGFyYW1zIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZWRpdCIsImNhbmNlbCIsImRlbGV0ZVNlbGVjdCIsInN0YXJ0IiwiZW5kIiwiX1giLCJfWSIsImF0YW4iLCJQSSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUyxFLFFBQ1RDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQUdiQyxJLEdBQU87QUFDSEMsb0JBQVMsQ0FETixFQUNTO0FBQ1pDLHFCQUFTLEtBRk4sRUFFYTtBQUNoQkMsb0JBQVMsQ0FITjtBQUlIQyxvQkFBUTtBQUpMLFMsUUFNUEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxDQURMLEVBQ087QUFDVCxxQkFBS0osTUFBTCxHQUFjSSxFQUFFQyxjQUFGLENBQWlCLENBQWpCLEVBQW9CQyxPQUFsQztBQUNBLHFCQUFLTCxNQUFMLEdBQWNHLEVBQUVDLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JFLE9BQWxDO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVksWUFBWixFQUF5QkwsQ0FBekI7QUFDSCxhQUxLO0FBTU5NLHFCQU5NLHFCQU1JTixDQU5KLEVBTU07QUFDUixvQkFBRyxLQUFLTixNQUFMLElBQWEsQ0FBaEIsRUFBa0I7QUFDZDtBQUNIO0FBQ0Qsb0JBQUlhLE9BQU8sSUFBWDtBQUFBLG9CQUNFQyxRQUFRUixFQUFFUyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsS0FEbEM7QUFBQSxvQkFDd0M7QUFDdENaLHlCQUFTVyxLQUFLWCxNQUZoQjtBQUFBLG9CQUV1QjtBQUNyQkMseUJBQVNVLEtBQUtWLE1BSGhCO0FBQUEsb0JBR3VCO0FBQ3JCYyw2QkFBYVgsRUFBRUMsY0FBRixDQUFpQixDQUFqQixFQUFvQkMsT0FKbkM7QUFBQSxvQkFJMkM7QUFDekNVLDZCQUFhWixFQUFFQyxjQUFGLENBQWlCLENBQWpCLEVBQW9CRSxPQUxuQztBQUFBLG9CQUsyQztBQUN6QztBQUNBVSx3QkFBUU4sS0FBS00sS0FBTCxDQUFXLEVBQUVDLEdBQUdsQixNQUFMLEVBQWFtQixHQUFHbEIsTUFBaEIsRUFBWCxFQUFxQyxFQUFFaUIsR0FBR0gsVUFBTCxFQUFpQkksR0FBR0gsVUFBcEIsRUFBckMsQ0FQVjtBQVFFO0FBQ0Esb0JBQUlJLEtBQUtDLEdBQUwsQ0FBU0osS0FBVCxJQUFrQixFQUF0QixFQUEwQjtBQUMxQixvQkFBSUYsYUFBYWYsTUFBakIsRUFBd0I7QUFBQztBQUNyQlEsNEJBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLHlCQUFLWCxNQUFMLEdBQWMsQ0FBZDtBQUNILGlCQUhELE1BR007QUFBQztBQUNIVSw0QkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0EseUJBQUtYLE1BQUwsR0FBYyxDQUFDLENBQWY7QUFDSDtBQUNOLGFBM0JLO0FBNEJOd0Isb0JBNUJNLG9CQTRCR0MsTUE1QkgsRUE0QlU7QUFDWmYsd0JBQVFDLEdBQVIsQ0FBWWMsTUFBWjtBQUNBQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFNO0FBREksaUJBQWQ7QUFHSCxhQWpDSztBQWtDTkMsZ0JBbENNLGtCQWtDQTtBQUNGLHFCQUFLN0IsTUFBTCxHQUFjLENBQWQ7O0FBRUEscUJBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0gsYUF0Q0s7QUF1Q042QixrQkF2Q00sb0JBdUNFO0FBQ0oscUJBQUs5QixNQUFMLEdBQWMsQ0FBZDtBQUNBLHFCQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNILGFBMUNLO0FBMkNOOEIsd0JBM0NNLDBCQTJDUTtBQUNWO0FBQ0EscUJBQUs5QixPQUFMLEdBQWUsS0FBZjtBQUNIO0FBOUNLLFM7Ozs7OzhCQWdESitCLEssRUFBT0MsRyxFQUFLO0FBQ2YsZ0JBQUlDLEtBQUtELElBQUliLENBQUosR0FBUVksTUFBTVosQ0FBdkI7QUFBQSxnQkFDRWUsS0FBS0YsSUFBSVosQ0FBSixHQUFRVyxNQUFNWCxDQURyQjtBQUVBO0FBQ0EsbUJBQU8sTUFBTUMsS0FBS2MsSUFBTCxDQUFVRCxLQUFLRCxFQUFmLENBQU4sSUFBNEIsSUFBSVosS0FBS2UsRUFBckMsQ0FBUDtBQUNGOzs7O0VBaEVrQyxlQUFLQyxJOztrQkFBdkIxQyxTIiwiZmlsZSI6ImF0dGVudGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgTGlzdE5ld3MgZnJvbSAnLi4vY29tcG9uZW50cy9saXN0bmV3cyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4uL2NvbXBvbmVudHMvbmF2YmFyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0ZW50aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7fTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICAnbmF2LWJhcicgOiBOYXZCYXJcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHN0YXR1cyA6IDAsIC8v56Gu5YiH5Yiw5q+P5LiqXG4gICAgICAgIHNob3dCYXI6IGZhbHNlLCAvL+aYr+WQpuaYvuekuuW6lemDqOWIoOmZpOaTjeS9nFxuICAgICAgICBzdGFydFggOiAwLFxuICAgICAgICBzdGFydFk6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgdG91Y2hzdGFydChlKXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5zdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG91Y2hzdGFydCcsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNobW92ZShlKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdHVzPT0xKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgIGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsLy/lvZPliY3ntKLlvJVcbiAgICAgICAgICAgICAgc3RhcnRYID0gdGhhdC5zdGFydFgsLy/lvIDlp4tY5Z2Q5qCHXG4gICAgICAgICAgICAgIHN0YXJ0WSA9IHRoYXQuc3RhcnRZLC8v5byA5aeLWeWdkOagh1xuICAgICAgICAgICAgICB0b3VjaE1vdmVYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLC8v5ruR5Yqo5Y+Y5YyW5Z2Q5qCHXG4gICAgICAgICAgICAgIHRvdWNoTW92ZVkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFksLy/mu5Hliqjlj5jljJblnZDmoIdcbiAgICAgICAgICAgICAgLy/ojrflj5bmu5Hliqjop5LluqZcbiAgICAgICAgICAgICAgYW5nbGUgPSB0aGF0LmFuZ2xlKHsgWDogc3RhcnRYLCBZOiBzdGFydFkgfSwgeyBYOiB0b3VjaE1vdmVYLCBZOiB0b3VjaE1vdmVZIH0pO1xuICAgICAgICAgICAgICAvL+a7keWKqOi2hei/hzMw5bqm6KeSIHJldHVyblxuICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpID4gMzApIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHRvdWNoTW92ZVggPiBzdGFydFgpey8v5Y+z5ruRXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG91Y2htb3ZlIHJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgIH1lbHNlIHsvL+W3pua7kVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNobW92ZSBsZWZ0Jyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IC0xO1xuICAgICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdvRGV0YWlsKHBhcmFtcyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsIDogJ2RldGFpbCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlZGl0KCl7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd0JhciA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpe1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaG93QmFyID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZVNlbGVjdCgpe1xuICAgICAgICAgICAgLy9hamF4XG4gICAgICAgICAgICB0aGlzLnNob3dCYXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbmdsZShzdGFydCwgZW5kKSB7XG4gICAgICAgdmFyIF9YID0gZW5kLlggLSBzdGFydC5YLFxuICAgICAgICAgX1kgPSBlbmQuWSAtIHN0YXJ0LllcbiAgICAgICAvL+i/lOWbnuinkuW6piAvTWF0aC5hdGFuKCnov5Tlm57mlbDlrZfnmoTlj43mraPliIflgLxcbiAgICAgICByZXR1cm4gMzYwICogTWF0aC5hdGFuKF9ZIC8gX1gpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICB9XG59XG4iXX0=