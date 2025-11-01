import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, Button, SelectControl, Popover } from '@wordpress/components';
import {
	parseDateComponents,
	formatDate,
	getMonthOptions,
	getYearOptions,
} from '../helpers/date-selector';

// Custom Month/Year selector component
const MonthYearSelector = ({
	isOpen,
	onClose,
	selectedMonth,
	selectedYear,
	onMonthChange,
	onYearChange,
	onDateSet,
	title,
}) => {
	const isDateComplete = selectedMonth && selectedYear;

	const handleDateSet = () => {
		if (isDateComplete) {
			const date = `${selectedYear}-${selectedMonth}-01`; // Always use first day of month
			onDateSet(date);
			onClose();
		}
	};

	const handleClose = () => {
		onMonthChange('');
		onYearChange('');
		onClose();
	};

	if (!isOpen) {
		return null;
	}

	const monthOptions = getMonthOptions();
	const yearOptions = getYearOptions();

	return (
		<Popover position="bottom center" onClose={handleClose}>
			<div style={{ padding: '16px', minWidth: '280px' }}>
				<h4
					style={{
						margin: '0 0 16px 0',
						fontSize: '14px',
						fontWeight: '600',
					}}
				>
					{title}
				</h4>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '12px',
						marginBottom: '16px',
					}}
				>
					<div>
						<SelectControl
							label={__('Month', 'multi-block-checks-example')}
							value={selectedMonth}
							options={[
								{ label: __('Month', 'multi-block-checks-example'), value: '' },
								...monthOptions,
							]}
							onChange={onMonthChange}
							__nextHasNoMarginBottom
						/>
					</div>
					<div>
						<SelectControl
							label={__('Year', 'multi-block-checks-example')}
							value={selectedYear}
							options={[
								{ label: __('Year', 'multi-block-checks-example'), value: '' },
								...yearOptions,
							]}
							onChange={onYearChange}
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
						onClick={handleClose}
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
						{__('Cancel', 'multi-block-checks-example')}
					</button>
					<button
						onClick={handleDateSet}
						disabled={!isDateComplete}
						style={{
							padding: '6px 12px',
							backgroundColor: isDateComplete ? '#007cba' : '#f0f0f1',
							color: isDateComplete ? 'white' : '#a7aaad',
							border: 'none',
							borderRadius: '3px',
							cursor: isDateComplete ? 'pointer' : 'not-allowed',
							fontSize: '13px',
						}}
					>
						{__('Set Date', 'multi-block-checks-example')}
					</button>
				</div>
			</div>
		</Popover>
	);
};

const BandMetaPanel = () => {
	// Get the current meta values for band fields.
	const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta'));
	const origin = meta?.band_origin || '';
	const startDate = meta?.band_start_date || '';

	// Get the function to update the meta value.
	const { editPost } = useDispatch('core/editor');

	// Date selector state
	const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');

	// Only render the panel for the 'band' post type.
	const postType = useSelect(select => select('core/editor').getCurrentPostType());
	if (postType !== 'band') {
		return null;
	}

	// Handle date selection
	const handleDateSet = dateString => {
		editPost({ meta: { ...meta, band_start_date: dateString } });
		setIsDateSelectorOpen(false);
		setSelectedMonth('');
		setSelectedYear('');
	};

	// Parse existing date to populate the selector
	const existingDateComponents = parseDateComponents(startDate);
	const handleOpenDateSelector = () => {
		if (startDate) {
			setSelectedYear(existingDateComponents.year);
			setSelectedMonth(existingDateComponents.month);
		}
		setIsDateSelectorOpen(true);
	};

	return (
		<PluginDocumentSettingPanel
			name="band-meta-panel"
			title={__('Band Details', 'multi-block-checks-example')}
		>
			<TextControl
				label={__('City of Origin', 'multi-block-checks-example')}
				help={__(
					'Where the band originated from (e.g., "Los Angeles, CA", "London, UK")',
					'multi-block-checks-example'
				)}
				value={origin}
				onChange={value => editPost({ meta: { ...meta, band_origin: value } })}
			/>

			<div style={{ marginBottom: '16px' }}>
				<label
					htmlFor="band-start-date-button"
					style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
				>
					{__('Band Start Date', 'multi-block-checks-example')}
				</label>
				<Button
					id="band-start-date-button"
					variant="secondary"
					onClick={handleOpenDateSelector}
					style={{ width: '100%', justifyContent: 'flex-start' }}
				>
					{startDate
						? formatDate(startDate)
						: __('Select Month & Year', 'multi-block-checks-example')}
				</Button>
			</div>

			<MonthYearSelector
				isOpen={isDateSelectorOpen}
				onClose={() => {
					setIsDateSelectorOpen(false);
					setSelectedMonth('');
					setSelectedYear('');
				}}
				selectedMonth={selectedMonth}
				selectedYear={selectedYear}
				onMonthChange={setSelectedMonth}
				onYearChange={setSelectedYear}
				onDateSet={handleDateSet}
				title={__('Select Band Start Month & Year', 'multi-block-checks-example')}
			/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin('band-meta-panel-plugin', {
	render: BandMetaPanel,
});
