import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

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
    <View className="w-full mt-1">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity
              className="w-full border border-gray-500 h-14 flex-row items-center justify-between p-4 rounded-md"
              onPress={() => setModalIsOpen(!modalIsOpen)}
            >
              <Text>
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color="#000" />
            </TouchableOpacity>

            <Modal
              visible={modalIsOpen}
              animationType="fade"
              transparent={true}
              onRequestClose={() => {}}
            >
              <TouchableOpacity
                className="bg-gray-200 flex-1 justify-center"
                activeOpacity={1}
                onPress={() => setModalIsOpen(false)}
              >
                <TouchableOpacity
                  className="bg-white m-3 rounded-md p-2"
                  activeOpacity={1}
                >
                  <FlatList
                    contentContainerStyle={{ gap: 8 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="bg-gray-100 px-2 py-4 rounded-md"
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
      {!!error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
}
