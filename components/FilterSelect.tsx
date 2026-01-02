"use client";

interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2 flex-1 md:w-40">
      <label className="text-sm font-semibold text-slate-700 ml-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 p-3 rounded-xl transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
