"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_avWeappMin=require("./../utils/av-weapp-min.js"),_avWeappMin2=_interopRequireDefault(_avWeappMin),_userattentions=require("./../models/userattentions.js"),_userattentions2=_interopRequireDefault(_userattentions),ListNews=function(e){function t(){var e,n,a,o;_classCallCheck(this,t);for(var r=arguments.length,i=Array(r),s=0;s<r;s++)i[s]=arguments[s];return n=a=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),a.data={themeimg:"",ajaxPedding:!1},a.props={lists:Array},a.methods={goDetail:function(e){wx.navigateTo({url:"detail?id="+e})},doPhone:function(e){wx.makePhoneCall({phoneNumber:e})},doAttention:function(e,t){if(!e.attentionStatus&&!this.ajaxPedding){var n=this,a=n.$parent.$parent.globalData.userInfo.objectId,o=new _userattentions2.default;n.ajaxPedding=!0,n.showLoading(),o.set("uid",a),o.set("pageid",e.id),o.set("pagedata",e),o.save().then(function(a){n.hideLoading(),n.ajaxPedding=!1,n.lists[t].attentionStatus=1,n.$parent.$parent.globalData.curUserAttention.push(e.id),n.$parent.$parent.globalData.curUserAttentJsonArr.push({pid:e.id,oid:a.id}),n.$parent.$parent.globalData.attrefresh=!0,n.$apply()}).catch(function(e){n.hideLoading(),n.ajaxPedding=!1,n.$invoke("toast","show",{message:"服务异常，请稍后重试"})})}}},o=n,_possibleConstructorReturn(a,o)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){this.themeimg=this.$parent.$parent.globalData.themeimg}},{key:"showLoading",value:function(){wx.showLoading({title:"请稍等..."})}},{key:"hideLoading",value:function(){setTimeout(function(){wx.hideLoading()},200)}}]),t}(_wepy2.default.component);exports.default=ListNews;