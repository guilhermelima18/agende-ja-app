import { TextInput, TextInputProps } from "react-native";
import { theme } from "@/styles/theme";

type InputProps = TextInputProps & {};

export function Input({ ...props }: InputProps) {
  return (
    <TextInput
      style={{
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        borderRadius: 6,
        fontSize: theme.fontSizes.md,
      }}
      {...props}
    />
  );
}
