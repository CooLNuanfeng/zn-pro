'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                        // console.log(res.tempFilePaths);
                        // vm.imgArr = ['http://tmp/wx05a410e096d90371.o6zAJs2vU4v0NWQs1dXXwMkiW_xo.a825c92d16fa95b84fd3e8c211e72511.jpg'];
                        var len = res.tempFilePaths.length;
                        for (var i = 0; i < len; i++) {
                            vm.imgArr.push(res.tempFilePaths[i]);
                        }
                        // vm.imgArr = res.tempFilePaths;
                        vm.$apply();
                        vm.uploadchange();
                    }
                });
            },
            del: function del(index) {
                this.imgArr.splice(index, 1);
                this.$emit('uploadDel', this.imgArr);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(imgUploadForm, [{
        key: 'uploadchange',
        value: function uploadchange() {
            //上传图片成功
            this.$emit('uploadEnd', this.imgArr);
        }
    }]);

    return imgUploadForm;
}(_wepy2.default.component);

exports.default = imgUploadForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZ3VwbG9hZGZvcm0uanMiXSwibmFtZXMiOlsiaW1nVXBsb2FkRm9ybSIsImRhdGEiLCJpbWdBcnIiLCJjb3VudCIsIm1ldGhvZHMiLCJjaG9vc2VJbWFnZSIsInZtIiwibGVuZ3RoIiwid3giLCJzdWNjZXNzIiwicmVzIiwibGVuIiwidGVtcEZpbGVQYXRocyIsImkiLCJwdXNoIiwiJGFwcGx5IiwidXBsb2FkY2hhbmdlIiwiZGVsIiwiaW5kZXgiLCJzcGxpY2UiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxJLEdBQU87QUFDSEMsb0JBQVMsRUFETjtBQUVIQyxtQkFBUTtBQUZMLFMsUUFJUEMsTyxHQUFVO0FBQ05DLHVCQURNLHlCQUNPO0FBQ1Qsb0JBQUlDLEtBQUssSUFBVDtBQUNBLG9CQUFJSCxRQUFRRyxHQUFHSixNQUFILENBQVVLLE1BQXRCO0FBQ0FDLG1CQUFHSCxXQUFILENBQWU7QUFDWEYsMkJBQVEsSUFBRUEsS0FEQztBQUVYTSw2QkFBVSxpQkFBU0MsR0FBVCxFQUFhO0FBQ25CO0FBQ0E7QUFDQSw0QkFBSUMsTUFBTUQsSUFBSUUsYUFBSixDQUFrQkwsTUFBNUI7QUFDQSw2QkFBSSxJQUFJTSxJQUFFLENBQVYsRUFBYUEsSUFBRUYsR0FBZixFQUFvQkUsR0FBcEIsRUFBd0I7QUFDcEJQLCtCQUFHSixNQUFILENBQVVZLElBQVYsQ0FBZUosSUFBSUUsYUFBSixDQUFrQkMsQ0FBbEIsQ0FBZjtBQUNIO0FBQ0Q7QUFDQVAsMkJBQUdTLE1BQUg7QUFDQVQsMkJBQUdVLFlBQUg7QUFDSDtBQVpVLGlCQUFmO0FBY0gsYUFsQks7QUFtQk5DLGVBbkJNLGVBbUJGQyxLQW5CRSxFQW1CSTtBQUNOLHFCQUFLaEIsTUFBTCxDQUFZaUIsTUFBWixDQUFtQkQsS0FBbkIsRUFBeUIsQ0FBekI7QUFDQSxxQkFBS0UsS0FBTCxDQUFXLFdBQVgsRUFBdUIsS0FBS2xCLE1BQTVCO0FBQ0g7QUF0QkssUzs7Ozs7dUNBd0JJO0FBQUU7QUFDWixpQkFBS2tCLEtBQUwsQ0FBVyxXQUFYLEVBQXVCLEtBQUtsQixNQUE1QjtBQUNIOzs7O0VBL0JzQyxlQUFLbUIsUzs7a0JBQTNCckIsYSIsImZpbGUiOiJpbWd1cGxvYWRmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbWdVcGxvYWRGb3JtIGV4dGVuZHMgd2VweS5jb21wb25lbnR7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgaW1nQXJyIDogW10sXG4gICAgICAgIGNvdW50IDogNlxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2hvb3NlSW1hZ2UoKXtcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY291bnQgPSB2bS5pbWdBcnIubGVuZ3RoO1xuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgIGNvdW50IDogNi1jb3VudCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRlbXBGaWxlUGF0aHMpO1xuICAgICAgICAgICAgICAgICAgICAvLyB2bS5pbWdBcnIgPSBbJ2h0dHA6Ly90bXAvd3gwNWE0MTBlMDk2ZDkwMzcxLm82ekFKczJ2VTR2ME5XUXMxZFhYd01raVdfeG8uYTgyNWM5MmQxNmZhOTViODRmZDNlOGMyMTFlNzI1MTEuanBnJ107XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmltZ0Fyci5wdXNoKHJlcy50ZW1wRmlsZVBhdGhzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB2bS5pbWdBcnIgPSByZXMudGVtcEZpbGVQYXRocztcbiAgICAgICAgICAgICAgICAgICAgdm0uJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIHZtLnVwbG9hZGNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZWwoaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5pbWdBcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBsb2FkRGVsJyx0aGlzLmltZ0Fycik7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIHVwbG9hZGNoYW5nZSgpeyAvL+S4iuS8oOWbvueJh+aIkOWKn1xuICAgICAgICB0aGlzLiRlbWl0KCd1cGxvYWRFbmQnLHRoaXMuaW1nQXJyKTtcbiAgICB9XG59XG4iXX0=