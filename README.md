# Block Check Integration Example

A complete working example demonstrating how to integrate custom blocks with the [Block Accessibility Checks](https://wordpress.org/plugins/block-accessibility-checks/) plugin. This repository shows developers how to add accessibility and/or validation to their custom blocks using the Block Accessibility Checks Developer API.

## Overview

This example plugin demonstrates:

- **Custom Block Creation**: Two example blocks (Light Cards and Dark Cards) with accessibility-focused attributes
- **Accessibility Check Registration**: PHP integration to register custom validation rules
- **JavaScript Validation**: Real-time validation logic implemented in the block editor
- **Settings Integration**: Automatic creation of admin settings pages for configuring validation levels
- **Complete Build Process**: Webpack configuration and asset management

## What's Included

### Custom Blocks

- **Light Cards Block** (`external-blocks-a11y-example/light-cards`)
  - Heading field with configurable heading level
  - Content field for testimonial text
  - Link field for credibility/reference
  - Accessibility checks for required fields

- **Dark Cards Block** (`external-blocks-a11y-example/dark-cards`)
  - Similar structure to Light Cards with different styling
  - Same accessibility validation rules
  - Demonstrates multiple blocks with shared validation logic

### Accessibility Checks

The example implements three types of accessibility checks:

1. **Heading Check** (`check_heading`)
   - Validates that heading content exists when provided
   - Category: `accessibility`
   - Configurable via admin settings

2. **Content Check** (`check_content`)
   - Ensures testimonial content is provided
   - Category: `validation`
   - Configurable via admin settings

3. **Link Check** (`check_link`)
   - Validates that a reference link is provided
   - Category: `validation` (Light Cards) / `accessibility` (Dark Cards)
   - Configurable via admin settings

## Quick Start

### Prerequisites

- WordPress 6.7 or higher
- PHP 7.4 or higher
- [Block Accessibility Checks plugin](https://wordpress.org/plugins/block-accessibility-checks/) installed and activated
- Node.js and npm for development

### Installation

1. **Clone or download this repository** to your WordPress plugins directory:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/troychaplin/block-check-integration-example.git
   ```

2. **Activate the plugin** in WordPress admin

3. **Configure the settings** in the submenu page of `Block Checks`

## How It Works

### 1. PHP Integration

The plugin registers accessibility checks using the Block Accessibility Checks API:

```php
// Functions/BlockChecksIntegration.php
add_action( 'ba11yc_ready', array( $this, 'ba11y_external_block_light_cards_check' ) );

public function ba11y_external_block_light_cards_check( $registry ) {
    $registry->register_check(
        'external-blocks-a11y-example/light-cards',
        'check_heading',
        array(
            'error_msg'   => __( 'A heading is required for card blocks.', 'external-blocks-a11y-example' ),
            'warning_msg' => __( 'Consider adding a heading for better accessibility.', 'external-blocks-a11y-example' ),
            'description' => __( 'Card heading', 'external-blocks-a11y-example' ),
            'type'        => 'settings',
            'category'    => 'accessibility',
        )
    );
}
```

### 2. JavaScript Validation

Real-time validation is implemented using WordPress hooks:

```javascript
// src/scripts/light-cards-check.js
addFilter(
    'ba11yc.validateBlock',
    'external-blocks-a11y-example/validation',
    (isValid, blockType, attributes, checkName) => {
        if (blockType !== 'external-blocks-a11y-example/light-cards') {
            return isValid;
        }

        switch (checkName) {
            case 'check_heading':
                return !!(attributes.heading && attributes.heading.trim());
            case 'check_content':
                return !!(attributes.content && attributes.content.trim());
            case 'check_link':
                return !!(attributes.link && attributes.link.trim());
            default:
                return isValid;
        }
    }
);
```

### 3. Settings Integration

Checks registered with `'type' => 'settings'` automatically appear in the WordPress admin under **Block Checks → External Blocks A11Y Example**, allowing site administrators to:

- Set validation levels (Error, Warning, Disabled) for each check
- Enable/disable specific validation rules
- Configure accessibility requirements per block type

## File Structure

```
block-check-integration-example/
├── Functions/
│   ├── BlockChecksIntegration.php    # Accessibility check registration
│   ├── Enqueues.php                  # Script/style enqueuing
│   ├── Plugin_Paths.php              # Plugin path utilities
│   └── Register_Blocks.php           # Block registration
├── src/
│   ├── blocks/
│   │   ├── light-cards/              # Light Cards block
│   │   └── dark-cards/               # Dark Cards block
│   ├── scripts/
│   │   ├── light-cards-check.js      # Light Cards validation
│   │   └── dark-cards-check.js       # Dark Cards validation
│   ├── editor-script.js              # Editor initialization
│   └── frontend-script.js            # Frontend initialization
├── build/                            # Compiled assets
├── plugin.php                        # Main plugin file
├── package.json                      # Node.js dependencies
├── composer.json                     # PHP dependencies
└── webpack.config.js                 # Build configuration
```

## Key Features Demonstrated

- **Real-time Validation**: Accessibility checks run as users edit content
- **Visual Feedback**: Error/warning indicators in the block editor
- **Publishing Control**: Error-level checks prevent publishing
- **Flexible Configuration**: Admin settings for each validation rule
- **Multiple Block Support**: Shared validation logic across block types
- **Modern Build Process**: Webpack-based asset compilation

## Integration Points

This example demonstrates integration with the Block Accessibility Checks plugin through:

- **Action Hooks**: `ba11yc_ready` for check registration
- **Filter Hooks**: `ba11yc.validateBlock` for validation logic
- **Registry API**: Programmatic check management
- **Settings API**: Automatic admin interface generation

## Customization

To adapt this example for your own blocks:

1. **Update block types** in `Functions/BlockChecksIntegration.php`
2. **Modify validation logic** in `src/scripts/*-check.js`
3. **Adjust block attributes** in `src/blocks/*/block.json`
4. **Update text domain** and plugin information
5. **Customize error messages** and validation rules

## Support & Resources

- **[Block Accessibility Checks Plugin](https://wordpress.org/plugins/block-accessibility-checks/)**: Main plugin documentation
- **[Developer API Documentation](https://github.com/troychaplin/block-accessibility-checks/tree/main/docs)**: Complete API reference
- **[Quick Start Guide](https://github.com/troychaplin/block-accessibility-checks/blob/main/docs/quick-start.md)**: Step-by-step integration guide

## Contributing

This example plugin is designed to help developers understand and implement accessibility validation. Contributions to improve the example or add new patterns are welcome!

## License

This example plugin is licensed under the GPL v2 or later, matching the Block Accessibility Checks plugin license.

---

**Note**: This example requires the Block Accessibility Checks plugin to be installed and activated for full functionality.
