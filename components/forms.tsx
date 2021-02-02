import { Info } from "react-feather";

const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");

export const MD: React.FC<{ markdown: string }> = ({ markdown }) => {
  return <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>;
};

export const Note: React.FC<{ text: string }> = ({ text }) => (
  <div className="p-2 text-sm text-gray-500 bg-gray-100 rounded-sm">
    <Info size={16} className="inline-block mr-1 -mt-1" />
    {text}
  </div>
);

export const Label: React.FC<{ note?: string; text: string }> = ({
  note,
  text,
}) => {
  return (
    <div className="space-y-1 text-sm">
      <label className="block font-bold text-gray-700">{text}</label>
      {note && <Note text={note} />}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InputProps<T = string | number> {
  id: string;
  note?: string;
  onChange: (value: T) => void;
  placeholder?: string;
  type?: "text" | "number";
  value: T;
}

export const Input: React.FC<InputProps> = ({
  id,
  note,
  onChange,
  placeholder,
  type = "text",
  value,
}) => {
  return (
    <div className="space-y-2">
      <input
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          const typed = type === "number" ? parseInt(value, 10) : value;
          onChange(typed);
        }}
        {...(placeholder && { placeholder })}
      />
      {note && <Note text={note} />}
    </div>
  );
};

export const Select: React.FC<{
  id: string;
  onChange: (o: string) => void;
  options: { [key: string]: string }[];
  value: string;
}> = ({ id, onChange, options }) => {
  return (
    <div className="relative">
      <select
        id={id}
        className="block w-full px-4 py-3 pr-8 leading-tight text-gray-400 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((v) => {
          const key = Object.keys(v)[0];
          return (
            <option value={key} key={key}>
              {v[key]}
            </option>
          );
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export const Error: React.FC<{
  name: string;
  errors: Record<string, string>;
  showErrors: boolean;
}> = ({ name, errors, showErrors }) => {
  if (showErrors && errors[name]) {
    return <p className="text-red-500">{errors[name]}</p>;
  }
  return null;
};
