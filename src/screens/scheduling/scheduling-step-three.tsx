import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useFormContext } from "react-hook-form";
import { Calendar } from "react-native-calendars";

import { useUser } from "@/contexts/user";
import { useAppointments } from "@/hooks/use-appointments";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";

import { formatDate, formatHour, getTodayDate } from "@/helpers/functions";
import { AppNavigationRoutes } from "@/@types/app-navigation";
import { schedulingHours } from "@/helpers/constants";

type RouteParams = {
  professionalId: string;
};

export function SchedulingStepThree() {
  const today = getTodayDate();

  const [dateSelected, setDateSelected] = useState(today);

  const { control, handleSubmit } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { params } = useRoute();
  const { userLogged } = useUser();
  const { appointments, getAppointments } = useAppointments();

  const { professionalId } = params as RouteParams;

  const disabledDatesArray = useMemo(() => {
    if (!!appointments?.length && appointments?.length > 0) {
      return appointments.map((appointment) => appointment.scheduledAt);
    }

    return [];
  }, [appointments]);

  const disabledDates =
    !!disabledDatesArray?.length &&
    disabledDatesArray?.length > 0 &&
    disabledDatesArray.reduce((acc: any, date) => {
      const formattedDate = formatDate(date);
      acc[formattedDate] = {
        disabled: true,
        disableTouchEvent: true,
        selectedColor: "orange",
      };
      return acc;
    }, {});

  const hoursSelectAdapter = useMemo(() => {
    if (!!disabledDatesArray?.length && disabledDatesArray?.length > 0) {
      const disabledHours = disabledDatesArray.map((date) => {
        return formatHour(date);
      });

      const filteredSchedulingHours = schedulingHours.filter(
        (hour) => !disabledHours.includes(hour.value)
      );

      return filteredSchedulingHours;
    }

    return [];
  }, [disabledDatesArray]);

  function onSubmitStepThree(data: any) {
    if (!data.hour) {
      return Alert.alert("Atenção!", "Selecione um horário.");
    }

    const [hours, minutes] = data.hour.split(":");
    const dateObject = new Date(
      `${data.date ? data.date : today}T${hours}:${minutes}:00Z`
    );
    const dateAndHourISOString = dateObject.toISOString();

    const values = {
      ...data,
      date: data.date ? data.date : today,
    };

    console.log(values);
  }

  useEffect(() => {
    if (professionalId && userLogged?.companyId) {
      getAppointments({
        companyId: userLogged?.companyId,
        professionalId,
      });
    }
  }, [professionalId, userLogged?.companyId]);

  return (
    <Layout>
      <ScrollView>
        <View className="w-full flex-1 flex-col justify-center gap-4">
          <View className="w-full items-center mb-10">
            <Image
              className="w-40 h-40"
              source={require("../../assets/icons/logo-agende-ja.png")}
            />
          </View>

          <StepProgress progress={100} />
          <Text>Dia e horário</Text>

          <View className="mt-10">
            <View>
              <Text>Selecione a data:</Text>
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange } }) => (
                  <Calendar
                    onDayPress={(day: any) => {
                      onChange(day.dateString);
                      setDateSelected(day.dateString);
                    }}
                    current={dateSelected}
                    markedDates={{
                      ...disabledDates,
                      [dateSelected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: "purple",
                      },
                    }}
                  />
                )}
              />
            </View>

            <View className="mt-4">
              <Text>Selecione o horário:</Text>

              <Select
                name="hour"
                control={control}
                options={hoursSelectAdapter}
                placeholder="Selecione um horário"
              />
            </View>

            <Button
              mode="contained"
              className="mt-4"
              onPress={handleSubmit(onSubmitStepThree)}
            >
              Finalizar agendamento
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
