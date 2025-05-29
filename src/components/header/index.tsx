import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut } from "lucide-react-native";

import { removeUserStorage } from "@/hooks/use-storage";

import { AppNavigationRoutes } from "@/@types/app-navigation";
import { theme } from "@/styles/theme";

type HeaderProps = {
  title?: string;
};

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation<AppNavigationRoutes>();

  const onSignOut = async () => {
    await removeUserStorage();
    navigation.push("sign-in");
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: title ? "space-between" : "flex-end",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {title && (
        <View
          style={{
            paddingBottom: 1,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.gray[700],
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: theme.fontSizes.xl,
            }}
          >
            {title}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.red[500],
          padding: 12,
          borderRadius: 6,
        }}
        onPress={onSignOut}
      >
        <LogOut color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
