<?php
/**
 * Block Accessibility Checks Integration
 *
 * This file contains all the accessibility validation logic for the testimonial block.
 *
 * @package MyTestimonialBlock
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize accessibility checks integration
 *
 * This function is called when Block Accessibility Checks is ready
 *
 * @param object $registry The Block Accessibility Checks registry instance.
 */
function ba11y_external_block_register_accessibility_checks( $registry ) {
	// Register check for heading.
	$registry->register_check(
		'external-blocks-a11y-example/card',
		'check_heading',
		array(
			'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
			'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
			'description' => __( 'Card heading validation', 'external-blocks-a11y-example' ),
			'type'        => 'settings',
		)
	);

	// Register check for required author name.
	$registry->register_check(
		'external-blocks-a11y-example/card',
		'check_link',
		array(
			'error_msg'   => __( 'Link is required for card blocks.', 'external-blocks-a11y-example' ),
			'warning_msg' => __( 'Consider adding a link for better credibility.', 'external-blocks-a11y-example' ),
			'description' => __( 'Card link validation', 'external-blocks-a11y-example' ),
			'type'        => 'settings',
		)
	);

	// Register check for required content.
	$registry->register_check(
		'external-blocks-a11y-example/card',
		'check_content',
		array(
			'error_msg'   => __( 'Card content is required.', 'external-blocks-a11y-example' ),
			'warning_msg' => __( 'Card content is recommended.', 'external-blocks-a11y-example' ),
			'description' => __( 'Content validation', 'external-blocks-a11y-example' ),
			'type'        => 'settings',
		)
	);
}

// Hook into Block Accessibility Checks when it's ready.
add_action( 'ba11yc_ready', 'ba11y_external_block_register_accessibility_checks' );

/**
 * Enqueue accessibility checks JavaScript
 */
function ba11y_external_block_enqueue_accessibility_assets() {
	wp_enqueue_script(
		'external-blocks-a11y-example',
		plugins_url( 'build/accessibility-checks.js', __DIR__ ),
		array( 'wp-hooks', 'wp-i18n', 'block-accessibility-script' ),
		'1.0.0',
		true
	);
}

// Enqueue our accessibility checks script in the block editor.
add_action( 'enqueue_block_editor_assets', 'ba11y_external_block_enqueue_accessibility_assets' );
