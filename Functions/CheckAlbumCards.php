<?php
/**
 * Block Checks Integration
 *
 * This class integrates with the Block Accessibility Checks plugin to register accessibility checks for custom blocks.
 *
 * @package Multi_Block_Checks
 */

namespace Multi_Block_Checks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Checks Integration Class
 *
 * This class integrates with the Block Accessibility Checks plugin to register accessibility checks for custom blocks.
 */
class CheckAlbumCards {
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
		$this->register_album_card_checks( $registry );
	}

	/**
	 * Register checks for light cards
	 *
	 * @param \BlockAccessibility\BlockChecksRegistry $registry The registry instance.
	 *
	 * @return void
	 */
	private function register_album_card_checks( $registry ) {
		$registry->register_check_with_plugin_detection(
			'multi-block-check-example/album-card',
			'check_album_heading_text',
			array(
				'error_msg'   => __( 'A heading is required for card blocks.', 'multi-block-checks-example' ),
				'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'multi-block-checks-example' ),
				'description' => __( 'Album title', 'multi-block-checks-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);

		$registry->register_check_with_plugin_detection(
			'multi-block-check-example/album-card',
			'check_album_release_date',
			array(
				'error_msg'   => __( 'Card content is required.', 'multi-block-checks-example' ),
				'warning_msg' => __( 'Card content is recommended.', 'multi-block-checks-example' ),
				'description' => __( 'Album release date', 'multi-block-checks-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);

		$registry->register_check_with_plugin_detection(
			'multi-block-check-example/album-card',
			'check_album_description',
			array(
				'error_msg'   => __( 'Card content is required.', 'multi-block-checks-example' ),
				'warning_msg' => __( 'Card content is recommended.', 'multi-block-checks-example' ),
				'description' => __( 'Album description', 'multi-block-checks-example' ),
				'type'        => 'settings',
				'category'    => 'validation',
			)
		);

		$registry->register_check_with_plugin_detection(
			'multi-block-check-example/album-card',
			'check_album_source_link',
			array(
				'error_msg'   => __( 'Link is required for card blocks.', 'multi-block-checks-example' ),
				'warning_msg' => __( 'Consider adding a link for better credibility.', 'multi-block-checks-example' ),
				'description' => __( 'Album link', 'multi-block-checks-example' ),
				'type'        => 'settings',
				'category'    => 'accessibility',
			)
		);
	}
}
