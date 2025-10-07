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
    case 'check_album_heading_text':
      // If heading exists, it should have content
      if (attributes.headingText !== undefined && attributes.headingText !== null) {
        return !!(attributes.headingText && attributes.headingText.trim());
      }
      // No heading is fine (valid)
      return true;
    case 'check_album_release_date':
      // Return true if valid, false if invalid
      return !!(attributes.releaseDate && attributes.releaseDate.trim());
    case 'check_album_source_link':
      // Return true if valid, false if invalid
      return !!(attributes.sourceUrl && attributes.sourceUrl.trim());
    case 'check_album_description':
      // Return true if valid, false if invalid
      return !!(attributes.description && attributes.description.trim());
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
    case 'check_movie_heading_text':
      // If heading exists, it should have content
      if (attributes.headingText !== undefined && attributes.headingText !== null) {
        return !!(attributes.headingText && attributes.headingText.trim());
      }
      // No heading is fine (valid)
      return true;
    case 'check_movie_description':
      // FIXED: Use 'description' attribute instead of 'content'
      return !!(attributes.description && attributes.description.trim());
    case 'check_movie_source_link':
      // Return true if valid, false if invalid
      return !!(attributes.sourceUrl && attributes.sourceUrl.trim());
    case 'check_movie_release_date':
      // Return true if valid, false if invalid
      return !!(attributes.releaseDate && attributes.releaseDate.trim());
    default:
      // Unknown check, let other filters handle it
      return isValid;
  }
});

/***/ }),

/***/ "./src/scripts/plugin-sidebar/band-meta-sidebar.js":
/*!*********************************************************!*\
  !*** ./src/scripts/plugin-sidebar/band-meta-sidebar.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const BandMetaPanel = () => {
  const [date, setDate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date());

  // Get the current meta values for band fields.
  const meta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core/editor').getEditedPostAttribute('meta'));
  const origin = meta?.band_origin || '';

  // Get the function to update the meta value.
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/editor');

  // Only render the panel for the 'band' post type.
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core/editor').getCurrentPostType());
  if (postType !== 'band') {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    name: "band-meta-panel",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Band Details', 'multi-block-checks-example'),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('City of Origin', 'multi-block-checks-example'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Where the band originated from (e.g., "Los Angeles, CA", "London, UK")', 'multi-block-checks-example'),
      value: origin,
      onChange: value => editPost({
        meta: {
          ...meta,
          band_origin: value
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.DatePicker, {
      currentDate: date,
      onChange: newDate => setDate(newDate)
    })]
  });
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('band-meta-panel-plugin', {
  render: BandMetaPanel
});

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/* harmony import */ var _scripts_plugin_sidebar_band_meta_sidebar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/plugin-sidebar/band-meta-sidebar.js */ "./src/scripts/plugin-sidebar/band-meta-sidebar.js");



})();

/******/ })()
;
//# sourceMappingURL=editor-script.js.map