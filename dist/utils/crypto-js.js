"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory();
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	} else {
		// Global (browser)
		root.CryptoJS = factory();
	}
})(undefined, function () {

	/**
  * CryptoJS core components.
  */
	var CryptoJS = CryptoJS || function (Math, undefined) {
		/*
   * Local polyfil of Object.create
   */
		var create = Object.create || function () {
			function F() {};

			return function (obj) {
				var subtype;

				F.prototype = obj;

				subtype = new F();

				F.prototype = null;

				return subtype;
			};
		}();

		/**
   * CryptoJS namespace.
   */
		var C = {};

		/**
   * Library namespace.
   */
		var C_lib = C.lib = {};

		/**
   * Base object for prototypal inheritance.
   */
		var Base = C_lib.Base = function () {

			return {
				/**
     * Creates a new object that inherits from this object.
     *
     * @param {Object} overrides Properties to copy into the new object.
     *
     * @return {Object} The new object.
     *
     * @static
     *
     * @example
     *
     *     var MyType = CryptoJS.lib.Base.extend({
     *         field: 'value',
     *
     *         method: function () {
     *         }
     *     });
     */
				extend: function extend(overrides) {
					// Spawn
					var subtype = create(this);

					// Augment
					if (overrides) {
						subtype.mixIn(overrides);
					}

					// Create default initializer
					if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
						subtype.init = function () {
							subtype.$super.init.apply(this, arguments);
						};
					}

					// Initializer's prototype is the subtype object
					subtype.init.prototype = subtype;

					// Reference supertype
					subtype.$super = this;

					return subtype;
				},

				/**
     * Extends this object and runs the init method.
     * Arguments to create() will be passed to init().
     *
     * @return {Object} The new object.
     *
     * @static
     *
     * @example
     *
     *     var instance = MyType.create();
     */
				create: function create() {
					var instance = this.extend();
					instance.init.apply(instance, arguments);

					return instance;
				},

				/**
     * Initializes a newly created object.
     * Override this method to add some logic when your objects are created.
     *
     * @example
     *
     *     var MyType = CryptoJS.lib.Base.extend({
     *         init: function () {
     *             // ...
     *         }
     *     });
     */
				init: function init() {},

				/**
     * Copies properties into this object.
     *
     * @param {Object} properties The properties to mix in.
     *
     * @example
     *
     *     MyType.mixIn({
     *         field: 'value'
     *     });
     */
				mixIn: function mixIn(properties) {
					for (var propertyName in properties) {
						if (properties.hasOwnProperty(propertyName)) {
							this[propertyName] = properties[propertyName];
						}
					}

					// IE won't copy toString using the loop above
					if (properties.hasOwnProperty('toString')) {
						this.toString = properties.toString;
					}
				},

				/**
     * Creates a copy of this object.
     *
     * @return {Object} The clone.
     *
     * @example
     *
     *     var clone = instance.clone();
     */
				clone: function clone() {
					return this.init.prototype.extend(this);
				}
			};
		}();

		/**
   * An array of 32-bit words.
   *
   * @property {Array} words The array of 32-bit words.
   * @property {number} sigBytes The number of significant bytes in this word array.
   */
		var WordArray = C_lib.WordArray = Base.extend({
			/**
    * Initializes a newly created word array.
    *
    * @param {Array} words (Optional) An array of 32-bit words.
    * @param {number} sigBytes (Optional) The number of significant bytes in the words.
    *
    * @example
    *
    *     var wordArray = CryptoJS.lib.WordArray.create();
    *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
    *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
    */
			init: function init(words, sigBytes) {
				words = this.words = words || [];

				if (sigBytes != undefined) {
					this.sigBytes = sigBytes;
				} else {
					this.sigBytes = words.length * 4;
				}
			},

			/**
    * Converts this word array to a string.
    *
    * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
    *
    * @return {string} The stringified word array.
    *
    * @example
    *
    *     var string = wordArray + '';
    *     var string = wordArray.toString();
    *     var string = wordArray.toString(CryptoJS.enc.Utf8);
    */
			toString: function toString(encoder) {
				return (encoder || Hex).stringify(this);
			},

			/**
    * Concatenates a word array to this word array.
    *
    * @param {WordArray} wordArray The word array to append.
    *
    * @return {WordArray} This word array.
    *
    * @example
    *
    *     wordArray1.concat(wordArray2);
    */
			concat: function concat(wordArray) {
				// Shortcuts
				var thisWords = this.words;
				var thatWords = wordArray.words;
				var thisSigBytes = this.sigBytes;
				var thatSigBytes = wordArray.sigBytes;

				// Clamp excess bits
				this.clamp();

				// Concat
				if (thisSigBytes % 4) {
					// Copy one byte at a time
					for (var i = 0; i < thatSigBytes; i++) {
						var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
						thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
					}
				} else {
					// Copy one word at a time
					for (var i = 0; i < thatSigBytes; i += 4) {
						thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
					}
				}
				this.sigBytes += thatSigBytes;

				// Chainable
				return this;
			},

			/**
    * Removes insignificant bits.
    *
    * @example
    *
    *     wordArray.clamp();
    */
			clamp: function clamp() {
				// Shortcuts
				var words = this.words;
				var sigBytes = this.sigBytes;

				// Clamp
				words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
				words.length = Math.ceil(sigBytes / 4);
			},

			/**
    * Creates a copy of this word array.
    *
    * @return {WordArray} The clone.
    *
    * @example
    *
    *     var clone = wordArray.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);
				clone.words = this.words.slice(0);

				return clone;
			},

			/**
    * Creates a word array filled with random bytes.
    *
    * @param {number} nBytes The number of random bytes to generate.
    *
    * @return {WordArray} The random word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.lib.WordArray.random(16);
    */
			random: function random(nBytes) {
				var words = [];

				var r = function r(m_w) {
					var m_w = m_w;
					var m_z = 0x3ade68b1;
					var mask = 0xffffffff;

					return function () {
						m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
						m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
						var result = (m_z << 0x10) + m_w & mask;
						result /= 0x100000000;
						result += 0.5;
						return result * (Math.random() > .5 ? 1 : -1);
					};
				};

				for (var i = 0, rcache; i < nBytes; i += 4) {
					var _r = r((rcache || Math.random()) * 0x100000000);

					rcache = _r() * 0x3ade67b7;
					words.push(_r() * 0x100000000 | 0);
				}

				return new WordArray.init(words, nBytes);
			}
		});

		/**
   * Encoder namespace.
   */
		var C_enc = C.enc = {};

		/**
   * Hex encoding strategy.
   */
		var Hex = C_enc.Hex = {
			/**
    * Converts a word array to a hex string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The hex string.
    *
    * @static
    *
    * @example
    *
    *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var hexChars = [];
				for (var i = 0; i < sigBytes; i++) {
					var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					hexChars.push((bite >>> 4).toString(16));
					hexChars.push((bite & 0x0f).toString(16));
				}

				return hexChars.join('');
			},

			/**
    * Converts a hex string to a word array.
    *
    * @param {string} hexStr The hex string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
    */
			parse: function parse(hexStr) {
				// Shortcut
				var hexStrLength = hexStr.length;

				// Convert
				var words = [];
				for (var i = 0; i < hexStrLength; i += 2) {
					words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
				}

				return new WordArray.init(words, hexStrLength / 2);
			}
		};

		/**
   * Latin1 encoding strategy.
   */
		var Latin1 = C_enc.Latin1 = {
			/**
    * Converts a word array to a Latin1 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The Latin1 string.
    *
    * @static
    *
    * @example
    *
    *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var latin1Chars = [];
				for (var i = 0; i < sigBytes; i++) {
					var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					latin1Chars.push(String.fromCharCode(bite));
				}

				return latin1Chars.join('');
			},

			/**
    * Converts a Latin1 string to a word array.
    *
    * @param {string} latin1Str The Latin1 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
    */
			parse: function parse(latin1Str) {
				// Shortcut
				var latin1StrLength = latin1Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < latin1StrLength; i++) {
					words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
				}

				return new WordArray.init(words, latin1StrLength);
			}
		};

		/**
   * UTF-8 encoding strategy.
   */
		var Utf8 = C_enc.Utf8 = {
			/**
    * Converts a word array to a UTF-8 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-8 string.
    *
    * @static
    *
    * @example
    *
    *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				try {
					return decodeURIComponent(escape(Latin1.stringify(wordArray)));
				} catch (e) {
					throw new Error('Malformed UTF-8 data');
				}
			},

			/**
    * Converts a UTF-8 string to a word array.
    *
    * @param {string} utf8Str The UTF-8 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
    */
			parse: function parse(utf8Str) {
				return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
			}
		};

		/**
   * Abstract buffered block algorithm template.
   *
   * The property blockSize must be implemented in a concrete subtype.
   *
   * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
   */
		var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
			/**
    * Resets this block algorithm's data buffer to its initial state.
    *
    * @example
    *
    *     bufferedBlockAlgorithm.reset();
    */
			reset: function reset() {
				// Initial values
				this._data = new WordArray.init();
				this._nDataBytes = 0;
			},

			/**
    * Adds new data to this block algorithm's buffer.
    *
    * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
    *
    * @example
    *
    *     bufferedBlockAlgorithm._append('data');
    *     bufferedBlockAlgorithm._append(wordArray);
    */
			_append: function _append(data) {
				// Convert string to WordArray, else assume WordArray already
				if (typeof data == 'string') {
					data = Utf8.parse(data);
				}

				// Append
				this._data.concat(data);
				this._nDataBytes += data.sigBytes;
			},

			/**
    * Processes available data blocks.
    *
    * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
    *
    * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
    *
    * @return {WordArray} The processed data.
    *
    * @example
    *
    *     var processedData = bufferedBlockAlgorithm._process();
    *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
    */
			_process: function _process(doFlush) {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;
				var dataSigBytes = data.sigBytes;
				var blockSize = this.blockSize;
				var blockSizeBytes = blockSize * 4;

				// Count blocks ready
				var nBlocksReady = dataSigBytes / blockSizeBytes;
				if (doFlush) {
					// Round up to include partial blocks
					nBlocksReady = Math.ceil(nBlocksReady);
				} else {
					// Round down to include only full blocks,
					// less the number of blocks that must remain in the buffer
					nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
				}

				// Count words ready
				var nWordsReady = nBlocksReady * blockSize;

				// Count bytes ready
				var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

				// Process blocks
				if (nWordsReady) {
					for (var offset = 0; offset < nWordsReady; offset += blockSize) {
						// Perform concrete-algorithm logic
						this._doProcessBlock(dataWords, offset);
					}

					// Remove processed words
					var processedWords = dataWords.splice(0, nWordsReady);
					data.sigBytes -= nBytesReady;
				}

				// Return processed words
				return new WordArray.init(processedWords, nBytesReady);
			},

			/**
    * Creates a copy of this object.
    *
    * @return {Object} The clone.
    *
    * @example
    *
    *     var clone = bufferedBlockAlgorithm.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);
				clone._data = this._data.clone();

				return clone;
			},

			_minBufferSize: 0
		});

		/**
   * Abstract hasher template.
   *
   * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
   */
		var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
			/**
    * Configuration options.
    */
			cfg: Base.extend(),

			/**
    * Initializes a newly created hasher.
    *
    * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
    *
    * @example
    *
    *     var hasher = CryptoJS.algo.SHA256.create();
    */
			init: function init(cfg) {
				// Apply config defaults
				this.cfg = this.cfg.extend(cfg);

				// Set initial values
				this.reset();
			},

			/**
    * Resets this hasher to its initial state.
    *
    * @example
    *
    *     hasher.reset();
    */
			reset: function reset() {
				// Reset data buffer
				BufferedBlockAlgorithm.reset.call(this);

				// Perform concrete-hasher logic
				this._doReset();
			},

			/**
    * Updates this hasher with a message.
    *
    * @param {WordArray|string} messageUpdate The message to append.
    *
    * @return {Hasher} This hasher.
    *
    * @example
    *
    *     hasher.update('message');
    *     hasher.update(wordArray);
    */
			update: function update(messageUpdate) {
				// Append
				this._append(messageUpdate);

				// Update the hash
				this._process();

				// Chainable
				return this;
			},

			/**
    * Finalizes the hash computation.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} messageUpdate (Optional) A final message update.
    *
    * @return {WordArray} The hash.
    *
    * @example
    *
    *     var hash = hasher.finalize();
    *     var hash = hasher.finalize('message');
    *     var hash = hasher.finalize(wordArray);
    */
			finalize: function finalize(messageUpdate) {
				// Final message update
				if (messageUpdate) {
					this._append(messageUpdate);
				}

				// Perform concrete-hasher logic
				var hash = this._doFinalize();

				return hash;
			},

			blockSize: 512 / 32,

			/**
    * Creates a shortcut function to a hasher's object interface.
    *
    * @param {Hasher} hasher The hasher to create a helper for.
    *
    * @return {Function} The shortcut function.
    *
    * @static
    *
    * @example
    *
    *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
    */
			_createHelper: function _createHelper(hasher) {
				return function (message, cfg) {
					return new hasher.init(cfg).finalize(message);
				};
			},

			/**
    * Creates a shortcut function to the HMAC's object interface.
    *
    * @param {Hasher} hasher The hasher to use in this HMAC helper.
    *
    * @return {Function} The shortcut function.
    *
    * @static
    *
    * @example
    *
    *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
    */
			_createHmacHelper: function _createHmacHelper(hasher) {
				return function (message, key) {
					return new C_algo.HMAC.init(hasher, key).finalize(message);
				};
			}
		});

		/**
   * Algorithm namespace.
   */
		var C_algo = C.algo = {};

		return C;
	}(Math);

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_enc = C.enc;

		/**
   * Base64 encoding strategy.
   */
		var Base64 = C_enc.Base64 = {
			/**
    * Converts a word array to a Base64 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The Base64 string.
    *
    * @static
    *
    * @example
    *
    *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;
				var map = this._map;

				// Clamp excess bits
				wordArray.clamp();

				// Convert
				var base64Chars = [];
				for (var i = 0; i < sigBytes; i += 3) {
					var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
					var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

					var triplet = byte1 << 16 | byte2 << 8 | byte3;

					for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
						base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
					}
				}

				// Add padding
				var paddingChar = map.charAt(64);
				if (paddingChar) {
					while (base64Chars.length % 4) {
						base64Chars.push(paddingChar);
					}
				}

				return base64Chars.join('');
			},

			/**
    * Converts a Base64 string to a word array.
    *
    * @param {string} base64Str The Base64 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
    */
			parse: function parse(base64Str) {
				// Shortcuts
				var base64StrLength = base64Str.length;
				var map = this._map;
				var reverseMap = this._reverseMap;

				if (!reverseMap) {
					reverseMap = this._reverseMap = [];
					for (var j = 0; j < map.length; j++) {
						reverseMap[map.charCodeAt(j)] = j;
					}
				}

				// Ignore padding
				var paddingChar = map.charAt(64);
				if (paddingChar) {
					var paddingIndex = base64Str.indexOf(paddingChar);
					if (paddingIndex !== -1) {
						base64StrLength = paddingIndex;
					}
				}

				// Convert
				return parseLoop(base64Str, base64StrLength, reverseMap);
			},

			_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		};

		function parseLoop(base64Str, base64StrLength, reverseMap) {
			var words = [];
			var nBytes = 0;
			for (var i = 0; i < base64StrLength; i++) {
				if (i % 4) {
					var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
					var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
					words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
					nBytes++;
				}
			}
			return WordArray.create(words, nBytes);
		}
	})();

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Constants table
		var T = [];

		// Compute constants
		(function () {
			for (var i = 0; i < 64; i++) {
				T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
			}
		})();

		/**
   * MD5 hash algorithm.
   */
		var MD5 = C_algo.MD5 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Swap endian
				for (var i = 0; i < 16; i++) {
					// Shortcuts
					var offset_i = offset + i;
					var M_offset_i = M[offset_i];

					M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
				}

				// Shortcuts
				var H = this._hash.words;

				var M_offset_0 = M[offset + 0];
				var M_offset_1 = M[offset + 1];
				var M_offset_2 = M[offset + 2];
				var M_offset_3 = M[offset + 3];
				var M_offset_4 = M[offset + 4];
				var M_offset_5 = M[offset + 5];
				var M_offset_6 = M[offset + 6];
				var M_offset_7 = M[offset + 7];
				var M_offset_8 = M[offset + 8];
				var M_offset_9 = M[offset + 9];
				var M_offset_10 = M[offset + 10];
				var M_offset_11 = M[offset + 11];
				var M_offset_12 = M[offset + 12];
				var M_offset_13 = M[offset + 13];
				var M_offset_14 = M[offset + 14];
				var M_offset_15 = M[offset + 15];

				// Working varialbes
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];

				// Computation
				a = FF(a, b, c, d, M_offset_0, 7, T[0]);
				d = FF(d, a, b, c, M_offset_1, 12, T[1]);
				c = FF(c, d, a, b, M_offset_2, 17, T[2]);
				b = FF(b, c, d, a, M_offset_3, 22, T[3]);
				a = FF(a, b, c, d, M_offset_4, 7, T[4]);
				d = FF(d, a, b, c, M_offset_5, 12, T[5]);
				c = FF(c, d, a, b, M_offset_6, 17, T[6]);
				b = FF(b, c, d, a, M_offset_7, 22, T[7]);
				a = FF(a, b, c, d, M_offset_8, 7, T[8]);
				d = FF(d, a, b, c, M_offset_9, 12, T[9]);
				c = FF(c, d, a, b, M_offset_10, 17, T[10]);
				b = FF(b, c, d, a, M_offset_11, 22, T[11]);
				a = FF(a, b, c, d, M_offset_12, 7, T[12]);
				d = FF(d, a, b, c, M_offset_13, 12, T[13]);
				c = FF(c, d, a, b, M_offset_14, 17, T[14]);
				b = FF(b, c, d, a, M_offset_15, 22, T[15]);

				a = GG(a, b, c, d, M_offset_1, 5, T[16]);
				d = GG(d, a, b, c, M_offset_6, 9, T[17]);
				c = GG(c, d, a, b, M_offset_11, 14, T[18]);
				b = GG(b, c, d, a, M_offset_0, 20, T[19]);
				a = GG(a, b, c, d, M_offset_5, 5, T[20]);
				d = GG(d, a, b, c, M_offset_10, 9, T[21]);
				c = GG(c, d, a, b, M_offset_15, 14, T[22]);
				b = GG(b, c, d, a, M_offset_4, 20, T[23]);
				a = GG(a, b, c, d, M_offset_9, 5, T[24]);
				d = GG(d, a, b, c, M_offset_14, 9, T[25]);
				c = GG(c, d, a, b, M_offset_3, 14, T[26]);
				b = GG(b, c, d, a, M_offset_8, 20, T[27]);
				a = GG(a, b, c, d, M_offset_13, 5, T[28]);
				d = GG(d, a, b, c, M_offset_2, 9, T[29]);
				c = GG(c, d, a, b, M_offset_7, 14, T[30]);
				b = GG(b, c, d, a, M_offset_12, 20, T[31]);

				a = HH(a, b, c, d, M_offset_5, 4, T[32]);
				d = HH(d, a, b, c, M_offset_8, 11, T[33]);
				c = HH(c, d, a, b, M_offset_11, 16, T[34]);
				b = HH(b, c, d, a, M_offset_14, 23, T[35]);
				a = HH(a, b, c, d, M_offset_1, 4, T[36]);
				d = HH(d, a, b, c, M_offset_4, 11, T[37]);
				c = HH(c, d, a, b, M_offset_7, 16, T[38]);
				b = HH(b, c, d, a, M_offset_10, 23, T[39]);
				a = HH(a, b, c, d, M_offset_13, 4, T[40]);
				d = HH(d, a, b, c, M_offset_0, 11, T[41]);
				c = HH(c, d, a, b, M_offset_3, 16, T[42]);
				b = HH(b, c, d, a, M_offset_6, 23, T[43]);
				a = HH(a, b, c, d, M_offset_9, 4, T[44]);
				d = HH(d, a, b, c, M_offset_12, 11, T[45]);
				c = HH(c, d, a, b, M_offset_15, 16, T[46]);
				b = HH(b, c, d, a, M_offset_2, 23, T[47]);

				a = II(a, b, c, d, M_offset_0, 6, T[48]);
				d = II(d, a, b, c, M_offset_7, 10, T[49]);
				c = II(c, d, a, b, M_offset_14, 15, T[50]);
				b = II(b, c, d, a, M_offset_5, 21, T[51]);
				a = II(a, b, c, d, M_offset_12, 6, T[52]);
				d = II(d, a, b, c, M_offset_3, 10, T[53]);
				c = II(c, d, a, b, M_offset_10, 15, T[54]);
				b = II(b, c, d, a, M_offset_1, 21, T[55]);
				a = II(a, b, c, d, M_offset_8, 6, T[56]);
				d = II(d, a, b, c, M_offset_15, 10, T[57]);
				c = II(c, d, a, b, M_offset_6, 15, T[58]);
				b = II(b, c, d, a, M_offset_13, 21, T[59]);
				a = II(a, b, c, d, M_offset_4, 6, T[60]);
				d = II(d, a, b, c, M_offset_11, 10, T[61]);
				c = II(c, d, a, b, M_offset_2, 15, T[62]);
				b = II(b, c, d, a, M_offset_9, 21, T[63]);

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;

				var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
				var nBitsTotalL = nBitsTotal;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;

				data.sigBytes = (dataWords.length + 1) * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var hash = this._hash;
				var H = hash.words;

				// Swap endian
				for (var i = 0; i < 4; i++) {
					// Shortcut
					var H_i = H[i];

					H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
				}

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		function FF(a, b, c, d, x, s, t) {
			var n = a + (b & c | ~b & d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function GG(a, b, c, d, x, s, t) {
			var n = a + (b & d | c & ~d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function HH(a, b, c, d, x, s, t) {
			var n = a + (b ^ c ^ d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function II(a, b, c, d, x, s, t) {
			var n = a + (c ^ (b | ~d)) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.MD5('message');
   *     var hash = CryptoJS.MD5(wordArray);
   */
		C.MD5 = Hasher._createHelper(MD5);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacMD5(message, key);
   */
		C.HmacMD5 = Hasher._createHmacHelper(MD5);
	})(Math);

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Reusable object
		var W = [];

		/**
   * SHA-1 hash algorithm.
   */
		var SHA1 = C_algo.SHA1 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var H = this._hash.words;

				// Working variables
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];
				var e = H[4];

				// Computation
				for (var i = 0; i < 80; i++) {
					if (i < 16) {
						W[i] = M[offset + i] | 0;
					} else {
						var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
						W[i] = n << 1 | n >>> 31;
					}

					var t = (a << 5 | a >>> 27) + e + W[i];
					if (i < 20) {
						t += (b & c | ~b & d) + 0x5a827999;
					} else if (i < 40) {
						t += (b ^ c ^ d) + 0x6ed9eba1;
					} else if (i < 60) {
						t += (b & c | b & d | c & d) - 0x70e44324;
					} else /* if (i < 80) */{
							t += (b ^ c ^ d) - 0x359d3e2a;
						}

					e = d;
					d = c;
					c = b << 30 | b >>> 2;
					b = a;
					a = t;
				}

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
				H[4] = H[4] + e | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Return final computed hash
				return this._hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA1('message');
   *     var hash = CryptoJS.SHA1(wordArray);
   */
		C.SHA1 = Hasher._createHelper(SHA1);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA1(message, key);
   */
		C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	})();

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Initialization and round constants tables
		var H = [];
		var K = [];

		// Compute constants
		(function () {
			function isPrime(n) {
				var sqrtN = Math.sqrt(n);
				for (var factor = 2; factor <= sqrtN; factor++) {
					if (!(n % factor)) {
						return false;
					}
				}

				return true;
			}

			function getFractionalBits(n) {
				return (n - (n | 0)) * 0x100000000 | 0;
			}

			var n = 2;
			var nPrime = 0;
			while (nPrime < 64) {
				if (isPrime(n)) {
					if (nPrime < 8) {
						H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
					}
					K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

					nPrime++;
				}

				n++;
			}
		})();

		// Reusable object
		var W = [];

		/**
   * SHA-256 hash algorithm.
   */
		var SHA256 = C_algo.SHA256 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init(H.slice(0));
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var H = this._hash.words;

				// Working variables
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];
				var e = H[4];
				var f = H[5];
				var g = H[6];
				var h = H[7];

				// Computation
				for (var i = 0; i < 64; i++) {
					if (i < 16) {
						W[i] = M[offset + i] | 0;
					} else {
						var gamma0x = W[i - 15];
						var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;

						var gamma1x = W[i - 2];
						var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;

						W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
					}

					var ch = e & f ^ ~e & g;
					var maj = a & b ^ a & c ^ b & c;

					var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
					var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);

					var t1 = h + sigma1 + ch + K[i] + W[i];
					var t2 = sigma0 + maj;

					h = g;
					g = f;
					f = e;
					e = d + t1 | 0;
					d = c;
					c = b;
					b = a;
					a = t1 + t2 | 0;
				}

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
				H[4] = H[4] + e | 0;
				H[5] = H[5] + f | 0;
				H[6] = H[6] + g | 0;
				H[7] = H[7] + h | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Return final computed hash
				return this._hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA256('message');
   *     var hash = CryptoJS.SHA256(wordArray);
   */
		C.SHA256 = Hasher._createHelper(SHA256);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA256(message, key);
   */
		C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	})(Math);

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_enc = C.enc;

		/**
   * UTF-16 BE encoding strategy.
   */
		var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
			/**
    * Converts a word array to a UTF-16 BE string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-16 BE string.
    *
    * @static
    *
    * @example
    *
    *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var utf16Chars = [];
				for (var i = 0; i < sigBytes; i += 2) {
					var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff;
					utf16Chars.push(String.fromCharCode(codePoint));
				}

				return utf16Chars.join('');
			},

			/**
    * Converts a UTF-16 BE string to a word array.
    *
    * @param {string} utf16Str The UTF-16 BE string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
    */
			parse: function parse(utf16Str) {
				// Shortcut
				var utf16StrLength = utf16Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < utf16StrLength; i++) {
					words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
				}

				return WordArray.create(words, utf16StrLength * 2);
			}
		};

		/**
   * UTF-16 LE encoding strategy.
   */
		C_enc.Utf16LE = {
			/**
    * Converts a word array to a UTF-16 LE string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-16 LE string.
    *
    * @static
    *
    * @example
    *
    *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var utf16Chars = [];
				for (var i = 0; i < sigBytes; i += 2) {
					var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff);
					utf16Chars.push(String.fromCharCode(codePoint));
				}

				return utf16Chars.join('');
			},

			/**
    * Converts a UTF-16 LE string to a word array.
    *
    * @param {string} utf16Str The UTF-16 LE string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
    */
			parse: function parse(utf16Str) {
				// Shortcut
				var utf16StrLength = utf16Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < utf16StrLength; i++) {
					words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
				}

				return WordArray.create(words, utf16StrLength * 2);
			}
		};

		function swapEndian(word) {
			return word << 8 & 0xff00ff00 | word >>> 8 & 0x00ff00ff;
		}
	})();

	(function () {
		// Check if typed arrays are supported
		if (typeof ArrayBuffer != 'function') {
			return;
		}

		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;

		// Reference original init
		var superInit = WordArray.init;

		// Augment WordArray.init to handle typed arrays
		var subInit = WordArray.init = function (typedArray) {
			// Convert buffers to uint8
			if (typedArray instanceof ArrayBuffer) {
				typedArray = new Uint8Array(typedArray);
			}

			// Convert other array views to uint8
			if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
				typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
			}

			// Handle Uint8Array
			if (typedArray instanceof Uint8Array) {
				// Shortcut
				var typedArrayByteLength = typedArray.byteLength;

				// Extract bytes
				var words = [];
				for (var i = 0; i < typedArrayByteLength; i++) {
					words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
				}

				// Initialize this word array
				superInit.call(this, words, typedArrayByteLength);
			} else {
				// Else call normal init
				superInit.apply(this, arguments);
			}
		};

		subInit.prototype = WordArray;
	})();

	/** @preserve
 (c) 2012 by Cédric Mesnil. All rights reserved.
 	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
     - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Constants table
		var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
		var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
		var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
		var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);

		var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

		/**
   * RIPEMD160 hash algorithm.
   */
		var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {

				// Swap endian
				for (var i = 0; i < 16; i++) {
					// Shortcuts
					var offset_i = offset + i;
					var M_offset_i = M[offset_i];

					// Swap
					M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
				}
				// Shortcut
				var H = this._hash.words;
				var hl = _hl.words;
				var hr = _hr.words;
				var zl = _zl.words;
				var zr = _zr.words;
				var sl = _sl.words;
				var sr = _sr.words;

				// Working variables
				var al, bl, cl, dl, el;
				var ar, br, cr, dr, er;

				ar = al = H[0];
				br = bl = H[1];
				cr = cl = H[2];
				dr = dl = H[3];
				er = el = H[4];
				// Computation
				var t;
				for (var i = 0; i < 80; i += 1) {
					t = al + M[offset + zl[i]] | 0;
					if (i < 16) {
						t += f1(bl, cl, dl) + hl[0];
					} else if (i < 32) {
						t += f2(bl, cl, dl) + hl[1];
					} else if (i < 48) {
						t += f3(bl, cl, dl) + hl[2];
					} else if (i < 64) {
						t += f4(bl, cl, dl) + hl[3];
					} else {
						// if (i<80) {
						t += f5(bl, cl, dl) + hl[4];
					}
					t = t | 0;
					t = rotl(t, sl[i]);
					t = t + el | 0;
					al = el;
					el = dl;
					dl = rotl(cl, 10);
					cl = bl;
					bl = t;

					t = ar + M[offset + zr[i]] | 0;
					if (i < 16) {
						t += f5(br, cr, dr) + hr[0];
					} else if (i < 32) {
						t += f4(br, cr, dr) + hr[1];
					} else if (i < 48) {
						t += f3(br, cr, dr) + hr[2];
					} else if (i < 64) {
						t += f2(br, cr, dr) + hr[3];
					} else {
						// if (i<80) {
						t += f1(br, cr, dr) + hr[4];
					}
					t = t | 0;
					t = rotl(t, sr[i]);
					t = t + er | 0;
					ar = er;
					er = dr;
					dr = rotl(cr, 10);
					cr = br;
					br = t;
				}
				// Intermediate hash value
				t = H[1] + cl + dr | 0;
				H[1] = H[2] + dl + er | 0;
				H[2] = H[3] + el + ar | 0;
				H[3] = H[4] + al + br | 0;
				H[4] = H[0] + bl + cr | 0;
				H[0] = t;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;
				data.sigBytes = (dataWords.length + 1) * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var hash = this._hash;
				var H = hash.words;

				// Swap endian
				for (var i = 0; i < 5; i++) {
					// Shortcut
					var H_i = H[i];

					// Swap
					H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
				}

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		function f1(x, y, z) {
			return x ^ y ^ z;
		}

		function f2(x, y, z) {
			return x & y | ~x & z;
		}

		function f3(x, y, z) {
			return (x | ~y) ^ z;
		}

		function f4(x, y, z) {
			return x & z | y & ~z;
		}

		function f5(x, y, z) {
			return x ^ (y | ~z);
		}

		function rotl(x, n) {
			return x << n | x >>> 32 - n;
		}

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.RIPEMD160('message');
   *     var hash = CryptoJS.RIPEMD160(wordArray);
   */
		C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
   */
		C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	})(Math);

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var C_enc = C.enc;
		var Utf8 = C_enc.Utf8;
		var C_algo = C.algo;

		/**
   * HMAC algorithm.
   */
		var HMAC = C_algo.HMAC = Base.extend({
			/**
    * Initializes a newly created HMAC.
    *
    * @param {Hasher} hasher The hash algorithm to use.
    * @param {WordArray|string} key The secret key.
    *
    * @example
    *
    *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
    */
			init: function init(hasher, key) {
				// Init hasher
				hasher = this._hasher = new hasher.init();

				// Convert string to WordArray, else assume WordArray already
				if (typeof key == 'string') {
					key = Utf8.parse(key);
				}

				// Shortcuts
				var hasherBlockSize = hasher.blockSize;
				var hasherBlockSizeBytes = hasherBlockSize * 4;

				// Allow arbitrary length keys
				if (key.sigBytes > hasherBlockSizeBytes) {
					key = hasher.finalize(key);
				}

				// Clamp excess bits
				key.clamp();

				// Clone key for inner and outer pads
				var oKey = this._oKey = key.clone();
				var iKey = this._iKey = key.clone();

				// Shortcuts
				var oKeyWords = oKey.words;
				var iKeyWords = iKey.words;

				// XOR keys with pad constants
				for (var i = 0; i < hasherBlockSize; i++) {
					oKeyWords[i] ^= 0x5c5c5c5c;
					iKeyWords[i] ^= 0x36363636;
				}
				oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

				// Set initial values
				this.reset();
			},

			/**
    * Resets this HMAC to its initial state.
    *
    * @example
    *
    *     hmacHasher.reset();
    */
			reset: function reset() {
				// Shortcut
				var hasher = this._hasher;

				// Reset
				hasher.reset();
				hasher.update(this._iKey);
			},

			/**
    * Updates this HMAC with a message.
    *
    * @param {WordArray|string} messageUpdate The message to append.
    *
    * @return {HMAC} This HMAC instance.
    *
    * @example
    *
    *     hmacHasher.update('message');
    *     hmacHasher.update(wordArray);
    */
			update: function update(messageUpdate) {
				this._hasher.update(messageUpdate);

				// Chainable
				return this;
			},

			/**
    * Finalizes the HMAC computation.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} messageUpdate (Optional) A final message update.
    *
    * @return {WordArray} The HMAC.
    *
    * @example
    *
    *     var hmac = hmacHasher.finalize();
    *     var hmac = hmacHasher.finalize('message');
    *     var hmac = hmacHasher.finalize(wordArray);
    */
			finalize: function finalize(messageUpdate) {
				// Shortcut
				var hasher = this._hasher;

				// Compute HMAC
				var innerHash = hasher.finalize(messageUpdate);
				hasher.reset();
				var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

				return hmac;
			}
		});
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var SHA1 = C_algo.SHA1;
		var HMAC = C_algo.HMAC;

		/**
   * Password-Based Key Derivation Function 2 algorithm.
   */
		var PBKDF2 = C_algo.PBKDF2 = Base.extend({
			/**
    * Configuration options.
    *
    * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
    * @property {Hasher} hasher The hasher to use. Default: SHA1
    * @property {number} iterations The number of iterations to perform. Default: 1
    */
			cfg: Base.extend({
				keySize: 128 / 32,
				hasher: SHA1,
				iterations: 1
			}),

			/**
    * Initializes a newly created key derivation function.
    *
    * @param {Object} cfg (Optional) The configuration options to use for the derivation.
    *
    * @example
    *
    *     var kdf = CryptoJS.algo.PBKDF2.create();
    *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
    *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
    */
			init: function init(cfg) {
				this.cfg = this.cfg.extend(cfg);
			},

			/**
    * Computes the Password-Based Key Derivation Function 2.
    *
    * @param {WordArray|string} password The password.
    * @param {WordArray|string} salt A salt.
    *
    * @return {WordArray} The derived key.
    *
    * @example
    *
    *     var key = kdf.compute(password, salt);
    */
			compute: function compute(password, salt) {
				// Shortcut
				var cfg = this.cfg;

				// Init HMAC
				var hmac = HMAC.create(cfg.hasher, password);

				// Initial values
				var derivedKey = WordArray.create();
				var blockIndex = WordArray.create([0x00000001]);

				// Shortcuts
				var derivedKeyWords = derivedKey.words;
				var blockIndexWords = blockIndex.words;
				var keySize = cfg.keySize;
				var iterations = cfg.iterations;

				// Generate key
				while (derivedKeyWords.length < keySize) {
					var block = hmac.update(salt).finalize(blockIndex);
					hmac.reset();

					// Shortcuts
					var blockWords = block.words;
					var blockWordsLength = blockWords.length;

					// Iterations
					var intermediate = block;
					for (var i = 1; i < iterations; i++) {
						intermediate = hmac.finalize(intermediate);
						hmac.reset();

						// Shortcut
						var intermediateWords = intermediate.words;

						// XOR intermediate with block
						for (var j = 0; j < blockWordsLength; j++) {
							blockWords[j] ^= intermediateWords[j];
						}
					}

					derivedKey.concat(block);
					blockIndexWords[0]++;
				}
				derivedKey.sigBytes = keySize * 4;

				return derivedKey;
			}
		});

		/**
   * Computes the Password-Based Key Derivation Function 2.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   * @param {Object} cfg (Optional) The configuration options to use for this computation.
   *
   * @return {WordArray} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = CryptoJS.PBKDF2(password, salt);
   *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
   *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
   */
		C.PBKDF2 = function (password, salt, cfg) {
			return PBKDF2.create(cfg).compute(password, salt);
		};
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var MD5 = C_algo.MD5;

		/**
   * This key derivation function is meant to conform with EVP_BytesToKey.
   * www.openssl.org/docs/crypto/EVP_BytesToKey.html
   */
		var EvpKDF = C_algo.EvpKDF = Base.extend({
			/**
    * Configuration options.
    *
    * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
    * @property {Hasher} hasher The hash algorithm to use. Default: MD5
    * @property {number} iterations The number of iterations to perform. Default: 1
    */
			cfg: Base.extend({
				keySize: 128 / 32,
				hasher: MD5,
				iterations: 1
			}),

			/**
    * Initializes a newly created key derivation function.
    *
    * @param {Object} cfg (Optional) The configuration options to use for the derivation.
    *
    * @example
    *
    *     var kdf = CryptoJS.algo.EvpKDF.create();
    *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
    *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
    */
			init: function init(cfg) {
				this.cfg = this.cfg.extend(cfg);
			},

			/**
    * Derives a key from a password.
    *
    * @param {WordArray|string} password The password.
    * @param {WordArray|string} salt A salt.
    *
    * @return {WordArray} The derived key.
    *
    * @example
    *
    *     var key = kdf.compute(password, salt);
    */
			compute: function compute(password, salt) {
				// Shortcut
				var cfg = this.cfg;

				// Init hasher
				var hasher = cfg.hasher.create();

				// Initial values
				var derivedKey = WordArray.create();

				// Shortcuts
				var derivedKeyWords = derivedKey.words;
				var keySize = cfg.keySize;
				var iterations = cfg.iterations;

				// Generate key
				while (derivedKeyWords.length < keySize) {
					if (block) {
						hasher.update(block);
					}
					var block = hasher.update(password).finalize(salt);
					hasher.reset();

					// Iterations
					for (var i = 1; i < iterations; i++) {
						block = hasher.finalize(block);
						hasher.reset();
					}

					derivedKey.concat(block);
				}
				derivedKey.sigBytes = keySize * 4;

				return derivedKey;
			}
		});

		/**
   * Derives a key from a password.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   * @param {Object} cfg (Optional) The configuration options to use for this computation.
   *
   * @return {WordArray} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = CryptoJS.EvpKDF(password, salt);
   *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
   *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
   */
		C.EvpKDF = function (password, salt, cfg) {
			return EvpKDF.create(cfg).compute(password, salt);
		};
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var SHA256 = C_algo.SHA256;

		/**
   * SHA-224 hash algorithm.
   */
		var SHA224 = C_algo.SHA224 = SHA256.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
			},

			_doFinalize: function _doFinalize() {
				var hash = SHA256._doFinalize.call(this);

				hash.sigBytes -= 4;

				return hash;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA224('message');
   *     var hash = CryptoJS.SHA224(wordArray);
   */
		C.SHA224 = SHA256._createHelper(SHA224);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA224(message, key);
   */
		C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	})();

	(function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var X32WordArray = C_lib.WordArray;

		/**
   * x64 namespace.
   */
		var C_x64 = C.x64 = {};

		/**
   * A 64-bit word.
   */
		var X64Word = C_x64.Word = Base.extend({
			/**
    * Initializes a newly created 64-bit word.
    *
    * @param {number} high The high 32 bits.
    * @param {number} low The low 32 bits.
    *
    * @example
    *
    *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
    */
			init: function init(high, low) {
				this.high = high;
				this.low = low;
			}

			/**
    * Bitwise NOTs this word.
    *
    * @return {X64Word} A new x64-Word object after negating.
    *
    * @example
    *
    *     var negated = x64Word.not();
    */
			// not: function () {
			// var high = ~this.high;
			// var low = ~this.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise ANDs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to AND with this word.
    *
    * @return {X64Word} A new x64-Word object after ANDing.
    *
    * @example
    *
    *     var anded = x64Word.and(anotherX64Word);
    */
			// and: function (word) {
			// var high = this.high & word.high;
			// var low = this.low & word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise ORs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to OR with this word.
    *
    * @return {X64Word} A new x64-Word object after ORing.
    *
    * @example
    *
    *     var ored = x64Word.or(anotherX64Word);
    */
			// or: function (word) {
			// var high = this.high | word.high;
			// var low = this.low | word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise XORs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to XOR with this word.
    *
    * @return {X64Word} A new x64-Word object after XORing.
    *
    * @example
    *
    *     var xored = x64Word.xor(anotherX64Word);
    */
			// xor: function (word) {
			// var high = this.high ^ word.high;
			// var low = this.low ^ word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Shifts this word n bits to the left.
    *
    * @param {number} n The number of bits to shift.
    *
    * @return {X64Word} A new x64-Word object after shifting.
    *
    * @example
    *
    *     var shifted = x64Word.shiftL(25);
    */
			// shiftL: function (n) {
			// if (n < 32) {
			// var high = (this.high << n) | (this.low >>> (32 - n));
			// var low = this.low << n;
			// } else {
			// var high = this.low << (n - 32);
			// var low = 0;
			// }

			// return X64Word.create(high, low);
			// },

			/**
    * Shifts this word n bits to the right.
    *
    * @param {number} n The number of bits to shift.
    *
    * @return {X64Word} A new x64-Word object after shifting.
    *
    * @example
    *
    *     var shifted = x64Word.shiftR(7);
    */
			// shiftR: function (n) {
			// if (n < 32) {
			// var low = (this.low >>> n) | (this.high << (32 - n));
			// var high = this.high >>> n;
			// } else {
			// var low = this.high >>> (n - 32);
			// var high = 0;
			// }

			// return X64Word.create(high, low);
			// },

			/**
    * Rotates this word n bits to the left.
    *
    * @param {number} n The number of bits to rotate.
    *
    * @return {X64Word} A new x64-Word object after rotating.
    *
    * @example
    *
    *     var rotated = x64Word.rotL(25);
    */
			// rotL: function (n) {
			// return this.shiftL(n).or(this.shiftR(64 - n));
			// },

			/**
    * Rotates this word n bits to the right.
    *
    * @param {number} n The number of bits to rotate.
    *
    * @return {X64Word} A new x64-Word object after rotating.
    *
    * @example
    *
    *     var rotated = x64Word.rotR(7);
    */
			// rotR: function (n) {
			// return this.shiftR(n).or(this.shiftL(64 - n));
			// },

			/**
    * Adds this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to add with this word.
    *
    * @return {X64Word} A new x64-Word object after adding.
    *
    * @example
    *
    *     var added = x64Word.add(anotherX64Word);
    */
			// add: function (word) {
			// var low = (this.low + word.low) | 0;
			// var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
			// var high = (this.high + word.high + carry) | 0;

			// return X64Word.create(high, low);
			// }
		});

		/**
   * An array of 64-bit words.
   *
   * @property {Array} words The array of CryptoJS.x64.Word objects.
   * @property {number} sigBytes The number of significant bytes in this word array.
   */
		var X64WordArray = C_x64.WordArray = Base.extend({
			/**
    * Initializes a newly created word array.
    *
    * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
    * @param {number} sigBytes (Optional) The number of significant bytes in the words.
    *
    * @example
    *
    *     var wordArray = CryptoJS.x64.WordArray.create();
    *
    *     var wordArray = CryptoJS.x64.WordArray.create([
    *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
    *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
    *     ]);
    *
    *     var wordArray = CryptoJS.x64.WordArray.create([
    *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
    *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
    *     ], 10);
    */
			init: function init(words, sigBytes) {
				words = this.words = words || [];

				if (sigBytes != undefined) {
					this.sigBytes = sigBytes;
				} else {
					this.sigBytes = words.length * 8;
				}
			},

			/**
    * Converts this 64-bit word array to a 32-bit word array.
    *
    * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
    *
    * @example
    *
    *     var x32WordArray = x64WordArray.toX32();
    */
			toX32: function toX32() {
				// Shortcuts
				var x64Words = this.words;
				var x64WordsLength = x64Words.length;

				// Convert
				var x32Words = [];
				for (var i = 0; i < x64WordsLength; i++) {
					var x64Word = x64Words[i];
					x32Words.push(x64Word.high);
					x32Words.push(x64Word.low);
				}

				return X32WordArray.create(x32Words, this.sigBytes);
			},

			/**
    * Creates a copy of this word array.
    *
    * @return {X64WordArray} The clone.
    *
    * @example
    *
    *     var clone = x64WordArray.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);

				// Clone "words" array
				var words = clone.words = this.words.slice(0);

				// Clone each X64Word object
				var wordsLength = words.length;
				for (var i = 0; i < wordsLength; i++) {
					words[i] = words[i].clone();
				}

				return clone;
			}
		});
	})();

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var C_algo = C.algo;

		// Constants tables
		var RHO_OFFSETS = [];
		var PI_INDEXES = [];
		var ROUND_CONSTANTS = [];

		// Compute Constants
		(function () {
			// Compute rho offset constants
			var x = 1,
			    y = 0;
			for (var t = 0; t < 24; t++) {
				RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;

				var newX = y % 5;
				var newY = (2 * x + 3 * y) % 5;
				x = newX;
				y = newY;
			}

			// Compute pi index constants
			for (var x = 0; x < 5; x++) {
				for (var y = 0; y < 5; y++) {
					PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
				}
			}

			// Compute round constants
			var LFSR = 0x01;
			for (var i = 0; i < 24; i++) {
				var roundConstantMsw = 0;
				var roundConstantLsw = 0;

				for (var j = 0; j < 7; j++) {
					if (LFSR & 0x01) {
						var bitPosition = (1 << j) - 1;
						if (bitPosition < 32) {
							roundConstantLsw ^= 1 << bitPosition;
						} else /* if (bitPosition >= 32) */{
								roundConstantMsw ^= 1 << bitPosition - 32;
							}
					}

					// Compute next LFSR
					if (LFSR & 0x80) {
						// Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
						LFSR = LFSR << 1 ^ 0x71;
					} else {
						LFSR <<= 1;
					}
				}

				ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
			}
		})();

		// Reusable objects for temporary values
		var T = [];
		(function () {
			for (var i = 0; i < 25; i++) {
				T[i] = X64Word.create();
			}
		})();

		/**
   * SHA-3 hash algorithm.
   */
		var SHA3 = C_algo.SHA3 = Hasher.extend({
			/**
    * Configuration options.
    *
    * @property {number} outputLength
    *   The desired number of bits in the output hash.
    *   Only values permitted are: 224, 256, 384, 512.
    *   Default: 512
    */
			cfg: Hasher.cfg.extend({
				outputLength: 512
			}),

			_doReset: function _doReset() {
				var state = this._state = [];
				for (var i = 0; i < 25; i++) {
					state[i] = new X64Word.init();
				}

				this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcuts
				var state = this._state;
				var nBlockSizeLanes = this.blockSize / 2;

				// Absorb
				for (var i = 0; i < nBlockSizeLanes; i++) {
					// Shortcuts
					var M2i = M[offset + 2 * i];
					var M2i1 = M[offset + 2 * i + 1];

					// Swap endian
					M2i = (M2i << 8 | M2i >>> 24) & 0x00ff00ff | (M2i << 24 | M2i >>> 8) & 0xff00ff00;
					M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 0x00ff00ff | (M2i1 << 24 | M2i1 >>> 8) & 0xff00ff00;

					// Absorb message into state
					var lane = state[i];
					lane.high ^= M2i1;
					lane.low ^= M2i;
				}

				// Rounds
				for (var round = 0; round < 24; round++) {
					// Theta
					for (var x = 0; x < 5; x++) {
						// Mix column lanes
						var tMsw = 0,
						    tLsw = 0;
						for (var y = 0; y < 5; y++) {
							var lane = state[x + 5 * y];
							tMsw ^= lane.high;
							tLsw ^= lane.low;
						}

						// Temporary values
						var Tx = T[x];
						Tx.high = tMsw;
						Tx.low = tLsw;
					}
					for (var x = 0; x < 5; x++) {
						// Shortcuts
						var Tx4 = T[(x + 4) % 5];
						var Tx1 = T[(x + 1) % 5];
						var Tx1Msw = Tx1.high;
						var Tx1Lsw = Tx1.low;

						// Mix surrounding columns
						var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
						var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
						for (var y = 0; y < 5; y++) {
							var lane = state[x + 5 * y];
							lane.high ^= tMsw;
							lane.low ^= tLsw;
						}
					}

					// Rho Pi
					for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
						// Shortcuts
						var lane = state[laneIndex];
						var laneMsw = lane.high;
						var laneLsw = lane.low;
						var rhoOffset = RHO_OFFSETS[laneIndex];

						// Rotate lanes
						if (rhoOffset < 32) {
							var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
							var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
						} else /* if (rhoOffset >= 32) */{
								var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
								var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
							}

						// Transpose lanes
						var TPiLane = T[PI_INDEXES[laneIndex]];
						TPiLane.high = tMsw;
						TPiLane.low = tLsw;
					}

					// Rho pi at x = y = 0
					var T0 = T[0];
					var state0 = state[0];
					T0.high = state0.high;
					T0.low = state0.low;

					// Chi
					for (var x = 0; x < 5; x++) {
						for (var y = 0; y < 5; y++) {
							// Shortcuts
							var laneIndex = x + 5 * y;
							var lane = state[laneIndex];
							var TLane = T[laneIndex];
							var Tx1Lane = T[(x + 1) % 5 + 5 * y];
							var Tx2Lane = T[(x + 2) % 5 + 5 * y];

							// Mix rows
							lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
							lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
						}
					}

					// Iota
					var lane = state[0];
					var roundConstant = ROUND_CONSTANTS[round];
					lane.high ^= roundConstant.high;
					lane.low ^= roundConstant.low;;
				}
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;
				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;
				var blockSizeBits = this.blockSize * 32;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x1 << 24 - nBitsLeft % 32;
				dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var state = this._state;
				var outputLengthBytes = this.cfg.outputLength / 8;
				var outputLengthLanes = outputLengthBytes / 8;

				// Squeeze
				var hashWords = [];
				for (var i = 0; i < outputLengthLanes; i++) {
					// Shortcuts
					var lane = state[i];
					var laneMsw = lane.high;
					var laneLsw = lane.low;

					// Swap endian
					laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 0x00ff00ff | (laneMsw << 24 | laneMsw >>> 8) & 0xff00ff00;
					laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 0x00ff00ff | (laneLsw << 24 | laneLsw >>> 8) & 0xff00ff00;

					// Squeeze state to retrieve hash
					hashWords.push(laneLsw);
					hashWords.push(laneMsw);
				}

				// Return final computed hash
				return new WordArray.init(hashWords, outputLengthBytes);
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);

				var state = clone._state = this._state.slice(0);
				for (var i = 0; i < 25; i++) {
					state[i] = state[i].clone();
				}

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA3('message');
   *     var hash = CryptoJS.SHA3(wordArray);
   */
		C.SHA3 = Hasher._createHelper(SHA3);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA3(message, key);
   */
		C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	})(Math);

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Hasher = C_lib.Hasher;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var X64WordArray = C_x64.WordArray;
		var C_algo = C.algo;

		function X64Word_create() {
			return X64Word.create.apply(X64Word, arguments);
		}

		// Constants
		var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];

		// Reusable objects
		var W = [];
		(function () {
			for (var i = 0; i < 80; i++) {
				W[i] = X64Word_create();
			}
		})();

		/**
   * SHA-512 hash algorithm.
   */
		var SHA512 = C_algo.SHA512 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcuts
				var H = this._hash.words;

				var H0 = H[0];
				var H1 = H[1];
				var H2 = H[2];
				var H3 = H[3];
				var H4 = H[4];
				var H5 = H[5];
				var H6 = H[6];
				var H7 = H[7];

				var H0h = H0.high;
				var H0l = H0.low;
				var H1h = H1.high;
				var H1l = H1.low;
				var H2h = H2.high;
				var H2l = H2.low;
				var H3h = H3.high;
				var H3l = H3.low;
				var H4h = H4.high;
				var H4l = H4.low;
				var H5h = H5.high;
				var H5l = H5.low;
				var H6h = H6.high;
				var H6l = H6.low;
				var H7h = H7.high;
				var H7l = H7.low;

				// Working variables
				var ah = H0h;
				var al = H0l;
				var bh = H1h;
				var bl = H1l;
				var ch = H2h;
				var cl = H2l;
				var dh = H3h;
				var dl = H3l;
				var eh = H4h;
				var el = H4l;
				var fh = H5h;
				var fl = H5l;
				var gh = H6h;
				var gl = H6l;
				var hh = H7h;
				var hl = H7l;

				// Rounds
				for (var i = 0; i < 80; i++) {
					// Shortcut
					var Wi = W[i];

					// Extend message
					if (i < 16) {
						var Wih = Wi.high = M[offset + i * 2] | 0;
						var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
					} else {
						// Gamma0
						var gamma0x = W[i - 15];
						var gamma0xh = gamma0x.high;
						var gamma0xl = gamma0x.low;
						var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
						var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);

						// Gamma1
						var gamma1x = W[i - 2];
						var gamma1xh = gamma1x.high;
						var gamma1xl = gamma1x.low;
						var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
						var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);

						// W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
						var Wi7 = W[i - 7];
						var Wi7h = Wi7.high;
						var Wi7l = Wi7.low;

						var Wi16 = W[i - 16];
						var Wi16h = Wi16.high;
						var Wi16l = Wi16.low;

						var Wil = gamma0l + Wi7l;
						var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
						var Wil = Wil + gamma1l;
						var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
						var Wil = Wil + Wi16l;
						var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);

						Wi.high = Wih;
						Wi.low = Wil;
					}

					var chh = eh & fh ^ ~eh & gh;
					var chl = el & fl ^ ~el & gl;
					var majh = ah & bh ^ ah & ch ^ bh & ch;
					var majl = al & bl ^ al & cl ^ bl & cl;

					var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
					var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
					var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
					var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);

					// t1 = h + sigma1 + ch + K[i] + W[i]
					var Ki = K[i];
					var Kih = Ki.high;
					var Kil = Ki.low;

					var t1l = hl + sigma1l;
					var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
					var t1l = t1l + chl;
					var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
					var t1l = t1l + Kil;
					var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
					var t1l = t1l + Wil;
					var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

					// t2 = sigma0 + maj
					var t2l = sigma0l + majl;
					var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

					// Update working variables
					hh = gh;
					hl = gl;
					gh = fh;
					gl = fl;
					fh = eh;
					fl = el;
					el = dl + t1l | 0;
					eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
					dh = ch;
					dl = cl;
					ch = bh;
					cl = bl;
					bh = ah;
					bl = al;
					al = t1l + t2l | 0;
					ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
				}

				// Intermediate hash value
				H0l = H0.low = H0l + al;
				H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
				H1l = H1.low = H1l + bl;
				H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
				H2l = H2.low = H2l + cl;
				H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
				H3l = H3.low = H3l + dl;
				H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
				H4l = H4.low = H4l + el;
				H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
				H5l = H5.low = H5l + fl;
				H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
				H6l = H6.low = H6l + gl;
				H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
				H7l = H7.low = H7l + hl;
				H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Convert hash to 32-bit word array before returning
				var hash = this._hash.toX32();

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			},

			blockSize: 1024 / 32
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA512('message');
   *     var hash = CryptoJS.SHA512(wordArray);
   */
		C.SHA512 = Hasher._createHelper(SHA512);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA512(message, key);
   */
		C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var X64WordArray = C_x64.WordArray;
		var C_algo = C.algo;
		var SHA512 = C_algo.SHA512;

		/**
   * SHA-384 hash algorithm.
   */
		var SHA384 = C_algo.SHA384 = SHA512.extend({
			_doReset: function _doReset() {
				this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
			},

			_doFinalize: function _doFinalize() {
				var hash = SHA512._doFinalize.call(this);

				hash.sigBytes -= 16;

				return hash;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA384('message');
   *     var hash = CryptoJS.SHA384(wordArray);
   */
		C.SHA384 = SHA512._createHelper(SHA384);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA384(message, key);
   */
		C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	})();

	/**
  * Cipher core components.
  */
	CryptoJS.lib.Cipher || function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		var C_enc = C.enc;
		var Utf8 = C_enc.Utf8;
		var Base64 = C_enc.Base64;
		var C_algo = C.algo;
		var EvpKDF = C_algo.EvpKDF;

		/**
   * Abstract base cipher template.
   *
   * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
   * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
   * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
   * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
   */
		var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
			/**
    * Configuration options.
    *
    * @property {WordArray} iv The IV to use for this operation.
    */
			cfg: Base.extend(),

			/**
    * Creates this cipher in encryption mode.
    *
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {Cipher} A cipher instance.
    *
    * @static
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
    */
			createEncryptor: function createEncryptor(key, cfg) {
				return this.create(this._ENC_XFORM_MODE, key, cfg);
			},

			/**
    * Creates this cipher in decryption mode.
    *
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {Cipher} A cipher instance.
    *
    * @static
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
    */
			createDecryptor: function createDecryptor(key, cfg) {
				return this.create(this._DEC_XFORM_MODE, key, cfg);
			},

			/**
    * Initializes a newly created cipher.
    *
    * @param {number} xformMode Either the encryption or decryption transormation mode constant.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
    */
			init: function init(xformMode, key, cfg) {
				// Apply config defaults
				this.cfg = this.cfg.extend(cfg);

				// Store transform mode and key
				this._xformMode = xformMode;
				this._key = key;

				// Set initial values
				this.reset();
			},

			/**
    * Resets this cipher to its initial state.
    *
    * @example
    *
    *     cipher.reset();
    */
			reset: function reset() {
				// Reset data buffer
				BufferedBlockAlgorithm.reset.call(this);

				// Perform concrete-cipher logic
				this._doReset();
			},

			/**
    * Adds data to be encrypted or decrypted.
    *
    * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
    *
    * @return {WordArray} The data after processing.
    *
    * @example
    *
    *     var encrypted = cipher.process('data');
    *     var encrypted = cipher.process(wordArray);
    */
			process: function process(dataUpdate) {
				// Append
				this._append(dataUpdate);

				// Process available blocks
				return this._process();
			},

			/**
    * Finalizes the encryption or decryption process.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
    *
    * @return {WordArray} The data after final processing.
    *
    * @example
    *
    *     var encrypted = cipher.finalize();
    *     var encrypted = cipher.finalize('data');
    *     var encrypted = cipher.finalize(wordArray);
    */
			finalize: function finalize(dataUpdate) {
				// Final data update
				if (dataUpdate) {
					this._append(dataUpdate);
				}

				// Perform concrete-cipher logic
				var finalProcessedData = this._doFinalize();

				return finalProcessedData;
			},

			keySize: 128 / 32,

			ivSize: 128 / 32,

			_ENC_XFORM_MODE: 1,

			_DEC_XFORM_MODE: 2,

			/**
    * Creates shortcut functions to a cipher's object interface.
    *
    * @param {Cipher} cipher The cipher to create a helper for.
    *
    * @return {Object} An object with encrypt and decrypt shortcut functions.
    *
    * @static
    *
    * @example
    *
    *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
    */
			_createHelper: function () {
				function selectCipherStrategy(key) {
					if (typeof key == 'string') {
						return PasswordBasedCipher;
					} else {
						return SerializableCipher;
					}
				}

				return function (cipher) {
					return {
						encrypt: function encrypt(message, key, cfg) {
							return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
						},

						decrypt: function decrypt(ciphertext, key, cfg) {
							return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
						}
					};
				};
			}()
		});

		/**
   * Abstract base stream cipher template.
   *
   * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
   */
		var StreamCipher = C_lib.StreamCipher = Cipher.extend({
			_doFinalize: function _doFinalize() {
				// Process partial blocks
				var finalProcessedBlocks = this._process(!!'flush');

				return finalProcessedBlocks;
			},

			blockSize: 1
		});

		/**
   * Mode namespace.
   */
		var C_mode = C.mode = {};

		/**
   * Abstract base block cipher mode template.
   */
		var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
			/**
    * Creates this mode for encryption.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @static
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
    */
			createEncryptor: function createEncryptor(cipher, iv) {
				return this.Encryptor.create(cipher, iv);
			},

			/**
    * Creates this mode for decryption.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @static
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
    */
			createDecryptor: function createDecryptor(cipher, iv) {
				return this.Decryptor.create(cipher, iv);
			},

			/**
    * Initializes a newly created mode.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
    */
			init: function init(cipher, iv) {
				this._cipher = cipher;
				this._iv = iv;
			}
		});

		/**
   * Cipher Block Chaining mode.
   */
		var CBC = C_mode.CBC = function () {
			/**
    * Abstract base CBC mode.
    */
			var CBC = BlockCipherMode.extend();

			/**
    * CBC encryptor.
    */
			CBC.Encryptor = CBC.extend({
				/**
     * Processes the data block at offset.
     *
     * @param {Array} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
				processBlock: function processBlock(words, offset) {
					// Shortcuts
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;

					// XOR and encrypt
					xorBlock.call(this, words, offset, blockSize);
					cipher.encryptBlock(words, offset);

					// Remember this block to use with next block
					this._prevBlock = words.slice(offset, offset + blockSize);
				}
			});

			/**
    * CBC decryptor.
    */
			CBC.Decryptor = CBC.extend({
				/**
     * Processes the data block at offset.
     *
     * @param {Array} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
				processBlock: function processBlock(words, offset) {
					// Shortcuts
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;

					// Remember this block to use with next block
					var thisBlock = words.slice(offset, offset + blockSize);

					// Decrypt and XOR
					cipher.decryptBlock(words, offset);
					xorBlock.call(this, words, offset, blockSize);

					// This block becomes the previous block
					this._prevBlock = thisBlock;
				}
			});

			function xorBlock(words, offset, blockSize) {
				// Shortcut
				var iv = this._iv;

				// Choose mixing block
				if (iv) {
					var block = iv;

					// Remove IV for subsequent blocks
					this._iv = undefined;
				} else {
					var block = this._prevBlock;
				}

				// XOR blocks
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= block[i];
				}
			}

			return CBC;
		}();

		/**
   * Padding namespace.
   */
		var C_pad = C.pad = {};

		/**
   * PKCS #5/7 padding strategy.
   */
		var Pkcs7 = C_pad.Pkcs7 = {
			/**
    * Pads data using the algorithm defined in PKCS #5/7.
    *
    * @param {WordArray} data The data to pad.
    * @param {number} blockSize The multiple that the data should be padded to.
    *
    * @static
    *
    * @example
    *
    *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
    */
			pad: function pad(data, blockSize) {
				// Shortcut
				var blockSizeBytes = blockSize * 4;

				// Count padding bytes
				var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

				// Create padding word
				var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;

				// Create padding
				var paddingWords = [];
				for (var i = 0; i < nPaddingBytes; i += 4) {
					paddingWords.push(paddingWord);
				}
				var padding = WordArray.create(paddingWords, nPaddingBytes);

				// Add padding
				data.concat(padding);
			},

			/**
    * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
    *
    * @param {WordArray} data The data to unpad.
    *
    * @static
    *
    * @example
    *
    *     CryptoJS.pad.Pkcs7.unpad(wordArray);
    */
			unpad: function unpad(data) {
				// Get number of padding bytes from last byte
				var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

				// Remove padding
				data.sigBytes -= nPaddingBytes;
			}
		};

		/**
   * Abstract base block cipher template.
   *
   * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
   */
		var BlockCipher = C_lib.BlockCipher = Cipher.extend({
			/**
    * Configuration options.
    *
    * @property {Mode} mode The block mode to use. Default: CBC
    * @property {Padding} padding The padding strategy to use. Default: Pkcs7
    */
			cfg: Cipher.cfg.extend({
				mode: CBC,
				padding: Pkcs7
			}),

			reset: function reset() {
				// Reset cipher
				Cipher.reset.call(this);

				// Shortcuts
				var cfg = this.cfg;
				var iv = cfg.iv;
				var mode = cfg.mode;

				// Reset block mode
				if (this._xformMode == this._ENC_XFORM_MODE) {
					var modeCreator = mode.createEncryptor;
				} else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
						var modeCreator = mode.createDecryptor;
						// Keep at least one block in the buffer for unpadding
						this._minBufferSize = 1;
					}

				if (this._mode && this._mode.__creator == modeCreator) {
					this._mode.init(this, iv && iv.words);
				} else {
					this._mode = modeCreator.call(mode, this, iv && iv.words);
					this._mode.__creator = modeCreator;
				}
			},

			_doProcessBlock: function _doProcessBlock(words, offset) {
				this._mode.processBlock(words, offset);
			},

			_doFinalize: function _doFinalize() {
				// Shortcut
				var padding = this.cfg.padding;

				// Finalize
				if (this._xformMode == this._ENC_XFORM_MODE) {
					// Pad data
					padding.pad(this._data, this.blockSize);

					// Process final blocks
					var finalProcessedBlocks = this._process(!!'flush');
				} else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
						// Process final blocks
						var finalProcessedBlocks = this._process(!!'flush');

						// Unpad data
						padding.unpad(finalProcessedBlocks);
					}

				return finalProcessedBlocks;
			},

			blockSize: 128 / 32
		});

		/**
   * A collection of cipher parameters.
   *
   * @property {WordArray} ciphertext The raw ciphertext.
   * @property {WordArray} key The key to this ciphertext.
   * @property {WordArray} iv The IV used in the ciphering operation.
   * @property {WordArray} salt The salt used with a key derivation function.
   * @property {Cipher} algorithm The cipher algorithm.
   * @property {Mode} mode The block mode used in the ciphering operation.
   * @property {Padding} padding The padding scheme used in the ciphering operation.
   * @property {number} blockSize The block size of the cipher.
   * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
   */
		var CipherParams = C_lib.CipherParams = Base.extend({
			/**
    * Initializes a newly created cipher params object.
    *
    * @param {Object} cipherParams An object with any of the possible cipher parameters.
    *
    * @example
    *
    *     var cipherParams = CryptoJS.lib.CipherParams.create({
    *         ciphertext: ciphertextWordArray,
    *         key: keyWordArray,
    *         iv: ivWordArray,
    *         salt: saltWordArray,
    *         algorithm: CryptoJS.algo.AES,
    *         mode: CryptoJS.mode.CBC,
    *         padding: CryptoJS.pad.PKCS7,
    *         blockSize: 4,
    *         formatter: CryptoJS.format.OpenSSL
    *     });
    */
			init: function init(cipherParams) {
				this.mixIn(cipherParams);
			},

			/**
    * Converts this cipher params object to a string.
    *
    * @param {Format} formatter (Optional) The formatting strategy to use.
    *
    * @return {string} The stringified cipher params.
    *
    * @throws Error If neither the formatter nor the default formatter is set.
    *
    * @example
    *
    *     var string = cipherParams + '';
    *     var string = cipherParams.toString();
    *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
    */
			toString: function toString(formatter) {
				return (formatter || this.formatter).stringify(this);
			}
		});

		/**
   * Format namespace.
   */
		var C_format = C.format = {};

		/**
   * OpenSSL formatting strategy.
   */
		var OpenSSLFormatter = C_format.OpenSSL = {
			/**
    * Converts a cipher params object to an OpenSSL-compatible string.
    *
    * @param {CipherParams} cipherParams The cipher params object.
    *
    * @return {string} The OpenSSL-compatible string.
    *
    * @static
    *
    * @example
    *
    *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
    */
			stringify: function stringify(cipherParams) {
				// Shortcuts
				var ciphertext = cipherParams.ciphertext;
				var salt = cipherParams.salt;

				// Format
				if (salt) {
					var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
				} else {
					var wordArray = ciphertext;
				}

				return wordArray.toString(Base64);
			},

			/**
    * Converts an OpenSSL-compatible string to a cipher params object.
    *
    * @param {string} openSSLStr The OpenSSL-compatible string.
    *
    * @return {CipherParams} The cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
    */
			parse: function parse(openSSLStr) {
				// Parse base64
				var ciphertext = Base64.parse(openSSLStr);

				// Shortcut
				var ciphertextWords = ciphertext.words;

				// Test for salt
				if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
					// Extract salt
					var salt = WordArray.create(ciphertextWords.slice(2, 4));

					// Remove salt from ciphertext
					ciphertextWords.splice(0, 4);
					ciphertext.sigBytes -= 16;
				}

				return CipherParams.create({ ciphertext: ciphertext, salt: salt });
			}
		};

		/**
   * A cipher wrapper that returns ciphertext as a serializable cipher params object.
   */
		var SerializableCipher = C_lib.SerializableCipher = Base.extend({
			/**
    * Configuration options.
    *
    * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
    */
			cfg: Base.extend({
				format: OpenSSLFormatter
			}),

			/**
    * Encrypts a message.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {WordArray|string} message The message to encrypt.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {CipherParams} A cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    */
			encrypt: function encrypt(cipher, message, key, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Encrypt
				var encryptor = cipher.createEncryptor(key, cfg);
				var ciphertext = encryptor.finalize(message);

				// Shortcut
				var cipherCfg = encryptor.cfg;

				// Create and return serializable cipher params
				return CipherParams.create({
					ciphertext: ciphertext,
					key: key,
					iv: cipherCfg.iv,
					algorithm: cipher,
					mode: cipherCfg.mode,
					padding: cipherCfg.padding,
					blockSize: cipher.blockSize,
					formatter: cfg.format
				});
			},

			/**
    * Decrypts serialized ciphertext.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {WordArray} The plaintext.
    *
    * @static
    *
    * @example
    *
    *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    */
			decrypt: function decrypt(cipher, ciphertext, key, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Convert string to CipherParams
				ciphertext = this._parse(ciphertext, cfg.format);

				// Decrypt
				var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

				return plaintext;
			},

			/**
    * Converts serialized ciphertext to CipherParams,
    * else assumed CipherParams already and returns ciphertext unchanged.
    *
    * @param {CipherParams|string} ciphertext The ciphertext.
    * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
    *
    * @return {CipherParams} The unserialized ciphertext.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
    */
			_parse: function _parse(ciphertext, format) {
				if (typeof ciphertext == 'string') {
					return format.parse(ciphertext, this);
				} else {
					return ciphertext;
				}
			}
		});

		/**
   * Key derivation function namespace.
   */
		var C_kdf = C.kdf = {};

		/**
   * OpenSSL key derivation function.
   */
		var OpenSSLKdf = C_kdf.OpenSSL = {
			/**
    * Derives a key and IV from a password.
    *
    * @param {string} password The password to derive from.
    * @param {number} keySize The size in words of the key to generate.
    * @param {number} ivSize The size in words of the IV to generate.
    * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
    *
    * @return {CipherParams} A cipher params object with the key, IV, and salt.
    *
    * @static
    *
    * @example
    *
    *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
    *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
    */
			execute: function execute(password, keySize, ivSize, salt) {
				// Generate random salt
				if (!salt) {
					salt = WordArray.random(64 / 8);
				}

				// Derive key and IV
				var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

				// Separate key and IV
				var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
				key.sigBytes = keySize * 4;

				// Return params
				return CipherParams.create({ key: key, iv: iv, salt: salt });
			}
		};

		/**
   * A serializable cipher wrapper that derives the key from a password,
   * and returns ciphertext as a serializable cipher params object.
   */
		var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
			/**
    * Configuration options.
    *
    * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
    */
			cfg: SerializableCipher.cfg.extend({
				kdf: OpenSSLKdf
			}),

			/**
    * Encrypts a message using a password.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {WordArray|string} message The message to encrypt.
    * @param {string} password The password.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {CipherParams} A cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
    *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
    */
			encrypt: function encrypt(cipher, message, password, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Derive key and other params
				var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

				// Add IV to config
				cfg.iv = derivedParams.iv;

				// Encrypt
				var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

				// Mix in derived params
				ciphertext.mixIn(derivedParams);

				return ciphertext;
			},

			/**
    * Decrypts serialized ciphertext using a password.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
    * @param {string} password The password.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {WordArray} The plaintext.
    *
    * @static
    *
    * @example
    *
    *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
    *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
    */
			decrypt: function decrypt(cipher, ciphertext, password, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Convert string to CipherParams
				ciphertext = this._parse(ciphertext, cfg.format);

				// Derive key and other params
				var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

				// Add IV to config
				cfg.iv = derivedParams.iv;

				// Decrypt
				var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

				return plaintext;
			}
		});
	}();

	/**
  * Cipher Feedback block mode.
  */
	CryptoJS.mode.CFB = function () {
		var CFB = CryptoJS.lib.BlockCipherMode.extend();

		CFB.Encryptor = CFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;

				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				// Remember this block to use with next block
				this._prevBlock = words.slice(offset, offset + blockSize);
			}
		});

		CFB.Decryptor = CFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;

				// Remember this block to use with next block
				var thisBlock = words.slice(offset, offset + blockSize);

				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				// This block becomes the previous block
				this._prevBlock = thisBlock;
			}
		});

		function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
			// Shortcut
			var iv = this._iv;

			// Generate keystream
			if (iv) {
				var keystream = iv.slice(0);

				// Remove IV for subsequent blocks
				this._iv = undefined;
			} else {
				var keystream = this._prevBlock;
			}
			cipher.encryptBlock(keystream, 0);

			// Encrypt
			for (var i = 0; i < blockSize; i++) {
				words[offset + i] ^= keystream[i];
			}
		}

		return CFB;
	}();

	/**
  * Electronic Codebook block mode.
  */
	CryptoJS.mode.ECB = function () {
		var ECB = CryptoJS.lib.BlockCipherMode.extend();

		ECB.Encryptor = ECB.extend({
			processBlock: function processBlock(words, offset) {
				this._cipher.encryptBlock(words, offset);
			}
		});

		ECB.Decryptor = ECB.extend({
			processBlock: function processBlock(words, offset) {
				this._cipher.decryptBlock(words, offset);
			}
		});

		return ECB;
	}();

	/**
  * ANSI X.923 padding strategy.
  */
	CryptoJS.pad.AnsiX923 = {
		pad: function pad(data, blockSize) {
			// Shortcuts
			var dataSigBytes = data.sigBytes;
			var blockSizeBytes = blockSize * 4;

			// Count padding bytes
			var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

			// Compute last byte position
			var lastBytePos = dataSigBytes + nPaddingBytes - 1;

			// Pad
			data.clamp();
			data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
			data.sigBytes += nPaddingBytes;
		},

		unpad: function unpad(data) {
			// Get number of padding bytes from last byte
			var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

			// Remove padding
			data.sigBytes -= nPaddingBytes;
		}
	};

	/**
  * ISO 10126 padding strategy.
  */
	CryptoJS.pad.Iso10126 = {
		pad: function pad(data, blockSize) {
			// Shortcut
			var blockSizeBytes = blockSize * 4;

			// Count padding bytes
			var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

			// Pad
			data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		},

		unpad: function unpad(data) {
			// Get number of padding bytes from last byte
			var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

			// Remove padding
			data.sigBytes -= nPaddingBytes;
		}
	};

	/**
  * ISO/IEC 9797-1 Padding Method 2.
  */
	CryptoJS.pad.Iso97971 = {
		pad: function pad(data, blockSize) {
			// Add 0x80 byte
			data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

			// Zero pad the rest
			CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		},

		unpad: function unpad(data) {
			// Remove zero padding
			CryptoJS.pad.ZeroPadding.unpad(data);

			// Remove one more byte -- the 0x80 byte
			data.sigBytes--;
		}
	};

	/**
  * Output Feedback block mode.
  */
	CryptoJS.mode.OFB = function () {
		var OFB = CryptoJS.lib.BlockCipherMode.extend();

		var Encryptor = OFB.Encryptor = OFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var keystream = this._keystream;

				// Generate keystream
				if (iv) {
					keystream = this._keystream = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}
				cipher.encryptBlock(keystream, 0);

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		OFB.Decryptor = Encryptor;

		return OFB;
	}();

	/**
  * A noop padding strategy.
  */
	CryptoJS.pad.NoPadding = {
		pad: function pad() {},

		unpad: function unpad() {}
	};

	(function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var CipherParams = C_lib.CipherParams;
		var C_enc = C.enc;
		var Hex = C_enc.Hex;
		var C_format = C.format;

		var HexFormatter = C_format.Hex = {
			/**
    * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
    *
    * @param {CipherParams} cipherParams The cipher params object.
    *
    * @return {string} The hexadecimally encoded string.
    *
    * @static
    *
    * @example
    *
    *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
    */
			stringify: function stringify(cipherParams) {
				return cipherParams.ciphertext.toString(Hex);
			},

			/**
    * Converts a hexadecimally encoded ciphertext string to a cipher params object.
    *
    * @param {string} input The hexadecimally encoded string.
    *
    * @return {CipherParams} The cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
    */
			parse: function parse(input) {
				var ciphertext = Hex.parse(input);
				return CipherParams.create({ ciphertext: ciphertext });
			}
		};
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var BlockCipher = C_lib.BlockCipher;
		var C_algo = C.algo;

		// Lookup tables
		var SBOX = [];
		var INV_SBOX = [];
		var SUB_MIX_0 = [];
		var SUB_MIX_1 = [];
		var SUB_MIX_2 = [];
		var SUB_MIX_3 = [];
		var INV_SUB_MIX_0 = [];
		var INV_SUB_MIX_1 = [];
		var INV_SUB_MIX_2 = [];
		var INV_SUB_MIX_3 = [];

		// Compute lookup tables
		(function () {
			// Compute double table
			var d = [];
			for (var i = 0; i < 256; i++) {
				if (i < 128) {
					d[i] = i << 1;
				} else {
					d[i] = i << 1 ^ 0x11b;
				}
			}

			// Walk GF(2^8)
			var x = 0;
			var xi = 0;
			for (var i = 0; i < 256; i++) {
				// Compute sbox
				var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
				sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
				SBOX[x] = sx;
				INV_SBOX[sx] = x;

				// Compute multiplication
				var x2 = d[x];
				var x4 = d[x2];
				var x8 = d[x4];

				// Compute sub bytes, mix columns tables
				var t = d[sx] * 0x101 ^ sx * 0x1010100;
				SUB_MIX_0[x] = t << 24 | t >>> 8;
				SUB_MIX_1[x] = t << 16 | t >>> 16;
				SUB_MIX_2[x] = t << 8 | t >>> 24;
				SUB_MIX_3[x] = t;

				// Compute inv sub bytes, inv mix columns tables
				var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
				INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
				INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
				INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
				INV_SUB_MIX_3[sx] = t;

				// Compute next counter
				if (!x) {
					x = xi = 1;
				} else {
					x = x2 ^ d[d[d[x8 ^ x2]]];
					xi ^= d[d[xi]];
				}
			}
		})();

		// Precomputed Rcon lookup
		var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

		/**
   * AES block cipher algorithm.
   */
		var AES = C_algo.AES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Skip reset of nRounds has been set before and key did not change
				if (this._nRounds && this._keyPriorReset === this._key) {
					return;
				}

				// Shortcuts
				var key = this._keyPriorReset = this._key;
				var keyWords = key.words;
				var keySize = key.sigBytes / 4;

				// Compute number of rounds
				var nRounds = this._nRounds = keySize + 6;

				// Compute number of key schedule rows
				var ksRows = (nRounds + 1) * 4;

				// Compute key schedule
				var keySchedule = this._keySchedule = [];
				for (var ksRow = 0; ksRow < ksRows; ksRow++) {
					if (ksRow < keySize) {
						keySchedule[ksRow] = keyWords[ksRow];
					} else {
						var t = keySchedule[ksRow - 1];

						if (!(ksRow % keySize)) {
							// Rot word
							t = t << 8 | t >>> 24;

							// Sub word
							t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];

							// Mix Rcon
							t ^= RCON[ksRow / keySize | 0] << 24;
						} else if (keySize > 6 && ksRow % keySize == 4) {
							// Sub word
							t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
						}

						keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
					}
				}

				// Compute inv key schedule
				var invKeySchedule = this._invKeySchedule = [];
				for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
					var ksRow = ksRows - invKsRow;

					if (invKsRow % 4) {
						var t = keySchedule[ksRow];
					} else {
						var t = keySchedule[ksRow - 4];
					}

					if (invKsRow < 4 || ksRow <= 4) {
						invKeySchedule[invKsRow] = t;
					} else {
						invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
					}
				}
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
			},

			decryptBlock: function decryptBlock(M, offset) {
				// Swap 2nd and 4th rows
				var t = M[offset + 1];
				M[offset + 1] = M[offset + 3];
				M[offset + 3] = t;

				this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

				// Inv swap 2nd and 4th rows
				var t = M[offset + 1];
				M[offset + 1] = M[offset + 3];
				M[offset + 3] = t;
			},

			_doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
				// Shortcut
				var nRounds = this._nRounds;

				// Get input, add round key
				var s0 = M[offset] ^ keySchedule[0];
				var s1 = M[offset + 1] ^ keySchedule[1];
				var s2 = M[offset + 2] ^ keySchedule[2];
				var s3 = M[offset + 3] ^ keySchedule[3];

				// Key schedule row counter
				var ksRow = 4;

				// Rounds
				for (var round = 1; round < nRounds; round++) {
					// Shift rows, sub bytes, mix columns, add round key
					var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
					var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
					var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
					var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

					// Update state
					s0 = t0;
					s1 = t1;
					s2 = t2;
					s3 = t3;
				}

				// Shift rows, sub bytes, add round key
				var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
				var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
				var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
				var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

				// Set output
				M[offset] = t0;
				M[offset + 1] = t1;
				M[offset + 2] = t2;
				M[offset + 3] = t3;
			},

			keySize: 256 / 32
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
   */
		C.AES = BlockCipher._createHelper(AES);
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var BlockCipher = C_lib.BlockCipher;
		var C_algo = C.algo;

		// Permuted Choice 1 constants
		var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

		// Permuted Choice 2 constants
		var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

		// Cumulative bit shift constants
		var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

		// SBOXes and round permutation constants
		var SBOX_P = [{
			0x0: 0x808200,
			0x10000000: 0x8000,
			0x20000000: 0x808002,
			0x30000000: 0x2,
			0x40000000: 0x200,
			0x50000000: 0x808202,
			0x60000000: 0x800202,
			0x70000000: 0x800000,
			0x80000000: 0x202,
			0x90000000: 0x800200,
			0xa0000000: 0x8200,
			0xb0000000: 0x808000,
			0xc0000000: 0x8002,
			0xd0000000: 0x800002,
			0xe0000000: 0x0,
			0xf0000000: 0x8202,
			0x8000000: 0x0,
			0x18000000: 0x808202,
			0x28000000: 0x8202,
			0x38000000: 0x8000,
			0x48000000: 0x808200,
			0x58000000: 0x200,
			0x68000000: 0x808002,
			0x78000000: 0x2,
			0x88000000: 0x800200,
			0x98000000: 0x8200,
			0xa8000000: 0x808000,
			0xb8000000: 0x800202,
			0xc8000000: 0x800002,
			0xd8000000: 0x8002,
			0xe8000000: 0x202,
			0xf8000000: 0x800000,
			0x1: 0x8000,
			0x10000001: 0x2,
			0x20000001: 0x808200,
			0x30000001: 0x800000,
			0x40000001: 0x808002,
			0x50000001: 0x8200,
			0x60000001: 0x200,
			0x70000001: 0x800202,
			0x80000001: 0x808202,
			0x90000001: 0x808000,
			0xa0000001: 0x800002,
			0xb0000001: 0x8202,
			0xc0000001: 0x202,
			0xd0000001: 0x800200,
			0xe0000001: 0x8002,
			0xf0000001: 0x0,
			0x8000001: 0x808202,
			0x18000001: 0x808000,
			0x28000001: 0x800000,
			0x38000001: 0x200,
			0x48000001: 0x8000,
			0x58000001: 0x800002,
			0x68000001: 0x2,
			0x78000001: 0x8202,
			0x88000001: 0x8002,
			0x98000001: 0x800202,
			0xa8000001: 0x202,
			0xb8000001: 0x808200,
			0xc8000001: 0x800200,
			0xd8000001: 0x0,
			0xe8000001: 0x8200,
			0xf8000001: 0x808002
		}, {
			0x0: 0x40084010,
			0x1000000: 0x4000,
			0x2000000: 0x80000,
			0x3000000: 0x40080010,
			0x4000000: 0x40000010,
			0x5000000: 0x40084000,
			0x6000000: 0x40004000,
			0x7000000: 0x10,
			0x8000000: 0x84000,
			0x9000000: 0x40004010,
			0xa000000: 0x40000000,
			0xb000000: 0x84010,
			0xc000000: 0x80010,
			0xd000000: 0x0,
			0xe000000: 0x4010,
			0xf000000: 0x40080000,
			0x800000: 0x40004000,
			0x1800000: 0x84010,
			0x2800000: 0x10,
			0x3800000: 0x40004010,
			0x4800000: 0x40084010,
			0x5800000: 0x40000000,
			0x6800000: 0x80000,
			0x7800000: 0x40080010,
			0x8800000: 0x80010,
			0x9800000: 0x0,
			0xa800000: 0x4000,
			0xb800000: 0x40080000,
			0xc800000: 0x40000010,
			0xd800000: 0x84000,
			0xe800000: 0x40084000,
			0xf800000: 0x4010,
			0x10000000: 0x0,
			0x11000000: 0x40080010,
			0x12000000: 0x40004010,
			0x13000000: 0x40084000,
			0x14000000: 0x40080000,
			0x15000000: 0x10,
			0x16000000: 0x84010,
			0x17000000: 0x4000,
			0x18000000: 0x4010,
			0x19000000: 0x80000,
			0x1a000000: 0x80010,
			0x1b000000: 0x40000010,
			0x1c000000: 0x84000,
			0x1d000000: 0x40004000,
			0x1e000000: 0x40000000,
			0x1f000000: 0x40084010,
			0x10800000: 0x84010,
			0x11800000: 0x80000,
			0x12800000: 0x40080000,
			0x13800000: 0x4000,
			0x14800000: 0x40004000,
			0x15800000: 0x40084010,
			0x16800000: 0x10,
			0x17800000: 0x40000000,
			0x18800000: 0x40084000,
			0x19800000: 0x40000010,
			0x1a800000: 0x40004010,
			0x1b800000: 0x80010,
			0x1c800000: 0x0,
			0x1d800000: 0x4010,
			0x1e800000: 0x40080010,
			0x1f800000: 0x84000
		}, {
			0x0: 0x104,
			0x100000: 0x0,
			0x200000: 0x4000100,
			0x300000: 0x10104,
			0x400000: 0x10004,
			0x500000: 0x4000004,
			0x600000: 0x4010104,
			0x700000: 0x4010000,
			0x800000: 0x4000000,
			0x900000: 0x4010100,
			0xa00000: 0x10100,
			0xb00000: 0x4010004,
			0xc00000: 0x4000104,
			0xd00000: 0x10000,
			0xe00000: 0x4,
			0xf00000: 0x100,
			0x80000: 0x4010100,
			0x180000: 0x4010004,
			0x280000: 0x0,
			0x380000: 0x4000100,
			0x480000: 0x4000004,
			0x580000: 0x10000,
			0x680000: 0x10004,
			0x780000: 0x104,
			0x880000: 0x4,
			0x980000: 0x100,
			0xa80000: 0x4010000,
			0xb80000: 0x10104,
			0xc80000: 0x10100,
			0xd80000: 0x4000104,
			0xe80000: 0x4010104,
			0xf80000: 0x4000000,
			0x1000000: 0x4010100,
			0x1100000: 0x10004,
			0x1200000: 0x10000,
			0x1300000: 0x4000100,
			0x1400000: 0x100,
			0x1500000: 0x4010104,
			0x1600000: 0x4000004,
			0x1700000: 0x0,
			0x1800000: 0x4000104,
			0x1900000: 0x4000000,
			0x1a00000: 0x4,
			0x1b00000: 0x10100,
			0x1c00000: 0x4010000,
			0x1d00000: 0x104,
			0x1e00000: 0x10104,
			0x1f00000: 0x4010004,
			0x1080000: 0x4000000,
			0x1180000: 0x104,
			0x1280000: 0x4010100,
			0x1380000: 0x0,
			0x1480000: 0x10004,
			0x1580000: 0x4000100,
			0x1680000: 0x100,
			0x1780000: 0x4010004,
			0x1880000: 0x10000,
			0x1980000: 0x4010104,
			0x1a80000: 0x10104,
			0x1b80000: 0x4000004,
			0x1c80000: 0x4000104,
			0x1d80000: 0x4010000,
			0x1e80000: 0x4,
			0x1f80000: 0x10100
		}, {
			0x0: 0x80401000,
			0x10000: 0x80001040,
			0x20000: 0x401040,
			0x30000: 0x80400000,
			0x40000: 0x0,
			0x50000: 0x401000,
			0x60000: 0x80000040,
			0x70000: 0x400040,
			0x80000: 0x80000000,
			0x90000: 0x400000,
			0xa0000: 0x40,
			0xb0000: 0x80001000,
			0xc0000: 0x80400040,
			0xd0000: 0x1040,
			0xe0000: 0x1000,
			0xf0000: 0x80401040,
			0x8000: 0x80001040,
			0x18000: 0x40,
			0x28000: 0x80400040,
			0x38000: 0x80001000,
			0x48000: 0x401000,
			0x58000: 0x80401040,
			0x68000: 0x0,
			0x78000: 0x80400000,
			0x88000: 0x1000,
			0x98000: 0x80401000,
			0xa8000: 0x400000,
			0xb8000: 0x1040,
			0xc8000: 0x80000000,
			0xd8000: 0x400040,
			0xe8000: 0x401040,
			0xf8000: 0x80000040,
			0x100000: 0x400040,
			0x110000: 0x401000,
			0x120000: 0x80000040,
			0x130000: 0x0,
			0x140000: 0x1040,
			0x150000: 0x80400040,
			0x160000: 0x80401000,
			0x170000: 0x80001040,
			0x180000: 0x80401040,
			0x190000: 0x80000000,
			0x1a0000: 0x80400000,
			0x1b0000: 0x401040,
			0x1c0000: 0x80001000,
			0x1d0000: 0x400000,
			0x1e0000: 0x40,
			0x1f0000: 0x1000,
			0x108000: 0x80400000,
			0x118000: 0x80401040,
			0x128000: 0x0,
			0x138000: 0x401000,
			0x148000: 0x400040,
			0x158000: 0x80000000,
			0x168000: 0x80001040,
			0x178000: 0x40,
			0x188000: 0x80000040,
			0x198000: 0x1000,
			0x1a8000: 0x80001000,
			0x1b8000: 0x80400040,
			0x1c8000: 0x1040,
			0x1d8000: 0x80401000,
			0x1e8000: 0x400000,
			0x1f8000: 0x401040
		}, {
			0x0: 0x80,
			0x1000: 0x1040000,
			0x2000: 0x40000,
			0x3000: 0x20000000,
			0x4000: 0x20040080,
			0x5000: 0x1000080,
			0x6000: 0x21000080,
			0x7000: 0x40080,
			0x8000: 0x1000000,
			0x9000: 0x20040000,
			0xa000: 0x20000080,
			0xb000: 0x21040080,
			0xc000: 0x21040000,
			0xd000: 0x0,
			0xe000: 0x1040080,
			0xf000: 0x21000000,
			0x800: 0x1040080,
			0x1800: 0x21000080,
			0x2800: 0x80,
			0x3800: 0x1040000,
			0x4800: 0x40000,
			0x5800: 0x20040080,
			0x6800: 0x21040000,
			0x7800: 0x20000000,
			0x8800: 0x20040000,
			0x9800: 0x0,
			0xa800: 0x21040080,
			0xb800: 0x1000080,
			0xc800: 0x20000080,
			0xd800: 0x21000000,
			0xe800: 0x1000000,
			0xf800: 0x40080,
			0x10000: 0x40000,
			0x11000: 0x80,
			0x12000: 0x20000000,
			0x13000: 0x21000080,
			0x14000: 0x1000080,
			0x15000: 0x21040000,
			0x16000: 0x20040080,
			0x17000: 0x1000000,
			0x18000: 0x21040080,
			0x19000: 0x21000000,
			0x1a000: 0x1040000,
			0x1b000: 0x20040000,
			0x1c000: 0x40080,
			0x1d000: 0x20000080,
			0x1e000: 0x0,
			0x1f000: 0x1040080,
			0x10800: 0x21000080,
			0x11800: 0x1000000,
			0x12800: 0x1040000,
			0x13800: 0x20040080,
			0x14800: 0x20000000,
			0x15800: 0x1040080,
			0x16800: 0x80,
			0x17800: 0x21040000,
			0x18800: 0x40080,
			0x19800: 0x21040080,
			0x1a800: 0x0,
			0x1b800: 0x21000000,
			0x1c800: 0x1000080,
			0x1d800: 0x40000,
			0x1e800: 0x20040000,
			0x1f800: 0x20000080
		}, {
			0x0: 0x10000008,
			0x100: 0x2000,
			0x200: 0x10200000,
			0x300: 0x10202008,
			0x400: 0x10002000,
			0x500: 0x200000,
			0x600: 0x200008,
			0x700: 0x10000000,
			0x800: 0x0,
			0x900: 0x10002008,
			0xa00: 0x202000,
			0xb00: 0x8,
			0xc00: 0x10200008,
			0xd00: 0x202008,
			0xe00: 0x2008,
			0xf00: 0x10202000,
			0x80: 0x10200000,
			0x180: 0x10202008,
			0x280: 0x8,
			0x380: 0x200000,
			0x480: 0x202008,
			0x580: 0x10000008,
			0x680: 0x10002000,
			0x780: 0x2008,
			0x880: 0x200008,
			0x980: 0x2000,
			0xa80: 0x10002008,
			0xb80: 0x10200008,
			0xc80: 0x0,
			0xd80: 0x10202000,
			0xe80: 0x202000,
			0xf80: 0x10000000,
			0x1000: 0x10002000,
			0x1100: 0x10200008,
			0x1200: 0x10202008,
			0x1300: 0x2008,
			0x1400: 0x200000,
			0x1500: 0x10000000,
			0x1600: 0x10000008,
			0x1700: 0x202000,
			0x1800: 0x202008,
			0x1900: 0x0,
			0x1a00: 0x8,
			0x1b00: 0x10200000,
			0x1c00: 0x2000,
			0x1d00: 0x10002008,
			0x1e00: 0x10202000,
			0x1f00: 0x200008,
			0x1080: 0x8,
			0x1180: 0x202000,
			0x1280: 0x200000,
			0x1380: 0x10000008,
			0x1480: 0x10002000,
			0x1580: 0x2008,
			0x1680: 0x10202008,
			0x1780: 0x10200000,
			0x1880: 0x10202000,
			0x1980: 0x10200008,
			0x1a80: 0x2000,
			0x1b80: 0x202008,
			0x1c80: 0x200008,
			0x1d80: 0x0,
			0x1e80: 0x10000000,
			0x1f80: 0x10002008
		}, {
			0x0: 0x100000,
			0x10: 0x2000401,
			0x20: 0x400,
			0x30: 0x100401,
			0x40: 0x2100401,
			0x50: 0x0,
			0x60: 0x1,
			0x70: 0x2100001,
			0x80: 0x2000400,
			0x90: 0x100001,
			0xa0: 0x2000001,
			0xb0: 0x2100400,
			0xc0: 0x2100000,
			0xd0: 0x401,
			0xe0: 0x100400,
			0xf0: 0x2000000,
			0x8: 0x2100001,
			0x18: 0x0,
			0x28: 0x2000401,
			0x38: 0x2100400,
			0x48: 0x100000,
			0x58: 0x2000001,
			0x68: 0x2000000,
			0x78: 0x401,
			0x88: 0x100401,
			0x98: 0x2000400,
			0xa8: 0x2100000,
			0xb8: 0x100001,
			0xc8: 0x400,
			0xd8: 0x2100401,
			0xe8: 0x1,
			0xf8: 0x100400,
			0x100: 0x2000000,
			0x110: 0x100000,
			0x120: 0x2000401,
			0x130: 0x2100001,
			0x140: 0x100001,
			0x150: 0x2000400,
			0x160: 0x2100400,
			0x170: 0x100401,
			0x180: 0x401,
			0x190: 0x2100401,
			0x1a0: 0x100400,
			0x1b0: 0x1,
			0x1c0: 0x0,
			0x1d0: 0x2100000,
			0x1e0: 0x2000001,
			0x1f0: 0x400,
			0x108: 0x100400,
			0x118: 0x2000401,
			0x128: 0x2100001,
			0x138: 0x1,
			0x148: 0x2000000,
			0x158: 0x100000,
			0x168: 0x401,
			0x178: 0x2100400,
			0x188: 0x2000001,
			0x198: 0x2100000,
			0x1a8: 0x0,
			0x1b8: 0x2100401,
			0x1c8: 0x100401,
			0x1d8: 0x400,
			0x1e8: 0x2000400,
			0x1f8: 0x100001
		}, {
			0x0: 0x8000820,
			0x1: 0x20000,
			0x2: 0x8000000,
			0x3: 0x20,
			0x4: 0x20020,
			0x5: 0x8020820,
			0x6: 0x8020800,
			0x7: 0x800,
			0x8: 0x8020000,
			0x9: 0x8000800,
			0xa: 0x20800,
			0xb: 0x8020020,
			0xc: 0x820,
			0xd: 0x0,
			0xe: 0x8000020,
			0xf: 0x20820,
			0x80000000: 0x800,
			0x80000001: 0x8020820,
			0x80000002: 0x8000820,
			0x80000003: 0x8000000,
			0x80000004: 0x8020000,
			0x80000005: 0x20800,
			0x80000006: 0x20820,
			0x80000007: 0x20,
			0x80000008: 0x8000020,
			0x80000009: 0x820,
			0x8000000a: 0x20020,
			0x8000000b: 0x8020800,
			0x8000000c: 0x0,
			0x8000000d: 0x8020020,
			0x8000000e: 0x8000800,
			0x8000000f: 0x20000,
			0x10: 0x20820,
			0x11: 0x8020800,
			0x12: 0x20,
			0x13: 0x800,
			0x14: 0x8000800,
			0x15: 0x8000020,
			0x16: 0x8020020,
			0x17: 0x20000,
			0x18: 0x0,
			0x19: 0x20020,
			0x1a: 0x8020000,
			0x1b: 0x8000820,
			0x1c: 0x8020820,
			0x1d: 0x20800,
			0x1e: 0x820,
			0x1f: 0x8000000,
			0x80000010: 0x20000,
			0x80000011: 0x800,
			0x80000012: 0x8020020,
			0x80000013: 0x20820,
			0x80000014: 0x20,
			0x80000015: 0x8020000,
			0x80000016: 0x8000000,
			0x80000017: 0x8000820,
			0x80000018: 0x8020820,
			0x80000019: 0x8000020,
			0x8000001a: 0x8000800,
			0x8000001b: 0x0,
			0x8000001c: 0x20800,
			0x8000001d: 0x820,
			0x8000001e: 0x20020,
			0x8000001f: 0x8020800
		}];

		// Masks that select the SBOX input
		var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

		/**
   * DES block cipher algorithm.
   */
		var DES = C_algo.DES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;

				// Select 56 bits according to PC1
				var keyBits = [];
				for (var i = 0; i < 56; i++) {
					var keyBitPos = PC1[i] - 1;
					keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
				}

				// Assemble 16 subkeys
				var subKeys = this._subKeys = [];
				for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
					// Create subkey
					var subKey = subKeys[nSubKey] = [];

					// Shortcut
					var bitShift = BIT_SHIFTS[nSubKey];

					// Select 48 bits according to PC2
					for (var i = 0; i < 24; i++) {
						// Select from the left 28 key bits
						subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;

						// Select from the right 28 key bits
						subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
					}

					// Since each subkey is applied to an expanded 32-bit input,
					// the subkey can be broken into 8 values scaled to 32-bits,
					// which allows the key to be used without expansion
					subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
					for (var i = 1; i < 7; i++) {
						subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
					}
					subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
				}

				// Compute inverse subkeys
				var invSubKeys = this._invSubKeys = [];
				for (var i = 0; i < 16; i++) {
					invSubKeys[i] = subKeys[15 - i];
				}
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._subKeys);
			},

			decryptBlock: function decryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._invSubKeys);
			},

			_doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
				// Get input
				this._lBlock = M[offset];
				this._rBlock = M[offset + 1];

				// Initial permutation
				exchangeLR.call(this, 4, 0x0f0f0f0f);
				exchangeLR.call(this, 16, 0x0000ffff);
				exchangeRL.call(this, 2, 0x33333333);
				exchangeRL.call(this, 8, 0x00ff00ff);
				exchangeLR.call(this, 1, 0x55555555);

				// Rounds
				for (var round = 0; round < 16; round++) {
					// Shortcuts
					var subKey = subKeys[round];
					var lBlock = this._lBlock;
					var rBlock = this._rBlock;

					// Feistel function
					var f = 0;
					for (var i = 0; i < 8; i++) {
						f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
					}
					this._lBlock = rBlock;
					this._rBlock = lBlock ^ f;
				}

				// Undo swap from last round
				var t = this._lBlock;
				this._lBlock = this._rBlock;
				this._rBlock = t;

				// Final permutation
				exchangeLR.call(this, 1, 0x55555555);
				exchangeRL.call(this, 8, 0x00ff00ff);
				exchangeRL.call(this, 2, 0x33333333);
				exchangeLR.call(this, 16, 0x0000ffff);
				exchangeLR.call(this, 4, 0x0f0f0f0f);

				// Set output
				M[offset] = this._lBlock;
				M[offset + 1] = this._rBlock;
			},

			keySize: 64 / 32,

			ivSize: 64 / 32,

			blockSize: 64 / 32
		});

		// Swap bits across the left and right words
		function exchangeLR(offset, mask) {
			var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
			this._rBlock ^= t;
			this._lBlock ^= t << offset;
		}

		function exchangeRL(offset, mask) {
			var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
			this._lBlock ^= t;
			this._rBlock ^= t << offset;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
   */
		C.DES = BlockCipher._createHelper(DES);

		/**
   * Triple-DES block cipher algorithm.
   */
		var TripleDES = C_algo.TripleDES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;

				// Create DES instances
				this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
				this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
				this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._des1.encryptBlock(M, offset);
				this._des2.decryptBlock(M, offset);
				this._des3.encryptBlock(M, offset);
			},

			decryptBlock: function decryptBlock(M, offset) {
				this._des3.decryptBlock(M, offset);
				this._des2.encryptBlock(M, offset);
				this._des1.decryptBlock(M, offset);
			},

			keySize: 192 / 32,

			ivSize: 64 / 32,

			blockSize: 64 / 32
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
   */
		C.TripleDES = BlockCipher._createHelper(TripleDES);
	})();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		/**
   * RC4 stream cipher algorithm.
   */
		var RC4 = C_algo.RC4 = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;
				var keySigBytes = key.sigBytes;

				// Init sbox
				var S = this._S = [];
				for (var i = 0; i < 256; i++) {
					S[i] = i;
				}

				// Key setup
				for (var i = 0, j = 0; i < 256; i++) {
					var keyByteIndex = i % keySigBytes;
					var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 0xff;

					j = (j + S[i] + keyByte) % 256;

					// Swap
					var t = S[i];
					S[i] = S[j];
					S[j] = t;
				}

				// Counters
				this._i = this._j = 0;
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				M[offset] ^= generateKeystreamWord.call(this);
			},

			keySize: 256 / 32,

			ivSize: 0
		});

		function generateKeystreamWord() {
			// Shortcuts
			var S = this._S;
			var i = this._i;
			var j = this._j;

			// Generate keystream word
			var keystreamWord = 0;
			for (var n = 0; n < 4; n++) {
				i = (i + 1) % 256;
				j = (j + S[i]) % 256;

				// Swap
				var t = S[i];
				S[i] = S[j];
				S[j] = t;

				keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
			}

			// Update counters
			this._i = i;
			this._j = j;

			return keystreamWord;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
   */
		C.RC4 = StreamCipher._createHelper(RC4);

		/**
   * Modified RC4 stream cipher algorithm.
   */
		var RC4Drop = C_algo.RC4Drop = RC4.extend({
			/**
    * Configuration options.
    *
    * @property {number} drop The number of keystream words to drop. Default 192
    */
			cfg: RC4.cfg.extend({
				drop: 192
			}),

			_doReset: function _doReset() {
				RC4._doReset.call(this);

				// Drop
				for (var i = this.cfg.drop; i > 0; i--) {
					generateKeystreamWord.call(this);
				}
			}
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
   */
		C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	})();

	/** @preserve
  * Counter block mode compatible with  Dr Brian Gladman fileenc.c
  * derived from CryptoJS.mode.CTR
  * Jan Hruby jhruby.web@gmail.com
  */
	CryptoJS.mode.CTRGladman = function () {
		var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word) {
			if ((word >> 24 & 0xff) === 0xff) {
				//overflow
				var b1 = word >> 16 & 0xff;
				var b2 = word >> 8 & 0xff;
				var b3 = word & 0xff;

				if (b1 === 0xff) // overflow b1
					{
						b1 = 0;
						if (b2 === 0xff) {
							b2 = 0;
							if (b3 === 0xff) {
								b3 = 0;
							} else {
								++b3;
							}
						} else {
							++b2;
						}
					} else {
					++b1;
				}

				word = 0;
				word += b1 << 16;
				word += b2 << 8;
				word += b3;
			} else {
				word += 0x01 << 24;
			}
			return word;
		}

		function incCounter(counter) {
			if ((counter[0] = incWord(counter[0])) === 0) {
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

		var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;

				// Generate keystream
				if (iv) {
					counter = this._counter = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}

				incCounter(counter);

				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		CTRGladman.Decryptor = Encryptor;

		return CTRGladman;
	}();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		// Reusable objects
		var S = [];
		var C_ = [];
		var G = [];

		/**
   * Rabbit stream cipher algorithm
   */
		var Rabbit = C_algo.Rabbit = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var K = this._key.words;
				var iv = this.cfg.iv;

				// Swap endian
				for (var i = 0; i < 4; i++) {
					K[i] = (K[i] << 8 | K[i] >>> 24) & 0x00ff00ff | (K[i] << 24 | K[i] >>> 8) & 0xff00ff00;
				}

				// Generate initial state values
				var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

				// Generate initial counter values
				var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

				// Carry bit
				this._b = 0;

				// Iterate the system four times
				for (var i = 0; i < 4; i++) {
					nextState.call(this);
				}

				// Modify the counters
				for (var i = 0; i < 8; i++) {
					C[i] ^= X[i + 4 & 7];
				}

				// IV setup
				if (iv) {
					// Shortcuts
					var IV = iv.words;
					var IV_0 = IV[0];
					var IV_1 = IV[1];

					// Generate four subvectors
					var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
					var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
					var i1 = i0 >>> 16 | i2 & 0xffff0000;
					var i3 = i2 << 16 | i0 & 0x0000ffff;

					// Modify counter values
					C[0] ^= i0;
					C[1] ^= i1;
					C[2] ^= i2;
					C[3] ^= i3;
					C[4] ^= i0;
					C[5] ^= i1;
					C[6] ^= i2;
					C[7] ^= i3;

					// Iterate the system four times
					for (var i = 0; i < 4; i++) {
						nextState.call(this);
					}
				}
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var X = this._X;

				// Iterate the system
				nextState.call(this);

				// Generate four keystream words
				S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
				S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
				S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
				S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;

				for (var i = 0; i < 4; i++) {
					// Swap endian
					S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

					// Encrypt
					M[offset + i] ^= S[i];
				}
			},

			blockSize: 128 / 32,

			ivSize: 64 / 32
		});

		function nextState() {
			// Shortcuts
			var X = this._X;
			var C = this._C;

			// Save old counter values
			for (var i = 0; i < 8; i++) {
				C_[i] = C[i];
			}

			// Calculate new counter values
			C[0] = C[0] + 0x4d34d34d + this._b | 0;
			C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
			C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
			C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
			C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
			C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
			C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
			C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
			this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

			// Calculate the g-values
			for (var i = 0; i < 8; i++) {
				var gx = X[i] + C[i];

				// Construct high and low argument for squaring
				var ga = gx & 0xffff;
				var gb = gx >>> 16;

				// Calculate high and low result of squaring
				var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
				var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

				// High XOR low
				G[i] = gh ^ gl;
			}

			// Calculate new state values
			X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
			X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
			X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
			X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
			X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
			X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
			X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
			X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
   */
		C.Rabbit = StreamCipher._createHelper(Rabbit);
	})();

	/**
  * Counter block mode.
  */
	CryptoJS.mode.CTR = function () {
		var CTR = CryptoJS.lib.BlockCipherMode.extend();

		var Encryptor = CTR.Encryptor = CTR.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;

				// Generate keystream
				if (iv) {
					counter = this._counter = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}
				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);

				// Increment counter
				counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		CTR.Decryptor = Encryptor;

		return CTR;
	}();

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		// Reusable objects
		var S = [];
		var C_ = [];
		var G = [];

		/**
   * Rabbit stream cipher algorithm.
   *
   * This is a legacy version that neglected to convert the key to little-endian.
   * This error doesn't affect the cipher's security,
   * but it does affect its compatibility with other implementations.
   */
		var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var K = this._key.words;
				var iv = this.cfg.iv;

				// Generate initial state values
				var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

				// Generate initial counter values
				var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

				// Carry bit
				this._b = 0;

				// Iterate the system four times
				for (var i = 0; i < 4; i++) {
					nextState.call(this);
				}

				// Modify the counters
				for (var i = 0; i < 8; i++) {
					C[i] ^= X[i + 4 & 7];
				}

				// IV setup
				if (iv) {
					// Shortcuts
					var IV = iv.words;
					var IV_0 = IV[0];
					var IV_1 = IV[1];

					// Generate four subvectors
					var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
					var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
					var i1 = i0 >>> 16 | i2 & 0xffff0000;
					var i3 = i2 << 16 | i0 & 0x0000ffff;

					// Modify counter values
					C[0] ^= i0;
					C[1] ^= i1;
					C[2] ^= i2;
					C[3] ^= i3;
					C[4] ^= i0;
					C[5] ^= i1;
					C[6] ^= i2;
					C[7] ^= i3;

					// Iterate the system four times
					for (var i = 0; i < 4; i++) {
						nextState.call(this);
					}
				}
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var X = this._X;

				// Iterate the system
				nextState.call(this);

				// Generate four keystream words
				S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
				S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
				S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
				S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;

				for (var i = 0; i < 4; i++) {
					// Swap endian
					S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

					// Encrypt
					M[offset + i] ^= S[i];
				}
			},

			blockSize: 128 / 32,

			ivSize: 64 / 32
		});

		function nextState() {
			// Shortcuts
			var X = this._X;
			var C = this._C;

			// Save old counter values
			for (var i = 0; i < 8; i++) {
				C_[i] = C[i];
			}

			// Calculate new counter values
			C[0] = C[0] + 0x4d34d34d + this._b | 0;
			C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
			C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
			C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
			C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
			C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
			C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
			C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
			this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

			// Calculate the g-values
			for (var i = 0; i < 8; i++) {
				var gx = X[i] + C[i];

				// Construct high and low argument for squaring
				var ga = gx & 0xffff;
				var gb = gx >>> 16;

				// Calculate high and low result of squaring
				var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
				var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

				// High XOR low
				G[i] = gh ^ gl;
			}

			// Calculate new state values
			X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
			X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
			X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
			X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
			X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
			X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
			X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
			X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
   */
		C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	})();

	/**
  * Zero padding strategy.
  */
	CryptoJS.pad.ZeroPadding = {
		pad: function pad(data, blockSize) {
			// Shortcut
			var blockSizeBytes = blockSize * 4;

			// Pad
			data.clamp();
			data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
		},

		unpad: function unpad(data) {
			// Shortcut
			var dataWords = data.words;

			// Unpad
			var i = data.sigBytes - 1;
			while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff)) {
				i--;
			}
			data.sigBytes = i + 1;
		}
	};

	return CryptoJS;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyeXB0by1qcy5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJDcnlwdG9KUyIsIk1hdGgiLCJ1bmRlZmluZWQiLCJjcmVhdGUiLCJPYmplY3QiLCJGIiwib2JqIiwic3VidHlwZSIsInByb3RvdHlwZSIsIkMiLCJDX2xpYiIsImxpYiIsIkJhc2UiLCJleHRlbmQiLCJvdmVycmlkZXMiLCJtaXhJbiIsImhhc093blByb3BlcnR5IiwiaW5pdCIsIiRzdXBlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiaW5zdGFuY2UiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHlOYW1lIiwidG9TdHJpbmciLCJjbG9uZSIsIldvcmRBcnJheSIsIndvcmRzIiwic2lnQnl0ZXMiLCJsZW5ndGgiLCJlbmNvZGVyIiwiSGV4Iiwic3RyaW5naWZ5IiwiY29uY2F0Iiwid29yZEFycmF5IiwidGhpc1dvcmRzIiwidGhhdFdvcmRzIiwidGhpc1NpZ0J5dGVzIiwidGhhdFNpZ0J5dGVzIiwiY2xhbXAiLCJpIiwidGhhdEJ5dGUiLCJjZWlsIiwiY2FsbCIsInNsaWNlIiwicmFuZG9tIiwibkJ5dGVzIiwiciIsIm1fdyIsIm1feiIsIm1hc2siLCJyZXN1bHQiLCJyY2FjaGUiLCJfciIsInB1c2giLCJDX2VuYyIsImVuYyIsImhleENoYXJzIiwiYml0ZSIsImpvaW4iLCJwYXJzZSIsImhleFN0ciIsImhleFN0ckxlbmd0aCIsInBhcnNlSW50Iiwic3Vic3RyIiwiTGF0aW4xIiwibGF0aW4xQ2hhcnMiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJsYXRpbjFTdHIiLCJsYXRpbjFTdHJMZW5ndGgiLCJjaGFyQ29kZUF0IiwiVXRmOCIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsImUiLCJFcnJvciIsInV0ZjhTdHIiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0iLCJyZXNldCIsIl9kYXRhIiwiX25EYXRhQnl0ZXMiLCJfYXBwZW5kIiwiZGF0YSIsIl9wcm9jZXNzIiwiZG9GbHVzaCIsImRhdGFXb3JkcyIsImRhdGFTaWdCeXRlcyIsImJsb2NrU2l6ZSIsImJsb2NrU2l6ZUJ5dGVzIiwibkJsb2Nrc1JlYWR5IiwibWF4IiwiX21pbkJ1ZmZlclNpemUiLCJuV29yZHNSZWFkeSIsIm5CeXRlc1JlYWR5IiwibWluIiwib2Zmc2V0IiwiX2RvUHJvY2Vzc0Jsb2NrIiwicHJvY2Vzc2VkV29yZHMiLCJzcGxpY2UiLCJIYXNoZXIiLCJjZmciLCJfZG9SZXNldCIsInVwZGF0ZSIsIm1lc3NhZ2VVcGRhdGUiLCJmaW5hbGl6ZSIsImhhc2giLCJfZG9GaW5hbGl6ZSIsIl9jcmVhdGVIZWxwZXIiLCJoYXNoZXIiLCJtZXNzYWdlIiwiX2NyZWF0ZUhtYWNIZWxwZXIiLCJrZXkiLCJDX2FsZ28iLCJITUFDIiwiYWxnbyIsIkJhc2U2NCIsIm1hcCIsIl9tYXAiLCJiYXNlNjRDaGFycyIsImJ5dGUxIiwiYnl0ZTIiLCJieXRlMyIsInRyaXBsZXQiLCJqIiwiY2hhckF0IiwicGFkZGluZ0NoYXIiLCJiYXNlNjRTdHIiLCJiYXNlNjRTdHJMZW5ndGgiLCJyZXZlcnNlTWFwIiwiX3JldmVyc2VNYXAiLCJwYWRkaW5nSW5kZXgiLCJpbmRleE9mIiwicGFyc2VMb29wIiwiYml0czEiLCJiaXRzMiIsIlQiLCJhYnMiLCJzaW4iLCJNRDUiLCJfaGFzaCIsIk0iLCJvZmZzZXRfaSIsIk1fb2Zmc2V0X2kiLCJIIiwiTV9vZmZzZXRfMCIsIk1fb2Zmc2V0XzEiLCJNX29mZnNldF8yIiwiTV9vZmZzZXRfMyIsIk1fb2Zmc2V0XzQiLCJNX29mZnNldF81IiwiTV9vZmZzZXRfNiIsIk1fb2Zmc2V0XzciLCJNX29mZnNldF84IiwiTV9vZmZzZXRfOSIsIk1fb2Zmc2V0XzEwIiwiTV9vZmZzZXRfMTEiLCJNX29mZnNldF8xMiIsIk1fb2Zmc2V0XzEzIiwiTV9vZmZzZXRfMTQiLCJNX29mZnNldF8xNSIsImEiLCJiIiwiYyIsImQiLCJGRiIsIkdHIiwiSEgiLCJJSSIsIm5CaXRzVG90YWwiLCJuQml0c0xlZnQiLCJuQml0c1RvdGFsSCIsImZsb29yIiwibkJpdHNUb3RhbEwiLCJIX2kiLCJ4IiwicyIsInQiLCJuIiwiSG1hY01ENSIsIlciLCJTSEExIiwiSG1hY1NIQTEiLCJLIiwiaXNQcmltZSIsInNxcnROIiwic3FydCIsImZhY3RvciIsImdldEZyYWN0aW9uYWxCaXRzIiwiblByaW1lIiwicG93IiwiU0hBMjU2IiwiZiIsImciLCJoIiwiZ2FtbWEweCIsImdhbW1hMCIsImdhbW1hMXgiLCJnYW1tYTEiLCJjaCIsIm1haiIsInNpZ21hMCIsInNpZ21hMSIsInQxIiwidDIiLCJIbWFjU0hBMjU2IiwiVXRmMTZCRSIsIlV0ZjE2IiwidXRmMTZDaGFycyIsImNvZGVQb2ludCIsInV0ZjE2U3RyIiwidXRmMTZTdHJMZW5ndGgiLCJVdGYxNkxFIiwic3dhcEVuZGlhbiIsIndvcmQiLCJBcnJheUJ1ZmZlciIsInN1cGVySW5pdCIsInN1YkluaXQiLCJ0eXBlZEFycmF5IiwiVWludDhBcnJheSIsIkludDhBcnJheSIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiSW50MTZBcnJheSIsIlVpbnQxNkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiRmxvYXQ2NEFycmF5IiwiYnVmZmVyIiwiYnl0ZU9mZnNldCIsImJ5dGVMZW5ndGgiLCJ0eXBlZEFycmF5Qnl0ZUxlbmd0aCIsIl96bCIsIl96ciIsIl9zbCIsIl9zciIsIl9obCIsIl9ociIsIlJJUEVNRDE2MCIsImhsIiwiaHIiLCJ6bCIsInpyIiwic2wiLCJzciIsImFsIiwiYmwiLCJjbCIsImRsIiwiZWwiLCJhciIsImJyIiwiY3IiLCJkciIsImVyIiwiZjEiLCJmMiIsImYzIiwiZjQiLCJmNSIsInJvdGwiLCJ5IiwieiIsIkhtYWNSSVBFTUQxNjAiLCJfaGFzaGVyIiwiaGFzaGVyQmxvY2tTaXplIiwiaGFzaGVyQmxvY2tTaXplQnl0ZXMiLCJvS2V5IiwiX29LZXkiLCJpS2V5IiwiX2lLZXkiLCJvS2V5V29yZHMiLCJpS2V5V29yZHMiLCJpbm5lckhhc2giLCJobWFjIiwiUEJLREYyIiwia2V5U2l6ZSIsIml0ZXJhdGlvbnMiLCJjb21wdXRlIiwicGFzc3dvcmQiLCJzYWx0IiwiZGVyaXZlZEtleSIsImJsb2NrSW5kZXgiLCJkZXJpdmVkS2V5V29yZHMiLCJibG9ja0luZGV4V29yZHMiLCJibG9jayIsImJsb2NrV29yZHMiLCJibG9ja1dvcmRzTGVuZ3RoIiwiaW50ZXJtZWRpYXRlIiwiaW50ZXJtZWRpYXRlV29yZHMiLCJFdnBLREYiLCJTSEEyMjQiLCJIbWFjU0hBMjI0IiwiWDMyV29yZEFycmF5IiwiQ194NjQiLCJ4NjQiLCJYNjRXb3JkIiwiV29yZCIsImhpZ2giLCJsb3ciLCJYNjRXb3JkQXJyYXkiLCJ0b1gzMiIsIng2NFdvcmRzIiwieDY0V29yZHNMZW5ndGgiLCJ4MzJXb3JkcyIsIng2NFdvcmQiLCJ3b3Jkc0xlbmd0aCIsIlJIT19PRkZTRVRTIiwiUElfSU5ERVhFUyIsIlJPVU5EX0NPTlNUQU5UUyIsIm5ld1giLCJuZXdZIiwiTEZTUiIsInJvdW5kQ29uc3RhbnRNc3ciLCJyb3VuZENvbnN0YW50THN3IiwiYml0UG9zaXRpb24iLCJTSEEzIiwib3V0cHV0TGVuZ3RoIiwic3RhdGUiLCJfc3RhdGUiLCJuQmxvY2tTaXplTGFuZXMiLCJNMmkiLCJNMmkxIiwibGFuZSIsInJvdW5kIiwidE1zdyIsInRMc3ciLCJUeCIsIlR4NCIsIlR4MSIsIlR4MU1zdyIsIlR4MUxzdyIsImxhbmVJbmRleCIsImxhbmVNc3ciLCJsYW5lTHN3IiwicmhvT2Zmc2V0IiwiVFBpTGFuZSIsIlQwIiwic3RhdGUwIiwiVExhbmUiLCJUeDFMYW5lIiwiVHgyTGFuZSIsInJvdW5kQ29uc3RhbnQiLCJibG9ja1NpemVCaXRzIiwib3V0cHV0TGVuZ3RoQnl0ZXMiLCJvdXRwdXRMZW5ndGhMYW5lcyIsImhhc2hXb3JkcyIsIkhtYWNTSEEzIiwiWDY0V29yZF9jcmVhdGUiLCJTSEE1MTIiLCJIMCIsIkgxIiwiSDIiLCJIMyIsIkg0IiwiSDUiLCJINiIsIkg3IiwiSDBoIiwiSDBsIiwiSDFoIiwiSDFsIiwiSDJoIiwiSDJsIiwiSDNoIiwiSDNsIiwiSDRoIiwiSDRsIiwiSDVoIiwiSDVsIiwiSDZoIiwiSDZsIiwiSDdoIiwiSDdsIiwiYWgiLCJiaCIsImRoIiwiZWgiLCJmaCIsImZsIiwiZ2giLCJnbCIsImhoIiwiV2kiLCJXaWgiLCJXaWwiLCJnYW1tYTB4aCIsImdhbW1hMHhsIiwiZ2FtbWEwaCIsImdhbW1hMGwiLCJnYW1tYTF4aCIsImdhbW1hMXhsIiwiZ2FtbWExaCIsImdhbW1hMWwiLCJXaTciLCJXaTdoIiwiV2k3bCIsIldpMTYiLCJXaTE2aCIsIldpMTZsIiwiY2hoIiwiY2hsIiwibWFqaCIsIm1hamwiLCJzaWdtYTBoIiwic2lnbWEwbCIsInNpZ21hMWgiLCJzaWdtYTFsIiwiS2kiLCJLaWgiLCJLaWwiLCJ0MWwiLCJ0MWgiLCJ0MmwiLCJ0MmgiLCJIbWFjU0hBNTEyIiwiU0hBMzg0IiwiSG1hY1NIQTM4NCIsIkNpcGhlciIsImNyZWF0ZUVuY3J5cHRvciIsIl9FTkNfWEZPUk1fTU9ERSIsImNyZWF0ZURlY3J5cHRvciIsIl9ERUNfWEZPUk1fTU9ERSIsInhmb3JtTW9kZSIsIl94Zm9ybU1vZGUiLCJfa2V5IiwicHJvY2VzcyIsImRhdGFVcGRhdGUiLCJmaW5hbFByb2Nlc3NlZERhdGEiLCJpdlNpemUiLCJzZWxlY3RDaXBoZXJTdHJhdGVneSIsIlBhc3N3b3JkQmFzZWRDaXBoZXIiLCJTZXJpYWxpemFibGVDaXBoZXIiLCJjaXBoZXIiLCJlbmNyeXB0IiwiZGVjcnlwdCIsImNpcGhlcnRleHQiLCJTdHJlYW1DaXBoZXIiLCJmaW5hbFByb2Nlc3NlZEJsb2NrcyIsIkNfbW9kZSIsIm1vZGUiLCJCbG9ja0NpcGhlck1vZGUiLCJpdiIsIkVuY3J5cHRvciIsIkRlY3J5cHRvciIsIl9jaXBoZXIiLCJfaXYiLCJDQkMiLCJwcm9jZXNzQmxvY2siLCJ4b3JCbG9jayIsImVuY3J5cHRCbG9jayIsIl9wcmV2QmxvY2siLCJ0aGlzQmxvY2siLCJkZWNyeXB0QmxvY2siLCJDX3BhZCIsInBhZCIsIlBrY3M3IiwiblBhZGRpbmdCeXRlcyIsInBhZGRpbmdXb3JkIiwicGFkZGluZ1dvcmRzIiwicGFkZGluZyIsInVucGFkIiwiQmxvY2tDaXBoZXIiLCJtb2RlQ3JlYXRvciIsIl9tb2RlIiwiX19jcmVhdG9yIiwiQ2lwaGVyUGFyYW1zIiwiY2lwaGVyUGFyYW1zIiwiZm9ybWF0dGVyIiwiQ19mb3JtYXQiLCJmb3JtYXQiLCJPcGVuU1NMRm9ybWF0dGVyIiwiT3BlblNTTCIsIm9wZW5TU0xTdHIiLCJjaXBoZXJ0ZXh0V29yZHMiLCJlbmNyeXB0b3IiLCJjaXBoZXJDZmciLCJhbGdvcml0aG0iLCJfcGFyc2UiLCJwbGFpbnRleHQiLCJDX2tkZiIsImtkZiIsIk9wZW5TU0xLZGYiLCJleGVjdXRlIiwiZGVyaXZlZFBhcmFtcyIsIkNGQiIsImdlbmVyYXRlS2V5c3RyZWFtQW5kRW5jcnlwdCIsImtleXN0cmVhbSIsIkVDQiIsIkFuc2lYOTIzIiwibGFzdEJ5dGVQb3MiLCJJc28xMDEyNiIsIklzbzk3OTcxIiwiWmVyb1BhZGRpbmciLCJPRkIiLCJfa2V5c3RyZWFtIiwiTm9QYWRkaW5nIiwiSGV4Rm9ybWF0dGVyIiwiaW5wdXQiLCJTQk9YIiwiSU5WX1NCT1giLCJTVUJfTUlYXzAiLCJTVUJfTUlYXzEiLCJTVUJfTUlYXzIiLCJTVUJfTUlYXzMiLCJJTlZfU1VCX01JWF8wIiwiSU5WX1NVQl9NSVhfMSIsIklOVl9TVUJfTUlYXzIiLCJJTlZfU1VCX01JWF8zIiwieGkiLCJzeCIsIngyIiwieDQiLCJ4OCIsIlJDT04iLCJBRVMiLCJfblJvdW5kcyIsIl9rZXlQcmlvclJlc2V0Iiwia2V5V29yZHMiLCJuUm91bmRzIiwia3NSb3dzIiwia2V5U2NoZWR1bGUiLCJfa2V5U2NoZWR1bGUiLCJrc1JvdyIsImludktleVNjaGVkdWxlIiwiX2ludktleVNjaGVkdWxlIiwiaW52S3NSb3ciLCJfZG9DcnlwdEJsb2NrIiwiczAiLCJzMSIsInMyIiwiczMiLCJ0MCIsInQzIiwiUEMxIiwiUEMyIiwiQklUX1NISUZUUyIsIlNCT1hfUCIsIlNCT1hfTUFTSyIsIkRFUyIsImtleUJpdHMiLCJrZXlCaXRQb3MiLCJzdWJLZXlzIiwiX3N1YktleXMiLCJuU3ViS2V5Iiwic3ViS2V5IiwiYml0U2hpZnQiLCJpbnZTdWJLZXlzIiwiX2ludlN1YktleXMiLCJfbEJsb2NrIiwiX3JCbG9jayIsImV4Y2hhbmdlTFIiLCJleGNoYW5nZVJMIiwibEJsb2NrIiwickJsb2NrIiwiVHJpcGxlREVTIiwiX2RlczEiLCJfZGVzMiIsIl9kZXMzIiwiUkM0Iiwia2V5U2lnQnl0ZXMiLCJTIiwiX1MiLCJrZXlCeXRlSW5kZXgiLCJrZXlCeXRlIiwiX2kiLCJfaiIsImdlbmVyYXRlS2V5c3RyZWFtV29yZCIsImtleXN0cmVhbVdvcmQiLCJSQzREcm9wIiwiZHJvcCIsIkNUUkdsYWRtYW4iLCJpbmNXb3JkIiwiYjEiLCJiMiIsImIzIiwiaW5jQ291bnRlciIsImNvdW50ZXIiLCJfY291bnRlciIsIkNfIiwiRyIsIlJhYmJpdCIsIlgiLCJfWCIsIl9DIiwiX2IiLCJuZXh0U3RhdGUiLCJJViIsIklWXzAiLCJJVl8xIiwiaTAiLCJpMiIsImkxIiwiaTMiLCJneCIsImdhIiwiZ2IiLCJDVFIiLCJSYWJiaXRMZWdhY3kiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFFLFdBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQzFCLEtBQUksUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUF2QixFQUFpQztBQUNoQztBQUNBQyxTQUFPRCxPQUFQLEdBQWlCQSxVQUFVRCxTQUEzQjtBQUNBLEVBSEQsTUFJSyxJQUFJLE9BQU9HLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBQ3BEO0FBQ0FELFNBQU8sRUFBUCxFQUFXSCxPQUFYO0FBQ0EsRUFISSxNQUlBO0FBQ0o7QUFD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bEJJLEVBa0JvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBbEJwQyxFQW1CSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBbkJJLEVBbUJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBbkJwQyxFQW9CSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBcEJJLEVBb0JvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBcEJwQyxFQXFCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBckJJLEVBcUJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBckJwQyxFQXNCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBdEJJLEVBc0JvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBdEJwQyxFQXVCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBdkJJLEVBdUJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBdkJwQyxFQXdCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBeEJJLEVBd0JvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBeEJwQyxFQXlCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBekJJLEVBeUJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBekJwQyxFQTBCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBMUJJLEVBMEJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBMUJwQyxFQTJCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBM0JJLEVBMkJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBM0JwQyxFQTRCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBNUJJLEVBNEJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBNUJwQyxFQTZCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBN0JJLEVBNkJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBN0JwQyxFQThCSkEsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBOUJJLEVBOEJvQ0EsZUFBZSxVQUFmLEVBQTJCLFVBQTNCLENB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S0FBTDtBQUNBOEMsUUFBS3pELFFBQUwsSUFBaUIrRCxrQkFBbUJOLEtBQUt6RCxRQUFMLEdBQWdCK0QsY0FBakIsSUFBb0NBLGNBQXRELENBQWpCO0FBQ0gsR0FSc0I7O0FBVXZCb1gsU0FBTyxlQUFVMVgsSUFBVixFQUFnQjtBQUNuQjtBQUNBLE9BQUlHLFlBQVlILEtBQUsxRCxLQUFyQjs7QUFFQTtBQUNBLE9BQUlhLElBQUk2QyxLQUFLekQsUUFBTCxHQUFnQixDQUF4QjtBQUNBLFVBQU8sRUFBRzRELFVBQVVoRCxNQUFNLENBQWhCLE1BQXdCLEtBQU1BLElBQUksQ0FBTCxHQUFVLENBQXhDLEdBQThDLElBQWhELENBQVAsRUFBOEQ7QUFDMURBO0FBQ0g7QUFDRDZDLFFBQUt6RCxRQUFMLEdBQWdCWSxJQUFJLENBQXBCO0FBQ0g7QUFwQnNCLEVBQTNCOztBQXdCQSxRQUFPeEMsUUFBUDtBQUVBLENBbjJMQyxDQUFEIiwiZmlsZSI6ImNyeXB0by1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsIG9mIE9iamVjdC5jcmVhdGVcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge307XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSlcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZTY0IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChiYXNlNjRTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSWdub3JlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhZGRpbmdJbmRleCA9IGJhc2U2NFN0ci5pbmRleE9mKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nSW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0U3RyTGVuZ3RoID0gcGFkZGluZ0luZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICByZXR1cm4gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKTtcblxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICBpZiAoaSAlIDQpIHtcblx0ICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSAoYml0czEgfCBiaXRzMikgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVcblx0ICAgIHZhciBUID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICBUW2ldID0gKE1hdGguYWJzKE1hdGguc2luKGkgKyAxKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTUQ1IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgTUQ1ID0gQ19hbGdvLk1ENSA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSxcblx0ICAgICAgICAgICAgICAgIDB4OThiYWRjZmUsIDB4MTAzMjU0NzZcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIG9mZnNldF9pID0gb2Zmc2V0ICsgaTtcblx0ICAgICAgICAgICAgICAgIHZhciBNX29mZnNldF9pID0gTVtvZmZzZXRfaV07XG5cblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0X2ldID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgOCkgIHwgKE1fb2Zmc2V0X2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCAyNCkgfCAoTV9vZmZzZXRfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMCAgPSBNW29mZnNldCArIDBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMSAgPSBNW29mZnNldCArIDFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMiAgPSBNW29mZnNldCArIDJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMyAgPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNCAgPSBNW29mZnNldCArIDRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNSAgPSBNW29mZnNldCArIDVdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNiAgPSBNW29mZnNldCArIDZdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNyAgPSBNW29mZnNldCArIDddO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOCAgPSBNW29mZnNldCArIDhdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOSAgPSBNW29mZnNldCArIDldO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTAgPSBNW29mZnNldCArIDEwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzExID0gTVtvZmZzZXQgKyAxMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMiA9IE1bb2Zmc2V0ICsgMTJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTMgPSBNW29mZnNldCArIDEzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE0ID0gTVtvZmZzZXQgKyAxNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNSA9IE1bb2Zmc2V0ICsgMTVdO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFsYmVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDcsICBUWzBdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEsICAxMiwgVFsxXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTcsIFRbMl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMywgIDIyLCBUWzNdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA3LCAgVFs0XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF81LCAgMTIsIFRbNV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE3LCBUWzZdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzcsICAyMiwgVFs3XSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNywgIFRbOF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfOSwgIDEyLCBUWzldKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNywgVFsxMF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTEsIDIyLCBUWzExXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNywgIFRbMTJdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEzLCAxMiwgVFsxM10pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE3LCBUWzE0XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xNSwgMjIsIFRbMTVdKTtcblxuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDUsICBUWzE2XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF82LCAgOSwgIFRbMTddKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNCwgVFsxOF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMCwgIDIwLCBUWzE5XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNSwgIFRbMjBdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEwLCA5LCAgVFsyMV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE0LCBUWzIyXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF80LCAgMjAsIFRbMjNdKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA1LCAgVFsyNF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTQsIDksICBUWzI1XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTQsIFRbMjZdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzgsICAyMCwgVFsyN10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDUsICBUWzI4XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8yLCAgOSwgIFRbMjldKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNCwgVFszMF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMTIsIDIwLCBUWzMxXSk7XG5cblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA0LCAgVFszMl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfOCwgIDExLCBUWzMzXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTYsIFRbMzRdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE0LCAyMywgVFszNV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDQsICBUWzM2XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF80LCAgMTEsIFRbMzddKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNiwgVFszOF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTAsIDIzLCBUWzM5XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNCwgIFRbNDBdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzAsICAxMSwgVFs0MV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE2LCBUWzQyXSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF82LCAgMjMsIFRbNDNdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA0LCAgVFs0NF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTIsIDExLCBUWzQ1XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTYsIFRbNDZdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzIsICAyMywgVFs0N10pO1xuXG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNiwgIFRbNDhdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzcsICAxMCwgVFs0OV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE1LCBUWzUwXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF81LCAgMjEsIFRbNTFdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA2LCAgVFs1Ml0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMywgIDEwLCBUWzUzXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTUsIFRbNTRdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEsICAyMSwgVFs1NV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDYsICBUWzU2XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xNSwgMTAsIFRbNTddKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNSwgVFs1OF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTMsIDIxLCBUWzU5XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNiwgIFRbNjBdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzExLCAxMCwgVFs2MV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE1LCBUWzYyXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF85LCAgMjEsIFRbNjNdKTtcblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEggPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsTCA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgOCkgIHwgKG5CaXRzVG90YWxIID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgMjQpIHwgKG5CaXRzVG90YWxIID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCA4KSAgfCAobkJpdHNUb3RhbEwgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCAyNCkgfCAobkJpdHNUb3RhbEwgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSAoZGF0YVdvcmRzLmxlbmd0aCArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaDtcblx0ICAgICAgICAgICAgdmFyIEggPSBoYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIEhfaSA9IEhbaV07XG5cblx0ICAgICAgICAgICAgICAgIEhbaV0gPSAoKChIX2kgPDwgOCkgIHwgKEhfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChIX2kgPDwgMjQpIHwgKEhfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIEZGKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBjKSB8ICh+YiAmIGQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEdHKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBkKSB8IChjICYgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEhIKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIElJKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYyBeIChiIHwgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLk1ENSA9IEhhc2hlci5fY3JlYXRlSGVscGVyKE1ENSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjTUQ1KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY01ENSA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihNRDUpO1xuXHR9KE1hdGgpKTtcblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0xIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMSA9IENfYWxnby5TSEExID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3Nixcblx0ICAgICAgICAgICAgICAgIDB4YzNkMmUxZjBcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IFdbaSAtIDNdIF4gV1tpIC0gOF0gXiBXW2kgLSAxNF0gXiBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IChuIDw8IDEpIHwgKG4gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIHQgPSAoKGEgPDwgNSkgfCAoYSA+Pj4gMjcpKSArIGUgKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAyMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKChiICYgYykgfCAofmIgJiBkKSkgKyAweDVhODI3OTk5O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgNDApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0ICs9IChiIF4gYyBeIGQpICsgMHg2ZWQ5ZWJhMTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDYwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdCArPSAoKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpKSAtIDB4NzBlNDQzMjQ7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgLyogaWYgKGkgPCA4MCkgKi8ge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKGIgXiBjIF4gZCkgLSAweDM1OWQzZTJhO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBlID0gZDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IChiIDw8IDMwKSB8IChiID4+PiAyKTtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9IHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTEgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEExKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEExKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTEgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMSk7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBJbml0aWFsaXphdGlvbiBhbmQgcm91bmQgY29uc3RhbnRzIHRhYmxlc1xuXHQgICAgdmFyIEggPSBbXTtcblx0ICAgIHZhciBLID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuXHQgICAgICAgICAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGZhY3RvciA9IDI7IGZhY3RvciA8PSBzcXJ0TjsgZmFjdG9yKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKG4gJSBmYWN0b3IpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZ2V0RnJhY3Rpb25hbEJpdHMobikge1xuXHQgICAgICAgICAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBuID0gMjtcblx0ICAgICAgICB2YXIgblByaW1lID0gMDtcblx0ICAgICAgICB3aGlsZSAoblByaW1lIDwgNjQpIHtcblx0ICAgICAgICAgICAgaWYgKGlzUHJpbWUobikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChuUHJpbWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgSFtuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDIpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSk7XG5cblx0ICAgICAgICAgICAgICAgIG5QcmltZSsrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgbisrO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjU2IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoSC5zbGljZSgwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBmID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIGcgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgaCA9IEhbN107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwICA9ICgoZ2FtbWEweCA8PCAyNSkgfCAoZ2FtbWEweCA+Pj4gNykpICBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTB4ID4+PiAzKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMSAgPSAoKGdhbW1hMXggPDwgMTUpIHwgKGdhbW1hMXggPj4+IDE3KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWExeCA+Pj4gMTApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMSA9ICgoZSA8PCAyNikgfCAoZSA+Pj4gNikpIF4gKChlIDw8IDIxKSB8IChlID4+PiAxMSkpIF4gKChlIDw8IDcpICB8IChlID4+PiAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuXHQgICAgICAgICAgICAgICAgaCA9IGc7XG5cdCAgICAgICAgICAgICAgICBnID0gZjtcblx0ICAgICAgICAgICAgICAgIGYgPSBlO1xuXHQgICAgICAgICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IGI7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSAodDEgKyB0MikgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcblx0ICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuXHQgICAgICAgICAgICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1NignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyNTYobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTI1Nik7XG5cdH0oTWF0aCkpO1xuXG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi0xNiBCRSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFV0ZjE2QkUgPSBDX2VuYy5VdGYxNiA9IENfZW5jLlV0ZjE2QkUgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTE2IEJFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtMTYgQkUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmMTZTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmMTYuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB1dGYxNkNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDE2IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmZmZjtcblx0ICAgICAgICAgICAgICAgIHV0ZjE2Q2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHV0ZjE2Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTE2IEJFIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmMTZTdHIgVGhlIFVURi0xNiBCRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjE2LnBhcnNlKHV0ZjE2U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjE2U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciB1dGYxNlN0ckxlbmd0aCA9IHV0ZjE2U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHV0ZjE2U3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDFdIHw9IHV0ZjE2U3RyLmNoYXJDb2RlQXQoaSkgPDwgKDE2IC0gKGkgJSAyKSAqIDE2KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCB1dGYxNlN0ckxlbmd0aCAqIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTE2IExFIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICBDX2VuYy5VdGYxNkxFID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi0xNiBMRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTE2IExFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjE2U3RyID0gQ3J5cHRvSlMuZW5jLlV0ZjE2TEUuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB1dGYxNkNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IHN3YXBFbmRpYW4oKHdvcmRzW2kgPj4+IDJdID4+PiAoMTYgLSAoaSAlIDQpICogOCkpICYgMHhmZmZmKTtcblx0ICAgICAgICAgICAgICAgIHV0ZjE2Q2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHV0ZjE2Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTE2IExFIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmMTZTdHIgVGhlIFVURi0xNiBMRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjE2TEUucGFyc2UodXRmMTZTdHIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmMTZTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIHV0ZjE2U3RyTGVuZ3RoID0gdXRmMTZTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXRmMTZTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMV0gfD0gc3dhcEVuZGlhbih1dGYxNlN0ci5jaGFyQ29kZUF0KGkpIDw8ICgxNiAtIChpICUgMikgKiAxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIHV0ZjE2U3RyTGVuZ3RoICogMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgZnVuY3Rpb24gc3dhcEVuZGlhbih3b3JkKSB7XG5cdCAgICAgICAgcmV0dXJuICgod29yZCA8PCA4KSAmIDB4ZmYwMGZmMDApIHwgKCh3b3JkID4+PiA4KSAmIDB4MDBmZjAwZmYpO1xuXHQgICAgfVxuXHR9KCkpO1xuXG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIENoZWNrIGlmIHR5cGVkIGFycmF5cyBhcmUgc3VwcG9ydGVkXG5cdCAgICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblxuXHQgICAgLy8gUmVmZXJlbmNlIG9yaWdpbmFsIGluaXRcblx0ICAgIHZhciBzdXBlckluaXQgPSBXb3JkQXJyYXkuaW5pdDtcblxuXHQgICAgLy8gQXVnbWVudCBXb3JkQXJyYXkuaW5pdCB0byBoYW5kbGUgdHlwZWQgYXJyYXlzXG5cdCAgICB2YXIgc3ViSW5pdCA9IFdvcmRBcnJheS5pbml0ID0gZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0ICAgICAgICAvLyBDb252ZXJ0IGJ1ZmZlcnMgdG8gdWludDhcblx0ICAgICAgICBpZiAodHlwZWRBcnJheSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgPSBuZXcgVWludDhBcnJheSh0eXBlZEFycmF5KTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb252ZXJ0IG90aGVyIGFycmF5IHZpZXdzIHRvIHVpbnQ4XG5cdCAgICAgICAgaWYgKFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgSW50OEFycmF5IHx8XG5cdCAgICAgICAgICAgICh0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgSW50MTZBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDE2QXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEludDMyQXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIFVpbnQzMkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICB0eXBlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodHlwZWRBcnJheS5idWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5ieXRlTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBIYW5kbGUgVWludDhBcnJheVxuXHQgICAgICAgIGlmICh0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgdHlwZWRBcnJheUJ5dGVMZW5ndGggPSB0eXBlZEFycmF5LmJ5dGVMZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gRXh0cmFjdCBieXRlc1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZEFycmF5Qnl0ZUxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSB0eXBlZEFycmF5W2ldIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhpcyB3b3JkIGFycmF5XG5cdCAgICAgICAgICAgIHN1cGVySW5pdC5jYWxsKHRoaXMsIHdvcmRzLCB0eXBlZEFycmF5Qnl0ZUxlbmd0aCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8gRWxzZSBjYWxsIG5vcm1hbCBpbml0XG5cdCAgICAgICAgICAgIHN1cGVySW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIHN1YkluaXQucHJvdG90eXBlID0gV29yZEFycmF5O1xuXHR9KCkpO1xuXG5cblx0LyoqIEBwcmVzZXJ2ZVxuXHQoYykgMjAxMiBieSBDw6lkcmljIE1lc25pbC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuXHRSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cblx0ICAgIC0gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXHQgICAgLSBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblx0VEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXHQqL1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIF96bCA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDAsICAxLCAgMiwgIDMsICA0LCAgNSwgIDYsICA3LCAgOCwgIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG5cdCAgICAgICAgNywgIDQsIDEzLCAgMSwgMTAsICA2LCAxNSwgIDMsIDEyLCAgMCwgIDksICA1LCAgMiwgMTQsIDExLCAgOCxcblx0ICAgICAgICAzLCAxMCwgMTQsICA0LCAgOSwgMTUsICA4LCAgMSwgIDIsICA3LCAgMCwgIDYsIDEzLCAxMSwgIDUsIDEyLFxuXHQgICAgICAgIDEsICA5LCAxMSwgMTAsICAwLCAgOCwgMTIsICA0LCAxMywgIDMsICA3LCAxNSwgMTQsICA1LCAgNiwgIDIsXG5cdCAgICAgICAgNCwgIDAsICA1LCAgOSwgIDcsIDEyLCAgMiwgMTAsIDE0LCAgMSwgIDMsICA4LCAxMSwgIDYsIDE1LCAxM10pO1xuXHQgICAgdmFyIF96ciA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDUsIDE0LCAgNywgIDAsICA5LCAgMiwgMTEsICA0LCAxMywgIDYsIDE1LCAgOCwgIDEsIDEwLCAgMywgMTIsXG5cdCAgICAgICAgNiwgMTEsICAzLCAgNywgIDAsIDEzLCAgNSwgMTAsIDE0LCAxNSwgIDgsIDEyLCAgNCwgIDksICAxLCAgMixcblx0ICAgICAgICAxNSwgIDUsICAxLCAgMywgIDcsIDE0LCAgNiwgIDksIDExLCAgOCwgMTIsICAyLCAxMCwgIDAsICA0LCAxMyxcblx0ICAgICAgICA4LCAgNiwgIDQsICAxLCAgMywgMTEsIDE1LCAgMCwgIDUsIDEyLCAgMiwgMTMsICA5LCAgNywgMTAsIDE0LFxuXHQgICAgICAgIDEyLCAxNSwgMTAsICA0LCAgMSwgIDUsICA4LCAgNywgIDYsICAyLCAxMywgMTQsICAwLCAgMywgIDksIDExXSk7XG5cdCAgICB2YXIgX3NsID0gV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgIDExLCAxNCwgMTUsIDEyLCAgNSwgIDgsICA3LCAgOSwgMTEsIDEzLCAxNCwgMTUsICA2LCAgNywgIDksICA4LFxuXHQgICAgICAgIDcsIDYsICAgOCwgMTMsIDExLCAgOSwgIDcsIDE1LCAgNywgMTIsIDE1LCAgOSwgMTEsICA3LCAxMywgMTIsXG5cdCAgICAgICAgMTEsIDEzLCAgNiwgIDcsIDE0LCAgOSwgMTMsIDE1LCAxNCwgIDgsIDEzLCAgNiwgIDUsIDEyLCAgNywgIDUsXG5cdCAgICAgICAgICAxMSwgMTIsIDE0LCAxNSwgMTQsIDE1LCAgOSwgIDgsICA5LCAxNCwgIDUsICA2LCAgOCwgIDYsICA1LCAxMixcblx0ICAgICAgICA5LCAxNSwgIDUsIDExLCAgNiwgIDgsIDEzLCAxMiwgIDUsIDEyLCAxMywgMTQsIDExLCAgOCwgIDUsICA2IF0pO1xuXHQgICAgdmFyIF9zciA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDgsICA5LCAgOSwgMTEsIDEzLCAxNSwgMTUsICA1LCAgNywgIDcsICA4LCAxMSwgMTQsIDE0LCAxMiwgIDYsXG5cdCAgICAgICAgOSwgMTMsIDE1LCAgNywgMTIsICA4LCAgOSwgMTEsICA3LCAgNywgMTIsICA3LCAgNiwgMTUsIDEzLCAxMSxcblx0ICAgICAgICA5LCAgNywgMTUsIDExLCAgOCwgIDYsICA2LCAxNCwgMTIsIDEzLCAgNSwgMTQsIDEzLCAxMywgIDcsICA1LFxuXHQgICAgICAgIDE1LCAgNSwgIDgsIDExLCAxNCwgMTQsICA2LCAxNCwgIDYsICA5LCAxMiwgIDksIDEyLCAgNSwgMTUsICA4LFxuXHQgICAgICAgIDgsICA1LCAxMiwgIDksIDEyLCAgNSwgMTQsICA2LCAgOCwgMTMsICA2LCAgNSwgMTUsIDEzLCAxMSwgMTEgXSk7XG5cblx0ICAgIHZhciBfaGwgPSAgV29yZEFycmF5LmNyZWF0ZShbIDB4MDAwMDAwMDAsIDB4NUE4Mjc5OTksIDB4NkVEOUVCQTEsIDB4OEYxQkJDREMsIDB4QTk1M0ZENEVdKTtcblx0ICAgIHZhciBfaHIgPSAgV29yZEFycmF5LmNyZWF0ZShbIDB4NTBBMjhCRTYsIDB4NUM0REQxMjQsIDB4NkQ3MDNFRjMsIDB4N0E2RDc2RTksIDB4MDAwMDAwMDBdKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSSVBFTUQxNjAgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSSVBFTUQxNjAgPSBDX2FsZ28uUklQRU1EMTYwID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCAgPSBXb3JkQXJyYXkuY3JlYXRlKFsweDY3NDUyMzAxLCAweEVGQ0RBQjg5LCAweDk4QkFEQ0ZFLCAweDEwMzI1NDc2LCAweEMzRDJFMUYwXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggID0gdGhpcy5faGFzaC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGhsID0gX2hsLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaHIgPSBfaHIud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB6bCA9IF96bC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHpyID0gX3pyLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2wgPSBfc2wud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzciA9IF9zci53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWwsIGJsLCBjbCwgZGwsIGVsO1xuXHQgICAgICAgICAgICB2YXIgYXIsIGJyLCBjciwgZHIsIGVyO1xuXG5cdCAgICAgICAgICAgIGFyID0gYWwgPSBIWzBdO1xuXHQgICAgICAgICAgICBiciA9IGJsID0gSFsxXTtcblx0ICAgICAgICAgICAgY3IgPSBjbCA9IEhbMl07XG5cdCAgICAgICAgICAgIGRyID0gZGwgPSBIWzNdO1xuXHQgICAgICAgICAgICBlciA9IGVsID0gSFs0XTtcblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgdmFyIHQ7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkgKz0gMSkge1xuXHQgICAgICAgICAgICAgICAgdCA9IChhbCArICBNW29mZnNldCt6bFtpXV0pfDA7XG5cdCAgICAgICAgICAgICAgICBpZiAoaTwxNil7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjEoYmwsY2wsZGwpICsgaGxbMF07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8MzIpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMihibCxjbCxkbCkgKyBobFsxXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw0OCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYzKGJsLGNsLGRsKSArIGhsWzJdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDY0KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjQoYmwsY2wsZGwpICsgaGxbM107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Ugey8vIGlmIChpPDgwKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjUoYmwsY2wsZGwpICsgaGxbNF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0ID0gdHwwO1xuXHQgICAgICAgICAgICAgICAgdCA9ICByb3RsKHQsc2xbaV0pO1xuXHQgICAgICAgICAgICAgICAgdCA9ICh0K2VsKXwwO1xuXHQgICAgICAgICAgICAgICAgYWwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gZGw7XG5cdCAgICAgICAgICAgICAgICBkbCA9IHJvdGwoY2wsIDEwKTtcblx0ICAgICAgICAgICAgICAgIGNsID0gYmw7XG5cdCAgICAgICAgICAgICAgICBibCA9IHQ7XG5cblx0ICAgICAgICAgICAgICAgIHQgPSAoYXIgKyBNW29mZnNldCt6cltpXV0pfDA7XG5cdCAgICAgICAgICAgICAgICBpZiAoaTwxNil7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjUoYnIsY3IsZHIpICsgaHJbMF07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8MzIpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmNChicixjcixkcikgKyBoclsxXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw0OCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYzKGJyLGNyLGRyKSArIGhyWzJdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDY0KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjIoYnIsY3IsZHIpICsgaHJbM107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Ugey8vIGlmIChpPDgwKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjEoYnIsY3IsZHIpICsgaHJbNF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0ID0gdHwwO1xuXHQgICAgICAgICAgICAgICAgdCA9ICByb3RsKHQsc3JbaV0pIDtcblx0ICAgICAgICAgICAgICAgIHQgPSAodCtlcil8MDtcblx0ICAgICAgICAgICAgICAgIGFyID0gZXI7XG5cdCAgICAgICAgICAgICAgICBlciA9IGRyO1xuXHQgICAgICAgICAgICAgICAgZHIgPSByb3RsKGNyLCAxMCk7XG5cdCAgICAgICAgICAgICAgICBjciA9IGJyO1xuXHQgICAgICAgICAgICAgICAgYnIgPSB0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIHQgICAgPSAoSFsxXSArIGNsICsgZHIpfDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsyXSArIGRsICsgZXIpfDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFszXSArIGVsICsgYXIpfDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFs0XSArIGFsICsgYnIpfDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFswXSArIGJsICsgY3IpfDA7XG5cdCAgICAgICAgICAgIEhbMF0gPSAgdDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWwgPDwgOCkgIHwgKG5CaXRzVG90YWwgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsIDw8IDI0KSB8IChuQml0c1RvdGFsID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXG5cdCAgICBmdW5jdGlvbiBmMSh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoeCkgXiAoeSkgXiAoeikpO1xuXG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGYyKHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCgoeCkmKHkpKSB8ICgofngpJih6KSkpO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmMyh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoKHgpIHwgKH4oeSkpKSBeICh6KSk7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGY0KHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCgoeCkgJiAoeikpIHwgKCh5KSYofih6KSkpKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZjUoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKHgpIF4gKCh5KSB8KH4oeikpKSk7XG5cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gcm90bCh4LG4pIHtcblx0ICAgICAgICByZXR1cm4gKHg8PG4pIHwgKHg+Pj4oMzItbikpO1xuXHQgICAgfVxuXG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5SSVBFTUQxNjAoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlJJUEVNRDE2MCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlJJUEVNRDE2MCA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFJJUEVNRDE2MCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjUklQRU1EMTYwKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1JJUEVNRDE2MCA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihSSVBFTUQxNjApO1xuXHR9KE1hdGgpKTtcblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBITUFDIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhNQUMgPSBDX2FsZ28uSE1BQyA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2ggYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWNIYXNoZXIgPSBDcnlwdG9KUy5hbGdvLkhNQUMuY3JlYXRlKENyeXB0b0pTLmFsZ28uU0hBMjU2LCBrZXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoYXNoZXIsIGtleSkge1xuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICBoYXNoZXIgPSB0aGlzLl9oYXNoZXIgPSBuZXcgaGFzaGVyLmluaXQoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBVdGY4LnBhcnNlKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2hlckJsb2NrU2l6ZSA9IGhhc2hlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemVCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQWxsb3cgYXJiaXRyYXJ5IGxlbmd0aCBrZXlzXG5cdCAgICAgICAgICAgIGlmIChrZXkuc2lnQnl0ZXMgPiBoYXNoZXJCbG9ja1NpemVCeXRlcykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gaGFzaGVyLmZpbmFsaXplKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICBrZXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBrZXkgZm9yIGlubmVyIGFuZCBvdXRlciBwYWRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5ID0gdGhpcy5fb0tleSA9IGtleS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB2YXIgaUtleSA9IHRoaXMuX2lLZXkgPSBrZXkuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIG9LZXlXb3JkcyA9IG9LZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpS2V5V29yZHMgPSBpS2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFhPUiBrZXlzIHdpdGggcGFkIGNvbnN0YW50c1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhc2hlckJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBvS2V5V29yZHNbaV0gXj0gMHg1YzVjNWM1Yztcblx0ICAgICAgICAgICAgICAgIGlLZXlXb3Jkc1tpXSBePSAweDM2MzYzNjM2O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG9LZXkuc2lnQnl0ZXMgPSBpS2V5LnNpZ0J5dGVzID0gaGFzaGVyQmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgSE1BQyB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSB0aGlzLl9oYXNoZXI7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXRcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIGhhc2hlci51cGRhdGUodGhpcy5faUtleSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBITUFDIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hNQUN9IFRoaXMgSE1BQyBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2hlci51cGRhdGUobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIEhNQUMgY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgSE1BQ1xuXHQgICAgICAgICAgICB2YXIgaW5uZXJIYXNoID0gaGFzaGVyLmZpbmFsaXplKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBoYXNoZXIuZmluYWxpemUodGhpcy5fb0tleS5jbG9uZSgpLmNvbmNhdChpbm5lckhhc2gpKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaG1hYztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIFNIQTEgPSBDX2FsZ28uU0hBMTtcblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMiBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBQQktERjIgPSBDX2FsZ28uUEJLREYyID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBrZXlTaXplIFRoZSBrZXkgc2l6ZSBpbiB3b3JkcyB0byBnZW5lcmF0ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZS4gRGVmYXVsdDogU0hBMVxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpdGVyYXRpb25zIFRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBwZXJmb3JtLiBEZWZhdWx0OiAxXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtleVNpemU6IDEyOC8zMixcblx0ICAgICAgICAgICAgaGFzaGVyOiBTSEExLFxuXHQgICAgICAgICAgICBpdGVyYXRpb25zOiAxXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQga2V5IGRlcml2YXRpb24gZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoZSBkZXJpdmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIga2RmID0gQ3J5cHRvSlMuYWxnby5QQktERjIuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoeyBrZXlTaXplOiA4IH0pO1xuXHQgICAgICAgICAqICAgICB2YXIga2RmID0gQ3J5cHRvSlMuYWxnby5QQktERjIuY3JlYXRlKHsga2V5U2l6ZTogOCwgaXRlcmF0aW9uczogMTAwMCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbXB1dGVzIHRoZSBQYXNzd29yZC1CYXNlZCBLZXkgRGVyaXZhdGlvbiBGdW5jdGlvbiAyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBzYWx0IEEgc2FsdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRlcml2ZWQga2V5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIga2V5ID0ga2RmLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbXB1dGU6IGZ1bmN0aW9uIChwYXNzd29yZCwgc2FsdCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgY2ZnID0gdGhpcy5jZmc7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdCBITUFDXG5cdCAgICAgICAgICAgIHZhciBobWFjID0gSE1BQy5jcmVhdGUoY2ZnLmhhc2hlciwgcGFzc3dvcmQpO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBkZXJpdmVkS2V5ID0gV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tJbmRleCA9IFdvcmRBcnJheS5jcmVhdGUoWzB4MDAwMDAwMDFdKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXlXb3JkcyA9IGRlcml2ZWRLZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja0luZGV4V29yZHMgPSBibG9ja0luZGV4LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIga2V5U2l6ZSA9IGNmZy5rZXlTaXplO1xuXHQgICAgICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IGNmZy5pdGVyYXRpb25zO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleVxuXHQgICAgICAgICAgICB3aGlsZSAoZGVyaXZlZEtleVdvcmRzLmxlbmd0aCA8IGtleVNpemUpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBibG9jayA9IGhtYWMudXBkYXRlKHNhbHQpLmZpbmFsaXplKGJsb2NrSW5kZXgpO1xuXHQgICAgICAgICAgICAgICAgaG1hYy5yZXNldCgpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1dvcmRzID0gYmxvY2sud29yZHM7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2tXb3Jkc0xlbmd0aCA9IGJsb2NrV29yZHMubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRpb25zXG5cdCAgICAgICAgICAgICAgICB2YXIgaW50ZXJtZWRpYXRlID0gYmxvY2s7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhdGlvbnM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZSA9IGhtYWMuZmluYWxpemUoaW50ZXJtZWRpYXRlKTtcblx0ICAgICAgICAgICAgICAgICAgICBobWFjLnJlc2V0KCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGVXb3JkcyA9IGludGVybWVkaWF0ZS53b3JkcztcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFhPUiBpbnRlcm1lZGlhdGUgd2l0aCBibG9ja1xuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmxvY2tXb3Jkc0xlbmd0aDsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrV29yZHNbal0gXj0gaW50ZXJtZWRpYXRlV29yZHNbal07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBkZXJpdmVkS2V5LmNvbmNhdChibG9jayk7XG5cdCAgICAgICAgICAgICAgICBibG9ja0luZGV4V29yZHNbMF0rKztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBkZXJpdmVkS2V5LnNpZ0J5dGVzID0ga2V5U2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGRlcml2ZWRLZXk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQ29tcHV0ZXMgdGhlIFBhc3N3b3JkLUJhc2VkIEtleSBEZXJpdmF0aW9uIEZ1bmN0aW9uIDIuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGNvbXB1dGF0aW9uLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRlcml2ZWQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDggfSk7XG5cdCAgICAgKiAgICAgdmFyIGtleSA9IENyeXB0b0pTLlBCS0RGMihwYXNzd29yZCwgc2FsdCwgeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICovXG5cdCAgICBDLlBCS0RGMiA9IGZ1bmN0aW9uIChwYXNzd29yZCwgc2FsdCwgY2ZnKSB7XG5cdCAgICAgICAgcmV0dXJuIFBCS0RGMi5jcmVhdGUoY2ZnKS5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcblx0ICAgIH07XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFRoaXMga2V5IGRlcml2YXRpb24gZnVuY3Rpb24gaXMgbWVhbnQgdG8gY29uZm9ybSB3aXRoIEVWUF9CeXRlc1RvS2V5LlxuXHQgICAgICogd3d3Lm9wZW5zc2wub3JnL2RvY3MvY3J5cHRvL0VWUF9CeXRlc1RvS2V5Lmh0bWxcblx0ICAgICAqL1xuXHQgICAgdmFyIEV2cEtERiA9IENfYWxnby5FdnBLREYgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhlIGtleSBzaXplIGluIHdvcmRzIHRvIGdlbmVyYXRlLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuIERlZmF1bHQ6IE1ENVxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpdGVyYXRpb25zIFRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBwZXJmb3JtLiBEZWZhdWx0OiAxXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtleVNpemU6IDEyOC8zMixcblx0ICAgICAgICAgICAgaGFzaGVyOiBNRDUsXG5cdCAgICAgICAgICAgIGl0ZXJhdGlvbnM6IDFcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVyaXZlcyBhIGtleSBmcm9tIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblxuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gY2ZnLmhhc2hlci5jcmVhdGUoKTtcblxuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleSA9IFdvcmRBcnJheS5jcmVhdGUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXlXb3JkcyA9IGRlcml2ZWRLZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0gY2ZnLmtleVNpemU7XG5cdCAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gY2ZnLml0ZXJhdGlvbnM7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5XG5cdCAgICAgICAgICAgIHdoaWxlIChkZXJpdmVkS2V5V29yZHMubGVuZ3RoIDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGJsb2NrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaGFzaGVyLnVwZGF0ZShibG9jayk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2sgPSBoYXNoZXIudXBkYXRlKHBhc3N3b3JkKS5maW5hbGl6ZShzYWx0KTtcblx0ICAgICAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRpb25zXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhdGlvbnM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gaGFzaGVyLmZpbmFsaXplKGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgZGVyaXZlZEtleS5jb25jYXQoYmxvY2spO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBEZXJpdmVzIGEga2V5IGZyb20gYSBwYXNzd29yZC5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5FdnBLREYocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuRXZwS0RGKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuRXZwS0RGID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gRXZwS0RGLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTY7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTIyNCBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTIyNCA9IENfYWxnby5TSEEyMjQgPSBTSEEyNTYuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIDB4YzEwNTllZDgsIDB4MzY3Y2Q1MDcsIDB4MzA3MGRkMTcsIDB4ZjcwZTU5MzksXG5cdCAgICAgICAgICAgICAgICAweGZmYzAwYjMxLCAweDY4NTgxNTExLCAweDY0Zjk4ZmE3LCAweGJlZmE0ZmE0XG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IFNIQTI1Ni5fZG9GaW5hbGl6ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIGhhc2guc2lnQnl0ZXMgLT0gNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTIyNCgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjI0KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjI0ID0gU0hBMjU2Ll9jcmVhdGVIZWxwZXIoU0hBMjI0KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyMjQobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjI0ID0gU0hBMjU2Ll9jcmVhdGVIbWFjSGVscGVyKFNIQTIyNCk7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgWDMyV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXG5cdCAgICAvKipcblx0ICAgICAqIHg2NCBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX3g2NCA9IEMueDY0ID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSA2NC1iaXQgd29yZC5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCA2NC1iaXQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoIFRoZSBoaWdoIDMyIGJpdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGxvdyBUaGUgbG93IDMyIGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4NjRXb3JkID0gQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoaWdoLCBsb3cpIHtcblx0ICAgICAgICAgICAgdGhpcy5oaWdoID0gaGlnaDtcblx0ICAgICAgICAgICAgdGhpcy5sb3cgPSBsb3c7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBOT1RzIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBuZWdhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG5lZ2F0ZWQgPSB4NjRXb3JkLm5vdCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG5vdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IH50aGlzLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB+dGhpcy5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgQU5EcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIEFORCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBBTkRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhbmRlZCA9IHg2NFdvcmQuYW5kKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhbmQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoICYgd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgJiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBPUmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG9yZWQgPSB4NjRXb3JkLm9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBvcjogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggfCB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyB8IHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIFhPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBYT1Igd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgWE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeG9yZWQgPSB4NjRXb3JkLnhvcihhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8geG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCBeIHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IF4gd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFNoaWZ0cyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRMKDI1KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBzaGlmdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIGlmIChuIDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gKHRoaXMuaGlnaCA8PCBuKSB8ICh0aGlzLmxvdyA+Pj4gKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IDw8IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMubG93IDw8IChuIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyA+Pj4gbikgfCAodGhpcy5oaWdoIDw8ICgzMiAtIG4pKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoID4+PiBuO1xuXHQgICAgICAgICAgICAvLyB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMuaGlnaCA+Pj4gKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0TChuKS5vcih0aGlzLnNoaWZ0Uig2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSByaWdodC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByb3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgcm90YXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciByb3RhdGVkID0geDY0V29yZC5yb3RSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdFI6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0UihuKS5vcih0aGlzLnNoaWZ0TCg2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIGFkZCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBhZGRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhZGRlZCA9IHg2NFdvcmQuYWRkKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhZGQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSAodGhpcy5sb3cgKyB3b3JkLmxvdykgfCAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgY2FycnkgPSAobG93ID4+PiAwKSA8ICh0aGlzLmxvdyA+Pj4gMCkgPyAxIDogMDtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoICsgd29yZC5oaWdoICsgY2FycnkpIHwgMDtcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiA2NC1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyksXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgxODE5MWExYiwgMHgxYzFkMWUxZilcblx0ICAgICAgICAgKiAgICAgXSk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdLCAxMCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogODtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIDY0LWJpdCB3b3JkIGFycmF5IHRvIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDcnlwdG9KUy5saWIuV29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkncyBkYXRhIGFzIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4MzJXb3JkQXJyYXkgPSB4NjRXb3JkQXJyYXkudG9YMzIoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1gzMjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzTGVuZ3RoID0geDY0V29yZHMubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHgzMldvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeDY0V29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHg2NFdvcmQgPSB4NjRXb3Jkc1tpXTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5oaWdoKTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5sb3cpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIFgzMldvcmRBcnJheS5jcmVhdGUoeDMyV29yZHMsIHRoaXMuc2lnQnl0ZXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0geDY0V29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIFwid29yZHNcIiBhcnJheVxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgZWFjaCBYNjRXb3JkIG9iamVjdFxuXHQgICAgICAgICAgICB2YXIgd29yZHNMZW5ndGggPSB3b3Jkcy5sZW5ndGg7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaV0gPSB3b3Jkc1tpXS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9KCkpO1xuXG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgUkhPX09GRlNFVFMgPSBbXTtcblx0ICAgIHZhciBQSV9JTkRFWEVTICA9IFtdO1xuXHQgICAgdmFyIFJPVU5EX0NPTlNUQU5UUyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIENvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAvLyBDb21wdXRlIHJobyBvZmZzZXQgY29uc3RhbnRzXG5cdCAgICAgICAgdmFyIHggPSAxLCB5ID0gMDtcblx0ICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IDI0OyB0KyspIHtcblx0ICAgICAgICAgICAgUkhPX09GRlNFVFNbeCArIDUgKiB5XSA9ICgodCArIDEpICogKHQgKyAyKSAvIDIpICUgNjQ7XG5cblx0ICAgICAgICAgICAgdmFyIG5ld1ggPSB5ICUgNTtcblx0ICAgICAgICAgICAgdmFyIG5ld1kgPSAoMiAqIHggKyAzICogeSkgJSA1O1xuXHQgICAgICAgICAgICB4ID0gbmV3WDtcblx0ICAgICAgICAgICAgeSA9IG5ld1k7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ29tcHV0ZSBwaSBpbmRleCBjb25zdGFudHNcblx0ICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgUElfSU5ERVhFU1t4ICsgNSAqIHldID0geSArICgoMiAqIHggKyAzICogeSkgJSA1KSAqIDU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb21wdXRlIHJvdW5kIGNvbnN0YW50c1xuXHQgICAgICAgIHZhciBMRlNSID0gMHgwMTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIHJvdW5kQ29uc3RhbnRNc3cgPSAwO1xuXHQgICAgICAgICAgICB2YXIgcm91bmRDb25zdGFudExzdyA9IDA7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChMRlNSICYgMHgwMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBiaXRQb3NpdGlvbiA9ICgxIDw8IGopIC0gMTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYml0UG9zaXRpb24gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByb3VuZENvbnN0YW50THN3IF49IDEgPDwgYml0UG9zaXRpb247XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIGlmIChiaXRQb3NpdGlvbiA+PSAzMikgKi8ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByb3VuZENvbnN0YW50TXN3IF49IDEgPDwgKGJpdFBvc2l0aW9uIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ29tcHV0ZSBuZXh0IExGU1Jcblx0ICAgICAgICAgICAgICAgIGlmIChMRlNSICYgMHg4MCkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFByaW1pdGl2ZSBwb2x5bm9taWFsIG92ZXIgR0YoMik6IHheOCArIHheNiArIHheNSArIHheNCArIDFcblx0ICAgICAgICAgICAgICAgICAgICBMRlNSID0gKExGU1IgPDwgMSkgXiAweDcxO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBMRlNSIDw8PSAxO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgUk9VTkRfQ09OU1RBTlRTW2ldID0gWDY0V29yZC5jcmVhdGUocm91bmRDb25zdGFudE1zdywgcm91bmRDb25zdGFudExzdyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0cyBmb3IgdGVtcG9yYXJ5IHZhbHVlc1xuXHQgICAgdmFyIFQgPSBbXTtcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSBYNjRXb3JkLmNyZWF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTMgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzID0gQ19hbGdvLlNIQTMgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gb3V0cHV0TGVuZ3RoXG5cdCAgICAgICAgICogICBUaGUgZGVzaXJlZCBudW1iZXIgb2YgYml0cyBpbiB0aGUgb3V0cHV0IGhhc2guXG5cdCAgICAgICAgICogICBPbmx5IHZhbHVlcyBwZXJtaXR0ZWQgYXJlOiAyMjQsIDI1NiwgMzg0LCA1MTIuXG5cdCAgICAgICAgICogICBEZWZhdWx0OiA1MTJcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEhhc2hlci5jZmcuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgb3V0cHV0TGVuZ3RoOiA1MTJcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlID0gW11cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IG5ldyBYNjRXb3JkLmluaXQoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplID0gKDE2MDAgLSAyICogdGhpcy5jZmcub3V0cHV0TGVuZ3RoKSAvIDMyO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHQgICAgICAgICAgICB2YXIgbkJsb2NrU2l6ZUxhbmVzID0gdGhpcy5ibG9ja1NpemUgLyAyO1xuXG5cdCAgICAgICAgICAgIC8vIEFic29yYlxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CbG9ja1NpemVMYW5lczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBNMmkgID0gTVtvZmZzZXQgKyAyICogaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgTTJpMSA9IE1bb2Zmc2V0ICsgMiAqIGkgKyAxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgICAgIE0yaSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkgPDwgOCkgIHwgKE0yaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkgPDwgMjQpIHwgKE0yaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICAgICAgTTJpMSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNMmkxIDw8IDgpICB8IChNMmkxID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaTEgPDwgMjQpIHwgKE0yaTEgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQWJzb3JiIG1lc3NhZ2UgaW50byBzdGF0ZVxuXHQgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtpXTtcblx0ICAgICAgICAgICAgICAgIGxhbmUuaGlnaCBePSBNMmkxO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5sb3cgIF49IE0yaTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgMjQ7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFRoZXRhXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIE1peCBjb2x1bW4gbGFuZXNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdE1zdyA9IDAsIHRMc3cgPSAwO1xuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNTsgeSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbeCArIDUgKiB5XTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdE1zdyBePSBsYW5lLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRMc3cgXj0gbGFuZS5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gVGVtcG9yYXJ5IHZhbHVlc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeCA9IFRbeF07XG5cdCAgICAgICAgICAgICAgICAgICAgVHguaGlnaCA9IHRNc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgVHgubG93ICA9IHRMc3c7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDU7IHgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDQgPSBUWyh4ICsgNCkgJSA1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgVHgxID0gVFsoeCArIDEpICUgNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4MU1zdyA9IFR4MS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDFMc3cgPSBUeDEubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gTWl4IHN1cnJvdW5kaW5nIGNvbHVtbnNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdE1zdyA9IFR4NC5oaWdoIF4gKChUeDFNc3cgPDwgMSkgfCAoVHgxTHN3ID4+PiAzMSkpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0THN3ID0gVHg0LmxvdyAgXiAoKFR4MUxzdyA8PCAxKSB8IChUeDFNc3cgPj4+IDMxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA1OyB5KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVt4ICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmhpZ2ggXj0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbGFuZS5sb3cgIF49IHRMc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSaG8gUGlcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGxhbmVJbmRleCA9IDE7IGxhbmVJbmRleCA8IDI1OyBsYW5lSW5kZXgrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbbGFuZUluZGV4XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZU1zdyA9IGxhbmUuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZUxzdyA9IGxhbmUubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciByaG9PZmZzZXQgPSBSSE9fT0ZGU0VUU1tsYW5lSW5kZXhdO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUm90YXRlIGxhbmVzXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHJob09mZnNldCA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gKGxhbmVNc3cgPDwgcmhvT2Zmc2V0KSB8IChsYW5lTHN3ID4+PiAoMzIgLSByaG9PZmZzZXQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRMc3cgPSAobGFuZUxzdyA8PCByaG9PZmZzZXQpIHwgKGxhbmVNc3cgPj4+ICgzMiAtIHJob09mZnNldCkpO1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAocmhvT2Zmc2V0ID49IDMyKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gKGxhbmVMc3cgPDwgKHJob09mZnNldCAtIDMyKSkgfCAobGFuZU1zdyA+Pj4gKDY0IC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0THN3ID0gKGxhbmVNc3cgPDwgKHJob09mZnNldCAtIDMyKSkgfCAobGFuZUxzdyA+Pj4gKDY0IC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNwb3NlIGxhbmVzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFRQaUxhbmUgPSBUW1BJX0lOREVYRVNbbGFuZUluZGV4XV07XG5cdCAgICAgICAgICAgICAgICAgICAgVFBpTGFuZS5oaWdoID0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICBUUGlMYW5lLmxvdyAgPSB0THN3O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSaG8gcGkgYXQgeCA9IHkgPSAwXG5cdCAgICAgICAgICAgICAgICB2YXIgVDAgPSBUWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIHN0YXRlMCA9IHN0YXRlWzBdO1xuXHQgICAgICAgICAgICAgICAgVDAuaGlnaCA9IHN0YXRlMC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgVDAubG93ICA9IHN0YXRlMC5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIC8vIENoaVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCA1OyB4KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmVJbmRleCA9IHggKyA1ICogeTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtsYW5lSW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVExhbmUgPSBUW2xhbmVJbmRleF07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBUeDFMYW5lID0gVFsoKHggKyAxKSAlIDUpICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVHgyTGFuZSA9IFRbKCh4ICsgMikgJSA1KSArIDUgKiB5XTtcblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXggcm93c1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmhpZ2ggPSBUTGFuZS5oaWdoIF4gKH5UeDFMYW5lLmhpZ2ggJiBUeDJMYW5lLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmxvdyAgPSBUTGFuZS5sb3cgIF4gKH5UeDFMYW5lLmxvdyAgJiBUeDJMYW5lLmxvdyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJb3RhXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIHJvdW5kQ29uc3RhbnQgPSBST1VORF9DT05TVEFOVFNbcm91bmRdO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5oaWdoIF49IHJvdW5kQ29uc3RhbnQuaGlnaDtcblx0ICAgICAgICAgICAgICAgIGxhbmUubG93ICBePSByb3VuZENvbnN0YW50Lmxvdzs7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJpdHMgPSB0aGlzLmJsb2NrU2l6ZSAqIDMyO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4MSA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKE1hdGguY2VpbCgobkJpdHNMZWZ0ICsgMSkgLyBibG9ja1NpemVCaXRzKSAqIGJsb2NrU2l6ZUJpdHMpID4+PiA1KSAtIDFdIHw9IDB4ODA7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuXHQgICAgICAgICAgICB2YXIgb3V0cHV0TGVuZ3RoQnl0ZXMgPSB0aGlzLmNmZy5vdXRwdXRMZW5ndGggLyA4O1xuXHQgICAgICAgICAgICB2YXIgb3V0cHV0TGVuZ3RoTGFuZXMgPSBvdXRwdXRMZW5ndGhCeXRlcyAvIDg7XG5cblx0ICAgICAgICAgICAgLy8gU3F1ZWV6ZVxuXHQgICAgICAgICAgICB2YXIgaGFzaFdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0cHV0TGVuZ3RoTGFuZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxhbmVNc3cgPSBsYW5lLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZUxzdyA9IGxhbmUubG93O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgbGFuZU1zdyA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTXN3IDw8IDgpICB8IChsYW5lTXN3ID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVNc3cgPDwgMjQpIHwgKGxhbmVNc3cgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgICAgIGxhbmVMc3cgPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgobGFuZUxzdyA8PCA4KSAgfCAobGFuZUxzdyA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTHN3IDw8IDI0KSB8IChsYW5lTHN3ID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNxdWVlemUgc3RhdGUgdG8gcmV0cmlldmUgaGFzaFxuXHQgICAgICAgICAgICAgICAgaGFzaFdvcmRzLnB1c2gobGFuZUxzdyk7XG5cdCAgICAgICAgICAgICAgICBoYXNoV29yZHMucHVzaChsYW5lTXN3KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQoaGFzaFdvcmRzLCBvdXRwdXRMZW5ndGhCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IGNsb25lLl9zdGF0ZSA9IHRoaXMuX3N0YXRlLnNsaWNlKDApO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gc3RhdGVbaV0uY2xvbmUoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTMoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTMod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEzID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMyk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMyhtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEzID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTMpO1xuXHR9KE1hdGgpKTtcblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBmdW5jdGlvbiBYNjRXb3JkX2NyZWF0ZSgpIHtcblx0ICAgICAgICByZXR1cm4gWDY0V29yZC5jcmVhdGUuYXBwbHkoWDY0V29yZCwgYXJndW1lbnRzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gQ29uc3RhbnRzXG5cdCAgICB2YXIgSyA9IFtcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDQyOGEyZjk4LCAweGQ3MjhhZTIyKSwgWDY0V29yZF9jcmVhdGUoMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiNWMwZmJjZiwgMHhlYzRkM2IyZiksIFg2NFdvcmRfY3JlYXRlKDB4ZTliNWRiYTUsIDB4ODE4OWRiYmMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgpLCBYNjRXb3JkX2NyZWF0ZSgweDU5ZjExMWYxLCAweGI2MDVkMDE5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkyM2Y4MmE0LCAweGFmMTk0ZjliKSwgWDY0V29yZF9jcmVhdGUoMHhhYjFjNWVkNSwgMHhkYTZkODExOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkODA3YWE5OCwgMHhhMzAzMDI0MiksIFg2NFdvcmRfY3JlYXRlKDB4MTI4MzViMDEsIDB4NDU3MDZmYmUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMpLCBYNjRXb3JkX2NyZWF0ZSgweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDcyYmU1ZDc0LCAweGYyN2I4OTZmKSwgWDY0V29yZF9jcmVhdGUoMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5YmRjMDZhNywgMHgyNWM3MTIzNSksIFg2NFdvcmRfY3JlYXRlKDB4YzE5YmYxNzQsIDB4Y2Y2OTI2OTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIpLCBYNjRXb3JkX2NyZWF0ZSgweGVmYmU0Nzg2LCAweDM4NGYyNWUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDBmYzE5ZGM2LCAweDhiOGNkNWI1KSwgWDY0V29yZF9jcmVhdGUoMHgyNDBjYTFjYywgMHg3N2FjOWM2NSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyZGU5MmM2ZiwgMHg1OTJiMDI3NSksIFg2NFdvcmRfY3JlYXRlKDB4NGE3NDg0YWEsIDB4NmVhNmU0ODMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQpLCBYNjRXb3JkX2NyZWF0ZSgweDc2Zjk4OGRhLCAweDgzMTE1M2I1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDk4M2U1MTUyLCAweGVlNjZkZmFiKSwgWDY0V29yZF9jcmVhdGUoMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiMDAzMjdjOCwgMHg5OGZiMjEzZiksIFg2NFdvcmRfY3JlYXRlKDB4YmY1OTdmYzcsIDB4YmVlZjBlZTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzZlMDBiZjMsIDB4M2RhODhmYzIpLCBYNjRXb3JkX2NyZWF0ZSgweGQ1YTc5MTQ3LCAweDkzMGFhNzI1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2Y2E2MzUxLCAweGUwMDM4MjZmKSwgWDY0V29yZF9jcmVhdGUoMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyN2I3MGE4NSwgMHg0NmQyMmZmYyksIFg2NFdvcmRfY3JlYXRlKDB4MmUxYjIxMzgsIDB4NWMyNmM5MjYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQpLCBYNjRXb3JkX2NyZWF0ZSgweDUzMzgwZDEzLCAweDlkOTViM2RmKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDY1MGE3MzU0LCAweDhiYWY2M2RlKSwgWDY0V29yZF9jcmVhdGUoMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4MWMyYzkyZSwgMHg0N2VkYWVlNiksIFg2NFdvcmRfY3JlYXRlKDB4OTI3MjJjODUsIDB4MTQ4MjM1M2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MWE2NjRiLCAweGJjNDIzMDAxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGMyNGI4YjcwLCAweGQwZjg5NzkxKSwgWDY0V29yZF9jcmVhdGUoMHhjNzZjNTFhMywgMHgwNjU0YmUzMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkMTkyZTgxOSwgMHhkNmVmNTIxOCksIFg2NFdvcmRfY3JlYXRlKDB4ZDY5OTA2MjQsIDB4NTU2NWE5MTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEpLCBYNjRXb3JkX2NyZWF0ZSgweDEwNmFhMDcwLCAweDMyYmJkMWI4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDE5YTRjMTE2LCAweGI4ZDJkMGM4KSwgWDY0V29yZF9jcmVhdGUoMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNzQ4Nzc0YywgMHhkZjhlZWI5OSksIFg2NFdvcmRfY3JlYXRlKDB4MzRiMGJjYjUsIDB4ZTE5YjQ4YTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMpLCBYNjRXb3JkX2NyZWF0ZSgweDRlZDhhYTRhLCAweGUzNDE4YWNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDViOWNjYTRmLCAweDc3NjNlMzczKSwgWDY0V29yZF9jcmVhdGUoMHg2ODJlNmZmMywgMHhkNmIyYjhhMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3NDhmODJlZSwgMHg1ZGVmYjJmYyksIFg2NFdvcmRfY3JlYXRlKDB4NzhhNTYzNmYsIDB4NDMxNzJmNjApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODRjODc4MTQsIDB4YTFmMGFiNzIpLCBYNjRXb3JkX2NyZWF0ZSgweDhjYzcwMjA4LCAweDFhNjQzOWVjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkwYmVmZmZhLCAweDIzNjMxZTI4KSwgWDY0V29yZF9jcmVhdGUoMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiZWY5YTNmNywgMHhiMmM2NzkxNSksIFg2NFdvcmRfY3JlYXRlKDB4YzY3MTc4ZjIsIDB4ZTM3MjUzMmIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMpLCBYNjRXb3JkX2NyZWF0ZSgweGQxODZiOGM3LCAweDIxYzBjMjA3KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGVhZGE3ZGQ2LCAweGNkZTBlYjFlKSwgWDY0V29yZF9jcmVhdGUoMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmYwNjdhYSwgMHg3MjE3NmZiYSksIFg2NFdvcmRfY3JlYXRlKDB4MGE2MzdkYzUsIDB4YTJjODk4YTYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUpLCBYNjRXb3JkX2NyZWF0ZSgweDFiNzEwYjM1LCAweDEzMWM0NzFiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0KSwgWDY0V29yZF9jcmVhdGUoMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzYzllYmUwYSwgMHgxNWM5YmViYyksIFg2NFdvcmRfY3JlYXRlKDB4NDMxZDY3YzQsIDB4OWMxMDBkNGMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYpLCBYNjRXb3JkX2NyZWF0ZSgweDU5N2YyOTljLCAweGZjNjU3ZTJhKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVmY2I2ZmFiLCAweDNhZDZmYWVjKSwgWDY0V29yZF9jcmVhdGUoMHg2YzQ0MTk4YywgMHg0YTQ3NTgxNylcblx0ICAgIF07XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBXID0gW107XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICBXW2ldID0gWDY0V29yZF9jcmVhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS01MTIgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NmEwOWU2NjcsIDB4ZjNiY2M5MDgpLCBuZXcgWDY0V29yZC5pbml0KDB4YmI2N2FlODUsIDB4ODRjYWE3M2IpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDNjNmVmMzcyLCAweGZlOTRmODJiKSwgbmV3IFg2NFdvcmQuaW5pdCgweGE1NGZmNTNhLCAweDVmMWQzNmYxKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg1MTBlNTI3ZiwgMHhhZGU2ODJkMSksIG5ldyBYNjRXb3JkLmluaXQoMHg5YjA1Njg4YywgMHgyYjNlNmMxZiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4MWY4M2Q5YWIsIDB4ZmI0MWJkNmIpLCBuZXcgWDY0V29yZC5pbml0KDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgSDAgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgSDEgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgSDIgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgSDMgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgSDQgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgSDUgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgSDYgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgSDcgPSBIWzddO1xuXG5cdCAgICAgICAgICAgIHZhciBIMGggPSBIMC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDBsID0gSDAubG93O1xuXHQgICAgICAgICAgICB2YXIgSDFoID0gSDEuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgxbCA9IEgxLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgyaCA9IEgyLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMmwgPSBIMi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIM2ggPSBIMy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDNsID0gSDMubG93O1xuXHQgICAgICAgICAgICB2YXIgSDRoID0gSDQuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg0bCA9IEg0Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg1aCA9IEg1LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINWwgPSBINS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINmggPSBINi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDZsID0gSDYubG93O1xuXHQgICAgICAgICAgICB2YXIgSDdoID0gSDcuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg3bCA9IEg3LmxvdztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWggPSBIMGg7XG5cdCAgICAgICAgICAgIHZhciBhbCA9IEgwbDtcblx0ICAgICAgICAgICAgdmFyIGJoID0gSDFoO1xuXHQgICAgICAgICAgICB2YXIgYmwgPSBIMWw7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IEgyaDtcblx0ICAgICAgICAgICAgdmFyIGNsID0gSDJsO1xuXHQgICAgICAgICAgICB2YXIgZGggPSBIM2g7XG5cdCAgICAgICAgICAgIHZhciBkbCA9IEgzbDtcblx0ICAgICAgICAgICAgdmFyIGVoID0gSDRoO1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBINGw7XG5cdCAgICAgICAgICAgIHZhciBmaCA9IEg1aDtcblx0ICAgICAgICAgICAgdmFyIGZsID0gSDVsO1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSBINmg7XG5cdCAgICAgICAgICAgIHZhciBnbCA9IEg2bDtcblx0ICAgICAgICAgICAgdmFyIGhoID0gSDdoO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBIN2w7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBXaSA9IFdbaV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIEV4dGVuZCBtZXNzYWdlXG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpaCA9IFdpLmhpZ2ggPSBNW29mZnNldCArIGkgKiAyXSAgICAgfCAwO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaWwgPSBXaS5sb3cgID0gTVtvZmZzZXQgKyBpICogMiArIDFdIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWEwXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4aCA9IGdhbW1hMHguaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweGwgPSBnYW1tYTB4Lmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwaCAgPSAoKGdhbW1hMHhoID4+PiAxKSB8IChnYW1tYTB4bCA8PCAzMSkpIF4gKChnYW1tYTB4aCA+Pj4gOCkgfCAoZ2FtbWEweGwgPDwgMjQpKSBeIChnYW1tYTB4aCA+Pj4gNyk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMGwgID0gKChnYW1tYTB4bCA+Pj4gMSkgfCAoZ2FtbWEweGggPDwgMzEpKSBeICgoZ2FtbWEweGwgPj4+IDgpIHwgKGdhbW1hMHhoIDw8IDI0KSkgXiAoKGdhbW1hMHhsID4+PiA3KSB8IChnYW1tYTB4aCA8PCAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWExXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhoID0gZ2FtbWExeC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4bCA9IGdhbW1hMXgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTFoICA9ICgoZ2FtbWExeGggPj4+IDE5KSB8IChnYW1tYTF4bCA8PCAxMykpIF4gKChnYW1tYTF4aCA8PCAzKSB8IChnYW1tYTF4bCA+Pj4gMjkpKSBeIChnYW1tYTF4aCA+Pj4gNik7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWwgID0gKChnYW1tYTF4bCA+Pj4gMTkpIHwgKGdhbW1hMXhoIDw8IDEzKSkgXiAoKGdhbW1hMXhsIDw8IDMpIHwgKGdhbW1hMXhoID4+PiAyOSkpIF4gKChnYW1tYTF4bCA+Pj4gNikgfCAoZ2FtbWExeGggPDwgMjYpKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTcgID0gV1tpIC0gN107XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpN2ggPSBXaTcuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3bCA9IFdpNy5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNiAgPSBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZoID0gV2kxNi5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2bCA9IFdpMTYubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpbCA9IGdhbW1hMGwgKyBXaTdsO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaWggPSBnYW1tYTBoICsgV2k3aCArICgoV2lsID4+PiAwKSA8IChnYW1tYTBsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2lsID0gV2lsICsgZ2FtbWExbDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2loID0gV2loICsgZ2FtbWExaCArICgoV2lsID4+PiAwKSA8IChnYW1tYTFsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2lsID0gV2lsICsgV2kxNmw7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpaCA9IFdpaCArIFdpMTZoICsgKChXaWwgPj4+IDApIDwgKFdpMTZsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdpLmhpZ2ggPSBXaWg7XG5cdCAgICAgICAgICAgICAgICAgICAgV2kubG93ICA9IFdpbDtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoaCAgPSAoZWggJiBmaCkgXiAofmVoICYgZ2gpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNobCAgPSAoZWwgJiBmbCkgXiAofmVsICYgZ2wpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hamggPSAoYWggJiBiaCkgXiAoYWggJiBjaCkgXiAoYmggJiBjaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqbCA9IChhbCAmIGJsKSBeIChhbCAmIGNsKSBeIChibCAmIGNsKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGggPSAoKGFoID4+PiAyOCkgfCAoYWwgPDwgNCkpICBeICgoYWggPDwgMzApICB8IChhbCA+Pj4gMikpIF4gKChhaCA8PCAyNSkgfCAoYWwgPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTBsID0gKChhbCA+Pj4gMjgpIHwgKGFoIDw8IDQpKSAgXiAoKGFsIDw8IDMwKSAgfCAoYWggPj4+IDIpKSBeICgoYWwgPDwgMjUpIHwgKGFoID4+PiA3KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExaCA9ICgoZWggPj4+IDE0KSB8IChlbCA8PCAxOCkpIF4gKChlaCA+Pj4gMTgpIHwgKGVsIDw8IDE0KSkgXiAoKGVoIDw8IDIzKSB8IChlbCA+Pj4gOSkpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMWwgPSAoKGVsID4+PiAxNCkgfCAoZWggPDwgMTgpKSBeICgoZWwgPj4+IDE4KSB8IChlaCA8PCAxNCkpIF4gKChlbCA8PCAyMykgfCAoZWggPj4+IDkpKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXVxuXHQgICAgICAgICAgICAgICAgdmFyIEtpICA9IEtbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgS2loID0gS2kuaGlnaDtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWwgPSBLaS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSBobCArIHNpZ21hMWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gaGggKyBzaWdtYTFoICsgKCh0MWwgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBjaGw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgY2hoICsgKCh0MWwgPj4+IDApIDwgKGNobCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgS2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIEtpaCArICgodDFsID4+PiAwKSA8IChLaWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBXaWggKyAoKHQxbCA+Pj4gMCkgPCAoV2lsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDIgPSBzaWdtYTAgKyBtYWpcblx0ICAgICAgICAgICAgICAgIHZhciB0MmwgPSBzaWdtYTBsICsgbWFqbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MmggPSBzaWdtYTBoICsgbWFqaCArICgodDJsID4+PiAwKSA8IChzaWdtYTBsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgICAgICBoaCA9IGdoO1xuXHQgICAgICAgICAgICAgICAgaGwgPSBnbDtcblx0ICAgICAgICAgICAgICAgIGdoID0gZmg7XG5cdCAgICAgICAgICAgICAgICBnbCA9IGZsO1xuXHQgICAgICAgICAgICAgICAgZmggPSBlaDtcblx0ICAgICAgICAgICAgICAgIGZsID0gZWw7XG5cdCAgICAgICAgICAgICAgICBlbCA9IChkbCArIHQxbCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZWggPSAoZGggKyB0MWggKyAoKGVsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGRoID0gY2g7XG5cdCAgICAgICAgICAgICAgICBkbCA9IGNsO1xuXHQgICAgICAgICAgICAgICAgY2ggPSBiaDtcblx0ICAgICAgICAgICAgICAgIGNsID0gYmw7XG5cdCAgICAgICAgICAgICAgICBiaCA9IGFoO1xuXHQgICAgICAgICAgICAgICAgYmwgPSBhbDtcblx0ICAgICAgICAgICAgICAgIGFsID0gKHQxbCArIHQybCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgYWggPSAodDFoICsgdDJoICsgKChhbCA+Pj4gMCkgPCAodDFsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSDBsID0gSDAubG93ICA9IChIMGwgKyBhbCk7XG5cdCAgICAgICAgICAgIEgwLmhpZ2ggPSAoSDBoICsgYWggKyAoKEgwbCA+Pj4gMCkgPCAoYWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDFsID0gSDEubG93ICA9IChIMWwgKyBibCk7XG5cdCAgICAgICAgICAgIEgxLmhpZ2ggPSAoSDFoICsgYmggKyAoKEgxbCA+Pj4gMCkgPCAoYmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDJsID0gSDIubG93ICA9IChIMmwgKyBjbCk7XG5cdCAgICAgICAgICAgIEgyLmhpZ2ggPSAoSDJoICsgY2ggKyAoKEgybCA+Pj4gMCkgPCAoY2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDNsID0gSDMubG93ICA9IChIM2wgKyBkbCk7XG5cdCAgICAgICAgICAgIEgzLmhpZ2ggPSAoSDNoICsgZGggKyAoKEgzbCA+Pj4gMCkgPCAoZGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDRsID0gSDQubG93ICA9IChINGwgKyBlbCk7XG5cdCAgICAgICAgICAgIEg0LmhpZ2ggPSAoSDRoICsgZWggKyAoKEg0bCA+Pj4gMCkgPCAoZWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDVsID0gSDUubG93ICA9IChINWwgKyBmbCk7XG5cdCAgICAgICAgICAgIEg1LmhpZ2ggPSAoSDVoICsgZmggKyAoKEg1bCA+Pj4gMCkgPCAoZmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDZsID0gSDYubG93ICA9IChINmwgKyBnbCk7XG5cdCAgICAgICAgICAgIEg2LmhpZ2ggPSAoSDZoICsgZ2ggKyAoKEg2bCA+Pj4gMCkgPCAoZ2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDdsID0gSDcubG93ICA9IChIN2wgKyBobCk7XG5cdCAgICAgICAgICAgIEg3LmhpZ2ggPSAoSDdoICsgaGggKyAoKEg3bCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzBdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzFdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IGhhc2ggdG8gMzItYml0IHdvcmQgYXJyYXkgYmVmb3JlIHJldHVybmluZ1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2gudG9YMzIoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMDI0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTUxMignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBNTEyKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEE1MTIobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTUxMik7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0zODQgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzODQgPSBDX2FsZ28uU0hBMzg0ID0gU0hBNTEyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgpLCBuZXcgWDY0V29yZC5pbml0KDB4NjI5YTI5MmEsIDB4MzY3Y2Q1MDcpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDkxNTkwMTVhLCAweDMwNzBkZDE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDE1MmZlY2Q4LCAweGY3MGU1OTM5KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2NzMzMjY2NywgMHhmZmMwMGIzMSksIG5ldyBYNjRXb3JkLmluaXQoMHg4ZWI0NGE4NywgMHg2ODU4MTUxMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcpLCBuZXcgWDY0V29yZC5pbml0KDB4NDdiNTQ4MWQsIDB4YmVmYTRmYTQpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IFNIQTUxMi5fZG9GaW5hbGl6ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIGhhc2guc2lnQnl0ZXMgLT0gMTY7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSGVscGVyKFNIQTM4NCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMzg0KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSG1hY0hlbHBlcihTSEEzODQpO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIENpcGhlciBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHRDcnlwdG9KUy5saWIuQ2lwaGVyIHx8IChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG07XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBCYXNlNjQgPSBDX2VuYy5CYXNlNjQ7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIEV2cEtERiA9IENfYWxnby5FdnBLREY7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBjaXBoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGtleVNpemUgVGhpcyBjaXBoZXIncyBrZXkgc2l6ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaXZTaXplIFRoaXMgY2lwaGVyJ3MgSVYgc2l6ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX0VOQ19YRk9STV9NT0RFIEEgY29uc3RhbnQgcmVwcmVzZW50aW5nIGVuY3J5cHRpb24gbW9kZS5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfREVDX1hGT1JNX01PREUgQSBjb25zdGFudCByZXByZXNlbnRpbmcgZGVjcnlwdGlvbiBtb2RlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ2lwaGVyID0gQ19saWIuQ2lwaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBpdiBUaGUgSVYgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgY2lwaGVyIGluIGVuY3J5cHRpb24gbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyfSBBIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlciA9IENyeXB0b0pTLmFsZ28uQUVTLmNyZWF0ZUVuY3J5cHRvcihrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9FTkNfWEZPUk1fTU9ERSwga2V5LCBjZmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgY2lwaGVyIGluIGRlY3J5cHRpb24gbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyfSBBIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlciA9IENyeXB0b0pTLmFsZ28uQUVTLmNyZWF0ZURlY3J5cHRvcihrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZURlY3J5cHRvcjogZnVuY3Rpb24gKGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9ERUNfWEZPUk1fTU9ERSwga2V5LCBjZmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgY2lwaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHhmb3JtTW9kZSBFaXRoZXIgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiB0cmFuc29ybWF0aW9uIG1vZGUgY29uc3RhbnQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXIgPSBDcnlwdG9KUy5hbGdvLkFFUy5jcmVhdGUoQ3J5cHRvSlMuYWxnby5BRVMuX0VOQ19YRk9STV9NT0RFLCBrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh4Zm9ybU1vZGUsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFN0b3JlIHRyYW5zZm9ybSBtb2RlIGFuZCBrZXlcblx0ICAgICAgICAgICAgdGhpcy5feGZvcm1Nb2RlID0geGZvcm1Nb2RlO1xuXHQgICAgICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgY2lwaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBjaXBoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1jaXBoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIGRhdGEgdG8gYmUgZW5jcnlwdGVkIG9yIGRlY3J5cHRlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YVVwZGF0ZSBUaGUgZGF0YSB0byBlbmNyeXB0IG9yIGRlY3J5cHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBkYXRhIGFmdGVyIHByb2Nlc3NpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIucHJvY2VzcygnZGF0YScpO1xuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLnByb2Nlc3Mod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwcm9jZXNzOiBmdW5jdGlvbiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKGRhdGFVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYXZhaWxhYmxlIGJsb2Nrc1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2VzcygpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiBwcm9jZXNzLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGFVcGRhdGUgVGhlIGZpbmFsIGRhdGEgdG8gZW5jcnlwdCBvciBkZWNyeXB0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGF0YSBhZnRlciBmaW5hbCBwcm9jZXNzaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIuZmluYWxpemUoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBkYXRhIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAoZGF0YVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKGRhdGFVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1jaXBoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGZpbmFsUHJvY2Vzc2VkRGF0YSA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gZmluYWxQcm9jZXNzZWREYXRhO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAxMjgvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDEyOC8zMixcblxuXHQgICAgICAgIF9FTkNfWEZPUk1fTU9ERTogMSxcblxuXHQgICAgICAgIF9ERUNfWEZPUk1fTU9ERTogMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgc2hvcnRjdXQgZnVuY3Rpb25zIHRvIGEgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBlbmNyeXB0IGFuZCBkZWNyeXB0IHNob3J0Y3V0IGZ1bmN0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEFFUyA9IENyeXB0b0pTLmxpYi5DaXBoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLkFFUyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXNzd29yZEJhc2VkQ2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gU2VyaWFsaXphYmxlQ2lwaGVyO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjaXBoZXIpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZW5jcnlwdDogZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RDaXBoZXJTdHJhdGVneShrZXkpLmVuY3J5cHQoY2lwaGVyLCBtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAgICAgICAgIGRlY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXJ0ZXh0LCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0Q2lwaGVyU3RyYXRlZ3koa2V5KS5kZWNyeXB0KGNpcGhlciwgY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSgpKVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYmFzZSBzdHJlYW0gY2lwaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBjaXBoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDEgKDMyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBTdHJlYW1DaXBoZXIgPSBDX2xpYi5TdHJlYW1DaXBoZXIgPSBDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHZhciBmaW5hbFByb2Nlc3NlZEJsb2NrcyA9IHRoaXMuX3Byb2Nlc3MoISEnZmx1c2gnKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gZmluYWxQcm9jZXNzZWRCbG9ja3M7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTW9kZSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX21vZGUgPSBDLm1vZGUgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIGJsb2NrIGNpcGhlciBtb2RlIHRlbXBsYXRlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmxvY2tDaXBoZXJNb2RlID0gQ19saWIuQmxvY2tDaXBoZXJNb2RlID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgdGhpcyBtb2RlIGZvciBlbmNyeXB0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBpdiBUaGUgSVYgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBtb2RlID0gQ3J5cHRvSlMubW9kZS5DQkMuY3JlYXRlRW5jcnlwdG9yKGNpcGhlciwgaXYud29yZHMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNyZWF0ZUVuY3J5cHRvcjogZnVuY3Rpb24gKGNpcGhlciwgaXYpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuRW5jcnlwdG9yLmNyZWF0ZShjaXBoZXIsIGl2KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyB0aGlzIG1vZGUgZm9yIGRlY3J5cHRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIEEgYmxvY2sgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGl2IFRoZSBJViB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG1vZGUgPSBDcnlwdG9KUy5tb2RlLkNCQy5jcmVhdGVEZWNyeXB0b3IoY2lwaGVyLCBpdi53b3Jkcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY3JlYXRlRGVjcnlwdG9yOiBmdW5jdGlvbiAoY2lwaGVyLCBpdikge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5EZWNyeXB0b3IuY3JlYXRlKGNpcGhlciwgaXYpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgbW9kZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgQSBibG9jayBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gaXYgVGhlIElWIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbW9kZSA9IENyeXB0b0pTLm1vZGUuQ0JDLkVuY3J5cHRvci5jcmVhdGUoY2lwaGVyLCBpdi53b3Jkcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNpcGhlciwgaXYpIHtcblx0ICAgICAgICAgICAgdGhpcy5fY2lwaGVyID0gY2lwaGVyO1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IGl2O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENpcGhlciBCbG9jayBDaGFpbmluZyBtb2RlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ0JDID0gQ19tb2RlLkNCQyA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWJzdHJhY3QgYmFzZSBDQkMgbW9kZS5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICB2YXIgQ0JDID0gQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ0JDIGVuY3J5cHRvci5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBDQkMuRW5jcnlwdG9yID0gQ0JDLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBQcm9jZXNzZXMgdGhlIGRhdGEgYmxvY2sgYXQgb2Zmc2V0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyBUaGUgZGF0YSB3b3JkcyB0byBvcGVyYXRlIG9uLlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hlcmUgdGhlIGJsb2NrIHN0YXJ0cy5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIG1vZGUucHJvY2Vzc0Jsb2NrKGRhdGEud29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gWE9SIGFuZCBlbmNyeXB0XG5cdCAgICAgICAgICAgICAgICB4b3JCbG9jay5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSk7XG5cdCAgICAgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGlzIGJsb2NrIHRvIHVzZSB3aXRoIG5leHQgYmxvY2tcblx0ICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ0JDIGRlY3J5cHRvci5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBDQkMuRGVjcnlwdG9yID0gQ0JDLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBQcm9jZXNzZXMgdGhlIGRhdGEgYmxvY2sgYXQgb2Zmc2V0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyBUaGUgZGF0YSB3b3JkcyB0byBvcGVyYXRlIG9uLlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hlcmUgdGhlIGJsb2NrIHN0YXJ0cy5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIG1vZGUucHJvY2Vzc0Jsb2NrKGRhdGEud29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBEZWNyeXB0IGFuZCBYT1Jcblx0ICAgICAgICAgICAgICAgIGNpcGhlci5kZWNyeXB0QmxvY2sod29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB4b3JCbG9jay5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFRoaXMgYmxvY2sgYmVjb21lcyB0aGUgcHJldmlvdXMgYmxvY2tcblx0ICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgZnVuY3Rpb24geG9yQmxvY2sod29yZHMsIG9mZnNldCwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXG5cdCAgICAgICAgICAgIC8vIENob29zZSBtaXhpbmcgYmxvY2tcblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2sgPSBpdjtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYmxvY2sgPSB0aGlzLl9wcmV2QmxvY2s7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBYT1IgYmxvY2tzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGJsb2NrW2ldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIENCQztcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogUGFkZGluZyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX3BhZCA9IEMucGFkID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogUEtDUyAjNS83IHBhZGRpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBQa2NzNyA9IENfcGFkLlBrY3M3ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFBhZHMgZGF0YSB1c2luZyB0aGUgYWxnb3JpdGhtIGRlZmluZWQgaW4gUEtDUyAjNS83LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGRhdGEgVGhlIGRhdGEgdG8gcGFkLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG11bHRpcGxlIHRoYXQgdGhlIGRhdGEgc2hvdWxkIGJlIHBhZGRlZCB0by5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgQ3J5cHRvSlMucGFkLlBrY3M3LnBhZCh3b3JkQXJyYXksIDQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhZDogZnVuY3Rpb24gKGRhdGEsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHBhZGRpbmcgYnl0ZXNcblx0ICAgICAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBibG9ja1NpemVCeXRlcyAtIGRhdGEuc2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgcGFkZGluZyB3b3JkXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nV29yZCA9IChuUGFkZGluZ0J5dGVzIDw8IDI0KSB8IChuUGFkZGluZ0J5dGVzIDw8IDE2KSB8IChuUGFkZGluZ0J5dGVzIDw8IDgpIHwgblBhZGRpbmdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ1dvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgblBhZGRpbmdCeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICBwYWRkaW5nV29yZHMucHVzaChwYWRkaW5nV29yZCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmcgPSBXb3JkQXJyYXkuY3JlYXRlKHBhZGRpbmdXb3JkcywgblBhZGRpbmdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YS5jb25jYXQocGFkZGluZyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVucGFkcyBkYXRhIHRoYXQgaGFkIGJlZW4gcGFkZGVkIHVzaW5nIHRoZSBhbGdvcml0aG0gZGVmaW5lZCBpbiBQS0NTICM1LzcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gZGF0YSBUaGUgZGF0YSB0byB1bnBhZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgQ3J5cHRvSlMucGFkLlBrY3M3LnVucGFkKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIEdldCBudW1iZXIgb2YgcGFkZGluZyBieXRlcyBmcm9tIGxhc3QgYnl0ZVxuXHQgICAgICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGRhdGEud29yZHNbKGRhdGEuc2lnQnl0ZXMgLSAxKSA+Pj4gMl0gJiAweGZmO1xuXG5cdCAgICAgICAgICAgIC8vIFJlbW92ZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gblBhZGRpbmdCeXRlcztcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJhc2UgYmxvY2sgY2lwaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBjaXBoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDQgKDEyOCBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgQmxvY2tDaXBoZXIgPSBDX2xpYi5CbG9ja0NpcGhlciA9IENpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZSBUaGUgYmxvY2sgbW9kZSB0byB1c2UuIERlZmF1bHQ6IENCQ1xuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7UGFkZGluZ30gcGFkZGluZyBUaGUgcGFkZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IFBrY3M3XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBDaXBoZXIuY2ZnLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIG1vZGU6IENCQyxcblx0ICAgICAgICAgICAgcGFkZGluZzogUGtjczdcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGNpcGhlclxuXHQgICAgICAgICAgICBDaXBoZXIucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNmZyA9IHRoaXMuY2ZnO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSBjZmcuaXY7XG5cdCAgICAgICAgICAgIHZhciBtb2RlID0gY2ZnLm1vZGU7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXQgYmxvY2sgbW9kZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0VOQ19YRk9STV9NT0RFKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbW9kZUNyZWF0b3IgPSBtb2RlLmNyZWF0ZUVuY3J5cHRvcjtcblx0ICAgICAgICAgICAgfSBlbHNlIC8qIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fREVDX1hGT1JNX01PREUpICovIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtb2RlQ3JlYXRvciA9IG1vZGUuY3JlYXRlRGVjcnlwdG9yO1xuXHQgICAgICAgICAgICAgICAgLy8gS2VlcCBhdCBsZWFzdCBvbmUgYmxvY2sgaW4gdGhlIGJ1ZmZlciBmb3IgdW5wYWRkaW5nXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9taW5CdWZmZXJTaXplID0gMTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl9tb2RlICYmIHRoaXMuX21vZGUuX19jcmVhdG9yID09IG1vZGVDcmVhdG9yKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9tb2RlLmluaXQodGhpcywgaXYgJiYgaXYud29yZHMpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGVDcmVhdG9yLmNhbGwobW9kZSwgdGhpcywgaXYgJiYgaXYud29yZHMpO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZS5fX2NyZWF0b3IgPSBtb2RlQ3JlYXRvcjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX21vZGUucHJvY2Vzc0Jsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgcGFkZGluZyA9IHRoaXMuY2ZnLnBhZGRpbmc7XG5cblx0ICAgICAgICAgICAgLy8gRmluYWxpemVcblx0ICAgICAgICAgICAgaWYgKHRoaXMuX3hmb3JtTW9kZSA9PSB0aGlzLl9FTkNfWEZPUk1fTU9ERSkge1xuXHQgICAgICAgICAgICAgICAgLy8gUGFkIGRhdGFcblx0ICAgICAgICAgICAgICAgIHBhZGRpbmcucGFkKHRoaXMuX2RhdGEsIHRoaXMuYmxvY2tTaXplKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIHZhciBmaW5hbFByb2Nlc3NlZEJsb2NrcyA9IHRoaXMuX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgICAgfSBlbHNlIC8qIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fREVDX1hGT1JNX01PREUpICovIHtcblx0ICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFVucGFkIGRhdGFcblx0ICAgICAgICAgICAgICAgIHBhZGRpbmcudW5wYWQoZmluYWxQcm9jZXNzZWRCbG9ja3MpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSBjb2xsZWN0aW9uIG9mIGNpcGhlciBwYXJhbWV0ZXJzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBjaXBoZXJ0ZXh0IFRoZSByYXcgY2lwaGVydGV4dC5cblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBrZXkgVGhlIGtleSB0byB0aGlzIGNpcGhlcnRleHQuXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gaXYgVGhlIElWIHVzZWQgaW4gdGhlIGNpcGhlcmluZyBvcGVyYXRpb24uXG5cdCAgICAgKiBAcHJvcGVydHkge1dvcmRBcnJheX0gc2FsdCBUaGUgc2FsdCB1c2VkIHdpdGggYSBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7Q2lwaGVyfSBhbGdvcml0aG0gVGhlIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKiBAcHJvcGVydHkge01vZGV9IG1vZGUgVGhlIGJsb2NrIG1vZGUgdXNlZCBpbiB0aGUgY2lwaGVyaW5nIG9wZXJhdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7UGFkZGluZ30gcGFkZGluZyBUaGUgcGFkZGluZyBzY2hlbWUgdXNlZCBpbiB0aGUgY2lwaGVyaW5nIG9wZXJhdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIGJsb2NrIHNpemUgb2YgdGhlIGNpcGhlci5cblx0ICAgICAqIEBwcm9wZXJ0eSB7Rm9ybWF0fSBmb3JtYXR0ZXIgVGhlIGRlZmF1bHQgZm9ybWF0dGluZyBzdHJhdGVneSB0byBjb252ZXJ0IHRoaXMgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYSBzdHJpbmcuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDaXBoZXJQYXJhbXMgPSBDX2xpYi5DaXBoZXJQYXJhbXMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNpcGhlclBhcmFtcyBBbiBvYmplY3Qgd2l0aCBhbnkgb2YgdGhlIHBvc3NpYmxlIGNpcGhlciBwYXJhbWV0ZXJzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyUGFyYW1zID0gQ3J5cHRvSlMubGliLkNpcGhlclBhcmFtcy5jcmVhdGUoe1xuXHQgICAgICAgICAqICAgICAgICAgY2lwaGVydGV4dDogY2lwaGVydGV4dFdvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIGtleToga2V5V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAgaXY6IGl2V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAgc2FsdDogc2FsdFdvcmRBcnJheSxcblx0ICAgICAgICAgKiAgICAgICAgIGFsZ29yaXRobTogQ3J5cHRvSlMuYWxnby5BRVMsXG5cdCAgICAgICAgICogICAgICAgICBtb2RlOiBDcnlwdG9KUy5tb2RlLkNCQyxcblx0ICAgICAgICAgKiAgICAgICAgIHBhZGRpbmc6IENyeXB0b0pTLnBhZC5QS0NTNyxcblx0ICAgICAgICAgKiAgICAgICAgIGJsb2NrU2l6ZTogNCxcblx0ICAgICAgICAgKiAgICAgICAgIGZvcm1hdHRlcjogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0xcblx0ICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNpcGhlclBhcmFtcykge1xuXHQgICAgICAgICAgICB0aGlzLm1peEluKGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0Zvcm1hdH0gZm9ybWF0dGVyIChPcHRpb25hbCkgVGhlIGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gdXNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgY2lwaGVyIHBhcmFtcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEB0aHJvd3MgRXJyb3IgSWYgbmVpdGhlciB0aGUgZm9ybWF0dGVyIG5vciB0aGUgZGVmYXVsdCBmb3JtYXR0ZXIgaXMgc2V0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gY2lwaGVyUGFyYW1zICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSBjaXBoZXJQYXJhbXMudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IGNpcGhlclBhcmFtcy50b1N0cmluZyhDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChmb3JtYXR0ZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChmb3JtYXR0ZXIgfHwgdGhpcy5mb3JtYXR0ZXIpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBGb3JtYXQgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19mb3JtYXQgPSBDLmZvcm1hdCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIE9wZW5TU0wgZm9ybWF0dGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE9wZW5TU0xGb3JtYXR0ZXIgPSBDX2Zvcm1hdC5PcGVuU1NMID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QgdG8gYW4gT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfSBjaXBoZXJQYXJhbXMgVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG9wZW5TU0xTdHJpbmcgPSBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTC5zdHJpbmdpZnkoY2lwaGVyUGFyYW1zKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChjaXBoZXJQYXJhbXMpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gY2lwaGVyUGFyYW1zLmNpcGhlcnRleHQ7XG5cdCAgICAgICAgICAgIHZhciBzYWx0ID0gY2lwaGVyUGFyYW1zLnNhbHQ7XG5cblx0ICAgICAgICAgICAgLy8gRm9ybWF0XG5cdCAgICAgICAgICAgIGlmIChzYWx0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgd29yZEFycmF5ID0gV29yZEFycmF5LmNyZWF0ZShbMHg1MzYxNmM3NCwgMHg2NTY0NWY1Zl0pLmNvbmNhdChzYWx0KS5jb25jYXQoY2lwaGVydGV4dCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgd29yZEFycmF5ID0gY2lwaGVydGV4dDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB3b3JkQXJyYXkudG9TdHJpbmcoQmFzZTY0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYW4gT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZyB0byBhIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG9wZW5TU0xTdHIgVGhlIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IFRoZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlclBhcmFtcyA9IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMLnBhcnNlKG9wZW5TU0xTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAob3BlblNTTFN0cikge1xuXHQgICAgICAgICAgICAvLyBQYXJzZSBiYXNlNjRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBCYXNlNjQucGFyc2Uob3BlblNTTFN0cik7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHRXb3JkcyA9IGNpcGhlcnRleHQud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gVGVzdCBmb3Igc2FsdFxuXHQgICAgICAgICAgICBpZiAoY2lwaGVydGV4dFdvcmRzWzBdID09IDB4NTM2MTZjNzQgJiYgY2lwaGVydGV4dFdvcmRzWzFdID09IDB4NjU2NDVmNWYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIEV4dHJhY3Qgc2FsdFxuXHQgICAgICAgICAgICAgICAgdmFyIHNhbHQgPSBXb3JkQXJyYXkuY3JlYXRlKGNpcGhlcnRleHRXb3Jkcy5zbGljZSgyLCA0KSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzYWx0IGZyb20gY2lwaGVydGV4dFxuXHQgICAgICAgICAgICAgICAgY2lwaGVydGV4dFdvcmRzLnNwbGljZSgwLCA0KTtcblx0ICAgICAgICAgICAgICAgIGNpcGhlcnRleHQuc2lnQnl0ZXMgLT0gMTY7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7IGNpcGhlcnRleHQ6IGNpcGhlcnRleHQsIHNhbHQ6IHNhbHQgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIGNpcGhlciB3cmFwcGVyIHRoYXQgcmV0dXJucyBjaXBoZXJ0ZXh0IGFzIGEgc2VyaWFsaXphYmxlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICovXG5cdCAgICB2YXIgU2VyaWFsaXphYmxlQ2lwaGVyID0gQ19saWIuU2VyaWFsaXphYmxlQ2lwaGVyID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7Rm9ybWF0dGVyfSBmb3JtYXQgVGhlIGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gY29udmVydCBjaXBoZXIgcGFyYW0gb2JqZWN0cyB0byBhbmQgZnJvbSBhIHN0cmluZy4gRGVmYXVsdDogT3BlblNTTFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICBmb3JtYXQ6IE9wZW5TU0xGb3JtYXR0ZXJcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEVuY3J5cHRzIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciBhbGdvcml0aG0gdG8gdXNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBlbmNyeXB0LlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBBIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwga2V5KTtcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsIGtleSwgeyBpdjogaXYgfSk7XG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBtZXNzYWdlLCBrZXksIHsgaXY6IGl2LCBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGVuY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIG1lc3NhZ2UsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIHZhciBlbmNyeXB0b3IgPSBjaXBoZXIuY3JlYXRlRW5jcnlwdG9yKGtleSwgY2ZnKTtcblx0ICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBlbmNyeXB0b3IuZmluYWxpemUobWVzc2FnZSk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGNpcGhlckNmZyA9IGVuY3J5cHRvci5jZmc7XG5cblx0ICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gc2VyaWFsaXphYmxlIGNpcGhlciBwYXJhbXNcblx0ICAgICAgICAgICAgcmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoe1xuXHQgICAgICAgICAgICAgICAgY2lwaGVydGV4dDogY2lwaGVydGV4dCxcblx0ICAgICAgICAgICAgICAgIGtleToga2V5LFxuXHQgICAgICAgICAgICAgICAgaXY6IGNpcGhlckNmZy5pdixcblx0ICAgICAgICAgICAgICAgIGFsZ29yaXRobTogY2lwaGVyLFxuXHQgICAgICAgICAgICAgICAgbW9kZTogY2lwaGVyQ2ZnLm1vZGUsXG5cdCAgICAgICAgICAgICAgICBwYWRkaW5nOiBjaXBoZXJDZmcucGFkZGluZyxcblx0ICAgICAgICAgICAgICAgIGJsb2NrU2l6ZTogY2lwaGVyLmJsb2NrU2l6ZSxcblx0ICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogY2ZnLmZvcm1hdFxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVjcnlwdHMgc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJQYXJhbXN8c3RyaW5nfSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0IHRvIGRlY3J5cHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwbGFpbnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIGZvcm1hdHRlZENpcGhlcnRleHQsIGtleSwgeyBpdjogaXYsIGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIGNpcGhlcnRleHRQYXJhbXMsIGtleSwgeyBpdjogaXYsIGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZGVjcnlwdDogZnVuY3Rpb24gKGNpcGhlciwgY2lwaGVydGV4dCwga2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIGNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIENpcGhlclBhcmFtc1xuXHQgICAgICAgICAgICBjaXBoZXJ0ZXh0ID0gdGhpcy5fcGFyc2UoY2lwaGVydGV4dCwgY2ZnLmZvcm1hdCk7XG5cblx0ICAgICAgICAgICAgLy8gRGVjcnlwdFxuXHQgICAgICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY2lwaGVyLmNyZWF0ZURlY3J5cHRvcihrZXksIGNmZykuZmluYWxpemUoY2lwaGVydGV4dC5jaXBoZXJ0ZXh0KTtcblxuXHQgICAgICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBzZXJpYWxpemVkIGNpcGhlcnRleHQgdG8gQ2lwaGVyUGFyYW1zLFxuXHQgICAgICAgICAqIGVsc2UgYXNzdW1lZCBDaXBoZXJQYXJhbXMgYWxyZWFkeSBhbmQgcmV0dXJucyBjaXBoZXJ0ZXh0IHVuY2hhbmdlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfHN0cmluZ30gY2lwaGVydGV4dCBUaGUgY2lwaGVydGV4dC5cblx0ICAgICAgICAgKiBAcGFyYW0ge0Zvcm1hdHRlcn0gZm9ybWF0IFRoZSBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIHVzZSB0byBwYXJzZSBzZXJpYWxpemVkIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IFRoZSB1bnNlcmlhbGl6ZWQgY2lwaGVydGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLl9wYXJzZShjaXBoZXJ0ZXh0U3RyaW5nT3JQYXJhbXMsIGZvcm1hdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX3BhcnNlOiBmdW5jdGlvbiAoY2lwaGVydGV4dCwgZm9ybWF0KSB7XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY2lwaGVydGV4dCA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5wYXJzZShjaXBoZXJ0ZXh0LCB0aGlzKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogS2V5IGRlcml2YXRpb24gZnVuY3Rpb24gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19rZGYgPSBDLmtkZiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIE9wZW5TU0wga2V5IGRlcml2YXRpb24gZnVuY3Rpb24uXG5cdCAgICAgKi9cblx0ICAgIHZhciBPcGVuU1NMS2RmID0gQ19rZGYuT3BlblNTTCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBEZXJpdmVzIGEga2V5IGFuZCBJViBmcm9tIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkIHRvIGRlcml2ZSBmcm9tLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrZXlTaXplIFRoZSBzaXplIGluIHdvcmRzIG9mIHRoZSBrZXkgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGl2U2l6ZSBUaGUgc2l6ZSBpbiB3b3JkcyBvZiB0aGUgSVYgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBzYWx0IChPcHRpb25hbCkgQSA2NC1iaXQgc2FsdCB0byB1c2UuIElmIG9taXR0ZWQsIGEgc2FsdCB3aWxsIGJlIGdlbmVyYXRlZCByYW5kb21seS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlclBhcmFtc30gQSBjaXBoZXIgcGFyYW1zIG9iamVjdCB3aXRoIHRoZSBrZXksIElWLCBhbmQgc2FsdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBDcnlwdG9KUy5rZGYuT3BlblNTTC5leGVjdXRlKCdQYXNzd29yZCcsIDI1Ni8zMiwgMTI4LzMyKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBDcnlwdG9KUy5rZGYuT3BlblNTTC5leGVjdXRlKCdQYXNzd29yZCcsIDI1Ni8zMiwgMTI4LzMyLCAnc2FsdHNhbHQnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAocGFzc3dvcmQsIGtleVNpemUsIGl2U2l6ZSwgc2FsdCkge1xuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gc2FsdFxuXHQgICAgICAgICAgICBpZiAoIXNhbHQpIHtcblx0ICAgICAgICAgICAgICAgIHNhbHQgPSBXb3JkQXJyYXkucmFuZG9tKDY0LzgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gRGVyaXZlIGtleSBhbmQgSVZcblx0ICAgICAgICAgICAgdmFyIGtleSA9IEV2cEtERi5jcmVhdGUoeyBrZXlTaXplOiBrZXlTaXplICsgaXZTaXplIH0pLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXG5cdCAgICAgICAgICAgIC8vIFNlcGFyYXRlIGtleSBhbmQgSVZcblx0ICAgICAgICAgICAgdmFyIGl2ID0gV29yZEFycmF5LmNyZWF0ZShrZXkud29yZHMuc2xpY2Uoa2V5U2l6ZSksIGl2U2l6ZSAqIDQpO1xuXHQgICAgICAgICAgICBrZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcGFyYW1zXG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsga2V5OiBrZXksIGl2OiBpdiwgc2FsdDogc2FsdCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgc2VyaWFsaXphYmxlIGNpcGhlciB3cmFwcGVyIHRoYXQgZGVyaXZlcyB0aGUga2V5IGZyb20gYSBwYXNzd29yZCxcblx0ICAgICAqIGFuZCByZXR1cm5zIGNpcGhlcnRleHQgYXMgYSBzZXJpYWxpemFibGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgKi9cblx0ICAgIHZhciBQYXNzd29yZEJhc2VkQ2lwaGVyID0gQ19saWIuUGFzc3dvcmRCYXNlZENpcGhlciA9IFNlcmlhbGl6YWJsZUNpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7S0RGfSBrZGYgVGhlIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uIHRvIHVzZSB0byBnZW5lcmF0ZSBhIGtleSBhbmQgSVYgZnJvbSBhIHBhc3N3b3JkLiBEZWZhdWx0OiBPcGVuU1NMXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBTZXJpYWxpemFibGVDaXBoZXIuY2ZnLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtkZjogT3BlblNTTEtkZlxuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRW5jcnlwdHMgYSBtZXNzYWdlIHVzaW5nIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZW5jcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkLlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IEEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwgJ3Bhc3N3b3JkJyk7XG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwgJ3Bhc3N3b3JkJywgeyBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGVuY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIG1lc3NhZ2UsIHBhc3N3b3JkLCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIGNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIG90aGVyIHBhcmFtc1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZFBhcmFtcyA9IGNmZy5rZGYuZXhlY3V0ZShwYXNzd29yZCwgY2lwaGVyLmtleVNpemUsIGNpcGhlci5pdlNpemUpO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBJViB0byBjb25maWdcblx0ICAgICAgICAgICAgY2ZnLml2ID0gZGVyaXZlZFBhcmFtcy5pdjtcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQuY2FsbCh0aGlzLCBjaXBoZXIsIG1lc3NhZ2UsIGRlcml2ZWRQYXJhbXMua2V5LCBjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIE1peCBpbiBkZXJpdmVkIHBhcmFtc1xuXHQgICAgICAgICAgICBjaXBoZXJ0ZXh0Lm1peEluKGRlcml2ZWRQYXJhbXMpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBEZWNyeXB0cyBzZXJpYWxpemVkIGNpcGhlcnRleHQgdXNpbmcgYSBwYXNzd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciBhbGdvcml0aG0gdG8gdXNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfHN0cmluZ30gY2lwaGVydGV4dCBUaGUgY2lwaGVydGV4dCB0byBkZWNyeXB0LlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHBsYWludGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHBsYWludGV4dCA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmRlY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIGZvcm1hdHRlZENpcGhlcnRleHQsICdwYXNzd29yZCcsIHsgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKiAgICAgdmFyIHBsYWludGV4dCA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmRlY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIGNpcGhlcnRleHRQYXJhbXMsICdwYXNzd29yZCcsIHsgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBkZWNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBjaXBoZXJ0ZXh0LCBwYXNzd29yZCwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBDaXBoZXJQYXJhbXNcblx0ICAgICAgICAgICAgY2lwaGVydGV4dCA9IHRoaXMuX3BhcnNlKGNpcGhlcnRleHQsIGNmZy5mb3JtYXQpO1xuXG5cdCAgICAgICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIG90aGVyIHBhcmFtc1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZFBhcmFtcyA9IGNmZy5rZGYuZXhlY3V0ZShwYXNzd29yZCwgY2lwaGVyLmtleVNpemUsIGNpcGhlci5pdlNpemUsIGNpcGhlcnRleHQuc2FsdCk7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIElWIHRvIGNvbmZpZ1xuXHQgICAgICAgICAgICBjZmcuaXYgPSBkZXJpdmVkUGFyYW1zLml2O1xuXG5cdCAgICAgICAgICAgIC8vIERlY3J5cHRcblx0ICAgICAgICAgICAgdmFyIHBsYWludGV4dCA9IFNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0LmNhbGwodGhpcywgY2lwaGVyLCBjaXBoZXJ0ZXh0LCBkZXJpdmVkUGFyYW1zLmtleSwgY2ZnKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIENpcGhlciBGZWVkYmFjayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DRkIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENGQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIENGQi5FbmNyeXB0b3IgPSBDRkIuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbUFuZEVuY3J5cHQuY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUsIGNpcGhlcik7XG5cblx0ICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ0ZCLkRlY3J5cHRvciA9IENGQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtQW5kRW5jcnlwdC5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGJlY29tZXMgdGhlIHByZXZpb3VzIGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzdHJlYW1BbmRFbmNyeXB0KHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgaXYgPSB0aGlzLl9pdjtcblxuXHQgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gdGhpcy5fcHJldkJsb2NrO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gQ0ZCO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIEVsZWN0cm9uaWMgQ29kZWJvb2sgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuRUNCID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBFQ0IgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICBFQ0IuRW5jcnlwdG9yID0gRUNCLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBFQ0IuRGVjcnlwdG9yID0gRUNCLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9jaXBoZXIuZGVjcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICByZXR1cm4gRUNCO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIEFOU0kgWC45MjMgcGFkZGluZyBzdHJhdGVneS5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5BbnNpWDkyMyA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKGRhdGEsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBibG9ja1NpemVCeXRlcyAtIGRhdGFTaWdCeXRlcyAlIGJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgLy8gQ29tcHV0ZSBsYXN0IGJ5dGUgcG9zaXRpb25cblx0ICAgICAgICB2YXIgbGFzdEJ5dGVQb3MgPSBkYXRhU2lnQnl0ZXMgKyBuUGFkZGluZ0J5dGVzIC0gMTtcblxuXHQgICAgICAgIC8vIFBhZFxuXHQgICAgICAgIGRhdGEuY2xhbXAoKTtcblx0ICAgICAgICBkYXRhLndvcmRzW2xhc3RCeXRlUG9zID4+PiAyXSB8PSBuUGFkZGluZ0J5dGVzIDw8ICgyNCAtIChsYXN0Qnl0ZVBvcyAlIDQpICogOCk7XG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyArPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgIC8vIFJlbW92ZSBwYWRkaW5nXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIElTTyAxMDEyNiBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLklzbzEwMTI2ID0ge1xuXHQgICAgcGFkOiBmdW5jdGlvbiAoZGF0YSwgYmxvY2tTaXplKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgLy8gQ291bnQgcGFkZGluZyBieXRlc1xuXHQgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAvLyBQYWRcblx0ICAgICAgICBkYXRhLmNvbmNhdChDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbShuUGFkZGluZ0J5dGVzIC0gMSkpLlxuXHQgICAgICAgICAgICAgY29uY2F0KENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFtuUGFkZGluZ0J5dGVzIDw8IDI0XSwgMSkpO1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgIC8vIFJlbW92ZSBwYWRkaW5nXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuUGFkZGluZ0J5dGVzO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIElTTy9JRUMgOTc5Ny0xIFBhZGRpbmcgTWV0aG9kIDIuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuSXNvOTc5NzEgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBBZGQgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5jb25jYXQoQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4ODAwMDAwMDBdLCAxKSk7XG5cblx0ICAgICAgICAvLyBaZXJvIHBhZCB0aGUgcmVzdFxuXHQgICAgICAgIENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZy5wYWQoZGF0YSwgYmxvY2tTaXplKTtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgIC8vIFJlbW92ZSB6ZXJvIHBhZGRpbmdcblx0ICAgICAgICBDcnlwdG9KUy5wYWQuWmVyb1BhZGRpbmcudW5wYWQoZGF0YSk7XG5cblx0ICAgICAgICAvLyBSZW1vdmUgb25lIG1vcmUgYnl0ZSAtLSB0aGUgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcy0tO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE91dHB1dCBGZWVkYmFjayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5PRkIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIE9GQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIHZhciBFbmNyeXB0b3IgPSBPRkIuRW5jcnlwdG9yID0gT0ZCLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlclxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cdCAgICAgICAgICAgIHZhciBrZXlzdHJlYW0gPSB0aGlzLl9rZXlzdHJlYW07XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5c3RyZWFtXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAga2V5c3RyZWFtID0gdGhpcy5fa2V5c3RyZWFtID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBJViBmb3Igc3Vic2VxdWVudCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIHRoaXMuX2l2ID0gdW5kZWZpbmVkO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBPRkIuRGVjcnlwdG9yID0gRW5jcnlwdG9yO1xuXG5cdCAgICByZXR1cm4gT0ZCO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIEEgbm9vcCBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgKi9cblx0Q3J5cHRvSlMucGFkLk5vUGFkZGluZyA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKCkge1xuXHQgICAgfSxcblxuXHQgICAgdW5wYWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIH1cblx0fTtcblxuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBDaXBoZXJQYXJhbXMgPSBDX2xpYi5DaXBoZXJQYXJhbXM7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXg7XG5cdCAgICB2YXIgQ19mb3JtYXQgPSBDLmZvcm1hdDtcblxuXHQgICAgdmFyIEhleEZvcm1hdHRlciA9IENfZm9ybWF0LkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGUgY2lwaGVydGV4dCBvZiBhIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGEgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfSBjaXBoZXJQYXJhbXMgVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmZvcm1hdC5IZXguc3RyaW5naWZ5KGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dC50b1N0cmluZyhIZXgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleGFkZWNpbWFsbHkgZW5jb2RlZCBjaXBoZXJ0ZXh0IHN0cmluZyB0byBhIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IFRoZSBoZXhhZGVjaW1hbGx5IGVuY29kZWQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJQYXJhbXMgPSBDcnlwdG9KUy5mb3JtYXQuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IEhleC5wYXJzZShpbnB1dCk7XG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsgY2lwaGVydGV4dDogY2lwaGVydGV4dCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHR9KCkpO1xuXG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBMb29rdXAgdGFibGVzXG5cdCAgICB2YXIgU0JPWCA9IFtdO1xuXHQgICAgdmFyIElOVl9TQk9YID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8wID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8xID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8yID0gW107XG5cdCAgICB2YXIgU1VCX01JWF8zID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMCA9IFtdO1xuXHQgICAgdmFyIElOVl9TVUJfTUlYXzEgPSBbXTtcblx0ICAgIHZhciBJTlZfU1VCX01JWF8yID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGxvb2t1cCB0YWJsZXNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgLy8gQ29tcHV0ZSBkb3VibGUgdGFibGVcblx0ICAgICAgICB2YXIgZCA9IFtdO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKGkgPCAxMjgpIHtcblx0ICAgICAgICAgICAgICAgIGRbaV0gPSBpIDw8IDE7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBkW2ldID0gKGkgPDwgMSkgXiAweDExYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIFdhbGsgR0YoMl44KVxuXHQgICAgICAgIHZhciB4ID0gMDtcblx0ICAgICAgICB2YXIgeGkgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBzYm94XG5cdCAgICAgICAgICAgIHZhciBzeCA9IHhpIF4gKHhpIDw8IDEpIF4gKHhpIDw8IDIpIF4gKHhpIDw8IDMpIF4gKHhpIDw8IDQpO1xuXHQgICAgICAgICAgICBzeCA9IChzeCA+Pj4gOCkgXiAoc3ggJiAweGZmKSBeIDB4NjM7XG5cdCAgICAgICAgICAgIFNCT1hbeF0gPSBzeDtcblx0ICAgICAgICAgICAgSU5WX1NCT1hbc3hdID0geDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIG11bHRpcGxpY2F0aW9uXG5cdCAgICAgICAgICAgIHZhciB4MiA9IGRbeF07XG5cdCAgICAgICAgICAgIHZhciB4NCA9IGRbeDJdO1xuXHQgICAgICAgICAgICB2YXIgeDggPSBkW3g0XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIHN1YiBieXRlcywgbWl4IGNvbHVtbnMgdGFibGVzXG5cdCAgICAgICAgICAgIHZhciB0ID0gKGRbc3hdICogMHgxMDEpIF4gKHN4ICogMHgxMDEwMTAwKTtcblx0ICAgICAgICAgICAgU1VCX01JWF8wW3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzFbeF0gPSAodCA8PCAxNikgfCAodCA+Pj4gMTYpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzJbeF0gPSAodCA8PCA4KSAgfCAodCA+Pj4gMjQpO1xuXHQgICAgICAgICAgICBTVUJfTUlYXzNbeF0gPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgaW52IHN1YiBieXRlcywgaW52IG1peCBjb2x1bW5zIHRhYmxlc1xuXHQgICAgICAgICAgICB2YXIgdCA9ICh4OCAqIDB4MTAxMDEwMSkgXiAoeDQgKiAweDEwMDAxKSBeICh4MiAqIDB4MTAxKSBeICh4ICogMHgxMDEwMTAwKTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfMFtzeF0gPSAodCA8PCAyNCkgfCAodCA+Pj4gOCk7XG5cdCAgICAgICAgICAgIElOVl9TVUJfTUlYXzFbc3hdID0gKHQgPDwgMTYpIHwgKHQgPj4+IDE2KTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfMltzeF0gPSAodCA8PCA4KSAgfCAodCA+Pj4gMjQpO1xuXHQgICAgICAgICAgICBJTlZfU1VCX01JWF8zW3N4XSA9IHQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBuZXh0IGNvdW50ZXJcblx0ICAgICAgICAgICAgaWYgKCF4KSB7XG5cdCAgICAgICAgICAgICAgICB4ID0geGkgPSAxO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgeCA9IHgyIF4gZFtkW2RbeDggXiB4Ml1dXTtcblx0ICAgICAgICAgICAgICAgIHhpIF49IGRbZFt4aV1dO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUHJlY29tcHV0ZWQgUmNvbiBsb29rdXBcblx0ICAgIHZhciBSQ09OID0gWzB4MDAsIDB4MDEsIDB4MDIsIDB4MDQsIDB4MDgsIDB4MTAsIDB4MjAsIDB4NDAsIDB4ODAsIDB4MWIsIDB4MzZdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFFUyBibG9jayBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgQUVTID0gQ19hbGdvLkFFUyA9IEJsb2NrQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2tpcCByZXNldCBvZiBuUm91bmRzIGhhcyBiZWVuIHNldCBiZWZvcmUgYW5kIGtleSBkaWQgbm90IGNoYW5nZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5fblJvdW5kcyAmJiB0aGlzLl9rZXlQcmlvclJlc2V0ID09PSB0aGlzLl9rZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5UHJpb3JSZXNldCA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIga2V5U2l6ZSA9IGtleS5zaWdCeXRlcyAvIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBudW1iZXIgb2Ygcm91bmRzXG5cdCAgICAgICAgICAgIHZhciBuUm91bmRzID0gdGhpcy5fblJvdW5kcyA9IGtleVNpemUgKyA2O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgbnVtYmVyIG9mIGtleSBzY2hlZHVsZSByb3dzXG5cdCAgICAgICAgICAgIHZhciBrc1Jvd3MgPSAoblJvdW5kcyArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGtleSBzY2hlZHVsZVxuXHQgICAgICAgICAgICB2YXIga2V5U2NoZWR1bGUgPSB0aGlzLl9rZXlTY2hlZHVsZSA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBrc1JvdyA9IDA7IGtzUm93IDwga3NSb3dzOyBrc1JvdysrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoa3NSb3cgPCBrZXlTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5V29yZHNba3NSb3ddO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2tzUm93IC0gMV07XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIShrc1JvdyAlIGtleVNpemUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJvdCB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAodCA8PCA4KSB8ICh0ID4+PiAyNCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3ViIHdvcmRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdCA9IChTQk9YW3QgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsodCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHQgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3QgJiAweGZmXTtcblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXggUmNvblxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0IF49IFJDT05bKGtzUm93IC8ga2V5U2l6ZSkgfCAwXSA8PCAyNDtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleVNpemUgPiA2ICYmIGtzUm93ICUga2V5U2l6ZSA9PSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1YiB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAoU0JPWFt0ID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyh0ID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFt0ICYgMHhmZl07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5U2NoZWR1bGVba3NSb3cgLSBrZXlTaXplXSBeIHQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludiBrZXkgc2NoZWR1bGVcblx0ICAgICAgICAgICAgdmFyIGludktleVNjaGVkdWxlID0gdGhpcy5faW52S2V5U2NoZWR1bGUgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaW52S3NSb3cgPSAwOyBpbnZLc1JvdyA8IGtzUm93czsgaW52S3NSb3crKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGtzUm93ID0ga3NSb3dzIC0gaW52S3NSb3c7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChpbnZLc1JvdyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2tzUm93XTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBrZXlTY2hlZHVsZVtrc1JvdyAtIDRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBpZiAoaW52S3NSb3cgPCA0IHx8IGtzUm93IDw9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSB0O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSBJTlZfU1VCX01JWF8wW1NCT1hbdCA+Pj4gMjRdXSBeIElOVl9TVUJfTUlYXzFbU0JPWFsodCA+Pj4gMTYpICYgMHhmZl1dIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlZfU1VCX01JWF8yW1NCT1hbKHQgPj4+IDgpICYgMHhmZl1dIF4gSU5WX1NVQl9NSVhfM1tTQk9YW3QgJiAweGZmXV07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZW5jcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2tleVNjaGVkdWxlLCBTVUJfTUlYXzAsIFNVQl9NSVhfMSwgU1VCX01JWF8yLCBTVUJfTUlYXzMsIFNCT1gpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBkZWNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCAybmQgYW5kIDR0aCByb3dzXG5cdCAgICAgICAgICAgIHZhciB0ID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAxXSA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgM10gPSB0O1xuXG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludktleVNjaGVkdWxlLCBJTlZfU1VCX01JWF8wLCBJTlZfU1VCX01JWF8xLCBJTlZfU1VCX01JWF8yLCBJTlZfU1VCX01JWF8zLCBJTlZfU0JPWCk7XG5cblx0ICAgICAgICAgICAgLy8gSW52IHN3YXAgMm5kIGFuZCA0dGggcm93c1xuXHQgICAgICAgICAgICB2YXIgdCA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDNdID0gdDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvQ3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCwga2V5U2NoZWR1bGUsIFNVQl9NSVhfMCwgU1VCX01JWF8xLCBTVUJfTUlYXzIsIFNVQl9NSVhfMywgU0JPWCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgblJvdW5kcyA9IHRoaXMuX25Sb3VuZHM7XG5cblx0ICAgICAgICAgICAgLy8gR2V0IGlucHV0LCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciBzMCA9IE1bb2Zmc2V0XSAgICAgXiBrZXlTY2hlZHVsZVswXTtcblx0ICAgICAgICAgICAgdmFyIHMxID0gTVtvZmZzZXQgKyAxXSBeIGtleVNjaGVkdWxlWzFdO1xuXHQgICAgICAgICAgICB2YXIgczIgPSBNW29mZnNldCArIDJdIF4ga2V5U2NoZWR1bGVbMl07XG5cdCAgICAgICAgICAgIHZhciBzMyA9IE1bb2Zmc2V0ICsgM10gXiBrZXlTY2hlZHVsZVszXTtcblxuXHQgICAgICAgICAgICAvLyBLZXkgc2NoZWR1bGUgcm93IGNvdW50ZXJcblx0ICAgICAgICAgICAgdmFyIGtzUm93ID0gNDtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgcm91bmQgPSAxOyByb3VuZCA8IG5Sb3VuZHM7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgbWl4IGNvbHVtbnMsIGFkZCByb3VuZCBrZXlcblx0ICAgICAgICAgICAgICAgIHZhciB0MCA9IFNVQl9NSVhfMFtzMCA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMSA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMyID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MzICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IFNVQl9NSVhfMFtzMSA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMiA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMzID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MwICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IFNVQl9NSVhfMFtzMiA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMyA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMwID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MxICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MyA9IFNVQl9NSVhfMFtzMyA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMCA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMxID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MyICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXRlXG5cdCAgICAgICAgICAgICAgICBzMCA9IHQwO1xuXHQgICAgICAgICAgICAgICAgczEgPSB0MTtcblx0ICAgICAgICAgICAgICAgIHMyID0gdDI7XG5cdCAgICAgICAgICAgICAgICBzMyA9IHQzO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hpZnQgcm93cywgc3ViIGJ5dGVzLCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciB0MCA9ICgoU0JPWFtzMCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMSA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMyID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMyAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXHQgICAgICAgICAgICB2YXIgdDEgPSAoKFNCT1hbczEgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczIgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMyA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczAgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgdmFyIHQyID0gKChTQk9YW3MyID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHMzID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsoczAgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3MxICYgMHhmZl0pIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgIHZhciB0MyA9ICgoU0JPWFtzMyA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMxID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMiAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBvdXRwdXRcblx0ICAgICAgICAgICAgTVtvZmZzZXRdICAgICA9IHQwO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gdDE7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMl0gPSB0Mjtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAzXSA9IHQzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAyNTYvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5BRVMgPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKEFFUyk7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBQZXJtdXRlZCBDaG9pY2UgMSBjb25zdGFudHNcblx0ICAgIHZhciBQQzEgPSBbXG5cdCAgICAgICAgNTcsIDQ5LCA0MSwgMzMsIDI1LCAxNywgOSwgIDEsXG5cdCAgICAgICAgNTgsIDUwLCA0MiwgMzQsIDI2LCAxOCwgMTAsIDIsXG5cdCAgICAgICAgNTksIDUxLCA0MywgMzUsIDI3LCAxOSwgMTEsIDMsXG5cdCAgICAgICAgNjAsIDUyLCA0NCwgMzYsIDYzLCA1NSwgNDcsIDM5LFxuXHQgICAgICAgIDMxLCAyMywgMTUsIDcsICA2MiwgNTQsIDQ2LCAzOCxcblx0ICAgICAgICAzMCwgMjIsIDE0LCA2LCAgNjEsIDUzLCA0NSwgMzcsXG5cdCAgICAgICAgMjksIDIxLCAxMywgNSwgIDI4LCAyMCwgMTIsIDRcblx0ICAgIF07XG5cblx0ICAgIC8vIFBlcm11dGVkIENob2ljZSAyIGNvbnN0YW50c1xuXHQgICAgdmFyIFBDMiA9IFtcblx0ICAgICAgICAxNCwgMTcsIDExLCAyNCwgMSwgIDUsXG5cdCAgICAgICAgMywgIDI4LCAxNSwgNiwgIDIxLCAxMCxcblx0ICAgICAgICAyMywgMTksIDEyLCA0LCAgMjYsIDgsXG5cdCAgICAgICAgMTYsIDcsICAyNywgMjAsIDEzLCAyLFxuXHQgICAgICAgIDQxLCA1MiwgMzEsIDM3LCA0NywgNTUsXG5cdCAgICAgICAgMzAsIDQwLCA1MSwgNDUsIDMzLCA0OCxcblx0ICAgICAgICA0NCwgNDksIDM5LCA1NiwgMzQsIDUzLFxuXHQgICAgICAgIDQ2LCA0MiwgNTAsIDM2LCAyOSwgMzJcblx0ICAgIF07XG5cblx0ICAgIC8vIEN1bXVsYXRpdmUgYml0IHNoaWZ0IGNvbnN0YW50c1xuXHQgICAgdmFyIEJJVF9TSElGVFMgPSBbMSwgIDIsICA0LCAgNiwgIDgsICAxMCwgMTIsIDE0LCAxNSwgMTcsIDE5LCAyMSwgMjMsIDI1LCAyNywgMjhdO1xuXG5cdCAgICAvLyBTQk9YZXMgYW5kIHJvdW5kIHBlcm11dGF0aW9uIGNvbnN0YW50c1xuXHQgICAgdmFyIFNCT1hfUCA9IFtcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDAwMDA6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4MzAwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMDogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDA6IDB4ODA4MjAyLFxuXHQgICAgICAgICAgICAweDYwMDAwMDAwOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHg3MDAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDA6IDB4MjAyLFxuXHQgICAgICAgICAgICAweDkwMDAwMDAwOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhhMDAwMDAwMDogMHg4MjAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAwOiAweDgwODAwMCxcblx0ICAgICAgICAgICAgMHhjMDAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAwOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDAwOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHgyODAwMDAwMDogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDM4MDAwMDAwOiAweDgwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDA6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDAwOiAweDIwMCxcblx0ICAgICAgICAgICAgMHg2ODAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg4ODAwMDAwMDogMHg4MDAyMDAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDA6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDAwMDogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwMDA6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGM4MDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhkODAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGU4MDAwMDAwOiAweDIwMixcblx0ICAgICAgICAgICAgMHhmODAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTogMHg4MDAwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDAxOiAweDIsXG5cdCAgICAgICAgICAgIDB4MjAwMDAwMDE6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMTogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHg2MDAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAxOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHg5MDAwMDAwMTogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDE6IDB4ODAwMDAyLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAxOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4YzAwMDAwMDE6IDB4MjAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAxOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMTogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTogMHg4MDgyMDIsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDE6IDB4ODA4MDAwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHgzODAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDE6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDAwMTogMHg4MDAwMDIsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDE6IDB4Mixcblx0ICAgICAgICAgICAgMHg3ODAwMDAwMTogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDg4MDAwMDAxOiAweDgwMDIsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGE4MDAwMDAxOiAweDIwMixcblx0ICAgICAgICAgICAgMHhiODAwMDAwMTogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4YzgwMDAwMDE6IDB4ODAwMjAwLFxuXHQgICAgICAgICAgICAweGQ4MDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhmODAwMDAwMTogMHg4MDgwMDJcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwOiAweDgwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDA6IDB4NDAwODAwMTAsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHg1MDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwMDA6IDB4NDAwMDQwMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDogMHgxMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwOiAweDg0MDAwLFxuXHQgICAgICAgICAgICAweDkwMDAwMDA6IDB4NDAwMDQwMTAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhiMDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweGMwMDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHhmMDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDA6IDB4MTAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwMDogMHg0MDAwNDAxMCxcblx0ICAgICAgICAgICAgMHg0ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDA6IDB4NDAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHg3ODAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDg4MDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGE4MDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHhiODAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweGM4MDAwMDA6IDB4NDAwMDAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDgwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHhlODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweGY4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDExMDAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDEyMDAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE0MDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDE3MDAwMDAwOiAweDQwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxOTAwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDAwMDogMHg4MDAxMCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHgxYzAwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwMDAwMDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMTgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMjgwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDAwMDogMHg0MDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDAwOiAweDQwMDA0MDAwLFxuXHQgICAgICAgICAgICAweDE1ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE3ODAwMDAwOiAweDQwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDAwOiAweDQwMDAwMDEwLFxuXHQgICAgICAgICAgICAweDFhODAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDFiODAwMDAwOiAweDgwMDEwLFxuXHQgICAgICAgICAgICAweDFjODAwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwMDogMHg0MDA4MDAxMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDAwMDogMHg4NDAwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDIwMDAwMDogMHg0MDAwMTAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHg0MDAwMDA6IDB4MTAwMDQsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NjAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4OTAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDogMHg0MDEwMDA0LFxuXHQgICAgICAgICAgICAweGMwMDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweGQwMDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHhmMDAwMDA6IDB4MTAwLFxuXHQgICAgICAgICAgICAweDgwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MjgwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwOiAweDQwMDAxMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NTgwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDY4MDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHg3ODAwMDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDg4MDAwMDogMHg0LFxuXHQgICAgICAgICAgICAweDk4MDAwMDogMHgxMDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweGM4MDAwMDogMHgxMDEwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDA6IDB4NDAwMDEwNCxcblx0ICAgICAgICAgICAgMHhlODAwMDA6IDB4NDAxMDEwNCxcblx0ICAgICAgICAgICAgMHhmODAwMDA6IDB4NDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMjAwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNDAwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNTAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MTYwMDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDE3MDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDQwMDAxMDQsXG5cdCAgICAgICAgICAgIDB4MTkwMDAwMDogMHg0MDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweDFjMDAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwOiAweDEwNCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweDFmMDAwMDA6IDB4NDAxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTE4MDAwMDogMHgxMDQsXG5cdCAgICAgICAgICAgIDB4MTI4MDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweDEzODAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDAwOiAweDEwMDA0LFxuXHQgICAgICAgICAgICAweDE1ODAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNjgwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNzgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MWE4MDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHgxYjgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweDFkODAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwOiAweDQsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwMDogMHgxMDEwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODA0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MjAwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweDMwMDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDQwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDcwMDAwOiAweDQwMDA0MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg5MDAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4YjAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4YzAwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhlMDAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweGYwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDgwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDU4MDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDY4MDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODgwMDA6IDB4MTAwMCxcblx0ICAgICAgICAgICAgMHg5ODAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhjODAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweGY4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxMjAwMDA6IDB4ODAwMDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTQwMDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTUwMDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxNzAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDE5MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDAwOiAweDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxYzAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4MWQwMDAwOiAweDQwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDAwOiAweDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTA4MDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDExODAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxMjgwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxMzgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTU4MDAwOiAweDgwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDogMHg4MDAwMTA0MCxcblx0ICAgICAgICAgICAgMHgxNzgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweDFhODAwMDogMHg4MDAwMTAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwOiAweDgwNDAxMDAwLFxuXHQgICAgICAgICAgICAweDFlODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwOiAweDQwMTA0MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDIwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MzAwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDUwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHg2MDAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDcwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4ODAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDkwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDogMHgyMDAwMDA4MCxcblx0ICAgICAgICAgICAgMHhiMDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGMwMDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHhmMDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE4MDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MjgwMDogMHg4MCxcblx0ICAgICAgICAgICAgMHgzODAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDY4MDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4ODAwOiAweDIwMDQwMDAwLFxuXHQgICAgICAgICAgICAweDk4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhhODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGI4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHhjODAwOiAweDIwMDAwMDgwLFxuXHQgICAgICAgICAgICAweGQ4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweGY4MDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTIwMDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MTQwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxNTAwMDogMHgyMTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxNjAwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNzAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4MDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5MDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MWQwMDA6IDB4MjAwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MWUwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxZjAwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDEwODAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDExODAwOiAweDEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDA6IDB4MTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNTgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE2ODAwOiAweDgwLFxuXHQgICAgICAgICAgICAweDE3ODAwOiAweDIxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5ODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDFhODAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWI4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxZDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDogMHgyMDA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDogMHgyMDAwMDA4MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTAwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4MjAwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDogMHgxMDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg0MDA6IDB4MTAwMDIwMDAsXG5cdCAgICAgICAgICAgIDB4NTAwOiAweDIwMDAwMCxcblx0ICAgICAgICAgICAgMHg2MDA6IDB4MjAwMDA4LFxuXHQgICAgICAgICAgICAweDcwMDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHg5MDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4YTAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhiMDA6IDB4OCxcblx0ICAgICAgICAgICAgMHhjMDA6IDB4MTAyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4ZDAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHhlMDA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHhmMDA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDI4MDogMHg4LFxuXHQgICAgICAgICAgICAweDM4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg1ODA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4NjgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDc4MDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDg4MDogMHgyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4OTgwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4YTgwOiAweDEwMDAyMDA4LFxuXHQgICAgICAgICAgICAweGI4MDogMHgxMDIwMDAwOCxcblx0ICAgICAgICAgICAgMHhjODA6IDB4MCxcblx0ICAgICAgICAgICAgMHhkODA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhmODA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDAwMjAwMCxcblx0ICAgICAgICAgICAgMHgxMTAwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDEyMDA6IDB4MTAyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MTMwMDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDE0MDA6IDB4MjAwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTYwMDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNzAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxODAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxOTAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWEwMDogMHg4LFxuXHQgICAgICAgICAgICAweDFiMDA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDogMHgyMDAwLFxuXHQgICAgICAgICAgICAweDFkMDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MWUwMDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxMDgwOiAweDgsXG5cdCAgICAgICAgICAgIDB4MTE4MDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNDgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDE1ODA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHgxNjgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDE3ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDFhODA6IDB4MjAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxYzgwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxZDgwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWU4MDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwOiAweDEwMDAyMDA4XG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTA6IDB4MjAwMDQwMSxcblx0ICAgICAgICAgICAgMHgyMDogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MzA6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDQwOiAweDIxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4NTA6IDB4MCxcblx0ICAgICAgICAgICAgMHg2MDogMHgxLFxuXHQgICAgICAgICAgICAweDcwOiAweDIxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHg5MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4YTA6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHhiMDogMHgyMTAwNDAwLFxuXHQgICAgICAgICAgICAweGMwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweGUwOiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHhmMDogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDg6IDB4MjEwMDAwMSxcblx0ICAgICAgICAgICAgMHgxODogMHgwLFxuXHQgICAgICAgICAgICAweDI4OiAweDIwMDA0MDEsXG5cdCAgICAgICAgICAgIDB4Mzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHg0ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NTg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHg2ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDc4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHg4ODogMHgxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4OTg6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHhhODogMHgyMTAwMDAwLFxuXHQgICAgICAgICAgICAweGI4OiAweDEwMDAwMSxcblx0ICAgICAgICAgICAgMHhjODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4ZDg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHhlODogMHgxLFxuXHQgICAgICAgICAgICAweGY4OiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxMDA6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMTA6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDEyMDogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEzMDogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDE0MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MTUwOiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTYwOiAweDIxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTcwOiAweDEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxODA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweDE5MDogMHgyMTAwNDAxLFxuXHQgICAgICAgICAgICAweDFhMDogMHgxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWIwOiAweDEsXG5cdCAgICAgICAgICAgIDB4MWMwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWUwOiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MWYwOiAweDQwMCxcblx0ICAgICAgICAgICAgMHgxMDg6IDB4MTAwNDAwLFxuXHQgICAgICAgICAgICAweDExODogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEyODogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDEzODogMHgxLFxuXHQgICAgICAgICAgICAweDE0ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE1ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTY4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHgxNzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxODg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHgxOTg6IDB4MjEwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTg6IDB4MCxcblx0ICAgICAgICAgICAgMHgxYjg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxYzg6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDFkODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MWU4OiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWY4OiAweDEwMDAwMVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAwMDgyMCxcblx0ICAgICAgICAgICAgMHgxOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDI6IDB4ODAwMDAwMCxcblx0ICAgICAgICAgICAgMHgzOiAweDIwLFxuXHQgICAgICAgICAgICAweDQ6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4NTogMHg4MDIwODIwLFxuXHQgICAgICAgICAgICAweDY6IDB4ODAyMDgwMCxcblx0ICAgICAgICAgICAgMHg3OiAweDgwMCxcblx0ICAgICAgICAgICAgMHg4OiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4OTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweGE6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4YjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweGM6IDB4ODIwLFxuXHQgICAgICAgICAgICAweGQ6IDB4MCxcblx0ICAgICAgICAgICAgMHhlOiAweDgwMDAwMjAsXG5cdCAgICAgICAgICAgIDB4ZjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMDogMHg4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDE6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAzOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDQ6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNTogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNzogMHgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwODogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDA5OiAweDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYTogMHgyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYjogMHg4MDIwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBjOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGQ6IDB4ODAyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwZTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBmOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDEwOiAweDIwODIwLFxuXHQgICAgICAgICAgICAweDExOiAweDgwMjA4MDAsXG5cdCAgICAgICAgICAgIDB4MTI6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4MTM6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDE0OiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4MTU6IDB4ODAwMDAyMCxcblx0ICAgICAgICAgICAgMHgxNjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweDE3OiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDE4OiAweDAsXG5cdCAgICAgICAgICAgIDB4MTk6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4MWE6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHgxYjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDFjOiAweDgwMjA4MjAsXG5cdCAgICAgICAgICAgIDB4MWQ6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4MWU6IDB4ODIwLFxuXHQgICAgICAgICAgICAweDFmOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTA6IDB4MjAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTE6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDEyOiAweDgwMjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTM6IDB4MjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTQ6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTU6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxNjogMHg4MDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE3OiAweDgwMDA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTg6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxOTogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFhOiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWI6IDB4MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxYzogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxZDogMHg4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWU6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWY6IDB4ODAyMDgwMFxuXHQgICAgICAgIH1cblx0ICAgIF07XG5cblx0ICAgIC8vIE1hc2tzIHRoYXQgc2VsZWN0IHRoZSBTQk9YIGlucHV0XG5cdCAgICB2YXIgU0JPWF9NQVNLID0gW1xuXHQgICAgICAgIDB4ZjgwMDAwMDEsIDB4MWY4MDAwMDAsIDB4MDFmODAwMDAsIDB4MDAxZjgwMDAsXG5cdCAgICAgICAgMHgwMDAxZjgwMCwgMHgwMDAwMWY4MCwgMHgwMDAwMDFmOCwgMHg4MDAwMDAxZlxuXHQgICAgXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBERVMgYmxvY2sgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIERFUyA9IENfYWxnby5ERVMgPSBCbG9ja0NpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2VsZWN0IDU2IGJpdHMgYWNjb3JkaW5nIHRvIFBDMVxuXHQgICAgICAgICAgICB2YXIga2V5Qml0cyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXlCaXRQb3MgPSBQQzFbaV0gLSAxO1xuXHQgICAgICAgICAgICAgICAga2V5Qml0c1tpXSA9IChrZXlXb3Jkc1trZXlCaXRQb3MgPj4+IDVdID4+PiAoMzEgLSBrZXlCaXRQb3MgJSAzMikpICYgMTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFzc2VtYmxlIDE2IHN1YmtleXNcblx0ICAgICAgICAgICAgdmFyIHN1YktleXMgPSB0aGlzLl9zdWJLZXlzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIG5TdWJLZXkgPSAwOyBuU3ViS2V5IDwgMTY7IG5TdWJLZXkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN1YmtleVxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbblN1YktleV0gPSBbXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRTaGlmdCA9IEJJVF9TSElGVFNbblN1YktleV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNlbGVjdCA0OCBiaXRzIGFjY29yZGluZyB0byBQQzJcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBmcm9tIHRoZSBsZWZ0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WyhpIC8gNikgfCAwXSB8PSBrZXlCaXRzWygoUEMyW2ldIC0gMSkgKyBiaXRTaGlmdCkgJSAyOF0gPDwgKDMxIC0gaSAlIDYpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0IGZyb20gdGhlIHJpZ2h0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WzQgKyAoKGkgLyA2KSB8IDApXSB8PSBrZXlCaXRzWzI4ICsgKCgoUEMyW2kgKyAyNF0gLSAxKSArIGJpdFNoaWZ0KSAlIDI4KV0gPDwgKDMxIC0gaSAlIDYpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBTaW5jZSBlYWNoIHN1YmtleSBpcyBhcHBsaWVkIHRvIGFuIGV4cGFuZGVkIDMyLWJpdCBpbnB1dCxcblx0ICAgICAgICAgICAgICAgIC8vIHRoZSBzdWJrZXkgY2FuIGJlIGJyb2tlbiBpbnRvIDggdmFsdWVzIHNjYWxlZCB0byAzMi1iaXRzLFxuXHQgICAgICAgICAgICAgICAgLy8gd2hpY2ggYWxsb3dzIHRoZSBrZXkgdG8gYmUgdXNlZCB3aXRob3V0IGV4cGFuc2lvblxuXHQgICAgICAgICAgICAgICAgc3ViS2V5WzBdID0gKHN1YktleVswXSA8PCAxKSB8IChzdWJLZXlbMF0gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5W2ldID0gc3ViS2V5W2ldID4+PiAoKGkgLSAxKSAqIDQgKyAzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHN1YktleVs3XSA9IChzdWJLZXlbN10gPDwgNSkgfCAoc3ViS2V5WzddID4+PiAyNyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludmVyc2Ugc3Via2V5c1xuXHQgICAgICAgICAgICB2YXIgaW52U3ViS2V5cyA9IHRoaXMuX2ludlN1YktleXMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpbnZTdWJLZXlzW2ldID0gc3ViS2V5c1sxNSAtIGldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9zdWJLZXlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludlN1YktleXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9DcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0LCBzdWJLZXlzKSB7XG5cdCAgICAgICAgICAgIC8vIEdldCBpbnB1dFxuXHQgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSBNW29mZnNldF07XG5cdCAgICAgICAgICAgIHRoaXMuX3JCbG9jayA9IE1bb2Zmc2V0ICsgMV07XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCBwZXJtdXRhdGlvblxuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgNCwgIDB4MGYwZjBmMGYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMTYsIDB4MDAwMGZmZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgMiwgIDB4MzMzMzMzMzMpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgOCwgIDB4MDBmZjAwZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMSwgIDB4NTU1NTU1NTUpO1xuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgMTY7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbcm91bmRdO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxCbG9jayA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgICAgIHZhciByQmxvY2sgPSB0aGlzLl9yQmxvY2s7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEZlaXN0ZWwgZnVuY3Rpb25cblx0ICAgICAgICAgICAgICAgIHZhciBmID0gMDtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZiB8PSBTQk9YX1BbaV1bKChyQmxvY2sgXiBzdWJLZXlbaV0pICYgU0JPWF9NQVNLW2ldKSA+Pj4gMF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSByQmxvY2s7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSBsQmxvY2sgXiBmO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVW5kbyBzd2FwIGZyb20gbGFzdCByb3VuZFxuXHQgICAgICAgICAgICB2YXIgdCA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgdGhpcy5fbEJsb2NrID0gdGhpcy5fckJsb2NrO1xuXHQgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIEZpbmFsIHBlcm11dGF0aW9uXG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxLCAgMHg1NTU1NTU1NSk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCA4LCAgMHgwMGZmMDBmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCAyLCAgMHgzMzMzMzMzMyk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxNiwgMHgwMDAwZmZmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCA0LCAgMHgwZjBmMGYwZik7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IG91dHB1dFxuXHQgICAgICAgICAgICBNW29mZnNldF0gPSB0aGlzLl9sQmxvY2s7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSB0aGlzLl9yQmxvY2s7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDY0LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvLyBTd2FwIGJpdHMgYWNyb3NzIHRoZSBsZWZ0IGFuZCByaWdodCB3b3Jkc1xuXHQgICAgZnVuY3Rpb24gZXhjaGFuZ2VMUihvZmZzZXQsIG1hc2spIHtcblx0ICAgICAgICB2YXIgdCA9ICgodGhpcy5fbEJsb2NrID4+PiBvZmZzZXQpIF4gdGhpcy5fckJsb2NrKSAmIG1hc2s7XG5cdCAgICAgICAgdGhpcy5fckJsb2NrIF49IHQ7XG5cdCAgICAgICAgdGhpcy5fbEJsb2NrIF49IHQgPDwgb2Zmc2V0O1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBleGNoYW5nZVJMKG9mZnNldCwgbWFzaykge1xuXHQgICAgICAgIHZhciB0ID0gKCh0aGlzLl9yQmxvY2sgPj4+IG9mZnNldCkgXiB0aGlzLl9sQmxvY2spICYgbWFzaztcblx0ICAgICAgICB0aGlzLl9sQmxvY2sgXj0gdDtcblx0ICAgICAgICB0aGlzLl9yQmxvY2sgXj0gdCA8PCBvZmZzZXQ7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuREVTLmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuREVTLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLkRFUyA9IEJsb2NrQ2lwaGVyLl9jcmVhdGVIZWxwZXIoREVTKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBUcmlwbGUtREVTIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBUcmlwbGVERVMgPSBDX2FsZ28uVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIENyZWF0ZSBERVMgaW5zdGFuY2VzXG5cdCAgICAgICAgICAgIHRoaXMuX2RlczEgPSBERVMuY3JlYXRlRW5jcnlwdG9yKFdvcmRBcnJheS5jcmVhdGUoa2V5V29yZHMuc2xpY2UoMCwgMikpKTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMiA9IERFUy5jcmVhdGVFbmNyeXB0b3IoV29yZEFycmF5LmNyZWF0ZShrZXlXb3Jkcy5zbGljZSgyLCA0KSkpO1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMzID0gREVTLmNyZWF0ZUVuY3J5cHRvcihXb3JkQXJyYXkuY3JlYXRlKGtleVdvcmRzLnNsaWNlKDQsIDYpKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMxLmVuY3J5cHRCbG9jayhNLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMyLmRlY3J5cHRCbG9jayhNLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMzLmVuY3J5cHRCbG9jayhNLCBvZmZzZXQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBkZWNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMy5kZWNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMi5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMS5kZWNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAga2V5U2l6ZTogMTkyLzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlRyaXBsZURFUy5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlRyaXBsZURFUy5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5UcmlwbGVERVMgPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKFRyaXBsZURFUyk7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSQzQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSQzQgPSBDX2FsZ28uUkM0ID0gU3RyZWFtQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBrZXkgPSB0aGlzLl9rZXk7XG5cdCAgICAgICAgICAgIHZhciBrZXlXb3JkcyA9IGtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGtleVNpZ0J5dGVzID0ga2V5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXQgc2JveFxuXHQgICAgICAgICAgICB2YXIgUyA9IHRoaXMuX1MgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgU1tpXSA9IGk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBLZXkgc2V0dXBcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXlCeXRlSW5kZXggPSBpICUga2V5U2lnQnl0ZXM7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5Qnl0ZSA9IChrZXlXb3Jkc1trZXlCeXRlSW5kZXggPj4+IDJdID4+PiAoMjQgLSAoa2V5Qnl0ZUluZGV4ICUgNCkgKiA4KSkgJiAweGZmO1xuXG5cdCAgICAgICAgICAgICAgICBqID0gKGogKyBTW2ldICsga2V5Qnl0ZSkgJSAyNTY7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXBcblx0ICAgICAgICAgICAgICAgIHZhciB0ID0gU1tpXTtcblx0ICAgICAgICAgICAgICAgIFNbaV0gPSBTW2pdO1xuXHQgICAgICAgICAgICAgICAgU1tqXSA9IHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudGVyc1xuXHQgICAgICAgICAgICB0aGlzLl9pID0gdGhpcy5faiA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICBNW29mZnNldF0gXj0gZ2VuZXJhdGVLZXlzdHJlYW1Xb3JkLmNhbGwodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDI1Ni8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c3RyZWFtV29yZCgpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICB2YXIgUyA9IHRoaXMuX1M7XG5cdCAgICAgICAgdmFyIGkgPSB0aGlzLl9pO1xuXHQgICAgICAgIHZhciBqID0gdGhpcy5fajtcblxuXHQgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbSB3b3JkXG5cdCAgICAgICAgdmFyIGtleXN0cmVhbVdvcmQgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNDsgbisrKSB7XG5cdCAgICAgICAgICAgIGkgPSAoaSArIDEpICUgMjU2O1xuXHQgICAgICAgICAgICBqID0gKGogKyBTW2ldKSAlIDI1NjtcblxuXHQgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgIHZhciB0ID0gU1tpXTtcblx0ICAgICAgICAgICAgU1tpXSA9IFNbal07XG5cdCAgICAgICAgICAgIFNbal0gPSB0O1xuXG5cdCAgICAgICAgICAgIGtleXN0cmVhbVdvcmQgfD0gU1soU1tpXSArIFNbal0pICUgMjU2XSA8PCAoMjQgLSBuICogOCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gVXBkYXRlIGNvdW50ZXJzXG5cdCAgICAgICAgdGhpcy5faSA9IGk7XG5cdCAgICAgICAgdGhpcy5faiA9IGo7XG5cblx0ICAgICAgICByZXR1cm4ga2V5c3RyZWFtV29yZDtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5SQzQuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SQzQuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUkM0ID0gU3RyZWFtQ2lwaGVyLl9jcmVhdGVIZWxwZXIoUkM0KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNb2RpZmllZCBSQzQgc3RyZWFtIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSQzREcm9wID0gQ19hbGdvLlJDNERyb3AgPSBSQzQuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gZHJvcCBUaGUgbnVtYmVyIG9mIGtleXN0cmVhbSB3b3JkcyB0byBkcm9wLiBEZWZhdWx0IDE5MlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogUkM0LmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBkcm9wOiAxOTJcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIFJDNC5fZG9SZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIERyb3Bcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2ZnLmRyb3A7IGkgPiAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtV29yZC5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUkM0RHJvcC5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJDNERyb3AuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuUkM0RHJvcCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJDNERyb3ApO1xuXHR9KCkpO1xuXG5cblx0LyoqIEBwcmVzZXJ2ZVxuXHQgKiBDb3VudGVyIGJsb2NrIG1vZGUgY29tcGF0aWJsZSB3aXRoICBEciBCcmlhbiBHbGFkbWFuIGZpbGVlbmMuY1xuXHQgKiBkZXJpdmVkIGZyb20gQ3J5cHRvSlMubW9kZS5DVFJcblx0ICogSmFuIEhydWJ5IGpocnVieS53ZWJAZ21haWwuY29tXG5cdCAqL1xuXHRDcnlwdG9KUy5tb2RlLkNUUkdsYWRtYW4gPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENUUkdsYWRtYW4gPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdFx0ZnVuY3Rpb24gaW5jV29yZCh3b3JkKVxuXHRcdHtcblx0XHRcdGlmICgoKHdvcmQgPj4gMjQpICYgMHhmZikgPT09IDB4ZmYpIHsgLy9vdmVyZmxvd1xuXHRcdFx0dmFyIGIxID0gKHdvcmQgPj4gMTYpJjB4ZmY7XG5cdFx0XHR2YXIgYjIgPSAod29yZCA+PiA4KSYweGZmO1xuXHRcdFx0dmFyIGIzID0gd29yZCAmIDB4ZmY7XG5cblx0XHRcdGlmIChiMSA9PT0gMHhmZikgLy8gb3ZlcmZsb3cgYjFcblx0XHRcdHtcblx0XHRcdGIxID0gMDtcblx0XHRcdGlmIChiMiA9PT0gMHhmZilcblx0XHRcdHtcblx0XHRcdFx0YjIgPSAwO1xuXHRcdFx0XHRpZiAoYjMgPT09IDB4ZmYpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRiMyA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0KytiMztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQrK2IyO1xuXHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0KytiMTtcblx0XHRcdH1cblxuXHRcdFx0d29yZCA9IDA7XG5cdFx0XHR3b3JkICs9IChiMSA8PCAxNik7XG5cdFx0XHR3b3JkICs9IChiMiA8PCA4KTtcblx0XHRcdHdvcmQgKz0gYjM7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHR3b3JkICs9ICgweDAxIDw8IDI0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB3b3JkO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGluY0NvdW50ZXIoY291bnRlcilcblx0XHR7XG5cdFx0XHRpZiAoKGNvdW50ZXJbMF0gPSBpbmNXb3JkKGNvdW50ZXJbMF0pKSA9PT0gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gZW5jcl9kYXRhIGluIGZpbGVlbmMuYyBmcm9tICBEciBCcmlhbiBHbGFkbWFuJ3MgY291bnRzIG9ubHkgd2l0aCBEV09SRCBqIDwgOFxuXHRcdFx0XHRjb3VudGVyWzFdID0gaW5jV29yZChjb3VudGVyWzFdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb3VudGVyO1xuXHRcdH1cblxuXHQgICAgdmFyIEVuY3J5cHRvciA9IENUUkdsYWRtYW4uRW5jcnlwdG9yID0gQ1RSR2xhZG1hbi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIgY291bnRlciA9IHRoaXMuX2NvdW50ZXI7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5c3RyZWFtXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgY291bnRlciA9IHRoaXMuX2NvdW50ZXIgPSBpdi5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgICAgIH1cblxuXHRcdFx0XHRpbmNDb3VudGVyKGNvdW50ZXIpO1xuXG5cdFx0XHRcdHZhciBrZXlzdHJlYW0gPSBjb3VudGVyLnNsaWNlKDApO1xuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ1RSR2xhZG1hbi5EZWNyeXB0b3IgPSBFbmNyeXB0b3I7XG5cblx0ICAgIHJldHVybiBDVFJHbGFkbWFuO1xuXHR9KCkpO1xuXG5cblxuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBTdHJlYW1DaXBoZXIgPSBDX2xpYi5TdHJlYW1DaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzXG5cdCAgICB2YXIgUyAgPSBbXTtcblx0ICAgIHZhciBDXyA9IFtdO1xuXHQgICAgdmFyIEcgID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogUmFiYml0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtXG5cdCAgICAgKi9cblx0ICAgIHZhciBSYWJiaXQgPSBDX2FsZ28uUmFiYml0ID0gU3RyZWFtQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBLID0gdGhpcy5fa2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLmNmZy5pdjtcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgS1tpXSA9ICgoKEtbaV0gPDwgOCkgIHwgKEtbaV0gPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoS1tpXSA8PCAyNCkgfCAoS1tpXSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgaW5pdGlhbCBzdGF0ZSB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YID0gW1xuXHQgICAgICAgICAgICAgICAgS1swXSwgKEtbM10gPDwgMTYpIHwgKEtbMl0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbMV0sIChLWzBdIDw8IDE2KSB8IChLWzNdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzJdLCAoS1sxXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1szXSwgKEtbMl0gPDwgMTYpIHwgKEtbMV0gPj4+IDE2KVxuXHQgICAgICAgICAgICBdO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIEMgPSB0aGlzLl9DID0gW1xuXHQgICAgICAgICAgICAgICAgKEtbMl0gPDwgMTYpIHwgKEtbMl0gPj4+IDE2KSwgKEtbMF0gJiAweGZmZmYwMDAwKSB8IChLWzFdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1szXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLCAoS1sxXSAmIDB4ZmZmZjAwMDApIHwgKEtbMl0gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzBdIDw8IDE2KSB8IChLWzBdID4+PiAxNiksIChLWzJdICYgMHhmZmZmMDAwMCkgfCAoS1szXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbMV0gPDwgMTYpIHwgKEtbMV0gPj4+IDE2KSwgKEtbM10gJiAweGZmZmYwMDAwKSB8IChLWzBdICYgMHgwMDAwZmZmZilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBDYXJyeSBiaXRcblx0ICAgICAgICAgICAgdGhpcy5fYiA9IDA7XG5cblx0ICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtIGZvdXIgdGltZXNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gTW9kaWZ5IHRoZSBjb3VudGVyc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgQ1tpXSBePSBYWyhpICsgNCkgJiA3XTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElWIHNldHVwXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgSVYgPSBpdi53b3Jkcztcblx0ICAgICAgICAgICAgICAgIHZhciBJVl8wID0gSVZbMF07XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMSA9IElWWzFdO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIHN1YnZlY3RvcnNcblx0ICAgICAgICAgICAgICAgIHZhciBpMCA9ICgoKElWXzAgPDwgOCkgfCAoSVZfMCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHwgKCgoSVZfMCA8PCAyNCkgfCAoSVZfMCA+Pj4gOCkpICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTIgPSAoKChJVl8xIDw8IDgpIHwgKElWXzEgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzEgPDwgMjQpIHwgKElWXzEgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkxID0gKGkwID4+PiAxNikgfCAoaTIgJiAweGZmZmYwMDAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMyA9IChpMiA8PCAxNikgIHwgKGkwICYgMHgwMDAwZmZmZik7XG5cblx0ICAgICAgICAgICAgICAgIC8vIE1vZGlmeSBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgICAgICAgICAgQ1swXSBePSBpMDtcblx0ICAgICAgICAgICAgICAgIENbMV0gXj0gaTE7XG5cdCAgICAgICAgICAgICAgICBDWzJdIF49IGkyO1xuXHQgICAgICAgICAgICAgICAgQ1szXSBePSBpMztcblx0ICAgICAgICAgICAgICAgIENbNF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzVdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1s2XSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbN10gXj0gaTM7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgWCA9IHRoaXMuX1g7XG5cblx0ICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtXG5cdCAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZvdXIga2V5c3RyZWFtIHdvcmRzXG5cdCAgICAgICAgICAgIFNbMF0gPSBYWzBdIF4gKFhbNV0gPj4+IDE2KSBeIChYWzNdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1sxXSA9IFhbMl0gXiAoWFs3XSA+Pj4gMTYpIF4gKFhbNV0gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzJdID0gWFs0XSBeIChYWzFdID4+PiAxNikgXiAoWFs3XSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbM10gPSBYWzZdIF4gKFhbM10gPj4+IDE2KSBeIChYWzFdIDw8IDE2KTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgICAgIFNbaV0gPSAoKChTW2ldIDw8IDgpICB8IChTW2ldID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKFNbaV0gPDwgMjQpIHwgKFNbaV0gPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXQgKyBpXSBePSBTW2ldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMTI4LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIG5leHRTdGF0ZSgpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICB2YXIgWCA9IHRoaXMuX1g7XG5cdCAgICAgICAgdmFyIEMgPSB0aGlzLl9DO1xuXG5cdCAgICAgICAgLy8gU2F2ZSBvbGQgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICBDX1tpXSA9IENbaV07XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgIENbMF0gPSAoQ1swXSArIDB4NGQzNGQzNGQgKyB0aGlzLl9iKSB8IDA7XG5cdCAgICAgICAgQ1sxXSA9IChDWzFdICsgMHhkMzRkMzRkMyArICgoQ1swXSA+Pj4gMCkgPCAoQ19bMF0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1syXSA9IChDWzJdICsgMHgzNGQzNGQzNCArICgoQ1sxXSA+Pj4gMCkgPCAoQ19bMV0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1szXSA9IChDWzNdICsgMHg0ZDM0ZDM0ZCArICgoQ1syXSA+Pj4gMCkgPCAoQ19bMl0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s0XSA9IChDWzRdICsgMHhkMzRkMzRkMyArICgoQ1szXSA+Pj4gMCkgPCAoQ19bM10gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s1XSA9IChDWzVdICsgMHgzNGQzNGQzNCArICgoQ1s0XSA+Pj4gMCkgPCAoQ19bNF0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s2XSA9IChDWzZdICsgMHg0ZDM0ZDM0ZCArICgoQ1s1XSA+Pj4gMCkgPCAoQ19bNV0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s3XSA9IChDWzddICsgMHhkMzRkMzRkMyArICgoQ1s2XSA+Pj4gMCkgPCAoQ19bNl0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgdGhpcy5fYiA9IChDWzddID4+PiAwKSA8IChDX1s3XSA+Pj4gMCkgPyAxIDogMDtcblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZy12YWx1ZXNcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgZ3ggPSBYW2ldICsgQ1tpXTtcblxuXHQgICAgICAgICAgICAvLyBDb25zdHJ1Y3QgaGlnaCBhbmQgbG93IGFyZ3VtZW50IGZvciBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2EgPSBneCAmIDB4ZmZmZjtcblx0ICAgICAgICAgICAgdmFyIGdiID0gZ3ggPj4+IDE2O1xuXG5cdCAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBoaWdoIGFuZCBsb3cgcmVzdWx0IG9mIHNxdWFyaW5nXG5cdCAgICAgICAgICAgIHZhciBnaCA9ICgoKChnYSAqIGdhKSA+Pj4gMTcpICsgZ2EgKiBnYikgPj4+IDE1KSArIGdiICogZ2I7XG5cdCAgICAgICAgICAgIHZhciBnbCA9ICgoKGd4ICYgMHhmZmZmMDAwMCkgKiBneCkgfCAwKSArICgoKGd4ICYgMHgwMDAwZmZmZikgKiBneCkgfCAwKTtcblxuXHQgICAgICAgICAgICAvLyBIaWdoIFhPUiBsb3dcblx0ICAgICAgICAgICAgR1tpXSA9IGdoIF4gZ2w7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBzdGF0ZSB2YWx1ZXNcblx0ICAgICAgICBYWzBdID0gKEdbMF0gKyAoKEdbN10gPDwgMTYpIHwgKEdbN10gPj4+IDE2KSkgKyAoKEdbNl0gPDwgMTYpIHwgKEdbNl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzFdID0gKEdbMV0gKyAoKEdbMF0gPDwgOCkgIHwgKEdbMF0gPj4+IDI0KSkgKyBHWzddKSB8IDA7XG5cdCAgICAgICAgWFsyXSA9IChHWzJdICsgKChHWzFdIDw8IDE2KSB8IChHWzFdID4+PiAxNikpICsgKChHWzBdIDw8IDE2KSB8IChHWzBdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFszXSA9IChHWzNdICsgKChHWzJdIDw8IDgpICB8IChHWzJdID4+PiAyNCkpICsgR1sxXSkgfCAwO1xuXHQgICAgICAgIFhbNF0gPSAoR1s0XSArICgoR1szXSA8PCAxNikgfCAoR1szXSA+Pj4gMTYpKSArICgoR1syXSA8PCAxNikgfCAoR1syXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbNV0gPSAoR1s1XSArICgoR1s0XSA8PCA4KSAgfCAoR1s0XSA+Pj4gMjQpKSArIEdbM10pIHwgMDtcblx0ICAgICAgICBYWzZdID0gKEdbNl0gKyAoKEdbNV0gPDwgMTYpIHwgKEdbNV0gPj4+IDE2KSkgKyAoKEdbNF0gPDwgMTYpIHwgKEdbNF0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzddID0gKEdbN10gKyAoKEdbNl0gPDwgOCkgIHwgKEdbNl0gPj4+IDI0KSkgKyBHWzVdKSB8IDA7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUmFiYml0LmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuUmFiYml0LmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJhYmJpdCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJhYmJpdCk7XG5cdH0oKSk7XG5cblxuXHQvKipcblx0ICogQ291bnRlciBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DVFIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENUUiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIHZhciBFbmNyeXB0b3IgPSBDVFIuRW5jcnlwdG9yID0gQ1RSLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlclxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cdCAgICAgICAgICAgIHZhciBjb3VudGVyID0gdGhpcy5fY291bnRlcjtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlciA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gY291bnRlci5zbGljZSgwKTtcblx0ICAgICAgICAgICAgY2lwaGVyLmVuY3J5cHRCbG9jayhrZXlzdHJlYW0sIDApO1xuXG5cdCAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudGVyXG5cdCAgICAgICAgICAgIGNvdW50ZXJbYmxvY2tTaXplIC0gMV0gPSAoY291bnRlcltibG9ja1NpemUgLSAxXSArIDEpIHwgMFxuXG5cdCAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbb2Zmc2V0ICsgaV0gXj0ga2V5c3RyZWFtW2ldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIENUUi5EZWNyeXB0b3IgPSBFbmNyeXB0b3I7XG5cblx0ICAgIHJldHVybiBDVFI7XG5cdH0oKSk7XG5cblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFMgID0gW107XG5cdCAgICB2YXIgQ18gPSBbXTtcblx0ICAgIHZhciBHICA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFJhYmJpdCBzdHJlYW0gY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGlzIGlzIGEgbGVnYWN5IHZlcnNpb24gdGhhdCBuZWdsZWN0ZWQgdG8gY29udmVydCB0aGUga2V5IHRvIGxpdHRsZS1lbmRpYW4uXG5cdCAgICAgKiBUaGlzIGVycm9yIGRvZXNuJ3QgYWZmZWN0IHRoZSBjaXBoZXIncyBzZWN1cml0eSxcblx0ICAgICAqIGJ1dCBpdCBkb2VzIGFmZmVjdCBpdHMgY29tcGF0aWJpbGl0eSB3aXRoIG90aGVyIGltcGxlbWVudGF0aW9ucy5cblx0ICAgICAqL1xuXHQgICAgdmFyIFJhYmJpdExlZ2FjeSA9IENfYWxnby5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEsgPSB0aGlzLl9rZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuY2ZnLml2O1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWCA9IFtcblx0ICAgICAgICAgICAgICAgIEtbMF0sIChLWzNdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzFdLCAoS1swXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1syXSwgKEtbMV0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbM10sIChLWzJdIDw8IDE2KSB8IChLWzFdID4+PiAxNilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBDID0gdGhpcy5fQyA9IFtcblx0ICAgICAgICAgICAgICAgIChLWzJdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksIChLWzBdICYgMHhmZmZmMDAwMCkgfCAoS1sxXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbM10gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSwgKEtbMV0gJiAweGZmZmYwMDAwKSB8IChLWzJdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1swXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLCAoS1syXSAmIDB4ZmZmZjAwMDApIHwgKEtbM10gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzFdIDw8IDE2KSB8IChLWzFdID4+PiAxNiksIChLWzNdICYgMHhmZmZmMDAwMCkgfCAoS1swXSAmIDB4MDAwMGZmZmYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gQ2FycnkgYml0XG5cdCAgICAgICAgICAgIHRoaXMuX2IgPSAwO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIE1vZGlmeSB0aGUgY291bnRlcnNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIENbaV0gXj0gWFsoaSArIDQpICYgN107XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJViBzZXR1cFxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIElWID0gaXYud29yZHM7XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMCA9IElWWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzEgPSBJVlsxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBzdWJ2ZWN0b3JzXG5cdCAgICAgICAgICAgICAgICB2YXIgaTAgPSAoKChJVl8wIDw8IDgpIHwgKElWXzAgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzAgPDwgMjQpIHwgKElWXzAgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkyID0gKCgoSVZfMSA8PCA4KSB8IChJVl8xID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8xIDw8IDI0KSB8IChJVl8xID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMSA9IChpMCA+Pj4gMTYpIHwgKGkyICYgMHhmZmZmMDAwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTMgPSAoaTIgPDwgMTYpICB8IChpMCAmIDB4MDAwMGZmZmYpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBNb2RpZnkgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgICAgIENbMF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzFdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1syXSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbM10gXj0gaTM7XG5cdCAgICAgICAgICAgICAgICBDWzRdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1s1XSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbNl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzddIF49IGkzO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbVxuXHQgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIGtleXN0cmVhbSB3b3Jkc1xuXHQgICAgICAgICAgICBTWzBdID0gWFswXSBeIChYWzVdID4+PiAxNikgXiAoWFszXSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMV0gPSBYWzJdIF4gKFhbN10gPj4+IDE2KSBeIChYWzVdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1syXSA9IFhbNF0gXiAoWFsxXSA+Pj4gMTYpIF4gKFhbN10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzNdID0gWFs2XSBeIChYWzNdID4+PiAxNikgXiAoWFsxXSA8PCAxNik7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBTW2ldID0gKCgoU1tpXSA8PCA4KSAgfCAoU1tpXSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChTW2ldIDw8IDI0KSB8IChTW2ldID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0ICsgaV0gXj0gU1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXHQgICAgICAgIHZhciBDID0gdGhpcy5fQztcblxuXHQgICAgICAgIC8vIFNhdmUgb2xkIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgQ19baV0gPSBDW2ldO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBDWzBdID0gKENbMF0gKyAweDRkMzRkMzRkICsgdGhpcy5fYikgfCAwO1xuXHQgICAgICAgIENbMV0gPSAoQ1sxXSArIDB4ZDM0ZDM0ZDMgKyAoKENbMF0gPj4+IDApIDwgKENfWzBdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbMl0gPSAoQ1syXSArIDB4MzRkMzRkMzQgKyAoKENbMV0gPj4+IDApIDwgKENfWzFdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbM10gPSAoQ1szXSArIDB4NGQzNGQzNGQgKyAoKENbMl0gPj4+IDApIDwgKENfWzJdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNF0gPSAoQ1s0XSArIDB4ZDM0ZDM0ZDMgKyAoKENbM10gPj4+IDApIDwgKENfWzNdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNV0gPSAoQ1s1XSArIDB4MzRkMzRkMzQgKyAoKENbNF0gPj4+IDApIDwgKENfWzRdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNl0gPSAoQ1s2XSArIDB4NGQzNGQzNGQgKyAoKENbNV0gPj4+IDApIDwgKENfWzVdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbN10gPSAoQ1s3XSArIDB4ZDM0ZDM0ZDMgKyAoKENbNl0gPj4+IDApIDwgKENfWzZdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIHRoaXMuX2IgPSAoQ1s3XSA+Pj4gMCkgPCAoQ19bN10gPj4+IDApID8gMSA6IDA7XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGctdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIGd4ID0gWFtpXSArIENbaV07XG5cblx0ICAgICAgICAgICAgLy8gQ29uc3RydWN0IGhpZ2ggYW5kIGxvdyBhcmd1bWVudCBmb3Igc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdhID0gZ3ggJiAweGZmZmY7XG5cdCAgICAgICAgICAgIHZhciBnYiA9IGd4ID4+PiAxNjtcblxuXHQgICAgICAgICAgICAvLyBDYWxjdWxhdGUgaGlnaCBhbmQgbG93IHJlc3VsdCBvZiBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSAoKCgoZ2EgKiBnYSkgPj4+IDE3KSArIGdhICogZ2IpID4+PiAxNSkgKyBnYiAqIGdiO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSAoKChneCAmIDB4ZmZmZjAwMDApICogZ3gpIHwgMCkgKyAoKChneCAmIDB4MDAwMGZmZmYpICogZ3gpIHwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gSGlnaCBYT1IgbG93XG5cdCAgICAgICAgICAgIEdbaV0gPSBnaCBeIGdsO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgWFswXSA9IChHWzBdICsgKChHWzddIDw8IDE2KSB8IChHWzddID4+PiAxNikpICsgKChHWzZdIDw8IDE2KSB8IChHWzZdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFsxXSA9IChHWzFdICsgKChHWzBdIDw8IDgpICB8IChHWzBdID4+PiAyNCkpICsgR1s3XSkgfCAwO1xuXHQgICAgICAgIFhbMl0gPSAoR1syXSArICgoR1sxXSA8PCAxNikgfCAoR1sxXSA+Pj4gMTYpKSArICgoR1swXSA8PCAxNikgfCAoR1swXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbM10gPSAoR1szXSArICgoR1syXSA8PCA4KSAgfCAoR1syXSA+Pj4gMjQpKSArIEdbMV0pIHwgMDtcblx0ICAgICAgICBYWzRdID0gKEdbNF0gKyAoKEdbM10gPDwgMTYpIHwgKEdbM10gPj4+IDE2KSkgKyAoKEdbMl0gPDwgMTYpIHwgKEdbMl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzVdID0gKEdbNV0gKyAoKEdbNF0gPDwgOCkgIHwgKEdbNF0gPj4+IDI0KSkgKyBHWzNdKSB8IDA7XG5cdCAgICAgICAgWFs2XSA9IChHWzZdICsgKChHWzVdIDw8IDE2KSB8IChHWzVdID4+PiAxNikpICsgKChHWzRdIDw8IDE2KSB8IChHWzRdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs3XSA9IChHWzddICsgKChHWzZdIDw8IDgpICB8IChHWzZdID4+PiAyNCkpICsgR1s1XSkgfCAwO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSYWJiaXRMZWdhY3kpO1xuXHR9KCkpO1xuXG5cblx0LyoqXG5cdCAqIFplcm8gcGFkZGluZyBzdHJhdGVneS5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZyA9IHtcblx0ICAgIHBhZDogZnVuY3Rpb24gKGRhdGEsIGJsb2NrU2l6ZSkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgIC8vIFBhZFxuXHQgICAgICAgIGRhdGEuY2xhbXAoKTtcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzICs9IGJsb2NrU2l6ZUJ5dGVzIC0gKChkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXMpIHx8IGJsb2NrU2l6ZUJ5dGVzKTtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAvLyBVbnBhZFxuXHQgICAgICAgIHZhciBpID0gZGF0YS5zaWdCeXRlcyAtIDE7XG5cdCAgICAgICAgd2hpbGUgKCEoKGRhdGFXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmYpKSB7XG5cdCAgICAgICAgICAgIGktLTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGkgKyAxO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7Il19