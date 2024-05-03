import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label: string
};

export const FormInput = ({ className, label, ...props }: Props) => {
	return (
		<div className={clsx('formField', className)}>
			<label className="formField-label">{label}</label>
			<input className="formField-input" autoComplete="off" {...props} />
		</div>
	);
};
