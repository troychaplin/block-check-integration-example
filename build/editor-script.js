/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/checks/album-card-check.js"
/*!************************************************!*\
  !*** ./src/scripts/checks/album-card-check.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc_validate_block', 'multi-block-checks-example/validation', (isValid, blockType, attributes, checkName) => {
  // Only handle our block type - FIXED: match the PHP registration
  if (blockType !== 'ba11y-checks-example/album-card') {
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

/***/ },

/***/ "./src/scripts/checks/editor-checks.js"
/*!*********************************************!*\
  !*** ./src/scripts/checks/editor-checks.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Editor Validation Checks
 */

// Check 1: First block must be a heading
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc_validate_editor', 'multi-block-checks/first-block-heading', (isValid, blocks, _postType, checkName) => {
  // Only process this specific check
  if (checkName !== 'first_block_heading') {
    return isValid;
  }

  // The validation system already filters by post type, so we don't need to check it here
  // This check will only run for post types where it's registered (post, page, etc.)

  if (!blocks || blocks.length === 0) {
    return true; // Empty editor is fine? Or maybe not. Let's say fine.
  }
  const firstBlock = blocks[0];
  if (firstBlock.name !== 'core/heading') {
    return false;
  }
  return true;
});

// Check 2: Max 3 paragraphs
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc_validate_editor', 'multi-block-checks/max-paragraphs', (isValid, blocks, _postType, checkName) => {
  // Only process this specific check
  if (checkName !== 'max_paragraphs') {
    return isValid;
  }

  // The validation system already filters by post type, so we don't need to check it here

  const paragraphCount = blocks.reduce((count, block) => {
    if (block.name === 'core/paragraph') {
      return count + 1;
    }
    return count;
  }, 0);
  if (paragraphCount > 3) {
    return false;
  }
  return true;
});

/***/ },

/***/ "./src/scripts/checks/meta-validation.js"
/*!***********************************************!*\
  !*** ./src/scripts/checks/meta-validation.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Meta Validation for Band Post Type
 *
 * Provides client-side validation for band meta fields.
 */



/**
 * Validate band meta fields
 *
 * This filter integrates with the Block Accessibility Checks plugin
 * to validate post meta fields in real-time.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('ba11yc_validate_meta', 'multi-block-checks-example/validation', (isValid, value, postType, metaKey, checkName) => {
  // Only validate for band post type
  if (postType !== 'band') {
    return isValid;
  }
  switch (metaKey) {
    case 'band_origin':
      if (checkName === 'required') {
        // Validate that band origin is not empty
        return !!(value && value.trim());
      }
      break;
    case 'band_record_label':
      if (checkName === 'required') {
        // Validate that band record label is not empty
        return !!(value && value.trim());
      }
      break;
    case 'band_first_album':
      if (checkName === 'required') {
        // Validate that band first album is not empty
        return !!(value && value.trim());
      }
      break;
  }
  return isValid;
});

/***/ },

/***/ "./src/scripts/helpers/useMetaField.js"
/*!*********************************************!*\
  !*** ./src/scripts/helpers/useMetaField.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMetaField: () => (/* binding */ useMetaField)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * useMetaField Shim
 *
 * This hook provides a safe fallback for handling meta fields.
 * If the Block Accessibility Checks plugin is active, it uses the enhanced validation hook.
 * If not, it falls back to standard WordPress meta handling.
 *
 * USAGE:
 * Copy this file to your plugin and import it in your sidebars.
 * const props = useMetaField('my_meta_key', 'My help text');
 * <TextControl {...props} />
 *
 * @param {string} metaKey        - The meta key to manage
 * @param {string} [originalHelp] - Optional help text
 * @return {Object} Props for TextControl (value, onChange, help, className)
 */
