import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../header";

type LayoutProps = {
  showHeader?: boolean;
  headerTitle?: string;
  children: ReactNode;
};

export function Layout({
  showHeader = true,
  headerTitle,
  children,
}: LayoutProps) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      {showHeader && <Header title={headerTitle} />}
      {children}
    </SafeAreaView>
  );
}
