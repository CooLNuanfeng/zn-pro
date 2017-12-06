'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _imgupload = require('./imgupload.js');

var _imgupload2 = _interopRequireDefault(_imgupload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeForm = function (_wepy$component) {
    _inherits(HomeForm, _wepy$component);

    function HomeForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, HomeForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomeForm.__proto__ || Object.getPrototypeOf(HomeForm)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            'typeIndex': 0, // 0 表示出租 1表示出售
            'typeArr': ['出租', '出售'],
            'price': '',
            'address': '',
            'homeIndex': 1,
            'homeJson': [{ 'id': '001', 'name': '一室一厅' }, { 'id': '002', 'name': '两室一厅' }, { 'id': '003', 'name': '三室一厅' }, { 'id': '004', 'name': '三室两厅' }, { 'id': '005', 'name': '四室一厅' }, { 'id': '006', 'name': '四室两厅' }, { 'id': '007', 'name': '平房' }, { 'id': '008', 'name': '其他' }],
            'homeInfoArr': [''],
            'uploadImgs': null
        }, _this.$repeat = {}, _this.$props = { "uploadform": { "xmlns:v-on": "" } }, _this.$events = { "uploadform": { "v-on:uploadEnd": "uploadChange", "v-on:uploadDel": "uploadChange" } }, _this.components = {
            'uploadform': _imgupload2.default
        }, _this.methods = {
            addressChange: function addressChange(evt) {
                this.address = evt.detail.value;
            },
            priceChange: function priceChange(evt) {
                this.price = evt.detail.value;
            },
            typeChange: function typeChange(evt) {
                this.typeIndex = evt.detail.value;
                // console.log(this.typeIndex);
            },
            homeChange: function homeChange(evt) {
                this.homeIndex = evt.detail.value;
            },
            addItem: function addItem() {
                this.homeInfoArr.push('');
            },
            itemInput: function itemInput(index, evt) {
                this.homeInfoArr[index] = evt.detail.value;
            },
            deleteItem: function deleteItem(index) {
                this.homeInfoArr.splice(index, 1);
            },
            uploadChange: function uploadChange(imgs) {
                // console.log('upload change');
                this.uploadImgs = imgs;
            }
        }, _this.events = {
            homeFetch: function homeFetch() {
                var json = {};
                json.typeJson = {
                    type: this.typeIndex,
                    name: this.typeArr[this.typeIndex]
                };
                json.address = this.address;
                json.price = this.price;
                json.homeJson = this.homeJson[this.homeIndex];
                json.homeInfoArr = this.homeInfoArr;
                json.images = this.uploadImgs;
                this.$emit('getHomeForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return HomeForm;
}(_wepy2.default.component);

exports.default = HomeForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVmb3JtLmpzIl0sIm5hbWVzIjpbIkhvbWVGb3JtIiwiZGF0YSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJhZGRyZXNzQ2hhbmdlIiwiZXZ0IiwiYWRkcmVzcyIsImRldGFpbCIsInZhbHVlIiwicHJpY2VDaGFuZ2UiLCJwcmljZSIsInR5cGVDaGFuZ2UiLCJ0eXBlSW5kZXgiLCJob21lQ2hhbmdlIiwiaG9tZUluZGV4IiwiYWRkSXRlbSIsImhvbWVJbmZvQXJyIiwicHVzaCIsIml0ZW1JbnB1dCIsImluZGV4IiwiZGVsZXRlSXRlbSIsInNwbGljZSIsInVwbG9hZENoYW5nZSIsImltZ3MiLCJ1cGxvYWRJbWdzIiwiZXZlbnRzIiwiaG9tZUZldGNoIiwianNvbiIsInR5cGVKc29uIiwidHlwZSIsIm5hbWUiLCJ0eXBlQXJyIiwiaG9tZUpzb24iLCJpbWFnZXMiLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxJLEdBQU87QUFDSCx5QkFBYyxDQURYLEVBQ2M7QUFDakIsdUJBQVksQ0FBQyxJQUFELEVBQU0sSUFBTixDQUZUO0FBR0gscUJBQVUsRUFIUDtBQUlILHVCQUFZLEVBSlQ7QUFLSCx5QkFBYyxDQUxYO0FBTUgsd0JBQWEsQ0FDVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sTUFBbkIsRUFEUyxFQUVULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxNQUFuQixFQUZTLEVBR1QsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE1BQW5CLEVBSFMsRUFJVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sTUFBbkIsRUFKUyxFQUtULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxNQUFuQixFQUxTLEVBTVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE1BQW5CLEVBTlMsRUFPVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFQUyxFQVFULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQVJTLENBTlY7QUFnQkgsMkJBQWdCLENBQUMsRUFBRCxDQWhCYjtBQWlCSCwwQkFBZTtBQWpCWixTLFFBbUJSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsY0FBYSxFQUFkLEVBQWQsRSxRQUNUQyxPLEdBQVUsRUFBQyxjQUFhLEVBQUMsa0JBQWlCLGNBQWxCLEVBQWlDLGtCQUFpQixjQUFsRCxFQUFkLEUsUUFDVEMsVSxHQUFhO0FBQ047QUFETSxTLFFBR1ZDLE8sR0FBVTtBQUNOQyx5QkFETSx5QkFDUUMsR0FEUixFQUNZO0FBQ2QscUJBQUtDLE9BQUwsR0FBZUQsSUFBSUUsTUFBSixDQUFXQyxLQUExQjtBQUNILGFBSEs7QUFJTkMsdUJBSk0sdUJBSU1KLEdBSk4sRUFJVTtBQUNaLHFCQUFLSyxLQUFMLEdBQWFMLElBQUlFLE1BQUosQ0FBV0MsS0FBeEI7QUFDSCxhQU5LO0FBT05HLHNCQVBNLHNCQU9LTixHQVBMLEVBT1M7QUFDWCxxQkFBS08sU0FBTCxHQUFpQlAsSUFBSUUsTUFBSixDQUFXQyxLQUE1QjtBQUNBO0FBQ0gsYUFWSztBQVdOSyxzQkFYTSxzQkFXS1IsR0FYTCxFQVdTO0FBQ1gscUJBQUtTLFNBQUwsR0FBaUJULElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQWJLO0FBY05PLG1CQWRNLHFCQWNHO0FBQ0wscUJBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQ0gsYUFoQks7QUFpQk5DLHFCQWpCTSxxQkFpQklDLEtBakJKLEVBaUJVZCxHQWpCVixFQWlCYztBQUNoQixxQkFBS1csV0FBTCxDQUFpQkcsS0FBakIsSUFBMEJkLElBQUlFLE1BQUosQ0FBV0MsS0FBckM7QUFDSCxhQW5CSztBQW9CTlksc0JBcEJNLHNCQW9CS0QsS0FwQkwsRUFvQlc7QUFDYixxQkFBS0gsV0FBTCxDQUFpQkssTUFBakIsQ0FBd0JGLEtBQXhCLEVBQThCLENBQTlCO0FBQ0gsYUF0Qks7QUF1Qk5HLHdCQXZCTSx3QkF1Qk9DLElBdkJQLEVBdUJZO0FBQ2Q7QUFDQSxxQkFBS0MsVUFBTCxHQUFrQkQsSUFBbEI7QUFDSDtBQTFCSyxTLFFBNEJWRSxNLEdBQVM7QUFDTEMscUJBREssdUJBQ007QUFDUCxvQkFBSUMsT0FBTyxFQUFYO0FBQ0FBLHFCQUFLQyxRQUFMLEdBQWdCO0FBQ1pDLDBCQUFPLEtBQUtqQixTQURBO0FBRVprQiwwQkFBTyxLQUFLQyxPQUFMLENBQWEsS0FBS25CLFNBQWxCO0FBRkssaUJBQWhCO0FBSUFlLHFCQUFLckIsT0FBTCxHQUFlLEtBQUtBLE9BQXBCO0FBQ0FxQixxQkFBS2pCLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBaUIscUJBQUtLLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjLEtBQUtsQixTQUFuQixDQUFoQjtBQUNBYSxxQkFBS1gsV0FBTCxHQUFtQixLQUFLQSxXQUF4QjtBQUNBVyxxQkFBS00sTUFBTCxHQUFjLEtBQUtULFVBQW5CO0FBQ0EscUJBQUtVLEtBQUwsQ0FBVyxhQUFYLEVBQXlCUCxJQUF6QjtBQUNIO0FBYkksUzs7OztFQXREMEIsZUFBS1EsUzs7a0JBQXZCdEMsUSIsImZpbGUiOiJob21lZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgaW1nVXBsb2FkRm9ybSBmcm9tICcuL2ltZ3VwbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICd0eXBlSW5kZXgnIDogMCwgLy8gMCDooajnpLrlh7rnp58gMeihqOekuuWHuuWUrlxuICAgICAgICAndHlwZUFycicgOiBbJ+WHuuennycsJ+WHuuWUriddLFxuICAgICAgICAncHJpY2UnIDogJycsXG4gICAgICAgICdhZGRyZXNzJyA6ICcnLFxuICAgICAgICAnaG9tZUluZGV4JyA6IDEsXG4gICAgICAgICdob21lSnNvbicgOiBbXG4gICAgICAgICAgICB7J2lkJzonMDAxJywnbmFtZSc6J+S4gOWupOS4gOWOhSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMicsJ25hbWUnOifkuKTlrqTkuIDljoUnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDMnLCduYW1lJzon5LiJ5a6k5LiA5Y6FJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA0JywnbmFtZSc6J+S4ieWupOS4pOWOhSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNScsJ25hbWUnOiflm5vlrqTkuIDljoUnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDYnLCduYW1lJzon5Zub5a6k5Lik5Y6FJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA3JywnbmFtZSc6J+W5s+aIvyd9LFxuICAgICAgICAgICAgeydpZCc6JzAwOCcsJ25hbWUnOiflhbbku5YnfVxuICAgICAgICBdLFxuICAgICAgICAnaG9tZUluZm9BcnInIDogWycnXSxcbiAgICAgICAgJ3VwbG9hZEltZ3MnIDogbnVsbCxcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ1cGxvYWRmb3JtXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInVwbG9hZGZvcm1cIjp7XCJ2LW9uOnVwbG9hZEVuZFwiOlwidXBsb2FkQ2hhbmdlXCIsXCJ2LW9uOnVwbG9hZERlbFwiOlwidXBsb2FkQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgICd1cGxvYWRmb3JtJyA6IGltZ1VwbG9hZEZvcm1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFkZHJlc3NDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHByaWNlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnByaWNlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZUNoYW5nZShldnQpe1xuICAgICAgICAgICAgdGhpcy50eXBlSW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy50eXBlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBob21lQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLmhvbWVJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW0oKXtcbiAgICAgICAgICAgIHRoaXMuaG9tZUluZm9BcnIucHVzaCgnJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JbnB1dChpbmRleCxldnQpe1xuICAgICAgICAgICAgdGhpcy5ob21lSW5mb0FycltpbmRleF0gPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIHRoaXMuaG9tZUluZm9BcnIuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRDaGFuZ2UoaW1ncyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndXBsb2FkIGNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRJbWdzID0gaW1ncztcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBob21lRmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICBqc29uLnR5cGVKc29uID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgOiB0aGlzLnR5cGVJbmRleCxcbiAgICAgICAgICAgICAgICBuYW1lIDogdGhpcy50eXBlQXJyW3RoaXMudHlwZUluZGV4XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGpzb24uYWRkcmVzcyA9IHRoaXMuYWRkcmVzcztcbiAgICAgICAgICAgIGpzb24ucHJpY2UgPSB0aGlzLnByaWNlO1xuICAgICAgICAgICAganNvbi5ob21lSnNvbiA9IHRoaXMuaG9tZUpzb25bdGhpcy5ob21lSW5kZXhdO1xuICAgICAgICAgICAganNvbi5ob21lSW5mb0FyciA9IHRoaXMuaG9tZUluZm9BcnI7XG4gICAgICAgICAgICBqc29uLmltYWdlcyA9IHRoaXMudXBsb2FkSW1ncztcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEhvbWVGb3JtJyxqc29uKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=