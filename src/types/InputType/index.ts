import { InputHTMLAttributes, ReactElement } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?:string;
  mask?: string
  helperText?: string | undefined
  placeholder?: string
  info? : string
  title?: string
  width?: string
  height?: string
  icon?: ReactElement
  icon2?: ReactElement
};
