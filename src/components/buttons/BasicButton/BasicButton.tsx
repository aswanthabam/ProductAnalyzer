import "./BasicButton.css";
import { ReactNode, FC, ButtonHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  btnType?: "submit" | "cancel";
};

const BasicButton: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick = null,
  btnType = "submit",
  ...props
}) => {
  return (
    <button
      className={"btn" + " btn_" + btnType}
      onClick={onClick ?? (() => {})}
      {...props}
    >
      {children}
    </button>
  );
};

export default BasicButton;
