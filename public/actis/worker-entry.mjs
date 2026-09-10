//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
//#endregion
//#region src/engine/FrameDriver.ts
/**
* Host-agnostic driver backed by a timer. Used inside workers, where
* `requestAnimationFrame` is unavailable.
*/
function timerFrameDriver(intervalMs = 1e3 / 60) {
	let id = -1;
	return {
		request(callback) {
			if (typeof setTimeout === "undefined") return;
			id = setTimeout(() => {
				id = -1;
				callback(typeof performance !== "undefined" ? performance.now() : Date.now());
			}, intervalMs);
		},
		cancel() {
			if (id === -1 || typeof clearTimeout === "undefined") {
				id = -1;
				return;
			}
			clearTimeout(id);
			id = -1;
		}
	};
}
//#endregion
//#region src/context/ContextCapabilities.ts
var import_twgl_full = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* @license twgl.js 7.0.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
	* Available via the MIT license.
	* see: http://github.com/greggman/twgl.js for details
	*/
	(function webpackUniversalModuleDefinition(root, factory) {
		if (typeof exports === "object" && typeof module === "object") module.exports = factory();
		else if (typeof define === "function" && define.amd) define([], factory);
		else if (typeof exports === "object") exports["twgl"] = factory();
		else root["twgl"] = factory();
	})(typeof self !== "undefined" ? self : exports, () => {
		return (() => {
			"use strict";
			var __webpack_modules__ = {
				"./src/attributes.js": ((__unused_webpack_module, exports$1, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$1.__esModule = true;
					exports$1.createAttribsFromArrays = createAttribsFromArrays;
					exports$1.createBufferFromArray = createBufferFromArray;
					exports$1.createBufferFromTypedArray = createBufferFromTypedArray;
					exports$1.createBufferInfoFromArrays = createBufferInfoFromArrays;
					exports$1.createBuffersFromArrays = createBuffersFromArrays;
					exports$1.getArray_ = getArray;
					exports$1.getNumComponents_ = getNumComponents;
					exports$1.setAttribInfoBufferFromArray = setAttribInfoBufferFromArray;
					exports$1.setAttributeDefaults_ = setDefaults;
					exports$1.setAttributePrefix = setAttributePrefix;
					var typedArrays = _interopRequireWildcard(__webpack_require__(
						/*! ./typedarrays.js */
						"./src/typedarrays.js"
					));
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					var STATIC_DRAW = 35044;
					var ARRAY_BUFFER = 34962;
					var ELEMENT_ARRAY_BUFFER = 34963;
					var BUFFER_SIZE = 34660;
					var BYTE = 5120;
					var UNSIGNED_BYTE = 5121;
					var SHORT = 5122;
					var UNSIGNED_SHORT = 5123;
					var INT = 5124;
					var UNSIGNED_INT = 5125;
					var FLOAT = 5126;
					var defaults = { attribPrefix: "" };
					/**
					* Sets the default attrib prefix
					*
					* When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
					* as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
					*
					* In other words I'll create arrays of geometry like this
					*
					*     var arrays = {
					*       position: ...
					*       normal: ...
					*       texcoord: ...
					*     };
					*
					* But need those mapped to attributes and my attributes start with `a_`.
					*
					* @deprecated see {@link module:twgl.setDefaults}
					* @param {string} prefix prefix for attribs
					* @memberOf module:twgl/attributes
					*/
					function setAttributePrefix(prefix) {
						defaults.attribPrefix = prefix;
					}
					function setDefaults(newDefaults) {
						helper.copyExistingProperties(newDefaults, defaults);
					}
					function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
						gl.bindBuffer(type, buffer);
						gl.bufferData(type, array, drawType || STATIC_DRAW);
					}
					/**
					* Given typed array creates a WebGLBuffer and copies the typed array
					* into it.
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
					* @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
					* @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
					* @return {WebGLBuffer} the created WebGLBuffer
					* @memberOf module:twgl/attributes
					*/
					function createBufferFromTypedArray(gl, typedArray, type, drawType) {
						if (helper.isBuffer(gl, typedArray)) return typedArray;
						type = type || ARRAY_BUFFER;
						var buffer = gl.createBuffer();
						setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
						return buffer;
					}
					function isIndices(name) {
						return name === "indices";
					}
					function getNormalizationForTypedArrayType(typedArrayType) {
						if (typedArrayType === Int8Array) return true;
						if (typedArrayType === Uint8Array) return true;
						return false;
					}
					function getArray(array) {
						return array.length ? array : array.data;
					}
					var texcoordRE = /coord|texture/i;
					var colorRE = /color|colour/i;
					function guessNumComponentsFromName(name, length) {
						var numComponents;
						if (texcoordRE.test(name)) numComponents = 2;
						else if (colorRE.test(name)) numComponents = 4;
						else numComponents = 3;
						if (length % numComponents > 0) throw new Error("Can not guess numComponents for attribute '".concat(name, "'. Tried ").concat(numComponents, " but ").concat(length, " values is not evenly divisible by ").concat(numComponents, ". You should specify it."));
						return numComponents;
					}
					function getNumComponents(array, arrayName, numValues) {
						return array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues || getArray(array).length);
					}
					function makeTypedArray(array, name) {
						if (typedArrays.isArrayBuffer(array)) return array;
						if (typedArrays.isArrayBuffer(array.data)) return array.data;
						if (Array.isArray(array)) array = { data: array };
						var Type = array.type ? typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type) : void 0;
						if (!Type) if (isIndices(name)) Type = Uint16Array;
						else Type = Float32Array;
						return new Type(array.data);
					}
					function glTypeFromGLTypeOrTypedArrayType(glTypeOrTypedArrayCtor) {
						return typeof glTypeOrTypedArrayCtor === "number" ? glTypeOrTypedArrayCtor : glTypeOrTypedArrayCtor ? typedArrays.getGLTypeForTypedArrayType(glTypeOrTypedArrayCtor) : FLOAT;
					}
					function typedArrayTypeFromGLTypeOrTypedArrayCtor(glTypeOrTypedArrayCtor) {
						return typeof glTypeOrTypedArrayCtor === "number" ? typedArrays.getTypedArrayTypeForGLType(glTypeOrTypedArrayCtor) : glTypeOrTypedArrayCtor || Float32Array;
					}
					function attribBufferFromBuffer(gl, array) {
						return {
							buffer: array.buffer,
							numValues: 24,
							type: glTypeFromGLTypeOrTypedArrayType(array.type),
							arrayType: typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type)
						};
					}
					function attribBufferFromSize(gl, array) {
						var numValues = array.data || array;
						var arrayType = typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type);
						var numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
						var buffer = gl.createBuffer();
						gl.bindBuffer(ARRAY_BUFFER, buffer);
						gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
						return {
							buffer,
							numValues,
							type: typedArrays.getGLTypeForTypedArrayType(arrayType),
							arrayType
						};
					}
					function attribBufferFromArrayLike(gl, array, arrayName) {
						var typedArray = makeTypedArray(array, arrayName);
						return {
							arrayType: typedArray.constructor,
							buffer: createBufferFromTypedArray(gl, typedArray, void 0, array.drawType),
							type: typedArrays.getGLTypeForTypedArray(typedArray),
							numValues: 0
						};
					}
					/**
					* The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
					* for the attribute.
					*
					* @typedef {Object} AttribInfo
					* @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
					*    disabled and set to this constant value and all other values will be ignored.
					* @property {number} [numComponents] the number of components for this attribute.
					* @property {number} [size] synonym for `numComponents`.
					* @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
					* @property {boolean} [normalize] whether or not to normalize the data. Default = false
					* @property {number} [offset] offset into buffer in bytes. Default = 0
					* @property {number} [stride] the stride in bytes per element. Default = 0
					* @property {number} [divisor] the divisor in instances. Default = 0.
					*    Requires WebGL2 or the ANGLE_instanced_arrays extension.
					*    and, if you're using WebGL1 you must have called {@link module:twgl.addExtensionsToContext}
					* @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
					* @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
					* @memberOf module:twgl
					*/
					/**
					* @typedef {(Int8ArrayConstructor|Uint8ArrayConstructor|Int16ArrayConstructor|Uint16ArrayConstructor|Int32ArrayConstructor|Uint32ArrayConstructor|Float32ArrayConstructor)} TypedArrayConstructor
					*/
					/**
					* Use this type of array spec when TWGL can't guess the type or number of components of an array
					* @typedef {Object} FullArraySpec
					* @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
					*    disabled and set to this constant value and all other values will be ignored.
					* @property {(number|number[]|ArrayBufferView)} [data] The data of the array. A number alone becomes the number of elements of type.
					* @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
					*    If `coord` is in the name assumes `numComponents = 2`.
					*    If `color` is in the name assumes `numComponents = 4`.
					*    otherwise assumes `numComponents = 3`
					* @property {number|TypedArrayConstructor} [type] type. This is used if `data` is a JavaScript array, or `buffer` is passed in, or `data` is a number.
					*   It can either be the constructor for a typedarray. (eg. `Uint8Array`) OR a WebGL type, (eg `gl.UNSIGNED_BYTE`).
					*   For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: gl.UNSIGNED_BYTE, data: [255,0,255,255, ...], }`.
					* @property {number} [size] synonym for `numComponents`.
					* @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
					* @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
					* @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
					* @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = 0.
					*     Requires WebGL2 or the ANGLE_instanced_arrays extension.
					*     and, if you using WebGL1 you must have called {@link module:twgl.addExtensionsToContext}
					* @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
					* @property {string} [name] synonym for `attrib`.
					* @property {string} [attribName] synonym for `attrib`.
					* @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
					*    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
					*    to provide this. Example:
					*
					*         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
					*           position: [1, 2, 3, ... ],
					*         });
					*         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
					*           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
					*         });
					*
					* @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
					* @memberOf module:twgl
					*/
					/**
					* An individual array in {@link module:twgl.Arrays}
					*
					* When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
					* the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
					* be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
					*
					* @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
					* @memberOf module:twgl
					*/
					/**
					* This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
					* attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
					*
					*     Bare JavaScript Arrays
					*
					*         var arrays = {
					*            position: [-1, 1, 0],
					*            normal: [0, 1, 0],
					*            ...
					*         }
					*
					*     Bare TypedArrays
					*
					*         var arrays = {
					*            position: new Float32Array([-1, 1, 0]),
					*            color: new Uint8Array([255, 128, 64, 255]),
					*            ...
					*         }
					*
					* *   Will guess at `numComponents` if not specified based on name.
					*
					*     If `coord` is in the name assumes `numComponents = 2`
					*
					*     If `color` is in the name assumes `numComponents = 4`
					*
					*     otherwise assumes `numComponents = 3`
					*
					* Objects with various fields. See {@link module:twgl.FullArraySpec}.
					*
					*     var arrays = {
					*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
					*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
					*       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
					*       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
					*     };
					*
					* @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
					* @memberOf module:twgl
					*/
					/**
					* Creates a set of attribute data and WebGLBuffers from set of arrays
					*
					* Given
					*
					*      var arrays = {
					*        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
					*        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
					*        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
					*        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
					*        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
					*      };
					*
					* returns something like
					*
					*      var attribs = {
					*        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
					*        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
					*        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
					*        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
					*      };
					*
					* notes:
					*
					* *   Arrays can take various forms
					*
					*     Bare JavaScript Arrays
					*
					*         var arrays = {
					*            position: [-1, 1, 0],
					*            normal: [0, 1, 0],
					*            ...
					*         }
					*
					*     Bare TypedArrays
					*
					*         var arrays = {
					*            position: new Float32Array([-1, 1, 0]),
					*            color: new Uint8Array([255, 128, 64, 255]),
					*            ...
					*         }
					*
					* *   Will guess at `numComponents` if not specified based on name.
					*
					*     If `coord` is in the name assumes `numComponents = 2`
					*
					*     If `color` is in the name assumes `numComponents = 4`
					*
					*     otherwise assumes `numComponents = 3`
					*
					* @param {WebGLRenderingContext} gl The webgl rendering context.
					* @param {module:twgl.Arrays} arrays The arrays
					* @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
					*   This lets you share buffers. Any arrays you supply will override
					*   the buffers from srcBufferInfo.
					* @return {Object.<string, module:twgl.AttribInfo>} the attribs
					* @memberOf module:twgl/attributes
					*/
					function createAttribsFromArrays(gl, arrays) {
						var attribs = {};
						Object.keys(arrays).forEach(function(arrayName) {
							if (!isIndices(arrayName)) {
								var array = arrays[arrayName];
								var attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
								if (array.value) {
									if (!Array.isArray(array.value) && !typedArrays.isArrayBuffer(array.value)) throw new Error("array.value is not array or typedarray");
									attribs[attribName] = { value: array.value };
								} else {
									var fn;
									if (array.buffer && array.buffer instanceof WebGLBuffer) fn = attribBufferFromBuffer;
									else if (typeof array === "number" || typeof array.data === "number") fn = attribBufferFromSize;
									else fn = attribBufferFromArrayLike;
									var _fn = fn(gl, array, arrayName), buffer = _fn.buffer, type = _fn.type, numValues = _fn.numValues, arrayType = _fn.arrayType;
									var normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArrayType(arrayType);
									attribs[attribName] = {
										buffer,
										numComponents: getNumComponents(array, arrayName, numValues),
										type,
										normalize: normalization,
										stride: array.stride || 0,
										offset: array.offset || 0,
										divisor: array.divisor === void 0 ? void 0 : array.divisor,
										drawType: array.drawType
									};
								}
							}
						});
						gl.bindBuffer(ARRAY_BUFFER, null);
						return attribs;
					}
					/**
					* Sets the contents of a buffer attached to an attribInfo
					*
					* This is helper function to dynamically update a buffer.
					*
					* Let's say you make a bufferInfo
					*
					*     var arrays = {
					*        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
					*        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
					*        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
					*        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
					*     };
					*     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
					*
					*  And you want to dynamically update the positions. You could do this
					*
					*     // assuming arrays.position has already been updated with new data.
					*     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
					*
					* @param {WebGLRenderingContext} gl
					* @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
					*   the name of the attribute will include the prefix.
					* @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
					*    else will have to be converted to a typed array before it can be used by WebGL. During init time that
					*    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
					* @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
					*    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
					*    for the portion of the array you want to use.
					*
					*        var someArray = new Float32Array(1000); // an array with 1000 floats
					*        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
					*
					*    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
					* @memberOf module:twgl/attributes
					*/
					function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
						array = makeTypedArray(array);
						if (offset !== void 0) {
							gl.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
							gl.bufferSubData(ARRAY_BUFFER, offset, array);
						} else setBufferFromTypedArray(gl, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
					}
					function getBytesPerValueForGLType(gl, type) {
						if (type === BYTE) return 1;
						if (type === UNSIGNED_BYTE) return 1;
						if (type === SHORT) return 2;
						if (type === UNSIGNED_SHORT) return 2;
						if (type === INT) return 4;
						if (type === UNSIGNED_INT) return 4;
						if (type === FLOAT) return 4;
						return 0;
					}
					var positionKeys = [
						"position",
						"positions",
						"a_position"
					];
					function getNumElementsFromNonIndexedArrays(arrays) {
						var key;
						var ii;
						for (ii = 0; ii < positionKeys.length; ++ii) {
							key = positionKeys[ii];
							if (key in arrays) break;
						}
						if (ii === positionKeys.length) key = Object.keys(arrays)[0];
						var array = arrays[key];
						var length = getArray(array).length;
						if (length === void 0) return 1;
						var numComponents = getNumComponents(array, key);
						var numElements = length / numComponents;
						if (length % numComponents > 0) throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length));
						return numElements;
					}
					function getNumElementsFromAttributes(gl, attribs) {
						var key;
						var ii;
						for (ii = 0; ii < positionKeys.length; ++ii) {
							key = positionKeys[ii];
							if (key in attribs) break;
							key = defaults.attribPrefix + key;
							if (key in attribs) break;
						}
						if (ii === positionKeys.length) key = Object.keys(attribs)[0];
						var attrib = attribs[key];
						if (!attrib.buffer) return 1;
						gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
						var numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
						gl.bindBuffer(ARRAY_BUFFER, null);
						var totalElements = numBytes / getBytesPerValueForGLType(gl, attrib.type);
						var numComponents = attrib.numComponents || attrib.size;
						var numElements = totalElements / numComponents;
						if (numElements % 1 !== 0) throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length));
						return numElements;
					}
					/**
					* @typedef {Object} BufferInfo
					* @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
					* @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
					* @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
					* @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
					* @memberOf module:twgl
					*/
					/**
					* Creates a BufferInfo from an object of arrays.
					*
					* This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
					* {@link module:twgl:drawBufferInfo}.
					*
					* Given an object like
					*
					*     var arrays = {
					*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
					*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
					*       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
					*       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
					*     };
					*
					*  Creates an BufferInfo like this
					*
					*     bufferInfo = {
					*       numElements: 4,        // or whatever the number of elements is
					*       indices: WebGLBuffer,  // this property will not exist if there are no indices
					*       attribs: {
					*         position: { buffer: WebGLBuffer, numComponents: 3, },
					*         normal:   { buffer: WebGLBuffer, numComponents: 3, },
					*         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
					*       },
					*     };
					*
					*  The properties of arrays can be JavaScript arrays in which case the number of components
					*  will be guessed.
					*
					*     var arrays = {
					*        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
					*        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
					*        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
					*        indices:  [0, 1, 2, 1, 2, 3],
					*     };
					*
					*  They can also be TypedArrays
					*
					*     var arrays = {
					*        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
					*        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
					*        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
					*        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
					*     };
					*
					*  Or AugmentedTypedArrays
					*
					*     var positions = createAugmentedTypedArray(3, 4);
					*     var texcoords = createAugmentedTypedArray(2, 4);
					*     var normals   = createAugmentedTypedArray(3, 4);
					*     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
					*
					*     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
					*     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
					*     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
					*     indices.push([0, 1, 2, 1, 2, 3]);
					*
					*     var arrays = {
					*        position: positions,
					*        texcoord: texcoords,
					*        normal:   normals,
					*        indices:  indices,
					*     };
					*
					* For the last example it is equivalent to
					*
					*     var bufferInfo = {
					*       attribs: {
					*         position: { numComponents: 3, buffer: gl.createBuffer(), },
					*         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
					*         normal: { numComponents: 3, buffer: gl.createBuffer(), },
					*       },
					*       indices: gl.createBuffer(),
					*       numElements: 6,
					*     };
					*
					*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
					*     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
					*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
					*     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
					*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
					*     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
					*     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
					*     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {module:twgl.Arrays} arrays Your data
					* @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
					*        buffer info to start from. WebGLBuffers etc specified
					*        in the srcBufferInfo will be used in a new BufferInfo
					*        with any arrays specified overriding the ones in
					*        srcBufferInfo.
					* @return {module:twgl.BufferInfo} A BufferInfo
					* @memberOf module:twgl/attributes
					*/
					function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
						var newAttribs = createAttribsFromArrays(gl, arrays);
						var bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
						bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
						var indices = arrays.indices;
						if (indices) {
							var newIndices = makeTypedArray(indices, "indices");
							bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
							bufferInfo.numElements = newIndices.length;
							bufferInfo.elementType = typedArrays.getGLTypeForTypedArray(newIndices);
						} else if (!bufferInfo.numElements) bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
						return bufferInfo;
					}
					/**
					* Creates a buffer from an array, typed array, or array spec
					*
					* Given something like this
					*
					*     [1, 2, 3],
					*
					* or
					*
					*     new Uint16Array([1,2,3]);
					*
					* or
					*
					*     {
					*        data: [1, 2, 3],
					*        type: Uint8Array,
					*     }
					*
					* returns a WebGLBuffer that contains the given data.
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext.
					* @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
					* @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
					* @return {WebGLBuffer} a WebGLBuffer containing the data in array.
					* @memberOf module:twgl/attributes
					*/
					function createBufferFromArray(gl, array, arrayName) {
						var type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
						return createBufferFromTypedArray(gl, makeTypedArray(array, arrayName), type);
					}
					/**
					* Creates buffers from arrays or typed arrays
					*
					* Given something like this
					*
					*     var arrays = {
					*        positions: [1, 2, 3],
					*        normals: [0, 0, 1],
					*     }
					*
					* returns something like
					*
					*     buffers = {
					*       positions: WebGLBuffer,
					*       normals: WebGLBuffer,
					*     }
					*
					* If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext.
					* @param {module:twgl.Arrays} arrays
					* @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
					* @memberOf module:twgl/attributes
					*/
					function createBuffersFromArrays(gl, arrays) {
						var buffers = {};
						Object.keys(arrays).forEach(function(key) {
							buffers[key] = createBufferFromArray(gl, arrays[key], key);
						});
						if (arrays.indices) {
							buffers.numElements = arrays.indices.length;
							buffers.elementType = typedArrays.getGLTypeForTypedArray(makeTypedArray(arrays.indices), "indices");
						} else buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
						return buffers;
					}
				}),
				"./src/draw.js": ((__unused_webpack_module, exports$2, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$2.__esModule = true;
					exports$2.drawBufferInfo = drawBufferInfo;
					exports$2.drawObjectList = drawObjectList;
					var programs = _interopRequireWildcard(__webpack_require__(
						/*! ./programs.js */
						"./src/programs.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					var TRIANGLES = 4;
					var UNSIGNED_SHORT = 5123;
					/**
					* Drawing related functions
					*
					* For backward compatibility they are available at both `twgl.draw` and `twgl`
					* itself
					*
					* See {@link module:twgl} for core functions
					*
					* @module twgl/draw
					*/
					/**
					* Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
					*
					* normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
					* but calling this means if you switch from indexed data to non-indexed
					* data you don't have to remember to update your draw call.
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
					*   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
					* @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
					* @param {number} [count] An optional count. Defaults to bufferInfo.numElements
					* @param {number} [offset] An optional offset. Defaults to 0.
					* @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
					* @memberOf module:twgl/draw
					*/
					function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
						type = type === void 0 ? TRIANGLES : type;
						var indices = bufferInfo.indices;
						var elementType = bufferInfo.elementType;
						var numElements = count === void 0 ? bufferInfo.numElements : count;
						offset = offset === void 0 ? 0 : offset;
						if (elementType || indices) if (instanceCount !== void 0) gl.drawElementsInstanced(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
						else gl.drawElements(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset);
						else if (instanceCount !== void 0) gl.drawArraysInstanced(type, offset, numElements, instanceCount);
						else gl.drawArrays(type, offset, numElements);
					}
					/**
					* A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
					*
					* You need either a `BufferInfo` or a `VertexArrayInfo`.
					*
					* @typedef {Object} DrawObject
					* @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
					* @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
					* @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
					* @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
					* @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
					* @property {Object<string, ?>} uniforms The values for the uniforms.
					*   You can pass multiple objects by putting them in an array. For example
					*
					*     var sharedUniforms = {
					*       u_fogNear: 10,
					*       u_projection: ...
					*       ...
					*     };
					*
					*     var localUniforms = {
					*       u_world: ...
					*       u_diffuseColor: ...
					*     };
					*
					*     var drawObj = {
					*       ...
					*       uniforms: [sharedUniforms, localUniforms],
					*     };
					*
					* @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
					* @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
					* @property {number} [instanceCount] the number of instances. Defaults to undefined.
					* @memberOf module:twgl
					*/
					/**
					* Draws a list of objects
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {DrawObject[]} objectsToDraw an array of objects to draw.
					* @memberOf module:twgl/draw
					*/
					function drawObjectList(gl, objectsToDraw) {
						var lastUsedProgramInfo = null;
						var lastUsedBufferInfo = null;
						objectsToDraw.forEach(function(object) {
							if (object.active === false) return;
							var programInfo = object.programInfo;
							var bufferInfo = object.vertexArrayInfo || object.bufferInfo;
							var bindBuffers = false;
							var type = object.type === void 0 ? TRIANGLES : object.type;
							if (programInfo !== lastUsedProgramInfo) {
								lastUsedProgramInfo = programInfo;
								gl.useProgram(programInfo.program);
								bindBuffers = true;
							}
							if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
								if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) gl.bindVertexArray(null);
								lastUsedBufferInfo = bufferInfo;
								programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
							}
							programs.setUniforms(programInfo, object.uniforms);
							drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
						});
						if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) gl.bindVertexArray(null);
					}
				}),
				"./src/framebuffers.js": ((__unused_webpack_module, exports$3, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$3.__esModule = true;
					exports$3.bindFramebufferInfo = bindFramebufferInfo;
					exports$3.createFramebufferInfo = createFramebufferInfo;
					exports$3.resizeFramebufferInfo = resizeFramebufferInfo;
					var textures = _interopRequireWildcard(__webpack_require__(
						/*! ./textures.js */
						"./src/textures.js"
					));
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					var FRAMEBUFFER = 36160;
					var RENDERBUFFER = 36161;
					var TEXTURE_2D = 3553;
					var UNSIGNED_BYTE = 5121;
					var DEPTH_COMPONENT = 6402;
					var RGBA = 6408;
					var DEPTH_COMPONENT24 = 33190;
					var DEPTH_COMPONENT32F = 36012;
					var DEPTH24_STENCIL8 = 35056;
					var DEPTH32F_STENCIL8 = 36013;
					var RGBA4 = 32854;
					var RGB5_A1 = 32855;
					var RGB565 = 36194;
					var DEPTH_COMPONENT16 = 33189;
					var STENCIL_INDEX = 6401;
					var STENCIL_INDEX8 = 36168;
					var DEPTH_STENCIL = 34041;
					var COLOR_ATTACHMENT0 = 36064;
					var DEPTH_ATTACHMENT = 36096;
					var STENCIL_ATTACHMENT = 36128;
					var DEPTH_STENCIL_ATTACHMENT = 33306;
					var CLAMP_TO_EDGE = 33071;
					var LINEAR = 9729;
					/**
					* The options for a framebuffer attachment.
					*
					* Note: For a `format` that is a texture include all the texture
					* options from {@link module:twgl.TextureOptions} for example
					* `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
					* `auto` defaults to `false` for attachment textures but `min` and `mag` default
					* to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
					*
					* @typedef {Object} AttachmentOptions
					* @property {number} [attachmentPoint] The attachment point. Defaults
					*   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
					*   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
					*   on the format or attachment type.
					* @property {number} [format] The format. If one of `gl.RGBA4`,
					*   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
					*   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
					*   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
					* @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
					* @property {number} [target] The texture target for `gl.framebufferTexture2D`.
					*   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
					* @property {number} [samples] The number of samples. Default = 1
					* @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
					* @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
					*   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
					* @property {(WebGLRenderbuffer | WebGLTexture)} [attachment] An existing renderbuffer or texture.
					*    If provided will attach this Object. This allows you to share
					*    attachments across framebuffers.
					* @memberOf module:twgl
					* @mixes module:twgl.TextureOptions
					*/
					var defaultAttachments = [{
						format: RGBA,
						type: UNSIGNED_BYTE,
						min: LINEAR,
						wrap: CLAMP_TO_EDGE
					}, { format: DEPTH_STENCIL }];
					var attachmentsByFormat = {};
					attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
					attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
					attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
					attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
					attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
					attachmentsByFormat[DEPTH_COMPONENT24] = DEPTH_ATTACHMENT;
					attachmentsByFormat[DEPTH_COMPONENT32F] = DEPTH_ATTACHMENT;
					attachmentsByFormat[DEPTH24_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
					attachmentsByFormat[DEPTH32F_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
					function getAttachmentPointForFormat(format, internalFormat) {
						return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
					}
					var renderbufferFormats = {};
					renderbufferFormats[RGBA4] = true;
					renderbufferFormats[RGB5_A1] = true;
					renderbufferFormats[RGB565] = true;
					renderbufferFormats[DEPTH_STENCIL] = true;
					renderbufferFormats[DEPTH_COMPONENT16] = true;
					renderbufferFormats[STENCIL_INDEX] = true;
					renderbufferFormats[STENCIL_INDEX8] = true;
					function isRenderbufferFormat(format) {
						return renderbufferFormats[format];
					}
					var MAX_COLOR_ATTACHMENT_POINTS = 32;
					function isColorAttachmentPoint(attachmentPoint) {
						return attachmentPoint >= COLOR_ATTACHMENT0 && attachmentPoint < COLOR_ATTACHMENT0 + MAX_COLOR_ATTACHMENT_POINTS;
					}
					/**
					* @typedef {Object} FramebufferInfo
					* @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
					* @property {Array.<(WebGLRenderbuffer | WebGLTexture)>} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
					* @property {number} width The width of the framebuffer and its attachments
					* @property {number} height The width of the framebuffer and its attachments
					* @memberOf module:twgl
					*/
					/**
					* Creates a framebuffer and attachments.
					*
					* This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
					* It also leaves the framebuffer it just created as the currently bound `FRAMEBUFFER`.
					* Note: If this is WebGL2 or if you called {@link module:twgl.addExtensionsToContext} then it will set the drawBuffers
					* to `[COLOR_ATTACHMENT0, COLOR_ATTACHMENT1, ...]` for how ever many color attachments were created.
					*
					* The simplest usage
					*
					*     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
					*     const fbi = twgl.createFramebufferInfo(gl);
					*
					* More complex usage
					*
					*     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
					*     const attachments = [
					*       { format: RGB565, mag: NEAREST },
					*       { format: STENCIL_INDEX8 },
					*     ]
					*     const fbi = twgl.createFramebufferInfo(gl, attachments);
					*
					* Passing in a specific size
					*
					*     const width = 256;
					*     const height = 256;
					*     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
					*
					* **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
					* [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
					*    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
					* @param {number} [width] the width for the attachments. Default = size of drawingBuffer
					* @param {number} [height] the height for the attachments. Default = size of drawingBuffer
					* @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
					* @memberOf module:twgl/framebuffers
					*/
					function createFramebufferInfo(gl, attachments, width, height) {
						var target = FRAMEBUFFER;
						var fb = gl.createFramebuffer();
						gl.bindFramebuffer(target, fb);
						width = width || gl.drawingBufferWidth;
						height = height || gl.drawingBufferHeight;
						attachments = attachments || defaultAttachments;
						var usedColorAttachmentsPoints = [];
						var framebufferInfo = {
							framebuffer: fb,
							attachments: [],
							width,
							height
						};
						attachments.forEach(function(attachmentOptions, i) {
							var attachment = attachmentOptions.attachment;
							var samples = attachmentOptions.samples;
							var format = attachmentOptions.format;
							var attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
							if (!attachmentPoint) attachmentPoint = COLOR_ATTACHMENT0 + i;
							if (isColorAttachmentPoint(attachmentPoint)) usedColorAttachmentsPoints.push(attachmentPoint);
							if (!attachment) if (samples !== void 0 || isRenderbufferFormat(format)) {
								attachment = gl.createRenderbuffer();
								gl.bindRenderbuffer(RENDERBUFFER, attachment);
								if (samples > 1) gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
								else gl.renderbufferStorage(RENDERBUFFER, format, width, height);
							} else {
								var textureOptions = Object.assign({}, attachmentOptions);
								textureOptions.width = width;
								textureOptions.height = height;
								if (textureOptions.auto === void 0) {
									textureOptions.auto = false;
									textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR;
									textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR;
									textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE;
									textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE;
								}
								attachment = textures.createTexture(gl, textureOptions);
							}
							if (helper.isRenderbuffer(gl, attachment)) gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
							else if (helper.isTexture(gl, attachment)) if (attachmentOptions.layer !== void 0) gl.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
							else gl.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D, attachment, attachmentOptions.level || 0);
							else throw new Error("unknown attachment type");
							framebufferInfo.attachments.push(attachment);
						});
						if (gl.drawBuffers) gl.drawBuffers(usedColorAttachmentsPoints);
						return framebufferInfo;
					}
					/**
					* Resizes the attachments of a framebuffer.
					*
					* You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
					* because TWGL has no idea the format/type of each attachment.
					*
					* The simplest usage
					*
					*     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
					*     const fbi = twgl.createFramebufferInfo(gl);
					*
					*     ...
					*
					*     function render() {
					*       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
					*         // resize the attachments
					*         twgl.resizeFramebufferInfo(gl, fbi);
					*       }
					*
					* More complex usage
					*
					*     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
					*     const attachments = [
					*       { format: RGB565, mag: NEAREST },
					*       { format: STENCIL_INDEX8 },
					*     ]
					*     const fbi = twgl.createFramebufferInfo(gl, attachments);
					*
					*     ...
					*
					*     function render() {
					*       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
					*         // resize the attachments to match
					*         twgl.resizeFramebufferInfo(gl, fbi, attachments);
					*       }
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
					* @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
					* @param {number} [width] the width for the attachments. Default = size of drawingBuffer
					* @param {number} [height] the height for the attachments. Default = size of drawingBuffer
					* @memberOf module:twgl/framebuffers
					*/
					function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
						width = width || gl.drawingBufferWidth;
						height = height || gl.drawingBufferHeight;
						framebufferInfo.width = width;
						framebufferInfo.height = height;
						attachments = attachments || defaultAttachments;
						attachments.forEach(function(attachmentOptions, ndx) {
							var attachment = framebufferInfo.attachments[ndx];
							var format = attachmentOptions.format;
							var samples = attachmentOptions.samples;
							if (samples !== void 0 || helper.isRenderbuffer(gl, attachment)) {
								gl.bindRenderbuffer(RENDERBUFFER, attachment);
								if (samples > 1) gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
								else gl.renderbufferStorage(RENDERBUFFER, format, width, height);
							} else if (helper.isTexture(gl, attachment)) textures.resizeTexture(gl, attachment, attachmentOptions, width, height);
							else throw new Error("unknown attachment type");
						});
					}
					/**
					* Binds a framebuffer
					*
					* This function pretty much solely exists because I spent hours
					* trying to figure out why something I wrote wasn't working only
					* to realize I forget to set the viewport dimensions.
					* My hope is this function will fix that.
					*
					* It is effectively the same as
					*
					*     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
					*     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
					*   If falsy will bind the canvas.
					* @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
					* @memberOf module:twgl/framebuffers
					*/
					function bindFramebufferInfo(gl, framebufferInfo, target) {
						target = target || FRAMEBUFFER;
						if (framebufferInfo) {
							gl.bindFramebuffer(target, framebufferInfo.framebuffer);
							gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
						} else {
							gl.bindFramebuffer(target, null);
							gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
						}
					}
				}),
				"./src/helper.js": ((__unused_webpack_module, exports$4) => {
					exports$4.__esModule = true;
					exports$4.copyExistingProperties = copyExistingProperties;
					exports$4.copyNamedProperties = copyNamedProperties;
					exports$4.error = error;
					exports$4.isBuffer = isBuffer;
					exports$4.isRenderbuffer = isRenderbuffer;
					exports$4.isSampler = isSampler;
					exports$4.isShader = isShader;
					exports$4.isTexture = isTexture;
					exports$4.warn = warn;
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					/**
					* Copy named properties
					*
					* @param {string[]} names names of properties to copy
					* @param {object} src object to copy properties from
					* @param {object} dst object to copy properties to
					* @private
					*/
					function copyNamedProperties(names, src, dst) {
						names.forEach(function(name) {
							var value = src[name];
							if (value !== void 0) dst[name] = value;
						});
					}
					/**
					* Copies properties from source to dest only if a matching key is in dest
					*
					* @param {Object.<string, ?>} src the source
					* @param {Object.<string, ?>} dst the dest
					* @private
					*/
					function copyExistingProperties(src, dst) {
						Object.keys(dst).forEach(function(key) {
							if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) dst[key] = src[key];
						});
					}
					function error() {
						var _console;
						(_console = console).error.apply(_console, arguments);
					}
					function warn() {
						var _console2;
						(_console2 = console).warn.apply(_console2, arguments);
					}
					var isTypeWeakMaps = /* @__PURE__ */ new Map();
					function isType(object, type) {
						if (!object || _typeof(object) !== "object") return false;
						var weakMap = isTypeWeakMaps.get(type);
						if (!weakMap) {
							weakMap = /* @__PURE__ */ new WeakMap();
							isTypeWeakMaps.set(type, weakMap);
						}
						var isOfType = weakMap.get(object);
						if (isOfType === void 0) {
							var s = Object.prototype.toString.call(object);
							isOfType = s.substring(8, s.length - 1) === type;
							weakMap.set(object, isOfType);
						}
						return isOfType;
					}
					function isBuffer(gl, t) {
						return typeof WebGLBuffer !== "undefined" && isType(t, "WebGLBuffer");
					}
					function isRenderbuffer(gl, t) {
						return typeof WebGLRenderbuffer !== "undefined" && isType(t, "WebGLRenderbuffer");
					}
					function isShader(gl, t) {
						return typeof WebGLShader !== "undefined" && isType(t, "WebGLShader");
					}
					function isTexture(gl, t) {
						return typeof WebGLTexture !== "undefined" && isType(t, "WebGLTexture");
					}
					function isSampler(gl, t) {
						return typeof WebGLSampler !== "undefined" && isType(t, "WebGLSampler");
					}
				}),
				"./src/m4.js": ((__unused_webpack_module, exports$5, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$5.__esModule = true;
					exports$5.axisRotate = axisRotate;
					exports$5.axisRotation = axisRotation;
					exports$5.copy = copy;
					exports$5.create = create;
					exports$5.frustum = frustum;
					exports$5.getAxis = getAxis;
					exports$5.getTranslation = getTranslation;
					exports$5.identity = identity;
					exports$5.inverse = inverse;
					exports$5.lookAt = lookAt;
					exports$5.multiply = multiply;
					exports$5.negate = negate;
					exports$5.ortho = ortho;
					exports$5.perspective = perspective;
					exports$5.rotateX = rotateX;
					exports$5.rotateY = rotateY;
					exports$5.rotateZ = rotateZ;
					exports$5.rotationX = rotationX;
					exports$5.rotationY = rotationY;
					exports$5.rotationZ = rotationZ;
					exports$5.scale = scale;
					exports$5.scaling = scaling;
					exports$5.setAxis = setAxis;
					exports$5.setDefaultType = setDefaultType;
					exports$5.setTranslation = setTranslation;
					exports$5.transformDirection = transformDirection;
					exports$5.transformNormal = transformNormal;
					exports$5.transformPoint = transformPoint;
					exports$5.translate = translate;
					exports$5.translation = translation;
					exports$5.transpose = transpose;
					var v3 = _interopRequireWildcard(__webpack_require__(
						/*! ./v3.js */
						"./src/v3.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					/**
					* 4x4 Matrix math math functions.
					*
					* Almost all functions take an optional `dst` argument. If it is not passed in the
					* functions will create a new matrix. In other words you can do this
					*
					*     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
					*
					* or
					*
					*     const mat = m4.create();
					*     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
					*
					* The first style is often easier but depending on where it's used it generates garbage where
					* as there is almost never allocation with the second style.
					*
					* It is always save to pass any matrix as the destination. So for example
					*
					*     const mat = m4.identity();
					*     const trans = m4.translation([1, 2, 3]);
					*     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
					*
					* @module twgl/m4
					*/
					var MatType = Float32Array;
					/**
					* A JavaScript array with 16 values or a Float32Array with 16 values.
					* When created by the library will create the default type which is `Float32Array`
					* but can be set by calling {@link module:twgl/m4.setDefaultType}.
					* @typedef {(number[]|Float32Array)} Mat4
					* @memberOf module:twgl/m4
					*/
					/**
					* Sets the type this library creates for a Mat4
					* @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
					* @return {constructor} previous constructor for Mat4
					* @memberOf module:twgl/m4
					*/
					function setDefaultType(ctor) {
						var oldType = MatType;
						MatType = ctor;
						return oldType;
					}
					/**
					* Negates a matrix.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} -m.
					* @memberOf module:twgl/m4
					*/
					function negate(m, dst) {
						dst = dst || new MatType(16);
						dst[0] = -m[0];
						dst[1] = -m[1];
						dst[2] = -m[2];
						dst[3] = -m[3];
						dst[4] = -m[4];
						dst[5] = -m[5];
						dst[6] = -m[6];
						dst[7] = -m[7];
						dst[8] = -m[8];
						dst[9] = -m[9];
						dst[10] = -m[10];
						dst[11] = -m[11];
						dst[12] = -m[12];
						dst[13] = -m[13];
						dst[14] = -m[14];
						dst[15] = -m[15];
						return dst;
					}
					/**
					* Creates a matrix.
					* @return {module:twgl/m4.Mat4} A new matrix.
					* @memberOf module:twgl/m4
					*/
					function create() {
						return new MatType(16).fill(0);
					}
					/**
					* Copies a matrix.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} A copy of m.
					* @memberOf module:twgl/m4
					*/
					function copy(m, dst) {
						dst = dst || new MatType(16);
						dst[0] = m[0];
						dst[1] = m[1];
						dst[2] = m[2];
						dst[3] = m[3];
						dst[4] = m[4];
						dst[5] = m[5];
						dst[6] = m[6];
						dst[7] = m[7];
						dst[8] = m[8];
						dst[9] = m[9];
						dst[10] = m[10];
						dst[11] = m[11];
						dst[12] = m[12];
						dst[13] = m[13];
						dst[14] = m[14];
						dst[15] = m[15];
						return dst;
					}
					/**
					* Creates an n-by-n identity matrix.
					*
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
					* @memberOf module:twgl/m4
					*/
					function identity(dst) {
						dst = dst || new MatType(16);
						dst[0] = 1;
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = 1;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = 1;
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Takes the transpose of a matrix.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The transpose of m.
					* @memberOf module:twgl/m4
					*/
					function transpose(m, dst) {
						dst = dst || new MatType(16);
						if (dst === m) {
							var t = m[1];
							m[1] = m[4];
							m[4] = t;
							t = m[2];
							m[2] = m[8];
							m[8] = t;
							t = m[3];
							m[3] = m[12];
							m[12] = t;
							t = m[6];
							m[6] = m[9];
							m[9] = t;
							t = m[7];
							m[7] = m[13];
							m[13] = t;
							t = m[11];
							m[11] = m[14];
							m[14] = t;
							return dst;
						}
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						var m30 = m[12];
						var m31 = m[13];
						var m32 = m[14];
						var m33 = m[15];
						dst[0] = m00;
						dst[1] = m10;
						dst[2] = m20;
						dst[3] = m30;
						dst[4] = m01;
						dst[5] = m11;
						dst[6] = m21;
						dst[7] = m31;
						dst[8] = m02;
						dst[9] = m12;
						dst[10] = m22;
						dst[11] = m32;
						dst[12] = m03;
						dst[13] = m13;
						dst[14] = m23;
						dst[15] = m33;
						return dst;
					}
					/**
					* Computes the inverse of a 4-by-4 matrix.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The inverse of m.
					* @memberOf module:twgl/m4
					*/
					function inverse(m, dst) {
						dst = dst || new MatType(16);
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						var m30 = m[12];
						var m31 = m[13];
						var m32 = m[14];
						var m33 = m[15];
						var tmp_0 = m22 * m33;
						var tmp_1 = m32 * m23;
						var tmp_2 = m12 * m33;
						var tmp_3 = m32 * m13;
						var tmp_4 = m12 * m23;
						var tmp_5 = m22 * m13;
						var tmp_6 = m02 * m33;
						var tmp_7 = m32 * m03;
						var tmp_8 = m02 * m23;
						var tmp_9 = m22 * m03;
						var tmp_10 = m02 * m13;
						var tmp_11 = m12 * m03;
						var tmp_12 = m20 * m31;
						var tmp_13 = m30 * m21;
						var tmp_14 = m10 * m31;
						var tmp_15 = m30 * m11;
						var tmp_16 = m10 * m21;
						var tmp_17 = m20 * m11;
						var tmp_18 = m00 * m31;
						var tmp_19 = m30 * m01;
						var tmp_20 = m00 * m21;
						var tmp_21 = m20 * m01;
						var tmp_22 = m00 * m11;
						var tmp_23 = m10 * m01;
						var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
						var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
						var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
						var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
						var d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
						dst[0] = d * t0;
						dst[1] = d * t1;
						dst[2] = d * t2;
						dst[3] = d * t3;
						dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
						dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
						dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
						dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
						dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
						dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
						dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
						dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
						dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
						dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
						dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
						dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
						return dst;
					}
					/**
					* Multiplies two 4-by-4 matrices with a on the left and b on the right
					* @param {module:twgl/m4.Mat4} a The matrix on the left.
					* @param {module:twgl/m4.Mat4} b The matrix on the right.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The matrix product of a and b.
					* @memberOf module:twgl/m4
					*/
					function multiply(a, b, dst) {
						dst = dst || new MatType(16);
						var a00 = a[0];
						var a01 = a[1];
						var a02 = a[2];
						var a03 = a[3];
						var a10 = a[4];
						var a11 = a[5];
						var a12 = a[6];
						var a13 = a[7];
						var a20 = a[8];
						var a21 = a[9];
						var a22 = a[10];
						var a23 = a[11];
						var a30 = a[12];
						var a31 = a[13];
						var a32 = a[14];
						var a33 = a[15];
						var b00 = b[0];
						var b01 = b[1];
						var b02 = b[2];
						var b03 = b[3];
						var b10 = b[4];
						var b11 = b[5];
						var b12 = b[6];
						var b13 = b[7];
						var b20 = b[8];
						var b21 = b[9];
						var b22 = b[10];
						var b23 = b[11];
						var b30 = b[12];
						var b31 = b[13];
						var b32 = b[14];
						var b33 = b[15];
						dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
						dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
						dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
						dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
						dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
						dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
						dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
						dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
						dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
						dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
						dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
						dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
						dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
						dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
						dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
						dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
						return dst;
					}
					/**
					* Sets the translation component of a 4-by-4 matrix to the given
					* vector.
					* @param {module:twgl/m4.Mat4} a The matrix.
					* @param {module:twgl/v3.Vec3} v The vector.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The matrix with translation set.
					* @memberOf module:twgl/m4
					*/
					function setTranslation(a, v, dst) {
						dst = dst || identity();
						if (a !== dst) {
							dst[0] = a[0];
							dst[1] = a[1];
							dst[2] = a[2];
							dst[3] = a[3];
							dst[4] = a[4];
							dst[5] = a[5];
							dst[6] = a[6];
							dst[7] = a[7];
							dst[8] = a[8];
							dst[9] = a[9];
							dst[10] = a[10];
							dst[11] = a[11];
						}
						dst[12] = v[0];
						dst[13] = v[1];
						dst[14] = v[2];
						dst[15] = 1;
						return dst;
					}
					/**
					* Returns the translation component of a 4-by-4 matrix as a vector with 3
					* entries.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
					* @return {module:twgl/v3.Vec3} The translation component of m.
					* @memberOf module:twgl/m4
					*/
					function getTranslation(m, dst) {
						dst = dst || v3.create();
						dst[0] = m[12];
						dst[1] = m[13];
						dst[2] = m[14];
						return dst;
					}
					/**
					* Returns an axis of a 4x4 matrix as a vector with 3 entries
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {number} axis The axis 0 = x, 1 = y, 2 = z;
					* @return {module:twgl/v3.Vec3} [dst] vector.
					* @return {module:twgl/v3.Vec3} The axis component of m.
					* @memberOf module:twgl/m4
					*/
					function getAxis(m, axis, dst) {
						dst = dst || v3.create();
						var off = axis * 4;
						dst[0] = m[off + 0];
						dst[1] = m[off + 1];
						dst[2] = m[off + 2];
						return dst;
					}
					/**
					* Sets an axis of a 4x4 matrix as a vector with 3 entries
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} v the axis vector
					* @param {number} axis The axis  0 = x, 1 = y, 2 = z;
					* @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The matrix with axis set.
					* @memberOf module:twgl/m4
					*/
					function setAxis(a, v, axis, dst) {
						if (dst !== a) dst = copy(a, dst);
						var off = axis * 4;
						dst[off + 0] = v[0];
						dst[off + 1] = v[1];
						dst[off + 2] = v[2];
						return dst;
					}
					/**
					* Computes a 4-by-4 perspective transformation matrix given the angular height
					* of the frustum, the aspect ratio, and the near and far clipping planes.  The
					* arguments define a frustum extending in the negative z direction.  The given
					* angle is the vertical angle of the frustum, and the horizontal angle is
					* determined to produce the given aspect ratio.  The arguments near and far are
					* the distances to the near and far clipping planes.  Note that near and far
					* are not z coordinates, but rather they are distances along the negative
					* z-axis.  The matrix generated sends the viewing frustum to the unit box.
					* We assume a unit box extending from -1 to 1 in the x and y dimensions and
					* from 0 to 1 in the z dimension.
					* @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
					* @param {number} aspect The aspect ratio width / height.
					* @param {number} zNear The depth (negative z coordinate)
					*     of the near clipping plane.
					* @param {number} zFar The depth (negative z coordinate)
					*     of the far clipping plane.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The perspective matrix.
					* @memberOf module:twgl/m4
					*/
					function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
						dst = dst || new MatType(16);
						var f = Math.tan(Math.PI * .5 - .5 * fieldOfViewYInRadians);
						var rangeInv = 1 / (zNear - zFar);
						dst[0] = f / aspect;
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = f;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = (zNear + zFar) * rangeInv;
						dst[11] = -1;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = zNear * zFar * rangeInv * 2;
						dst[15] = 0;
						return dst;
					}
					/**
					* Computes a 4-by-4 orthogonal transformation matrix given the left, right,
					* bottom, and top dimensions of the near clipping plane as well as the
					* near and far clipping plane distances.
					* @param {number} left Left side of the near clipping plane viewport.
					* @param {number} right Right side of the near clipping plane viewport.
					* @param {number} bottom Bottom of the near clipping plane viewport.
					* @param {number} top Top of the near clipping plane viewport.
					* @param {number} near The depth (negative z coordinate)
					*     of the near clipping plane.
					* @param {number} far The depth (negative z coordinate)
					*     of the far clipping plane.
					* @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The perspective matrix.
					* @memberOf module:twgl/m4
					*/
					function ortho(left, right, bottom, top, near, far, dst) {
						dst = dst || new MatType(16);
						dst[0] = 2 / (right - left);
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = 2 / (top - bottom);
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = 2 / (near - far);
						dst[11] = 0;
						dst[12] = (right + left) / (left - right);
						dst[13] = (top + bottom) / (bottom - top);
						dst[14] = (far + near) / (near - far);
						dst[15] = 1;
						return dst;
					}
					/**
					* Computes a 4-by-4 perspective transformation matrix given the left, right,
					* top, bottom, near and far clipping planes. The arguments define a frustum
					* extending in the negative z direction. The arguments near and far are the
					* distances to the near and far clipping planes. Note that near and far are not
					* z coordinates, but rather they are distances along the negative z-axis. The
					* matrix generated sends the viewing frustum to the unit box. We assume a unit
					* box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
					* dimension.
					* @param {number} left The x coordinate of the left plane of the box.
					* @param {number} right The x coordinate of the right plane of the box.
					* @param {number} bottom The y coordinate of the bottom plane of the box.
					* @param {number} top The y coordinate of the right plane of the box.
					* @param {number} near The negative z coordinate of the near plane of the box.
					* @param {number} far The negative z coordinate of the far plane of the box.
					* @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The perspective projection matrix.
					* @memberOf module:twgl/m4
					*/
					function frustum(left, right, bottom, top, near, far, dst) {
						dst = dst || new MatType(16);
						var dx = right - left;
						var dy = top - bottom;
						var dz = near - far;
						dst[0] = 2 * near / dx;
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = 2 * near / dy;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = (left + right) / dx;
						dst[9] = (top + bottom) / dy;
						dst[10] = far / dz;
						dst[11] = -1;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = near * far / dz;
						dst[15] = 0;
						return dst;
					}
					var xAxis;
					var yAxis;
					var zAxis;
					/**
					* Computes a 4-by-4 look-at transformation.
					*
					* This is a matrix which positions the camera itself. If you want
					* a view matrix (a matrix which moves things in front of the camera)
					* take the inverse of this.
					*
					* @param {module:twgl/v3.Vec3} eye The position of the eye.
					* @param {module:twgl/v3.Vec3} target The position meant to be viewed.
					* @param {module:twgl/v3.Vec3} up A vector pointing up.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The look-at matrix.
					* @memberOf module:twgl/m4
					*/
					function lookAt(eye, target, up, dst) {
						dst = dst || new MatType(16);
						xAxis = xAxis || v3.create();
						yAxis = yAxis || v3.create();
						zAxis = zAxis || v3.create();
						v3.normalize(v3.subtract(eye, target, zAxis), zAxis);
						v3.normalize(v3.cross(up, zAxis, xAxis), xAxis);
						v3.normalize(v3.cross(zAxis, xAxis, yAxis), yAxis);
						dst[0] = xAxis[0];
						dst[1] = xAxis[1];
						dst[2] = xAxis[2];
						dst[3] = 0;
						dst[4] = yAxis[0];
						dst[5] = yAxis[1];
						dst[6] = yAxis[2];
						dst[7] = 0;
						dst[8] = zAxis[0];
						dst[9] = zAxis[1];
						dst[10] = zAxis[2];
						dst[11] = 0;
						dst[12] = eye[0];
						dst[13] = eye[1];
						dst[14] = eye[2];
						dst[15] = 1;
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which translates by the given vector v.
					* @param {module:twgl/v3.Vec3} v The vector by
					*     which to translate.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The translation matrix.
					* @memberOf module:twgl/m4
					*/
					function translation(v, dst) {
						dst = dst || new MatType(16);
						dst[0] = 1;
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = 1;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = 1;
						dst[11] = 0;
						dst[12] = v[0];
						dst[13] = v[1];
						dst[14] = v[2];
						dst[15] = 1;
						return dst;
					}
					/**
					* Translates the given 4-by-4 matrix by the given vector v.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} v The vector by
					*     which to translate.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The translated matrix.
					* @memberOf module:twgl/m4
					*/
					function translate(m, v, dst) {
						dst = dst || new MatType(16);
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						var m30 = m[12];
						var m31 = m[13];
						var m32 = m[14];
						var m33 = m[15];
						if (m !== dst) {
							dst[0] = m00;
							dst[1] = m01;
							dst[2] = m02;
							dst[3] = m03;
							dst[4] = m10;
							dst[5] = m11;
							dst[6] = m12;
							dst[7] = m13;
							dst[8] = m20;
							dst[9] = m21;
							dst[10] = m22;
							dst[11] = m23;
						}
						dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
						dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
						dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
						dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotation matrix.
					* @memberOf module:twgl/m4
					*/
					function rotationX(angleInRadians, dst) {
						dst = dst || new MatType(16);
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[0] = 1;
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = c;
						dst[6] = s;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = -s;
						dst[10] = c;
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Rotates the given 4-by-4 matrix around the x-axis by the given
					* angle.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotated matrix.
					* @memberOf module:twgl/m4
					*/
					function rotateX(m, angleInRadians, dst) {
						dst = dst || new MatType(16);
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[4] = c * m10 + s * m20;
						dst[5] = c * m11 + s * m21;
						dst[6] = c * m12 + s * m22;
						dst[7] = c * m13 + s * m23;
						dst[8] = c * m20 - s * m10;
						dst[9] = c * m21 - s * m11;
						dst[10] = c * m22 - s * m12;
						dst[11] = c * m23 - s * m13;
						if (m !== dst) {
							dst[0] = m[0];
							dst[1] = m[1];
							dst[2] = m[2];
							dst[3] = m[3];
							dst[12] = m[12];
							dst[13] = m[13];
							dst[14] = m[14];
							dst[15] = m[15];
						}
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotation matrix.
					* @memberOf module:twgl/m4
					*/
					function rotationY(angleInRadians, dst) {
						dst = dst || new MatType(16);
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[0] = c;
						dst[1] = 0;
						dst[2] = -s;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = 1;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = s;
						dst[9] = 0;
						dst[10] = c;
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Rotates the given 4-by-4 matrix around the y-axis by the given
					* angle.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotated matrix.
					* @memberOf module:twgl/m4
					*/
					function rotateY(m, angleInRadians, dst) {
						dst = dst || new MatType(16);
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[0] = c * m00 - s * m20;
						dst[1] = c * m01 - s * m21;
						dst[2] = c * m02 - s * m22;
						dst[3] = c * m03 - s * m23;
						dst[8] = c * m20 + s * m00;
						dst[9] = c * m21 + s * m01;
						dst[10] = c * m22 + s * m02;
						dst[11] = c * m23 + s * m03;
						if (m !== dst) {
							dst[4] = m[4];
							dst[5] = m[5];
							dst[6] = m[6];
							dst[7] = m[7];
							dst[12] = m[12];
							dst[13] = m[13];
							dst[14] = m[14];
							dst[15] = m[15];
						}
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotation matrix.
					* @memberOf module:twgl/m4
					*/
					function rotationZ(angleInRadians, dst) {
						dst = dst || new MatType(16);
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[0] = c;
						dst[1] = s;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = -s;
						dst[5] = c;
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = 1;
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Rotates the given 4-by-4 matrix around the z-axis by the given
					* angle.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotated matrix.
					* @memberOf module:twgl/m4
					*/
					function rotateZ(m, angleInRadians, dst) {
						dst = dst || new MatType(16);
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						dst[0] = c * m00 + s * m10;
						dst[1] = c * m01 + s * m11;
						dst[2] = c * m02 + s * m12;
						dst[3] = c * m03 + s * m13;
						dst[4] = c * m10 - s * m00;
						dst[5] = c * m11 - s * m01;
						dst[6] = c * m12 - s * m02;
						dst[7] = c * m13 - s * m03;
						if (m !== dst) {
							dst[8] = m[8];
							dst[9] = m[9];
							dst[10] = m[10];
							dst[11] = m[11];
							dst[12] = m[12];
							dst[13] = m[13];
							dst[14] = m[14];
							dst[15] = m[15];
						}
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which rotates around the given axis by the given
					* angle.
					* @param {module:twgl/v3.Vec3} axis The axis
					*     about which to rotate.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
					*     around the axis.
					* @memberOf module:twgl/m4
					*/
					function axisRotation(axis, angleInRadians, dst) {
						dst = dst || new MatType(16);
						var x = axis[0];
						var y = axis[1];
						var z = axis[2];
						var n = Math.sqrt(x * x + y * y + z * z);
						x /= n;
						y /= n;
						z /= n;
						var xx = x * x;
						var yy = y * y;
						var zz = z * z;
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						var oneMinusCosine = 1 - c;
						dst[0] = xx + (1 - xx) * c;
						dst[1] = x * y * oneMinusCosine + z * s;
						dst[2] = x * z * oneMinusCosine - y * s;
						dst[3] = 0;
						dst[4] = x * y * oneMinusCosine - z * s;
						dst[5] = yy + (1 - yy) * c;
						dst[6] = y * z * oneMinusCosine + x * s;
						dst[7] = 0;
						dst[8] = x * z * oneMinusCosine + y * s;
						dst[9] = y * z * oneMinusCosine - x * s;
						dst[10] = zz + (1 - zz) * c;
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Rotates the given 4-by-4 matrix around the given axis by the
					* given angle.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} axis The axis
					*     about which to rotate.
					* @param {number} angleInRadians The angle by which to rotate (in radians).
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The rotated matrix.
					* @memberOf module:twgl/m4
					*/
					function axisRotate(m, axis, angleInRadians, dst) {
						dst = dst || new MatType(16);
						var x = axis[0];
						var y = axis[1];
						var z = axis[2];
						var n = Math.sqrt(x * x + y * y + z * z);
						x /= n;
						y /= n;
						z /= n;
						var xx = x * x;
						var yy = y * y;
						var zz = z * z;
						var c = Math.cos(angleInRadians);
						var s = Math.sin(angleInRadians);
						var oneMinusCosine = 1 - c;
						var r00 = xx + (1 - xx) * c;
						var r01 = x * y * oneMinusCosine + z * s;
						var r02 = x * z * oneMinusCosine - y * s;
						var r10 = x * y * oneMinusCosine - z * s;
						var r11 = yy + (1 - yy) * c;
						var r12 = y * z * oneMinusCosine + x * s;
						var r20 = x * z * oneMinusCosine + y * s;
						var r21 = y * z * oneMinusCosine - x * s;
						var r22 = zz + (1 - zz) * c;
						var m00 = m[0];
						var m01 = m[1];
						var m02 = m[2];
						var m03 = m[3];
						var m10 = m[4];
						var m11 = m[5];
						var m12 = m[6];
						var m13 = m[7];
						var m20 = m[8];
						var m21 = m[9];
						var m22 = m[10];
						var m23 = m[11];
						dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
						dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
						dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
						dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
						dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
						dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
						dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
						dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
						dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
						dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
						dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
						dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
						if (m !== dst) {
							dst[12] = m[12];
							dst[13] = m[13];
							dst[14] = m[14];
							dst[15] = m[15];
						}
						return dst;
					}
					/**
					* Creates a 4-by-4 matrix which scales in each dimension by an amount given by
					* the corresponding entry in the given vector; assumes the vector has three
					* entries.
					* @param {module:twgl/v3.Vec3} v A vector of
					*     three entries specifying the factor by which to scale in each dimension.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The scaling matrix.
					* @memberOf module:twgl/m4
					*/
					function scaling(v, dst) {
						dst = dst || new MatType(16);
						dst[0] = v[0];
						dst[1] = 0;
						dst[2] = 0;
						dst[3] = 0;
						dst[4] = 0;
						dst[5] = v[1];
						dst[6] = 0;
						dst[7] = 0;
						dst[8] = 0;
						dst[9] = 0;
						dst[10] = v[2];
						dst[11] = 0;
						dst[12] = 0;
						dst[13] = 0;
						dst[14] = 0;
						dst[15] = 1;
						return dst;
					}
					/**
					* Scales the given 4-by-4 matrix in each dimension by an amount
					* given by the corresponding entry in the given vector; assumes the vector has
					* three entries.
					* @param {module:twgl/m4.Mat4} m The matrix to be modified.
					* @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
					*     factor by which to scale in each dimension.
					* @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
					* @return {module:twgl/m4.Mat4} The scaled matrix.
					* @memberOf module:twgl/m4
					*/
					function scale(m, v, dst) {
						dst = dst || new MatType(16);
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						dst[0] = v0 * m[0];
						dst[1] = v0 * m[1];
						dst[2] = v0 * m[2];
						dst[3] = v0 * m[3];
						dst[4] = v1 * m[4];
						dst[5] = v1 * m[5];
						dst[6] = v1 * m[6];
						dst[7] = v1 * m[7];
						dst[8] = v2 * m[8];
						dst[9] = v2 * m[9];
						dst[10] = v2 * m[10];
						dst[11] = v2 * m[11];
						if (m !== dst) {
							dst[12] = m[12];
							dst[13] = m[13];
							dst[14] = m[14];
							dst[15] = m[15];
						}
						return dst;
					}
					/**
					* Takes a 4-by-4 matrix and a vector with 3 entries,
					* interprets the vector as a point, transforms that point by the matrix, and
					* returns the result as a vector with 3 entries.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} v The point.
					* @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
					* @return {module:twgl/v3.Vec3} The transformed point.
					* @memberOf module:twgl/m4
					*/
					function transformPoint(m, v, dst) {
						dst = dst || v3.create();
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						var d = v0 * m[3] + v1 * m[7] + v2 * m[11] + m[15];
						dst[0] = (v0 * m[0] + v1 * m[4] + v2 * m[8] + m[12]) / d;
						dst[1] = (v0 * m[1] + v1 * m[5] + v2 * m[9] + m[13]) / d;
						dst[2] = (v0 * m[2] + v1 * m[6] + v2 * m[10] + m[14]) / d;
						return dst;
					}
					/**
					* Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
					* direction, transforms that direction by the matrix, and returns the result;
					* assumes the transformation of 3-dimensional space represented by the matrix
					* is parallel-preserving, i.e. any combination of rotation, scaling and
					* translation, but not a perspective distortion. Returns a vector with 3
					* entries.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} v The direction.
					* @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
					* @return {module:twgl/v3.Vec3} The transformed direction.
					* @memberOf module:twgl/m4
					*/
					function transformDirection(m, v, dst) {
						dst = dst || v3.create();
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						dst[0] = v0 * m[0] + v1 * m[4] + v2 * m[8];
						dst[1] = v0 * m[1] + v1 * m[5] + v2 * m[9];
						dst[2] = v0 * m[2] + v1 * m[6] + v2 * m[10];
						return dst;
					}
					/**
					* Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
					* as a normal to a surface, and computes a vector which is normal upon
					* transforming that surface by the matrix. The effect of this function is the
					* same as transforming v (as a direction) by the inverse-transpose of m.  This
					* function assumes the transformation of 3-dimensional space represented by the
					* matrix is parallel-preserving, i.e. any combination of rotation, scaling and
					* translation, but not a perspective distortion.  Returns a vector with 3
					* entries.
					* @param {module:twgl/m4.Mat4} m The matrix.
					* @param {module:twgl/v3.Vec3} v The normal.
					* @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
					* @return {module:twgl/v3.Vec3} The transformed normal.
					* @memberOf module:twgl/m4
					*/
					function transformNormal(m, v, dst) {
						dst = dst || v3.create();
						var mi = inverse(m);
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
						dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
						dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
						return dst;
					}
				}),
				"./src/primitives.js": ((__unused_webpack_module, exports$6, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$6.__esModule = true;
					exports$6.concatVertices = concatVertices;
					exports$6.create3DFBuffers = exports$6.create3DFBufferInfo = void 0;
					exports$6.create3DFVertices = create3DFVertices;
					exports$6.createAugmentedTypedArray = createAugmentedTypedArray;
					exports$6.createCrescentBuffers = exports$6.createCrescentBufferInfo = void 0;
					exports$6.createCrescentVertices = createCrescentVertices;
					exports$6.createCubeBuffers = exports$6.createCubeBufferInfo = exports$6.createCresentVertices = exports$6.createCresentBuffers = exports$6.createCresentBufferInfo = void 0;
					exports$6.createCubeVertices = createCubeVertices;
					exports$6.createCylinderBuffers = exports$6.createCylinderBufferInfo = void 0;
					exports$6.createCylinderVertices = createCylinderVertices;
					exports$6.createDiscBuffers = exports$6.createDiscBufferInfo = void 0;
					exports$6.createDiscVertices = createDiscVertices;
					exports$6.createPlaneBuffers = exports$6.createPlaneBufferInfo = void 0;
					exports$6.createPlaneVertices = createPlaneVertices;
					exports$6.createSphereBuffers = exports$6.createSphereBufferInfo = void 0;
					exports$6.createSphereVertices = createSphereVertices;
					exports$6.createTorusBuffers = exports$6.createTorusBufferInfo = void 0;
					exports$6.createTorusVertices = createTorusVertices;
					exports$6.createTruncatedConeBuffers = exports$6.createTruncatedConeBufferInfo = void 0;
					exports$6.createTruncatedConeVertices = createTruncatedConeVertices;
					exports$6.createXYQuadBuffers = exports$6.createXYQuadBufferInfo = void 0;
					exports$6.createXYQuadVertices = createXYQuadVertices;
					exports$6.deindexVertices = deindexVertices;
					exports$6.duplicateVertices = duplicateVertices;
					exports$6.flattenNormals = flattenNormals;
					exports$6.makeRandomVertexColors = makeRandomVertexColors;
					exports$6.reorientDirections = reorientDirections;
					exports$6.reorientNormals = reorientNormals;
					exports$6.reorientPositions = reorientPositions;
					exports$6.reorientVertices = reorientVertices;
					var attributes = _interopRequireWildcard(__webpack_require__(
						/*! ./attributes.js */
						"./src/attributes.js"
					));
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					var typedArrays = _interopRequireWildcard(__webpack_require__(
						/*! ./typedarrays.js */
						"./src/typedarrays.js"
					));
					var m4 = _interopRequireWildcard(__webpack_require__(
						/*! ./m4.js */
						"./src/m4.js"
					));
					var v3 = _interopRequireWildcard(__webpack_require__(
						/*! ./v3.js */
						"./src/v3.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					/**
					* Various functions to make simple primitives
					*
					* note: Most primitive functions come in 3 styles
					*
					* *  `createSomeShapeBufferInfo`
					*
					*    These functions are almost always the functions you want to call. They
					*    create vertices then make WebGLBuffers and create {@link module:twgl.AttribInfo}s
					*    returning a {@link module:twgl.BufferInfo} you can pass to {@link module:twgl.setBuffersAndAttributes}
					*    and {@link module:twgl.drawBufferInfo} etc...
					*
					* *  `createSomeShapeBuffers`
					*
					*    These create WebGLBuffers and put your data in them but nothing else.
					*    It's a shortcut to doing it yourself if you don't want to use
					*    the higher level functions.
					*
					* *  `createSomeShapeVertices`
					*
					*    These just create vertices, no buffers. This allows you to manipulate the vertices
					*    or add more data before generating a {@link module:twgl.BufferInfo}. Once you're finished
					*    manipulating the vertices call {@link module:twgl.createBufferInfoFromArrays}.
					*
					*    example:
					*
					*        const arrays = twgl.primitives.createPlaneVertices(1);
					*        twgl.primitives.reorientVertices(arrays, m4.rotationX(Math.PI * 0.5));
					*        const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
					*
					* @module twgl/primitives
					*/
					var getArray = attributes.getArray_;
					var getNumComponents = attributes.getNumComponents_;
					/**
					* @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
					*/
					/**
					* Add `push` to a typed array. It just keeps a 'cursor'
					* and allows use to `push` values into the array so we
					* don't have to manually compute offsets
					* @param {TypedArray} typedArray TypedArray to augment
					* @param {number} numComponents number of components.
					* @private
					*/
					function augmentTypedArray(typedArray, numComponents) {
						var cursor = 0;
						typedArray.push = function() {
							for (var ii = 0; ii < arguments.length; ++ii) {
								var value = arguments[ii];
								if (value instanceof Array || typedArrays.isArrayBuffer(value)) for (var jj = 0; jj < value.length; ++jj) typedArray[cursor++] = value[jj];
								else typedArray[cursor++] = value;
							}
						};
						typedArray.reset = function(opt_index) {
							cursor = opt_index || 0;
						};
						typedArray.numComponents = numComponents;
						Object.defineProperty(typedArray, "numElements", { get: function get() {
							return this.length / this.numComponents | 0;
						} });
						return typedArray;
					}
					/**
					* creates a typed array with a `push` function attached
					* so that you can easily *push* values.
					*
					* `push` can take multiple arguments. If an argument is an array each element
					* of the array will be added to the typed array.
					*
					* Example:
					*
					*     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
					*     array.push(1, 2, 3);
					*     array.push([4, 5, 6]);
					*     // array now contains [1, 2, 3, 4, 5, 6]
					*
					* Also has `numComponents` and `numElements` properties.
					*
					* @param {number} numComponents number of components
					* @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
					* @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
					* @return {ArrayBufferView} A typed array.
					* @memberOf module:twgl/primitives
					*/
					function createAugmentedTypedArray(numComponents, numElements, opt_type) {
						return augmentTypedArray(new (opt_type || Float32Array)(numComponents * numElements), numComponents);
					}
					function allButIndices(name) {
						return name !== "indices";
					}
					/**
					* Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
					* @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
					* @return {Object.<string, TypedArray>} The deindexed vertices
					* @memberOf module:twgl/primitives
					*/
					function deindexVertices(vertices) {
						var indices = vertices.indices;
						var newVertices = {};
						var numElements = indices.length;
						function expandToUnindexed(channel) {
							var srcBuffer = vertices[channel];
							var numComponents = srcBuffer.numComponents;
							var dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
							for (var ii = 0; ii < numElements; ++ii) {
								var offset = indices[ii] * numComponents;
								for (var jj = 0; jj < numComponents; ++jj) dstBuffer.push(srcBuffer[offset + jj]);
							}
							newVertices[channel] = dstBuffer;
						}
						Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
						return newVertices;
					}
					/**
					* flattens the normals of deindexed vertices in place.
					* @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
					* @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
					* @memberOf module:twgl/primitives
					*/
					function flattenNormals(vertices) {
						if (vertices.indices) throw new Error("can not flatten normals of indexed vertices. deindex them first");
						var normals = vertices.normal;
						var numNormals = normals.length;
						for (var ii = 0; ii < numNormals; ii += 9) {
							var nax = normals[ii + 0];
							var nay = normals[ii + 1];
							var naz = normals[ii + 2];
							var nbx = normals[ii + 3];
							var nby = normals[ii + 4];
							var nbz = normals[ii + 5];
							var ncx = normals[ii + 6];
							var ncy = normals[ii + 7];
							var ncz = normals[ii + 8];
							var nx = nax + nbx + ncx;
							var ny = nay + nby + ncy;
							var nz = naz + nbz + ncz;
							var length = Math.sqrt(nx * nx + ny * ny + nz * nz);
							nx /= length;
							ny /= length;
							nz /= length;
							normals[ii + 0] = nx;
							normals[ii + 1] = ny;
							normals[ii + 2] = nz;
							normals[ii + 3] = nx;
							normals[ii + 4] = ny;
							normals[ii + 5] = nz;
							normals[ii + 6] = nx;
							normals[ii + 7] = ny;
							normals[ii + 8] = nz;
						}
						return vertices;
					}
					function applyFuncToV3Array(array, matrix, fn) {
						var len = array.length;
						var tmp = new Float32Array(3);
						for (var ii = 0; ii < len; ii += 3) {
							fn(matrix, [
								array[ii],
								array[ii + 1],
								array[ii + 2]
							], tmp);
							array[ii] = tmp[0];
							array[ii + 1] = tmp[1];
							array[ii + 2] = tmp[2];
						}
					}
					function transformNormal(mi, v, dst) {
						dst = dst || v3.create();
						var v0 = v[0];
						var v1 = v[1];
						var v2 = v[2];
						dst[0] = v0 * mi[0] + v1 * mi[1] + v2 * mi[2];
						dst[1] = v0 * mi[4] + v1 * mi[5] + v2 * mi[6];
						dst[2] = v0 * mi[8] + v1 * mi[9] + v2 * mi[10];
						return dst;
					}
					/**
					* Reorients directions by the given matrix..
					* @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
					* @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
					* @return {(number[]|TypedArray)} the same array that was passed in
					* @memberOf module:twgl/primitives
					*/
					function reorientDirections(array, matrix) {
						applyFuncToV3Array(array, matrix, m4.transformDirection);
						return array;
					}
					/**
					* Reorients normals by the inverse-transpose of the given
					* matrix..
					* @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
					* @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
					* @return {(number[]|TypedArray)} the same array that was passed in
					* @memberOf module:twgl/primitives
					*/
					function reorientNormals(array, matrix) {
						applyFuncToV3Array(array, m4.inverse(matrix), transformNormal);
						return array;
					}
					/**
					* Reorients positions by the given matrix. In other words, it
					* multiplies each vertex by the given matrix.
					* @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
					* @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
					* @return {(number[]|TypedArray)} the same array that was passed in
					* @memberOf module:twgl/primitives
					*/
					function reorientPositions(array, matrix) {
						applyFuncToV3Array(array, matrix, m4.transformPoint);
						return array;
					}
					/**
					* @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
					*/
					/**
					* Reorients arrays by the given matrix. Assumes arrays have
					* names that contains 'pos' could be reoriented as positions,
					* 'binorm' or 'tan' as directions, and 'norm' as normals.
					*
					* @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
					* @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
					* @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
					* @memberOf module:twgl/primitives
					*/
					function reorientVertices(arrays, matrix) {
						Object.keys(arrays).forEach(function(name) {
							var array = arrays[name];
							if (name.indexOf("pos") >= 0) reorientPositions(array, matrix);
							else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) reorientDirections(array, matrix);
							else if (name.indexOf("norm") >= 0) reorientNormals(array, matrix);
						});
						return arrays;
					}
					/**
					* Creates XY quad BufferInfo
					*
					* The default with no parameters will return a 2x2 quad with values from -1 to +1.
					* If you want a unit quad with that goes from 0 to 1 you'd call it with
					*
					*     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
					*
					* If you want a unit quad centered above 0,0 you'd call it with
					*
					*     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
					* @param {number} [xOffset] the amount to offset the quad in X
					* @param {number} [yOffset] the amount to offset the quad in Y
					* @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
					* @memberOf module:twgl/primitives
					* @function createXYQuadBuffers
					*/
					/**
					* Creates XY quad Buffers
					*
					* The default with no parameters will return a 2x2 quad with values from -1 to +1.
					* If you want a unit quad with that goes from 0 to 1 you'd call it with
					*
					*     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
					*
					* If you want a unit quad centered above 0,0 you'd call it with
					*
					*     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
					* @param {number} [xOffset] the amount to offset the quad in X
					* @param {number} [yOffset] the amount to offset the quad in Y
					* @return {module:twgl.BufferInfo} the created XY Quad buffers
					* @memberOf module:twgl/primitives
					* @function createXYQuadBufferInfo
					*/
					/**
					* Creates XY quad vertices
					*
					* The default with no parameters will return a 2x2 quad with values from -1 to +1.
					* If you want a unit quad with that goes from 0 to 1 you'd call it with
					*
					*     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
					*
					* If you want a unit quad centered above 0,0 you'd call it with
					*
					*     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
					*
					* @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
					* @param {number} [xOffset] the amount to offset the quad in X
					* @param {number} [yOffset] the amount to offset the quad in Y
					* @return {Object.<string, TypedArray>} the created XY Quad vertices
					* @memberOf module:twgl/primitives
					*/
					function createXYQuadVertices(size, xOffset, yOffset) {
						size = size || 2;
						xOffset = xOffset || 0;
						yOffset = yOffset || 0;
						size *= .5;
						return {
							position: {
								numComponents: 2,
								data: [
									xOffset + -1 * size,
									yOffset + -1 * size,
									xOffset + 1 * size,
									yOffset + -1 * size,
									xOffset + -1 * size,
									yOffset + 1 * size,
									xOffset + 1 * size,
									yOffset + 1 * size
								]
							},
							normal: [
								0,
								0,
								1,
								0,
								0,
								1,
								0,
								0,
								1,
								0,
								0,
								1
							],
							texcoord: [
								0,
								0,
								1,
								0,
								0,
								1,
								1,
								1
							],
							indices: [
								0,
								1,
								2,
								2,
								1,
								3
							]
						};
					}
					/**
					* Creates XZ plane BufferInfo.
					*
					* The created plane has position, normal, and texcoord data
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [width] Width of the plane. Default = 1
					* @param {number} [depth] Depth of the plane. Default = 1
					* @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
					* @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
					* @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
					* @return {module:twgl.BufferInfo} The created plane BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createPlaneBufferInfo
					*/
					/**
					* Creates XZ plane buffers.
					*
					* The created plane has position, normal, and texcoord data
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [width] Width of the plane. Default = 1
					* @param {number} [depth] Depth of the plane. Default = 1
					* @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
					* @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
					* @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
					* @return {Object.<string, WebGLBuffer>} The created plane buffers.
					* @memberOf module:twgl/primitives
					* @function createPlaneBuffers
					*/
					/**
					* Creates XZ plane vertices.
					*
					* The created plane has position, normal, and texcoord data
					*
					* @param {number} [width] Width of the plane. Default = 1
					* @param {number} [depth] Depth of the plane. Default = 1
					* @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
					* @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
					* @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
					* @return {Object.<string, TypedArray>} The created plane vertices.
					* @memberOf module:twgl/primitives
					*/
					function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
						width = width || 1;
						depth = depth || 1;
						subdivisionsWidth = subdivisionsWidth || 1;
						subdivisionsDepth = subdivisionsDepth || 1;
						matrix = matrix || m4.identity();
						var numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						for (var z = 0; z <= subdivisionsDepth; z++) for (var x = 0; x <= subdivisionsWidth; x++) {
							var u = x / subdivisionsWidth;
							var v = z / subdivisionsDepth;
							positions.push(width * u - width * .5, 0, depth * v - depth * .5);
							normals.push(0, 1, 0);
							texcoords.push(u, v);
						}
						var numVertsAcross = subdivisionsWidth + 1;
						var indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
						for (var _z = 0; _z < subdivisionsDepth; _z++) for (var _x = 0; _x < subdivisionsWidth; _x++) {
							indices.push((_z + 0) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x, (_z + 0) * numVertsAcross + _x + 1);
							indices.push((_z + 1) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x + 1, (_z + 0) * numVertsAcross + _x + 1);
						}
						return reorientVertices({
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						}, matrix);
					}
					/**
					* Creates sphere BufferInfo.
					*
					* The created sphere has position, normal, and texcoord data
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius radius of the sphere.
					* @param {number} subdivisionsAxis number of steps around the sphere.
					* @param {number} subdivisionsHeight number of vertically on the sphere.
					* @param {number} [opt_startLatitudeInRadians] where to start the
					*     top of the sphere. Default = 0.
					* @param {number} [opt_endLatitudeInRadians] Where to end the
					*     bottom of the sphere. Default = Math.PI.
					* @param {number} [opt_startLongitudeInRadians] where to start
					*     wrapping the sphere. Default = 0.
					* @param {number} [opt_endLongitudeInRadians] where to end
					*     wrapping the sphere. Default = 2 * Math.PI.
					* @return {module:twgl.BufferInfo} The created sphere BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createSphereBufferInfo
					*/
					/**
					* Creates sphere buffers.
					*
					* The created sphere has position, normal, and texcoord data
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius radius of the sphere.
					* @param {number} subdivisionsAxis number of steps around the sphere.
					* @param {number} subdivisionsHeight number of vertically on the sphere.
					* @param {number} [opt_startLatitudeInRadians] where to start the
					*     top of the sphere. Default = 0.
					* @param {number} [opt_endLatitudeInRadians] Where to end the
					*     bottom of the sphere. Default = Math.PI.
					* @param {number} [opt_startLongitudeInRadians] where to start
					*     wrapping the sphere. Default = 0.
					* @param {number} [opt_endLongitudeInRadians] where to end
					*     wrapping the sphere. Default = 2 * Math.PI.
					* @return {Object.<string, WebGLBuffer>} The created sphere buffers.
					* @memberOf module:twgl/primitives
					* @function createSphereBuffers
					*/
					/**
					* Creates sphere vertices.
					*
					* The created sphere has position, normal, and texcoord data
					*
					* @param {number} radius radius of the sphere.
					* @param {number} subdivisionsAxis number of steps around the sphere.
					* @param {number} subdivisionsHeight number of vertically on the sphere.
					* @param {number} [opt_startLatitudeInRadians] where to start the
					*     top of the sphere. Default = 0.
					* @param {number} [opt_endLatitudeInRadians] Where to end the
					*     bottom of the sphere. Default = Math.PI.
					* @param {number} [opt_startLongitudeInRadians] where to start
					*     wrapping the sphere. Default = 0.
					* @param {number} [opt_endLongitudeInRadians] where to end
					*     wrapping the sphere. Default = 2 * Math.PI.
					* @return {Object.<string, TypedArray>} The created sphere vertices.
					* @memberOf module:twgl/primitives
					*/
					function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
						if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
						opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
						opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
						opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
						opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
						var latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
						var longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
						var numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						for (var y = 0; y <= subdivisionsHeight; y++) for (var x = 0; x <= subdivisionsAxis; x++) {
							var u = x / subdivisionsAxis;
							var v = y / subdivisionsHeight;
							var theta = longRange * u + opt_startLongitudeInRadians;
							var phi = latRange * v + opt_startLatitudeInRadians;
							var sinTheta = Math.sin(theta);
							var cosTheta = Math.cos(theta);
							var sinPhi = Math.sin(phi);
							var cosPhi = Math.cos(phi);
							var ux = cosTheta * sinPhi;
							var uy = cosPhi;
							var uz = sinTheta * sinPhi;
							positions.push(radius * ux, radius * uy, radius * uz);
							normals.push(ux, uy, uz);
							texcoords.push(1 - u, v);
						}
						var numVertsAround = subdivisionsAxis + 1;
						var indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
						for (var _x2 = 0; _x2 < subdivisionsAxis; _x2++) for (var _y = 0; _y < subdivisionsHeight; _y++) {
							indices.push((_y + 0) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2);
							indices.push((_y + 1) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2 + 1);
						}
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* Array of the indices of corners of each face of a cube.
					* @type {Array.<number[]>}
					* @private
					*/
					var CUBE_FACE_INDICES = [
						[
							3,
							7,
							5,
							1
						],
						[
							6,
							2,
							0,
							4
						],
						[
							6,
							7,
							3,
							2
						],
						[
							0,
							1,
							5,
							4
						],
						[
							7,
							6,
							4,
							5
						],
						[
							2,
							3,
							1,
							0
						]
					];
					/**
					* Creates a BufferInfo for a cube.
					*
					* The cube is created around the origin. (-size / 2, size / 2).
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [size] width, height and depth of the cube.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createCubeBufferInfo
					*/
					/**
					* Creates the buffers and indices for a cube.
					*
					* The cube is created around the origin. (-size / 2, size / 2).
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} [size] width, height and depth of the cube.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createCubeBuffers
					*/
					/**
					* Creates the vertices and indices for a cube.
					*
					* The cube is created around the origin. (-size / 2, size / 2).
					*
					* @param {number} [size] width, height and depth of the cube.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function createCubeVertices(size) {
						size = size || 1;
						var k = size / 2;
						var cornerVertices = [
							[
								-k,
								-k,
								-k
							],
							[
								+k,
								-k,
								-k
							],
							[
								-k,
								+k,
								-k
							],
							[
								+k,
								+k,
								-k
							],
							[
								-k,
								-k,
								+k
							],
							[
								+k,
								-k,
								+k
							],
							[
								-k,
								+k,
								+k
							],
							[
								+k,
								+k,
								+k
							]
						];
						var faceNormals = [
							[
								1,
								0,
								0
							],
							[
								-1,
								0,
								0
							],
							[
								0,
								1,
								0
							],
							[
								0,
								-1,
								0
							],
							[
								0,
								0,
								1
							],
							[
								0,
								0,
								-1
							]
						];
						var uvCoords = [
							[1, 0],
							[0, 0],
							[0, 1],
							[1, 1]
						];
						var numVertices = 24;
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						var indices = createAugmentedTypedArray(3, 12, Uint16Array);
						for (var f = 0; f < 6; ++f) {
							var faceIndices = CUBE_FACE_INDICES[f];
							for (var v = 0; v < 4; ++v) {
								var position = cornerVertices[faceIndices[v]];
								var normal = faceNormals[f];
								var uv = uvCoords[v];
								positions.push(position);
								normals.push(normal);
								texcoords.push(uv);
							}
							var offset = 4 * f;
							indices.push(offset + 0, offset + 1, offset + 2);
							indices.push(offset + 0, offset + 2, offset + 3);
						}
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* Creates a BufferInfo for a truncated cone, which is like a cylinder
					* except that it has different top and bottom radii. A truncated cone
					* can also be used to create cylinders and regular cones. The
					* truncated cone will be created centered about the origin, with the
					* y axis as its vertical axis.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} bottomRadius Bottom radius of truncated cone.
					* @param {number} topRadius Top radius of truncated cone.
					* @param {number} height Height of truncated cone.
					* @param {number} radialSubdivisions The number of subdivisions around the
					*     truncated cone.
					* @param {number} verticalSubdivisions The number of subdivisions down the
					*     truncated cone.
					* @param {boolean} [opt_topCap] Create top cap. Default = true.
					* @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
					* @return {module:twgl.BufferInfo} The created cone BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createTruncatedConeBufferInfo
					*/
					/**
					* Creates buffers for a truncated cone, which is like a cylinder
					* except that it has different top and bottom radii. A truncated cone
					* can also be used to create cylinders and regular cones. The
					* truncated cone will be created centered about the origin, with the
					* y axis as its vertical axis.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} bottomRadius Bottom radius of truncated cone.
					* @param {number} topRadius Top radius of truncated cone.
					* @param {number} height Height of truncated cone.
					* @param {number} radialSubdivisions The number of subdivisions around the
					*     truncated cone.
					* @param {number} verticalSubdivisions The number of subdivisions down the
					*     truncated cone.
					* @param {boolean} [opt_topCap] Create top cap. Default = true.
					* @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
					* @return {Object.<string, WebGLBuffer>} The created cone buffers.
					* @memberOf module:twgl/primitives
					* @function createTruncatedConeBuffers
					*/
					/**
					* Creates vertices for a truncated cone, which is like a cylinder
					* except that it has different top and bottom radii. A truncated cone
					* can also be used to create cylinders and regular cones. The
					* truncated cone will be created centered about the origin, with the
					* y axis as its vertical axis. .
					*
					* @param {number} bottomRadius Bottom radius of truncated cone.
					* @param {number} topRadius Top radius of truncated cone.
					* @param {number} height Height of truncated cone.
					* @param {number} radialSubdivisions The number of subdivisions around the
					*     truncated cone.
					* @param {number} verticalSubdivisions The number of subdivisions down the
					*     truncated cone.
					* @param {boolean} [opt_topCap] Create top cap. Default = true.
					* @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
					* @return {Object.<string, TypedArray>} The created cone vertices.
					* @memberOf module:twgl/primitives
					*/
					function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
						if (radialSubdivisions < 3) throw new Error("radialSubdivisions must be 3 or greater");
						if (verticalSubdivisions < 1) throw new Error("verticalSubdivisions must be 1 or greater");
						var topCap = opt_topCap === void 0 ? true : opt_topCap;
						var bottomCap = opt_bottomCap === void 0 ? true : opt_bottomCap;
						var extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
						var numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						var indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
						var vertsAroundEdge = radialSubdivisions + 1;
						var slant = Math.atan2(bottomRadius - topRadius, height);
						var cosSlant = Math.cos(slant);
						var sinSlant = Math.sin(slant);
						var start = topCap ? -2 : 0;
						var end = verticalSubdivisions + (bottomCap ? 2 : 0);
						for (var yy = start; yy <= end; ++yy) {
							var v = yy / verticalSubdivisions;
							var y = height * v;
							var ringRadius = void 0;
							if (yy < 0) {
								y = 0;
								v = 1;
								ringRadius = bottomRadius;
							} else if (yy > verticalSubdivisions) {
								y = height;
								v = 1;
								ringRadius = topRadius;
							} else ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
							if (yy === -2 || yy === verticalSubdivisions + 2) {
								ringRadius = 0;
								v = 0;
							}
							y -= height / 2;
							for (var ii = 0; ii < vertsAroundEdge; ++ii) {
								var sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
								var cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
								positions.push(sin * ringRadius, y, cos * ringRadius);
								if (yy < 0) normals.push(0, -1, 0);
								else if (yy > verticalSubdivisions) normals.push(0, 1, 0);
								else if (ringRadius === 0) normals.push(0, 0, 0);
								else normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
								texcoords.push(ii / radialSubdivisions, 1 - v);
							}
						}
						for (var _yy = 0; _yy < verticalSubdivisions + extra; ++_yy) {
							if (_yy === 1 && topCap || _yy === verticalSubdivisions + extra - 2 && bottomCap) continue;
							for (var _ii = 0; _ii < radialSubdivisions; ++_ii) {
								indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 0) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii);
								indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 0 + _ii);
							}
						}
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* Expands RLE data
					* @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
					* @param {number[]} [padding] value to add each entry with.
					* @return {number[]} the expanded rleData
					* @private
					*/
					function expandRLEData(rleData, padding) {
						padding = padding || [];
						var data = [];
						for (var ii = 0; ii < rleData.length; ii += 4) {
							var runLength = rleData[ii];
							var element = rleData.slice(ii + 1, ii + 4);
							element.push.apply(element, padding);
							for (var jj = 0; jj < runLength; ++jj) data.push.apply(data, element);
						}
						return data;
					}
					/**
					* Creates 3D 'F' BufferInfo.
					* An 'F' is useful because you can easily tell which way it is oriented.
					* The created 'F' has position, normal, texcoord, and color buffers.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function create3DFBufferInfo
					*/
					/**
					* Creates 3D 'F' buffers.
					* An 'F' is useful because you can easily tell which way it is oriented.
					* The created 'F' has position, normal, texcoord, and color buffers.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function create3DFBuffers
					*/
					/**
					* Creates 3D 'F' vertices.
					* An 'F' is useful because you can easily tell which way it is oriented.
					* The created 'F' has position, normal, texcoord, and color arrays.
					*
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function create3DFVertices() {
						var positions = [
							0,
							0,
							0,
							0,
							150,
							0,
							30,
							0,
							0,
							0,
							150,
							0,
							30,
							150,
							0,
							30,
							0,
							0,
							30,
							0,
							0,
							30,
							30,
							0,
							100,
							0,
							0,
							30,
							30,
							0,
							100,
							30,
							0,
							100,
							0,
							0,
							30,
							60,
							0,
							30,
							90,
							0,
							67,
							60,
							0,
							30,
							90,
							0,
							67,
							90,
							0,
							67,
							60,
							0,
							0,
							0,
							30,
							30,
							0,
							30,
							0,
							150,
							30,
							0,
							150,
							30,
							30,
							0,
							30,
							30,
							150,
							30,
							30,
							0,
							30,
							100,
							0,
							30,
							30,
							30,
							30,
							30,
							30,
							30,
							100,
							0,
							30,
							100,
							30,
							30,
							30,
							60,
							30,
							67,
							60,
							30,
							30,
							90,
							30,
							30,
							90,
							30,
							67,
							60,
							30,
							67,
							90,
							30,
							0,
							0,
							0,
							100,
							0,
							0,
							100,
							0,
							30,
							0,
							0,
							0,
							100,
							0,
							30,
							0,
							0,
							30,
							100,
							0,
							0,
							100,
							30,
							0,
							100,
							30,
							30,
							100,
							0,
							0,
							100,
							30,
							30,
							100,
							0,
							30,
							30,
							30,
							0,
							30,
							30,
							30,
							100,
							30,
							30,
							30,
							30,
							0,
							100,
							30,
							30,
							100,
							30,
							0,
							30,
							30,
							0,
							30,
							60,
							30,
							30,
							30,
							30,
							30,
							30,
							0,
							30,
							60,
							0,
							30,
							60,
							30,
							30,
							60,
							0,
							67,
							60,
							30,
							30,
							60,
							30,
							30,
							60,
							0,
							67,
							60,
							0,
							67,
							60,
							30,
							67,
							60,
							0,
							67,
							90,
							30,
							67,
							60,
							30,
							67,
							60,
							0,
							67,
							90,
							0,
							67,
							90,
							30,
							30,
							90,
							0,
							30,
							90,
							30,
							67,
							90,
							30,
							30,
							90,
							0,
							67,
							90,
							30,
							67,
							90,
							0,
							30,
							90,
							0,
							30,
							150,
							30,
							30,
							90,
							30,
							30,
							90,
							0,
							30,
							150,
							0,
							30,
							150,
							30,
							0,
							150,
							0,
							0,
							150,
							30,
							30,
							150,
							30,
							0,
							150,
							0,
							30,
							150,
							30,
							30,
							150,
							0,
							0,
							0,
							0,
							0,
							0,
							30,
							0,
							150,
							30,
							0,
							0,
							0,
							0,
							150,
							30,
							0,
							150,
							0
						];
						var texcoords = [
							.22,
							.19,
							.22,
							.79,
							.34,
							.19,
							.22,
							.79,
							.34,
							.79,
							.34,
							.19,
							.34,
							.19,
							.34,
							.31,
							.62,
							.19,
							.34,
							.31,
							.62,
							.31,
							.62,
							.19,
							.34,
							.43,
							.34,
							.55,
							.49,
							.43,
							.34,
							.55,
							.49,
							.55,
							.49,
							.43,
							0,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							0,
							1,
							1,
							0,
							1,
							0,
							0,
							1,
							0,
							1,
							1,
							0,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							0,
							0,
							1,
							1,
							1,
							0,
							0,
							1,
							1,
							1,
							0
						];
						var normals = expandRLEData([
							18,
							0,
							0,
							1,
							18,
							0,
							0,
							-1,
							6,
							0,
							1,
							0,
							6,
							1,
							0,
							0,
							6,
							0,
							-1,
							0,
							6,
							1,
							0,
							0,
							6,
							0,
							1,
							0,
							6,
							1,
							0,
							0,
							6,
							0,
							-1,
							0,
							6,
							1,
							0,
							0,
							6,
							0,
							-1,
							0,
							6,
							-1,
							0,
							0
						]);
						var colors = expandRLEData([
							18,
							200,
							70,
							120,
							18,
							80,
							70,
							200,
							6,
							70,
							200,
							210,
							6,
							200,
							200,
							70,
							6,
							210,
							100,
							70,
							6,
							210,
							160,
							70,
							6,
							70,
							180,
							210,
							6,
							100,
							70,
							210,
							6,
							76,
							210,
							100,
							6,
							140,
							210,
							80,
							6,
							90,
							130,
							110,
							6,
							160,
							160,
							220
						], [255]);
						var numVerts = positions.length / 3;
						var arrays = {
							position: createAugmentedTypedArray(3, numVerts),
							texcoord: createAugmentedTypedArray(2, numVerts),
							normal: createAugmentedTypedArray(3, numVerts),
							color: createAugmentedTypedArray(4, numVerts, Uint8Array),
							indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
						};
						arrays.position.push(positions);
						arrays.texcoord.push(texcoords);
						arrays.normal.push(normals);
						arrays.color.push(colors);
						for (var ii = 0; ii < numVerts; ++ii) arrays.indices.push(ii);
						return arrays;
					}
					/**
					* Creates crescent BufferInfo.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createCresentBufferInfo
					*/
					/**
					* Creates crescent buffers.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createCresentBuffers
					*/
					/**
					* Creates crescent vertices.
					*
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					* @function createCresentBuffers
					*/
					/**
					* Creates crescent BufferInfo.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createCrescentBufferInfo
					*/
					/**
					* Creates crescent buffers.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createCrescentBuffers
					*/
					/**
					* Creates crescent vertices.
					*
					* @param {number} verticalRadius The vertical radius of the crescent.
					* @param {number} outerRadius The outer radius of the crescent.
					* @param {number} innerRadius The inner radius of the crescent.
					* @param {number} thickness The thickness of the crescent.
					* @param {number} subdivisionsDown number of steps around the crescent.
					* @param {number} [startOffset] Where to start arc. Default 0.
					* @param {number} [endOffset] Where to end arg. Default 1.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
						if (subdivisionsDown <= 0) throw new Error("subdivisionDown must be > 0");
						startOffset = startOffset || 0;
						endOffset = endOffset || 1;
						var subdivisionsThick = 2;
						var offsetRange = endOffset - startOffset;
						var numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						function lerp(a, b, s) {
							return a + (b - a) * s;
						}
						function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
							for (var z = 0; z <= subdivisionsDown; z++) {
								var uBack = x / (subdivisionsThick - 1);
								var v = z / subdivisionsDown;
								var xBack = (uBack - .5) * 2;
								var angle = (startOffset + v * offsetRange) * Math.PI;
								var s = Math.sin(angle);
								var c = Math.cos(angle);
								var radius = lerp(verticalRadius, arcRadius, s);
								var px = xBack * thickness;
								var py = c * verticalRadius;
								var pz = s * radius;
								positions.push(px, py, pz);
								var n = v3.add(v3.multiply([
									0,
									s,
									c
								], normalMult), normalAdd);
								normals.push(n);
								texcoords.push(uBack * uMult + uAdd, v);
							}
						}
						for (var x = 0; x < subdivisionsThick; x++) {
							var uBack = (x / (subdivisionsThick - 1) - .5) * 2;
							createArc(outerRadius, x, [
								1,
								1,
								1
							], [
								0,
								0,
								0
							], 1, 0);
							createArc(outerRadius, x, [
								0,
								0,
								0
							], [
								uBack,
								0,
								0
							], 0, 0);
							createArc(innerRadius, x, [
								1,
								1,
								1
							], [
								0,
								0,
								0
							], 1, 0);
							createArc(innerRadius, x, [
								0,
								0,
								0
							], [
								uBack,
								0,
								0
							], 0, 1);
						}
						var indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
						function createSurface(leftArcOffset, rightArcOffset) {
							for (var z = 0; z < subdivisionsDown; ++z) {
								indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
								indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
							}
						}
						var numVerticesDown = subdivisionsDown + 1;
						createSurface(numVerticesDown * 0, numVerticesDown * 4);
						createSurface(numVerticesDown * 5, numVerticesDown * 7);
						createSurface(numVerticesDown * 6, numVerticesDown * 2);
						createSurface(numVerticesDown * 3, numVerticesDown * 1);
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* Creates cylinder BufferInfo. The cylinder will be created around the origin
					* along the y-axis.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius Radius of cylinder.
					* @param {number} height Height of cylinder.
					* @param {number} radialSubdivisions The number of subdivisions around the cylinder.
					* @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
					* @param {boolean} [topCap] Create top cap. Default = true.
					* @param {boolean} [bottomCap] Create bottom cap. Default = true.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createCylinderBufferInfo
					*/
					/**
					* Creates cylinder buffers. The cylinder will be created around the origin
					* along the y-axis.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius Radius of cylinder.
					* @param {number} height Height of cylinder.
					* @param {number} radialSubdivisions The number of subdivisions around the cylinder.
					* @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
					* @param {boolean} [topCap] Create top cap. Default = true.
					* @param {boolean} [bottomCap] Create bottom cap. Default = true.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createCylinderBuffers
					*/
					/**
					* Creates cylinder vertices. The cylinder will be created around the origin
					* along the y-axis.
					*
					* @param {number} radius Radius of cylinder.
					* @param {number} height Height of cylinder.
					* @param {number} radialSubdivisions The number of subdivisions around the cylinder.
					* @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
					* @param {boolean} [topCap] Create top cap. Default = true.
					* @param {boolean} [bottomCap] Create bottom cap. Default = true.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
						return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
					}
					/**
					* Creates BufferInfo for a torus
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius radius of center of torus circle.
					* @param {number} thickness radius of torus ring.
					* @param {number} radialSubdivisions The number of subdivisions around the torus.
					* @param {number} bodySubdivisions The number of subdivisions around the body torus.
					* @param {boolean} [startAngle] start angle in radians. Default = 0.
					* @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createTorusBufferInfo
					*/
					/**
					* Creates buffers for a torus
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius radius of center of torus circle.
					* @param {number} thickness radius of torus ring.
					* @param {number} radialSubdivisions The number of subdivisions around the torus.
					* @param {number} bodySubdivisions The number of subdivisions around the body torus.
					* @param {boolean} [startAngle] start angle in radians. Default = 0.
					* @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createTorusBuffers
					*/
					/**
					* Creates vertices for a torus
					*
					* @param {number} radius radius of center of torus circle.
					* @param {number} thickness radius of torus ring.
					* @param {number} radialSubdivisions The number of subdivisions around the torus.
					* @param {number} bodySubdivisions The number of subdivisions around the body torus.
					* @param {boolean} [startAngle] start angle in radians. Default = 0.
					* @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
						if (radialSubdivisions < 3) throw new Error("radialSubdivisions must be 3 or greater");
						if (bodySubdivisions < 3) throw new Error("verticalSubdivisions must be 3 or greater");
						startAngle = startAngle || 0;
						endAngle = endAngle || Math.PI * 2;
						var range = endAngle - startAngle;
						var radialParts = radialSubdivisions + 1;
						var bodyParts = bodySubdivisions + 1;
						var numVertices = radialParts * bodyParts;
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						var indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
						for (var slice = 0; slice < bodyParts; ++slice) {
							var v = slice / bodySubdivisions;
							var sliceAngle = v * Math.PI * 2;
							var sliceSin = Math.sin(sliceAngle);
							var ringRadius = radius + sliceSin * thickness;
							var ny = Math.cos(sliceAngle);
							var y = ny * thickness;
							for (var ring = 0; ring < radialParts; ++ring) {
								var u = ring / radialSubdivisions;
								var ringAngle = startAngle + u * range;
								var xSin = Math.sin(ringAngle);
								var zCos = Math.cos(ringAngle);
								var x = xSin * ringRadius;
								var z = zCos * ringRadius;
								var nx = xSin * sliceSin;
								var nz = zCos * sliceSin;
								positions.push(x, y, z);
								normals.push(nx, ny, nz);
								texcoords.push(u, 1 - v);
							}
						}
						for (var _slice = 0; _slice < bodySubdivisions; ++_slice) for (var _ring = 0; _ring < radialSubdivisions; ++_ring) {
							var nextRingIndex = 1 + _ring;
							var nextSliceIndex = 1 + _slice;
							indices.push(radialParts * _slice + _ring, radialParts * nextSliceIndex + _ring, radialParts * _slice + nextRingIndex);
							indices.push(radialParts * nextSliceIndex + _ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * _slice + nextRingIndex);
						}
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* Creates a disc BufferInfo. The disc will be in the xz plane, centered at
					* the origin. When creating, at least 3 divisions, or pie
					* pieces, need to be specified, otherwise the triangles making
					* up the disc will be degenerate. You can also specify the
					* number of radial pieces `stacks`. A value of 1 for
					* stacks will give you a simple disc of pie pieces.  If you
					* want to create an annulus you can set `innerRadius` to a
					* value > 0. Finally, `stackPower` allows you to have the widths
					* increase or decrease as you move away from the center. This
					* is particularly useful when using the disc as a ground plane
					* with a fixed camera such that you don't need the resolution
					* of small triangles near the perimeter. For example, a value
					* of 2 will produce stacks whose outside radius increases with
					* the square of the stack index. A value of 1 will give uniform
					* stacks.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius Radius of the ground plane.
					* @param {number} divisions Number of triangles in the ground plane (at least 3).
					* @param {number} [stacks] Number of radial divisions (default=1).
					* @param {number} [innerRadius] Default 0.
					* @param {number} [stackPower] Power to raise stack size to for decreasing width.
					* @return {module:twgl.BufferInfo} The created BufferInfo.
					* @memberOf module:twgl/primitives
					* @function createDiscBufferInfo
					*/
					/**
					* Creates disc buffers. The disc will be in the xz plane, centered at
					* the origin. When creating, at least 3 divisions, or pie
					* pieces, need to be specified, otherwise the triangles making
					* up the disc will be degenerate. You can also specify the
					* number of radial pieces `stacks`. A value of 1 for
					* stacks will give you a simple disc of pie pieces.  If you
					* want to create an annulus you can set `innerRadius` to a
					* value > 0. Finally, `stackPower` allows you to have the widths
					* increase or decrease as you move away from the center. This
					* is particularly useful when using the disc as a ground plane
					* with a fixed camera such that you don't need the resolution
					* of small triangles near the perimeter. For example, a value
					* of 2 will produce stacks whose outside radius increases with
					* the square of the stack index. A value of 1 will give uniform
					* stacks.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext.
					* @param {number} radius Radius of the ground plane.
					* @param {number} divisions Number of triangles in the ground plane (at least 3).
					* @param {number} [stacks] Number of radial divisions (default=1).
					* @param {number} [innerRadius] Default 0.
					* @param {number} [stackPower] Power to raise stack size to for decreasing width.
					* @return {Object.<string, WebGLBuffer>} The created buffers.
					* @memberOf module:twgl/primitives
					* @function createDiscBuffers
					*/
					/**
					* Creates disc vertices. The disc will be in the xz plane, centered at
					* the origin. When creating, at least 3 divisions, or pie
					* pieces, need to be specified, otherwise the triangles making
					* up the disc will be degenerate. You can also specify the
					* number of radial pieces `stacks`. A value of 1 for
					* stacks will give you a simple disc of pie pieces.  If you
					* want to create an annulus you can set `innerRadius` to a
					* value > 0. Finally, `stackPower` allows you to have the widths
					* increase or decrease as you move away from the center. This
					* is particularly useful when using the disc as a ground plane
					* with a fixed camera such that you don't need the resolution
					* of small triangles near the perimeter. For example, a value
					* of 2 will produce stacks whose outside radius increases with
					* the square of the stack index. A value of 1 will give uniform
					* stacks.
					*
					* @param {number} radius Radius of the ground plane.
					* @param {number} divisions Number of triangles in the ground plane (at least 3).
					* @param {number} [stacks] Number of radial divisions (default=1).
					* @param {number} [innerRadius] Default 0.
					* @param {number} [stackPower] Power to raise stack size to for decreasing width.
					* @return {Object.<string, TypedArray>} The created vertices.
					* @memberOf module:twgl/primitives
					*/
					function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
						if (divisions < 3) throw new Error("divisions must be at least 3");
						stacks = stacks ? stacks : 1;
						stackPower = stackPower ? stackPower : 1;
						innerRadius = innerRadius ? innerRadius : 0;
						var numVertices = (divisions + 1) * (stacks + 1);
						var positions = createAugmentedTypedArray(3, numVertices);
						var normals = createAugmentedTypedArray(3, numVertices);
						var texcoords = createAugmentedTypedArray(2, numVertices);
						var indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
						var firstIndex = 0;
						var radiusSpan = radius - innerRadius;
						var pointsPerStack = divisions + 1;
						for (var stack = 0; stack <= stacks; ++stack) {
							var stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
							for (var i = 0; i <= divisions; ++i) {
								var theta = 2 * Math.PI * i / divisions;
								var x = stackRadius * Math.cos(theta);
								var z = stackRadius * Math.sin(theta);
								positions.push(x, 0, z);
								normals.push(0, 1, 0);
								texcoords.push(1 - i / divisions, stack / stacks);
								if (stack > 0 && i !== divisions) {
									var a = firstIndex + (i + 1);
									var b = firstIndex + i;
									var c = firstIndex + i - pointsPerStack;
									var d = firstIndex + (i + 1) - pointsPerStack;
									indices.push(a, b, c);
									indices.push(a, c, d);
								}
							}
							firstIndex += divisions + 1;
						}
						return {
							position: positions,
							normal: normals,
							texcoord: texcoords,
							indices
						};
					}
					/**
					* creates a random integer between 0 and range - 1 inclusive.
					* @param {number} range
					* @return {number} random value between 0 and range - 1 inclusive.
					* @private
					*/
					function randInt(range) {
						return Math.random() * range | 0;
					}
					/**
					* Used to supply random colors
					* @callback RandomColorFunc
					* @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
					* @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
					* @return {number} a number from 0 to 255
					* @memberOf module:twgl/primitives
					*/
					/**
					* @typedef {Object} RandomVerticesOptions
					* @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
					* @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
					* @memberOf module:twgl/primitives
					*/
					/**
					* Creates an augmentedTypedArray of random vertex colors.
					* If the vertices are indexed (have an indices array) then will
					* just make random colors. Otherwise assumes they are triangles
					* and makes one random color for every 3 vertices.
					* @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
					* @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
					* @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
					* @memberOf module:twgl/primitives
					*/
					function makeRandomVertexColors(vertices, options) {
						options = options || {};
						var numElements = vertices.position.numElements;
						var vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
						var rand = options.rand || function(ndx, channel) {
							return channel < 3 ? randInt(256) : 255;
						};
						vertices.color = vColors;
						if (vertices.indices) for (var ii = 0; ii < numElements; ++ii) vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
						else {
							var numVertsPerColor = options.vertsPerColor || 3;
							var numSets = numElements / numVertsPerColor;
							for (var _ii2 = 0; _ii2 < numSets; ++_ii2) {
								var color = [
									rand(_ii2, 0),
									rand(_ii2, 1),
									rand(_ii2, 2),
									rand(_ii2, 3)
								];
								for (var jj = 0; jj < numVertsPerColor; ++jj) vColors.push(color);
							}
						}
						return vertices;
					}
					/**
					* creates a function that calls fn to create vertices and then
					* creates a buffers for them
					* @private
					*/
					function createBufferFunc(fn) {
						return function(gl) {
							var arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
							return attributes.createBuffersFromArrays(gl, arrays);
						};
					}
					/**
					* creates a function that calls fn to create vertices and then
					* creates a bufferInfo object for them
					* @private
					*/
					function createBufferInfoFunc(fn) {
						return function(gl) {
							var arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
							return attributes.createBufferInfoFromArrays(gl, arrays);
						};
					}
					var arraySpecPropertyNames = [
						"numComponents",
						"size",
						"type",
						"normalize",
						"stride",
						"offset",
						"attrib",
						"name",
						"attribName"
					];
					/**
					* Copy elements from one array to another
					*
					* @param {Array|TypedArray} src source array
					* @param {Array|TypedArray} dst dest array
					* @param {number} dstNdx index in dest to copy src
					* @param {number} [offset] offset to add to copied values
					* @private
					*/
					function copyElements(src, dst, dstNdx, offset) {
						offset = offset || 0;
						var length = src.length;
						for (var ii = 0; ii < length; ++ii) dst[dstNdx + ii] = src[ii] + offset;
					}
					/**
					* Creates an array of the same time
					*
					* @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
					* @param {number} length size of new array
					* @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
					* @private
					*/
					function createArrayOfSameType(srcArray, length) {
						var arraySrc = getArray(srcArray);
						var newArray = new arraySrc.constructor(length);
						var newArraySpec = newArray;
						if (arraySrc.numComponents && arraySrc.numElements) augmentTypedArray(newArray, arraySrc.numComponents);
						if (srcArray.data) {
							newArraySpec = { data: newArray };
							helper.copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
						}
						return newArraySpec;
					}
					/**
					* Concatenates sets of vertices
					*
					* Assumes the vertices match in composition. For example
					* if one set of vertices has positions, normals, and indices
					* all sets of vertices must have positions, normals, and indices
					* and of the same type.
					*
					* Example:
					*
					*      const cubeVertices = twgl.primitives.createCubeVertices(2);
					*      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
					*      // move the sphere 2 units up
					*      twgl.primitives.reorientVertices(
					*          sphereVertices, twgl.m4.translation([0, 2, 0]));
					*      // merge the sphere with the cube
					*      const cubeSphereVertices = twgl.primitives.concatVertices(
					*          [cubeVertices, sphereVertices]);
					*      // turn them into WebGL buffers and attrib data
					*      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
					*
					* @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
					* @return {module:twgl.Arrays} The concatenated vertices.
					* @memberOf module:twgl/primitives
					*/
					function concatVertices(arrayOfArrays) {
						var names = {};
						var baseName;
						var _loop = function _loop() {
							var arrays = arrayOfArrays[ii];
							Object.keys(arrays).forEach(function(name) {
								if (!names[name]) names[name] = [];
								if (!baseName && name !== "indices") baseName = name;
								var arrayInfo = arrays[name];
								var numComponents = getNumComponents(arrayInfo, name);
								var numElements = getArray(arrayInfo).length / numComponents;
								names[name].push(numElements);
							});
						};
						for (var ii = 0; ii < arrayOfArrays.length; ++ii) _loop();
						function getLengthOfCombinedArrays(name) {
							var length = 0;
							var arraySpec;
							for (var _ii3 = 0; _ii3 < arrayOfArrays.length; ++_ii3) {
								var arrayInfo = arrayOfArrays[_ii3][name];
								var array = getArray(arrayInfo);
								length += array.length;
								if (!arraySpec || arrayInfo.data) arraySpec = arrayInfo;
							}
							return {
								length,
								spec: arraySpec
							};
						}
						function copyArraysToNewArray(name, base, newArray) {
							var baseIndex = 0;
							var offset = 0;
							for (var _ii4 = 0; _ii4 < arrayOfArrays.length; ++_ii4) {
								var arrayInfo = arrayOfArrays[_ii4][name];
								var array = getArray(arrayInfo);
								if (name === "indices") {
									copyElements(array, newArray, offset, baseIndex);
									baseIndex += base[_ii4];
								} else copyElements(array, newArray, offset);
								offset += array.length;
							}
						}
						var base = names[baseName];
						var newArrays = {};
						Object.keys(names).forEach(function(name) {
							var info = getLengthOfCombinedArrays(name);
							var newArraySpec = createArrayOfSameType(info.spec, info.length);
							copyArraysToNewArray(name, base, getArray(newArraySpec));
							newArrays[name] = newArraySpec;
						});
						return newArrays;
					}
					/**
					* Creates a duplicate set of vertices
					*
					* This is useful for calling reorientVertices when you
					* also want to keep the original available
					*
					* @param {module:twgl.Arrays} arrays of vertices
					* @return {module:twgl.Arrays} The duplicated vertices.
					* @memberOf module:twgl/primitives
					*/
					function duplicateVertices(arrays) {
						var newArrays = {};
						Object.keys(arrays).forEach(function(name) {
							var arraySpec = arrays[name];
							var srcArray = getArray(arraySpec);
							var newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
							copyElements(srcArray, getArray(newArraySpec), 0);
							newArrays[name] = newArraySpec;
						});
						return newArrays;
					}
					exports$6.create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
					exports$6.create3DFBuffers = createBufferFunc(create3DFVertices);
					exports$6.createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
					exports$6.createCubeBuffers = createBufferFunc(createCubeVertices);
					exports$6.createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
					exports$6.createPlaneBuffers = createBufferFunc(createPlaneVertices);
					exports$6.createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
					exports$6.createSphereBuffers = createBufferFunc(createSphereVertices);
					exports$6.createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
					exports$6.createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
					exports$6.createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
					exports$6.createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
					var createCrescentBufferInfo = exports$6.createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
					var createCrescentBuffers = exports$6.createCrescentBuffers = createBufferFunc(createCrescentVertices);
					exports$6.createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
					exports$6.createCylinderBuffers = createBufferFunc(createCylinderVertices);
					exports$6.createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
					exports$6.createTorusBuffers = createBufferFunc(createTorusVertices);
					exports$6.createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
					exports$6.createDiscBuffers = createBufferFunc(createDiscVertices);
					exports$6.createCresentBufferInfo = createCrescentBufferInfo;
					exports$6.createCresentBuffers = createCrescentBuffers;
					exports$6.createCresentVertices = createCrescentVertices;
				}),
				"./src/programs.js": ((__unused_webpack_module, exports$7, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$7.__esModule = true;
					exports$7.bindTransformFeedbackInfo = bindTransformFeedbackInfo;
					exports$7.bindUniformBlock = bindUniformBlock;
					exports$7.createAttributeSetters = createAttributeSetters;
					exports$7.createProgram = createProgram;
					exports$7.createProgramAsync = void 0;
					exports$7.createProgramFromScripts = createProgramFromScripts;
					exports$7.createProgramFromSources = createProgramFromSources;
					exports$7.createProgramInfo = createProgramInfo;
					exports$7.createProgramInfoAsync = void 0;
					exports$7.createProgramInfoFromProgram = createProgramInfoFromProgram;
					exports$7.createProgramInfos = createProgramInfos;
					exports$7.createProgramInfosAsync = void 0;
					exports$7.createPrograms = createPrograms;
					exports$7.createProgramsAsync = void 0;
					exports$7.createTransformFeedback = createTransformFeedback;
					exports$7.createTransformFeedbackInfo = createTransformFeedbackInfo;
					exports$7.createUniformBlockInfo = createUniformBlockInfo;
					exports$7.createUniformBlockInfoFromProgram = createUniformBlockInfoFromProgram;
					exports$7.createUniformBlockSpecFromProgram = createUniformBlockSpecFromProgram;
					exports$7.createUniformSetters = createUniformSetters;
					exports$7.setAttributes = setAttributes;
					exports$7.setBlockUniforms = setBlockUniforms;
					exports$7.setBuffersAndAttributes = setBuffersAndAttributes;
					exports$7.setUniformBlock = setUniformBlock;
					exports$7.setUniforms = setUniforms;
					exports$7.setUniformsAndBindTextures = void 0;
					var utils = _interopRequireWildcard(__webpack_require__(
						/*! ./utils.js */
						"./src/utils.js"
					));
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					function _regeneratorRuntime() {
						"use strict";
						/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() {
							return e;
						};
						var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t, e, r) {
							t[e] = r.value;
						}, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
						function define(t, e, r) {
							return Object.defineProperty(t, e, {
								value: r,
								enumerable: !0,
								configurable: !0,
								writable: !0
							}), t[e];
						}
						try {
							define({}, "");
						} catch (t) {
							define = function define(t, e, r) {
								return t[e] = r;
							};
						}
						function wrap(t, e, r, n) {
							var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype);
							return o(a, "_invoke", { value: makeInvokeMethod(t, r, new Context(n || [])) }), a;
						}
						function tryCatch(t, e, r) {
							try {
								return {
									type: "normal",
									arg: t.call(e, r)
								};
							} catch (t) {
								return {
									type: "throw",
									arg: t
								};
							}
						}
						e.wrap = wrap;
						var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
						function Generator() {}
						function GeneratorFunction() {}
						function GeneratorFunctionPrototype() {}
						var p = {};
						define(p, a, function() {
							return this;
						});
						var d = Object.getPrototypeOf, v = d && d(d(values([])));
						v && v !== r && n.call(v, a) && (p = v);
						var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
						function defineIteratorMethods(t) {
							[
								"next",
								"throw",
								"return"
							].forEach(function(e) {
								define(t, e, function(t) {
									return this._invoke(e, t);
								});
							});
						}
						function AsyncIterator(t, e) {
							function invoke(r, o, i, a) {
								var c = tryCatch(t[r], t, o);
								if ("throw" !== c.type) {
									var u = c.arg, h = u.value;
									return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function(t) {
										invoke("next", t, i, a);
									}, function(t) {
										invoke("throw", t, i, a);
									}) : e.resolve(h).then(function(t) {
										u.value = t, i(u);
									}, function(t) {
										return invoke("throw", t, i, a);
									});
								}
								a(c.arg);
							}
							var r;
							o(this, "_invoke", { value: function value(t, n) {
								function callInvokeWithMethodAndArg() {
									return new e(function(e, r) {
										invoke(t, n, e, r);
									});
								}
								return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
							} });
						}
						function makeInvokeMethod(e, r, n) {
							var o = h;
							return function(i, a) {
								if (o === f) throw new Error("Generator is already running");
								if (o === s) {
									if ("throw" === i) throw a;
									return {
										value: t,
										done: !0
									};
								}
								for (n.method = i, n.arg = a;;) {
									var c = n.delegate;
									if (c) {
										var u = maybeInvokeDelegate(c, n);
										if (u) {
											if (u === y) continue;
											return u;
										}
									}
									if ("next" === n.method) n.sent = n._sent = n.arg;
									else if ("throw" === n.method) {
										if (o === h) throw o = s, n.arg;
										n.dispatchException(n.arg);
									} else "return" === n.method && n.abrupt("return", n.arg);
									o = f;
									var p = tryCatch(e, r, n);
									if ("normal" === p.type) {
										if (o = n.done ? s : l, p.arg === y) continue;
										return {
											value: p.arg,
											done: n.done
										};
									}
									"throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
								}
							};
						}
						function maybeInvokeDelegate(e, r) {
							var n = r.method, o = e.iterator[n];
							if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + n + "' method")), y;
							var i = tryCatch(o, e.iterator, r.arg);
							if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
							var a = i.arg;
							return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("iterator result is not an object"), r.delegate = null, y);
						}
						function pushTryEntry(t) {
							var e = { tryLoc: t[0] };
							1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
						}
						function resetTryEntry(t) {
							var e = t.completion || {};
							e.type = "normal", delete e.arg, t.completion = e;
						}
						function Context(t) {
							this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0);
						}
						function values(e) {
							if (e || "" === e) {
								var r = e[a];
								if (r) return r.call(e);
								if ("function" == typeof e.next) return e;
								if (!isNaN(e.length)) {
									var o = -1, i = function next() {
										for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
										return next.value = t, next.done = !0, next;
									};
									return i.next = i;
								}
							}
							throw new TypeError(_typeof(e) + " is not iterable");
						}
						return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
							value: GeneratorFunctionPrototype,
							configurable: !0
						}), o(GeneratorFunctionPrototype, "constructor", {
							value: GeneratorFunction,
							configurable: !0
						}), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
							var e = "function" == typeof t && t.constructor;
							return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
						}, e.mark = function(t) {
							return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
						}, e.awrap = function(t) {
							return { __await: t };
						}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
							return this;
						}), e.AsyncIterator = AsyncIterator, e.async = function(t, r, n, o, i) {
							void 0 === i && (i = Promise);
							var a = new AsyncIterator(wrap(t, r, n, o), i);
							return e.isGeneratorFunction(r) ? a : a.next().then(function(t) {
								return t.done ? t.value : a.next();
							});
						}, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
							return this;
						}), define(g, "toString", function() {
							return "[object Generator]";
						}), e.keys = function(t) {
							var e = Object(t), r = [];
							for (var n in e) r.push(n);
							return r.reverse(), function next() {
								for (; r.length;) {
									var t = r.pop();
									if (t in e) return next.value = t, next.done = !1, next;
								}
								return next.done = !0, next;
							};
						}, e.values = values, Context.prototype = {
							constructor: Context,
							reset: function reset(e) {
								if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
							},
							stop: function stop() {
								this.done = !0;
								var t = this.tryEntries[0].completion;
								if ("throw" === t.type) throw t.arg;
								return this.rval;
							},
							dispatchException: function dispatchException(e) {
								if (this.done) throw e;
								var r = this;
								function handle(n, o) {
									return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
								}
								for (var o = this.tryEntries.length - 1; o >= 0; --o) {
									var i = this.tryEntries[o], a = i.completion;
									if ("root" === i.tryLoc) return handle("end");
									if (i.tryLoc <= this.prev) {
										var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc");
										if (c && u) {
											if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
											if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
										} else if (c) {
											if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
										} else {
											if (!u) throw new Error("try statement without catch or finally");
											if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
										}
									}
								}
							},
							abrupt: function abrupt(t, e) {
								for (var r = this.tryEntries.length - 1; r >= 0; --r) {
									var o = this.tryEntries[r];
									if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
										var i = o;
										break;
									}
								}
								i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
								var a = i ? i.completion : {};
								return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
							},
							complete: function complete(t, e) {
								if ("throw" === t.type) throw t.arg;
								return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
							},
							finish: function finish(t) {
								for (var e = this.tryEntries.length - 1; e >= 0; --e) {
									var r = this.tryEntries[e];
									if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
								}
							},
							"catch": function _catch(t) {
								for (var e = this.tryEntries.length - 1; e >= 0; --e) {
									var r = this.tryEntries[e];
									if (r.tryLoc === t) {
										var n = r.completion;
										if ("throw" === n.type) {
											var o = n.arg;
											resetTryEntry(r);
										}
										return o;
									}
								}
								throw new Error("illegal catch attempt");
							},
							delegateYield: function delegateYield(e, r, n) {
								return this.delegate = {
									iterator: values(e),
									resultName: r,
									nextLoc: n
								}, "next" === this.method && (this.arg = t), y;
							}
						}, e;
					}
					function ownKeys(e, r) {
						var t = Object.keys(e);
						if (Object.getOwnPropertySymbols) {
							var o = Object.getOwnPropertySymbols(e);
							r && (o = o.filter(function(r) {
								return Object.getOwnPropertyDescriptor(e, r).enumerable;
							})), t.push.apply(t, o);
						}
						return t;
					}
					function _objectSpread(e) {
						for (var r = 1; r < arguments.length; r++) {
							var t = null != arguments[r] ? arguments[r] : {};
							r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
								_defineProperty(e, r, t[r]);
							}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
								Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
							});
						}
						return e;
					}
					function _defineProperty(obj, key, value) {
						key = _toPropertyKey(key);
						if (key in obj) Object.defineProperty(obj, key, {
							value,
							enumerable: true,
							configurable: true,
							writable: true
						});
						else obj[key] = value;
						return obj;
					}
					function _toPropertyKey(t) {
						var i = _toPrimitive(t, "string");
						return "symbol" == _typeof(i) ? i : String(i);
					}
					function _toPrimitive(t, r) {
						if ("object" != _typeof(t) || !t) return t;
						var e = t[Symbol.toPrimitive];
						if (void 0 !== e) {
							var i = e.call(t, r || "default");
							if ("object" != _typeof(i)) return i;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return ("string" === r ? String : Number)(t);
					}
					function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
						try {
							var info = gen[key](arg);
							var value = info.value;
						} catch (error) {
							reject(error);
							return;
						}
						if (info.done) resolve(value);
						else Promise.resolve(value).then(_next, _throw);
					}
					function _asyncToGenerator(fn) {
						return function() {
							var self = this, args = arguments;
							return new Promise(function(resolve, reject) {
								var gen = fn.apply(self, args);
								function _next(value) {
									asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
								}
								function _throw(err) {
									asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
								}
								_next(void 0);
							});
						};
					}
					function _slicedToArray(arr, i) {
						return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
					}
					function _nonIterableRest() {
						throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
					}
					function _iterableToArrayLimit(r, l) {
						var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
						if (null != t) {
							var e, n, i, u, a = [], f = !0, o = !1;
							try {
								if (i = (t = t.call(r)).next, 0 === l) {
									if (Object(t) !== t) return;
									f = !1;
								} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
							} catch (r) {
								o = !0, n = r;
							} finally {
								try {
									if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
								} finally {
									if (o) throw n;
								}
							}
							return a;
						}
					}
					function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					}
					function _createForOfIteratorHelper(o, allowArrayLike) {
						var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
						if (!it) {
							if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
								if (it) o = it;
								var i = 0;
								var F = function F() {};
								return {
									s: F,
									n: function n() {
										if (i >= o.length) return { done: true };
										return {
											done: false,
											value: o[i++]
										};
									},
									e: function e(_e) {
										throw _e;
									},
									f: F
								};
							}
							throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
						}
						var normalCompletion = true, didErr = false, err;
						return {
							s: function s() {
								it = it.call(o);
							},
							n: function n() {
								var step = it.next();
								normalCompletion = step.done;
								return step;
							},
							e: function e(_e2) {
								didErr = true;
								err = _e2;
							},
							f: function f() {
								try {
									if (!normalCompletion && it["return"] != null) it["return"]();
								} finally {
									if (didErr) throw err;
								}
							}
						};
					}
					function _toConsumableArray(arr) {
						return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
					}
					function _nonIterableSpread() {
						throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
					}
					function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if (typeof o === "string") return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						if (n === "Object" && o.constructor) n = o.constructor.name;
						if (n === "Map" || n === "Set") return Array.from(o);
						if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
					}
					function _iterableToArray(iter) {
						if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
					}
					function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return _arrayLikeToArray(arr);
					}
					function _arrayLikeToArray(arr, len) {
						if (len == null || len > arr.length) len = arr.length;
						for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
						return arr2;
					}
					/**
					* Low level shader program related functions
					*
					* You should generally not need to use these functions. They are provided
					* for those cases where you're doing something out of the ordinary
					* and you need lower level access.
					*
					* For backward compatibility they are available at both `twgl.programs` and `twgl`
					* itself
					*
					* See {@link module:twgl} for core functions
					*
					* @module twgl/programs
					*/
					var error = helper.error;
					var warn = helper.warn;
					function getElementById(id) {
						return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
					}
					var TEXTURE0 = 33984;
					var DYNAMIC_DRAW = 35048;
					var ARRAY_BUFFER = 34962;
					var ELEMENT_ARRAY_BUFFER = 34963;
					var UNIFORM_BUFFER = 35345;
					var TRANSFORM_FEEDBACK_BUFFER = 35982;
					var TRANSFORM_FEEDBACK = 36386;
					var COMPILE_STATUS = 35713;
					var LINK_STATUS = 35714;
					var FRAGMENT_SHADER = 35632;
					var VERTEX_SHADER = 35633;
					var SEPARATE_ATTRIBS = 35981;
					var ACTIVE_UNIFORMS = 35718;
					var ACTIVE_ATTRIBUTES = 35721;
					var TRANSFORM_FEEDBACK_VARYINGS = 35971;
					var ACTIVE_UNIFORM_BLOCKS = 35382;
					var UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
					var UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
					var UNIFORM_BLOCK_DATA_SIZE = 35392;
					var UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
					var FLOAT = 5126;
					var FLOAT_VEC2 = 35664;
					var FLOAT_VEC3 = 35665;
					var FLOAT_VEC4 = 35666;
					var INT = 5124;
					var INT_VEC2 = 35667;
					var INT_VEC3 = 35668;
					var INT_VEC4 = 35669;
					var BOOL = 35670;
					var BOOL_VEC2 = 35671;
					var BOOL_VEC3 = 35672;
					var BOOL_VEC4 = 35673;
					var FLOAT_MAT2 = 35674;
					var FLOAT_MAT3 = 35675;
					var FLOAT_MAT4 = 35676;
					var SAMPLER_2D = 35678;
					var SAMPLER_CUBE = 35680;
					var SAMPLER_3D = 35679;
					var SAMPLER_2D_SHADOW = 35682;
					var FLOAT_MAT2x3 = 35685;
					var FLOAT_MAT2x4 = 35686;
					var FLOAT_MAT3x2 = 35687;
					var FLOAT_MAT3x4 = 35688;
					var FLOAT_MAT4x2 = 35689;
					var FLOAT_MAT4x3 = 35690;
					var SAMPLER_2D_ARRAY = 36289;
					var SAMPLER_2D_ARRAY_SHADOW = 36292;
					var SAMPLER_CUBE_SHADOW = 36293;
					var UNSIGNED_INT = 5125;
					var UNSIGNED_INT_VEC2 = 36294;
					var UNSIGNED_INT_VEC3 = 36295;
					var UNSIGNED_INT_VEC4 = 36296;
					var INT_SAMPLER_2D = 36298;
					var INT_SAMPLER_3D = 36299;
					var INT_SAMPLER_CUBE = 36300;
					var INT_SAMPLER_2D_ARRAY = 36303;
					var UNSIGNED_INT_SAMPLER_2D = 36306;
					var UNSIGNED_INT_SAMPLER_3D = 36307;
					var UNSIGNED_INT_SAMPLER_CUBE = 36308;
					var UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
					var TEXTURE_2D = 3553;
					var TEXTURE_CUBE_MAP = 34067;
					var TEXTURE_3D = 32879;
					var TEXTURE_2D_ARRAY = 35866;
					var typeMap = {};
					/**
					* Returns the corresponding bind point for a given sampler type
					* @private
					*/
					function getBindPointForSamplerType(gl, type) {
						return typeMap[type].bindPoint;
					}
					function floatSetter(gl, location) {
						return function(v) {
							gl.uniform1f(location, v);
						};
					}
					function floatArraySetter(gl, location) {
						return function(v) {
							gl.uniform1fv(location, v);
						};
					}
					function floatVec2Setter(gl, location) {
						return function(v) {
							gl.uniform2fv(location, v);
						};
					}
					function floatVec3Setter(gl, location) {
						return function(v) {
							gl.uniform3fv(location, v);
						};
					}
					function floatVec4Setter(gl, location) {
						return function(v) {
							gl.uniform4fv(location, v);
						};
					}
					function intSetter(gl, location) {
						return function(v) {
							gl.uniform1i(location, v);
						};
					}
					function intArraySetter(gl, location) {
						return function(v) {
							gl.uniform1iv(location, v);
						};
					}
					function intVec2Setter(gl, location) {
						return function(v) {
							gl.uniform2iv(location, v);
						};
					}
					function intVec3Setter(gl, location) {
						return function(v) {
							gl.uniform3iv(location, v);
						};
					}
					function intVec4Setter(gl, location) {
						return function(v) {
							gl.uniform4iv(location, v);
						};
					}
					function uintSetter(gl, location) {
						return function(v) {
							gl.uniform1ui(location, v);
						};
					}
					function uintArraySetter(gl, location) {
						return function(v) {
							gl.uniform1uiv(location, v);
						};
					}
					function uintVec2Setter(gl, location) {
						return function(v) {
							gl.uniform2uiv(location, v);
						};
					}
					function uintVec3Setter(gl, location) {
						return function(v) {
							gl.uniform3uiv(location, v);
						};
					}
					function uintVec4Setter(gl, location) {
						return function(v) {
							gl.uniform4uiv(location, v);
						};
					}
					function floatMat2Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix2fv(location, false, v);
						};
					}
					function floatMat3Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix3fv(location, false, v);
						};
					}
					function floatMat4Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix4fv(location, false, v);
						};
					}
					function floatMat23Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix2x3fv(location, false, v);
						};
					}
					function floatMat32Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix3x2fv(location, false, v);
						};
					}
					function floatMat24Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix2x4fv(location, false, v);
						};
					}
					function floatMat42Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix4x2fv(location, false, v);
						};
					}
					function floatMat34Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix3x4fv(location, false, v);
						};
					}
					function floatMat43Setter(gl, location) {
						return function(v) {
							gl.uniformMatrix4x3fv(location, false, v);
						};
					}
					function samplerSetter(gl, type, unit, location) {
						var bindPoint = getBindPointForSamplerType(gl, type);
						return utils.isWebGL2(gl) ? function(textureOrPair) {
							var texture;
							var sampler;
							if (!textureOrPair || helper.isTexture(gl, textureOrPair)) {
								texture = textureOrPair;
								sampler = null;
							} else {
								texture = textureOrPair.texture;
								sampler = textureOrPair.sampler;
							}
							gl.uniform1i(location, unit);
							gl.activeTexture(TEXTURE0 + unit);
							gl.bindTexture(bindPoint, texture);
							gl.bindSampler(unit, sampler);
						} : function(texture) {
							gl.uniform1i(location, unit);
							gl.activeTexture(TEXTURE0 + unit);
							gl.bindTexture(bindPoint, texture);
						};
					}
					function samplerArraySetter(gl, type, unit, location, size) {
						var bindPoint = getBindPointForSamplerType(gl, type);
						var units = new Int32Array(size);
						for (var ii = 0; ii < size; ++ii) units[ii] = unit + ii;
						return utils.isWebGL2(gl) ? function(textures) {
							gl.uniform1iv(location, units);
							textures.forEach(function(textureOrPair, index) {
								gl.activeTexture(TEXTURE0 + units[index]);
								var texture;
								var sampler;
								if (!textureOrPair || helper.isTexture(gl, textureOrPair)) {
									texture = textureOrPair;
									sampler = null;
								} else {
									texture = textureOrPair.texture;
									sampler = textureOrPair.sampler;
								}
								gl.bindSampler(unit, sampler);
								gl.bindTexture(bindPoint, texture);
							});
						} : function(textures) {
							gl.uniform1iv(location, units);
							textures.forEach(function(texture, index) {
								gl.activeTexture(TEXTURE0 + units[index]);
								gl.bindTexture(bindPoint, texture);
							});
						};
					}
					typeMap[FLOAT] = {
						Type: Float32Array,
						size: 4,
						setter: floatSetter,
						arraySetter: floatArraySetter
					};
					typeMap[FLOAT_VEC2] = {
						Type: Float32Array,
						size: 8,
						setter: floatVec2Setter,
						cols: 2
					};
					typeMap[FLOAT_VEC3] = {
						Type: Float32Array,
						size: 12,
						setter: floatVec3Setter,
						cols: 3
					};
					typeMap[FLOAT_VEC4] = {
						Type: Float32Array,
						size: 16,
						setter: floatVec4Setter,
						cols: 4
					};
					typeMap[INT] = {
						Type: Int32Array,
						size: 4,
						setter: intSetter,
						arraySetter: intArraySetter
					};
					typeMap[INT_VEC2] = {
						Type: Int32Array,
						size: 8,
						setter: intVec2Setter,
						cols: 2
					};
					typeMap[INT_VEC3] = {
						Type: Int32Array,
						size: 12,
						setter: intVec3Setter,
						cols: 3
					};
					typeMap[INT_VEC4] = {
						Type: Int32Array,
						size: 16,
						setter: intVec4Setter,
						cols: 4
					};
					typeMap[UNSIGNED_INT] = {
						Type: Uint32Array,
						size: 4,
						setter: uintSetter,
						arraySetter: uintArraySetter
					};
					typeMap[UNSIGNED_INT_VEC2] = {
						Type: Uint32Array,
						size: 8,
						setter: uintVec2Setter,
						cols: 2
					};
					typeMap[UNSIGNED_INT_VEC3] = {
						Type: Uint32Array,
						size: 12,
						setter: uintVec3Setter,
						cols: 3
					};
					typeMap[UNSIGNED_INT_VEC4] = {
						Type: Uint32Array,
						size: 16,
						setter: uintVec4Setter,
						cols: 4
					};
					typeMap[BOOL] = {
						Type: Uint32Array,
						size: 4,
						setter: intSetter,
						arraySetter: intArraySetter
					};
					typeMap[BOOL_VEC2] = {
						Type: Uint32Array,
						size: 8,
						setter: intVec2Setter,
						cols: 2
					};
					typeMap[BOOL_VEC3] = {
						Type: Uint32Array,
						size: 12,
						setter: intVec3Setter,
						cols: 3
					};
					typeMap[BOOL_VEC4] = {
						Type: Uint32Array,
						size: 16,
						setter: intVec4Setter,
						cols: 4
					};
					typeMap[FLOAT_MAT2] = {
						Type: Float32Array,
						size: 32,
						setter: floatMat2Setter,
						rows: 2,
						cols: 2
					};
					typeMap[FLOAT_MAT3] = {
						Type: Float32Array,
						size: 48,
						setter: floatMat3Setter,
						rows: 3,
						cols: 3
					};
					typeMap[FLOAT_MAT4] = {
						Type: Float32Array,
						size: 64,
						setter: floatMat4Setter,
						rows: 4,
						cols: 4
					};
					typeMap[FLOAT_MAT2x3] = {
						Type: Float32Array,
						size: 32,
						setter: floatMat23Setter,
						rows: 2,
						cols: 3
					};
					typeMap[FLOAT_MAT2x4] = {
						Type: Float32Array,
						size: 32,
						setter: floatMat24Setter,
						rows: 2,
						cols: 4
					};
					typeMap[FLOAT_MAT3x2] = {
						Type: Float32Array,
						size: 48,
						setter: floatMat32Setter,
						rows: 3,
						cols: 2
					};
					typeMap[FLOAT_MAT3x4] = {
						Type: Float32Array,
						size: 48,
						setter: floatMat34Setter,
						rows: 3,
						cols: 4
					};
					typeMap[FLOAT_MAT4x2] = {
						Type: Float32Array,
						size: 64,
						setter: floatMat42Setter,
						rows: 4,
						cols: 2
					};
					typeMap[FLOAT_MAT4x3] = {
						Type: Float32Array,
						size: 64,
						setter: floatMat43Setter,
						rows: 4,
						cols: 3
					};
					typeMap[SAMPLER_2D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D
					};
					typeMap[SAMPLER_CUBE] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_CUBE_MAP
					};
					typeMap[SAMPLER_3D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_3D
					};
					typeMap[SAMPLER_2D_SHADOW] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D
					};
					typeMap[SAMPLER_2D_ARRAY] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D_ARRAY
					};
					typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D_ARRAY
					};
					typeMap[SAMPLER_CUBE_SHADOW] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_CUBE_MAP
					};
					typeMap[INT_SAMPLER_2D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D
					};
					typeMap[INT_SAMPLER_3D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_3D
					};
					typeMap[INT_SAMPLER_CUBE] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_CUBE_MAP
					};
					typeMap[INT_SAMPLER_2D_ARRAY] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D_ARRAY
					};
					typeMap[UNSIGNED_INT_SAMPLER_2D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D
					};
					typeMap[UNSIGNED_INT_SAMPLER_3D] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_3D
					};
					typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_CUBE_MAP
					};
					typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
						Type: null,
						size: 0,
						setter: samplerSetter,
						arraySetter: samplerArraySetter,
						bindPoint: TEXTURE_2D_ARRAY
					};
					function floatAttribSetter(gl, index) {
						return function(b) {
							if (b.value) {
								gl.disableVertexAttribArray(index);
								switch (b.value.length) {
									case 4:
										gl.vertexAttrib4fv(index, b.value);
										break;
									case 3:
										gl.vertexAttrib3fv(index, b.value);
										break;
									case 2:
										gl.vertexAttrib2fv(index, b.value);
										break;
									case 1:
										gl.vertexAttrib1fv(index, b.value);
										break;
									default: throw new Error("the length of a float constant value must be between 1 and 4!");
								}
							} else {
								gl.bindBuffer(ARRAY_BUFFER, b.buffer);
								gl.enableVertexAttribArray(index);
								gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
								if (gl.vertexAttribDivisor) gl.vertexAttribDivisor(index, b.divisor || 0);
							}
						};
					}
					function intAttribSetter(gl, index) {
						return function(b) {
							if (b.value) {
								gl.disableVertexAttribArray(index);
								if (b.value.length === 4) gl.vertexAttrib4iv(index, b.value);
								else throw new Error("The length of an integer constant value must be 4!");
							} else {
								gl.bindBuffer(ARRAY_BUFFER, b.buffer);
								gl.enableVertexAttribArray(index);
								gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT, b.stride || 0, b.offset || 0);
								if (gl.vertexAttribDivisor) gl.vertexAttribDivisor(index, b.divisor || 0);
							}
						};
					}
					function uintAttribSetter(gl, index) {
						return function(b) {
							if (b.value) {
								gl.disableVertexAttribArray(index);
								if (b.value.length === 4) gl.vertexAttrib4uiv(index, b.value);
								else throw new Error("The length of an unsigned integer constant value must be 4!");
							} else {
								gl.bindBuffer(ARRAY_BUFFER, b.buffer);
								gl.enableVertexAttribArray(index);
								gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT, b.stride || 0, b.offset || 0);
								if (gl.vertexAttribDivisor) gl.vertexAttribDivisor(index, b.divisor || 0);
							}
						};
					}
					function matAttribSetter(gl, index, typeInfo) {
						var defaultSize = typeInfo.size;
						var count = typeInfo.count;
						return function(b) {
							gl.bindBuffer(ARRAY_BUFFER, b.buffer);
							var numComponents = b.size || b.numComponents || defaultSize;
							var size = numComponents / count;
							var type = b.type || FLOAT;
							var stride = typeMap[type].size * numComponents;
							var normalize = b.normalize || false;
							var offset = b.offset || 0;
							var rowOffset = stride / count;
							for (var i = 0; i < count; ++i) {
								gl.enableVertexAttribArray(index + i);
								gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
								if (gl.vertexAttribDivisor) gl.vertexAttribDivisor(index + i, b.divisor || 0);
							}
						};
					}
					var attrTypeMap = {};
					attrTypeMap[FLOAT] = {
						size: 4,
						setter: floatAttribSetter
					};
					attrTypeMap[FLOAT_VEC2] = {
						size: 8,
						setter: floatAttribSetter
					};
					attrTypeMap[FLOAT_VEC3] = {
						size: 12,
						setter: floatAttribSetter
					};
					attrTypeMap[FLOAT_VEC4] = {
						size: 16,
						setter: floatAttribSetter
					};
					attrTypeMap[INT] = {
						size: 4,
						setter: intAttribSetter
					};
					attrTypeMap[INT_VEC2] = {
						size: 8,
						setter: intAttribSetter
					};
					attrTypeMap[INT_VEC3] = {
						size: 12,
						setter: intAttribSetter
					};
					attrTypeMap[INT_VEC4] = {
						size: 16,
						setter: intAttribSetter
					};
					attrTypeMap[UNSIGNED_INT] = {
						size: 4,
						setter: uintAttribSetter
					};
					attrTypeMap[UNSIGNED_INT_VEC2] = {
						size: 8,
						setter: uintAttribSetter
					};
					attrTypeMap[UNSIGNED_INT_VEC3] = {
						size: 12,
						setter: uintAttribSetter
					};
					attrTypeMap[UNSIGNED_INT_VEC4] = {
						size: 16,
						setter: uintAttribSetter
					};
					attrTypeMap[BOOL] = {
						size: 4,
						setter: intAttribSetter
					};
					attrTypeMap[BOOL_VEC2] = {
						size: 8,
						setter: intAttribSetter
					};
					attrTypeMap[BOOL_VEC3] = {
						size: 12,
						setter: intAttribSetter
					};
					attrTypeMap[BOOL_VEC4] = {
						size: 16,
						setter: intAttribSetter
					};
					attrTypeMap[FLOAT_MAT2] = {
						size: 4,
						setter: matAttribSetter,
						count: 2
					};
					attrTypeMap[FLOAT_MAT3] = {
						size: 9,
						setter: matAttribSetter,
						count: 3
					};
					attrTypeMap[FLOAT_MAT4] = {
						size: 16,
						setter: matAttribSetter,
						count: 4
					};
					var errorRE = /ERROR:\s*\d+:(\d+)/gi;
					function addLineNumbersWithError(src) {
						var log = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
						var lineOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
						var matches = _toConsumableArray(log.matchAll(errorRE));
						var lineNoToErrorMap = new Map(matches.map(function(m, ndx) {
							var lineNo = parseInt(m[1]);
							var next = matches[ndx + 1];
							var end = next ? next.index : log.length;
							var msg = log.substring(m.index, end);
							return [lineNo - 1, msg];
						}));
						return src.split("\n").map(function(line, lineNo) {
							var err = lineNoToErrorMap.get(lineNo);
							return "".concat(lineNo + 1 + lineOffset, ": ").concat(line).concat(err ? "\n\n^^^ ".concat(err) : "");
						}).join("\n");
					}
					/**
					* Error Callback
					* @callback ErrorCallback
					* @param {string} msg error message.
					* @param {number} [lineOffset] amount to add to line number
					* @memberOf module:twgl
					*/
					/**
					* Program Callback
					* @callback ProgramCallback
					* @param {string} [err] error message, falsy if no error
					* @param {WebGLProgram|module:twgl.ProgramInfo} [result] the program or programInfo
					*/
					var spaceRE = /^[ \t]*\n/;
					/**
					* Remove the first end of line because WebGL 2.0 requires
					* #version 300 es
					* as the first line. No whitespace allowed before that line
					* so
					*
					* <script>
					* #version 300 es
					* <\/script>
					*
					* Has one line before it which is invalid according to GLSL ES 3.00
					*
					* @param {string} shaderSource The source of the shader
					* @returns {{shaderSource: string, lineOffset: number}}
					* @private
					*/
					function prepShaderSource(shaderSource) {
						var lineOffset = 0;
						if (spaceRE.test(shaderSource)) {
							lineOffset = 1;
							shaderSource = shaderSource.replace(spaceRE, "");
						}
						return {
							lineOffset,
							shaderSource
						};
					}
					/**
					* @param {module:twgl.ProgramOptions} progOptions
					* @param {string} msg
					* @return null
					* @private
					*/
					function reportError(progOptions, msg) {
						progOptions.errorCallback(msg);
						if (progOptions.callback) setTimeout(function() {
							progOptions.callback("".concat(msg, "\n").concat(progOptions.errors.join("\n")));
						});
						return null;
					}
					/**
					* Check Shader status
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {number} shaderType The shader type
					* @param {WebGLShader} shader The shader
					* @param {ErrorCallback} [errFn] function to receive error message.
					* @return {string} errors or empty string
					* @private
					*/
					function checkShaderStatus(gl, shaderType, shader, errFn) {
						errFn = errFn || error;
						if (!gl.getShaderParameter(shader, COMPILE_STATUS)) {
							var lastError = gl.getShaderInfoLog(shader);
							var _prepShaderSource = prepShaderSource(gl.getShaderSource(shader)), lineOffset = _prepShaderSource.lineOffset, shaderSource = _prepShaderSource.shaderSource;
							var _error = "".concat(addLineNumbersWithError(shaderSource, lastError, lineOffset), "\nError compiling ").concat(utils.glEnumToString(gl, shaderType), ": ").concat(lastError);
							errFn(_error);
							return _error;
						}
						return "";
					}
					/**
					* @typedef {Object} FullProgramSpec
					* @property {string[]} shaders the shader source or element ids.
					* @property {function(string)} [errorCallback] callback for errors
					* @property {Object.<string,number>|string[]} [attribLocations] a attribute name to location map, or array of attribute names where index = location.
					* @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
					*   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
					*   you can pass an array of names.
					* @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
					* @property {ProgramCallback} [callback] callback for async program compilation.
					* @memberOf module:twgl
					*/
					/**
					* @typedef {string[]|module:twgl.FullProgramSpec} ProgramSpec
					* @memberOf module:twgl
					*/
					/**
					* @typedef {Object} ProgramOptions
					* @property {function(string)} [errorCallback] callback for errors
					* @property {Object.<string,number>|string[]} [attribLocations] a attribute name to location map, or array of attribute names where index = location.
					* @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
					*   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
					*   you can pass an array of names.
					* @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
					* @property {ProgramCallback} [callback] callback for async program compilation.
					* @memberOf module:twgl
					*/
					/**
					* Gets the program options based on all these optional arguments
					* @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
					* @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
					* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
					*        on error. If you want something else pass an callback. It's passed an error message.
					* @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
					* @private
					*/
					function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
						var transformFeedbackVaryings;
						var transformFeedbackMode;
						var callback;
						if (typeof opt_locations === "function") {
							opt_errorCallback = opt_locations;
							opt_locations = void 0;
						}
						if (typeof opt_attribs === "function") {
							opt_errorCallback = opt_attribs;
							opt_attribs = void 0;
						} else if (opt_attribs && !Array.isArray(opt_attribs)) {
							var opt = opt_attribs;
							opt_errorCallback = opt.errorCallback;
							opt_attribs = opt.attribLocations;
							transformFeedbackVaryings = opt.transformFeedbackVaryings;
							transformFeedbackMode = opt.transformFeedbackMode;
							callback = opt.callback;
						}
						var _errorCallback = opt_errorCallback || error;
						var errors = [];
						var options = {
							errorCallback: function errorCallback(msg) {
								errors.push(msg);
								for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
								_errorCallback.apply(void 0, [msg].concat(args));
							},
							transformFeedbackVaryings,
							transformFeedbackMode,
							callback,
							errors
						};
						var attribLocations = {};
						if (Array.isArray(opt_attribs)) opt_attribs.forEach(function(attrib, ndx) {
							attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
						});
						else attribLocations = opt_attribs || {};
						options.attribLocations = attribLocations;
						return options;
					}
					var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
					function getShaderTypeFromScriptType(gl, scriptType) {
						if (scriptType.indexOf("frag") >= 0) return FRAGMENT_SHADER;
						else if (scriptType.indexOf("vert") >= 0) return VERTEX_SHADER;
					}
					function deleteProgramAndShaders(gl, program, notThese) {
						var _iterator = _createForOfIteratorHelper(gl.getAttachedShaders(program)), _step;
						try {
							for (_iterator.s(); !(_step = _iterator.n()).done;) {
								var shader = _step.value;
								if (!notThese.has(shader)) gl.deleteShader(shader);
							}
						} catch (err) {
							_iterator.e(err);
						} finally {
							_iterator.f();
						}
						gl.deleteProgram(program);
					}
					var wait = function wait() {
						var ms = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
						return new Promise(function(resolve) {
							return setTimeout(resolve, ms);
						});
					};
					function createProgramNoCheck(gl, shaders, programOptions) {
						var program = gl.createProgram();
						var _getProgramOptions = getProgramOptions(programOptions), attribLocations = _getProgramOptions.attribLocations, transformFeedbackVaryings = _getProgramOptions.transformFeedbackVaryings, transformFeedbackMode = _getProgramOptions.transformFeedbackMode;
						for (var ndx = 0; ndx < shaders.length; ++ndx) {
							var shader = shaders[ndx];
							if (typeof shader === "string") {
								var elem = getElementById(shader);
								var src = elem ? elem.text : shader;
								var type = gl[defaultShaderType[ndx]];
								if (elem && elem.type) type = getShaderTypeFromScriptType(gl, elem.type) || type;
								shader = gl.createShader(type);
								gl.shaderSource(shader, prepShaderSource(src).shaderSource);
								gl.compileShader(shader);
							}
							gl.attachShader(program, shader);
						}
						Object.entries(attribLocations).forEach(function(_ref) {
							var _ref2 = _slicedToArray(_ref, 2), attrib = _ref2[0], loc = _ref2[1];
							return gl.bindAttribLocation(program, loc, attrib);
						});
						var varyings = transformFeedbackVaryings;
						if (varyings) {
							if (varyings.attribs) varyings = varyings.attribs;
							if (!Array.isArray(varyings)) varyings = Object.keys(varyings);
							gl.transformFeedbackVaryings(program, varyings, transformFeedbackMode || SEPARATE_ATTRIBS);
						}
						gl.linkProgram(program);
						return program;
					}
					/**
					* Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
					* program.
					*
					* NOTE: There are 4 signatures for this function
					*
					*     twgl.createProgram(gl, [vs, fs], options);
					*     twgl.createProgram(gl, [vs, fs], opt_errFunc);
					*     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
					*     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
					* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
					* @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
					* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
					*        on error. If you want something else pass an callback. It's passed an error message.
					* @return {WebGLProgram?} the created program or null if error of a callback was provided.
					* @memberOf module:twgl/programs
					*/
					function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
						var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
						var shaderSet = new Set(shaders);
						var program = createProgramNoCheck(gl, shaders, progOptions);
						function hasErrors(gl, program) {
							var errors = getProgramErrors(gl, program, progOptions.errorCallback);
							if (errors) deleteProgramAndShaders(gl, program, shaderSet);
							return errors;
						}
						if (progOptions.callback) {
							waitForProgramLinkCompletionAsync(gl, program).then(function() {
								var errors = hasErrors(gl, program);
								progOptions.callback(errors, errors ? void 0 : program);
							});
							return;
						}
						return hasErrors(gl, program) ? void 0 : program;
					}
					/**
					* This only works because the functions it wraps the first 2 arguments
					* are gl and any, followed by things that become programOptions
					* @private
					*/
					function wrapCallbackFnToAsyncFn(fn) {
						return function(gl, arg1) {
							for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) args[_key2 - 2] = arguments[_key2];
							return new Promise(function(resolve, reject) {
								var programOptions = getProgramOptions.apply(void 0, args);
								programOptions.callback = function(err, program) {
									if (err) reject(err);
									else resolve(program);
								};
								fn(gl, arg1, programOptions);
							});
						};
					}
					exports$7.createProgramAsync = wrapCallbackFnToAsyncFn(createProgram);
					exports$7.createProgramInfoAsync = wrapCallbackFnToAsyncFn(createProgramInfo);
					function waitForProgramLinkCompletionAsync(_x, _x2) {
						return _waitForProgramLinkCompletionAsync.apply(this, arguments);
					}
					function _waitForProgramLinkCompletionAsync() {
						_waitForProgramLinkCompletionAsync = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(gl, program) {
							var ext, checkFn, waitTime;
							return _regeneratorRuntime().wrap(function _callee$(_context) {
								while (1) switch (_context.prev = _context.next) {
									case 0:
										ext = gl.getExtension("KHR_parallel_shader_compile");
										checkFn = ext ? function(gl, program) {
											return gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR);
										} : function() {
											return true;
										};
										waitTime = 0;
									case 3:
										_context.next = 5;
										return wait(waitTime);
									case 5: waitTime = 1e3 / 60;
									case 6: if (!checkFn(gl, program)) {
										_context.next = 3;
										break;
									}
									case 7:
									case "end": return _context.stop();
								}
							}, _callee);
						}));
						return _waitForProgramLinkCompletionAsync.apply(this, arguments);
					}
					function waitForAllProgramsLinkCompletionAsync(_x3, _x4) {
						return _waitForAllProgramsLinkCompletionAsync.apply(this, arguments);
					}
					/**
					* Check a program's link status
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {WebGLProgram} program Program to check
					* @param {ErrorCallback} [errFn] func for errors
					* @return {string?} errors if program is failed, else undefined
					* @private
					*/
					function _waitForAllProgramsLinkCompletionAsync() {
						_waitForAllProgramsLinkCompletionAsync = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(gl, programs) {
							var _i3, _Object$values2, program;
							return _regeneratorRuntime().wrap(function _callee2$(_context2) {
								while (1) switch (_context2.prev = _context2.next) {
									case 0: _i3 = 0, _Object$values2 = Object.values(programs);
									case 1:
										if (!(_i3 < _Object$values2.length)) {
											_context2.next = 8;
											break;
										}
										program = _Object$values2[_i3];
										_context2.next = 5;
										return waitForProgramLinkCompletionAsync(gl, program);
									case 5:
										_i3++;
										_context2.next = 1;
										break;
									case 8:
									case "end": return _context2.stop();
								}
							}, _callee2);
						}));
						return _waitForAllProgramsLinkCompletionAsync.apply(this, arguments);
					}
					function getProgramErrors(gl, program, errFn) {
						errFn = errFn || error;
						if (!gl.getProgramParameter(program, LINK_STATUS)) {
							var lastError = gl.getProgramInfoLog(program);
							errFn("Error in program linking: ".concat(lastError));
							var errors = gl.getAttachedShaders(program).map(function(shader) {
								return checkShaderStatus(gl, gl.getShaderParameter(shader, gl.SHADER_TYPE), shader, errFn);
							});
							return "".concat(lastError, "\n").concat(errors.filter(function(_) {
								return _;
							}).join("\n"));
						}
					}
					/**
					* Creates a program from 2 script tags.
					*
					* NOTE: There are 4 signatures for this function
					*
					*     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
					*     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
					*     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
					*     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext
					*        to use.
					* @param {string[]} shaderScriptIds Array of ids of the script
					*        tags for the shaders. The first is assumed to be the
					*        vertex shader, the second the fragment shader.
					* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
					* @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
					* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
					*        on error. If you want something else pass an callback. It's passed an error message.
					* @return {WebGLProgram?} the created program or null if error or a callback was provided.
					* @memberOf module:twgl/programs
					*/
					function createProgramFromScripts(gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
						var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
						var shaders = [];
						var _iterator2 = _createForOfIteratorHelper(shaderScriptIds), _step2;
						try {
							for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
								var scriptId = _step2.value;
								var shaderScript = getElementById(scriptId);
								if (!shaderScript) return reportError(progOptions, "unknown script element: ".concat(scriptId));
								shaders.push(shaderScript.text);
							}
						} catch (err) {
							_iterator2.e(err);
						} finally {
							_iterator2.f();
						}
						return createProgram(gl, shaders, progOptions);
					}
					/**
					* Creates a program from 2 sources.
					*
					* NOTE: There are 4 signatures for this function
					*
					*     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
					*     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
					*     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
					*     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext
					*        to use.
					* @param {string[]} shaderSources Array of sources for the
					*        shaders. The first is assumed to be the vertex shader,
					*        the second the fragment shader.
					* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
					* @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
					* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
					*        on error. If you want something else pass an callback. It's passed an error message.
					* @return {WebGLProgram?} the created program or null if error or a callback was provided.
					* @memberOf module:twgl/programs
					*/
					function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
						return createProgram(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback);
					}
					/**
					* Returns true if attribute/uniform is a reserved/built in
					*
					* It makes no sense to me why GL returns these because it's
					* illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
					* with names that start with `gl_` (and `webgl_` in WebGL)
					*
					* I can only assume they are there because they might count
					* when computing the number of uniforms/attributes used when you want to
					* know if you are near the limit. That doesn't really make sense
					* to me but the fact that these get returned are in the spec.
					*
					* @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
					*    `gl.getActiveAttrib`.
					* @return {bool} true if it's reserved
					* @private
					*/
					function isBuiltIn(info) {
						var name = info.name;
						return name.startsWith("gl_") || name.startsWith("webgl_");
					}
					var tokenRE = /(\.|\[|]|\w+)/g;
					var isDigit = function isDigit(s) {
						return s >= "0" && s <= "9";
					};
					function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
						var tokens = fullPath.split(tokenRE).filter(function(s) {
							return s !== "";
						});
						var tokenNdx = 0;
						var path = "";
						for (;;) {
							var token = tokens[tokenNdx++];
							path += token;
							var isArrayIndex = isDigit(token[0]);
							var accessor = isArrayIndex ? parseInt(token) : token;
							if (isArrayIndex) path += tokens[tokenNdx++];
							if (tokenNdx === tokens.length) {
								node[accessor] = setter;
								break;
							} else {
								var _token = tokens[tokenNdx++];
								var isArray = _token === "[";
								var child = node[accessor] || (isArray ? [] : {});
								node[accessor] = child;
								node = child;
								uniformSetters[path] = uniformSetters[path] || function(node) {
									return function(value) {
										setUniformTree(node, value);
									};
								}(child);
								path += _token;
							}
						}
					}
					/**
					* Creates setter functions for all uniforms of a shader
					* program.
					*
					* @see {@link module:twgl.setUniforms}
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {WebGLProgram} program the program to create setters for.
					* @returns {Object.<string, function>} an object with a setter by name for each uniform
					* @memberOf module:twgl/programs
					*/
					function createUniformSetters(gl, program) {
						var textureUnit = 0;
						/**
						* Creates a setter for a uniform of the given program with it's
						* location embedded in the setter.
						* @param {WebGLProgram} program
						* @param {WebGLUniformInfo} uniformInfo
						* @returns {function} the created setter.
						*/
						function createUniformSetter(program, uniformInfo, location) {
							var isArray = uniformInfo.name.endsWith("[0]");
							var type = uniformInfo.type;
							var typeInfo = typeMap[type];
							if (!typeInfo) throw new Error("unknown type: 0x".concat(type.toString(16)));
							var setter;
							if (typeInfo.bindPoint) {
								var unit = textureUnit;
								textureUnit += uniformInfo.size;
								if (isArray) setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
								else setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
							} else if (typeInfo.arraySetter && isArray) setter = typeInfo.arraySetter(gl, location);
							else setter = typeInfo.setter(gl, location);
							setter.location = location;
							return setter;
						}
						var uniformSetters = {};
						var uniformTree = {};
						var numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
						for (var ii = 0; ii < numUniforms; ++ii) {
							var uniformInfo = gl.getActiveUniform(program, ii);
							if (isBuiltIn(uniformInfo)) continue;
							var name = uniformInfo.name;
							if (name.endsWith("[0]")) name = name.substr(0, name.length - 3);
							var location = gl.getUniformLocation(program, uniformInfo.name);
							if (location) {
								var setter = createUniformSetter(program, uniformInfo, location);
								uniformSetters[name] = setter;
								addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
							}
						}
						return uniformSetters;
					}
					/**
					* @typedef {Object} TransformFeedbackInfo
					* @property {number} index index of transform feedback
					* @property {number} type GL type
					* @property {number} size 1 - 4
					* @memberOf module:twgl
					*/
					/**
					* Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {WebGLProgram} program an existing WebGLProgram.
					* @return {Object<string, module:twgl.TransformFeedbackInfo>}
					* @memberOf module:twgl
					*/
					function createTransformFeedbackInfo(gl, program) {
						var info = {};
						var numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
						for (var ii = 0; ii < numVaryings; ++ii) {
							var varying = gl.getTransformFeedbackVarying(program, ii);
							info[varying.name] = {
								index: ii,
								type: varying.type,
								size: varying.size
							};
						}
						return info;
					}
					/**
					* Binds buffers for transform feedback.
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
					* @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
					* @memberOf module:twgl
					*/
					function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
						if (transformFeedbackInfo.transformFeedbackInfo) transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
						if (bufferInfo.attribs) bufferInfo = bufferInfo.attribs;
						for (var name in bufferInfo) {
							var varying = transformFeedbackInfo[name];
							if (varying) {
								var buf = bufferInfo[name];
								if (buf.offset) gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
								else gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
							}
						}
					}
					/**
					* Creates a transform feedback and sets the buffers
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
					* @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
					* @return {WebGLTransformFeedback} the created transform feedback
					* @memberOf module:twgl
					*/
					function createTransformFeedback(gl, programInfo, bufferInfo) {
						var tf = gl.createTransformFeedback();
						gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
						gl.useProgram(programInfo.program);
						bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
						gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
						return tf;
					}
					/**
					* @typedef {Object} UniformData
					* @property {string} name The name of the uniform
					* @property {number} type The WebGL type enum for this uniform
					* @property {number} size The number of elements for this uniform
					* @property {number} blockNdx The block index this uniform appears in
					* @property {number} offset The byte offset in the block for this uniform's value
					* @memberOf module:twgl
					*/
					/**
					* The specification for one UniformBlockObject
					*
					* @typedef {Object} BlockSpec
					* @property {number} index The index of the block.
					* @property {number} size The size in bytes needed for the block
					* @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
					*    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
					* @property {bool} usedByVertexShader Self explanatory
					* @property {bool} usedByFragmentShader Self explanatory
					* @property {bool} used Self explanatory
					* @memberOf module:twgl
					*/
					/**
					* A `UniformBlockSpec` represents the data needed to create and bind
					* UniformBlockObjects for a given program
					*
					* @typedef {Object} UniformBlockSpec
					* @property {Object.<string, module:twgl.BlockSpec>} blockSpecs The BlockSpec for each block by block name
					* @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
					* @memberOf module:twgl
					*/
					/**
					* Creates a UniformBlockSpec for the given program.
					*
					* A UniformBlockSpec represents the data needed to create and bind
					* UniformBlockObjects
					*
					* @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
					* @param {WebGLProgram} program A WebGLProgram for a successfully linked program
					* @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
					* @memberOf module:twgl/programs
					*/
					function createUniformBlockSpecFromProgram(gl, program) {
						var numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
						var uniformData = [];
						var uniformIndices = [];
						for (var ii = 0; ii < numUniforms; ++ii) {
							uniformIndices.push(ii);
							uniformData.push({});
							var uniformInfo = gl.getActiveUniform(program, ii);
							uniformData[ii].name = uniformInfo.name;
						}
						[
							["UNIFORM_TYPE", "type"],
							["UNIFORM_SIZE", "size"],
							["UNIFORM_BLOCK_INDEX", "blockNdx"],
							["UNIFORM_OFFSET", "offset"]
						].forEach(function(pair) {
							var pname = pair[0];
							var key = pair[1];
							gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
								uniformData[ndx][key] = value;
							});
						});
						var blockSpecs = {};
						var numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
						for (var _ii = 0; _ii < numUniformBlocks; ++_ii) {
							var name = gl.getActiveUniformBlockName(program, _ii);
							var blockSpec = {
								index: gl.getUniformBlockIndex(program, name),
								usedByVertexShader: gl.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
								usedByFragmentShader: gl.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
								size: gl.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_DATA_SIZE),
								uniformIndices: gl.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
							};
							blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
							blockSpecs[name] = blockSpec;
						}
						return {
							blockSpecs,
							uniformData
						};
					}
					var arraySuffixRE = /\[\d+\]\.$/;
					var pad = function pad(v, padding) {
						return ((v + (padding - 1)) / padding | 0) * padding;
					};
					function createUniformBlockUniformSetter(view, isArray, rows, cols) {
						if (isArray || rows) {
							cols = cols || 1;
							var totalRows = view.length / 4;
							return function(value) {
								var dst = 0;
								var src = 0;
								for (var row = 0; row < totalRows; ++row) {
									for (var col = 0; col < cols; ++col) view[dst++] = value[src++];
									dst += 4 - cols;
								}
							};
						} else return function(value) {
							if (value.length) view.set(value);
							else view[0] = value;
						};
					}
					/**
					* Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
					* and a corresponding WebGLBuffer to hold those values on the GPU
					*
					* @typedef {Object} UniformBlockInfo
					* @property {string} name The name of the block
					* @property {ArrayBuffer} array The array buffer that contains the uniform values
					* @property {Float32Array} asFloat A float view on the array buffer. This is useful
					*    inspecting the contents of the buffer in the debugger.
					* @property {Uint8Array} asUint8t A uint8 view on the array buffer.
					* @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
					* @property {number} [offset] offset into buffer
					* @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
					*   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
					*   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
					*   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
					*   `Int32Array` view, etc.
					* @property {Object<string, function>} setters A setter for this uniform.
					*   The reason to use setters is elements of arrays are padded to vec4 sizes which
					*   means if you want to set an array of 4 floats you'd need to set 16 values
					*   (or set elements 0, 4, 8, 12). In other words
					*   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
					*   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
					*   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
					*   or via {@link module:twgl.setBlockUniforms}
					* @memberOf module:twgl
					*/
					/**
					* Options to allow createUniformBlockInfo to use an existing buffer and arrayBuffer at an offset
					* @typedef {Object} UniformBlockInfoOptions
					* @property {ArrayBuffer} [array] an existing array buffer to use for values
					* @property {number} [offset] the offset in bytes to use in the array buffer (default = 0)
					* @property {WebGLBuffer} [buffer] the buffer to use for this uniform block info
					* @property {number} [bufferOffset] the offset in bytes in the buffer to use (default = use offset above)
					*/
					/**
					* Creates a `UniformBlockInfo` for the specified block
					*
					* Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
					* `UniformBlockInfo` is returned**. This is because when debugging GLSL
					* it is common to comment out large portions of a shader or for example set
					* the final output to a constant. When that happens blocks get optimized out.
					* If this function did not create dummy blocks your code would crash when debugging.
					*
					* @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
					* @param {WebGLProgram} program A WebGLProgram
					* @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
					*     from {@link module:twgl.createUniformBlockSpecFromProgram}.
					* @param {string} blockName The name of the block.
					* @param {module:twgl.UniformBlockInfoOptions} [options] Optional options for using existing an existing buffer and arrayBuffer
					* @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
					* @memberOf module:twgl/programs
					*/
					function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
						var _options$offset, _options$array, _options$buffer, _options$bufferOffset;
						var options = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
						var blockSpecs = uniformBlockSpec.blockSpecs;
						var uniformData = uniformBlockSpec.uniformData;
						var blockSpec = blockSpecs[blockName];
						if (!blockSpec) {
							warn("no uniform block object named:", blockName);
							return {
								name: blockName,
								uniforms: {}
							};
						}
						var offset = (_options$offset = options.offset) !== null && _options$offset !== void 0 ? _options$offset : 0;
						var array = (_options$array = options.array) !== null && _options$array !== void 0 ? _options$array : new ArrayBuffer(blockSpec.size);
						var buffer = (_options$buffer = options.buffer) !== null && _options$buffer !== void 0 ? _options$buffer : gl.createBuffer();
						var uniformBufferIndex = blockSpec.index;
						gl.bindBuffer(UNIFORM_BUFFER, buffer);
						if (!options.buffer) gl.bufferData(UNIFORM_BUFFER, array.byteLength, DYNAMIC_DRAW);
						gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
						var prefix = blockName + ".";
						if (arraySuffixRE.test(prefix)) prefix = prefix.replace(arraySuffixRE, ".");
						var uniforms = {};
						var setters = {};
						var setterTree = {};
						blockSpec.uniformIndices.forEach(function(uniformNdx) {
							var data = uniformData[uniformNdx];
							var name = data.name;
							if (name.startsWith(prefix)) name = name.substr(prefix.length);
							var isArray = name.endsWith("[0]");
							if (isArray) name = name.substr(0, name.length - 3);
							var typeInfo = typeMap[data.type];
							var Type = typeInfo.Type;
							var byteLength = isArray ? pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
							var uniformView = new Type(array, offset + data.offset, byteLength / Type.BYTES_PER_ELEMENT);
							uniforms[name] = uniformView;
							var setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
							setters[name] = setter;
							addSetterToUniformTree(name, setter, setterTree, setters);
						});
						return {
							name: blockName,
							array,
							asFloat: new Float32Array(array),
							asUint8: new Uint8Array(array),
							buffer,
							uniforms,
							setters,
							offset: (_options$bufferOffset = options.bufferOffset) !== null && _options$bufferOffset !== void 0 ? _options$bufferOffset : offset,
							size: blockSpec.size
						};
					}
					/**
					* Creates a `UniformBlockInfo` for the specified block
					*
					* Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
					* `UniformBlockInfo` is returned**. This is because when debugging GLSL
					* it is common to comment out large portions of a shader or for example set
					* the final output to a constant. When that happens blocks get optimized out.
					* If this function did not create dummy blocks your code would crash when debugging.
					*
					* @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
					* @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
					*     as returned from {@link module:twgl.createProgramInfo}
					* @param {string} blockName The name of the block.
					* @param {module:twgl.UniformBlockInfoOptions} [options] Optional options for using existing an existing buffer and arrayBuffer
					* @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
					* @memberOf module:twgl/programs
					*/
					function createUniformBlockInfo(gl, programInfo, blockName) {
						var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
						return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName, options);
					}
					/**
					* Binds a uniform block to the matching uniform block point.
					* Matches by blocks by name so blocks must have the same name not just the same
					* structure.
					*
					* If you have changed any values and you upload the values into the corresponding WebGLBuffer
					* call {@link module:twgl.setUniformBlock} instead.
					*
					* @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
					* @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
					*     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
					*     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
					* @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
					*     {@link module:twgl.createUniformBlockInfo}.
					* @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
					*     no buffer is bound.
					* @memberOf module:twgl/programs
					*/
					function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
						var blockSpec = (programInfo.uniformBlockSpec || programInfo).blockSpecs[uniformBlockInfo.name];
						if (blockSpec) {
							var _uniformBlockInfo$siz;
							var bufferBindIndex = blockSpec.index;
							gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, (_uniformBlockInfo$siz = uniformBlockInfo.size) !== null && _uniformBlockInfo$siz !== void 0 ? _uniformBlockInfo$siz : uniformBlockInfo.array.byteLength);
							return true;
						}
						return false;
					}
					/**
					* Uploads the current uniform values to the corresponding WebGLBuffer
					* and binds that buffer to the program's corresponding bind point for the uniform block object.
					*
					* If you haven't changed any values and you only need to bind the uniform block object
					* call {@link module:twgl.bindUniformBlock} instead.
					*
					* @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
					* @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
					*     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
					*     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
					* @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
					*     {@link module:twgl.createUniformBlockInfo}.
					* @memberOf module:twgl/programs
					*/
					function setUniformBlock(gl, programInfo, uniformBlockInfo) {
						if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) gl.bufferSubData(UNIFORM_BUFFER, 0, uniformBlockInfo.asUint8, uniformBlockInfo.offset || 0, uniformBlockInfo.size || 0);
					}
					/**
					* Sets values of a uniform block object
					*
					* @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
					* @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
					*    type of uniform. So for example given a block like
					*
					*       uniform SomeBlock {
					*         float someFloat;
					*         vec2 someVec2;
					*         vec3 someVec3Array[2];
					*         int someInt;
					*       }
					*
					*  You can set the values of the uniform block with
					*
					*       twgl.setBlockUniforms(someBlockInfo, {
					*          someFloat: 12.3,
					*          someVec2: [1, 2],
					*          someVec3Array: [1, 2, 3, 4, 5, 6],
					*          someInt: 5,
					*       }
					*
					*  Arrays can be JavaScript arrays or typed arrays
					*
					*  You can also fill out structure and array values either via
					*  shortcut. Example
					*
					*     // -- in shader --
					*     struct Light {
					*       float intensity;
					*       vec4 color;
					*       float nearFar[2];
					*     };
					*     uniform Lights {
					*       Light lights[2];
					*     };
					*
					*     // in JavaScript
					*
					*     twgl.setBlockUniforms(someBlockInfo, {
					*       lights: [
					*         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
					*         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
					*       ],
					*     });
					*
					*   or the more traditional way
					*
					*     twgl.setBlockUniforms(someBlockInfo, {
					*       "lights[0].intensity": 5.0,
					*       "lights[0].color": [1, 0, 0, 1],
					*       "lights[0].nearFar": [0.1, 10],
					*       "lights[1].intensity": 2.0,
					*       "lights[1].color": [0, 0, 1, 1],
					*       "lights[1].nearFar": [0.2, 15],
					*     });
					*
					*   You can also specify partial paths
					*
					*     twgl.setBlockUniforms(someBlockInfo, {
					*       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
					*     });
					*
					*   But you can not specify leaf array indices.
					*
					*     twgl.setBlockUniforms(someBlockInfo, {
					*       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
					*       'lights[1].nearFar': [0.2, 15], // GOOD
					*     });
					*
					*  **IMPORTANT!**, packing in a UniformBlock is unintuitive.
					*  For example the actual layout of `someVec3Array` above in memory
					*  is `1, 2, 3, unused, 4, 5, 6, unused`. twgl takes in 6 values
					*  as shown about and copies them, skipping the padding. This might
					*  be confusing if you're already familiar with Uniform blocks.
					*
					*  If you want to deal with the padding yourself you can access the array
					*  buffer views directly. eg:
					*
					*      someBlockInfo.someVec3Array.set([1, 2, 3, 0, 4, 5, 6, 0]);
					*
					*  Any name that doesn't match will be ignored
					* @memberOf module:twgl/programs
					*/
					function setBlockUniforms(uniformBlockInfo, values) {
						var setters = uniformBlockInfo.setters;
						for (var name in values) {
							var setter = setters[name];
							if (setter) {
								var value = values[name];
								setter(value);
							}
						}
					}
					function setUniformTree(tree, values) {
						for (var name in values) {
							var prop = tree[name];
							if (typeof prop === "function") prop(values[name]);
							else setUniformTree(tree[name], values[name]);
						}
					}
					/**
					* Set uniforms and binds related textures.
					*
					* example:
					*
					*     const programInfo = createProgramInfo(
					*         gl, ["some-vs", "some-fs"]);
					*
					*     const tex1 = gl.createTexture();
					*     const tex2 = gl.createTexture();
					*
					*     ... assume we setup the textures with data ...
					*
					*     const uniforms = {
					*       u_someSampler: tex1,
					*       u_someOtherSampler: tex2,
					*       u_someColor: [1,0,0,1],
					*       u_somePosition: [0,1,1],
					*       u_someMatrix: [
					*         1,0,0,0,
					*         0,1,0,0,
					*         0,0,1,0,
					*         0,0,0,0,
					*       ],
					*     };
					*
					*     gl.useProgram(programInfo.program);
					*
					* This will automatically bind the textures AND set the
					* uniforms.
					*
					*     twgl.setUniforms(programInfo, uniforms);
					*
					* For the example above it is equivalent to
					*
					*     let texUnit = 0;
					*     gl.activeTexture(gl.TEXTURE0 + texUnit);
					*     gl.bindTexture(gl.TEXTURE_2D, tex1);
					*     gl.uniform1i(u_someSamplerLocation, texUnit++);
					*     gl.activeTexture(gl.TEXTURE0 + texUnit);
					*     gl.bindTexture(gl.TEXTURE_2D, tex2);
					*     gl.uniform1i(u_someSamplerLocation, texUnit++);
					*     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
					*     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
					*     gl.uniformMatrix4fv(u_someMatrix, false, [
					*         1,0,0,0,
					*         0,1,0,0,
					*         0,0,1,0,
					*         0,0,0,0,
					*       ]);
					*
					* Note it is perfectly reasonable to call `setUniforms` multiple times. For example
					*
					*     const uniforms = {
					*       u_someSampler: tex1,
					*       u_someOtherSampler: tex2,
					*     };
					*
					*     const moreUniforms {
					*       u_someColor: [1,0,0,1],
					*       u_somePosition: [0,1,1],
					*       u_someMatrix: [
					*         1,0,0,0,
					*         0,1,0,0,
					*         0,0,1,0,
					*         0,0,0,0,
					*       ],
					*     };
					*
					*     twgl.setUniforms(programInfo, uniforms);
					*     twgl.setUniforms(programInfo, moreUniforms);
					*
					* You can also add WebGLSamplers to uniform samplers as in
					*
					*     const uniforms = {
					*       u_someSampler: {
					*         texture: someWebGLTexture,
					*         sampler: someWebGLSampler,
					*       },
					*     };
					*
					* In which case both the sampler and texture will be bound to the
					* same unit.
					*
					* @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
					*        `createUniformSetters`.
					* @param {Object.<string, ?>} values an object with values for the
					*        uniforms.
					*   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
					*
					*     const sharedUniforms = {
					*       u_fogNear: 10,
					*       u_projection: ...
					*       ...
					*     };
					*
					*     const localUniforms = {
					*       u_world: ...
					*       u_diffuseColor: ...
					*     };
					*
					*     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
					*
					*     // is the same as
					*
					*     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
					*
					*     // is the same as
					*
					*     twgl.setUniforms(programInfo, sharedUniforms);
					*     twgl.setUniforms(programInfo, localUniforms};
					*
					*   You can also fill out structure and array values either via
					*   shortcut. Example
					*
					*     // -- in shader --
					*     struct Light {
					*       float intensity;
					*       vec4 color;
					*       float nearFar[2];
					*     };
					*     uniform Light lights[2];
					*
					*     // in JavaScript
					*
					*     twgl.setUniforms(programInfo, {
					*       lights: [
					*         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
					*         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
					*       ],
					*     });
					*
					*   or the more traditional way
					*
					*     twgl.setUniforms(programInfo, {
					*       "lights[0].intensity": 5.0,
					*       "lights[0].color": [1, 0, 0, 1],
					*       "lights[0].nearFar": [0.1, 10],
					*       "lights[1].intensity": 2.0,
					*       "lights[1].color": [0, 0, 1, 1],
					*       "lights[1].nearFar": [0.2, 15],
					*     });
					*
					*   You can also specify partial paths
					*
					*     twgl.setUniforms(programInfo, {
					*       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
					*     });
					*
					*   But you can not specify leaf array indices
					*
					*     twgl.setUniforms(programInfo, {
					*       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
					*       'lights[1].nearFar': [0.2, 15], // GOOD
					*     });
					*
					* @memberOf module:twgl/programs
					*/
					function setUniforms(setters) {
						var actualSetters = setters.uniformSetters || setters;
						var numArgs = arguments.length <= 1 ? 0 : arguments.length - 1;
						for (var aNdx = 0; aNdx < numArgs; ++aNdx) {
							var values = aNdx + 1 < 1 || arguments.length <= aNdx + 1 ? void 0 : arguments[aNdx + 1];
							if (Array.isArray(values)) {
								var numValues = values.length;
								for (var ii = 0; ii < numValues; ++ii) setUniforms(actualSetters, values[ii]);
							} else for (var name in values) {
								var setter = actualSetters[name];
								if (setter) setter(values[name]);
							}
						}
					}
					exports$7.setUniformsAndBindTextures = setUniforms;
					/**
					* Creates setter functions for all attributes of a shader
					* program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
					*
					* @see {@link module:twgl.setAttributes} for example
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {WebGLProgram} program the program to create setters for.
					* @return {Object.<string, function>} an object with a setter for each attribute by name.
					* @memberOf module:twgl/programs
					*/
					function createAttributeSetters(gl, program) {
						var attribSetters = {};
						var numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
						for (var ii = 0; ii < numAttribs; ++ii) {
							var attribInfo = gl.getActiveAttrib(program, ii);
							if (isBuiltIn(attribInfo)) continue;
							var index = gl.getAttribLocation(program, attribInfo.name);
							var typeInfo = attrTypeMap[attribInfo.type];
							var setter = typeInfo.setter(gl, index, typeInfo);
							setter.location = index;
							attribSetters[attribInfo.name] = setter;
						}
						return attribSetters;
					}
					/**
					* Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
					*
					* Example:
					*
					*     const program = createProgramFromScripts(
					*         gl, ["some-vs", "some-fs");
					*
					*     const attribSetters = createAttributeSetters(program);
					*
					*     const positionBuffer = gl.createBuffer();
					*     const texcoordBuffer = gl.createBuffer();
					*
					*     const attribs = {
					*       a_position: {buffer: positionBuffer, numComponents: 3},
					*       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
					*     };
					*
					*     gl.useProgram(program);
					*
					* This will automatically bind the buffers AND set the
					* attributes.
					*
					*     setAttributes(attribSetters, attribs);
					*
					* Properties of attribs. For each attrib you can add
					* properties:
					*
					* *   type: the type of data in the buffer. Default = gl.FLOAT
					* *   normalize: whether or not to normalize the data. Default = false
					* *   stride: the stride. Default = 0
					* *   offset: offset into the buffer. Default = 0
					* *   divisor: the divisor for instances. Default = undefined
					*
					* For example if you had 3 value float positions, 2 value
					* float texcoord and 4 value uint8 colors you'd setup your
					* attribs like this
					*
					*     const attribs = {
					*       a_position: {buffer: positionBuffer, numComponents: 3},
					*       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
					*       a_color: {
					*         buffer: colorBuffer,
					*         numComponents: 4,
					*         type: gl.UNSIGNED_BYTE,
					*         normalize: true,
					*       },
					*     };
					*
					* @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
					* @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
					* @memberOf module:twgl/programs
					* @deprecated use {@link module:twgl.setBuffersAndAttributes}
					* @private
					*/
					function setAttributes(setters, buffers) {
						for (var name in buffers) {
							var setter = setters[name];
							if (setter) setter(buffers[name]);
						}
					}
					/**
					* Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
					*
					* Example:
					*
					*     const programInfo = createProgramInfo(
					*         gl, ["some-vs", "some-fs");
					*
					*     const arrays = {
					*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
					*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
					*     };
					*
					*     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
					*
					*     gl.useProgram(programInfo.program);
					*
					* This will automatically bind the buffers AND set the
					* attributes.
					*
					*     setBuffersAndAttributes(gl, programInfo, bufferInfo);
					*
					* For the example above it is equivalent to
					*
					*     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
					*     gl.enableVertexAttribArray(a_positionLocation);
					*     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
					*     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
					*     gl.enableVertexAttribArray(a_texcoordLocation);
					*     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext.
					* @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
					* @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
					*   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
					* @memberOf module:twgl/programs
					*/
					function setBuffersAndAttributes(gl, programInfo, buffers) {
						if (buffers.vertexArrayObject) gl.bindVertexArray(buffers.vertexArrayObject);
						else {
							setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
							if (buffers.indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER, buffers.indices);
						}
					}
					/**
					* @typedef {Object} ProgramInfo
					* @property {WebGLProgram} program A shader program
					* @property {Object<string, WebGLUniformLocation>} uniformLocations The uniform locations of each uniform
					* @property {Object<string, number>} attribLocations The locations of each attribute
					* @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
					* @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
					* @property {module:twgl.UniformBlockSpec} [uniformBlockSpec] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
					* @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
					* @memberOf module:twgl
					*/
					/**
					* Creates a ProgramInfo from an existing program.
					*
					* A ProgramInfo contains
					*
					*     programInfo = {
					*        program: WebGLProgram,
					*        uniformSetters: object of setters as returned from createUniformSetters,
					*        attribSetters: object of setters as returned from createAttribSetters,
					*     }
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext
					*        to use.
					* @param {WebGLProgram} program an existing WebGLProgram.
					* @return {module:twgl.ProgramInfo} The created ProgramInfo.
					* @memberOf module:twgl/programs
					*/
					function createProgramInfoFromProgram(gl, program) {
						var uniformSetters = createUniformSetters(gl, program);
						var attribSetters = createAttributeSetters(gl, program);
						var programInfo = {
							program,
							uniformSetters,
							attribSetters,
							uniformLocations: Object.fromEntries(Object.entries(uniformSetters).map(function(_ref3) {
								var _ref4 = _slicedToArray(_ref3, 2);
								return [_ref4[0], _ref4[1].location];
							})),
							attribLocations: Object.fromEntries(Object.entries(attribSetters).map(function(_ref5) {
								var _ref6 = _slicedToArray(_ref5, 2);
								return [_ref6[0], _ref6[1].location];
							}))
						};
						if (utils.isWebGL2(gl)) {
							programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
							programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
						}
						return programInfo;
					}
					var notIdRE = /\s|{|}|;/;
					/**
					* Creates a ProgramInfo from 2 sources.
					*
					* A ProgramInfo contains
					*
					*     programInfo = {
					*        program: WebGLProgram,
					*        uniformSetters: object of setters as returned from createUniformSetters,
					*        attribSetters: object of setters as returned from createAttribSetters,
					*     }
					*
					* NOTE: There are 4 signatures for this function
					*
					*     twgl.createProgramInfo(gl, [vs, fs], options);
					*     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
					*     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
					*     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext
					*        to use.
					* @param {string[]} shaderSources Array of sources for the
					*        shaders or ids. The first is assumed to be the vertex shader,
					*        the second the fragment shader.
					* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
					* @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
					* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
					*        on error. If you want something else pass an callback. It's passed an error message.
					* @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
					* @memberOf module:twgl/programs
					*/
					function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
						var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
						var errors = [];
						shaderSources = shaderSources.map(function(source) {
							if (!notIdRE.test(source)) {
								var script = getElementById(source);
								if (!script) {
									var err = "no element with id: ".concat(source);
									progOptions.errorCallback(err);
									errors.push(err);
								} else source = script.text;
							}
							return source;
						});
						if (errors.length) return reportError(progOptions, "");
						var origCallback = progOptions.callback;
						if (origCallback) progOptions.callback = function(err, program) {
							origCallback(err, err ? void 0 : createProgramInfoFromProgram(gl, program));
						};
						var program = createProgramFromSources(gl, shaderSources, progOptions);
						if (!program) return null;
						return createProgramInfoFromProgram(gl, program);
					}
					function checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions) {
						for (var _i = 0, _Object$entries = Object.entries(programs); _i < _Object$entries.length; _i++) {
							var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), name = _Object$entries$_i[0], program = _Object$entries$_i[1];
							var options = _objectSpread({}, programOptions);
							var spec = programSpecs[name];
							if (!Array.isArray(spec)) Object.assign(options, spec);
							var errors = getProgramErrors(gl, program, options.errorCallback);
							if (errors) {
								for (var _i2 = 0, _Object$values = Object.values(programs); _i2 < _Object$values.length; _i2++) {
									var _program = _Object$values[_i2];
									var shaders = gl.getAttachedShaders(_program);
									gl.deleteProgram(_program);
									var _iterator3 = _createForOfIteratorHelper(shaders), _step3;
									try {
										for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
											var shader = _step3.value;
											if (!noDeleteShadersSet.has(shader)) gl.deleteShader(shader);
										}
									} catch (err) {
										_iterator3.e(err);
									} finally {
										_iterator3.f();
									}
								}
								return errors;
							}
						}
					}
					/**
					* Creates multiple programs
					*
					* Note: the reason this function exists is because the fastest way to create multiple
					* programs in WebGL is to create and compile all shaders and link all programs and only
					* afterwards check if they succeeded. In that way, giving all your shaders
					*
					* @see {@link module:twgl.createProgram}
					*
					* Example:
					*
					*     const programs = twgl.createPrograms(gl, {
					*       lambert: [lambertVS, lambertFS],
					*       phong: [phongVS, phoneFS],
					*       particles: {
					*         shaders: [particlesVS, particlesFS],
					*         transformFeedbackVaryings: ['position', 'velocity'],
					*       },
					*     });
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
					* @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
					* @return {Object.<string, WebGLProgram>?} the created programInfos by name
					*/
					function createPrograms(gl, programSpecs) {
						var programOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
						var noDeleteShadersSet = /* @__PURE__ */ new Set();
						var programs = Object.fromEntries(Object.entries(programSpecs).map(function(_ref7) {
							var _ref8 = _slicedToArray(_ref7, 2), name = _ref8[0], spec = _ref8[1];
							var options = _objectSpread({}, programOptions);
							var shaders = Array.isArray(spec) ? spec : spec.shaders;
							if (!Array.isArray(spec)) Object.assign(options, spec);
							shaders.forEach(noDeleteShadersSet.add, noDeleteShadersSet);
							return [name, createProgramNoCheck(gl, shaders, options)];
						}));
						if (programOptions.callback) {
							waitForAllProgramsLinkCompletionAsync(gl, programs).then(function() {
								var errors = checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions);
								programOptions.callback(errors, errors ? void 0 : programs);
							});
							return;
						}
						return checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions) ? void 0 : programs;
					}
					/**
					* Creates multiple programInfos
					*
					* Note: the reason this function exists is because the fastest way to create multiple
					* programs in WebGL is to create and compile all shaders and link all programs and only
					* afterwards check if they succeeded. In that way, giving all your shaders
					*
					* @see {@link module:twgl.createProgramInfo}
					*
					* Examples:
					*
					*     const programInfos = twgl.createProgramInfos(gl, {
					*       lambert: [lambertVS, lambertFS],
					*       phong: [phongVS, phoneFS],
					*       particles: {
					*         shaders: [particlesVS, particlesFS],
					*         transformFeedbackVaryings: ['position', 'velocity'],
					*       },
					*     });
					*
					* or
					*
					*     const {lambert, phong, particles} = twgl.createProgramInfos(gl, {
					*       lambert: [lambertVS, lambertFS],
					*       phong: [phongVS, phoneFS],
					*       particles: {
					*         shaders: [particlesVS, particlesFS],
					*         transformFeedbackVaryings: ['position', 'velocity'],
					*       },
					*     });
					*
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
					* @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
					* @return {Object.<string, module:twgl.ProgramInfo>?} the created programInfos by name
					*/
					function createProgramInfos(gl, programSpecs, programOptions) {
						programOptions = getProgramOptions(programOptions);
						function createProgramInfosForPrograms(gl, programs) {
							return Object.fromEntries(Object.entries(programs).map(function(_ref9) {
								var _ref10 = _slicedToArray(_ref9, 2), name = _ref10[0], program = _ref10[1];
								return [name, createProgramInfoFromProgram(gl, program)];
							}));
						}
						var origCallback = programOptions.callback;
						if (origCallback) programOptions.callback = function(err, programs) {
							origCallback(err, err ? void 0 : createProgramInfosForPrograms(gl, programs));
						};
						var programs = createPrograms(gl, programSpecs, programOptions);
						if (origCallback || !programs) return;
						return createProgramInfosForPrograms(gl, programs);
					}
					exports$7.createProgramsAsync = wrapCallbackFnToAsyncFn(createPrograms);
					exports$7.createProgramInfosAsync = wrapCallbackFnToAsyncFn(createProgramInfos);
				}),
				"./src/textures.js": ((__unused_webpack_module, exports$8, __webpack_require__) => {
					exports$8.__esModule = true;
					exports$8.canFilter = canFilter;
					exports$8.canGenerateMipmap = canGenerateMipmap;
					exports$8.createSampler = createSampler;
					exports$8.createSamplers = createSamplers;
					exports$8.createTexture = createTexture;
					exports$8.createTextureAsync = createTextureAsync;
					exports$8.createTextures = createTextures;
					exports$8.createTexturesAsync = createTexturesAsync;
					exports$8.getBytesPerElementForInternalFormat = getBytesPerElementForInternalFormat;
					exports$8.getFormatAndTypeForInternalFormat = getFormatAndTypeForInternalFormat;
					exports$8.getNumComponentsForFormat = getNumComponentsForFormat;
					exports$8.loadTextureFromUrl = loadTextureFromUrl;
					exports$8.resizeTexture = resizeTexture;
					exports$8.setDefaultTextureColor = setDefaultTextureColor;
					exports$8.setEmptyTexture = setEmptyTexture;
					exports$8.setSamplerParameters = setSamplerParameters;
					exports$8.setTextureDefaults_ = setDefaults;
					exports$8.setTextureFilteringForSize = setTextureFilteringForSize;
					exports$8.setTextureFromArray = setTextureFromArray;
					exports$8.setTextureFromElement = setTextureFromElement;
					exports$8.setTextureParameters = setTextureParameters;
					var utils = _interopRequireWildcard(__webpack_require__(
						/*! ./utils.js */
						"./src/utils.js"
					));
					var typedArrays = _interopRequireWildcard(__webpack_require__(
						/*! ./typedarrays.js */
						"./src/typedarrays.js"
					));
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					function ownKeys(e, r) {
						var t = Object.keys(e);
						if (Object.getOwnPropertySymbols) {
							var o = Object.getOwnPropertySymbols(e);
							r && (o = o.filter(function(r) {
								return Object.getOwnPropertyDescriptor(e, r).enumerable;
							})), t.push.apply(t, o);
						}
						return t;
					}
					function _objectSpread(e) {
						for (var r = 1; r < arguments.length; r++) {
							var t = null != arguments[r] ? arguments[r] : {};
							r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
								_defineProperty(e, r, t[r]);
							}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
								Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
							});
						}
						return e;
					}
					function _defineProperty(obj, key, value) {
						key = _toPropertyKey(key);
						if (key in obj) Object.defineProperty(obj, key, {
							value,
							enumerable: true,
							configurable: true,
							writable: true
						});
						else obj[key] = value;
						return obj;
					}
					function _toPropertyKey(t) {
						var i = _toPrimitive(t, "string");
						return "symbol" == _typeof(i) ? i : String(i);
					}
					function _toPrimitive(t, r) {
						if ("object" != _typeof(t) || !t) return t;
						var e = t[Symbol.toPrimitive];
						if (void 0 !== e) {
							var i = e.call(t, r || "default");
							if ("object" != _typeof(i)) return i;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return ("string" === r ? String : Number)(t);
					}
					/**
					* Low level texture related functions
					*
					* You should generally not need to use these functions. They are provided
					* for those cases where you're doing something out of the ordinary
					* and you need lower level access.
					*
					* For backward compatibility they are available at both `twgl.textures` and `twgl`
					* itself
					*
					* See {@link module:twgl} for core functions
					*
					* @module twgl/textures
					*/
					var gl = void 0;
					var defaults = {
						textureColor: new Uint8Array([
							128,
							192,
							255,
							255
						]),
						textureOptions: {},
						crossOrigin: void 0
					};
					var isArrayBuffer = typedArrays.isArrayBuffer;
					var getShared2DContext = function() {
						var s_ctx;
						return function getShared2DContext() {
							s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
							return s_ctx;
						};
					}();
					var ALPHA = 6406;
					var RGB = 6407;
					var RGBA = 6408;
					var LUMINANCE = 6409;
					var LUMINANCE_ALPHA = 6410;
					var DEPTH_COMPONENT = 6402;
					var DEPTH_STENCIL = 34041;
					var CLAMP_TO_EDGE = 33071;
					var NEAREST = 9728;
					var LINEAR = 9729;
					var NEAREST_MIPMAP_LINEAR = 9986;
					var TEXTURE_2D = 3553;
					var TEXTURE_CUBE_MAP = 34067;
					var TEXTURE_3D = 32879;
					var TEXTURE_2D_ARRAY = 35866;
					var TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
					var TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
					var TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
					var TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
					var TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
					var TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
					var TEXTURE_MIN_FILTER = 10241;
					var TEXTURE_MAG_FILTER = 10240;
					var TEXTURE_WRAP_S = 10242;
					var TEXTURE_WRAP_T = 10243;
					var TEXTURE_WRAP_R = 32882;
					var TEXTURE_MIN_LOD = 33082;
					var TEXTURE_MAX_LOD = 33083;
					var TEXTURE_BASE_LEVEL = 33084;
					var TEXTURE_MAX_LEVEL = 33085;
					var TEXTURE_COMPARE_MODE = 34892;
					var TEXTURE_COMPARE_FUNC = 34893;
					var UNPACK_ALIGNMENT = 3317;
					var UNPACK_ROW_LENGTH = 3314;
					var UNPACK_IMAGE_HEIGHT = 32878;
					var UNPACK_SKIP_PIXELS = 3316;
					var UNPACK_SKIP_ROWS = 3315;
					var UNPACK_SKIP_IMAGES = 32877;
					var UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
					var UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
					var UNPACK_FLIP_Y_WEBGL = 37440;
					var R8 = 33321;
					var R8_SNORM = 36756;
					var R16F = 33325;
					var R32F = 33326;
					var R8UI = 33330;
					var R8I = 33329;
					var RG16UI = 33338;
					var RG16I = 33337;
					var RG32UI = 33340;
					var RG32I = 33339;
					var RG8 = 33323;
					var RG8_SNORM = 36757;
					var RG16F = 33327;
					var RG32F = 33328;
					var RG8UI = 33336;
					var RG8I = 33335;
					var R16UI = 33332;
					var R16I = 33331;
					var R32UI = 33334;
					var R32I = 33333;
					var RGB8 = 32849;
					var SRGB8 = 35905;
					var RGB565 = 36194;
					var RGB8_SNORM = 36758;
					var R11F_G11F_B10F = 35898;
					var RGB9_E5 = 35901;
					var RGB16F = 34843;
					var RGB32F = 34837;
					var RGB8UI = 36221;
					var RGB8I = 36239;
					var RGB16UI = 36215;
					var RGB16I = 36233;
					var RGB32UI = 36209;
					var RGB32I = 36227;
					var RGBA8 = 32856;
					var SRGB8_ALPHA8 = 35907;
					var RGBA8_SNORM = 36759;
					var RGB5_A1 = 32855;
					var RGBA4 = 32854;
					var RGB10_A2 = 32857;
					var RGBA16F = 34842;
					var RGBA32F = 34836;
					var RGBA8UI = 36220;
					var RGBA8I = 36238;
					var RGB10_A2UI = 36975;
					var RGBA16UI = 36214;
					var RGBA16I = 36232;
					var RGBA32I = 36226;
					var RGBA32UI = 36208;
					var DEPTH_COMPONENT16 = 33189;
					var DEPTH_COMPONENT24 = 33190;
					var DEPTH_COMPONENT32F = 36012;
					var DEPTH32F_STENCIL8 = 36013;
					var DEPTH24_STENCIL8 = 35056;
					var BYTE = 5120;
					var UNSIGNED_BYTE = 5121;
					var SHORT = 5122;
					var UNSIGNED_SHORT = 5123;
					var INT = 5124;
					var UNSIGNED_INT = 5125;
					var FLOAT = 5126;
					var UNSIGNED_SHORT_4_4_4_4 = 32819;
					var UNSIGNED_SHORT_5_5_5_1 = 32820;
					var UNSIGNED_SHORT_5_6_5 = 33635;
					var HALF_FLOAT = 5131;
					var HALF_FLOAT_OES = 36193;
					var UNSIGNED_INT_2_10_10_10_REV = 33640;
					var UNSIGNED_INT_10F_11F_11F_REV = 35899;
					var UNSIGNED_INT_5_9_9_9_REV = 35902;
					var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
					var UNSIGNED_INT_24_8 = 34042;
					var RG = 33319;
					var RG_INTEGER = 33320;
					var RED = 6403;
					var RED_INTEGER = 36244;
					var RGB_INTEGER = 36248;
					var RGBA_INTEGER = 36249;
					var COMPRESSED_RGB_S3TC_DXT1_EXT = 33776;
					var COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777;
					var COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778;
					var COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779;
					var COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916;
					var COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917;
					var COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918;
					var COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919;
					var COMPRESSED_RGB_ETC1_WEBGL = 36196;
					var COMPRESSED_R11_EAC = 37488;
					var COMPRESSED_SIGNED_R11_EAC = 37489;
					var COMPRESSED_RG11_EAC = 37490;
					var COMPRESSED_SIGNED_RG11_EAC = 37491;
					var COMPRESSED_RGB8_ETC2 = 37492;
					var COMPRESSED_SRGB8_ETC2 = 37493;
					var COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494;
					var COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495;
					var COMPRESSED_RGBA8_ETC2_EAC = 37496;
					var COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497;
					var COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840;
					var COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841;
					var COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842;
					var COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843;
					var COMPRESSED_RGBA_ASTC_4x4_KHR = 37808;
					var COMPRESSED_RGBA_ASTC_5x4_KHR = 37809;
					var COMPRESSED_RGBA_ASTC_5x5_KHR = 37810;
					var COMPRESSED_RGBA_ASTC_6x5_KHR = 37811;
					var COMPRESSED_RGBA_ASTC_6x6_KHR = 37812;
					var COMPRESSED_RGBA_ASTC_8x5_KHR = 37813;
					var COMPRESSED_RGBA_ASTC_8x6_KHR = 37814;
					var COMPRESSED_RGBA_ASTC_8x8_KHR = 37815;
					var COMPRESSED_RGBA_ASTC_10x5_KHR = 37816;
					var COMPRESSED_RGBA_ASTC_10x6_KHR = 37817;
					var COMPRESSED_RGBA_ASTC_10x8_KHR = 37818;
					var COMPRESSED_RGBA_ASTC_10x10_KHR = 37819;
					var COMPRESSED_RGBA_ASTC_12x10_KHR = 37820;
					var COMPRESSED_RGBA_ASTC_12x12_KHR = 37821;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 37840;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR = 37841;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR = 37842;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR = 37843;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR = 37844;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR = 37845;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR = 37846;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR = 37847;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR = 37848;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR = 37849;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR = 37850;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR = 37851;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR = 37852;
					var COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR = 37853;
					var COMPRESSED_RGBA_BPTC_UNORM_EXT = 36492;
					var COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT = 36493;
					var COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT = 36494;
					var COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT = 36495;
					var COMPRESSED_RED_RGTC1_EXT = 36283;
					var COMPRESSED_SIGNED_RED_RGTC1_EXT = 36284;
					var COMPRESSED_RED_GREEN_RGTC2_EXT = 36285;
					var COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT = 36286;
					var formatInfo = {};
					var f = formatInfo;
					f[ALPHA] = { numColorComponents: 1 };
					f[LUMINANCE] = { numColorComponents: 1 };
					f[LUMINANCE_ALPHA] = { numColorComponents: 2 };
					f[RGB] = { numColorComponents: 3 };
					f[RGBA] = { numColorComponents: 4 };
					f[RED] = { numColorComponents: 1 };
					f[RED_INTEGER] = { numColorComponents: 1 };
					f[RG] = { numColorComponents: 2 };
					f[RG_INTEGER] = { numColorComponents: 2 };
					f[RGB] = { numColorComponents: 3 };
					f[RGB_INTEGER] = { numColorComponents: 3 };
					f[RGBA] = { numColorComponents: 4 };
					f[RGBA_INTEGER] = { numColorComponents: 4 };
					f[DEPTH_COMPONENT] = { numColorComponents: 1 };
					f[DEPTH_STENCIL] = { numColorComponents: 2 };
					/**
					* @typedef {Object} BlockInfo
					* @property {number} bytes number of bytes in the block
					* @property {number} width width of the block
					* @property {number} height height of the block
					* @private
					*/
					/**
					* @typedef {Object} TextureFormatDetails
					* @property {number} textureFormat format to pass texImage2D and similar functions.
					* @property {boolean} colorRenderable true if you can render to this format of texture.
					* @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
					* @property {number[]} type Array of possible types you can pass to texImage2D and similar function
					* @property {Object.<number,number>} [bytesPerElementMap] A map of types to bytes per element
					* @property {BlockInfo} [block] block size, only for compressed textures
					* @private
					*/
					var s_textureInternalFormatInfo;
					function getTextureInternalFormatInfo(internalFormat) {
						if (!s_textureInternalFormatInfo) {
							var t = {};
							t[ALPHA] = {
								textureFormat: ALPHA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									1,
									2,
									2,
									4
								],
								type: [
									UNSIGNED_BYTE,
									HALF_FLOAT,
									HALF_FLOAT_OES,
									FLOAT
								]
							};
							t[LUMINANCE] = {
								textureFormat: LUMINANCE,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									1,
									2,
									2,
									4
								],
								type: [
									UNSIGNED_BYTE,
									HALF_FLOAT,
									HALF_FLOAT_OES,
									FLOAT
								]
							};
							t[LUMINANCE_ALPHA] = {
								textureFormat: LUMINANCE_ALPHA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									2,
									4,
									4,
									8
								],
								type: [
									UNSIGNED_BYTE,
									HALF_FLOAT,
									HALF_FLOAT_OES,
									FLOAT
								]
							};
							t[RGB] = {
								textureFormat: RGB,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									3,
									6,
									6,
									12,
									2
								],
								type: [
									UNSIGNED_BYTE,
									HALF_FLOAT,
									HALF_FLOAT_OES,
									FLOAT,
									UNSIGNED_SHORT_5_6_5
								]
							};
							t[RGBA] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									4,
									8,
									8,
									16,
									2,
									2
								],
								type: [
									UNSIGNED_BYTE,
									HALF_FLOAT,
									HALF_FLOAT_OES,
									FLOAT,
									UNSIGNED_SHORT_4_4_4_4,
									UNSIGNED_SHORT_5_5_5_1
								]
							};
							t[DEPTH_COMPONENT] = {
								textureFormat: DEPTH_COMPONENT,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2, 4],
								type: [UNSIGNED_INT, UNSIGNED_SHORT]
							};
							t[R8] = {
								textureFormat: RED,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [1],
								type: [UNSIGNED_BYTE]
							};
							t[R8_SNORM] = {
								textureFormat: RED,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [1],
								type: [BYTE]
							};
							t[R16F] = {
								textureFormat: RED,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [4, 2],
								type: [FLOAT, HALF_FLOAT]
							};
							t[R32F] = {
								textureFormat: RED,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [FLOAT]
							};
							t[R8UI] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [1],
								type: [UNSIGNED_BYTE]
							};
							t[R8I] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [1],
								type: [BYTE]
							};
							t[R16UI] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2],
								type: [UNSIGNED_SHORT]
							};
							t[R16I] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2],
								type: [SHORT]
							};
							t[R32UI] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_INT]
							};
							t[R32I] = {
								textureFormat: RED_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [INT]
							};
							t[RG8] = {
								textureFormat: RG,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [2],
								type: [UNSIGNED_BYTE]
							};
							t[RG8_SNORM] = {
								textureFormat: RG,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [2],
								type: [BYTE]
							};
							t[RG16F] = {
								textureFormat: RG,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [8, 4],
								type: [FLOAT, HALF_FLOAT]
							};
							t[RG32F] = {
								textureFormat: RG,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [8],
								type: [FLOAT]
							};
							t[RG8UI] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2],
								type: [UNSIGNED_BYTE]
							};
							t[RG8I] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2],
								type: [BYTE]
							};
							t[RG16UI] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_SHORT]
							};
							t[RG16I] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [SHORT]
							};
							t[RG32UI] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [8],
								type: [UNSIGNED_INT]
							};
							t[RG32I] = {
								textureFormat: RG_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [8],
								type: [INT]
							};
							t[RGB8] = {
								textureFormat: RGB,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [3],
								type: [UNSIGNED_BYTE]
							};
							t[SRGB8] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [3],
								type: [UNSIGNED_BYTE]
							};
							t[RGB565] = {
								textureFormat: RGB,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [3, 2],
								type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_6_5]
							};
							t[RGB8_SNORM] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [3],
								type: [BYTE]
							};
							t[R11F_G11F_B10F] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [
									12,
									6,
									4
								],
								type: [
									FLOAT,
									HALF_FLOAT,
									UNSIGNED_INT_10F_11F_11F_REV
								]
							};
							t[RGB9_E5] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [
									12,
									6,
									4
								],
								type: [
									FLOAT,
									HALF_FLOAT,
									UNSIGNED_INT_5_9_9_9_REV
								]
							};
							t[RGB16F] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [12, 6],
								type: [FLOAT, HALF_FLOAT]
							};
							t[RGB32F] = {
								textureFormat: RGB,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [12],
								type: [FLOAT]
							};
							t[RGB8UI] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [3],
								type: [UNSIGNED_BYTE]
							};
							t[RGB8I] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [3],
								type: [BYTE]
							};
							t[RGB16UI] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [6],
								type: [UNSIGNED_SHORT]
							};
							t[RGB16I] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [6],
								type: [SHORT]
							};
							t[RGB32UI] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [12],
								type: [UNSIGNED_INT]
							};
							t[RGB32I] = {
								textureFormat: RGB_INTEGER,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [12],
								type: [INT]
							};
							t[RGBA8] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [4],
								type: [UNSIGNED_BYTE]
							};
							t[SRGB8_ALPHA8] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [4],
								type: [UNSIGNED_BYTE]
							};
							t[RGBA8_SNORM] = {
								textureFormat: RGBA,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [4],
								type: [BYTE]
							};
							t[RGB5_A1] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [
									4,
									2,
									4
								],
								type: [
									UNSIGNED_BYTE,
									UNSIGNED_SHORT_5_5_5_1,
									UNSIGNED_INT_2_10_10_10_REV
								]
							};
							t[RGBA4] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [4, 2],
								type: [UNSIGNED_BYTE, UNSIGNED_SHORT_4_4_4_4]
							};
							t[RGB10_A2] = {
								textureFormat: RGBA,
								colorRenderable: true,
								textureFilterable: true,
								bytesPerElement: [4],
								type: [UNSIGNED_INT_2_10_10_10_REV]
							};
							t[RGBA16F] = {
								textureFormat: RGBA,
								colorRenderable: false,
								textureFilterable: true,
								bytesPerElement: [16, 8],
								type: [FLOAT, HALF_FLOAT]
							};
							t[RGBA32F] = {
								textureFormat: RGBA,
								colorRenderable: false,
								textureFilterable: false,
								bytesPerElement: [16],
								type: [FLOAT]
							};
							t[RGBA8UI] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_BYTE]
							};
							t[RGBA8I] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [BYTE]
							};
							t[RGB10_A2UI] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_INT_2_10_10_10_REV]
							};
							t[RGBA16UI] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [8],
								type: [UNSIGNED_SHORT]
							};
							t[RGBA16I] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [8],
								type: [SHORT]
							};
							t[RGBA32I] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [16],
								type: [INT]
							};
							t[RGBA32UI] = {
								textureFormat: RGBA_INTEGER,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [16],
								type: [UNSIGNED_INT]
							};
							t[DEPTH_COMPONENT16] = {
								textureFormat: DEPTH_COMPONENT,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [2, 4],
								type: [UNSIGNED_SHORT, UNSIGNED_INT]
							};
							t[DEPTH_COMPONENT24] = {
								textureFormat: DEPTH_COMPONENT,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_INT]
							};
							t[DEPTH_COMPONENT32F] = {
								textureFormat: DEPTH_COMPONENT,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [FLOAT]
							};
							t[DEPTH24_STENCIL8] = {
								textureFormat: DEPTH_STENCIL,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [UNSIGNED_INT_24_8]
							};
							t[DEPTH32F_STENCIL8] = {
								textureFormat: DEPTH_STENCIL,
								colorRenderable: true,
								textureFilterable: false,
								bytesPerElement: [4],
								type: [FLOAT_32_UNSIGNED_INT_24_8_REV]
							};
							Object.keys(t).forEach(function(internalFormat) {
								var info = t[internalFormat];
								info.bytesPerElementMap = {};
								info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
									var type = info.type[ndx];
									info.bytesPerElementMap[type] = bytesPerElement;
								});
							});
							var block8_4_4 = {
								bytes: 8,
								width: 4,
								height: 4
							};
							var block16_4_4 = {
								bytes: 16,
								width: 4,
								height: 4
							};
							t[COMPRESSED_RGB_S3TC_DXT1_EXT] = {
								textureFormat: COMPRESSED_RGB_S3TC_DXT1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RGBA_S3TC_DXT1_EXT] = {
								textureFormat: COMPRESSED_RGBA_S3TC_DXT1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RGBA_S3TC_DXT3_EXT] = {
								textureFormat: COMPRESSED_RGBA_S3TC_DXT3_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGBA_S3TC_DXT5_EXT] = {
								textureFormat: COMPRESSED_RGBA_S3TC_DXT5_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_SRGB_S3TC_DXT1_EXT] = {
								textureFormat: COMPRESSED_SRGB_S3TC_DXT1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = {
								textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = {
								textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = {
								textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGB_ETC1_WEBGL] = {
								textureFormat: COMPRESSED_RGB_ETC1_WEBGL,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_R11_EAC] = {
								textureFormat: COMPRESSED_R11_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SIGNED_R11_EAC] = {
								textureFormat: COMPRESSED_SIGNED_R11_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RG11_EAC] = {
								textureFormat: COMPRESSED_RG11_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_SIGNED_RG11_EAC] = {
								textureFormat: COMPRESSED_SIGNED_RG11_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGB8_ETC2] = {
								textureFormat: COMPRESSED_RGB8_ETC2,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SRGB8_ETC2] = {
								textureFormat: COMPRESSED_SRGB8_ETC2,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = {
								textureFormat: COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = {
								textureFormat: COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RGBA8_ETC2_EAC] = {
								textureFormat: COMPRESSED_RGBA8_ETC2_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = {
								textureFormat: COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 32,
									width: 8,
									height: 8
								}
							};
							t[COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = {
								textureFormat: COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 32,
									width: 16,
									height: 8
								}
							};
							t[COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = {
								textureFormat: COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 32,
									width: 8,
									height: 8
								}
							};
							t[COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = {
								textureFormat: COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 32,
									width: 16,
									height: 8
								}
							};
							t[COMPRESSED_RGBA_ASTC_4x4_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_4x4_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 4,
									height: 4
								}
							};
							t[COMPRESSED_RGBA_ASTC_5x4_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_5x4_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 5,
									height: 4
								}
							};
							t[COMPRESSED_RGBA_ASTC_5x5_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_5x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 5,
									height: 5
								}
							};
							t[COMPRESSED_RGBA_ASTC_6x5_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_6x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 6,
									height: 5
								}
							};
							t[COMPRESSED_RGBA_ASTC_6x6_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_6x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 6,
									height: 6
								}
							};
							t[COMPRESSED_RGBA_ASTC_8x5_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_8x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 5
								}
							};
							t[COMPRESSED_RGBA_ASTC_8x6_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_8x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 6
								}
							};
							t[COMPRESSED_RGBA_ASTC_8x8_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_8x8_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 8
								}
							};
							t[COMPRESSED_RGBA_ASTC_10x5_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_10x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 5
								}
							};
							t[COMPRESSED_RGBA_ASTC_10x6_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_10x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 6
								}
							};
							t[COMPRESSED_RGBA_ASTC_10x8_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_10x8_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 8
								}
							};
							t[COMPRESSED_RGBA_ASTC_10x10_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_10x10_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 10
								}
							};
							t[COMPRESSED_RGBA_ASTC_12x10_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_12x10_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 12,
									height: 10
								}
							};
							t[COMPRESSED_RGBA_ASTC_12x12_KHR] = {
								textureFormat: COMPRESSED_RGBA_ASTC_12x12_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 12,
									height: 12
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 4,
									height: 4
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 5,
									height: 4
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 5,
									height: 5
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 6,
									height: 5
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 6,
									height: 6
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 5
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 6
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 8,
									height: 8
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 5
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 6
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 8
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 10,
									height: 10
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 12,
									height: 10
								}
							};
							t[COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR] = {
								textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR,
								colorRenderable: false,
								textureFilterable: true,
								block: {
									bytes: 16,
									width: 12,
									height: 12
								}
							};
							t[COMPRESSED_RGBA_BPTC_UNORM_EXT] = {
								textureFormat: COMPRESSED_RGBA_BPTC_UNORM_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT] = {
								textureFormat: COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT] = {
								textureFormat: COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT] = {
								textureFormat: COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block16_4_4
							};
							t[COMPRESSED_RED_RGTC1_EXT] = {
								textureFormat: COMPRESSED_RED_RGTC1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SIGNED_RED_RGTC1_EXT] = {
								textureFormat: COMPRESSED_SIGNED_RED_RGTC1_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_RED_GREEN_RGTC2_EXT] = {
								textureFormat: COMPRESSED_RED_GREEN_RGTC2_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							t[COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT] = {
								textureFormat: COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT,
								colorRenderable: false,
								textureFilterable: true,
								block: block8_4_4
							};
							s_textureInternalFormatInfo = t;
						}
						var info = s_textureInternalFormatInfo[internalFormat];
						if (!info) throw new Error("unknown internal format");
						return info;
					}
					/**
					* Gets the number of bytes per element for a given internalFormat / type
					* @param {number} internalFormat The internalFormat parameter from texImage2D etc..
					* @param {number} type The type parameter for texImage2D etc..
					* @return {number} the number of bytes per element for the given internalFormat, type combo
					* @memberOf module:twgl/textures
					*/
					function getBytesPerElementForInternalFormat(internalFormat, type) {
						var bytesPerElement = getTextureInternalFormatInfo(internalFormat).bytesPerElementMap[type];
						if (bytesPerElement === void 0) throw new Error("type not supported for internal format");
						return bytesPerElement;
					}
					/**
					* Info related to a specific texture internalFormat as returned
					* from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
					*
					* @typedef {Object} TextureFormatInfo
					* @property {number} format Format to pass to texImage2D and related functions
					* @property {number} type Type to pass to texImage2D and related functions
					* @memberOf module:twgl/textures
					*/
					/**
					* Gets the format and type for a given internalFormat
					*
					* @param {number} internalFormat The internal format
					* @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
					* @memberOf module:twgl/textures
					*/
					function getFormatAndTypeForInternalFormat(internalFormat) {
						var _info$type$, _info$type;
						var info = getTextureInternalFormatInfo(internalFormat);
						if (!info) throw new Error("unknown internal format");
						return {
							format: info.textureFormat,
							type: (_info$type$ = (_info$type = info.type) === null || _info$type === void 0 ? void 0 : _info$type[0]) !== null && _info$type$ !== void 0 ? _info$type$ : UNSIGNED_BYTE
						};
					}
					/**
					* @param {number} internalFormat The internal format
					* @returns if the internalFormat is a compressed format
					* @private
					*/
					function isCompressedInternalFormat(internalFormat) {
						return !!getTextureInternalFormatInfo(internalFormat).block;
					}
					/**
					* Gets the width, height, and bytes per block for the given internal format
					* @param {number} internalFormat
					* @param {number} type
					* @private
					*/
					function getBlockInfoForInternalFormat(internalFormat, type) {
						var info = getTextureInternalFormatInfo(internalFormat);
						if (info.block) return {
							blockWidth: info.block.width,
							blockHeight: info.block.height,
							bytesPerBlock: info.block.bytes
						};
						return {
							blockWidth: 1,
							blockHeight: 1,
							bytesPerBlock: getBytesPerElementForInternalFormat(internalFormat, type)
						};
					}
					/**
					* Returns true if value is power of 2
					* @param {number} value number to check.
					* @return true if value is power of 2
					* @private
					*/
					function isPowerOf2(value) {
						return (value & value - 1) === 0;
					}
					/**
					* Gets whether or not we can generate mips for the given
					* internal format.
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {number} width The width parameter from texImage2D etc..
					* @param {number} height The height parameter from texImage2D etc..
					* @param {number} internalFormat The internalFormat parameter from texImage2D etc..
					* @return {boolean} true if we can generate mips
					* @memberOf module:twgl/textures
					*/
					function canGenerateMipmap(gl, width, height, internalFormat) {
						if (!utils.isWebGL2(gl)) return isPowerOf2(width) && isPowerOf2(height);
						var info = getTextureInternalFormatInfo(internalFormat);
						return info.colorRenderable && info.textureFilterable;
					}
					/**
					* Gets whether or not we can generate mips for the given format
					* @param {number} internalFormat The internalFormat parameter from texImage2D etc..
					* @return {boolean} true if we can generate mips
					* @memberOf module:twgl/textures
					*/
					function canFilter(internalFormat) {
						return getTextureInternalFormatInfo(internalFormat).textureFilterable;
					}
					/**
					* Gets the number of components for a given image format.
					* @param {number} format the format.
					* @return {number} the number of components for the format.
					* @memberOf module:twgl/textures
					*/
					function getNumComponentsForFormat(format) {
						return formatInfo[format].numColorComponents;
					}
					/**
					* Gets the texture type for a given array type.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @return {number} the gl texture type
					* @private
					*/
					function getTextureTypeForArrayType(gl, src, defaultType) {
						if (isArrayBuffer(src)) return typedArrays.getGLTypeForTypedArray(src);
						return defaultType || UNSIGNED_BYTE;
					}
					function guessDimensions(gl, target, width, height, numElements) {
						if (numElements % 1 !== 0) throw new Error("can't guess dimensions");
						if (!width && !height) {
							var size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
							if (size % 1 === 0) {
								width = size;
								height = size;
							} else {
								width = numElements;
								height = 1;
							}
						} else if (!height) {
							height = numElements / width;
							if (height % 1) throw new Error("can't guess dimensions");
						} else if (!width) {
							width = numElements / height;
							if (width % 1) throw new Error("can't guess dimensions");
						}
						return {
							width,
							height
						};
					}
					/**
					* Sets the default texture color.
					*
					* The default texture color is used when loading textures from
					* urls. Because the URL will be loaded async we'd like to be
					* able to use the texture immediately. By putting a 1x1 pixel
					* color in the texture we can start using the texture before
					* the URL has loaded.
					*
					* @param {number[]} color Array of 4 values in the range 0 to 1
					* @deprecated see {@link module:twgl.setDefaults}
					* @memberOf module:twgl/textures
					*/
					function setDefaultTextureColor(color) {
						defaults.textureColor = new Uint8Array([
							color[0] * 255,
							color[1] * 255,
							color[2] * 255,
							color[3] * 255
						]);
					}
					function setDefaults(newDefaults) {
						helper.copyExistingProperties(newDefaults, defaults);
						if (newDefaults.textureColor) setDefaultTextureColor(newDefaults.textureColor);
					}
					/**
					* A function to generate the source for a texture.
					* @callback TextureFunc
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options the texture options
					* @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
					* @memberOf module:twgl
					*/
					/**
					* Texture options passed to most texture functions. Each function will use whatever options
					* are appropriate for its needs. This lets you pass the same options to all functions.
					*
					* Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
					* `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
					*
					* @typedef {Object} TextureOptions
					* @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
					* @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
					* @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
					* @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
					* @property {number} [depth] the depth of a texture. Only used if src is an array or typed array or null and target is `TEXTURE_3D` .
					* @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
					*     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
					* @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
					* @property {number} [minMag] both the min and mag filter settings.
					* @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
					* @property {number} [format] format for texture. Defaults to `gl.RGBA`.
					* @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
					*     is ArrayBufferView defaults to type that matches ArrayBufferView type.
					* @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
					* @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
					* @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
					* @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
					* @property {number} [minLod] TEXTURE_MIN_LOD setting
					* @property {number} [maxLod] TEXTURE_MAX_LOD setting
					* @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
					* @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
					* @property {number} [compareFunc] TEXTURE_COMPARE_FUNC setting
					* @property {number} [compareMode] TEXTURE_COMPARE_MODE setting
					* @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
					* @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
					*     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
					*     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
					* @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
					*     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
					*     the current setting for specific textures.
					* @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
					*     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
					*     the current setting for specific textures.
					* @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
					*     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
					*     the current setting for specific textures.
					* @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
					*    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
					*    then then `auto` is assumed to be `false` unless explicity set to `true`.
					* @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
					*
					*     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
					*      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
					*      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
					*      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
					*      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
					*      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
					*
					* @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
					*
					*    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
					*    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
					*    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
					*    The pieces will be uploaded in `cubeFaceOrder`
					*
					*    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
					*
					*    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
					*    and will be scaled to the specified width and height OR to the size of the first image that loads.
					*
					*    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
					*    `HTMLCanvasElement`, `HTMLVideoElement`.
					*
					*    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture.
					*
					*    *  If `width` or `height` is not specified it is guessed as follows.
					*
					*       First the number of elements is computed by `src.length / numComponents`
					*       where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
					*       by 6. Then
					*
					*       *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
					*           are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
					*
					*       *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
					*
					*    * If both `width` and `height` is specified, then, the size of mip levels from `level` will be computed
					*      and data for consecutive mip levels will be uploaded until the data runs out.
					*
					*      In other words: `{ format: g.RGBA, width: 4, height: 4, src: Uint8Array((4 * 4 + 2 * 2 + 1) * 4) }`
					*      uploads 3 mip levels (4x4, 2x2, 1x1) because src is more than the data for the first mip level.
					*
					* If `number[]` will be converted to `type`.
					*
					* If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
					* Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
					* an array etc...
					*
					* If `src` is undefined then an empty texture will be created of size `width` by `height`.
					*
					* @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
					*    default: undefined. Also see {@link module:twgl.setDefaults}.
					*
					* @memberOf module:twgl
					*/
					/**
					* Saves the current packing state, sets the packing state as specified
					* then calls a function, after which the packing state will be restored.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @param {function():void} [fn] A function to call, after which the packing state will be restored.
					* @private
					*/
					function scopedSetPackState(gl, options, fn) {
						var colorspaceConversion;
						var premultiplyAlpha;
						var flipY;
						if (options.colorspaceConversion !== void 0) {
							colorspaceConversion = gl.getParameter(UNPACK_COLORSPACE_CONVERSION_WEBGL);
							gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
						}
						if (options.premultiplyAlpha !== void 0) {
							premultiplyAlpha = gl.getParameter(UNPACK_PREMULTIPLY_ALPHA_WEBGL);
							gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
						}
						if (options.flipY !== void 0) {
							flipY = gl.getParameter(UNPACK_FLIP_Y_WEBGL);
							gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
						}
						fn();
						if (colorspaceConversion !== void 0) gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, colorspaceConversion);
						if (premultiplyAlpha !== void 0) gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
						if (flipY !== void 0) gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, flipY);
					}
					/**
					* returns the property if set or the corresponding state if undefined
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options
					* @param {string} property the name of the property to copy
					* @param {number} pname
					* @return {module:twgl.TextureOptions}
					*/
					function getPackStateOption(gl, options, property, pname) {
						var v = options[property];
						return _defineProperty({}, property, v === void 0 ? gl.getParameter(pname) : v);
					}
					/**
					* Copy the options object and apply pack state
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options
					* @return {module:twgl.TextureOptions}
					*/
					function copyOptionsAndApplyPackState(gl, options) {
						return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, options), getPackStateOption(gl, options, "flipY", UNPACK_FLIP_Y_WEBGL)), getPackStateOption(gl, options, "premultiplyAlpha", UNPACK_PREMULTIPLY_ALPHA_WEBGL)), getPackStateOption(gl, options, "colorspaceConversion", UNPACK_COLORSPACE_CONVERSION_WEBGL));
					}
					/**
					* Set skip state to defaults
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @private
					*/
					function setSkipStateToDefault(gl) {
						gl.pixelStorei(UNPACK_ALIGNMENT, 4);
						if (utils.isWebGL2(gl)) {
							gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
							gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
							gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
							gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
							gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
						}
					}
					/**
					* Sets the parameters of a texture or sampler
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {number|WebGLSampler} target texture target or sampler
					* @param {function()} parameteriFn texParameteri or samplerParameteri fn
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @private
					*/
					function setTextureSamplerParameters(gl, target, parameteriFn, options) {
						if (options.minMag) {
							parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
							parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
						}
						if (options.min) parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
						if (options.mag) parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
						if (options.wrap) {
							parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
							parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
							if (target === TEXTURE_3D || helper.isSampler(gl, target)) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
						}
						if (options.wrapR) parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
						if (options.wrapS) parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
						if (options.wrapT) parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
						if (options.minLod !== void 0) parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
						if (options.maxLod !== void 0) parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
						if (options.baseLevel !== void 0) parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
						if (options.maxLevel !== void 0) parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
						if (options.compareFunc !== void 0) parameteriFn.call(gl, target, TEXTURE_COMPARE_FUNC, options.compareFunc);
						if (options.compareMode !== void 0) parameteriFn.call(gl, target, TEXTURE_COMPARE_MODE, options.compareMode);
					}
					/**
					* Sets the texture parameters of a texture.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @memberOf module:twgl/textures
					*/
					function setTextureParameters(gl, tex, options) {
						var target = options.target || TEXTURE_2D;
						gl.bindTexture(target, tex);
						setTextureSamplerParameters(gl, target, gl.texParameteri, options);
					}
					/**
					* Sets the sampler parameters of a sampler.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLSampler} sampler the WebGLSampler to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @memberOf module:twgl/textures
					*/
					function setSamplerParameters(gl, sampler, options) {
						setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
					}
					/**
					* Creates a new sampler object and sets parameters.
					*
					* Example:
					*
					*      const sampler = twgl.createSampler(gl, {
					*        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
					*        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
					*      });
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
					* @return {Object.<string,WebGLSampler>} the created samplers by name
					* @private
					*/
					function createSampler(gl, options) {
						var sampler = gl.createSampler();
						setSamplerParameters(gl, sampler, options);
						return sampler;
					}
					/**
					* Creates a multiple sampler objects and sets parameters on each.
					*
					* Example:
					*
					*      const samplers = twgl.createSamplers(gl, {
					*        nearest: {
					*          minMag: gl.NEAREST,
					*        },
					*        nearestClampS: {
					*          minMag: gl.NEAREST,
					*          wrapS: gl.CLAMP_TO_NEAREST,
					*        },
					*        linear: {
					*          minMag: gl.LINEAR,
					*        },
					*        nearestClamp: {
					*          minMag: gl.NEAREST,
					*          wrap: gl.CLAMP_TO_EDGE,
					*        },
					*        linearClamp: {
					*          minMag: gl.LINEAR,
					*          wrap: gl.CLAMP_TO_EDGE,
					*        },
					*        linearClampT: {
					*          minMag: gl.LINEAR,
					*          wrapT: gl.CLAMP_TO_EDGE,
					*        },
					*      });
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
					* @private
					*/
					function createSamplers(gl, samplerOptions) {
						var samplers = {};
						Object.keys(samplerOptions).forEach(function(name) {
							samplers[name] = createSampler(gl, samplerOptions[name]);
						});
						return samplers;
					}
					/**
					* Makes a 1x1 pixel
					* If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
					* @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
					* @return {Uint8Array} Unit8Array with color.
					* @private
					*/
					function make1Pixel(color) {
						color = color || defaults.textureColor;
						if (isArrayBuffer(color)) return color;
						return new Uint8Array([
							color[0] * 255,
							color[1] * 255,
							color[2] * 255,
							color[3] * 255
						]);
					}
					/**
					* @typedef {Object} SetTextureFilteringInternalOptions
					* @property {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @property {number} [width] width of texture
					* @property {number} [height] height of texture
					* @property {number} [internalFormat] The internalFormat parameter from texImage2D etc..
					* @property {number} [lastMipLevelUploaded] The last mip level manually uploaded
					* @private
					*/
					/**
					* Sets filtering or generates mips for texture based on width or height
					* If width or height is not passed in uses `options.width` and//or `options.height`
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {SetTextureFilteringInternalOptions} p
					* @private
					*/
					function setTextureFilteringForSizeInternal(gl, tex, _ref2) {
						var options = _ref2.options, width = _ref2.width, height = _ref2.height, internalFormat = _ref2.internalFormat, lastMipLevelUploaded = _ref2.lastMipLevelUploaded;
						options = options || defaults.textureOptions;
						internalFormat = internalFormat || RGBA;
						var target = options.target || TEXTURE_2D;
						width = width || options.width;
						height = height || options.height;
						gl.bindTexture(target, tex);
						if (lastMipLevelUploaded > 1) {
							var lastLevelWidth = Math.max(1, width >> lastMipLevelUploaded);
							var lastLevelHeight = Math.max(1, height >> lastMipLevelUploaded);
							var canUseMips = lastLevelWidth === 1 && lastLevelHeight === 1;
							var magFiltering = canFilter(internalFormat) ? LINEAR : NEAREST;
							var minFiltering = canFilter(internalFormat) ? canUseMips ? NEAREST_MIPMAP_LINEAR : LINEAR : NEAREST;
							gl.texParameteri(target, TEXTURE_MAG_FILTER, magFiltering);
							gl.texParameteri(target, TEXTURE_MIN_FILTER, minFiltering);
						} else if (canGenerateMipmap(gl, width, height, internalFormat)) gl.generateMipmap(target);
						else {
							var filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
							gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
							gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
							gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
							gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
						}
					}
					/**
					* Sets filtering or generates mips for texture based on width or height
					* If width or height is not passed in uses `options.width` and//or `options.height`
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @param {number} [width] width of texture
					* @param {number} [height] height of texture
					* @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
					* @memberOf module:twgl/textures
					*/
					function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
						setTextureFilteringForSizeInternal(gl, tex, {
							options,
							width,
							height,
							internalFormat
						});
					}
					function shouldAutomaticallySetTextureFilteringForSize(options) {
						return options.auto === true || options.auto === void 0 && options.level === void 0;
					}
					/**
					* Gets an array of cubemap face enums
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @return {number[]} cubemap face enums
					* @private
					*/
					function getCubeFaceOrder(gl, options) {
						options = options || {};
						return options.cubeFaceOrder || [
							TEXTURE_CUBE_MAP_POSITIVE_X,
							TEXTURE_CUBE_MAP_NEGATIVE_X,
							TEXTURE_CUBE_MAP_POSITIVE_Y,
							TEXTURE_CUBE_MAP_NEGATIVE_Y,
							TEXTURE_CUBE_MAP_POSITIVE_Z,
							TEXTURE_CUBE_MAP_NEGATIVE_Z
						];
					}
					/**
					* @typedef {Object} FaceInfo
					* @property {number} face gl enum for texImage2D
					* @property {number} ndx face index (0 - 5) into source data
					* @ignore
					*/
					/**
					* Gets an array of FaceInfos
					* There's a bug in some NVidia drivers that will crash the driver if
					* `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
					* the user's desired order from his faces to WebGL and make sure we
					* do the faces in WebGL order
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
					*    it's needed internally to sort the array of `ndx` properties by `face`.
					* @private
					*/
					function getCubeFacesWithNdx(gl, options) {
						var facesWithNdx = getCubeFaceOrder(gl, options).map(function(face, ndx) {
							return {
								face,
								ndx
							};
						});
						facesWithNdx.sort(function(a, b) {
							return a.face - b.face;
						});
						return facesWithNdx;
					}
					/**
					* Set a texture from the contents of an element. Will also set
					* texture filtering or generate mips based on the dimensions of the element
					* unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
					* attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {HTMLElement} element a canvas, img, or video element.
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @memberOf module:twgl/textures
					* @kind function
					*/
					function setTextureFromElement(gl, tex, element, options) {
						options = options || defaults.textureOptions;
						var target = options.target || TEXTURE_2D;
						var level = options.level || 0;
						var width = element.width;
						var height = element.height;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type = options.type || formatType.type;
						gl.bindTexture(target, tex);
						if (target === TEXTURE_CUBE_MAP) {
							var imgWidth = element.width;
							var imgHeight = element.height;
							var size;
							var slices;
							if (imgWidth / 6 === imgHeight) {
								size = imgHeight;
								slices = [
									0,
									0,
									1,
									0,
									2,
									0,
									3,
									0,
									4,
									0,
									5,
									0
								];
							} else if (imgHeight / 6 === imgWidth) {
								size = imgWidth;
								slices = [
									0,
									0,
									0,
									1,
									0,
									2,
									0,
									3,
									0,
									4,
									0,
									5
								];
							} else if (imgWidth / 3 === imgHeight / 2) {
								size = imgWidth / 3;
								slices = [
									0,
									0,
									1,
									0,
									2,
									0,
									0,
									1,
									1,
									1,
									2,
									1
								];
							} else if (imgWidth / 2 === imgHeight / 3) {
								size = imgWidth / 2;
								slices = [
									0,
									0,
									1,
									0,
									0,
									1,
									1,
									1,
									0,
									2,
									1,
									2
								];
							} else throw new Error("can't figure out cube map from element: ".concat(element.src ? element.src : element.nodeName));
							var ctx = getShared2DContext();
							if (ctx) {
								ctx.canvas.width = size;
								ctx.canvas.height = size;
								width = size;
								height = size;
								scopedSetPackState(gl, options, function() {
									getCubeFacesWithNdx(gl, options).forEach(function(f) {
										var xOffset = slices[f.ndx * 2 + 0] * size;
										var yOffset = slices[f.ndx * 2 + 1] * size;
										ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
										gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
									});
									ctx.canvas.width = 1;
									ctx.canvas.height = 1;
								});
							} else if (typeof createImageBitmap !== "undefined") {
								width = size;
								height = size;
								getCubeFacesWithNdx(gl, options).forEach(function(f) {
									var xOffset = slices[f.ndx * 2 + 0] * size;
									var yOffset = slices[f.ndx * 2 + 1] * size;
									gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
									createImageBitmap(element, xOffset, yOffset, size, size, {
										premultiplyAlpha: "none",
										colorSpaceConversion: "none"
									}).then(function(imageBitmap) {
										scopedSetPackState(gl, options, function() {
											gl.bindTexture(target, tex);
											gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
											if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
										});
									});
								});
							}
						} else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) scopedSetPackState(gl, options, function() {
							var smallest = Math.min(element.width, element.height);
							var largest = Math.max(element.width, element.height);
							var depth = largest / smallest;
							if (depth % 1 !== 0) throw new Error("can not compute 3D dimensions of element");
							var xMult = element.width === largest ? 1 : 0;
							var yMult = element.height === largest ? 1 : 0;
							gl.pixelStorei(UNPACK_ALIGNMENT, 1);
							gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
							gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
							gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
							gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
							for (var d = 0; d < depth; ++d) {
								var srcX = d * smallest * xMult;
								var srcY = d * smallest * yMult;
								gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
								gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
								gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
							}
							setSkipStateToDefault(gl);
						});
						else scopedSetPackState(gl, options, function() {
							gl.texImage2D(target, level, internalFormat, format, type, element);
						});
						if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
						setTextureParameters(gl, tex, options);
					}
					function noop() {}
					/**
					* Checks whether the url's origin is the same so that we can set the `crossOrigin`
					* @param {string} url url to image
					* @returns {boolean} true if the window's origin is the same as image's url
					* @private
					*/
					function urlIsSameOrigin(url) {
						if (typeof document !== "undefined") {
							var a = document.createElement("a");
							a.href = url;
							return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
						} else {
							var localOrigin = new URL(location.href).origin;
							return new URL(url, location.href).origin === localOrigin;
						}
					}
					function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
						return crossOrigin === void 0 && !urlIsSameOrigin(url) ? "anonymous" : crossOrigin;
					}
					/**
					* Loads an image
					* @param {string} url url to image
					* @param {string} crossOrigin
					* @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
					*     if there was an error
					* @return {HTMLImageElement} the image being loaded.
					* @private
					*/
					function loadImage(url, crossOrigin, callback) {
						callback = callback || noop;
						var img;
						crossOrigin = crossOrigin !== void 0 ? crossOrigin : defaults.crossOrigin;
						crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
						if (typeof Image !== "undefined") {
							img = new Image();
							if (crossOrigin !== void 0) img.crossOrigin = crossOrigin;
							var clearEventHandlers = function clearEventHandlers() {
								img.removeEventListener("error", onError);
								img.removeEventListener("load", onLoad);
								img = null;
							};
							var onError = function onError() {
								var msg = "couldn't load image: " + url;
								helper.error(msg);
								callback(msg, img);
								clearEventHandlers();
							};
							var onLoad = function onLoad() {
								callback(null, img);
								clearEventHandlers();
							};
							img.addEventListener("error", onError);
							img.addEventListener("load", onLoad);
							img.src = url;
							return img;
						} else if (typeof ImageBitmap !== "undefined") {
							var err;
							var bm;
							var cb = function cb() {
								callback(err, bm);
							};
							var options = {};
							if (crossOrigin) options.mode = "cors";
							fetch(url, options).then(function(response) {
								if (!response.ok) throw response;
								return response.blob();
							}).then(function(blob) {
								return createImageBitmap(blob, {
									premultiplyAlpha: "none",
									colorSpaceConversion: "none"
								});
							}).then(function(bitmap) {
								bm = bitmap;
								setTimeout(cb);
							})["catch"](function(e) {
								err = e;
								setTimeout(cb);
							});
							img = null;
						}
						return img;
					}
					/**
					* check if object is a TexImageSource
					*
					* @param {Object} obj Object to test
					* @return {boolean} true if object is a TexImageSource
					* @private
					*/
					function isTexImageSource(obj) {
						return typeof ImageBitmap !== "undefined" && obj instanceof ImageBitmap || typeof ImageData !== "undefined" && obj instanceof ImageData || typeof HTMLElement !== "undefined" && obj instanceof HTMLElement;
					}
					/**
					* if obj is an TexImageSource then just
					* uses it otherwise if obj is a string
					* then load it first.
					*
					* @param {string|TexImageSource} obj
					* @param {string} crossOrigin
					* @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
					*     if there was an error
					* @private
					*/
					function loadAndUseImage(obj, crossOrigin, callback) {
						if (isTexImageSource(obj)) {
							setTimeout(function() {
								callback(null, obj);
							});
							return obj;
						}
						return loadImage(obj, crossOrigin, callback);
					}
					/**
					* Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
					* the default texture color is used which can be set by calling `setDefaultTextureColor`.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @memberOf module:twgl/textures
					* @private
					*/
					function setTextureTo1PixelColor(gl, tex, options) {
						options = options || defaults.textureOptions;
						var target = options.target || TEXTURE_2D;
						gl.bindTexture(target, tex);
						if (options.color === false) return;
						var color = make1Pixel(options.color);
						if (target === TEXTURE_CUBE_MAP) for (var ii = 0; ii < 6; ++ii) gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
						else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
						else gl.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
					}
					/**
					* The src image(s) used to create a texture.
					*
					* When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
					* you can pass in urls for images to load into the textures. If it's a single url
					* then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
					* this will be a corresponding array of images for the cubemap.
					*
					* @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
					* @memberOf module:twgl
					*/
					/**
					* A callback for when an image finished downloading and been uploaded into a texture
					* @callback TextureReadyCallback
					* @param {*} err If truthy there was an error.
					* @param {WebGLTexture} texture the texture.
					* @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
					* @memberOf module:twgl
					*/
					/**
					* A callback for when all images have finished downloading and been uploaded into their respective textures
					* @callback TexturesReadyCallback
					* @param {*} err If truthy there was an error.
					* @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
					* @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
					* @memberOf module:twgl
					*/
					/**
					* A callback for when an image finished downloading and been uploaded into a texture
					* @callback CubemapReadyCallback
					* @param {*} err If truthy there was an error.
					* @param {WebGLTexture} tex the texture.
					* @param {HTMLImageElement[]} imgs the images for each face.
					* @memberOf module:twgl
					*/
					/**
					* A callback for when an image finished downloading and been uploaded into a texture
					* @callback ThreeDReadyCallback
					* @param {*} err If truthy there was an error.
					* @param {WebGLTexture} tex the texture.
					* @param {HTMLImageElement[]} imgs the images for each slice.
					* @memberOf module:twgl
					*/
					/**
					* Loads a texture from an image from a Url as specified in `options.src`
					* If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
					* immediately useable. It will be updated with the contents of the image once the image has finished
					* downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					* @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
					*    be non null if there was an error.
					* @return {HTMLImageElement} the image being downloaded.
					* @memberOf module:twgl/textures
					*/
					function loadTextureFromUrl(gl, tex, options, callback) {
						callback = callback || noop;
						options = options || defaults.textureOptions;
						setTextureTo1PixelColor(gl, tex, options);
						options = copyOptionsAndApplyPackState(gl, options);
						return loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
							if (err) callback(err, tex, img);
							else {
								setTextureFromElement(gl, tex, img, options);
								callback(null, tex, img);
							}
						});
					}
					/**
					* Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
					* so that it is usable immediately unless `option.color === false`.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
					*    be non null if there was an error.
					* @memberOf module:twgl/textures
					* @private
					*/
					function loadCubemapFromUrls(gl, tex, options, callback) {
						callback = callback || noop;
						var urls = options.src;
						if (urls.length !== 6) throw new Error("there must be 6 urls for a cubemap");
						var level = options.level || 0;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type = options.type || UNSIGNED_BYTE;
						var target = options.target || TEXTURE_2D;
						if (target !== TEXTURE_CUBE_MAP) throw new Error("target must be TEXTURE_CUBE_MAP");
						setTextureTo1PixelColor(gl, tex, options);
						options = copyOptionsAndApplyPackState(gl, options);
						var numToLoad = 6;
						var errors = [];
						var faces = getCubeFaceOrder(gl, options);
						var imgs;
						function uploadImg(faceTarget) {
							return function(err, img) {
								--numToLoad;
								if (err) errors.push(err);
								else if (img.width !== img.height) errors.push("cubemap face img is not a square: " + img.src);
								else scopedSetPackState(gl, options, function() {
									gl.bindTexture(target, tex);
									if (numToLoad === 5) getCubeFaceOrder(gl).forEach(function(otherTarget) {
										gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
									});
									else gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
									if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
								});
								if (numToLoad === 0) callback(errors.length ? errors : void 0, tex, imgs);
							};
						}
						imgs = urls.map(function(url, ndx) {
							return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
						});
					}
					/**
					* Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
					* Will set the texture to a 1x1 pixel color
					* so that it is usable immediately unless `option.color === false`.
					*
					* If the width and height is not specified the width and height of the first
					* image loaded will be used. Note that since images are loaded async
					* which image downloads first is unknown.
					*
					* If an image is not the same size as the width and height it will be scaled
					* to that width and height.
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
					*    be non null if there was an error.
					* @memberOf module:twgl/textures
					* @private
					*/
					function loadSlicesFromUrls(gl, tex, options, callback) {
						callback = callback || noop;
						var urls = options.src;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type = options.type || UNSIGNED_BYTE;
						var target = options.target || TEXTURE_2D_ARRAY;
						if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) throw new Error("target must be TEXTURE_3D or TEXTURE_2D_ARRAY");
						setTextureTo1PixelColor(gl, tex, options);
						options = copyOptionsAndApplyPackState(gl, options);
						var numToLoad = urls.length;
						var errors = [];
						var imgs;
						var level = options.level || 0;
						var width = options.width;
						var height = options.height;
						var depth = urls.length;
						var firstImage = true;
						function uploadImg(slice) {
							return function(err, img) {
								--numToLoad;
								if (err) errors.push(err);
								else scopedSetPackState(gl, options, function() {
									gl.bindTexture(target, tex);
									if (firstImage) {
										firstImage = false;
										width = options.width || img.width;
										height = options.height || img.height;
										gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
										for (var s = 0; s < depth; ++s) gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
									} else {
										var src = img;
										var ctx;
										if (img.width !== width || img.height !== height) {
											ctx = getShared2DContext();
											src = ctx.canvas;
											ctx.canvas.width = width;
											ctx.canvas.height = height;
											ctx.drawImage(img, 0, 0, width, height);
										}
										gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
										if (ctx && src === ctx.canvas) {
											ctx.canvas.width = 0;
											ctx.canvas.height = 0;
										}
									}
									if (shouldAutomaticallySetTextureFilteringForSize(options)) gl.generateMipmap(target);
								});
								if (numToLoad === 0) callback(errors.length ? errors : void 0, tex, imgs);
							};
						}
						imgs = urls.map(function(url, ndx) {
							return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
						});
					}
					/**
					* Sets a texture from an array or typed array. If the width or height is not provided will attempt to
					* guess the size. See {@link module:twgl.TextureOptions}.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					*   This is often the same options you passed in when you created the texture.
					* @memberOf module:twgl/textures
					*/
					function setTextureFromArray(gl, tex, src, options) {
						options = options || defaults.textureOptions;
						var target = options.target || TEXTURE_2D;
						gl.bindTexture(target, tex);
						var level = options.level || 0;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
						if (!isArrayBuffer(src)) src = new (typedArrays.getTypedArrayTypeForGLType(type))(src);
						else if (src instanceof Uint8ClampedArray) src = new Uint8Array(src.buffer);
						var _getTextureSize = getTextureSize(target, src, options, internalFormat, format, type), width = _getTextureSize.width, height = _getTextureSize.height, depth = _getTextureSize.depth;
						var compressed = isCompressedInternalFormat(internalFormat);
						setSkipStateToDefault(gl);
						gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
						var mipLevelOffset = 0;
						scopedSetPackState(gl, options, function() {
							var mipLevelByteOffset = 0;
							var _getBlockInfoForInter = getBlockInfoForInternalFormat(internalFormat, type), blockWidth = _getBlockInfoForInter.blockWidth, blockHeight = _getBlockInfoForInter.blockHeight, bytesPerBlock = _getBlockInfoForInter.bytesPerBlock;
							var _loop = function _loop() {
								var mipWidth = Math.max(1, width >> mipLevelOffset);
								var mipHeight = Math.max(1, height >> mipLevelOffset);
								var mipDepth = target === TEXTURE_2D ? Math.max(1, depth >> mipLevelOffset) : depth;
								var blocksAcross = Math.ceil(mipWidth / blockWidth);
								var blocksDown = Math.ceil(mipHeight / blockHeight);
								var numFaces = target === TEXTURE_CUBE_MAP ? 6 : 1;
								var bytesPerMipLevel = blocksAcross * blocksDown * bytesPerBlock * mipDepth * numFaces;
								if (mipLevelByteOffset + bytesPerMipLevel > src.byteLength) throw new Error("src size does not match number of mip levels");
								var mipSource = src.subarray(mipLevelByteOffset / src.BYTES_PER_ELEMENT, (mipLevelByteOffset + bytesPerMipLevel) / src.BYTES_PER_ELEMENT);
								var mipLevel = level + mipLevelOffset;
								if (target === TEXTURE_CUBE_MAP) {
									var faceSize = mipSource.length / 6;
									getCubeFacesWithNdx(gl, options).forEach(function(f) {
										var offset = faceSize * f.ndx;
										var data = mipSource.subarray(offset, offset + faceSize);
										if (compressed) gl.compressedTexImage2D(f.face, mipLevel, internalFormat, mipWidth, mipHeight, 0, data);
										else gl.texImage2D(f.face, mipLevel, internalFormat, mipWidth, mipHeight, 0, format, type, data);
									});
								} else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, mipLevel, internalFormat, mipWidth, mipHeight, mipDepth, 0, format, type, mipSource);
								else if (compressed) gl.compressedTexImage2D(target, mipLevel, internalFormat, mipWidth, mipHeight, 0, mipSource);
								else gl.texImage2D(target, mipLevel, internalFormat, mipWidth, mipHeight, 0, format, type, mipSource);
								++mipLevelOffset;
								mipLevelByteOffset += bytesPerMipLevel;
								if (mipWidth === 1 && mipHeight === 1 && mipDepth === 1 && mipLevelByteOffset !== src.byteLength) throw new Error("src size has more data than can fit in mip levels");
							};
							while (mipLevelByteOffset < src.byteLength) _loop();
						});
						return {
							width,
							height,
							depth,
							type,
							lastMipLevelUploaded: level + mipLevelOffset - 1
						};
					}
					function getTextureSize(target, src, options, internalFormat, format, type) {
						var width = options.width;
						var height = options.height;
						var depth = options.depth;
						var compressed = isCompressedInternalFormat(internalFormat);
						if (compressed) {
							if (!width || !height) throw new Error("compressed texture needs to set width and height!");
							depth = depth || 1;
						} else {
							var bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
							var numElements = src.byteLength / bytesPerElement;
							if (numElements % 1) throw new Error("length wrong size for format: ".concat(utils.glEnumToString(gl, format)));
							if (compressed && (!width || !height)) throw new Error("compressed texture needs to set width and height!");
							var dimensions;
							if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) if (!width && !height && !depth) {
								var size = Math.cbrt(numElements);
								if (size % 1 !== 0) throw new Error("can't guess cube size of array of numElements: ".concat(numElements));
								width = size;
								height = size;
								depth = size;
							} else if (width && (!height || !depth)) {
								dimensions = guessDimensions(gl, target, height, depth, numElements / width);
								height = dimensions.width;
								depth = dimensions.height;
							} else if (height && (!width || !depth)) {
								dimensions = guessDimensions(gl, target, width, depth, numElements / height);
								width = dimensions.width;
								depth = dimensions.height;
							} else {
								dimensions = guessDimensions(gl, target, width, height, numElements / depth);
								width = dimensions.width;
								height = dimensions.height;
							}
							else {
								dimensions = guessDimensions(gl, target, width, height, numElements);
								width = dimensions.width;
								height = dimensions.height;
							}
						}
						return {
							width,
							height,
							depth
						};
					}
					/**
					* Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
					* You must set `options.width` and `options.height`.
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the WebGLTexture to set parameters for
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @memberOf module:twgl/textures
					*/
					function setEmptyTexture(gl, tex, options) {
						var target = options.target || TEXTURE_2D;
						gl.bindTexture(target, tex);
						var level = options.level || 0;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type = options.type || formatType.type;
						scopedSetPackState(gl, options, function() {
							if (target === TEXTURE_CUBE_MAP) for (var ii = 0; ii < 6; ++ii) gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
							else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
							else gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
						});
					}
					/**
					* Creates a texture based on the options passed in.
					*
					* See {@link module:twgl.TextureOptions}
					*
					* Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
					* UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
					*
					* UNPACK_FLIP_Y_WEBGL, UNPACK_PREMULTIPLY_ALPHA_WEBGL, UNPACK_COLORSPACE_CONVERSION_WEBGL
					* are left as is though you can pass in options for flipY, premultiplyAlpha, and colorspaceConversion
					* to override them.
					*
					* As for the behavior of these settings
					*
					* ```js
					* gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
					* t1 = twgl.createTexture({src: someImage }); // flipped
					* t2 = twgl.createTexture({src: someImage, flipY: true }); // flipped
					* t3 = twgl.createTexture({src: someImage, flipY: false }); // not flipped
					* t4 = twgl.createTexture({src: someImage }); // flipped
					* ```
					*
					* * t1 is flipped because UNPACK_FLIP_Y_WEBGL is true
					* * t2 is flipped because it was requested
					* * t3 is not flipped because it was requested
					* * t4 is flipped because UNPACK_FLIP_Y_WEBGL has been restored to true
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					* @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
					* @return {WebGLTexture} the created texture.
					* @memberOf module:twgl/textures
					*/
					function createTexture(gl, options, callback) {
						callback = callback || noop;
						options = options || defaults.textureOptions;
						var tex = gl.createTexture();
						var target = options.target || TEXTURE_2D;
						var width = options.width || 1;
						var height = options.height || 1;
						var lastMipLevelUploaded = 0;
						var internalFormat = options.internalFormat || RGBA;
						gl.bindTexture(target, tex);
						if (target === TEXTURE_CUBE_MAP) {
							gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
							gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
						}
						var src = options.src;
						if (src) {
							if (typeof src === "function") src = src(gl, options);
							if (typeof src === "string") loadTextureFromUrl(gl, tex, options, callback);
							else if (isArrayBuffer(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer(src[0]))) {
								var dimensions = setTextureFromArray(gl, tex, src, options);
								width = dimensions.width;
								height = dimensions.height;
								lastMipLevelUploaded = dimensions.lastMipLevelUploaded;
							} else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) if (target === TEXTURE_CUBE_MAP) loadCubemapFromUrls(gl, tex, options, callback);
							else loadSlicesFromUrls(gl, tex, options, callback);
							else {
								setTextureFromElement(gl, tex, src, options);
								width = src.width;
								height = src.height;
							}
						} else setEmptyTexture(gl, tex, options);
						if (shouldAutomaticallySetTextureFilteringForSize(options)) setTextureFilteringForSizeInternal(gl, tex, {
							options,
							width,
							height,
							internalFormat,
							lastMipLevelUploaded
						});
						setTextureParameters(gl, tex, options);
						return tex;
					}
					/**
					* Value returned by createTextureAsync
					*
					* @typedef {Object} CreateTextureInfo
					* @param {WebGLTexture} texture the texture.
					* @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
					* @memberOf module:twgl
					*/
					/**
					* Creates a texture based on the options passed in.
					*
					* see {@link module:twgl/textures.createTexture}.
					* The only difference is this function returns a promise
					* where as the other returns a texture and takes a callback.
					*
					* Note: this is here for completeness. It is probably better to use
					* the non-async version as it returns a usable texture immediately
					* where as this one you have to wait for it to load.
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
					* @return {Promise<CreateTextureInfo>} The created texture and source.
					*/
					function createTextureAsync(gl, options) {
						return new Promise(function(resolve, reject) {
							createTexture(gl, options, function(err, texture, source) {
								if (err) reject(err);
								else resolve({
									texture,
									source
								});
							});
						});
					}
					/**
					* Resizes a texture based on the options passed in.
					*
					* Note: This is not a generic resize anything function.
					* It's mostly used by {@link module:twgl.resizeFramebufferInfo}
					* It will use `options.src` if it exists to try to determine a `type`
					* otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
					* for the texture. Texture parameters will be set accordingly
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {WebGLTexture} tex the texture to resize
					* @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
					* @param {number} [width] the new width. If not passed in will use `options.width`
					* @param {number} [height] the new height. If not passed in will use `options.height`
					* @param {number} [depth] the new depth. If not passed in will use `options.depth`
					* @memberOf module:twgl/textures
					*/
					function resizeTexture(gl, tex, options, width, height, depth) {
						width = width || options.width;
						height = height || options.height;
						depth = depth || options.depth;
						var target = options.target || TEXTURE_2D;
						gl.bindTexture(target, tex);
						var level = options.level || 0;
						var internalFormat = options.internalFormat || options.format || RGBA;
						var formatType = getFormatAndTypeForInternalFormat(internalFormat);
						var format = options.format || formatType.format;
						var type;
						var src = options.src;
						if (!src) type = options.type || formatType.type;
						else if (isArrayBuffer(src) || Array.isArray(src) && typeof src[0] === "number") type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
						else type = options.type || formatType.type;
						if (target === TEXTURE_CUBE_MAP) for (var ii = 0; ii < 6; ++ii) gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
						else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
						else gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
					}
					/**
					* Check if a src is an async request.
					* if src is a string we're going to download an image
					* if src is an array of strings we're going to download cubemap images
					* @param {*} src The src from a TextureOptions
					* @returns {bool} true if src is async.
					* @private
					*/
					function isAsyncSrc(src) {
						return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
					}
					/**
					* Creates a bunch of textures based on the passed in options.
					*
					* Example:
					*
					*     const textures = twgl.createTextures(gl, {
					*       // a power of 2 image
					*       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
					*       // a non-power of 2 image
					*       clover: { src: "images/clover.jpg" },
					*       // From a canvas
					*       fromCanvas: { src: ctx.canvas },
					*       // A cubemap from 6 images
					*       yokohama: {
					*         target: gl.TEXTURE_CUBE_MAP,
					*         src: [
					*           'images/yokohama/posx.jpg',
					*           'images/yokohama/negx.jpg',
					*           'images/yokohama/posy.jpg',
					*           'images/yokohama/negy.jpg',
					*           'images/yokohama/posz.jpg',
					*           'images/yokohama/negz.jpg',
					*         ],
					*       },
					*       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
					*       goldengate: {
					*         target: gl.TEXTURE_CUBE_MAP,
					*         src: 'images/goldengate.jpg',
					*       },
					*       // A 2x2 pixel texture from a JavaScript array
					*       checker: {
					*         mag: gl.NEAREST,
					*         min: gl.LINEAR,
					*         src: [
					*           255,255,255,255,
					*           192,192,192,255,
					*           192,192,192,255,
					*           255,255,255,255,
					*         ],
					*       },
					*       // a 1x2 pixel texture from a typed array.
					*       stripe: {
					*         mag: gl.NEAREST,
					*         min: gl.LINEAR,
					*         format: gl.LUMINANCE,
					*         src: new Uint8Array([
					*           255,
					*           128,
					*           255,
					*           128,
					*           255,
					*           128,
					*           255,
					*           128,
					*         ]),
					*         width: 1,
					*       },
					*     });
					*
					* Now
					*
					* *   `textures.hftIcon` will be a 2d texture
					* *   `textures.clover` will be a 2d texture
					* *   `textures.fromCanvas` will be a 2d texture
					* *   `textures.yohohama` will be a cubemap texture
					* *   `textures.goldengate` will be a cubemap texture
					* *   `textures.checker` will be a 2d texture
					* *   `textures.stripe` will be a 2d texture
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
					* @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
					* @return {Object.<string,WebGLTexture>} the created textures by name
					* @memberOf module:twgl/textures
					*/
					function createTextures(gl, textureOptions, callback) {
						callback = callback || noop;
						var numDownloading = 0;
						var errors = [];
						var textures = {};
						var images = {};
						function callCallbackIfReady() {
							if (numDownloading === 0) setTimeout(function() {
								callback(errors.length ? errors : void 0, textures, images);
							}, 0);
						}
						Object.keys(textureOptions).forEach(function(name) {
							var options = textureOptions[name];
							var onLoadFn;
							if (isAsyncSrc(options.src)) {
								onLoadFn = function onLoadFn(err, tex, img) {
									images[name] = img;
									--numDownloading;
									if (err) errors.push(err);
									callCallbackIfReady();
								};
								++numDownloading;
							}
							textures[name] = createTexture(gl, options, onLoadFn);
						});
						callCallbackIfReady();
						return textures;
					}
					/**
					* Value returned by createTextureAsync
					*
					* @typedef {Object} CreateTexturesInfo
					* @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
					* @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
					* @memberOf module:twgl
					*/
					/**
					* Creates textures based on the options passed in.
					*
					* see {@link module:twgl/textures.createTextures}.
					* The only difference is this function returns a promise
					* where as the other returns a texture and takes a callback.
					*
					* Note: this is here for completeness. It is probably better to use
					* the non-async version as it returns usable textures immediately
					* where as this one you have to wait for them to load.
					*
					* @param {WebGLRenderingContext} gl the WebGLRenderingContext
					* @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
					* @return {Promise<CreateTexturesInfo>} The created textures and sources.
					*/
					function createTexturesAsync(gl, options) {
						return new Promise(function(resolve, reject) {
							createTexture(gl, options, function(err, textures, sources) {
								if (err) reject(err);
								else resolve({
									textures,
									sources
								});
							});
						});
					}
				}),
				"./src/twgl-full.js": ((__unused_webpack_module, exports$9, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$9.__esModule = true;
					var _exportNames = {
						m4: true,
						v3: true,
						primitives: true
					};
					exports$9.v3 = exports$9.primitives = exports$9.m4 = void 0;
					exports$9.m4 = _interopRequireWildcard(__webpack_require__(
						/*! ./m4.js */
						"./src/m4.js"
					));
					exports$9.v3 = _interopRequireWildcard(__webpack_require__(
						/*! ./v3.js */
						"./src/v3.js"
					));
					exports$9.primitives = _interopRequireWildcard(__webpack_require__(
						/*! ./primitives.js */
						"./src/primitives.js"
					));
					var _twgl = __webpack_require__(
						/*! ./twgl.js */
						"./src/twgl.js"
					);
					Object.keys(_twgl).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$9 && exports$9[key] === _twgl[key]) return;
						exports$9[key] = _twgl[key];
					});
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
				}),
				"./src/twgl.js": ((__unused_webpack_module, exports$10, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$10.__esModule = true;
					var _exportNames = {
						addExtensionsToContext: true,
						getContext: true,
						getWebGLContext: true,
						resizeCanvasToDisplaySize: true,
						setDefaults: true,
						attributes: true,
						textures: true,
						utils: true,
						draw: true,
						framebuffers: true,
						programs: true,
						typedarrays: true,
						vertexArrays: true
					};
					exports$10.addExtensionsToContext = addExtensionsToContext;
					exports$10.framebuffers = exports$10.draw = exports$10.attributes = void 0;
					exports$10.getContext = getContext;
					exports$10.getWebGLContext = getWebGLContext;
					exports$10.programs = void 0;
					exports$10.resizeCanvasToDisplaySize = resizeCanvasToDisplaySize;
					exports$10.setDefaults = setDefaults;
					exports$10.vertexArrays = exports$10.utils = exports$10.typedarrays = exports$10.textures = void 0;
					var attributes = _interopRequireWildcard(__webpack_require__(
						/*! ./attributes.js */
						"./src/attributes.js"
					));
					exports$10.attributes = attributes;
					Object.keys(attributes).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === attributes[key]) return;
						exports$10[key] = attributes[key];
					});
					var textures = _interopRequireWildcard(__webpack_require__(
						/*! ./textures.js */
						"./src/textures.js"
					));
					exports$10.textures = textures;
					Object.keys(textures).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === textures[key]) return;
						exports$10[key] = textures[key];
					});
					var helper = _interopRequireWildcard(__webpack_require__(
						/*! ./helper.js */
						"./src/helper.js"
					));
					var utils = _interopRequireWildcard(__webpack_require__(
						/*! ./utils.js */
						"./src/utils.js"
					));
					exports$10.utils = utils;
					Object.keys(utils).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === utils[key]) return;
						exports$10[key] = utils[key];
					});
					var draw = _interopRequireWildcard(__webpack_require__(
						/*! ./draw.js */
						"./src/draw.js"
					));
					exports$10.draw = draw;
					Object.keys(draw).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === draw[key]) return;
						exports$10[key] = draw[key];
					});
					var framebuffers = _interopRequireWildcard(__webpack_require__(
						/*! ./framebuffers.js */
						"./src/framebuffers.js"
					));
					exports$10.framebuffers = framebuffers;
					Object.keys(framebuffers).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === framebuffers[key]) return;
						exports$10[key] = framebuffers[key];
					});
					var programs = _interopRequireWildcard(__webpack_require__(
						/*! ./programs.js */
						"./src/programs.js"
					));
					exports$10.programs = programs;
					Object.keys(programs).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === programs[key]) return;
						exports$10[key] = programs[key];
					});
					var typedarrays = _interopRequireWildcard(__webpack_require__(
						/*! ./typedarrays.js */
						"./src/typedarrays.js"
					));
					exports$10.typedarrays = typedarrays;
					Object.keys(typedarrays).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === typedarrays[key]) return;
						exports$10[key] = typedarrays[key];
					});
					var vertexArrays = _interopRequireWildcard(__webpack_require__(
						/*! ./vertex-arrays.js */
						"./src/vertex-arrays.js"
					));
					exports$10.vertexArrays = vertexArrays;
					Object.keys(vertexArrays).forEach(function(key) {
						if (key === "default" || key === "__esModule") return;
						if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
						if (key in exports$10 && exports$10[key] === vertexArrays[key]) return;
						exports$10[key] = vertexArrays[key];
					});
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					var defaults = { addExtensionsToContext: true };
					/**
					* Various default settings for twgl.
					*
					* Note: You can call this any number of times. Example:
					*
					*     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
					*     twgl.setDefaults({ attribPrefix: 'a_' });
					*
					* is equivalent to
					*
					*     twgl.setDefaults({
					*       textureColor: [1, 0, 0, 1],
					*       attribPrefix: 'a_',
					*     });
					*
					* @typedef {Object} Defaults
					* @property {string} [attribPrefix] The prefix to stick on attributes
					*
					*   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
					*   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
					*
					*   In other words I'll create arrays of geometry like this
					*
					*       const arrays = {
					*         position: ...
					*         normal: ...
					*         texcoord: ...
					*       };
					*
					*   But need those mapped to attributes and my attributes start with `a_`.
					*
					*   Default: `""`
					*
					* @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
					*
					*   The default texture color is used when loading textures from
					*   urls. Because the URL will be loaded async we'd like to be
					*   able to use the texture immediately. By putting a 1x1 pixel
					*   color in the texture we can start using the texture before
					*   the URL has loaded.
					*
					*   Default: `[0.5, 0.75, 1, 1]`
					*
					* @property {string} [crossOrigin]
					*
					*   If not undefined sets the crossOrigin attribute on images
					*   that twgl creates when downloading images for textures.
					*
					*   Also see {@link module:twgl.TextureOptions}.
					*
					* @property {bool} [addExtensionsToContext]
					*
					*   If true, then, when twgl will try to add any supported WebGL extensions
					*   directly to the context under their normal GL names. For example
					*   if ANGLE_instances_arrays exists then twgl would enable it,
					*   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
					*   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
					*   to the `WebGLRenderingContext`.
					*
					* @memberOf module:twgl
					*/
					/**
					* Sets various defaults for twgl.
					*
					* In the interest of terseness which is kind of the point
					* of twgl I've integrated a few of the older functions here
					*
					* @param {module:twgl.Defaults} newDefaults The default settings.
					* @memberOf module:twgl
					*/
					function setDefaults(newDefaults) {
						helper.copyExistingProperties(newDefaults, defaults);
						attributes.setAttributeDefaults_(newDefaults);
						textures.setTextureDefaults_(newDefaults);
					}
					var prefixRE = /^(.*?)_/;
					function addExtensionToContext(gl, extensionName) {
						utils.glEnumToString(gl, 0);
						var ext = gl.getExtension(extensionName);
						if (ext) {
							var enums = {};
							var fnSuffix = prefixRE.exec(extensionName)[1];
							var enumSuffix = "_" + fnSuffix;
							for (var key in ext) {
								var value = ext[key];
								var isFunc = typeof value === "function";
								var suffix = isFunc ? fnSuffix : enumSuffix;
								var name = key;
								if (key.endsWith(suffix)) name = key.substring(0, key.length - suffix.length);
								if (gl[name] !== void 0) {
									if (!isFunc && gl[name] !== value) helper.warn(name, gl[name], value, key);
								} else if (isFunc) gl[name] = function(origFn) {
									return function() {
										return origFn.apply(ext, arguments);
									};
								}(value);
								else {
									gl[name] = value;
									enums[name] = value;
								}
							}
							enums.constructor = { name: ext.constructor.name };
							utils.glEnumToString(enums, 0);
						}
						return ext;
					}
					var supportedExtensions = [
						"ANGLE_instanced_arrays",
						"EXT_blend_minmax",
						"EXT_color_buffer_float",
						"EXT_color_buffer_half_float",
						"EXT_disjoint_timer_query",
						"EXT_disjoint_timer_query_webgl2",
						"EXT_frag_depth",
						"EXT_sRGB",
						"EXT_shader_texture_lod",
						"EXT_texture_compression_bptc",
						"EXT_texture_compression_rgtc",
						"EXT_texture_filter_anisotropic",
						"OES_element_index_uint",
						"OES_standard_derivatives",
						"OES_texture_float",
						"OES_texture_float_linear",
						"OES_texture_half_float",
						"OES_texture_half_float_linear",
						"OES_vertex_array_object",
						"WEBGL_color_buffer_float",
						"WEBGL_compressed_texture_atc",
						"WEBGL_compressed_texture_etc1",
						"WEBGL_compressed_texture_etc",
						"WEBGL_compressed_texture_pvrtc",
						"WEBGL_compressed_texture_s3tc",
						"WEBGL_compressed_texture_s3tc_srgb",
						"WEBGL_depth_texture",
						"WEBGL_draw_buffers"
					];
					/**
					* Attempts to enable all of the following extensions
					* and add their functions and constants to the
					* `WebGLRenderingContext` using their normal non-extension like names.
					*
					*      ANGLE_instanced_arrays
					*      EXT_blend_minmax
					*      EXT_color_buffer_float
					*      EXT_color_buffer_half_float
					*      EXT_disjoint_timer_query
					*      EXT_disjoint_timer_query_webgl2
					*      EXT_frag_depth
					*      EXT_sRGB
					*      EXT_shader_texture_lod
					*      EXT_texture_filter_anisotropic
					*      OES_element_index_uint
					*      OES_standard_derivatives
					*      OES_texture_float
					*      OES_texture_float_linear
					*      OES_texture_half_float
					*      OES_texture_half_float_linear
					*      OES_vertex_array_object
					*      WEBGL_color_buffer_float
					*      WEBGL_compressed_texture_atc
					*      WEBGL_compressed_texture_etc1
					*      WEBGL_compressed_texture_pvrtc
					*      WEBGL_compressed_texture_s3tc
					*      WEBGL_compressed_texture_s3tc_srgb
					*      WEBGL_depth_texture
					*      WEBGL_draw_buffers
					*
					* For example if `ANGLE_instanced_arrays` exists then the functions
					* `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
					* and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
					* `WebGLRenderingContext`.
					*
					* Note that if you want to know if the extension exists you should
					* probably call `gl.getExtension` for each extension. Alternatively
					* you can check for the existence of the functions or constants that
					* are expected to be added. For example
					*
					*    if (gl.drawBuffers) {
					*      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
					*      ....
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @memberOf module:twgl
					*/
					function addExtensionsToContext(gl) {
						for (var ii = 0; ii < supportedExtensions.length; ++ii) addExtensionToContext(gl, supportedExtensions[ii]);
					}
					/**
					* Creates a webgl context.
					* @param {HTMLCanvasElement} canvas The canvas tag to get
					*     context from. If one is not passed in one will be
					*     created.
					* @return {WebGLRenderingContext} The created context.
					* @private
					*/
					function create3DContext(canvas, opt_attribs) {
						var names = ["webgl", "experimental-webgl"];
						var context = null;
						for (var ii = 0; ii < names.length; ++ii) {
							context = canvas.getContext(names[ii], opt_attribs);
							if (context) {
								if (defaults.addExtensionsToContext) addExtensionsToContext(context);
								break;
							}
						}
						return context;
					}
					/**
					* Gets a WebGL1 context.
					*
					* Note: Will attempt to enable Vertex Array Objects
					* and add WebGL2 entry points. (unless you first set defaults with
					* `twgl.setDefaults({enableVertexArrayObjects: false})`;
					*
					* @param {HTMLCanvasElement} canvas a canvas element.
					* @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
					* @return {WebGLRenderingContext} The created context.
					* @memberOf module:twgl
					* @deprecated
					* @private
					*/
					function getWebGLContext(canvas, opt_attribs) {
						return create3DContext(canvas, opt_attribs);
					}
					/**
					* Creates a webgl context.
					*
					* Will return a WebGL2 context if possible.
					*
					* You can check if it's WebGL2 with
					*
					*     twgl.isWebGL2(gl);
					*
					* @param {HTMLCanvasElement} canvas The canvas tag to get
					*     context from. If one is not passed in one will be
					*     created.
					* @return {WebGLRenderingContext} The created context.
					*/
					function createContext(canvas, opt_attribs) {
						var names = [
							"webgl2",
							"webgl",
							"experimental-webgl"
						];
						var context = null;
						for (var ii = 0; ii < names.length; ++ii) {
							context = canvas.getContext(names[ii], opt_attribs);
							if (context) {
								if (defaults.addExtensionsToContext) addExtensionsToContext(context);
								break;
							}
						}
						return context;
					}
					/**
					* Gets a WebGL context.  Will create a WebGL2 context if possible.
					*
					* You can check if it's WebGL2 with
					*
					*    function isWebGL2(gl) {
					*      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
					*    }
					*
					* Note: For a WebGL1 context will attempt to enable Vertex Array Objects
					* and add WebGL2 entry points. (unless you first set defaults with
					* `twgl.setDefaults({enableVertexArrayObjects: false})`;
					*
					* @param {HTMLCanvasElement} canvas a canvas element.
					* @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
					* @return {WebGLRenderingContext} The created context.
					* @memberOf module:twgl
					*/
					function getContext(canvas, opt_attribs) {
						return createContext(canvas, opt_attribs);
					}
					/**
					* Resize a canvas to match the size it's displayed.
					* @param {HTMLCanvasElement} canvas The canvas to resize.
					* @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
					* @return {boolean} true if the canvas was resized.
					* @memberOf module:twgl
					*/
					function resizeCanvasToDisplaySize(canvas, multiplier) {
						multiplier = multiplier || 1;
						multiplier = Math.max(0, multiplier);
						var width = canvas.clientWidth * multiplier | 0;
						var height = canvas.clientHeight * multiplier | 0;
						if (canvas.width !== width || canvas.height !== height) {
							canvas.width = width;
							canvas.height = height;
							return true;
						}
						return false;
					}
				}),
				"./src/typedarrays.js": ((__unused_webpack_module, exports$11) => {
					exports$11.__esModule = true;
					exports$11.getGLTypeForTypedArray = getGLTypeForTypedArray;
					exports$11.getGLTypeForTypedArrayType = getGLTypeForTypedArrayType;
					exports$11.getTypedArrayTypeForGLType = getTypedArrayTypeForGLType;
					exports$11.isArrayBuffer = void 0;
					var BYTE = 5120;
					var UNSIGNED_BYTE = 5121;
					var SHORT = 5122;
					var UNSIGNED_SHORT = 5123;
					var INT = 5124;
					var UNSIGNED_INT = 5125;
					var FLOAT = 5126;
					var UNSIGNED_SHORT_4_4_4_4 = 32819;
					var UNSIGNED_SHORT_5_5_5_1 = 32820;
					var UNSIGNED_SHORT_5_6_5 = 33635;
					var HALF_FLOAT = 5131;
					var UNSIGNED_INT_2_10_10_10_REV = 33640;
					var UNSIGNED_INT_10F_11F_11F_REV = 35899;
					var UNSIGNED_INT_5_9_9_9_REV = 35902;
					var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
					var UNSIGNED_INT_24_8 = 34042;
					var glTypeToTypedArray = {};
					var tt = glTypeToTypedArray;
					tt[BYTE] = Int8Array;
					tt[UNSIGNED_BYTE] = Uint8Array;
					tt[SHORT] = Int16Array;
					tt[UNSIGNED_SHORT] = Uint16Array;
					tt[INT] = Int32Array;
					tt[UNSIGNED_INT] = Uint32Array;
					tt[FLOAT] = Float32Array;
					tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
					tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
					tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
					tt[HALF_FLOAT] = Uint16Array;
					tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
					tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
					tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
					tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
					tt[UNSIGNED_INT_24_8] = Uint32Array;
					/**
					* Get the GL type for a typedArray
					* @param {ArrayBufferView} typedArray a typedArray
					* @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
					*   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
					* @memberOf module:twgl/typedArray
					*/
					function getGLTypeForTypedArray(typedArray) {
						if (typedArray instanceof Int8Array) return BYTE;
						if (typedArray instanceof Uint8Array) return UNSIGNED_BYTE;
						if (typedArray instanceof Uint8ClampedArray) return UNSIGNED_BYTE;
						if (typedArray instanceof Int16Array) return SHORT;
						if (typedArray instanceof Uint16Array) return UNSIGNED_SHORT;
						if (typedArray instanceof Int32Array) return INT;
						if (typedArray instanceof Uint32Array) return UNSIGNED_INT;
						if (typedArray instanceof Float32Array) return FLOAT;
						throw new Error("unsupported typed array type");
					}
					/**
					* Get the GL type for a typedArray type
					* @param {ArrayBufferView} typedArrayType a typedArray constructor
					* @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
					*   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
					* @memberOf module:twgl/typedArray
					*/
					function getGLTypeForTypedArrayType(typedArrayType) {
						if (typedArrayType === Int8Array) return BYTE;
						if (typedArrayType === Uint8Array) return UNSIGNED_BYTE;
						if (typedArrayType === Uint8ClampedArray) return UNSIGNED_BYTE;
						if (typedArrayType === Int16Array) return SHORT;
						if (typedArrayType === Uint16Array) return UNSIGNED_SHORT;
						if (typedArrayType === Int32Array) return INT;
						if (typedArrayType === Uint32Array) return UNSIGNED_INT;
						if (typedArrayType === Float32Array) return FLOAT;
						throw new Error("unsupported typed array type");
					}
					/**
					* Get the typed array constructor for a given GL type
					* @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
					* @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
					* @memberOf module:twgl/typedArray
					*/
					function getTypedArrayTypeForGLType(type) {
						var CTOR = glTypeToTypedArray[type];
						if (!CTOR) throw new Error("unknown gl type");
						return CTOR;
					}
					exports$11.isArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
						return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
					} : function isArrayBuffer(a) {
						return a && a.buffer && a.buffer instanceof ArrayBuffer;
					};
				}),
				"./src/utils.js": ((__unused_webpack_module, exports$12) => {
					exports$12.__esModule = true;
					exports$12.glEnumToString = void 0;
					exports$12.isWebGL1 = isWebGL1;
					exports$12.isWebGL2 = isWebGL2;
					/**
					* Gets the gl version as a number
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @return {number} version of gl
					* @private
					*/
					/**
					* Check if context is WebGL 2.0
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @return {bool} true if it's WebGL 2.0
					* @memberOf module:twgl
					*/
					function isWebGL2(gl) {
						return !!gl.texStorage2D;
					}
					/**
					* Check if context is WebGL 1.0
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @return {bool} true if it's WebGL 1.0
					* @memberOf module:twgl
					*/
					function isWebGL1(gl) {
						return !gl.texStorage2D;
					}
					exports$12.glEnumToString = function() {
						var haveEnumsForType = {};
						var enums = {};
						function addEnums(gl) {
							var type = gl.constructor.name;
							if (!haveEnumsForType[type]) {
								for (var key in gl) if (typeof gl[key] === "number") {
									var existing = enums[gl[key]];
									enums[gl[key]] = existing ? "".concat(existing, " | ").concat(key) : key;
								}
								haveEnumsForType[type] = true;
							}
						}
						return function glEnumToString(gl, value) {
							addEnums(gl);
							return enums[value] || (typeof value === "number" ? "0x".concat(value.toString(16)) : value);
						};
					}();
				}),
				"./src/v3.js": ((__unused_webpack_module, exports$13) => {
					exports$13.__esModule = true;
					exports$13.add = add;
					exports$13.copy = copy;
					exports$13.create = create;
					exports$13.cross = cross;
					exports$13.distance = distance;
					exports$13.distanceSq = distanceSq;
					exports$13.divScalar = divScalar;
					exports$13.divide = divide;
					exports$13.dot = dot;
					exports$13.length = length;
					exports$13.lengthSq = lengthSq;
					exports$13.lerp = lerp;
					exports$13.lerpV = lerpV;
					exports$13.max = max;
					exports$13.min = min;
					exports$13.mulScalar = mulScalar;
					exports$13.multiply = multiply;
					exports$13.negate = negate;
					exports$13.normalize = normalize;
					exports$13.setDefaultType = setDefaultType;
					exports$13.subtract = subtract;
					/**
					*
					* Vec3 math math functions.
					*
					* Almost all functions take an optional `dst` argument. If it is not passed in the
					* functions will create a new Vec3. In other words you can do this
					*
					*     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
					*
					* or
					*
					*     var v = v3.create();
					*     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
					*
					* The first style is often easier but depending on where it's used it generates garbage where
					* as there is almost never allocation with the second style.
					*
					* It is always save to pass any vector as the destination. So for example
					*
					*     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
					*
					* @module twgl/v3
					*/
					var VecType = Float32Array;
					/**
					* A JavaScript array with 3 values or a Float32Array with 3 values.
					* When created by the library will create the default type which is `Float32Array`
					* but can be set by calling {@link module:twgl/v3.setDefaultType}.
					* @typedef {(number[]|Float32Array)} Vec3
					* @memberOf module:twgl/v3
					*/
					/**
					* Sets the type this library creates for a Vec3
					* @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
					* @return {constructor} previous constructor for Vec3
					* @memberOf module:twgl/v3
					*/
					function setDefaultType(ctor) {
						var oldType = VecType;
						VecType = ctor;
						return oldType;
					}
					/**
					* Creates a vec3; may be called with x, y, z to set initial values.
					* @param {number} [x] Initial x value.
					* @param {number} [y] Initial y value.
					* @param {number} [z] Initial z value.
					* @return {module:twgl/v3.Vec3} the created vector
					* @memberOf module:twgl/v3
					*/
					function create(x, y, z) {
						var dst = new VecType(3);
						if (x) dst[0] = x;
						if (y) dst[1] = y;
						if (z) dst[2] = z;
						return dst;
					}
					/**
					* Adds two vectors; assumes a and b have the same dimension.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
					* @memberOf module:twgl/v3
					*/
					function add(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] + b[0];
						dst[1] = a[1] + b[1];
						dst[2] = a[2] + b[2];
						return dst;
					}
					/**
					* Subtracts two vectors.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
					* @memberOf module:twgl/v3
					*/
					function subtract(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] - b[0];
						dst[1] = a[1] - b[1];
						dst[2] = a[2] - b[2];
						return dst;
					}
					/**
					* Performs linear interpolation on two vectors.
					* Given vectors a and b and interpolation coefficient t, returns
					* a + t * (b - a).
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {number} t Interpolation coefficient.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The linear interpolated result.
					* @memberOf module:twgl/v3
					*/
					function lerp(a, b, t, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] + t * (b[0] - a[0]);
						dst[1] = a[1] + t * (b[1] - a[1]);
						dst[2] = a[2] + t * (b[2] - a[2]);
						return dst;
					}
					/**
					* Performs linear interpolation on two vectors.
					* Given vectors a and b and interpolation coefficient vector t, returns
					* a + t * (b - a).
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} the linear interpolated result.
					* @memberOf module:twgl/v3
					*/
					function lerpV(a, b, t, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] + t[0] * (b[0] - a[0]);
						dst[1] = a[1] + t[1] * (b[1] - a[1]);
						dst[2] = a[2] + t[2] * (b[2] - a[2]);
						return dst;
					}
					/**
					* Return max values of two vectors.
					* Given vectors a and b returns
					* [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The max components vector.
					* @memberOf module:twgl/v3
					*/
					function max(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = Math.max(a[0], b[0]);
						dst[1] = Math.max(a[1], b[1]);
						dst[2] = Math.max(a[2], b[2]);
						return dst;
					}
					/**
					* Return min values of two vectors.
					* Given vectors a and b returns
					* [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The min components vector.
					* @memberOf module:twgl/v3
					*/
					function min(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = Math.min(a[0], b[0]);
						dst[1] = Math.min(a[1], b[1]);
						dst[2] = Math.min(a[2], b[2]);
						return dst;
					}
					/**
					* Multiplies a vector by a scalar.
					* @param {module:twgl/v3.Vec3} v The vector.
					* @param {number} k The scalar.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The scaled vector.
					* @memberOf module:twgl/v3
					*/
					function mulScalar(v, k, dst) {
						dst = dst || new VecType(3);
						dst[0] = v[0] * k;
						dst[1] = v[1] * k;
						dst[2] = v[2] * k;
						return dst;
					}
					/**
					* Divides a vector by a scalar.
					* @param {module:twgl/v3.Vec3} v The vector.
					* @param {number} k The scalar.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The scaled vector.
					* @memberOf module:twgl/v3
					*/
					function divScalar(v, k, dst) {
						dst = dst || new VecType(3);
						dst[0] = v[0] / k;
						dst[1] = v[1] / k;
						dst[2] = v[2] / k;
						return dst;
					}
					/**
					* Computes the cross product of two vectors; assumes both vectors have
					* three entries.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The vector of a cross b.
					* @memberOf module:twgl/v3
					*/
					function cross(a, b, dst) {
						dst = dst || new VecType(3);
						var t1 = a[2] * b[0] - a[0] * b[2];
						var t2 = a[0] * b[1] - a[1] * b[0];
						dst[0] = a[1] * b[2] - a[2] * b[1];
						dst[1] = t1;
						dst[2] = t2;
						return dst;
					}
					/**
					* Computes the dot product of two vectors; assumes both vectors have
					* three entries.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @return {number} dot product
					* @memberOf module:twgl/v3
					*/
					function dot(a, b) {
						return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
					}
					/**
					* Computes the length of vector
					* @param {module:twgl/v3.Vec3} v vector.
					* @return {number} length of vector.
					* @memberOf module:twgl/v3
					*/
					function length(v) {
						return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
					}
					/**
					* Computes the square of the length of vector
					* @param {module:twgl/v3.Vec3} v vector.
					* @return {number} square of the length of vector.
					* @memberOf module:twgl/v3
					*/
					function lengthSq(v) {
						return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
					}
					/**
					* Computes the distance between 2 points
					* @param {module:twgl/v3.Vec3} a vector.
					* @param {module:twgl/v3.Vec3} b vector.
					* @return {number} distance between a and b
					* @memberOf module:twgl/v3
					*/
					function distance(a, b) {
						var dx = a[0] - b[0];
						var dy = a[1] - b[1];
						var dz = a[2] - b[2];
						return Math.sqrt(dx * dx + dy * dy + dz * dz);
					}
					/**
					* Computes the square of the distance between 2 points
					* @param {module:twgl/v3.Vec3} a vector.
					* @param {module:twgl/v3.Vec3} b vector.
					* @return {number} square of the distance between a and b
					* @memberOf module:twgl/v3
					*/
					function distanceSq(a, b) {
						var dx = a[0] - b[0];
						var dy = a[1] - b[1];
						var dz = a[2] - b[2];
						return dx * dx + dy * dy + dz * dz;
					}
					/**
					* Divides a vector by its Euclidean length and returns the quotient.
					* @param {module:twgl/v3.Vec3} a The vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The normalized vector.
					* @memberOf module:twgl/v3
					*/
					function normalize(a, dst) {
						dst = dst || new VecType(3);
						var lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
						var len = Math.sqrt(lenSq);
						if (len > 1e-5) {
							dst[0] = a[0] / len;
							dst[1] = a[1] / len;
							dst[2] = a[2] / len;
						} else {
							dst[0] = 0;
							dst[1] = 0;
							dst[2] = 0;
						}
						return dst;
					}
					/**
					* Negates a vector.
					* @param {module:twgl/v3.Vec3} v The vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} -v.
					* @memberOf module:twgl/v3
					*/
					function negate(v, dst) {
						dst = dst || new VecType(3);
						dst[0] = -v[0];
						dst[1] = -v[1];
						dst[2] = -v[2];
						return dst;
					}
					/**
					* Copies a vector.
					* @param {module:twgl/v3.Vec3} v The vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} A copy of v.
					* @memberOf module:twgl/v3
					*/
					function copy(v, dst) {
						dst = dst || new VecType(3);
						dst[0] = v[0];
						dst[1] = v[1];
						dst[2] = v[2];
						return dst;
					}
					/**
					* Multiplies a vector by another vector (component-wise); assumes a and
					* b have the same length.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The vector of products of entries of a and
					*     b.
					* @memberOf module:twgl/v3
					*/
					function multiply(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] * b[0];
						dst[1] = a[1] * b[1];
						dst[2] = a[2] * b[2];
						return dst;
					}
					/**
					* Divides a vector by another vector (component-wise); assumes a and
					* b have the same length.
					* @param {module:twgl/v3.Vec3} a Operand vector.
					* @param {module:twgl/v3.Vec3} b Operand vector.
					* @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
					* @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
					*     b.
					* @memberOf module:twgl/v3
					*/
					function divide(a, b, dst) {
						dst = dst || new VecType(3);
						dst[0] = a[0] / b[0];
						dst[1] = a[1] / b[1];
						dst[2] = a[2] / b[2];
						return dst;
					}
				}),
				"./src/vertex-arrays.js": ((__unused_webpack_module, exports$14, __webpack_require__) => {
					function _typeof(o) {
						"@babel/helpers - typeof";
						return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
							return typeof o;
						} : function(o) {
							return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
						}, _typeof(o);
					}
					exports$14.__esModule = true;
					exports$14.createVAOAndSetAttributes = createVAOAndSetAttributes;
					exports$14.createVAOFromBufferInfo = createVAOFromBufferInfo;
					exports$14.createVertexArrayInfo = createVertexArrayInfo;
					var programs = _interopRequireWildcard(__webpack_require__(
						/*! ./programs.js */
						"./src/programs.js"
					));
					function _getRequireWildcardCache(e) {
						if ("function" != typeof WeakMap) return null;
						var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
						return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
							return e ? t : r;
						})(e);
					}
					function _interopRequireWildcard(e, r) {
						if (!r && e && e.__esModule) return e;
						if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e };
						var t = _getRequireWildcardCache(r);
						if (t && t.has(e)) return t.get(e);
						var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
						for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
							var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
							i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
						}
						return n["default"] = e, t && t.set(e, n), n;
					}
					/**
					* vertex array object related functions
					*
					* You should generally not need to use these functions. They are provided
					* for those cases where you're doing something out of the ordinary
					* and you need lower level access.
					*
					* For backward compatibility they are available at both `twgl.attributes` and `twgl`
					* itself
					*
					* See {@link module:twgl} for core functions
					*
					* @module twgl/vertexArrays
					*/
					var ELEMENT_ARRAY_BUFFER = 34963;
					/**
					* @typedef {Object} VertexArrayInfo
					* @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
					* @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
					* @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
					* @memberOf module:twgl
					*/
					/**
					* Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
					*
					* This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
					* {@link module:twgl:drawBufferInfo}.
					*
					* > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
					*   assign buffers to specific attributes at creation time. That means they can only be used with programs
					*   who's attributes use the same attribute locations for the same purposes.
					*
					* > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
					*   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
					*
					* also
					*
					* > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
					*   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
					*   will affect the Vertex Array Object state.
					*
					* > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
					*
					* @param {WebGLRenderingContext} gl A WebGLRenderingContext
					* @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
					* @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
					*
					*    You need to make sure every attribute that will be used is bound. So for example assume shader 1
					*    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
					*    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
					*    now attribute D's location.
					*
					*    So, you can pass in both shader 1 and shader 2's programInfo
					*
					* @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
					*
					* @memberOf module:twgl/vertexArrays
					*/
					function createVertexArrayInfo(gl, programInfos, bufferInfo) {
						var vao = gl.createVertexArray();
						gl.bindVertexArray(vao);
						if (!programInfos.length) programInfos = [programInfos];
						programInfos.forEach(function(programInfo) {
							programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
						});
						gl.bindVertexArray(null);
						return {
							numElements: bufferInfo.numElements,
							elementType: bufferInfo.elementType,
							vertexArrayObject: vao
						};
					}
					/**
					* Creates a vertex array object and then sets the attributes on it
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
					* @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
					* @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
					* @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
					*
					* @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
					*
					* @memberOf module:twgl/vertexArrays
					*/
					function createVAOAndSetAttributes(gl, setters, attribs, indices) {
						var vao = gl.createVertexArray();
						gl.bindVertexArray(vao);
						programs.setAttributes(setters, attribs);
						if (indices) gl.bindBuffer(ELEMENT_ARRAY_BUFFER, indices);
						gl.bindVertexArray(null);
						return vao;
					}
					/**
					* Creates a vertex array object and then sets the attributes
					* on it
					*
					* @param {WebGLRenderingContext} gl The WebGLRenderingContext
					*        to use.
					* @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
					* @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
					* @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
					*
					* @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
					*
					* @memberOf module:twgl/vertexArrays
					*/
					function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
						return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
					}
				})
			};
			var __webpack_module_cache__ = {};
			function __webpack_require__(moduleId) {
				var cachedModule = __webpack_module_cache__[moduleId];
				if (cachedModule !== void 0) return cachedModule.exports;
				var module$1 = __webpack_module_cache__[moduleId] = { exports: {} };
				__webpack_modules__[moduleId](module$1, module$1.exports, __webpack_require__);
				return module$1.exports;
			}
			return __webpack_require__("./src/twgl-full.js");
		})();
	});
})))();
function isWebGL2Context(gl) {
	return typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext || typeof gl.texStorage2D === "function";
}
function detectGLContextCapabilities(gl) {
	const isWebGL2 = isWebGL2Context(gl);
	return Object.freeze({
		isWebGL2,
		supportsFloatTexture: isWebGL2 || gl.getExtension("OES_texture_float") !== null,
		supportsFloatColorBuffer: isWebGL2 ? gl.getExtension("EXT_color_buffer_float") !== null : gl.getExtension("WEBGL_color_buffer_float") !== null,
		supportsFloatTextureLinear: gl.getExtension("OES_texture_float_linear") !== null
	});
}
//#endregion
//#region src/fbo/FramebufferAttachmentSupport.ts
function resolveFramebufferAttachmentOptions(gl, capabilities, options) {
	if (!isFloatFramebufferAttachment(gl, options)) return { ...options };
	const nextOptions = { ...options };
	if (capabilities.isWebGL2 && nextOptions.internalFormat === void 0 && (nextOptions.format === void 0 || nextOptions.format === gl.RGBA)) nextOptions.internalFormat = gl.RGBA32F;
	if (nextOptions.min === void 0 && nextOptions.mag === void 0 && nextOptions.minMag === void 0) {
		nextOptions.min = gl.NEAREST;
		nextOptions.mag = gl.NEAREST;
	}
	if (nextOptions.wrap === void 0 && nextOptions.wrapS === void 0 && nextOptions.wrapT === void 0) {
		nextOptions.wrapS = gl.CLAMP_TO_EDGE;
		nextOptions.wrapT = gl.CLAMP_TO_EDGE;
	}
	return nextOptions;
}
function assertFramebufferAttachmentSupport(gl, capabilities, options) {
	if (!isFloatFramebufferAttachment(gl, options)) return;
	if (!capabilities.supportsFloatTexture) throw new Error("OES_texture_float not supported");
	if (!capabilities.supportsFloatColorBuffer) throw new Error(capabilities.isWebGL2 ? "EXT_color_buffer_float not supported" : "WEBGL_color_buffer_float not supported");
	if (usesLinearFiltering(gl, options) && !capabilities.supportsFloatTextureLinear) throw new Error("OES_texture_float_linear not supported");
}
function isFloatFramebufferAttachment(gl, options) {
	return options.attachment === void 0 && options.type === gl.FLOAT && options.samples === void 0;
}
function usesLinearFiltering(gl, options) {
	return isLinearFilter(gl, options.min) || isLinearFilter(gl, options.mag) || isLinearFilter(gl, options.minMag);
}
function isLinearFilter(gl, filter) {
	return filter === gl.LINEAR || filter === gl.LINEAR_MIPMAP_NEAREST || filter === gl.NEAREST_MIPMAP_LINEAR || filter === gl.LINEAR_MIPMAP_LINEAR;
}
//#endregion
//#region src/fbo/FBO.ts
/**
* Wrapper around a WebGL framebuffer and its color attachment texture.
*/
var FBO = class {
	constructor(gl, capabilities, width, height, texture) {
		this.gl = gl;
		this.capabilities = capabilities;
		this.width = width;
		this.height = height;
		this.texture = texture;
		this.framebufferInfo = this.create(width, height);
	}
	create(width, height) {
		const attachmentOptions = this.getAttachmentOptions();
		this.ensureAttachmentSupport(attachmentOptions);
		const framebufferInfo = (0, import_twgl_full.createFramebufferInfo)(this.gl, [attachmentOptions], width, height);
		this.assertFramebufferComplete(framebufferInfo);
		this.clear(framebufferInfo);
		this.texture.setHandle(framebufferInfo.attachments[0]);
		this.texture.generateMipmap(this.gl, width, height);
		return framebufferInfo;
	}
	get info() {
		return this.framebufferInfo;
	}
	bind() {
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, this.framebufferInfo);
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
		const attachmentOptions = this.getAttachmentOptions();
		this.ensureAttachmentSupport(attachmentOptions);
		(0, import_twgl_full.resizeFramebufferInfo)(this.gl, this.framebufferInfo, [attachmentOptions], width, height);
		this.assertFramebufferComplete(this.framebufferInfo);
		this.texture.setHandle(this.framebufferInfo.attachments[0]);
		this.clear();
		this.texture.generateMipmap(this.gl, width, height);
	}
	clear(framebufferInfo = this.framebufferInfo) {
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, framebufferInfo);
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, null);
	}
	getAttachmentOptions() {
		return this.texture.getFramebufferAttachmentOptions(this.gl);
	}
	ensureAttachmentSupport(attachmentOptions) {
		assertFramebufferAttachmentSupport(this.gl, this.capabilities, attachmentOptions);
	}
	assertFramebufferComplete(framebufferInfo) {
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, framebufferInfo);
		const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, null);
		if (status !== this.gl.FRAMEBUFFER_COMPLETE) throw new Error(`FBO incomplete: 0x${status.toString(16)}`);
	}
};
//#endregion
//#region src/texture/TextureParameters.ts
function getTextureFramebufferAttachmentOptions(gl, capabilities, options) {
	const { auto, generateMipmaps, mag, magFilter, min, minFilter, minMag, wrap, wrapS, wrapT, ...rest } = options;
	const resolvedMag = resolveTextureFilter(gl, mag ?? magFilter);
	const resolvedMin = resolveTextureFilter(gl, min ?? minFilter);
	const resolvedMinMag = resolveTextureFilter(gl, minMag);
	const resolvedWrap = resolveTextureWrap(gl, wrap);
	const resolvedWrapS = resolveTextureWrap(gl, wrapS);
	const resolvedWrapT = resolveTextureWrap(gl, wrapT);
	const shouldDefaultToFloatType = rest.type === void 0 && rest.attachment === void 0 && rest.internalFormat === void 0 && (rest.format === void 0 || rest.format === gl.RGBA);
	return resolveFramebufferAttachmentOptions(gl, capabilities, {
		...rest,
		auto: auto ?? generateMipmaps,
		...shouldDefaultToFloatType && { type: gl.FLOAT },
		...resolvedMag !== void 0 && { mag: resolvedMag },
		...resolvedMin !== void 0 && { min: resolvedMin },
		...resolvedMinMag !== void 0 && { minMag: resolvedMinMag },
		...resolvedWrap !== void 0 && { wrap: resolvedWrap },
		...resolvedWrapS !== void 0 && { wrapS: resolvedWrapS },
		...resolvedWrapT !== void 0 && { wrapT: resolvedWrapT }
	});
}
function shouldUpdateTextureFiltering(options) {
	return (options.auto ?? options.generateMipmaps) === true;
}
function resolveTextureFilter(gl, filter) {
	if (filter === void 0) return void 0;
	if (typeof filter === "number") return filter;
	return {
		"nearest": gl.NEAREST,
		"linear": gl.LINEAR,
		"nearest-mipmap-nearest": gl.NEAREST_MIPMAP_NEAREST,
		"linear-mipmap-nearest": gl.LINEAR_MIPMAP_NEAREST,
		"nearest-mipmap-linear": gl.NEAREST_MIPMAP_LINEAR,
		"linear-mipmap-linear": gl.LINEAR_MIPMAP_LINEAR
	}[filter] ?? gl.LINEAR;
}
function resolveTextureWrap(gl, wrap) {
	if (wrap === void 0) return void 0;
	if (typeof wrap === "number") return wrap;
	return {
		"repeat": gl.REPEAT,
		"mirrored-repeat": gl.MIRRORED_REPEAT,
		"clamp-to-edge": gl.CLAMP_TO_EDGE
	}[wrap] ?? gl.CLAMP_TO_EDGE;
}
//#endregion
//#region src/texture/Texture.ts
/**
* Minimal named wrapper around a WebGL texture handle.
* Used internally for pass outputs and texture bindings.
*/
var Texture = class {
	constructor(name, options = {}, handle, capabilities) {
		this.name = name;
		this.capabilities = capabilities;
		this.options = Object.freeze({ ...options });
		this.handleValue = handle;
	}
	get handle() {
		return this.handleValue;
	}
	applyParameters(gl) {
		if (!this.handleValue) return;
		(0, import_twgl_full.setTextureParameters)(gl, this.handleValue, this.getFramebufferAttachmentOptions(gl));
	}
	generateMipmap(gl, width, height) {
		if (!this.handleValue || !shouldUpdateTextureFiltering(this.options)) return false;
		const options = this.getFramebufferAttachmentOptions(gl);
		(0, import_twgl_full.setTextureFilteringForSize)(gl, this.handleValue, options, width, height, options.internalFormat ?? options.format ?? gl.RGBA);
		return true;
	}
	getFramebufferAttachmentOptions(gl) {
		return getTextureFramebufferAttachmentOptions(gl, this.getCapabilities(gl), this.options);
	}
	setHandle(handle) {
		this.handleValue = handle;
		return this;
	}
	getCapabilities(gl) {
		if (!this.capabilities) this.capabilities = detectGLContextCapabilities(gl);
		return this.capabilities;
	}
};
//#endregion
//#region src/pass/Pass.ts
/**
* Represents a render pass in the WebGL pipeline.
*/
var Pass = class {
	constructor(gl, capabilities, shader, geometry, width, height, offscreen = true, textures = [], pingPong = false, textureOptions = {}) {
		this.gl = gl;
		this.shader = shader;
		this.bufferInfo = geometry;
		this.width = width;
		this.height = height;
		this.offscreen = offscreen;
		this.pingPong = offscreen && pingPong;
		this.textures = textures;
		this.fbos = [];
		this.readBufferIndex = 0;
		if (this.offscreen) {
			const framebufferCount = this.pingPong ? 2 : 1;
			for (let index = 0; index < framebufferCount; index++) this.fbos.push(new FBO(gl, capabilities, width, height, new Texture(shader.passName, textureOptions, void 0, capabilities)));
		}
	}
	get fbo() {
		return this.readFBO;
	}
	get texture() {
		return this.readFBO?.texture;
	}
	use() {
		this.shader.use();
		if (this.offscreen && this.writeFBO) this.writeFBO.bind();
		else {
			(0, import_twgl_full.bindFramebufferInfo)(this.gl, null);
			this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		}
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
		if (this.offscreen) this.fbos.forEach((fbo) => fbo.resize(width, height));
	}
	draw() {
		(0, import_twgl_full.setBuffersAndAttributes)(this.gl, this.shader.programInfo, this.bufferInfo);
		(0, import_twgl_full.drawBufferInfo)(this.gl, this.bufferInfo);
		if (this.pingPong) this.swap();
		this.texture?.generateMipmap(this.gl, this.width, this.height);
	}
	clear() {
		this.readBufferIndex = 0;
		this.fbos.forEach((fbo) => fbo.clear());
	}
	get readFBO() {
		return this.fbos[this.readBufferIndex] ?? null;
	}
	get writeFBO() {
		if (!this.offscreen) return null;
		if (!this.pingPong) return this.readFBO;
		return this.fbos[(this.readBufferIndex + 1) % this.fbos.length] ?? null;
	}
	swap() {
		this.readBufferIndex = (this.readBufferIndex + 1) % this.fbos.length;
	}
};
//#endregion
//#region src/pipeline/graph/KahnPipelineSorter.ts
var KahnPipelineSorter = class {
	sort(registry) {
		const entries = registry.getAll();
		const graph = this.buildGraph(entries, registry);
		return this.topoSort(entries, graph, registry);
	}
	buildGraph(entries, registry) {
		const inDegree = /* @__PURE__ */ new Map();
		const adjacency = /* @__PURE__ */ new Map();
		for (const entry of entries) {
			inDegree.set(entry.name, 0);
			adjacency.set(entry.name, []);
		}
		for (const entry of entries) for (const dep of entry.dependencies) {
			if (!registry.has(dep)) throw new Error(`Pass "${entry.name}" depends on "${dep}", which is not registered`);
			adjacency.get(dep).push(entry.name);
			inDegree.set(entry.name, inDegree.get(entry.name) + 1);
		}
		return {
			inDegree,
			adjacency
		};
	}
	topoSort(entries, { inDegree, adjacency }, registry) {
		const queue = entries.filter((entry) => inDegree.get(entry.name) === 0).map((entry) => entry.name);
		const ordered = [];
		while (queue.length > 0) {
			const name = queue.shift();
			const entry = registry.get(name);
			if (entry === void 0) throw new Error(`Internal error: pass "${name}" is referenced in the graph but missing from the registry`);
			ordered.push(entry.pass);
			for (const dependent of adjacency.get(name) ?? []) {
				const nextDegree = inDegree.get(dependent) - 1;
				inDegree.set(dependent, nextDegree);
				if (nextDegree === 0) queue.push(dependent);
			}
		}
		if (ordered.length !== entries.length) {
			const cyclic = entries.map((entry) => entry.name).filter((name) => (inDegree.get(name) ?? 0) > 0);
			throw new Error(`Pipeline contains a cyclic dependency among: ${cyclic.join(", ")}`);
		}
		return ordered;
	}
};
//#endregion
//#region src/pipeline/graph/PipelineGraph.ts
var PipelineGraph = class {
	constructor() {
		this.entries = /* @__PURE__ */ new Map();
	}
	add(entry) {
		if (this.entries.has(entry.name)) throw new Error(`Pass "${entry.name}" is already registered`);
		this.entries.set(entry.name, {
			...entry,
			dependencies: [...entry.dependencies]
		});
	}
	clear() {
		this.entries.clear();
	}
	get(name) {
		const entry = this.entries.get(name);
		if (entry === void 0) return void 0;
		return {
			...entry,
			dependencies: [...entry.dependencies]
		};
	}
	getAll() {
		return [...this.entries.values()];
	}
	has(name) {
		return this.entries.has(name);
	}
};
//#endregion
//#region src/pipeline/Pipeline.ts
/**
* Orchestrates pass storage and dependency resolution for the render graph
*/
var Pipeline = class {
	constructor(registry = new PipelineGraph(), sorter = new KahnPipelineSorter()) {
		this.registry = registry;
		this.sorter = sorter;
		this.orderedPasses = [];
		this.dirty = false;
	}
	add(name, pass, dependencies = []) {
		const sanitizedDependencies = dependencies.filter((dependency) => {
			if (dependency !== name) return true;
			if (pass.pingPong) return false;
			throw new Error(`Pass "${name}" samples itself and requires pingPong to read the previous frame`);
		});
		this.registry.add({
			name,
			pass,
			dependencies: sanitizedDependencies
		});
		this.dirty = true;
	}
	clear() {
		this.registry.clear();
		this.orderedPasses = [];
		this.dirty = false;
	}
	resize(width, height) {
		this.forEach((pass) => {
			pass.resize(width, height);
		});
	}
	forEach(callback) {
		for (const pass of this.getOrderedPasses()) callback(pass);
	}
	get(name) {
		return this.registry.get(name)?.pass;
	}
	toArray() {
		return [...this.getOrderedPasses()];
	}
	getOrderedPasses() {
		if (this.dirty) {
			this.orderedPasses = this.sorter.sort(this.registry);
			this.dirty = false;
		}
		return this.orderedPasses;
	}
};
//#endregion
//#region src/pipeline/PipelineCompiler.ts
var PipelineCompiler = class {
	compile(config) {
		if (config.passes.length === 0) return { passes: [] };
		const plannedPasses = config.passes.map((passConfig) => this.planPassConfig(passConfig));
		const canvasPassName = this.resolveCanvasPassName(plannedPasses);
		return { passes: plannedPasses.map((passConfig) => this.resolveRenderTarget(passConfig, canvasPassName)) };
	}
	planPassConfig(passConfig) {
		const textures = [...passConfig.textures];
		return {
			...passConfig,
			textures,
			dependencies: [...new Set(textures.filter((textureName) => textureName !== "" && textureName !== passConfig.name))],
			pingPong: textures.includes(passConfig.name) || Boolean(passConfig.pingPong)
		};
	}
	resolveCanvasPassName(passConfigs) {
		const passConfigsByName = new Map(passConfigs.map((passConfig) => [passConfig.name, passConfig]));
		const declarationIndexByName = new Map(passConfigs.map((passConfig, index) => [passConfig.name, index]));
		const dependentsByName = new Map(passConfigs.map((passConfig) => [passConfig.name, []]));
		for (const passConfig of passConfigs) for (const dependency of passConfig.dependencies) {
			const dependents = dependentsByName.get(dependency);
			if (!dependents || !passConfigsByName.has(dependency)) throw new Error(`Pass "${passConfig.name}" depends on "${dependency}", which is not registered`);
			dependents.push(passConfig.name);
		}
		const canvasPasses = passConfigs.filter((passConfig) => (dependentsByName.get(passConfig.name)?.length ?? 0) === 0).map((passConfig) => passConfig.name);
		if (canvasPasses.length === 0) throw new Error("Pipeline must contain at least one terminal pass that can be presented to the canvas.");
		if (canvasPasses.length === 1) return canvasPasses[0];
		const upstreamMemo = /* @__PURE__ */ new Map();
		const depthMemo = /* @__PURE__ */ new Map();
		return canvasPasses.map((name) => ({
			name,
			score: this.scoreCanvasPass(name, declarationIndexByName.get(name), passConfigsByName, upstreamMemo, depthMemo)
		})).sort((left, right) => this.compareCanvasPassScore(right.score, left.score))[0].name;
	}
	resolveRenderTarget(passConfig, canvasPassName) {
		const presentToCanvas = passConfig.name === canvasPassName;
		const offscreen = !presentToCanvas || passConfig.pingPong;
		return {
			...passConfig,
			offscreen,
			presentToCanvas
		};
	}
	scoreCanvasPass(passName, declarationIndex, passConfigsByName, upstreamMemo, depthMemo) {
		return {
			upstreamCount: this.collectUpstreamPasses(passName, passConfigsByName, /* @__PURE__ */ new Set(), upstreamMemo).size,
			depth: this.computeDependencyDepth(passName, passConfigsByName, /* @__PURE__ */ new Set(), depthMemo),
			declarationIndex
		};
	}
	collectUpstreamPasses(passName, passConfigsByName, visiting, memo) {
		const memoized = memo.get(passName);
		if (memoized) return memoized;
		const passConfig = passConfigsByName.get(passName);
		if (!passConfig) throw new Error(`Pass "${passName}" is not registered`);
		if (visiting.has(passName)) throw new Error(`Pipeline contains a cyclic dependency involving "${passName}"`);
		visiting.add(passName);
		const upstreamPasses = /* @__PURE__ */ new Set();
		for (const dependency of passConfig.dependencies) {
			upstreamPasses.add(dependency);
			for (const ancestor of this.collectUpstreamPasses(dependency, passConfigsByName, visiting, memo)) upstreamPasses.add(ancestor);
		}
		visiting.delete(passName);
		memo.set(passName, upstreamPasses);
		return upstreamPasses;
	}
	computeDependencyDepth(passName, passConfigsByName, visiting, memo) {
		const memoized = memo.get(passName);
		if (memoized !== void 0) return memoized;
		const passConfig = passConfigsByName.get(passName);
		if (!passConfig) throw new Error(`Pass "${passName}" is not registered`);
		if (visiting.has(passName)) throw new Error(`Pipeline contains a cyclic dependency involving "${passName}"`);
		visiting.add(passName);
		let depth = 0;
		for (const dependency of passConfig.dependencies) depth = Math.max(depth, 1 + this.computeDependencyDepth(dependency, passConfigsByName, visiting, memo));
		visiting.delete(passName);
		memo.set(passName, depth);
		return depth;
	}
	compareCanvasPassScore(left, right) {
		if (left.upstreamCount !== right.upstreamCount) return left.upstreamCount - right.upstreamCount;
		if (left.depth !== right.depth) return left.depth - right.depth;
		return left.declarationIndex - right.declarationIndex;
	}
};
//#endregion
//#region src/shader/Shader.ts
const ERROR_LOG_REGEX = /ERROR: 0:(\d+): (.*)(?=\n|$)/;
const GLSL_300_ES_REGEX = /^\s*#version\s+300\s+es\b/m;
const DEFAULT_VERTEX_SHADER_GLSL100 = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }`;
const DEFAULT_VERTEX_SHADER_GLSL300ES = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}`;
/**
* Compiles and manages a WebGL shader program using twgl.js.
* Responsible for compiling, linking, and providing access to uniforms and attributes.
*/
var Shader = class {
	constructor(gl, capabilities, vertexSource, fragmentSource, onError, passName) {
		this.capabilities = capabilities;
		this.gl = gl;
		this.onError = onError;
		this.passName = passName;
		const sources = [vertexSource || this.defaultVertexShader(fragmentSource), fragmentSource];
		const programInfo = (0, import_twgl_full.createProgramInfo)(this.gl, sources, (msg) => {
			const coords = this.extractErrorCoords(msg);
			this.onError({
				passName: this.passName,
				coords
			});
		});
		if (!programInfo) throw new Error(`Failed to create program for pass ${passName}`);
		this.programInfo = programInfo;
	}
	extractErrorCoords(log) {
		const match = ERROR_LOG_REGEX.exec(log);
		if (match) return {
			line: Number.parseInt(match[1], 10),
			message: match[2]
		};
		return {
			line: 0,
			message: log
		};
	}
	use() {
		this.gl.useProgram(this.programInfo.program);
	}
	setUniforms(uniforms) {
		(0, import_twgl_full.setUniforms)(this.programInfo, uniforms);
	}
	getAttribLocation(name) {
		return this.gl.getAttribLocation(this.programInfo.program, name);
	}
	defaultVertexShader(fragmentSource) {
		if (GLSL_300_ES_REGEX.test(fragmentSource)) {
			if (!this.capabilities.isWebGL2) throw new Error(`Pass "${this.passName}" requires WebGL2 for GLSL ES 3.00 shaders`);
			return DEFAULT_VERTEX_SHADER_GLSL300ES;
		}
		return DEFAULT_VERTEX_SHADER_GLSL100;
	}
};
//#endregion
//#region src/types/uniform.ts
function isStaticUniformProvider(provider) {
	return typeof provider.resolve !== "function";
}
//#endregion
//#region src/uniform/UniformManager.ts
const DATE_UNIFORM_PROVIDER = {
	id: "uniform:date",
	resolve: (context) => ({ u_date: context.date })
};
const FRAME_UNIFORM_PROVIDER = {
	id: "uniform:frame",
	resolve: (context) => ({
		u_frame: context.frame,
		u_frameRate: context.frameRate,
		u_time: context.time,
		u_timeDelta: context.timeDelta
	})
};
const RESOLUTION_UNIFORM_PROVIDER = {
	id: "uniform:resolution",
	resolve: (context) => ({ u_resolution: context.resolution })
};
const MOUSE_UNIFORM_PROVIDER = {
	id: "uniform:mouse",
	resolve: (context) => ({ u_mouse: context.mouse })
};
const TEXTURE_UNIFORM_PROVIDER = {
	id: "uniform:textures",
	resolve: ({ textures }) => {
		if (textures.length === 0) return;
		return textures.reduce((uniforms, texture, index) => {
			uniforms[`u_texture${index}`] = texture?.handle ?? null;
			return uniforms;
		}, {});
	}
};
/**
* Resolves shader uniforms through a composable provider pipeline.
* Later providers override earlier values, which keeps the default set extensible.
*/
var UniformManager = class UniformManager {
	constructor(runtimeStateProvider = UniformManager.createDefaultRuntimeSnapshot, providers = UniformManager.createDefaultProviders()) {
		this.providers = /* @__PURE__ */ new Map();
		this.runtimeStateProvider = runtimeStateProvider;
		providers.forEach((provider) => this.registerProvider(provider));
	}
	static createDefaultProviders() {
		return [
			DATE_UNIFORM_PROVIDER,
			FRAME_UNIFORM_PROVIDER,
			RESOLUTION_UNIFORM_PROVIDER,
			MOUSE_UNIFORM_PROVIDER,
			TEXTURE_UNIFORM_PROVIDER
		];
	}
	static createDefaultRuntimeSnapshot() {
		return {
			now: /* @__PURE__ */ new Date(0),
			frame: 0,
			frameRate: 0,
			mouse: [0, 0],
			time: 0,
			timeDelta: 0
		};
	}
	registerProvider(provider) {
		const id = provider.id.trim();
		if (!id) throw new Error("Uniform provider id must not be empty");
		if (typeof provider.resolve !== "function") throw new TypeError(`Uniform provider "${id}" must define a resolve function`);
		if (this.providers.has(id)) throw new Error(`Uniform provider "${id}" is already registered`);
		this.providers.set(id, {
			...provider,
			id
		});
	}
	unregisterProvider(id) {
		return this.providers.delete(id.trim());
	}
	resolve(request) {
		const context = this.createContext(request);
		const uniforms = {};
		for (const provider of this.providers.values()) {
			const resolvedUniforms = this.resolveProvider(provider, context);
			if (!resolvedUniforms) continue;
			Object.assign(uniforms, resolvedUniforms);
		}
		return uniforms;
	}
	resolveProvider(provider, context) {
		try {
			const resolvedUniforms = provider.resolve(context);
			if (resolvedUniforms === void 0) return;
			if (!this.isUniformMap(resolvedUniforms)) throw new Error("Uniform provider must return an object map or undefined");
			return resolvedUniforms;
		} catch (error) {
			throw new Error(`Failed to resolve uniforms for provider "${provider.id}" on ${context.target} "${context.passName}": ${this.toErrorMessage(error)}`);
		}
	}
	isUniformMap(value) {
		return value !== null && !Array.isArray(value) && typeof value === "object";
	}
	createContext(request) {
		const runtimeState = this.getRuntimeState();
		const passName = request.passName.trim();
		if (!passName) throw new Error("Uniform request passName must not be empty");
		if (!this.isTarget(request.target)) throw new Error(`Uniform request target "${String(request.target)}" is invalid`);
		return {
			target: request.target,
			passName,
			date: this.toDateUniformValue(runtimeState.now),
			frame: runtimeState.frame,
			frameRate: runtimeState.frameRate,
			mouse: this.clonePair(runtimeState.mouse, "runtime mouse"),
			resolution: this.clonePair(request.resolution, "uniform resolution"),
			textures: [...request.textures ?? []],
			time: runtimeState.time,
			timeDelta: runtimeState.timeDelta
		};
	}
	getRuntimeState() {
		const runtimeState = this.runtimeStateProvider();
		if (!this.isRuntimeState(runtimeState)) throw new Error("Uniform runtime state provider returned an invalid state object");
		return runtimeState;
	}
	isRuntimeState(value) {
		if (value === null || typeof value !== "object") return false;
		const runtimeState = value;
		return runtimeState.now instanceof Date && this.isNumber(runtimeState.frame) && this.isNumber(runtimeState.frameRate) && this.isPair(runtimeState.mouse) && this.isNumber(runtimeState.time) && this.isNumber(runtimeState.timeDelta);
	}
	isTarget(value) {
		return value === "pass" || value === "present";
	}
	isPair(value) {
		return Array.isArray(value) && value.length === 2 && this.isNumber(value[0]) && this.isNumber(value[1]);
	}
	isNumber(value) {
		return typeof value === "number" && Number.isFinite(value);
	}
	clonePair(value, label) {
		if (!this.isPair(value)) throw new Error(`${label} must be a pair of finite numbers`);
		return [value[0], value[1]];
	}
	toDateUniformValue(now) {
		return [
			now.getFullYear(),
			now.getMonth() + 1,
			now.getDate(),
			now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1e3
		];
	}
	toErrorMessage(error) {
		if (error instanceof Error) return error.message;
		return String(error);
	}
};
//#endregion
//#region src/engine/ScreenTriangle.ts
const triangleCache = /* @__PURE__ */ new WeakMap();
/**
* Provides a cached full-screen triangle (Screen Triangle) BufferInfo.
*
* Uses a single large triangle instead of a two-triangle quad for full-screen passes.
* This improves cache coherency by maintaining spatial locality during rasterization,
* avoiding the cache invalidation that occurs when switching between quad triangles.
*
* Vertices are at (-1, -1), (-1, 3), (3, -1) in clip space, covering the viewport
* after clipping.
*
* @see {@link https://michaldrobot.com/2014/04/01/gcn-execution-patterns-in-full-screen-passes/}
*/
function getScreenTriangle(gl) {
	let bufferInfo = triangleCache.get(gl);
	if (!bufferInfo) {
		bufferInfo = (0, import_twgl_full.createBufferInfoFromArrays)(gl, { a_position: {
			numComponents: 2,
			data: new Float32Array([
				-1,
				-1,
				-1,
				3,
				3,
				-1
			])
		} });
		triangleCache.set(gl, bufferInfo);
	}
	return bufferInfo;
}
//#endregion
//#region src/engine/RendererCore.ts
/**
* Host-agnostic WebGL renderer core: GL context, passes, uniforms, loop.
*
* Deliberately free of DOM APIs (`window`, `document`, listeners, rAF) so it
* can run inside a worker against an `OffscreenCanvas`. Hosts own the
* surrounding concerns and feed the core explicitly:
* - viewport size via {@link setDisplaySize}
* - pointer position via {@link setPointer} (device pixels, Y-up)
* - frame scheduling via the injected {@link FrameDriver}
*/
var RendererCore = class RendererCore {
	static {
		this.presentFragmentShader = `
    precision highp float;
    uniform sampler2D u_texture0;
    uniform vec2 u_resolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      gl_FragColor = texture2D(u_texture0, uv);
    }
  `;
	}
	constructor(options) {
		this.frameScheduled = false;
		this.thumbnailScratchFramebuffer = null;
		this.thumbnailScratchTexture = null;
		this.thumbnailScratchWidth = 0;
		this.thumbnailScratchHeight = 0;
		this.canvas = options.canvas;
		this.frameDriver = options.frameDriver ?? timerFrameDriver();
		this.gl = this.initializeWebGLContext(options.canvas);
		this.capabilities = detectGLContextCapabilities(this.gl);
		this.pipeline = new Pipeline();
		this.passConfigs = /* @__PURE__ */ new Map();
		this.textureMap = /* @__PURE__ */ new Map();
		this.now = /* @__PURE__ */ new Date();
		this.compiler = new PipelineCompiler();
		this.screenTriangle = getScreenTriangle(this.gl);
		this.uniformManager = new UniformManager(() => ({
			now: this.now,
			frame: this.currentFrame,
			frameRate: this.frameRate,
			mouse: [this.mouseX, this.mouseY],
			time: this.currentTime,
			timeDelta: this.timeDelta
		}));
		this.onError = options.onError || (({ passName, coords }) => {
			console.error(`[Actis] Error in pass "${passName}" at line ${coords.line}: ${coords.message}`);
		});
		this.presentShader = new Shader(this.gl, this.capabilities, void 0, RendererCore.presentFragmentShader, () => {}, "__actis_present__");
		this.mouseX = 0;
		this.mouseY = 0;
		this.time = 0;
		this.timeDelta = 0;
		this.realToCSSPixels = options.pixelRatio ?? 1;
		this.paused = false;
		this.playbackTime = 0;
		this.lastTime = 0;
		this.frameRate = 0;
		this.currentFrame = 0;
		this.currentTime = 0;
		this.startTime = 0;
		this.pausedAt = 0;
		this.boundRender = (time) => this.render(time);
	}
	initializeWebGLContext(canvas) {
		const opts = {
			alpha: false,
			depth: false,
			stencil: false,
			premultipliedAlpha: false,
			antialias: false,
			preserveDrawingBuffer: true,
			powerPreference: "high-performance"
		};
		const legacy = canvas;
		const gl = canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts) || legacy.getContext("experimental-webgl2", opts) || legacy.getContext("experimental-webgl", opts);
		if (!gl) throw new Error("WebGL not supported");
		return gl;
	}
	/**
	* Pointer position in device pixels, Y-up relative to the drawing buffer.
	* Hosts compute this from DOM events; the core performs no layout reads.
	*/
	setPointer(x, y) {
		this.mouseX = x;
		this.mouseY = y;
	}
	setPixelRatio(ratio) {
		if (Number.isFinite(ratio) && ratio > 0) this.realToCSSPixels = ratio;
	}
	/**
	* Explicit drawing-buffer size. Replaces the implicit
	* `clientWidth`-based resize, which `OffscreenCanvas` cannot provide.
	*/
	setDisplaySize(width, height) {
		const w = Math.max(1, Math.floor(width));
		const h = Math.max(1, Math.floor(height));
		if (this.canvas.width === w && this.canvas.height === h) return;
		this.canvas.width = w;
		this.canvas.height = h;
		this.pipeline.resize(w, h);
		this.syncPassTextures();
	}
	addPass(pass) {
		this.pipeline.add(pass.shader.passName, pass);
	}
	getPass(name) {
		return this.pipeline.get(name);
	}
	getPasses() {
		return this.pipeline.toArray();
	}
	forEachPass(callback) {
		this.pipeline.forEach(callback);
	}
	getPassNames() {
		return this.pipeline.toArray().map((pass) => pass.shader.passName);
	}
	/**
	* Capture downscaled raw pixels of a pass output. Hosts encode these for
	* display (2D canvas on the main thread, `ImageBitmap` in a worker).
	* Returns null when unavailable. Never throws.
	*/
	capturePassPixels(name, maxSize = 64) {
		try {
			const pass = this.pipeline.get(name);
			const srcInfo = pass?.fbo?.info;
			const srcFramebuffer = srcInfo?.framebuffer;
			const srcWidth = pass?.width ?? 0;
			const srcHeight = pass?.height ?? 0;
			if (!pass || !srcInfo || !srcFramebuffer || !srcWidth || !srcHeight) return null;
			const scale = Math.min(1, maxSize / Math.max(srcWidth, srcHeight));
			const thumbWidth = Math.max(1, Math.round(srcWidth * scale));
			const thumbHeight = Math.max(1, Math.round(srcHeight * scale));
			const gl2 = this.gl;
			if (!!gl2 && typeof gl2.blitFramebuffer === "function" && this.capabilities.isWebGL2) return this.capturePassViaBlit(gl2, srcFramebuffer, srcWidth, srcHeight, thumbWidth, thumbHeight);
			return this.capturePassViaFullRead(srcInfo, srcWidth, srcHeight, thumbWidth, thumbHeight);
		} catch {
			return null;
		}
	}
	capturePassViaBlit(gl2, srcFramebuffer, srcWidth, srcHeight, thumbWidth, thumbHeight) {
		const gl = this.gl;
		this.ensureThumbnailScratch(thumbWidth, thumbHeight);
		if (!this.thumbnailScratchFramebuffer) return null;
		gl2.bindFramebuffer(gl2.READ_FRAMEBUFFER, srcFramebuffer);
		gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, this.thumbnailScratchFramebuffer);
		gl2.blitFramebuffer(0, 0, srcWidth, srcHeight, 0, 0, thumbWidth, thumbHeight, gl2.COLOR_BUFFER_BIT, gl2.LINEAR);
		gl2.bindFramebuffer(gl2.READ_FRAMEBUFFER, this.thumbnailScratchFramebuffer);
		gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, null);
		const pixels = new Uint8Array(thumbWidth * thumbHeight * 4);
		gl.readPixels(0, 0, thumbWidth, thumbHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
		(0, import_twgl_full.bindFramebufferInfo)(gl, null);
		return {
			data: pixels,
			width: thumbWidth,
			height: thumbHeight
		};
	}
	capturePassViaFullRead(srcInfo, srcWidth, srcHeight, thumbWidth, thumbHeight) {
		const gl = this.gl;
		(0, import_twgl_full.bindFramebufferInfo)(gl, srcInfo);
		const pixels = new Uint8Array(srcWidth * srcHeight * 4);
		gl.readPixels(0, 0, srcWidth, srcHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
		(0, import_twgl_full.bindFramebufferInfo)(gl, null);
		const thumb = new Uint8Array(thumbWidth * thumbHeight * 4);
		const xRatio = srcWidth / thumbWidth;
		const yRatio = srcHeight / thumbHeight;
		for (let y = 0; y < thumbHeight; y++) {
			const srcY = Math.min(srcHeight - 1, Math.floor(y * yRatio));
			for (let x = 0; x < thumbWidth; x++) {
				const srcX = Math.min(srcWidth - 1, Math.floor(x * xRatio));
				const s = (srcY * srcWidth + srcX) * 4;
				const d = (y * thumbWidth + x) * 4;
				thumb[d] = pixels[s] ?? 0;
				thumb[d + 1] = pixels[s + 1] ?? 0;
				thumb[d + 2] = pixels[s + 2] ?? 0;
				thumb[d + 3] = 255;
			}
		}
		return {
			data: thumb,
			width: thumbWidth,
			height: thumbHeight
		};
	}
	ensureThumbnailScratch(width, height) {
		const gl = this.gl;
		if (this.thumbnailScratchFramebuffer && this.thumbnailScratchWidth === width && this.thumbnailScratchHeight === height) return;
		this.disposeThumbnailScratch();
		const texture = gl.createTexture();
		if (!texture) return;
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		const framebuffer = gl.createFramebuffer();
		if (!framebuffer) {
			gl.deleteTexture(texture);
			return;
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.thumbnailScratchTexture = texture;
		this.thumbnailScratchFramebuffer = framebuffer;
		this.thumbnailScratchWidth = width;
		this.thumbnailScratchHeight = height;
	}
	disposeThumbnailScratch() {
		const gl = this.gl;
		if (this.thumbnailScratchFramebuffer) {
			gl.deleteFramebuffer(this.thumbnailScratchFramebuffer);
			this.thumbnailScratchFramebuffer = null;
		}
		if (this.thumbnailScratchTexture) {
			gl.deleteTexture(this.thumbnailScratchTexture);
			this.thumbnailScratchTexture = null;
		}
		this.thumbnailScratchWidth = 0;
		this.thumbnailScratchHeight = 0;
	}
	getMetrics() {
		return {
			paused: this.paused,
			time: this.currentTime,
			frameRate: this.frameRate,
			width: this.canvas.width,
			height: this.canvas.height
		};
	}
	getContextState() {
		return Object.freeze({
			capabilities: this.capabilities,
			webglVersion: this.capabilities.isWebGL2 ? 2 : 1
		});
	}
	clear() {
		this.resetPlaybackState();
		this.pipeline.forEach((pass) => pass.clear());
		this.syncPassTextures();
		this.clearCanvas();
		if (this.getPasses().length > 0) this.renderFrame();
	}
	registerUniformProvider(provider) {
		if (isStaticUniformProvider(provider)) {
			const { id, values } = provider;
			this.uniformManager.registerProvider({
				id,
				resolve: () => values
			});
			return;
		}
		this.uniformManager.registerProvider(provider);
	}
	unregisterUniformProvider(providerId) {
		return this.uniformManager.unregisterProvider(providerId);
	}
	updateTime(currentTime) {
		this.now = /* @__PURE__ */ new Date();
		if (this.paused) {
			this.timeDelta = 0;
			this.frameRate = 0;
			return;
		}
		const t = currentTime ?? (typeof performance !== "undefined" ? performance.now() : Date.now());
		const hasStarted = this.startTime !== 0;
		if (this.startTime === 0) this.startTime = t;
		if (this.pausedAt !== 0) {
			if (hasStarted) this.startTime += t - this.pausedAt;
			this.pausedAt = 0;
			this.lastTime = t;
			this.timeDelta = 0;
		} else if (this.lastTime === 0) {
			this.lastTime = t;
			this.timeDelta = 0;
		} else {
			this.timeDelta = (t - this.lastTime) / 1e3;
			this.lastTime = t;
		}
		this.currentTime = (t - this.startTime) / 1e3;
		this.time = this.currentTime;
		this.playbackTime = this.currentTime;
		this.frameRate = this.timeDelta > 0 ? 1 / this.timeDelta : 0;
		this.currentFrame++;
	}
	render(currentTime) {
		this.frameScheduled = false;
		this.renderFrame(currentTime);
		if (!this.paused) {
			this.frameScheduled = true;
			this.frameDriver.request(this.boundRender);
		}
	}
	setup(config) {
		this.cancelScheduledFrame();
		this.pipeline.clear();
		this.passConfigs.clear();
		this.textureMap.clear();
		this.resetPlaybackState();
		this.clearCanvas();
		const displayWidth = this.canvas.width;
		const displayHeight = this.canvas.height;
		let pipelinePlan;
		try {
			pipelinePlan = this.compiler.compile(config);
		} catch (error) {
			console.error(`[Actis] Failed to compile pipeline: ${error.message}`);
			return;
		}
		let setupFailed = false;
		pipelinePlan.passes.forEach((passConfig) => {
			try {
				const shader = new Shader(this.gl, this.capabilities, passConfig.vertexShader, passConfig.fragmentShader, this.onError, passConfig.name);
				const pass = new Pass(this.gl, this.capabilities, shader, this.screenTriangle, displayWidth, displayHeight, passConfig.offscreen, [], passConfig.pingPong, passConfig.texture);
				this.pipeline.add(passConfig.name, pass, passConfig.dependencies);
				this.passConfigs.set(passConfig.name, passConfig);
				if (pass.texture) this.textureMap.set(passConfig.name, pass.texture);
			} catch (error) {
				setupFailed = true;
				console.error(`Error in pass ${passConfig.name}: ${error.message}`);
			}
		});
		if (setupFailed) {
			this.pipeline.clear();
			this.passConfigs.clear();
			this.textureMap.clear();
			this.clearCanvas();
			return;
		}
		this.syncPassTextures();
	}
	play() {
		if (this.frameScheduled) {
			this.paused = false;
			return;
		}
		this.paused = false;
		this.frameScheduled = true;
		this.frameDriver.request(this.boundRender);
	}
	resume() {
		this.play();
	}
	pause() {
		if (this.paused) return;
		this.paused = true;
		this.pausedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
		this.cancelScheduledFrame();
	}
	reset() {
		this.clear();
	}
	/**
	* Release loop scheduling and GL scratch resources. Passes keep their GL
	* objects; hosts owning the context decide its lifetime.
	*/
	dispose() {
		this.cancelScheduledFrame();
		this.disposeThumbnailScratch();
	}
	renderFrame(currentTime) {
		this.updateTime(currentTime);
		let presentedTexture;
		this.pipeline.forEach((pass) => {
			this.syncPassTexturesForPass(pass);
			pass.use();
			const uniforms = this.uniformManager.resolve({
				target: "pass",
				passName: pass.shader.passName,
				resolution: [pass.width, pass.height],
				textures: this.getTextureBindings(pass.textures)
			});
			pass.shader.setUniforms(uniforms);
			pass.draw();
			this.updateTextureMapForPass(pass);
			if (this.passConfigs.get(pass.shader.passName)?.presentToCanvas) presentedTexture = pass.texture;
		});
		if (presentedTexture) this.presentTexture(presentedTexture);
	}
	syncPassTextures() {
		this.textureMap.clear();
		this.pipeline.forEach((pass) => {
			this.updateTextureMapForPass(pass);
		});
		this.pipeline.forEach((pass) => {
			this.syncPassTexturesForPass(pass);
		});
	}
	syncPassTexturesForPass(pass) {
		const passName = pass.shader.passName;
		const passConfig = this.passConfigs.get(passName);
		if (!passConfig) return;
		pass.textures = passConfig.textures.map((textureName) => {
			const texture = this.textureMap.get(textureName);
			if (!texture) {
				console.warn(`Texture ${textureName} not found for pass ${passName}`);
				return;
			}
			return texture;
		});
	}
	updateTextureMapForPass(pass) {
		const texture = pass.texture;
		if (!texture) return;
		this.textureMap.set(pass.shader.passName, texture);
	}
	presentTexture(texture) {
		if (!texture.handle) return;
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, null);
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.presentShader.use();
		(0, import_twgl_full.setBuffersAndAttributes)(this.gl, this.presentShader.programInfo, this.screenTriangle);
		const uniforms = this.uniformManager.resolve({
			target: "present",
			passName: this.presentShader.passName,
			resolution: [this.gl.canvas.width, this.gl.canvas.height],
			textures: this.getTextureBindings([texture])
		});
		this.presentShader.setUniforms(uniforms);
		(0, import_twgl_full.drawBufferInfo)(this.gl, this.screenTriangle);
	}
	getTextureBindings(textures) {
		const slotCount = Math.max(4, textures.length);
		return Array.from({ length: slotCount }, (_, index) => textures[index]);
	}
	cancelScheduledFrame() {
		this.frameScheduled = false;
		this.frameDriver.cancel();
	}
	clearCanvas() {
		(0, import_twgl_full.bindFramebufferInfo)(this.gl, null);
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
	resetPlaybackState() {
		this.now = /* @__PURE__ */ new Date();
		this.time = 0;
		this.timeDelta = 0;
		this.playbackTime = 0;
		this.lastTime = 0;
		this.frameRate = 0;
		this.currentFrame = 0;
		this.currentTime = 0;
		this.startTime = 0;
		this.pausedAt = 0;
	}
};
//#endregion
//#region src/worker/protocol.ts
/** Increment on breaking protocol changes; handshake rejects mismatches. */
const WORKER_PROTOCOL_VERSION = 1;
//#endregion
//#region src/worker/worker-entry.ts
const METRICS_PUSH_INTERVAL_MS = 500;
const scope = globalThis;
let core = null;
let metricsTimer = null;
function post(event, transfer) {
	scope.postMessage(event, transfer);
}
function postMetrics() {
	if (core) post({
		type: "metrics",
		metrics: core.getMetrics()
	});
}
function postPasses() {
	if (core) post({
		type: "passes",
		names: core.getPassNames()
	});
}
function startMetricsPush() {
	stopMetricsPush();
	if (typeof setInterval === "undefined") return;
	metricsTimer = setInterval(postMetrics, METRICS_PUSH_INTERVAL_MS);
}
function stopMetricsPush() {
	if (metricsTimer !== null && typeof clearInterval !== "undefined") clearInterval(metricsTimer);
	metricsTimer = null;
}
function fail(reason) {
	post({
		type: "fatal",
		reason
	});
	stopMetricsPush();
	core?.dispose();
	core = null;
}
function handleInit(command) {
	if (command.version !== 1) {
		fail(`version-mismatch: worker=1 host=${command.version}`);
		return;
	}
	try {
		core = new RendererCore({
			canvas: command.canvas,
			pixelRatio: command.pixelRatio,
			frameDriver: timerFrameDriver(),
			onError: (details) => post({
				type: "error",
				details
			})
		});
		core.setDisplaySize(command.width, command.height);
		const contextState = core.getContextState();
		post({
			type: "context",
			capabilities: { ...contextState.capabilities },
			webglVersion: contextState.webglVersion
		});
		startMetricsPush();
		postMetrics();
	} catch (error) {
		fail(`webgl-unavailable: ${error?.message ?? "unknown"}`);
	}
}
function handleCapture(id, name, maxSize) {
	if (!core) return;
	const pixels = core.capturePassPixels(name, maxSize);
	if (!pixels) {
		post({
			type: "capture-result",
			id,
			name,
			maxSize,
			data: null,
			width: 0,
			height: 0
		});
		return;
	}
	post({
		type: "capture-result",
		id,
		name,
		maxSize,
		data: pixels.data.buffer,
		width: pixels.width,
		height: pixels.height
	}, [pixels.data.buffer]);
}
scope.onmessage = (event) => {
	const command = event.data;
	if (!command || typeof command !== "object") return;
	if (command.type === "init") {
		handleInit(command);
		return;
	}
	if (!core) return;
	switch (command.type) {
		case "setup":
			core.setup(command.config);
			postPasses();
			postMetrics();
			break;
		case "play":
			core.play();
			postMetrics();
			break;
		case "pause":
			core.pause();
			postMetrics();
			break;
		case "resume":
			core.resume();
			postMetrics();
			break;
		case "clear":
			core.clear();
			postMetrics();
			break;
		case "reset":
			core.reset();
			postMetrics();
			break;
		case "resize":
			core.setPixelRatio(command.pixelRatio);
			core.setDisplaySize(command.width, command.height);
			postMetrics();
			break;
		case "pointer":
			core.setPointer(command.x, command.y);
			break;
		case "register-provider":
			core.registerUniformProvider(command.provider);
			break;
		case "unregister-provider":
			core.unregisterUniformProvider(command.id);
			break;
		case "capture":
			handleCapture(command.id, command.name, command.maxSize);
			break;
		case "dispose":
			stopMetricsPush();
			core.dispose();
			core = null;
			scope.close();
			break;
	}
};
post({
	type: "ready",
	version: 1
});
//#endregion
export { WORKER_PROTOCOL_VERSION };
