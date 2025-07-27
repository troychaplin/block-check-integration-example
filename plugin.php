<?php
/**
 * Plugin Name:       External Blocks A11Y Example
 * Description:       An example block that demonstrates how to use the BA11Y accessibility integration.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Troy Chaplin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       external-blocks-a11y-example
 *
 * @package BA11Y_External_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Initializes the BA11Y External Block plugin.
 *
 * This function sets up the necessary hooks, actions, and filters required
 * for the plugin to function properly within WordPress.
 *
 * @since 1.0.0
 */
function ba11y_external_block_init_plugin() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	$manifest_data = include __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'ba11y_external_block_init_plugin' );

// Include accessibility integration.
require_once plugin_dir_path( __FILE__ ) . 'includes/block-checks-integration.php';
