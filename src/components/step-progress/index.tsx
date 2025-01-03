import { View } from "react-native";

type StepProgressProps = {
  progress: number;
};

export function StepProgress({ progress }: StepProgressProps) {
  return (
    <View className="w-full">
      <View style={{ width: `${progress}%` }} className={`bg-purple-500 h-2`} />
    </View>
  );
}
