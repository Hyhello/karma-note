var utils = (function (exports, ResizeObserver) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);

	/**
	 * @return void
	 * @example
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	function noop() {}

	/**
	 * 判断是否是中文
	 * @param str
	 * @returns
	 * isChinese('你好'); => true
	 */
	function isChinese(str) {
	  return /^[\u4E00-\u9FA5]+$/.test(str);
	}

	/* eslint-disable @typescript-eslint/ban-ts-comment */
	const reg = /-/g;
	/**
	 * 格式化日期
	 * @param date
	 * @param fmt
	 * @returns
	 * @example
	 * formateDate(new Date()) => 2021-12-07 15:42:36
	 */

	function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
	  if (date == null) return date; // 解决ios下面-无法被new Date问题

	  if (typeof date === 'string' && reg.test(date)) {
	    date = date.replace(reg, '/');
	  }

	  if (!(date instanceof Date)) {
	    date = new Date(date);
	  }

	  const o = {
	    'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds(),
	    'q+': Math.floor((date.getMonth() + 3) / 3) // 季度

	  }; // 格式化年

	  if (/(y+)/.test(fmt)) {
	    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
	  } // 格式化毫秒


	  if (/(S+)/.test(fmt)) {
	    const tmp = date.getMilliseconds();
	    fmt = fmt.replace(RegExp.$1, `000${tmp}`.substr(`${tmp}`.length));
	  } // 格式化其它


	  for (const k in o) {
	    if (new RegExp(`(${k})`).test(fmt)) {
	      // @ts-ignore
	      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
	    }
	  }

	  return fmt;
	}

	/**
	 * 是否为闰年
	 * @param year
	 * @returns
	 * @example
	 * isLeapYear(2020); => true;
	 * isLeapYear(2021); => false;
	 */
	function isLeapYear(year) {
	  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	}

	/**
	 * @param arr
	 * @returns
	 * @example
	 * min([1, 2, 3]);  1
	 * min([]) Infinity
	 */
	function min(arr) {
	  return Math.min.apply(null, arr);
	}

	/**
	 * @param arr
	 * @returns
	 * @example
	 * max([1, 2, 3]);  3
	 * max([]) -Infinity
	 */
	function max(arr) {
	  return Math.max.apply(null, arr);
	}

	/**
	 * 获取随机值
	 * @param min 最小值
	 * @param max 最大值
	 * @return 随机值
	 * @example
	 * // 获取1~10之间的随机数
	 * random(1, 10)
	 */
	const random = function (min, max) {
	  const diff = Math.abs(max - min);
	  return Math.random() * diff + Math.min(min, max);
	};

	const nToFixed = Number.prototype.toFixed;
	/**
	 * 重写toFixed，解决后面多余0的问题
	 * @param num
	 * @param fixed
	 * @returns string
	 * @example
	 * toFixed(1, 3); 1 <string>
	 * toFixed(1.2, 3);  1.2 <string>
	 */

	function toFixed(num, fixed) {
	  return nToFixed.call(num, fixed).replace(/\.?0+$/, '');
	}

	/**
	 * 判断数组里面是否存在元素
	 * @param target
	 * @param list
	 * @returns boolean
	 * @example
	 * oneOf('a', ['a', 'b', 'c']); // true
	 */
	const oneOf = (target, list) => {
	  return list.some(item => target === item);
	};

	/**
	 * 根据size 拆分数组
	 * @param input
	 * @param size
	 * @returns // 返回一个新数组
	 * @example
	 * chunk([1, 2, 3, 4], 1); => [[1], [2], [3], [4]]
	 */
	function chunk(input, size) {
	  if (!size) return input.slice();
	  const len = Math.ceil(input.length / size);
	  return Array.from({
	    length: len
	  }, (x, i) => input.slice(i * size, (i + 1) * size));
	}

	/**
	 * 数组去重
	 * @param arr
	 * @returns
	 * @example
	 * unique([1, 2, 3, 5, 5]); => [1, 2, 3, 5]
	 */
	function unique(arr) {
	  return Array.from(new Set(arr));
	}

	const {
	  slice
	} = Array.prototype;
	/**
	 * 类数组转为数组
	 * @param likeArr
	 * @returns
	 * @example
	 * toArray({ 0: 'a', length: 1 }); => ['a']
	 */

	function toArray(likeArr) {
	  return slice.call(likeArr);
	}

	/**
	 * 去除 falsey 的值
	 * @param input
	 * @returns
	 * @example
	 * compact([1, 2, 3, 0, '', false, undefined, null]) => [1, 2, 3]
	 */
	function compact(input) {
	  return input.filter(Boolean);
	}

	/* eslint-disable @typescript-eslint/ban-types */

	/**
	 * get 获取对象/数组里面的值
	 * @param obj
	 * @param path
	 * @param defaultValue
	 * @returns
	 */
	// TODO: 此处类型没有整清晰
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function get(obj, path, defaultValue) {
	  const pathList = !Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path;
	  return pathList.reduce((o, k) => o && o[k], obj) || defaultValue;
	}

	/**
	 * 获取uuid
	 * @returns string
	 * @example
	 * uuid() => cb1e9d5a-7e6b-4b54-c4b5-ed91ad360674
	 */
	function uuid() {
	  let d = new Date().getTime();
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    // eslint-disable-next-line no-bitwise
	    const r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16); // eslint-disable-next-line no-bitwise

	    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
	  });
	}

	const {
	  toString
	} = Object.prototype;
	/**
	 *
	 * @param v
	 * @returns
	 * @example
	 * getType({})  object
	 * getType(true) boolean
	 */

	function getType(v) {
	  return toString.call(v).slice(8, -1).toLowerCase();
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	function isEmpty(val) {
	  if (val == null) return true;

	  switch (getType(val)) {
	    case 'array':
	    case 'string':
	    case 'function':
	    case 'arguments':
	      return !val.length;

	    case 'file':
	    case 'map':
	    case 'size':
	      return !val.size;

	    case 'error':
	      return !val.message;

	    case 'object':
	      // eslint-disable-next-line @typescript-eslint/ban-types
	      return !Object.keys(val).length;
	  }

	  return false;
	}

	/**
	 * 判断是否是一个数组
	 * @param v
	 * @returns
	 * @example
	 * isArray(new Array()); true
	 * isArray([]) true
	 * isArray({}) false
	 */
	function isArray(v) {
	  try {
	    return Array.isArray(v);
	  } catch (e) {
	    return v instanceof Array;
	  }
	}

	/**
	 * 检测是否是字符串
	 * @param input
	 * @returns boolean
	 * @example
	 * isString(null); // false
	 * isString(''); // true
	 */

	function isString(input) {
	  return getType(input) === 'string';
	}

	/**
	 * 前端存储（window.localStorage | window.sessionStorage)
	 * @param name key
	 * @param value value
	 * @param deep // 如果为 true，将采用window.localStorage 存储
	 * @example
	 * setStore('name', '12', true); window.localStorage
	 * setStore('name', '12'); window.sessionStorage
	 */

	function setStore(name, value, deep) {
	  if (!isString(value)) {
	    value = JSON.stringify(value);
	  }

	  if (deep) {
	    window.localStorage.setItem(name, value);
	  } else {
	    window.sessionStorage.setItem(name, value);
	  }
	}

	/**
	 * 前端存储（window.localStorage | window.sessionStorage)
	 * @param name key
	 * @param value value
	 * @param deep // 如果为 true，将采用window.localStorage 存储
	 * @example
	 * getStore('name'); => null
	 */
	function getStore(name, deep) {
	  if (deep) {
	    return window.localStorage.getItem(name);
	  }

	  return window.sessionStorage.getItem(name);
	}

	/**
	 * 检测是否是原生方法
	 * @param ctor
	 * @returns boolean
	 * @example
	 * isNative(Math.abs); // true
	 * isNative(function () {}); // false
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	function isNative(ctor) {
	  return typeof ctor === 'function' && /native code/.test(ctor.toString());
	}

	/**
	 *
	 * @param arg
	 * @returns
	 * @example
	 * isObject({});   true
	 * isObject(null); false
	 */
	function isObject(arg) {
	  return arg !== null && typeof arg === 'object';
	}

	/**
	 * 判断是否是一个数字
	 * @param v
	 * @returns
	 * @example
	 * isNumber(NaN) false
	 * isNumber(1) true
	 * isNumber('1') false
	 */
	function isNumber(v) {
	  return typeof v === 'number' && !Number.isNaN(v) && v !== Infinity;
	}

	/**
	 * 判断是否是个元素
	 * @param el
	 * @returns
	 * @example
	 * isElement(document.createElement('div')); => true;
	 */

	function isElement(el) {
	  return isObject(el) && el.nodeType === 1;
	}

	/**
	 * 判断是否是boolean
	 * @param v
	 * @returns
	 * @example
	 * isBoolean(true) // true
	 * isBoolean(new Boolean()) // true
	 */

	function isBoolean(v) {
	  return getType(v) === 'boolean';
	}

	/**
	 * 判断是否是一个函数
	 * @param input
	 * @returns boolean
	 * @example
	 * isFunction(function () {}); => true
	 * isFunction(true); => false;
	 * isFunction(new Function('a')); => true
	 */
	function isFunction(input) {
	  return typeof input === 'function' && typeof input.nodeType !== 'number';
	}

	/**
	 * 判断是否是promise
	 * @param input
	 * @returns boolean
	 * @example
	 * isPromise(true); => false;
	 * isPromise(new Promise(resolve => resolve)); => true;
	 */

	function isPromise(input) {
	  // isObject(input) || isFunction(input); 初始promise 或者 promise.then返回的
	  return !!input && (isObject(input) || isFunction(input)) && isFunction(input.then);
	}

	/**
	 * 检测n是否是一个整数
	 * @param n
	 * @example
	 * isInteger(1); => true
	 * isInteger('1'); => false
	 * isInteger(Infinity); => false
	 * isInteger(5.000000000000001); => false
	 * isInteger(5.0000000000000001); => true
	 * isInteger(Number.MIN_VALUE); => false
	 */

	function isInteger(n) {
	  try {
	    return Number.isInteger(n);
	  } catch (e) {
	    if (!isNumber(n)) return false;
	    return typeof n === 'number' && Math.floor(n) === n;
	  }
	}

	/**
	 * 移除前端存储（window.localStorage | window.sessionStorage)
	 * @param name
	 * @param deep // 如果为 true，将采用window.localStorage 存储
	 * @example
	 * removeStore('name');
	 */
	function removeStore(name, deep) {
	  if (deep) {
	    window.localStorage.removeItem(name);
	  } else {
	    window.sessionStorage.removeItem(name);
	  }
	}

	/**
	 *
	 * @param v
	 * @returns
	 * isUndefined() true
	 *
	 */
	function isUndefined(v) {
	  return v === undefined || v === null;
	}

	/**
	 * 检测是否原始数据类型（Primitive data types）
	 * @param val
	 * @returns true / false
	 * @example
	 *  console.log(isPrimitive(false));  true
	 *  console.log(isPrimitive(true));   true
	 *  console.log(isPrimitive(null));   true
	 *  console.log(isPrimitive());       true
	 *  console.log(isPrimitive(42));     true
	 *  console.log(isPrimitive('abc'));  true
	 *  console.log(isPrimitive(Symbol())); true
	 *  console.log('--------------------------------------');
	 *  console.log(isPrimitive({}));     false
	 *  console.log(isPrimitive([]));     false
	 *  console.log(isPrimitive(function () {}));  false
	 *  console.log(isPrimitive(new Date()));  false
	 *
	 */
	function isPrimitive(val) {
	  return Object(val) !== val;
	}

	/**
	 * 判断是否是对象
	 * @param v
	 * @returns
	 * @example
	 * isPlainObject({}) // true
	 * isPlainObject([]) // false
	 */

	function isPlainObject(v) {
	  return getType(v) === 'object';
	}

	/**
	 * 服务于sort，用于排序
	 * @param key
	 * @returns
	 * @example
	 * [3, 2, 1].sort(compare()); => [1, 2, 3]
	 * [{ name: 1 }, { name: 3 }, { name: 2 }].sort(compare('name')); => [{ name: 1 }, { name: 2 }, { name: 3 }]
	 */

	function compare(key) {
	  const hasKey = !isUndefined(key);
	  return function (arg1, arg2) {
	    const target1 = hasKey && isObject(arg1) ? arg1[key] : arg1;
	    const target2 = hasKey && isObject(arg2) ? arg2[key] : arg2;
	    if (target1 > target2) return 1;
	    if (target1 < target2) return -1;
	    return 0;
	  };
	}

	/**
	 * 生成长度为n的数组
	 * @param n
	 * @param iteratee
	 * @returns
	 * @example
	 * rangeArr<string>(1, 2) => [2, 2]
	 * rangeArr<function>(1, () => {}) => [() => {}, () => {}]
	 */
	function rangeArr(n, iteratee) {
	  return Array.from({
	    length: n
	  }, () => iteratee);
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */

	/**
	 * 给元素添加监听
	 * @param el
	 * @param type
	 * @param fn
	 */
	function on(el, type, listener) {
	  if (el.addEventListener) {
	    el.addEventListener(type, listener);
	  } else if (el.attachEvent) {
	    el.attachEvent(`on${type}`, listener);
	  } else {
	    el[`on${type}`] = listener;
	  }
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */

	/**
	 * 移除元素监听
	 * @param el
	 * @param type
	 * @param listener
	 */
	function off(el, type, listener) {
	  if (el.removeEventListener) {
	    el.removeEventListener(type, listener, false);
	  } else if (el.detachEvent) {
	    el.detachEvent(`on${type}`, listener);
	  } else {
	    el[`on${type}`] = null;
	  }
	}

	/**
	 * 移除元素监听
	 * @param el
	 * @param type
	 * @param listener
	 */

	function once(el, type, listener) {
	  const cb = (...args) => {
	    // eslint-disable-next-line no-unused-expressions
	    listener && listener.apply(el, args);
	    off(el, type, cb);
	  };

	  on(el, type, cb);
	}

	/**
	 * 获取距离文档顶部的offset
	 * @param el
	 * @returns
	 */
	function offset(el) {
	  const pos = {
	    x: 0,
	    y: 0
	  };

	  while (el) {
	    pos.x += el.offsetLeft || 0;
	    pos.y += el.offsetTop || 0;
	    el = el.offsetParent;
	  }

	  return pos;
	}

	const cubic = value => value ** 3; // 类似于 Math.pow(value, 3);


	const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

	const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16)); // eslint-disable-next-line @typescript-eslint/ban-types


	function scrollTo(el, end = 0, duration = 500) {
	  return new Promise(resolve => {
	    const beginTime = Date.now();
	    const beginValue = el.scrollTop;
	    const diff = beginValue - end;

	    const frameFunc = () => {
	      const progress = (Date.now() - beginTime) / duration;

	      if (progress < 1) {
	        el.scrollTop = beginValue - easeInOutCubic(progress) * diff;
	        rAF(frameFunc);
	      } else {
	        el.scrollTop = end;
	        resolve();
	      }
	    };

	    rAF(frameFunc);
	  });
	}

	/**
	 * 判断元素是否classname
	 * @param el
	 * @param cls
	 * @returns boolean
	 */
	function hasClass(el, cls) {
	  const reg = new RegExp(`\\b${cls}\\b`);
	  return reg.test(el.className);
	}

	const nTrim = String.prototype.trim;
	/**
	 * trim 去除两边空格
	 * @param input
	 * @returns
	 * @example
	 * trim('aa  aaa   ') => aa  aaa
	 */

	function trim(input) {
	  try {
	    return nTrim.call(input);
	  } catch (e) {
	    return input.replace(/^\s*|\s*$/g, '');
	  }
	}

	/**
	 * 给元素添加样式
	 * @param el
	 * @param cls
	 * @returns
	 */

	function addClass(el, cls) {
	  if (hasClass(el, cls)) return;
	  el.className = trim(`${el.className} ${cls}`);
	}

	/**
	 * 是否添加px
	 * @param input
	 * @returns
	 * maybeAddPx('auto'); => 'auto'
	 * maybeAddPx('100%'); => '100%'
	 * maybeAddPx('100'); => '100px'
	 */
	function maybeAddPx(input) {
	  return Number.isNaN(+input) ? String(input) : `${input}px`;
	}

	/**
	 * 移除样式classname
	 * @param el
	 * @param cls
	 * @returns
	 */

	function removeClass(el, cls) {
	  if (!hasClass(el, cls)) return;
	  const reg = new RegExp(`\\b${cls}\\b`);
	  el.className = el.className.replace(reg, '').split(/\s+/).join(' ');
	}

	/**
	 * toggle class
	 * @param el
	 * @param cls
	 */

	function toggleClass(el, cls) {
	  if (hasClass(el, cls)) {
	    removeClass(el, cls);
	  } else {
	    addClass(el, cls);
	  }
	}

	/* eslint-disable @typescript-eslint/ban-ts-comment */

	const resizeHandler = function (entries) {
	  for (const entry of entries) {
	    const listeners = entry.target.__resizeListeners__ || [];

	    if (listeners.length) {
	      // @ts-ignore
	      listeners.forEach(fn => {
	        fn();
	      });
	    }
	  }
	}; // eslint-disable-next-line @typescript-eslint/ban-types


	function addResizeListener(el, listener) {
	  if (!el.__resizeListeners__) {
	    el.__resizeListeners__ = [];
	    el.__ro__ = new ResizeObserver__default["default"](resizeHandler);

	    el.__ro__.observe(el);
	  }

	  el.__resizeListeners__.push(listener);
	}

	function removeResizeListener(el, listener) {
	  if (!el || !el.__resizeListeners__) return;

	  el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(listener), 1);

	  if (!el.__resizeListeners__.length) {
	    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
	    el.__ro__.disconnect();
	  }
	}

	/**
	 * ltrim 去除左侧空格
	 * @param input
	 * @returns
	 * @example
	 * ltrim('aa  aaa   ') => aa  aaa
	 */
	function ltrim(input) {
	  return input.replace(/^\s*/g, '');
	}

	/**
	 * rtrim 去除右侧空格
	 * @param input
	 * @returns
	 * @example
	 * rtrim('aa  aaa   ') => aa  aaa
	 */
	function rtrim(input) {
	  return input.replace(/\s*$/g, '');
	}

	/**
	 * 拆分
	 * @param val
	 * @param index
	 * @param separated
	 * @returns
	 * @example
	 * split('aaaa'); => a,aaa
	 * split(1000); => 1,000
	 */
	function split(val, index = 3, separated = ',') {
	  if (!val) return String(val);
	  const reg = new RegExp(`\\B(?=(?:\\w{${index}})+\\b)`, 'g');
	  return String(val).replace(reg, separated);
	}

	/**
	 * 转换待转义URL地址
	 * @param str
	 * @returns
	 * @example
	 * *
	 */
	function parseUrl(url) {
	  const eTagA = document.createElement('a');
	  eTagA.href = window.decodeURIComponent(url);
	  const file = eTagA.pathname.match(/\/([^/?#]+)$/i);
	  return {
	    source: url,
	    protocol: eTagA.protocol.replace(':', ''),
	    host: eTagA.hostname,
	    port: eTagA.port,
	    origin: eTagA.origin,
	    pathname: eTagA.pathname,
	    query: eTagA.search,
	    params: eTagA.search.replace(/^\?/, '').split('&').reduce((obj, item) => {
	      if (item) {
	        const [name, value] = item.split('=');
	        obj[name] = value;
	      }

	      return obj;
	    }, {}),
	    path: eTagA.pathname.replace(/^([^/])/, '/$1'),
	    hash: eTagA.hash.replace('#', ''),
	    file: file ? file[1] : '',
	    relative: eTagA.href.replace(/.*tps?:\/\/[^/]+(.+)/, '$1'),
	    segments: eTagA.pathname.replace(/^\//, '').split('/')
	  };
	}

	/**
	 * 最简单的template，类似于artTemplate，但比它简单
	 * @param str
	 * @param opt
	 * @returns
	 * @example
	 * template('<a href="{url}">{title}</a>', {url: 'http://www.a.com', title: '标题'}); => <a href="http://www.a.com">标题</a>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	function template(str, opt) {
	  return str.replace(/\{(\w+?)\}/gi, function (_, $1) {
	    // eslint-disable-next-line @typescript-eslint/ban-types
	    return opt[$1];
	  });
	}

	/**
	 * 首字母转换为小写
	 * @param str
	 * @returns
	 * @example
	 * uncapitalize('Aaaa'); => aaaa
	 */
	function uncapitalize(str) {
	  return str.charAt(0).toLowerCase() + str.substr(1);
	}

	/**
	 * 字符串转换为驼峰
	 * @param str
	 * @param capital  // 是否大小驼峰
	 * @returns
	 * @example
	 * camelCase('__a-b'); aB
	 * camelCase('__a-b', true); AB
	 * camelCase('__a-  __b', true); AB
	 */

	function camelCase(str, capital) {
	  const reg = /[-_.\W\s]+(\w|$)/g;
	  const n = str.replace(reg, function (_, $1) {
	    return $1.toUpperCase();
	  });
	  return capital ? n : uncapitalize(n);
	}

	/**
	 * 首字母大写
	 * @param str
	 * @returns
	 * @example
	 * capitalize('aaa'); => 'Aaa';
	 */
	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.substr(1);
	}

	/**
	 * 功能类似于 path.resolve
	 * @param basePath
	 * @param args
	 * @returns path
	 * @example
	 * pathResolve('/b', '/ad/bc', './c', './a/dddd'); => '/b/ad/bc/c/a/dddd'
	 * pathResolve('/b', '/ad/bc', '../c'); => '/b/ad/c'
	 */
	function pathResolve(basePath, ...args) {
	  let path = basePath.replace(/\/$/, '').split('/');
	  args.forEach(arg => {
	    const pathList = arg.split('/').filter(o => o && o !== '.');
	    const len = pathList.filter(o => o === '..').length;
	    path = path.slice(0, path.length - len).concat(pathList.slice(len));
	  });
	  return path.join('/');
	}

	/**
	 * 作者：Hyhello
	 * 时间：2019-07-13
	 * 描述：初始化
	 */
	var index = {
	  rtrim,
	  ltrim,
	  trim,
	  random,
	  oneOf,
	  noop,
	  get,
	  on,
	  off,
	  once,
	  min,
	  max,
	  uuid,
	  offset,
	  chunk,
	  split,
	  scrollTo,
	  unique,
	  isEmpty,
	  compare,
	  template,
	  isPromise,
	  getStore,
	  setStore,
	  compact,
	  toFixed,
	  parseUrl,
	  isArray,
	  toArray,
	  addClass,
	  hasClass,
	  rangeArr,
	  getType,
	  isNative,
	  isObject,
	  isNumber,
	  isString,
	  isBoolean,
	  isInteger,
	  isLeapYear,
	  formatDate,
	  isElement,
	  camelCase,
	  isFunction,
	  isChinese,
	  maybeAddPx,
	  pathResolve,
	  removeStore,
	  capitalize,
	  isUndefined,
	  isPrimitive,
	  toggleClass,
	  removeClass,
	  uncapitalize,
	  isPlainObject,
	  addResizeListener,
	  removeResizeListener
	};

	exports.addClass = addClass;
	exports.addResizeListener = addResizeListener;
	exports.camelCase = camelCase;
	exports.capitalize = capitalize;
	exports.chunk = chunk;
	exports.compact = compact;
	exports.compare = compare;
	exports["default"] = index;
	exports.formatDate = formatDate;
	exports.get = get;
	exports.getStore = getStore;
	exports.getType = getType;
	exports.hasClass = hasClass;
	exports.isArray = isArray;
	exports.isBoolean = isBoolean;
	exports.isChinese = isChinese;
	exports.isElement = isElement;
	exports.isEmpty = isEmpty;
	exports.isFunction = isFunction;
	exports.isInteger = isInteger;
	exports.isLeapYear = isLeapYear;
	exports.isNative = isNative;
	exports.isNumber = isNumber;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.isPrimitive = isPrimitive;
	exports.isPromise = isPromise;
	exports.isString = isString;
	exports.isUndefined = isUndefined;
	exports.ltrim = ltrim;
	exports.max = max;
	exports.maybeAddPx = maybeAddPx;
	exports.min = min;
	exports.noop = noop;
	exports.off = off;
	exports.offset = offset;
	exports.on = on;
	exports.once = once;
	exports.oneOf = oneOf;
	exports.parseUrl = parseUrl;
	exports.pathResolve = pathResolve;
	exports.random = random;
	exports.rangeArr = rangeArr;
	exports.removeClass = removeClass;
	exports.removeResizeListener = removeResizeListener;
	exports.removeStore = removeStore;
	exports.rtrim = rtrim;
	exports.scrollTo = scrollTo;
	exports.setStore = setStore;
	exports.split = split;
	exports.template = template;
	exports.toArray = toArray;
	exports.toFixed = toFixed;
	exports.toggleClass = toggleClass;
	exports.trim = trim;
	exports.uncapitalize = uncapitalize;
	exports.unique = unique;
	exports.uuid = uuid;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, ResizeObserver);
