import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { theme } from "@/styles/theme";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  backgroundColor?: string;
};

export function Button({ children, backgroundColor, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor
          ? backgroundColor
          : theme.colors.green[500],
        width: "100%",
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
      }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
