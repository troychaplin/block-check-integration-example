import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	RichText,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarDropdownMenu, ToolbarButton, Popover } from '@wordpress/components';
import { heading, headingLevel2, headingLevel3, headingLevel4, link } from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { headingText, headingLevel, sourceUrl, excerpt } = attributes;
	const HeadingTag = `h${headingLevel || 2}`;
	const [isLinkOpen, setIsLinkOpen] = useState(false);

	const linkSettings = {
		url: sourceUrl,
		opensInNewTab: true,
	};

	const onLinkChange = value => {
		setAttributes({ sourceUrl: value.url || '' });
	};

	const HeadingRichText = () => (
		<RichText
			tagName={HeadingTag}
			placeholder="Add a movie title..."
			onChange={value => setAttributes({ headingText: value })}
			value={headingText || ''}
			allowedFormats={[]}
		/>
	);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={heading}
						label={__('Change heading level', 'multi-block-checks-example')}
						controls={[
							{
								title: __('Heading 2', 'multi-block-checks-example'),
								icon: headingLevel2,
								onClick: () => setAttributes({ headingLevel: 2 }),
								isActive: headingLevel === 2,
							},
							{
								title: __('Heading 3', 'multi-block-checks-example'),
								icon: headingLevel3,
								onClick: () => setAttributes({ headingLevel: 3 }),
								isActive: headingLevel === 3,
							},
							{
								title: __('Heading 4', 'multi-block-checks-example'),
								icon: headingLevel4,
								onClick: () => setAttributes({ headingLevel: 4 }),
								isActive: headingLevel === 4,
							},
						]}
					/>
					<ToolbarButton
						icon={link}
						label={
							sourceUrl
								? __('Edit link', 'multi-block-checks-example')
								: __('Add link', 'multi-block-checks-example')
						}
						onClick={() => setIsLinkOpen(true)}
						isPressed={!!sourceUrl}
						showTooltip
					/>
					{isLinkOpen && (
						<Popover position="bottom center" onClose={() => setIsLinkOpen(false)}>
							<LinkControl
								value={linkSettings}
								onChange={onLinkChange}
								onRemove={() => {
									setAttributes({ sourceUrl: '' });
									setIsLinkOpen(false);
								}}
							/>
						</Popover>
					)}
				</ToolbarGroup>
			</BlockControls>

			<div {...useBlockProps()}>
				{sourceUrl ? (
					<a href={sourceUrl} target="_blank" rel="noopener noreferrer">
						<HeadingRichText />
					</a>
				) : (
					<HeadingRichText />
				)}
				<RichText
					tagName="p"
					placeholder={`Add a short description of the movie.`}
					onChange={value => setAttributes({ excerpt: value })}
					value={excerpt}
					allowedFormats={['core/bold', 'core/italic']}
					disableLineBreaks={true}
				/>
			</div>
		</>
	);
}
