"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_wepy=require("./npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_avWeappMin=require("./utils/av-weapp-min.js"),_avWeappMin2=_interopRequireDefault(_avWeappMin),myConfig={themeColor:"#51e886",themeimg:"green/",cityname:"My City",cityid:"370682"},_default=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.config={pages:["pages/index","pages/attention","pages/user","pages/category","pages/detail","pages/publish","pages/about","pages/success"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"My City",navigationBarTextStyle:"black"},tabBar:{color:"#999",selectedColor:"#51e886",backgroundColor:"#fff",list:[{pagePath:"pages/index",selectedIconPath:"images/green/index.png",iconPath:"images/index_disable.png",text:"首页"},{pagePath:"pages/attention",selectedIconPath:"images/green/attention.png",iconPath:"images/attention_disable.png",text:"关注"},{pagePath:"pages/user",selectedIconPath:"images/green/user.png",iconPath:"images/user_disable.png",text:"我的"}]}},e.globalData={userInfo:null,userNick:null,cityname:myConfig.cityname,cityid:myConfig.cityid,themeimg:myConfig.themeimg,domain:"https://oyo2k3vrc.bkt.clouddn.com",gridsArr:[{type:"job",name:"招聘信息"},{type:"sale",name:"打折促销"},{type:"home",name:"房屋租售"},{type:"car",name:"车辆交易"},{type:"find",name:"寻人寻物"},{type:"food",name:"美食推荐"},{type:"friend",name:"相亲交友"},{type:"pet",name:"宠物领养"},{type:"edu",name:"教育培训"},{type:"other",name:"其他消息"}],curUserAttention:null,refresh:!1,attrefresh:!1},e}return _inherits(t,e),_createClass(t,[{key:"onLaunch",value:function(){var e=this,t=this;t.getUserInfo(),_avWeappMin2.default.init({appId:"jrFmFaxGJEJpF5hjhUkbiGtJ-gzGzoHsz",appKey:"k8F2aQ6iRTCL0ULe6c8a4sRg"}),_avWeappMin2.default.User.loginWithWeapp().then(function(n){var a;e.globalData.userInfo=n.toJSON(),console.log(n.toJSON()),a=e.globalData.userInfo.objectId,t.findUserInfo(a)}).catch(console.error)}},{key:"findUserInfo",value:function(e){var t=new _avWeappMin2.default.Query("UserInfo"),n=this;console.log(e,"uid"),t.equalTo("uid",e),t.first().then(function(e){console.log(e,"curUserAttention"),n.globalData.curUserAttention=e.attributes.attentions}).catch(function(e){console.log(e)})}},{key:"getUserInfo",value:function(e){var t=this;if(this.globalData.userNick)return this.globalData.userNick;_wepy2.default.getUserInfo({success:function(n){t.globalData.userNick=n.userInfo,e&&e(n.userInfo)}})}},{key:"timeFormate",value:function(e){var t=new Date(e),n=t.getFullYear(),a=t.getMonth(),o=t.getDate(),r=t.getHours(),i=t.getMinutes();t.getSeconds();return n+"-"+this.toDouble(a+1)+"-"+this.toDouble(o)+" "+this.toDouble(r)+":"+this.toDouble(i)}},{key:"toDouble",value:function(e){return e<10?"0"+e:e}}]),t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default,{noPromiseAPI:["createSelectorQuery"]}));