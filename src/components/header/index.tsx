import { Text, TouchableOpacity, View } from "react-native";
import { LogOut } from "lucide-react-native";

import { theme } from "@/styles/theme";

type HeaderProps = {
  title?: string;
};

export function Header({ title }: HeaderProps) {
  const onSignOut = () => {};

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: title ? "space-between" : "flex-end",
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      {title && (
        <Text
          style={{
            fontWeight: "600",
            fontSize: theme.fontSizes.xl,
            marginBottom: 20,
          }}
        >
          {title}
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.red[500],
          padding: 8,
          borderRadius: 6,
        }}
        onPress={onSignOut}
      >
        <LogOut color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
