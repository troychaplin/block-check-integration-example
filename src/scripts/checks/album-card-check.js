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
	'ba11yc_validate_block',
	'multi-block-checks-example/validation',
	(isValid, blockType, attributes, checkName, block) => {
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

			case 'check_album_innerblock_count':
				// Check if the block has inner blocks and count paragraphs and buttons
				let paragraphCount = 0;
				let buttonCount = 0;

				if (block.innerBlocks) {
					block.innerBlocks.forEach(innerBlock => {
						if (innerBlock.name === 'core/paragraph') {
							paragraphCount++;
						} else if (
							innerBlock.name === 'core/button' ||
							innerBlock.name === 'core/buttons'
						) {
							buttonCount++;
						}
					});
				}

				// Return true if valid, false if invalid
				return paragraphCount >= 1 && paragraphCount <= 2 && buttonCount <= 1;

			default:
				// Unknown check, let other filters handle it
				return isValid;
		}
	}
);
