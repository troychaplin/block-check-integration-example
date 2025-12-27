import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { columns, gap, radius } = attributes;

	const blockProps = useBlockProps.save({
		style: {
			'--ba11y-check-example-card-grid-cols': String(columns),
			'--ba11y-check-example-card-grid-gap': `${gap}px`,
			'--ba11y-check-example-card-grid-radius': `${radius}px`,
		},
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
