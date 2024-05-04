import clsx from 'clsx';
import './FormSelect.css';

export type TSelectOption = {
	value: string | number,
	text: string,
};

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	className?: string
	label: string
	options: TSelectOption[]
};

export default function FormSelect({ className, label, options, ...props }: Props) {
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
