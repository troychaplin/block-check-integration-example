import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, TextareaControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { heading, headingLevel, releaseDate, spotifyMusic, appleMusic, youtubeMusic } =
		attributes;

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
						]}
						onChange={value => setAttributes({ headingLevel: value })}
					/>
					<TextareaControl
						label="Release Date"
						onChange={value => setAttributes({ releaseDate: value })}
						value={releaseDate}
						help="Enter the main excerpt here"
					/>
					<TextControl
						label="Spotify URL"
						onChange={value => setAttributes({ spotifyMusic: value })}
						type="text"
						value={spotifyMusic}
					/>
					<TextControl
						label="Apple Music URL"
						onChange={value => setAttributes({ appleMusic: value })}
						type="text"
						value={appleMusic}
					/>
					<TextControl
						label="YouTube Music URL"
						onChange={value => setAttributes({ youtubeMusic: value })}
						type="text"
						value={youtubeMusic}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				{renderHeading()}
				{releaseDate && <p>{releaseDate}</p>}
				{!releaseDate && (
					<p>{__('Add release date in the sidebar…', 'multi-block-checks-example')}</p>
				)}
				{spotifyMusic && (
					<p>
						<a href={spotifyMusic}>{spotifyMusic}</a>
					</p>
				)}
				{!spotifyMusic && (
					<p>{__('Add Spotify URL in the sidebar…', 'multi-block-checks-example')}</p>
				)}
				{appleMusic && (
					<p>
						<a href={appleMusic}>{appleMusic}</a>
					</p>
				)}
				{!appleMusic && (
					<p>{__('Add Apple Music URL in the sidebar…', 'multi-block-checks-example')}</p>
				)}
			</div>
		</>
	);
}
