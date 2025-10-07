import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, DatePicker } from '@wordpress/components';

const BandMetaPanel = () => {
	const [date, setDate] = useState(new Date());

	// Get the current meta values for band fields.
	const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta'));
	const origin = meta?.band_origin || '';

	// Get the function to update the meta value.
	const { editPost } = useDispatch('core/editor');

	// Only render the panel for the 'band' post type.
	const postType = useSelect(select => select('core/editor').getCurrentPostType());
	if (postType !== 'band') {
		return null;
	}

	return (
		<PluginDocumentSettingPanel
			name="band-meta-panel"
			title={__('Band Details', 'multi-block-checks-example')}
		>
			<TextControl
				label={__('City of Origin', 'multi-block-checks-example')}
				help={__(
					'Where the band originated from (e.g., "Los Angeles, CA", "London, UK")',
					'multi-block-checks-example'
				)}
				value={origin}
				onChange={value => editPost({ meta: { ...meta, band_origin: value } })}
			/>
			<DatePicker currentDate={date} onChange={newDate => setDate(newDate)} />
		</PluginDocumentSettingPanel>
	);
};

registerPlugin('band-meta-panel-plugin', {
	render: BandMetaPanel,
});
