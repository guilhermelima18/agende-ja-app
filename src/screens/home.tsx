import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { CalendarCheck } from "lucide-react-native";

import { Layout } from "@/components/layout";
import { AppNavigationRoutes } from "@/@types/app-navigation";

export function Home() {
  const { navigate } = useNavigation<AppNavigationRoutes>();

  return (
    <Layout>
      <View className="w-full flex-1 flex-col items-center justify-center gap-8">
        <Image
          className="w-40 h-40"
          source={require("../assets/icons/logo-agende-ja.png")}
        />

        <Button
          mode="contained"
          onPress={() => navigate("scheduling-step-one")}
        >
          <View className="flex-row items-center justify-center gap-1">
            <CalendarCheck color="#fff" size={20} />
            <Text className="text-white">Agende seu horário</Text>
          </View>
        </Button>
      </View>
    </Layout>
  );
}
