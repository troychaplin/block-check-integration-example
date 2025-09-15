import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	RichText,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarDropdownMenu,
	ToolbarButton,
	Popover,
	SelectControl,
} from '@wordpress/components';
import {
	heading,
	headingLevel2,
	headingLevel3,
	headingLevel4,
	link,
	calendar,
} from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { headingText, headingLevel, sourceUrl, releaseDate, description } = attributes;
	const HeadingTag = `h${headingLevel || 2}`;
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const [isDateOpen, setIsDateOpen] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedDay, setSelectedDay] = useState('');

	const formatDate = dateString => {
		if (!dateString) {
			return '';
		}

		const date = new Date(dateString);
		const month = date.toLocaleDateString('en-US', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();

		// Add ordinal suffix (st, nd, rd, th)
		const getOrdinalSuffix = num => {
			const lastDigit = num % 10;
			const lastTwoDigits = num % 100;

			if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
				return 'th';
			}

			switch (lastDigit) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
		};

		return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
	};

	// Generate month options
	const monthOptions = [
		{ label: 'January', value: '01' },
		{ label: 'February', value: '02' },
		{ label: 'March', value: '03' },
		{ label: 'April', value: '04' },
		{ label: 'May', value: '05' },
		{ label: 'June', value: '06' },
		{ label: 'July', value: '07' },
		{ label: 'August', value: '08' },
		{ label: 'September', value: '09' },
		{ label: 'October', value: '10' },
		{ label: 'November', value: '11' },
		{ label: 'December', value: '12' },
	];

	// Generate year options (1900 to current year)
	const currentYear = new Date().getFullYear();
	const yearOptions = [];
	for (let year = currentYear; year >= 1900; year--) {
		yearOptions.push({ label: year.toString(), value: year.toString() });
	}

	// Generate day options (1-31)
	const dayOptions = [];
	for (let day = 1; day <= 31; day++) {
		dayOptions.push({ label: day.toString(), value: day.toString().padStart(2, '0') });
	}

	const linkSettings = {
		url: sourceUrl,
		opensInNewTab: true,
	};

	const onLinkChange = value => {
		setAttributes({ sourceUrl: value.url || '' });
	};

	const onCustomDateChange = () => {
		if (selectedMonth && selectedYear && selectedDay) {
			const date = `${selectedYear}-${selectedMonth}-${selectedDay}`;
			setAttributes({ releaseDate: date });
			setIsDateOpen(false);
		}
	};

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
					{isDateOpen && (
						<Popover position="bottom center" onClose={() => setIsDateOpen(false)}>
							<div style={{ padding: '16px', minWidth: '280px' }}>
								<h4
									style={{
										margin: '0 0 16px 0',
										fontSize: '14px',
										fontWeight: '600',
									}}
								>
									Select Release Date
								</h4>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: '1fr 1fr 1fr',
										gap: '12px',
										marginBottom: '16px',
									}}
								>
									<div>
										<SelectControl
											label="Month"
											value={selectedMonth}
											options={[
												{ label: 'Month', value: '' },
												...monthOptions,
											]}
											onChange={setSelectedMonth}
											__nextHasNoMarginBottom
										/>
									</div>
									<div>
										<SelectControl
											label="Day"
											value={selectedDay}
											options={[{ label: 'Day', value: '' }, ...dayOptions]}
											onChange={setSelectedDay}
											__nextHasNoMarginBottom
										/>
									</div>
									<div>
										<SelectControl
											label="Year"
											value={selectedYear}
											options={[{ label: 'Year', value: '' }, ...yearOptions]}
											onChange={setSelectedYear}
											__nextHasNoMarginBottom
										/>
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										gap: '8px',
										justifyContent: 'flex-end',
									}}
								>
									<button
										onClick={() => setIsDateOpen(false)}
										style={{
											padding: '6px 12px',
											backgroundColor: 'transparent',
											color: '#646970',
											border: '1px solid #dcdcde',
											borderRadius: '3px',
											cursor: 'pointer',
											fontSize: '13px',
										}}
									>
										Cancel
									</button>
									<button
										onClick={onCustomDateChange}
										disabled={!selectedMonth || !selectedYear || !selectedDay}
										style={{
											padding: '6px 12px',
											backgroundColor:
												selectedMonth && selectedYear && selectedDay
													? '#007cba'
													: '#f0f0f1',
											color:
												selectedMonth && selectedYear && selectedDay
													? 'white'
													: '#a7aaad',
											border: 'none',
											borderRadius: '3px',
											cursor:
												selectedMonth && selectedYear && selectedDay
													? 'pointer'
													: 'not-allowed',
											fontSize: '13px',
										}}
									>
										Set Date
									</button>
								</div>
							</div>
						</Popover>
					)}
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
					{releaseDate && (
						<p>
							<em>Release Date: {formatDate(releaseDate)}</em>
						</p>
					)}
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
