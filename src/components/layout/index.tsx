import { ReactNode } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { LogOut } from "lucide-react-native";

import { removeUserStorage } from "@/hooks/use-storage";
import { AppNavigationRoutes } from "@/@types/app-navigation";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const route = useRoute();
  const { navigate } = useNavigation<AppNavigationRoutes>();

  const onSignout = () => {
    removeUserStorage();
    navigate("sign-in");
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-4">
      {route.name !== "sign-in" && (
        <View className="w-full flex items-end mt-1">
          <Button mode="contained" onPress={onSignout}>
            <LogOut color="#fff" />
          </Button>
        </View>
      )}

      {children}
    </SafeAreaView>
  );
}
