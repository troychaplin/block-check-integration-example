<?php

namespace BA11Y_External_Block;

if ( ! defined( 'ABSPATH' ) ) {
   exit;
}

class BlockChecksIntegration {
    public function __construct() {
        add_action( 'ba11yc_ready', [$this, 'ba11y_external_block_register_accessibility_checks'] );
    }

    public function ba11y_external_block_register_accessibility_checks( $registry ) {
        // Register check for heading.
        $registry->register_check(
            'external-blocks-a11y-example/dark-cards',
            'check_heading',
            array(
                'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
                'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
                'description' => __( 'Card heading validation', 'external-blocks-a11y-example' ),
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
                'description' => __( 'Card link validation', 'external-blocks-a11y-example' ),
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
                'description' => __( 'Content validation', 'external-blocks-a11y-example' ),
                'type'        => 'settings',
                'category'    => 'validation',
            )
        );

        // Register check for heading.
        $registry->register_check(
            'external-blocks-a11y-example/light-cards',
            'check_heading',
            array(
                'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
                'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
                'description' => __( 'Card heading validation', 'external-blocks-a11y-example' ),
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
                'description' => __( 'Card link validation', 'external-blocks-a11y-example' ),
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
                'description' => __( 'Content validation', 'external-blocks-a11y-example' ),
                'type'        => 'settings',
                'category'    => 'validation',
            )
        );
   }
}

