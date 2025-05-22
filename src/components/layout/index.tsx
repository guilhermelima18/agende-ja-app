import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
