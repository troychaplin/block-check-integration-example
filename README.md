# Block Check Integration Example

A comprehensive example plugin demonstrating how to integrate with Block Accessibility Checks.

This plugin serves as a reference implementation for developers who want to:
1. Add custom accessibility checks to their own blocks
2. Register checks that appear in the Block Accessibility Checks settings
3. Validate block attributes and post meta fields
4. Integrate with the visual feedback system

## Features

### Custom Blocks

- **Album Card Block** (`multi-block-checks-example/album-card`)
  - Displays an album cover, title, release date, and description
  - Includes multiple accessibility checks
- **Movie Card Block** (`multi-block-checks-example/movie-card`)
  - Displays a movie poster, title, release date, and description
  - Demonstrates shared validation logic across multiple block types

### Custom Post Type

- **Band Post Type** (`band`)
  - Custom post type for managing band information
  - Custom taxonomy (Genre) for categorizing bands
  - Three validated meta fields:
    - **City of Origin** (`band_origin`): Where the band originated
    - **Record Label** (`band_record_label`): The band's record label
    - **First Album** (`band_first_album`): The band's first album title
  - Custom plugin sidebar with validated meta fields
  - Demonstrates `useMetaField` hook integration

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

## Code Overview

### 1. Registering Blocks (PHP)

```php
// Functions/Register_Blocks.php
function register_blocks() {
    register_block_type( plugin_dir_path( __DIR__ ) . 'build/blocks/album-card' );
    register_block_type( plugin_dir_path( __DIR__ ) . 'build/blocks/movie-card' );
}
add_action( 'init', 'register_blocks' );
```

### 2. Registering Checks (PHP)

The example uses `register_check_with_plugin_detection()` for automatic plugin integration:

```php
// Functions/CheckAlbumCards.php
public function register_checks( $registry ) {
    $registry->register_check_with_plugin_detection(
        'multi-block-checks-example/album-card',
        'check_album_heading_text',
        array(
            'error_msg'   => __( 'Heading text is required.', 'multi-block-checks-example' ),
            'warning_msg' => __( 'Heading text is recommended.', 'multi-block-checks-example' ),
            'description' => __( 'Validates that the heading text is not empty.', 'multi-block-checks-example' ),
            'type'        => 'settings',
            'category'    => 'accessibility',
        )
    );
    // ... more checks
}
```

### 3. Implementing Validation Logic (JavaScript)

Validation logic runs in the editor via the `ba11yc_validate_block` filter:

```javascript
// src/scripts/checks/album-card-check.js
addFilter(
    'ba11yc_validate_block',
    'multi-block-checks-example/album-card-validation',
    (isValid, blockName, attributes, checkName) => {
        if (blockName !== 'multi-block-checks-example/album-card') {
            return isValid;
        }

        switch (checkName) {
            case 'check_album_heading_text':
                return !!(attributes.headingText && attributes.headingText.trim());
            // ... more checks
        }
        return isValid;
    }
);
```

### 4. Meta Field Validation (PHP)

Post meta validation is registered using helper methods:

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

### 5. Meta Field Validation (JavaScript)

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
            // ... more checks
        }

        return isValid;
    }
);
```

### 6. Custom Plugin Sidebar & Hook Integration

The example demonstrates using the `useMetaField` hook to automatically handle validation state:

```javascript
// src/scripts/sidebars/band-plugin-sidebar.js
import { useMetaField } from '../helpers/useMetaField';

const BandDetailsSidebar = () => {
    // Use the hook to get props for your field
    const originProps = useMetaField('band_origin', 'Enter the city of origin');

    return (
        <PluginSidebar name="band-details-sidebar" title="Band Details">
            <PanelBody>
                <TextControl
                    label="City of Origin"
                    {...originProps} 
                />
            </PanelBody>
        </PluginSidebar>
    );
};
```

### 7. Settings Integration

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
│   ├── scripts/
│   │   ├── checks/                      # JavaScript validation logic
│   │   │   ├── album-card-check.js      # Album card validation
│   │   │   ├── movie-card-check.js      # Movie card validation
│   │   │   ├── editor-checks.js         # Editor-level checks
│   │   │   └── meta-validation.js       # Meta field validation
│   │   ├── helpers/                     # Helper utilities
│   │   │   ├── useMetaField.js          # Meta field hook shim
│   │   │   └── useMetaField.md          # Hook documentation
│   │   └── sidebars/                    # Plugin sidebar components
│   │       └── band-plugin-sidebar.js   # Sidebar using useMetaField
├── block-check-integration-example.php  # Main plugin file
└── README.md                            # This file
```

## Key Takeaways

- **Separation of Concerns**: Register checks in PHP, implement validation logic in JavaScript
- **Shared Validation**: Reuse validation logic across similar blocks (e.g., album and movie cards)
- **Multiple Block Support**: Shared validation logic across block types
- **Meta Field Validation**: Post meta validation using `MetaValidation::required()`
- **Custom Plugin Sidebar**: Example sidebar with `useMetaField` hook integration
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
- **Hooks API**: `useMetaField` for automatic state management and validation display
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
