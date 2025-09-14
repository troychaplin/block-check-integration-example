import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, TextareaControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { heading, headingLevel, link, excerpt } = attributes;

	const renderHeading = () => {
		if (!heading) {
			return <p>Add header in the sidebar…</p>;
		}

		const HeadingTag = `h${headingLevel || 2}`;
		return <HeadingTag>{heading}</HeadingTag>;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Example Card Block Settings', 'multi-block-checks-example')}>
					<TextControl
						label="Heading"
						onChange={value => setAttributes({ heading: value })}
						type="text"
						value={heading}
					/>
					<SelectControl
						label="Heading Level"
						value={headingLevel}
						options={[
							{
								label: 'Header Two',
								value: 2,
							},
							{
								label: 'Header Three',
								value: 3,
							},
							{
								label: 'Header Four',
								value: 4,
							},
						]}
						onChange={value => setAttributes({ headingLevel: value })}
					/>
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
				{renderHeading()}
				{excerpt && <p>{excerpt}</p>}
				{!excerpt && <p>{__('Add excerpt in the sidebar…', 'multi-block-checks-example')}</p>}
				{link && (
					<p>
						<a href={link}>{link}</a>
					</p>
				)}
				{!link && <p>{__('Add link name in the sidebar…', 'multi-block-checks-example')}</p>}
			</div>
		</>
	);
}
