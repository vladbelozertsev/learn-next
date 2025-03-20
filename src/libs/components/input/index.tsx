import { FieldError } from "react-hook-form";
import { InputHTMLAttributes, FC } from "react";
import { className } from "@/libs/helpers";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  $top?: string;
  $err?: FieldError;
  $div?: string;
};

export const Input: FC<Props> = (props) => {
  const { $div, $err, $top, ...inp } = props;
  const styles = getStyles({ $div });

  return (
    <div {...styles.div}>
      {!!inp.name && !!$top && (
        <label htmlFor={inp.name} {...styles.top}>
          {props.$top}
        </label>
      )}
      <input type="text" id={inp.name} {...styles.inp} {...inp} />
      {!!$err?.message && <span {...styles.err}>{$err?.message}</span>}
    </div>
  );
};

const getStyles = (prams: { $div?: string }) => {
  return className({
    div: `flex flex-col ${prams.$div ? prams.$div : ""}`,
    top: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    inp: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    err: "block mb-2 text-sm font-medium text-red-700 dark:text-white",
  });
};
