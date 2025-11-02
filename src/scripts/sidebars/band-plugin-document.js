import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl } from '@wordpress/components';

/**
 * Get MetaField from Block Accessibility Checks plugin
 */
const { MetaField } = window.BlockAccessibilityChecks || {};

const BandMetaPanel = () => {
	// Get the current meta values for band fields.
	const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta'));

	// Get the function to update the meta value.
	const { editPost } = useDispatch('core/editor');

	// Only render the panel for the 'band' post type.
	const postType = useSelect(select => select('core/editor').getCurrentPostType());
	if (postType !== 'band') {
		return null;
	}

	// Field content
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

	return (
		<PluginDocumentSettingPanel
			name="band-meta-panel"
			title={__('Band Details', 'multi-block-checks-example')}
		>
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
		</PluginDocumentSettingPanel>
	);
};

registerPlugin('band-meta-panel-plugin', {
	render: BandMetaPanel,
});
