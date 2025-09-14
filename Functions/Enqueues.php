<?php
/**
 * Enqueues
 *
 * This class is responsible for enqueuing the plugin's assets.
 *
 * @package Multi_Block_Checks
 */

namespace Multi_Block_Checks;

use Multi_Block_Checks\Plugin_Paths;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueues Class
 *
 * This class is responsible for enqueuing the plugin's assets.
 */
class Enqueues {
	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
	}

	/**
	 * Enqueues the block assets for the editor
	 *
	 * @return void
	 */
	public function enqueue_block_assets() {
		$asset_file = include Plugin_Paths::plugin_path() . 'build/editor-script.asset.php';

		wp_enqueue_script(
			'editor-script-js',
			Plugin_Paths::plugin_url() . 'build/editor-script.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			false
		);
	}

	/**
	 * Enqueues the block assets for the frontend
	 *
	 * @return void
	 */
	public function enqueue_frontend_assets() {
		$asset_file = include Plugin_Paths::plugin_path() . 'build/frontend-script.asset.php';

		wp_enqueue_script(
			'frontend-script-js',
			Plugin_Paths::plugin_url() . 'build/frontend-script.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
