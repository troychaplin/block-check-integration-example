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
	}
);
