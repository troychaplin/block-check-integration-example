// WordPress dependencies
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	RichText,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { link, calendar } from '@wordpress/icons';
import { ToolbarGroup, ToolbarButton, Popover } from '@wordpress/components';

// Internal dependencies
import {
	formatDate,
	DateSelector,
	useDateSelector,
	parseDateComponents,
} from '../../scripts/helpers/date-selector';
import { HeadingLevelSelector } from '../../scripts/helpers/heading-selector';

export default function Edit({ attributes, setAttributes }) {
	const { headingText, headingLevel, sourceUrl, releaseDate, description } = attributes;
	const HeadingTag = `h${headingLevel || 2}`;
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const [isDateOpen, setIsDateOpen] = useState(false);

	// Use the date selector hook
	const {
		selectedMonth,
		selectedDay,
		selectedYear,
		setSelectedMonth,
		setSelectedDay,
		setSelectedYear,
		resetDateSelection,
	} = useDateSelector();

	// Parse existing releaseDate to populate date selector state
	useEffect(() => {
		if (releaseDate) {
			const { year, month, day } = parseDateComponents(releaseDate);
			setSelectedYear(year);
			setSelectedMonth(month);
			setSelectedDay(day);
		} else {
			// Reset date selector when no releaseDate
			resetDateSelection();
		}
	}, [releaseDate, resetDateSelection, setSelectedDay, setSelectedMonth, setSelectedYear]);

	const linkSettings = {
		url: sourceUrl,
		opensInNewTab: true,
	};

	const onLinkChange = value => {
		setAttributes({ sourceUrl: value.url || '' });
	};

	const onDateSet = date => {
		setAttributes({ releaseDate: date });
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<HeadingLevelSelector
						currentLevel={headingLevel}
						onLevelChange={level => setAttributes({ headingLevel: level })}
						availableLevels={[2, 3, 4]}
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
					<ToolbarButton
						icon={calendar}
						label={
							releaseDate
								? __('Edit release date', 'multi-block-checks-example')
								: __('Add release date', 'multi-block-checks-example')
						}
						onClick={() => setIsDateOpen(true)}
						isPressed={!!releaseDate}
						showTooltip
					/>
					<DateSelector
						isOpen={isDateOpen}
						onClose={() => setIsDateOpen(false)}
						selectedMonth={selectedMonth}
						selectedDay={selectedDay}
						selectedYear={selectedYear}
						onMonthChange={setSelectedMonth}
						onDayChange={setSelectedDay}
						onYearChange={setSelectedYear}
						onDateSet={onDateSet}
						title="Select Release Date"
						textDomain="multi-block-checks-example"
					/>
				</ToolbarGroup>
			</BlockControls>

			<article {...useBlockProps()}>
				<div>
					{sourceUrl ? (
						<a href={sourceUrl} target="_blank" rel="noopener noreferrer">
							<RichText
								tagName={HeadingTag}
								placeholder="Add a movie title..."
								onChange={value => setAttributes({ headingText: value })}
								value={headingText || ''}
								allowedFormats={[]}
							/>
						</a>
					) : (
						<RichText
							tagName={HeadingTag}
							placeholder="Add a movie title..."
							onChange={value => setAttributes({ headingText: value })}
							value={headingText || ''}
							allowedFormats={[]}
						/>
					)}
					{releaseDate && <p>Release Date: {formatDate(releaseDate)}</p>}
					<RichText
						tagName="p"
						placeholder={`Add a short description of the movie.`}
						onChange={value => setAttributes({ description: value })}
						value={description}
						allowedFormats={['core/bold', 'core/italic']}
						disableLineBreaks={true}
					/>
				</div>
			</article>
		</>
	);
}
