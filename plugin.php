<?php
/**
 * Plugin Name:       Multi-Block Check Example
 * Description:       An example of an external multi-block with accessibility & validation checks
 * Version:           1.4.21
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Troy Chaplin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       multi-block-checks-example
 *
 * @package Multi_Block_Checks
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
$Multi_Block_Checks_classes = array(
	\Multi_Block_Checks\Plugin_Paths::class,
	\Multi_Block_Checks\Register_Blocks::class,
	\Multi_Block_Checks\Enqueues::class,
	\Multi_Block_Checks\Post_Type::class,
	\Multi_Block_Checks\CheckAlbumCards::class,
	\Multi_Block_Checks\CheckMovieCards::class,
);

foreach ( $Multi_Block_Checks_classes as $Multi_Block_Checks_class ) {
	new $Multi_Block_Checks_class();
}
