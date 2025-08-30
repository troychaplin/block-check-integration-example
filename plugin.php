<?php
/**
 * Plugin Name:       BA11Y Multi-Block Example
 * Description:       An example of an external multi-block with accessibility & validation checks
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
	exit;
}

// Include Composer's autoload file.
if ( file_exists( plugin_dir_path( __FILE__ ) . 'vendor/autoload.php' ) ) {
	require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
} else {
	wp_trigger_error( 'BA11Y Multi-Block Example Plugin: Composer autoload file not found. Please run `composer install`.', E_USER_ERROR );
	return;
}

// Instantiate the classes.
$ba11y_external_block_classes = array(
	\BA11Y_External_Block\Plugin_Paths::class,
	\BA11Y_External_Block\Register_Blocks::class,
	\BA11Y_External_Block\Enqueues::class,
	\BA11Y_External_Block\BlockChecksIntegration::class,
);

foreach ( $ba11y_external_block_classes as $ba11y_external_block_class ) {
	new $ba11y_external_block_class();
}
