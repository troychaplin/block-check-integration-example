# Block Check Integration Example

A complete working example demonstrating how to integrate custom blocks with the [Block Accessibility Checks](https://wordpress.org/plugins/block-accessibility-checks/) plugin. This repository shows developers how to add accessibility and/or validation to their custom blocks using the Block Accessibility Checks Developer API.

## Overview

This example plugin demonstrates:

- **Custom Block Creation**: Two example blocks (Album Card and Movie Card) with accessibility-focused attributes
- **Accessibility Check Registration**: PHP integration to register custom validation rules
- **JavaScript Validation**: Real-time validation logic implemented in the block editor
- **Settings Integration**: Automatic creation of admin settings pages for configuring validation levels
- **Complete Build Process**: Webpack configuration and asset management

## What's Included

### Custom Blocks

- **Album Card Block** (`multi-block-check-example/album-card`)
  - Heading field with configurable heading level
  - Release date field for album information
  - Description field for album details
  - Source URL field for credibility/reference
  - Accessibility checks for required fields

- **Movie Card Block** (`multi-block-check-example/movie-card`)
  - Similar structure to Album Card with different styling
  - Same accessibility validation rules
  - Demonstrates multiple blocks with shared validation logic

### Accessibility Checks

The example implements four types of accessibility checks for each block:

1. **Heading Text Check** (`check_album_heading_text` / `check_movie_heading_text`)
   - Validates that heading content exists when provided
   - Category: `accessibility`
   - Configurable via admin settings

2. **Release Date Check** (`check_album_release_date` / `check_movie_release_date`)
   - Ensures release date is provided
   - Category: `validation`
   - Configurable via admin settings

3. **Description Check** (`check_album_description` / `check_movie_description`)
   - Validates that description content is provided
   - Category: `validation`
   - Configurable via admin settings

4. **Source Link Check** (`check_album_source_link` / `check_movie_source_link`)
   - Validates that a reference link is provided
   - Category: `accessibility`
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

2. **Install dependencies**:
   ```bash
   cd block-check-integration-example/
   npm install
   composer install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

4. **Activate the plugin** in WordPress admin

5. **Configure the settings** in the submenu page of `Block Checks`

## How It Works

### 1. PHP Integration

The plugin registers accessibility checks using the Block Accessibility Checks API:

```php
// Functions/CheckAlbumCards.php
add_action( 'ba11yc_ready', array( $this, 'register_checks' ) );

public function register_checks( $registry ) {
    $registry->register_check_with_plugin_detection(
        'multi-block-check-example/album-card',
        'check_album_heading_text',
        array(
            'error_msg'   => __( 'A title is required for each album card.', 'multi-block-checks-example' ),
            'warning_msg' => __( 'Consider adding an album title for better accessibility.', 'multi-block-checks-example' ),
            'description' => __( 'Set the requirements for the album title attribute', 'multi-block-checks-example' ),
            'type'        => 'settings',
            'category'    => 'accessibility',
        )
    );
}
```

### 2. JavaScript Validation

Real-time validation is implemented using WordPress hooks:

```javascript
// src/scripts/checks/album-card-check.js
addFilter(
    'ba11yc.validateBlock',
    'multi-block-checks-example/validation',
    (isValid, blockType, attributes, checkName) => {
        if (blockType !== 'multi-block-check-example/album-card') {
            return isValid;
        }

        switch (checkName) {
            case 'check_album_heading_text':
                return !!(attributes.headingText && attributes.headingText.trim());
            case 'check_album_release_date':
                return !!(attributes.releaseDate && attributes.releaseDate.trim());
            case 'check_album_description':
                return !!(attributes.description && attributes.description.trim());
            case 'check_album_source_link':
                return !!(attributes.sourceUrl && attributes.sourceUrl.trim());
            default:
                return isValid;
        }
    }
);
```

### 3. Settings Integration

Checks registered with `'type' => 'settings'` automatically appear in the WordPress admin under **Block Checks → Multi-Block Check Example**, allowing site administrators to:

- Set validation levels (Error, Warning, Disabled) for each check
- Enable/disable specific validation rules
- Configure accessibility requirements per block type

## File Structure

```
block-check-integration-example/
├── Functions/
│   ├── CheckAlbumCards.php              # Album card accessibility check registration
│   ├── CheckMovieCards.php              # Movie card accessibility check registration
│   ├── Enqueues.php                     # Script/style enqueuing
│   ├── Plugin_Paths.php                 # Plugin path utilities
│   └── Register_Blocks.php              # Block registration
├── src/
│   ├── blocks/
│   │   ├── album-card/                  # Album Card block
│   │   │   ├── block.json               # Block configuration
│   │   │   ├── edit.js                  # Editor component
│   │   │   ├── index.js                 # Block registration
│   │   │   ├── save.js                  # Save component
│   │   │   └── style.scss               # Block styles
│   │   └── movie-card/                  # Movie Card block
│   │       ├── block.json               # Block configuration
│   │       ├── edit.js                  # Editor component
│   │       ├── index.js                 # Block registration
│   │       ├── save.js                  # Save component
│   │       └── style.scss               # Block styles
│   ├── scripts/
│   │   ├── checks/
│   │   │   ├── album-card-check.js      # Album Card validation
│   │   │   └── movie-card-check.js      # Movie Card validation
│   │   └── helpers/
│   │       ├── date-selector.js         # Date picker component
│   │       └── heading-selector.js      # Heading level selector
│   ├── editor-script.js                 # Editor initialization
│   └── frontend-script.js               # Frontend initialization
├── build/                               # Compiled assets
├── plugin.php                           # Main plugin file
├── package.json                         # Node.js dependencies
├── composer.json                        # PHP dependencies
└── webpack.config.js                    # Build configuration
```

## Key Features Demonstrated

- **Real-time Validation**: Accessibility checks run as users edit content
- **Visual Feedback**: Error/warning indicators in the block editor
- **Publishing Control**: Error-level checks prevent publishing
- **Flexible Configuration**: Admin settings for each validation rule
- **Multiple Block Support**: Shared validation logic across block types
- **Modern Build Process**: Webpack-based asset compilation with WordPress Scripts
- **Plugin Detection**: Uses `register_check_with_plugin_detection()` for better integration

## Integration Points

This example demonstrates integration with the Block Accessibility Checks plugin through:

- **Action Hooks**: `ba11yc_ready` for check registration
- **Filter Hooks**: `ba11yc.validateBlock` for validation logic
- **Registry API**: Programmatic check management with plugin detection
- **Settings API**: Automatic admin interface generation

## Customization

## Development

### Building the Plugin

```bash
# Install dependencies
npm install
composer install

# Development build with watch mode
npm run start

# Production build
npm run build

# Lint and format code
npm run lint
npm run format
```

### Block Attributes

Both blocks share the same attribute structure:

- `headingText` (string): The title/heading for the card
- `headingLevel` (number): The heading level (1-6, default: 2)
- `sourceUrl` (string): Reference link for credibility
- `releaseDate` (string): Release date information
- `description` (string): Detailed description content

## Customization

To adapt this example for your own blocks:

1. **Update block types** in `Functions/CheckAlbumCards.php` and `Functions/CheckMovieCards.php`
2. **Modify validation logic** in `src/scripts/checks/*-check.js`
3. **Adjust block attributes** in `src/blocks/*/block.json`
4. **Update text domain** and plugin information in `plugin.php`
5. **Customize error messages** and validation rules
6. **Add new helper components** in `src/scripts/helpers/`

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
