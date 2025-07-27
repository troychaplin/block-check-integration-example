# External Blocks A11Y Example

This plugin demonstrates how to integrate custom WordPress blocks with the [Block Accessibility Checks](https://github.com/wordpress/block-accessibility-checks) plugin using its developer API. It serves as a complete working example for developers who want to add accessibility validation to their custom blocks.

## Overview

The plugin includes a custom "Card" block that showcases the integration with Block Accessibility Checks. The block has three main fields (heading, content, and link) and demonstrates how to:

- Register accessibility checks for custom blocks
- Implement JavaScript validation logic
- Provide real-time feedback in the Gutenberg editor
- Handle different types of validation (errors vs warnings)

## Features

- **Custom Card Block:** A fully functional block with heading, content, and link fields
- **Accessibility Integration:** Complete integration with Block Accessibility Checks
- **Real-time Validation:** Instant feedback as users edit block content
- **Visual Indicators:** Error and warning states displayed in the editor
- **Developer Reference:** Clean, well-documented code for learning purposes

## Block Structure

The example card block includes:

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Heading | String | Optional | Must have content if provided |
| Content | String | Required | Must not be empty |
| Link | String | Required | Must not be empty |

## Installation

1. Install and activate the [Block Accessibility Checks](https://github.com/wordpress/block-accessibility-checks) plugin first
2. Upload this plugin to `/wp-content/plugins/ba11y-external-block/`
3. Activate the plugin through WordPress admin
4. Start using the `External Block w/Checks` block in the Gutenberg editor

## Integration Guide

This plugin demonstrates the complete integration process with Block Accessibility Checks:

### 1. PHP Registration (`includes/block-checks-integration.php`)

```php
function ba11y_external_block_register_accessibility_checks( $registry ) {
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

add_action( 'ba11yc_ready', 'ba11y_external_block_register_accessibility_checks' );
```

### 2. JavaScript Validation (`src/accessibility-checks.js`)

```javascript
import { addFilter } from '@wordpress/hooks';

addFilter(
    'ba11yc.validateBlock',
    'external-blocks-a11y-example/validation',
    (isValid, blockType, attributes, checkName) => {
        if (blockType !== 'external-blocks-a11y-example/card') {
            return isValid;
        }

        switch (checkName) {
            case 'check_content':
                return !!(attributes.content && attributes.content.trim());
            // ... other checks
        }
    }
);
```

### 3. Asset Enqueuing (`includes/block-checks-integration.php`)

```php
function ba11y_external_block_enqueue_accessibility_assets() {
    wp_enqueue_script(
        'external-blocks-a11y-example',
        plugins_url( 'build/accessibility-checks.js', __DIR__ ),
        array( 'wp-hooks', 'wp-i18n', 'block-accessibility-script' ),
        '1.0.0',
        true
    );
}

add_action( 'enqueue_block_editor_assets', 'ba11y_external_block_enqueue_accessibility_assets' );
```

## Key Integration Points

### Hook Registration
- Uses `ba11yc_ready` action to register checks when Block Accessibility Checks is available
- Registers multiple checks for different validation scenarios

### Validation Logic
- Implements the `ba11yc.validateBlock` filter for JavaScript validation
- Returns boolean values indicating validation status
- Handles multiple check types within a single filter

### Asset Management
- Enqueues validation script in block editor context
- Includes proper dependencies for WordPress hooks and Block Accessibility Checks

## Testing the Integration

1. **Add the Card Block:** Insert the "External Block w/Checks" block in the editor
2. **Test Validation:** Try leaving fields empty or filling them with content
3. **Observe Feedback:** Notice error indicators and inspector panel messages
4. **Publishing Test:** Attempt to publish with validation errors (should be blocked)

## Requirements

- WordPress 6.7 or higher
- PHP 7.4 or higher
- Block Accessibility Checks plugin (active)
- Gutenberg block editor

## License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## Related Resources

- [Block Accessibility Checks Plugin](https://github.com/wordpress/block-accessibility-checks)
- [Developer API Documentation](https://github.com/wordpress/block-accessibility-checks/blob/main/docs/developer-api.md)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
