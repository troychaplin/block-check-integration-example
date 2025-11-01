/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import {
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

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

	return (
		<PluginSidebar name="band-details-sidebar" title={__('Band Details')} icon={'format-audio'}>
			<ToolsPanel
				label="Band Information"
				resetAll={() =>
					editPost({
						meta: {
							band_origin: '',
						},
					})
				}
			>
				<ToolsPanelItem
					hasValue={() => bandOrigin !== ''}
					label="City of Origin"
					onDeselect={() => updateMeta('band_origin', '')}
					isShownByDefault
				>
					<TextControl
						label={__('City of Origin')}
						value={bandOrigin}
						onChange={newValue => updateMeta('band_origin', newValue)}
						help={__(
							'Where the band originated from (e.g., "Los Angeles, CA", "London, UK")',
							'multi-block-checks-example'
						)}
					/>
				</ToolsPanelItem>
			</ToolsPanel>
		</PluginSidebar>
	);
};

// Register the plugin.
registerPlugin('band-details-sidebar', { render: BandDetailsSidebar });
