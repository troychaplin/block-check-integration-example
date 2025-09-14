import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	PlainText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToolbarGroup,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { heading, headingLevel2, headingLevel3, headingLevel4 } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes }) {
	const { headingText, headingLevel, link, excerpt } = attributes;
	const HeadingTag = `h${headingLevel || 2}`;

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
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Example Card Block Settings', 'multi-block-checks-example')}>
					<TextareaControl
						label="Content"
						onChange={value => setAttributes({ excerpt: value })}
						value={excerpt}
						help="Enter the main excerpt here"
					/>
					<TextControl
						label="Source URL"
						onChange={value => setAttributes({ link: value })}
						type="text"
						value={link}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<HeadingTag>
					<PlainText
						placeholder="Add a movie title..."
						style={{
							border: 'none',
							padding: '0',
							margin: '0',
							backgroundColor: 'transparent',
							resize: 'none',
							fontSize: 'inherit',
							fontWeight: 'inherit',
							lineHeight: 'inherit',
						}}
						onChange={value => setAttributes({ headingText: value })}
						value={headingText || ''}
					/>
				</HeadingTag>

				{excerpt && <p>{excerpt}</p>}

				{!excerpt && (
					<p>{__('Add excerpt in the sidebar…', 'multi-block-checks-example')}</p>
				)}

				{link && (
					<p>
						<a href={link}>{link}</a>
					</p>
				)}
				{!link && (
					<p>{__('Add link name in the sidebar…', 'multi-block-checks-example')}</p>
				)}
			</div>
		</>
	);
}
