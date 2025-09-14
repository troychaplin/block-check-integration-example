import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading, headingLevel, link, excerpt } = attributes;

	const renderHeading = () => {
		if (!heading) {
			return null;
		}

		const HeadingTag = `h${headingLevel || 2}`;
		return <HeadingTag>{heading}</HeadingTag>;
	};

	return (
		<div {...useBlockProps.save()}>
			{renderHeading()}
			{excerpt && <p>{excerpt}</p>}
			{link && (
				<p>
					<a href={link}>{link}</a>
				</p>
			)}
		</div>
	);
}
