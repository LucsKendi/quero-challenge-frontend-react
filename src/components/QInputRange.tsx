import { FC, InputHTMLAttributes } from "react";
import QText from "./QText";

interface QInputRangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const QInputRange: FC<QInputRangeProps> = ({ label, min = 0, max = 1000, value = 0, onChange, ...rest }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange?.(newValue);
  };

  return (
    <>
      <QText tag="label" weight="light">
        {label}
      </QText>
      <input
        {...rest}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full mt-3 cursor-col-resize"
      />
    </>
  );
};

export default QInputRange;