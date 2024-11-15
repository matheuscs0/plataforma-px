
import { InputProps } from "@/types/InputType"
import { forwardRef } from "react"

export const InputDefault = forwardRef<HTMLInputElement, InputProps>(
    ({ name = "", type, ...props }, ref) =>  {
    return(
        <div className="w-auto flex flex-col">
        {props.label && <label className="text-sm">{props.label}</label>}
          <input
            className="w-full h-[42px] border-[#6F76AB/20] border-solid rounded-md py-1 text-xs text-black text-top border outline-none mt-2 pl-3 shadow-sm"
            type={type}
            name={name}
            ref={ref}
            {...props}
          />
      </div>
    )
}
)