function useMetaField(metaKey, originalHelp = '') {
  // Always run standard hooks to comply with Rules of Hooks
  const {
    value
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const editor = select('core/editor');
    if (!editor) {
      return {
        value: ''
      };
    }
    const meta = editor.getEditedPostAttribute('meta');
    return {
      value: meta ? meta[metaKey] : ''
    };
  }, [metaKey]);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)('core/editor');

  // 1. Try to use the plugin's hook if available
  if (window.BlockAccessibilityChecks && typeof window.BlockAccessibilityChecks.useMetaField === 'function') {
    // Note: This conditional hook call is theoretically unsafe if the plugin presence changes,
    // but since it's a global plugin, it's stable for the session.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return window.BlockAccessibilityChecks.useMetaField(metaKey, originalHelp);
  }

  // 2. Fallback: Standard WordPress data handling
  return {
    value: value || '',
    onChange: newValue => {
      if (editPost) {
        editPost({
          meta: {
            [metaKey]: newValue
          }
        });
      }
    },
    help: originalHelp,
    className: ''
  };
}

/***/ },

/***/ "./src/scripts/sidebars/band-plugin-sidebar.js"
/*!*****************************************************!*\
  !*** ./src/scripts/sidebars/band-plugin-sidebar.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_useMetaField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/useMetaField */ "./src/scripts/helpers/useMetaField.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * WordPress dependencies
 */






/**
 * Local Shim for Block Accessibility Checks
 */


const BandDetailsSidebar = () => {
  // Get post type first
  // Note: We can't conditional return yet because we have hooks to call
  const {
    postType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const editor = select('core/editor');
    const currentPostType = editor.getCurrentPostType();
    return {
      postType: currentPostType
    };
  }, []);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/editor');

  // Get validated props for each field (UNCONDITIONAL)
  // This hook handles state management regardless of whether the plugin is active
  const originProps = (0,_helpers_useMetaField__WEBPACK_IMPORTED_MODULE_5__.useMetaField)('band_origin', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Where the band originated from (e.g., "Los Angeles, CA", "London, UK")', 'multi-block-checks-example'));
  const labelProps = (0,_helpers_useMetaField__WEBPACK_IMPORTED_MODULE_5__.useMetaField)('band_record_label', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The record label of the band (e.g., "Record Label Inc.", "Record Label LLC")', 'multi-block-checks-example'));
  const albumProps = (0,_helpers_useMetaField__WEBPACK_IMPORTED_MODULE_5__.useMetaField)('band_first_album', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The first album of the band (e.g., "Album Title", "Album Title 2")', 'multi-block-checks-example'));

  // Early return if not the band post type
  // Now safe because hooks are called above
  if (postType !== 'band') {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_1__.PluginSidebar, {
    name: "band-details-sidebar",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Band Details'),
    icon: 'format-audio',
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalToolsPanel, {
      label: "ToolsPanel Example",
      resetAll: () => editPost({
        meta: {
          band_origin: ''
        }
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalToolsPanelItem, {
        hasValue: () => originProps.value !== '',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('City of Origin'),
        onDeselect: () => originProps.onChange(''),
        isShownByDefault: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('City of Origin'),
          ...originProps
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('PanelBody Example', 'multi-block-checks-example'),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Record Label', 'multi-block-checks-example'),
        ...labelProps
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('First Album', 'multi-block-checks-example'),
        ...albumProps
      })]
    })]
  });
};

// Register the plugin.
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('band-details-sidebar', {
  render: BandDetailsSidebar
});

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/editor"
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["editor"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/plugins"
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["plugins"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/* harmony import */ var _scripts_checks_meta_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/checks/meta-validation.js */ "./src/scripts/checks/meta-validation.js");
/* harmony import */ var _scripts_checks_editor_checks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/checks/editor-checks.js */ "./src/scripts/checks/editor-checks.js");
/* harmony import */ var _scripts_sidebars_band_plugin_sidebar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/sidebars/band-plugin-sidebar.js */ "./src/scripts/sidebars/band-plugin-sidebar.js");




})();

/******/ })()
;
//# sourceMappingURL=editor-script.js.map