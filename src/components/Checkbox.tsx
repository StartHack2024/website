interface CheckboxProps {
  label: string;
  description: string;
}

export function Checkbox(props: CheckboxProps) {
  const { description, label } = props;

  return (
    <div className="relative flex items-start mb-2">
      <div className="flex h-6 items-center">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="comments" className="font-medium text-slate-100">
          {label}
        </label>
        <p id="comments-description" className="text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
