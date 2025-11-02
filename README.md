# Block Check Integration Example

A complete working example demonstrating how to integrate custom blocks and post types with the [Block Accessibility Checks](https://wordpress.org/plugins/block-accessibility-checks/) plugin. This repository shows developers how to add accessibility validation and real-time checks to their custom blocks and post meta fields using the Block Accessibility Checks Developer API.

## Overview

This example plugin demonstrates:

- **Custom Block Creation**: Two example blocks (Album Card and Movie Card) with accessibility-focused attributes
- **Block Accessibility Check Registration**: PHP integration to register custom block validation rules
- **Custom Post Type with Meta Validation**: Band post type with validated meta fields (Origin, Record Label, First Album)
- **JavaScript Validation**: Real-time validation logic for both blocks and post meta
- **Custom Editor Sidebars**: Plugin sidebar with validated meta field components
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

### Custom Post Type

- **Band Post Type** (`band`)
  - Custom post type for managing band information
  - Custom taxonomy (Genre) for categorizing bands
  - Three validated meta fields:
    - **City of Origin** (`band_origin`): Where the band originated
    - **Record Label** (`band_record_label`): The band's record label
    - **First Album** (`band_first_album`): The band's first album title
  - Custom plugin sidebar with validated meta field components
  - Demonstrates both `ValidatedToolsPanelItem` and `MetaField` wrapper components

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

### Meta Field Validation

The example also implements meta field validation for the Band post type:

1. **City of Origin** (`band_origin`)
   - Validates that the band's city of origin is provided
   - Registered using `MetaValidation::required()`
   - Configurable via admin settings

2. **Record Label** (`band_record_label`)
   - Validates that the band's record label is provided
   - Registered using `MetaValidation::required()`
   - Configurable via admin settings

3. **First Album** (`band_first_album`)
   - Validates that the band's first album is provided
   - Registered using `MetaValidation::required()`
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

### Usage

Once activated, the plugin provides:

- **Album Card & Movie Card Blocks**: Available in the block inserter for creating validated content cards
- **Band Post Type**: A new "Bands" menu item in the WordPress admin with validated meta fields
- **Settings Pages**: Configure validation levels under **Block Checks → Multi-Block Check Example**

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
    'ba11yc_validate_block',
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

### 3. Meta Field Validation (PHP)

Post meta fields are validated using the `MetaValidation` class:

```php
// Functions/Post_Type.php
use BlockAccessibility\MetaValidation;

register_meta(
    'post',
    'band_origin',
    array(
        'single'            => true,
        'type'              => 'string',
        'show_in_rest'      => true,
        'object_subtype'    => 'band',
        'sanitize_callback' => 'sanitize_text_field',
        'validate_callback' => MetaValidation::required(
            'band',
            'band_origin',
            array(
                'error_msg'   => __( 'City of Origin is required.', 'multi-block-checks-example' ),
                'warning_msg' => __( 'City of Origin is recommended.', 'multi-block-checks-example' ),
                'description' => __( 'The city where the band originated', 'multi-block-checks-example' ),
                'type'        => 'settings',
            )
        ),
    )
);
```

### 4. Meta Field Validation (JavaScript)

Client-side validation for meta fields uses the `ba11yc_validate_meta` filter:

```javascript
// src/scripts/checks/meta-validation.js
addFilter(
    'ba11yc_validate_meta',
    'multi-block-checks-example/validation',
    (isValid, value, postType, metaKey, checkName) => {
        if (postType !== 'band') {
            return isValid;
        }

        switch (metaKey) {
            case 'band_origin':
                if (checkName === 'required') {
                    return !!(value && value.trim());
                }
                break;
            case 'band_record_label':
                if (checkName === 'required') {
                    return !!(value && value.trim());
                }
                break;
            case 'band_first_album':
                if (checkName === 'required') {
                    return !!(value && value.trim());
                }
                break;
        }

        return isValid;
    }
);
```

### 5. Custom Plugin Sidebar

The example includes a custom plugin sidebar with validated meta field components:

```javascript
// src/scripts/sidebars/band-plugin-sidebar.js
const { ValidatedToolsPanelItem } = window.BlockAccessibilityChecks || {};
const { MetaField } = window.BlockAccessibilityChecks || {};

// Using ValidatedToolsPanelItem in a ToolsPanel
<ValidatedToolsPanelItem
    metaKey="band_origin"
    hasValue={() => bandOrigin !== ''}
    label="City of Origin"
    onDeselect={() => updateMeta('band_origin', '')}
    isShownByDefault
>
    {originCityField}
</ValidatedToolsPanelItem>

// Using MetaField wrapper component
<MetaField metaKey="band_record_label">
    {recordLabelField}
</MetaField>
```

### 6. Settings Integration

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
│   ├── Post_Type.php                    # Band post type and meta field registration
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
│   │   │   ├── meta-validation.js       # Meta field validation
│   │   │   └── movie-card-check.js      # Movie Card validation
│   │   ├── helpers/
│   │   │   ├── date-selector.js         # Date picker component
│   │   │   └── heading-selector.js      # Heading level selector
│   │   └── sidebars/
│   │       └── band-plugin-sidebar.js   # Band post type plugin sidebar
│   ├── editor-script.js                 # Editor initialization
│   └── frontend-script.js               # Frontend initialization
├── build/                               # Compiled assets
├── plugin.php                           # Main plugin file
├── package.json                         # Node.js dependencies
├── composer.json                        # PHP dependencies
└── webpack.config.js                    # Build configuration
```

## Key Features Demonstrated

- **Real-time Validation**: Accessibility checks run as users edit content for both blocks and post meta
- **Visual Feedback**: Error/warning indicators in the block editor and meta field components
- **Publishing Control**: Error-level checks prevent publishing for both block and meta validation
- **Flexible Configuration**: Admin settings for each validation rule (blocks and meta fields)
- **Multiple Block Support**: Shared validation logic across block types
- **Meta Field Validation**: Post meta validation using `MetaValidation::required()`
- **Custom Plugin Sidebar**: Example sidebar with `ValidatedToolsPanelItem` and `MetaField` components
- **Custom Post Type**: Band post type with custom taxonomy and validated meta fields
- **Modern Build Process**: Webpack-based asset compilation with WordPress Scripts
- **Plugin Detection**: Uses `register_check_with_plugin_detection()` for better integration

## Integration Points

This example demonstrates integration with the Block Accessibility Checks plugin through:

- **Action Hooks**: `ba11yc_ready` for check registration
- **Filter Hooks**: 
  - `ba11yc_validate_block` for block validation logic
  - `ba11yc_validate_meta` for post meta validation logic
- **Registry API**: Programmatic check management with plugin detection
- **Meta Validation API**: `MetaValidation::required()` for post meta field validation
- **UI Components**: 
  - `ValidatedToolsPanelItem` for ToolsPanel integration
  - `MetaField` wrapper component for automatic validation display
- **Settings API**: Automatic admin interface generation for both block and meta checks

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

### Post Meta Fields

The Band post type includes three validated meta fields:

- `band_origin` (string): City where the band originated (e.g., "Los Angeles, CA", "London, UK")
- `band_record_label` (string): The band's record label
- `band_first_album` (string): Title of the band's first album

These fields are displayed in a custom plugin sidebar and include real-time validation feedback.

## Customization

To adapt this example for your own blocks and post types:

### For Custom Blocks:

1. **Update block types** in `Functions/CheckAlbumCards.php` and `Functions/CheckMovieCards.php`
2. **Modify validation logic** in `src/scripts/checks/*-check.js`
3. **Adjust block attributes** in `src/blocks/*/block.json`
4. **Customize error messages** and validation rules

### For Custom Post Types:

1. **Create your post type** in `Functions/Post_Type.php`
2. **Register meta fields** with `MetaValidation::required()` validation
3. **Add JavaScript validation** in `src/scripts/checks/meta-validation.js`
4. **Create a plugin sidebar** in `src/scripts/sidebars/` with validated components
5. **Use `ValidatedToolsPanelItem`** for ToolsPanel integration
6. **Use `MetaField` wrapper** for automatic validation display

### General:

1. **Update text domain** and plugin information in `plugin.php`
2. **Add new helper components** in `src/scripts/helpers/`
3. **Configure validation levels** in the WordPress admin under Block Checks

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
