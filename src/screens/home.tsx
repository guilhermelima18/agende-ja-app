import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CalendarCheck } from "lucide-react-native";

import { useUserContext } from "@/contexts/user";

import { Layout } from "@/components/layout";
import { AppNavigationRoutes } from "@/@types/app-navigation";
import { Button } from "@/components/button";
import { theme } from "@/styles/theme";
import { Header } from "@/components/header";

export function Home() {
  const navigation = useNavigation<AppNavigationRoutes>();
  const { userLogged } = useUserContext();

  return (
    <Layout>
      <Header />
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Image
          style={{ width: 140, height: 140 }}
          source={require("../assets/icons/logo-agende-ja.png")}
        />

        {userLogged && userLogged?.role === "admin" && (
          <Button onPress={() => navigation.push("appointments")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CalendarCheck color="#fff" size={20} />
              <Text style={{ color: theme.colors.white }}>Ver horários</Text>
            </View>
          </Button>
        )}

        {userLogged && userLogged?.role === "user" && (
          <Button onPress={() => navigation.push("scheduling-step-one")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CalendarCheck color="#fff" size={20} />
              <Text style={{ color: theme.colors.white }}>
                Agende seu horário
              </Text>
            </View>
          </Button>
        )}
      </View>
    </Layout>
  );
}
