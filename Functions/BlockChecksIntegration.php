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
		add_action( 'ba11yc_ready', array( $this, 'register_checks' ) );
	}

	/**
	 * Register all checks for this plugin
	 *
	 * @param \BlockAccessibility\BlockChecksRegistry $registry The registry instance.
	 *
	 * @return void
	 */
	public function register_checks( $registry ) {
		// Register checks for light cards
		$this->register_light_cards_checks( $registry );
		
		// Register checks for dark cards
		$this->register_dark_cards_checks( $registry );
	}

	/**
	 * Register checks for light cards
	 *
	 * @param \BlockAccessibility\BlockChecksRegistry $registry The registry instance.
	 *
	 * @return void
	 */
	private function register_light_cards_checks( $registry ) {
		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/light-cards',
			'check_heading',
			array(
				'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card heading', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/light-cards',
			'check_link',
			array(
				'error_msg'   => __( 'Link is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a link for better credibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card link', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);

		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/light-cards',
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
	private function register_dark_cards_checks( $registry ) {
		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/dark-cards',
			'check_heading',
			array(
				'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card heading', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/dark-cards',
			'check_link',
			array(
				'error_msg'   => __( 'Link is required for card blocks.', 'external-blocks-a11y-example' ),
				'warning_msg' => __( 'Consider adding a link for better credibility.', 'external-blocks-a11y-example' ),
				'description' => __( 'Card link', 'external-blocks-a11y-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		$registry->register_check_with_plugin_detection(
			'ba11y-multi-block-example/dark-cards',
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
