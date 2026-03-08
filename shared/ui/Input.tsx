interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-main2">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3 border border-sub3 rounded-lg text-sm text-main2 placeholder:text-sub2 outline-none focus:border-main1 transition-colors"
        {...props}
      />
    </div>
  );
}
