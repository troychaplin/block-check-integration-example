<?php
/**
 * Plugin Paths
 *
 * This class provides utility methods for retrieving the plugin's URL and path.
 *
 * @package BA11Y_External_Block
 */

namespace BA11Y_External_Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin Paths Class
 *
 * This class provides utility methods for retrieving the plugin's URL and path.
 */
class Plugin_Paths {
	/**
	 * Get the plugin's URL
	 *
	 * @return string
	 */
	public static function plugin_url() {
		return plugin_dir_url( __DIR__ );
	}

	/**
	 * Get the plugin's path
	 *
	 * @return string
	 */
	public static function plugin_path() {
		return plugin_dir_path( __DIR__ );
	}
}
