interface CheckboxProps {
  label: string;
  description: string;
  id: string;
  checked: boolean;
  colour: string;
}

export function Checkbox(props: CheckboxProps) {
  const { description, label, id, checked, colour } = props;

  return (
    <div className="relative flex items-start mb-2">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          checked={checked}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <div className="flex flex-row items-center gap-1">
          <label htmlFor={id} className="font-medium text-slate-100">
            {label}
          </label>
          <div className={`w-3 h-3 ${colour} rounded-full`}></div>
        </div>
        <p className="text-slate-500">{description}</p>
      </div>
    </div>
  );
}
