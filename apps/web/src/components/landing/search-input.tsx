"use client";

export default function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex-1 px-5 flex flex-col justify-center border-r border-[#eee]">
      <label className="text-xs font-bold text-[#888] mb-1 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-none outline-none text-base font-semibold text-venture-black w-full bg-transparent font-[family-name:var(--font-outfit)]"
      />
    </div>
  );
}
