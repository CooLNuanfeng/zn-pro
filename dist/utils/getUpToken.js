"use strict";function utf16to8(e){var r,a,o,t;for(r="",o=e.length,a=0;a<o;a++)t=e.charCodeAt(a),t>=1&&t<=127?r+=e.charAt(a):t>2047?(r+=String.fromCharCode(224|t>>12&15),r+=String.fromCharCode(128|t>>6&63),r+=String.fromCharCode(128|t>>0&63)):(r+=String.fromCharCode(192|t>>6&31),r+=String.fromCharCode(128|t>>0&63));return r}function utf8to16(e){var r,a,o,t,c,h;for(r="",o=e.length,a=0;a<o;)switch((t=e.charCodeAt(a++))>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:r+=e.charAt(a-1);break;case 12:case 13:c=e.charCodeAt(a++),r+=String.fromCharCode((31&t)<<6|63&c);break;case 14:c=e.charCodeAt(a++),h=e.charCodeAt(a++),r+=String.fromCharCode((15&t)<<12|(63&c)<<6|(63&h)<<0)}return r}function base64encode(e){var r,a,o,t,c,h;for(o=e.length,a=0,r="";a<o;){if(t=255&e.charCodeAt(a++),a==o){r+=base64EncodeChars.charAt(t>>2),r+=base64EncodeChars.charAt((3&t)<<4),r+="==";break}if(c=e.charCodeAt(a++),a==o){r+=base64EncodeChars.charAt(t>>2),r+=base64EncodeChars.charAt((3&t)<<4|(240&c)>>4),r+=base64EncodeChars.charAt((15&c)<<2),r+="=";break}h=e.charCodeAt(a++),r+=base64EncodeChars.charAt(t>>2),r+=base64EncodeChars.charAt((3&t)<<4|(240&c)>>4),r+=base64EncodeChars.charAt((15&c)<<2|(192&h)>>6),r+=base64EncodeChars.charAt(63&h)}return r}function base64decode(e){var r,a,o,t,c,h,n;for(h=e.length,c=0,n="";c<h;){do{r=base64DecodeChars[255&e.charCodeAt(c++)]}while(c<h&&-1==r);if(-1==r)break;do{a=base64DecodeChars[255&e.charCodeAt(c++)]}while(c<h&&-1==a);if(-1==a)break;n+=String.fromCharCode(r<<2|(48&a)>>4);do{if(61==(o=255&e.charCodeAt(c++)))return n;o=base64DecodeChars[o]}while(c<h&&-1==o);if(-1==o)break;n+=String.fromCharCode((15&a)<<4|(60&o)>>2);do{if(61==(t=255&e.charCodeAt(c++)))return n;t=base64DecodeChars[t]}while(c<h&&-1==t);if(-1==t)break;n+=String.fromCharCode((3&o)<<6|t)}return n}function genToken(e,r,a){var o=JSON.stringify(a),t=base64encode(utf16to8(o)),c=CryptoJS.HmacSHA1(t,r),h=c.toString(CryptoJS.enc.Base64);return e+":"+safe64(h)+":"+t}var CryptoJS=require("./crypto-js.js"),base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1),safe64=function(e){return e=e.replace(/\+/g,"-"),e=e.replace(/\//g,"_")};module.exports={genToken:genToken};