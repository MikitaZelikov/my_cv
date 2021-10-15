/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("async function getAppLanguage() {\r\n    const refParams = new URLSearchParams(window.location.search);\r\n    const languageParam = refParams.get('lang');\r\n    debugger;\r\n    const url = './assets/languages/' + languageParam + '.json';\r\n    let response = await fetch(url);\r\n    if (!response.ok) {\r\n        response = await fetch('./assets/languages/en.json');\r\n        // function RedirectTo() {\r\n        //     window.location.search = '?lang=en';\r\n        //     return false;\r\n        // }\r\n    }\r\n    \r\n    const result = await response.json();\r\n    return result;\r\n}\r\n\r\nlet appLanguage = getAppLanguage(); \n\n//# sourceURL=webpack://test-bpmobile/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;