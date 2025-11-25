import { addFilter } from '@wordpress/hooks';

/**
 * Editor Validation Checks
 */

// Check 1: First block must be a heading
addFilter(
	'ba11yc_validate_editor',
	'multi-block-checks/first-block-heading',
	(isValid, blocks, postType, checkName, rule) => {
		if (checkName !== 'first_block_heading' || postType !== 'post') {
			return isValid;
		}

		if (!blocks || blocks.length === 0) {
			return true; // Empty editor is fine? Or maybe not. Let's say fine.
		}

		const firstBlock = blocks[0];
		if (firstBlock.name !== 'core/heading') {
			return false;
		}

		return true;
	}
);

// Check 2: Max 3 paragraphs
addFilter(
	'ba11yc_validate_editor',
	'multi-block-checks/max-paragraphs',
	(isValid, blocks, postType, checkName, rule) => {
		if (checkName !== 'max_paragraphs' || postType !== 'post') {
			return isValid;
		}

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
	}
);

