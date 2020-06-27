(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/action.js":
/*!**************************!*\
  !*** ./server/action.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const battle = __webpack_require__(/*! ./code/index */ "./server/code/index.js"); // 玩游戏


const playGame = userAction => battle(userAction);

module.exports = {
  playGame
};

/***/ }),

/***/ "./server/code/directiveLib.js":
/*!*************************************!*\
  !*** ./server/code/directiveLib.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const directiveFactory = (name, dec) => ({
  name,
  dec
});

const map = new Map([[0, directiveFactory('scissor', '剪刀')], [1, directiveFactory('rock', '石头')], [2, directiveFactory('paper', '布')]]);
module.exports = map;

/***/ }),

/***/ "./server/code/index.js":
/*!******************************!*\
  !*** ./server/code/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const directiveLib = __webpack_require__(/*! ./directiveLib */ "./server/code/directiveLib.js");
/**
 * 模拟计算机的出拳
 * @returns {number}
 */


const createComputerAction = () => Math.floor(Math.random() * 3);
/**
 * 对决规则
 * @param {number} user1 用户1出拳
 * @param {number} user2 用户2出拳
 * @returns {string}
 */


const rules = (user1, user2) => {
  if (user1 === user2) {
    return '平';
  } else if (user1 - user2 === 1 || user2 - user1 === directiveLib.size - 1) {
    return '赢';
  }

  return '输';
};
/**
 * 游戏对决
 * @param {number} userAction 用户出拳
 * @returns {object | string}
 */


const battle = userAction => {
  if (directiveLib.has(userAction)) {
    const computerAction = createComputerAction();
    const result = rules(userAction, computerAction);

    const getDec = directive => directiveLib.get(directive).dec;

    const userActionDec = getDec(userAction);
    const computerActionDec = getDec(computerAction);
    return {
      userActionDec,
      computerActionDec,
      result
    };
  } else {
    return '你作弊，不能这么出拳';
  }
};

module.exports = battle;

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const http = __webpack_require__(/*! http */ "http");

const fs = __webpack_require__(/*! fs */ "fs");

const url = __webpack_require__(/*! url */ "url");

const {
  playGame
} = __webpack_require__(/*! ./action */ "./server/action.js"); // 格式化响应报文


const toJson = (success, message, data) => JSON.stringify({
  success,
  message,
  data
}); // 响应静态资源


const responseStaticFile = (res, url = 'index.html') => {
  fs.createReadStream(__dirname + url, 'utf8').pipe(res);
};
/**
 * 生产路由内容
 * @param {string} url 访问路径
 * @param {function} callback 响应
 * @returns {object}
 */


const routerFactory = (url, callback) => {
  if (typeof callback === 'undefined') {
    callback = (req, res) => {
      responseStaticFile(res, url === '/' ? '/index.html' : url);
    };
  }

  return {
    url,
    callback
  };
};
/**
 * 路由
 */


const routers = [routerFactory('/favicon.ico', (req, res) => {
  res.end();
}), routerFactory('/'), routerFactory('/index.js'), routerFactory('/index.css'), routerFactory('/api/getResut', (req, res) => {
  const {
    query
  } = url.parse(req.url, true);

  if (query.action) {
    const result = playGame(Number(query.action).valueOf());
    res.write(toJson(true, '游戏有结果了', result));
    res.end();
  } else {
    res.write(toJson(false, '请出拳'));
    res.end();
  }
})];
/**
 * 是否为 api 请求
 * @param {string} url 页面路径
 * @returns {boolean}
 */

const isApiRequest = url => typeof url === 'string' && url.includes('/api/');

http.createServer(function (req, res) {
  const parseUrl = url.parse(req.url);
  routers.forEach(({
    url,
    callback
  }) => {
    if (parseUrl.pathname === url) {
      const options = {
        charset: 'utf-8'
      };

      if (isApiRequest(url)) {
        options['Content-Type'] = 'application/json';
      }

      res.writeHead(200, options);

      try {
        typeof callback === 'function' && callback(req, res);
      } catch (e) {
        res.writeHead(500);
        console.error(e);
        res.end();
      }
    }
  });
}).listen(process.env.BLOCKLET_PORT || 3000);

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ })));