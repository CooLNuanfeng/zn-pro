'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var imgUploadForm = function (_wepy$component) {
    _inherits(imgUploadForm, _wepy$component);

    function imgUploadForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, imgUploadForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = imgUploadForm.__proto__ || Object.getPrototypeOf(imgUploadForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            imgArr: [],
            count: 6
        }, _this.methods = {
            chooseImage: function chooseImage() {
                var vm = this;
                var count = vm.imgArr.length;
                wx.chooseImage({
                    count: 6 - count,
                    success: function success(res) {
                        console.log(res.tempFilePaths);
                        // vm.imgArr = ['http://tmp/wx05a410e096d90371.o6zAJs2vU4v0NWQs1dXXwMkiW_xo.a825c92d16fa95b84fd3e8c211e72511.jpg'];
                        var len = res.tempFilePaths.length;
                        for (var i = 0; i < len; i++) {
                            vm.imgArr.push(res.tempFilePaths[i]);
                        }
                        // vm.imgArr = res.tempFilePaths;
                        vm.$apply();
                    }
                });
            },
            del: function del(index) {
                this.imgArr.splice(index, 1);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return imgUploadForm;
}(_wepy2.default.component);

exports.default = imgUploadForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZ3VwbG9hZC5qcyJdLCJuYW1lcyI6WyJpbWdVcGxvYWRGb3JtIiwiZGF0YSIsImltZ0FyciIsImNvdW50IiwibWV0aG9kcyIsImNob29zZUltYWdlIiwidm0iLCJsZW5ndGgiLCJ3eCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidGVtcEZpbGVQYXRocyIsImxlbiIsImkiLCJwdXNoIiwiJGFwcGx5IiwiZGVsIiwiaW5kZXgiLCJzcGxpY2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozt3TUFDakJDLEksR0FBTztBQUNIQyxvQkFBUyxFQUROO0FBRUhDLG1CQUFRO0FBRkwsUyxRQUlQQyxPLEdBQVU7QUFDTkMsdUJBRE0seUJBQ087QUFDVCxvQkFBSUMsS0FBSyxJQUFUO0FBQ0Esb0JBQUlILFFBQVFHLEdBQUdKLE1BQUgsQ0FBVUssTUFBdEI7QUFDQUMsbUJBQUdILFdBQUgsQ0FBZTtBQUNYRiwyQkFBUSxJQUFFQSxLQURDO0FBRVhNLDZCQUFVLGlCQUFTQyxHQUFULEVBQWE7QUFDbkJDLGdDQUFRQyxHQUFSLENBQVlGLElBQUlHLGFBQWhCO0FBQ0E7QUFDQSw0QkFBSUMsTUFBTUosSUFBSUcsYUFBSixDQUFrQk4sTUFBNUI7QUFDQSw2QkFBSSxJQUFJUSxJQUFFLENBQVYsRUFBYUEsSUFBRUQsR0FBZixFQUFvQkMsR0FBcEIsRUFBd0I7QUFDcEJULCtCQUFHSixNQUFILENBQVVjLElBQVYsQ0FBZU4sSUFBSUcsYUFBSixDQUFrQkUsQ0FBbEIsQ0FBZjtBQUNIO0FBQ0Q7QUFDQVQsMkJBQUdXLE1BQUg7QUFDSDtBQVhVLGlCQUFmO0FBYUgsYUFqQks7QUFrQk5DLGVBbEJNLGVBa0JGQyxLQWxCRSxFQWtCSTtBQUNOLHFCQUFLakIsTUFBTCxDQUFZa0IsTUFBWixDQUFtQkQsS0FBbkIsRUFBeUIsQ0FBekI7QUFDSDtBQXBCSyxTOzs7O0VBTDZCLGVBQUtFLFM7O2tCQUEzQnJCLGEiLCJmaWxlIjoiaW1ndXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW1nVXBsb2FkRm9ybSBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGltZ0FyciA6IFtdLFxuICAgICAgICBjb3VudCA6IDZcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGNob29zZUltYWdlKCl7XG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gdm0uaW1nQXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICBjb3VudCA6IDYtY291bnQsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50ZW1wRmlsZVBhdGhzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdm0uaW1nQXJyID0gWydodHRwOi8vdG1wL3d4MDVhNDEwZTA5NmQ5MDM3MS5vNnpBSnMydlU0djBOV1FzMWRYWHdNa2lXX3hvLmE4MjVjOTJkMTZmYTk1Yjg0ZmQzZThjMjExZTcyNTExLmpwZyddO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTxsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5pbWdBcnIucHVzaChyZXMudGVtcEZpbGVQYXRoc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gdm0uaW1nQXJyID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZWwoaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5pbWdBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19