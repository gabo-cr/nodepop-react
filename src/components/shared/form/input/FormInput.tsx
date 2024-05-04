import clsx from "clsx";
import './FormInput.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label: string
};

export const FormInput = ({ className, label, ...props }: Props) => {
	if (props.type === 'checkbox') {
		return (
			<div className="formCheck">
				<input {...props} />
				<span>Recuérdame</span>
			</div>
		);
	}

	return (
		<div className={clsx('formField', className)}>
			<label className="label">{label}</label>
			<input className="input" autoComplete="off" {...props} />
		</div>
	);
};
