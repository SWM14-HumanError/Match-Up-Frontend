interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
}

export default Input;