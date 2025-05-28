import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { ArrowDown } from "lucide-react-native";
import { theme } from "@/styles/theme";

type OptionsProps = {
  label: string;
  value: string | number;
};

type SelectProps = {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionsProps[];
};

export function Select({
  name,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: theme.colors.gray[200],
              }}
              onPress={() => setModalIsOpen(!modalIsOpen)}
            >
              <Text
                style={{
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.gray[300],
                }}
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <ArrowDown size={16} color="#000" />
            </TouchableOpacity>

            <Modal
              visible={modalIsOpen}
              animationType="fade"
              transparent={true}
              onRequestClose={() => {}}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.gray[200],
                  flex: 1,
                  justifyContent: "center",
                  padding: 8,
                }}
                activeOpacity={1}
                onPress={() => setModalIsOpen(false)}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.white,
                    borderRadius: 6,
                    padding: 8,
                  }}
                  activeOpacity={1}
                >
                  <FlatList
                    contentContainerStyle={{ gap: 8 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          backgroundColor: theme.colors.gray[100],
                          padding: 12,
                          borderRadius: 6,
                        }}
                        onPress={() => {
                          onChange(item.value);
                          setModalIsOpen(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />
      {!!error && (
        <Text style={{ color: theme.colors.red[500], marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
