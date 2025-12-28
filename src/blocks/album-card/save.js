import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { headingText, headingLevel, sourceUrl, releaseDate } = attributes;

	const renderHeading = () => {
		if (!headingText) {
			return null;
		}

		const HeadingTag = `h${headingLevel || 2}`;
		return <HeadingTag>{headingText}</HeadingTag>;
	};

	return (
		<div {...useBlockProps.save()}>
			{renderHeading()}
			{releaseDate && <p>{releaseDate}</p>}
			<InnerBlocks.Content />
			{sourceUrl && (
				<p>
					<a href={sourceUrl}>{sourceUrl}</a>
				</p>
			)}
		</div>
	);
}
