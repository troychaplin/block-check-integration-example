<?php
/**
 * Block Checks Integration
 *
 * This class integrates with the Block Accessibility Checks plugin to register accessibility checks for custom blocks.
 *
 * @package BA11Y_External_Block
 */

namespace BA11Y_External_Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Checks Integration Class
 *
 * This class integrates with the Block Accessibility Checks plugin to register accessibility checks for custom blocks.
 */
class BlockChecksIntegration {
	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'ba11yc_ready', array( $this, 'ba11y_external_block_light_cards_check' ) );
		add_action( 'ba11yc_ready', array( $this, 'ba11y_external_block_dark_cards_check' ) );
	}

	/**
	 * Register checks for light cards
	 *
	 * @param \BlockAccessibility\BlockChecksRegistry $registry The registry instance.
	 *
	 * @return void
	 */
	public function ba11y_external_block_light_cards_check( $registry ) {
		// Register check for heading.
		$registry->register_check(
			'external-blocks-a11y-example/light-cards',
			'check_heading',
			array(
				'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card heading', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		// Register check for required author name.
		$registry->register_check(
			'external-blocks-a11y-example/light-cards',
			'check_link',
			array(
				'error_msg'   => __( 'Link is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a link for better credibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card link', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);

		// Register check for required content.
		$registry->register_check(
			'external-blocks-a11y-example/light-cards',
			'check_content',
			array(
				'error_msg'   => __( 'Card content is required.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Card content is recommended.', 'external-blocks-a11y-example' ),
				'description' => __( 'Content', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);
	}

	/**
	 * Register checks for dark cards
	 *
	 * @param \BlockAccessibility\BlockChecksRegistry $registry The registry instance.
	 *
	 * @return void
	 */
	public function ba11y_external_block_dark_cards_check( $registry ) {
		// Register check for heading.
		$registry->register_check(
			'external-blocks-a11y-example/dark-cards',
			'check_heading',
			array(
				'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card heading', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		// Register check for required author name.
		$registry->register_check(
			'external-blocks-a11y-example/dark-cards',
			'check_link',
			array(
				'error_msg'   => __( 'Link is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a link for better credibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card link', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		// Register check for required content.
		$registry->register_check(
			'external-blocks-a11y-example/dark-cards',
			'check_content',
			array(
				'error_msg'   => __( 'Card content is required.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Card content is recommended.', 'external-blocks-a11y-example' ),
				'description' => __( 'Content', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);
	}
}
