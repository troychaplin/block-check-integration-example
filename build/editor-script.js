/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/checks/album-card-check.js":
/*!************************************************!*\
  !*** ./src/scripts/checks/album-card-check.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Testimonial Block Accessibility Checks
 *
 * Integrates with the Block Accessibility Checks plugin validation system.
 * All validation logic is now handled in JavaScript only.
 */



/**
 * Register validation logic for testimonial block using the unified hook system
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc.validateBlock', 'multi-block-checks-example/validation', (isValid, blockType, attributes, checkName) => {
  // Only handle our block type - FIXED: match the PHP registration
  if (blockType !== 'multi-block-check-example/album-card') {
    return isValid;
  }

  // Run validation based on check name
  switch (checkName) {
    case 'check_album_card_heading':
      // If heading exists, it should have content
      if (attributes.heading !== undefined && attributes.heading !== null) {
        return !!(attributes.heading && attributes.heading.trim());
      }
      // No heading is fine (valid)
      return true;
    case 'check_album_release_date':
      // Return true if valid, false if invalid
      return !!(attributes.releaseDate && attributes.releaseDate.trim());
    case 'check_album_spotify_music':
      // Return true if valid, false if invalid
      return !!(attributes.spotifyMusic && attributes.spotifyMusic.trim());
    case 'check_album_apple_music':
      // Return true if valid, false if invalid
      return !!(attributes.appleMusic && attributes.appleMusic.trim());
    case 'check_album_youtube_music':
      // Return true if valid, false if invalid
      return !!(attributes.youtubeMusic && attributes.youtubeMusic.trim());
    default:
      // Unknown check, let other filters handle it
      return isValid;
  }
});

/***/ }),

/***/ "./src/scripts/checks/movie-card-check.js":
/*!************************************************!*\
  !*** ./src/scripts/checks/movie-card-check.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Testimonial Block Accessibility Checks
 *
 * Integrates with the Block Accessibility Checks plugin validation system.
 * All validation logic is now handled in JavaScript only.
 */



/**
 * Register validation logic for testimonial block using the unified hook system
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc.validateBlock', 'multi-block-checks-example/validation', (isValid, blockType, attributes, checkName) => {
  // Only handle our block type - FIXED: match the PHP registration
  if (blockType !== 'multi-block-check-example/movie-card') {
    return isValid;
  }

  // Run validation based on check name
  switch (checkName) {
    case 'check_heading_text':
      // If heading exists, it should have content
      if (attributes.headingText !== undefined && attributes.headingText !== null) {
        return !!(attributes.headingText && attributes.headingText.trim());
      }
      // No heading is fine (valid)
      return true;
    case 'check_description':
      // FIXED: Use 'description' attribute instead of 'content'
      return !!(attributes.description && attributes.description.trim());
    case 'check_source_link':
      // Return true if valid, false if invalid
      return !!(attributes.sourceUrl && attributes.sourceUrl.trim());
    case 'check_release_date':
      // Return true if valid, false if invalid
      return !!(attributes.releaseDate && attributes.releaseDate.trim());
    default:
      // Unknown check, let other filters handle it
      return isValid;
  }
});

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/editor-script.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_checks_album_card_check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/checks/album-card-check.js */ "./src/scripts/checks/album-card-check.js");
/* harmony import */ var _scripts_checks_movie_card_check_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/checks/movie-card-check.js */ "./src/scripts/checks/movie-card-check.js");


})();

/******/ })()
;
//# sourceMappingURL=editor-script.js.map