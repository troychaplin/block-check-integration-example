/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import {
	PanelBody,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Get ValidatedToolsPanelItem and MetaField from Block Accessibility Checks plugin
 */
const { ValidatedToolsPanelItem } = window.BlockAccessibilityChecks || {};
const { MetaField } = window.BlockAccessibilityChecks || {};

const BandDetailsSidebar = () => {
	// Get post type first, then conditionally get meta
	const { postType, bandOrigin } = useSelect(select => {
		const editor = select('core/editor');
		const currentPostType = editor.getCurrentPostType();

		// Only get meta if we're on the band post type
		if (currentPostType !== 'band') {
			return { postType: currentPostType };
		}

		const meta = editor.getEditedPostAttribute('meta') || {};

		return {
			postType: currentPostType,
			bandOrigin: meta.band_origin || '',
		};
	}, []);

	// Get the current meta values for band fields.
	const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta'));

	// Get the editPost function to update meta
	const { editPost } = useDispatch('core/editor');

	// Helper function to update a specific meta field
	const updateMeta = (key, value) => {
		editPost({ meta: { [key]: value } });
	};

	// Early return if not the band post type
	if (postType !== 'band') {
		return null;
	}

	// Record Label Field
	const originCityField = (
		<TextControl
			label={__('City of Origin')}
			value={bandOrigin}
			onChange={newValue => updateMeta('band_origin', newValue)}
			help={__(
				'Where the band originated from (e.g., "Los Angeles, CA", "London, UK")',
				'multi-block-checks-example'
			)}
		/>
	);

	// Record Label Field
	const recordLabelField = (
		<TextControl
			label={__('Record Label', 'multi-block-checks-example')}
			help={__(
				'The record label of the band (e.g., "Record Label Inc.", "Record Label LLC")',
				'multi-block-checks-example'
			)}
			value={meta?.band_record_label || ''}
			onChange={value => editPost({ meta: { ...meta, band_record_label: value } })}
		/>
	);

	// First Album Field
	const firstAlbumField = (
		<TextControl
			label={__('First Album', 'multi-block-checks-example')}
			help={__(
				'The first album of the band (e.g., "Album Title", "Album Title 2")',
				'multi-block-checks-example'
			)}
			value={meta?.band_first_album || ''}
			onChange={value => editPost({ meta: { ...meta, band_first_album: value } })}
		/>
	);

	// If Block Accessibility Checks plugin is not available, use standard ToolsPanelItem
	const ToolsPanelItemComponent = ValidatedToolsPanelItem || ToolsPanelItem;

	return (
		<PluginSidebar name="band-details-sidebar" title={__('Band Details')} icon={'format-audio'}>
			<ToolsPanel
				label="Validated ToolsPanelItem Example"
				resetAll={() =>
					editPost({
						meta: {
							band_origin: '',
						},
					})
				}
			>
				<ToolsPanelItemComponent
					metaKey="band_origin"
					hasValue={() => bandOrigin !== ''}
					label="City of Origin"
					onDeselect={() => updateMeta('band_origin', '')}
					isShownByDefault
				>
					{originCityField}
				</ToolsPanelItemComponent>
			</ToolsPanel>

			<PanelBody title={__('Wrapped Fields Example', 'multi-block-checks-example')}>
				{MetaField ? (
					<>
						<MetaField metaKey="band_record_label">{recordLabelField}</MetaField>
						<MetaField metaKey="band_first_album">{firstAlbumField}</MetaField>
					</>
				) : (
					<>
						{recordLabelField}
						{firstAlbumField}
					</>
				)}
			</PanelBody>
		</PluginSidebar>
	);
};

// Register the plugin.
registerPlugin('band-details-sidebar', { render: BandDetailsSidebar });
