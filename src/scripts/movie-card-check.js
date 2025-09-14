/**
 * Testimonial Block Accessibility Checks
 *
 * Integrates with the Block Accessibility Checks plugin validation system.
 * All validation logic is now handled in JavaScript only.
 */

import { addFilter } from '@wordpress/hooks';

/**
 * Register validation logic for testimonial block using the unified hook system
 */
addFilter(
	'ba11yc.validateBlock',
	'multi-block-checks-example/validation',
	(isValid, blockType, attributes, checkName) => {
		// Only handle our block type - FIXED: match the PHP registration
		if (blockType !== 'multi-block-check-example/movie-card') {
			return isValid;
		}

		// Run validation based on check name
		switch (checkName) {
			case 'check_heading':
				// If heading exists, it should have content
				if (attributes.heading !== undefined && attributes.heading !== null) {
					return !!(attributes.heading && attributes.heading.trim());
				}
				// No heading is fine (valid)
				return true;

			case 'check_content':
				// FIXED: Use 'excerpt' attribute instead of 'content'
				return !!(attributes.excerpt && attributes.excerpt.trim());

			case 'check_link':
				// Return true if valid, false if invalid
				return !!(attributes.link && attributes.link.trim());

			default:
				// Unknown check, let other filters handle it
				return isValid;
		}
	}
);
