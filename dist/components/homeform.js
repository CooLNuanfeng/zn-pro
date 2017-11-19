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
            'homeIndex': 1,
            'homeJson': [{ 'id': '001', 'name': '一室一厅' }, { 'id': '002', 'name': '两室一厅' }, { 'id': '003', 'name': '三室一厅' }, { 'id': '004', 'name': '三室两厅' }, { 'id': '005', 'name': '四室一厅' }, { 'id': '006', 'name': '四室两厅' }, { 'id': '007', 'name': '平房' }, { 'id': '008', 'name': '其他' }],
            'homeInfoArr': ['']
        }, _this.methods = {
            typeChange: function typeChange(evt) {
                this.typeIndex = evt.detail.value;
                console.log(this.typeIndex);
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
            }
        }, _this.events = {
            fetch: function fetch() {
                var json = {};

                this.$emit('getForm', json);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return HomeForm;
}(_wepy2.default.component);

exports.default = HomeForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVmb3JtLmpzIl0sIm5hbWVzIjpbIkhvbWVGb3JtIiwiZGF0YSIsIm1ldGhvZHMiLCJ0eXBlQ2hhbmdlIiwiZXZ0IiwidHlwZUluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiaG9tZUNoYW5nZSIsImhvbWVJbmRleCIsImFkZEl0ZW0iLCJob21lSW5mb0FyciIsInB1c2giLCJpdGVtSW5wdXQiLCJpbmRleCIsImRlbGV0ZUl0ZW0iLCJzcGxpY2UiLCJldmVudHMiLCJmZXRjaCIsImpzb24iLCIkZW1pdCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0gseUJBQWMsQ0FEWCxFQUNjO0FBQ2pCLHVCQUFZLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FGVDtBQUdILHFCQUFVLEVBSFA7QUFJSCx5QkFBYyxDQUpYO0FBS0gsd0JBQWEsQ0FDVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sTUFBbkIsRUFEUyxFQUVULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxNQUFuQixFQUZTLEVBR1QsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE1BQW5CLEVBSFMsRUFJVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sTUFBbkIsRUFKUyxFQUtULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxNQUFuQixFQUxTLEVBTVQsRUFBQyxNQUFLLEtBQU4sRUFBWSxRQUFPLE1BQW5CLEVBTlMsRUFPVCxFQUFDLE1BQUssS0FBTixFQUFZLFFBQU8sSUFBbkIsRUFQUyxFQVFULEVBQUMsTUFBSyxLQUFOLEVBQVksUUFBTyxJQUFuQixFQVJTLENBTFY7QUFlSCwyQkFBZ0IsQ0FBQyxFQUFEO0FBZmIsUyxRQWlCUEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxHQURMLEVBQ1M7QUFDWCxxQkFBS0MsU0FBTCxHQUFpQkQsSUFBSUUsTUFBSixDQUFXQyxLQUE1QjtBQUNBQyx3QkFBUUMsR0FBUixDQUFZLEtBQUtKLFNBQWpCO0FBQ0gsYUFKSztBQUtOSyxzQkFMTSxzQkFLS04sR0FMTCxFQUtTO0FBQ1gscUJBQUtPLFNBQUwsR0FBaUJQLElBQUlFLE1BQUosQ0FBV0MsS0FBNUI7QUFDSCxhQVBLO0FBUU5LLG1CQVJNLHFCQVFHO0FBQ0wscUJBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQ0gsYUFWSztBQVdOQyxxQkFYTSxxQkFXSUMsS0FYSixFQVdVWixHQVhWLEVBV2M7QUFDaEIscUJBQUtTLFdBQUwsQ0FBaUJHLEtBQWpCLElBQTBCWixJQUFJRSxNQUFKLENBQVdDLEtBQXJDO0FBQ0gsYUFiSztBQWNOVSxzQkFkTSxzQkFjS0QsS0FkTCxFQWNXO0FBQ2IscUJBQUtILFdBQUwsQ0FBaUJLLE1BQWpCLENBQXdCRixLQUF4QixFQUE4QixDQUE5QjtBQUNIO0FBaEJLLFMsUUFrQlZHLE0sR0FBUztBQUNMQyxpQkFESyxtQkFDRTtBQUNILG9CQUFJQyxPQUFPLEVBQVg7O0FBRUEscUJBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXFCRCxJQUFyQjtBQUNIO0FBTEksUzs7OztFQXBDMEIsZUFBS0UsUzs7a0JBQXZCdkIsUSIsImZpbGUiOiJob21lZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVGb3JtICBleHRlbmRzIHdlcHkuY29tcG9uZW50e1xuICAgIGRhdGEgPSB7XG4gICAgICAgICd0eXBlSW5kZXgnIDogMCwgLy8gMCDooajnpLrlh7rnp58gMeihqOekuuWHuuWUrlxuICAgICAgICAndHlwZUFycicgOiBbJ+WHuuennycsJ+WHuuWUriddLFxuICAgICAgICAncHJpY2UnIDogJycsXG4gICAgICAgICdob21lSW5kZXgnIDogMSxcbiAgICAgICAgJ2hvbWVKc29uJyA6IFtcbiAgICAgICAgICAgIHsnaWQnOicwMDEnLCduYW1lJzon5LiA5a6k5LiA5Y6FJ30sXG4gICAgICAgICAgICB7J2lkJzonMDAyJywnbmFtZSc6J+S4pOWupOS4gOWOhSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwMycsJ25hbWUnOifkuInlrqTkuIDljoUnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDQnLCduYW1lJzon5LiJ5a6k5Lik5Y6FJ30sXG4gICAgICAgICAgICB7J2lkJzonMDA1JywnbmFtZSc6J+Wbm+WupOS4gOWOhSd9LFxuICAgICAgICAgICAgeydpZCc6JzAwNicsJ25hbWUnOiflm5vlrqTkuKTljoUnfSxcbiAgICAgICAgICAgIHsnaWQnOicwMDcnLCduYW1lJzon5bmz5oi/J30sXG4gICAgICAgICAgICB7J2lkJzonMDA4JywnbmFtZSc6J+WFtuS7lid9XG4gICAgICAgIF0sXG4gICAgICAgICdob21lSW5mb0FycicgOiBbJyddXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0eXBlQ2hhbmdlKGV2dCl7XG4gICAgICAgICAgICB0aGlzLnR5cGVJbmRleCA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhvbWVDaGFuZ2UoZXZ0KXtcbiAgICAgICAgICAgIHRoaXMuaG9tZUluZGV4ID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbSgpe1xuICAgICAgICAgICAgdGhpcy5ob21lSW5mb0Fyci5wdXNoKCcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlucHV0KGluZGV4LGV2dCl7XG4gICAgICAgICAgICB0aGlzLmhvbWVJbmZvQXJyW2luZGV4XSA9IGV2dC5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW0oaW5kZXgpe1xuICAgICAgICAgICAgdGhpcy5ob21lSW5mb0Fyci5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgZmV0Y2goKXtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dldEZvcm0nLGpzb24pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==