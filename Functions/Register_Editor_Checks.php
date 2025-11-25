<?php
/**
 * Register Editor Checks
 *
 * Registers example editor checks with the Block Accessibility Checks plugin.
 *
 * @package Multi_Block_Checks
 */

namespace Multi_Block_Checks;

/**
 * Register Editor Checks Class
 */
class Register_Editor_Checks {

	/**
	 * Constructor
	 */
	public function __construct() {
		\add_action( 'ba11yc_editor_checks_ready', array( $this, 'register_checks' ), 10, 2 );
	}

	/**
	 * Register editor checks
	 *
	 * @param object $registry The EditorChecksRegistry instance.
	 * @param object $plugin   The main plugin instance.
	 * @return void
	 */
	public function register_checks( $registry, $plugin ): void {
		$post_type = 'post';

		// Check 1: First block must be a heading.
		$registry->register_editor_check(
			$post_type,
			'first_block_heading',
			array(
				'error_msg'   => \__( 'The first block must be a Heading block.', 'multi-block-checks-example' ),
				'warning_msg' => \__( 'It is recommended that the first block is a Heading block.', 'multi-block-checks-example' ),
				'type'        => 'settings', // Default to error.
				'priority'    => 10,
				'description' => \__( 'Ensures that the content starts with a heading for better accessibility and SEO.', 'multi-block-checks-example' ),
			)
		);

		// Check 2: No more than 3 paragraphs (just as a silly example).
		$registry->register_editor_check(
			$post_type,
			'max_paragraphs',
			array(
				'error_msg'   => \__( 'You cannot have more than 3 paragraphs.', 'multi-block-checks-example' ),
				'warning_msg' => \__( 'You have more than 3 paragraphs, which might be too long.', 'multi-block-checks-example' ),
				'type'        => 'settings', // Allow user to choose.
				'priority'    => 20,
				'description' => \__( 'Limits the number of paragraph blocks to encourage brevity.', 'multi-block-checks-example' ),
			)
		);
	}
}

