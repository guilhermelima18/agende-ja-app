import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView className="bg-white flex-1 px-4">{children}</SafeAreaView>
  );
}
