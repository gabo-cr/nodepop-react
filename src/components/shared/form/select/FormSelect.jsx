import clsx from 'clsx';
import './FormSelect.css';

export default function FormSelect({ className, label, options, ...props }) {
	return (
		<div className={clsx('formSelect', className)}>
			<label className="label">{label}</label>
			<select className="select" name="tags" id="tags" {...props}>
				{
					!props.multiple &&
					<option value="">Selecciona una opción</option>
				}
				{
					options.map(({ value, text }, index) => (
						<option value={value} key={index}>{text}</option>
					))
				}
			</select>
		</div>
	);
}
