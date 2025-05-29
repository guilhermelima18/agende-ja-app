import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useFormContext } from "react-hook-form";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";

import { useUserContext } from "@/contexts/user";
import { useAppointments } from "@/hooks/use-appointments";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";
import { Button } from "@/components/button";

import { getTodayDate, parseCustomDate } from "@/helpers/functions";
import { schedulingHours } from "@/helpers/constants";
import { AppNavigationRoutes } from "@/@types/app-navigation";

import { theme } from "@/styles/theme";

type RouteParams = {
  professionalId: string;
};

export function SchedulingStepThree() {
  const today = getTodayDate();

  const [dateSelected, setDateSelected] = useState(today);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { params } = useRoute();
  const { userLogged } = useUserContext();
  const { appointments, getAppointments, createAppointment } =
    useAppointments();

  const { professionalId } = params as RouteParams;

  const disabledDatesArray = useMemo(() => {
    if (!!appointments?.length && appointments?.length > 0) {
      return appointments.map((appointment) => appointment.scheduledAt);
    }

    return [];
  }, [appointments]);

  const hoursSelectAdapter = useMemo(() => {
    if (!!disabledDatesArray?.length && disabledDatesArray?.length > 0) {
      const disabledHours = disabledDatesArray.map((date) => {
        const parsed = parseCustomDate(date);

        return {
          date: format(parsed, "yyyy-MM-dd"),
          hour: format(parsed, "HH:mm:ss"),
        };
      });

      const scheduledHoursForDate = disabledHours
        .filter((item) => item.date === dateSelected)
        .map((item) => item.hour);

      const availableHours = schedulingHours.filter(
        (hour) => !scheduledHoursForDate.includes(hour.value)
      );

      return availableHours;
    }

    return schedulingHours;
  }, [disabledDatesArray, dateSelected]);

  async function onSubmitStepThree(data: any) {
    if (!data.hour) {
      return Alert.alert("Atenção!", "Selecione um horário.");
    }

    const [hours, minutes] = data.hour.split(":");
    const dateObject = new Date(
      `${data.date ? data.date : today}T${hours}:${minutes}:00Z`
    );
    const dateAndHourISOString = dateObject.toISOString();

    const response = await createAppointment({
      professionalId,
      serviceId: data.service,
      userId: userLogged.id,
      companyId: userLogged.companyId,
      scheduledAt: dateAndHourISOString,
      status: "PENDING",
    });

    if (response && response?.status === 201) {
      Alert.alert("Sucesso", "Seu horário foi agendado!", [
        {
          text: "OK",
          onPress: async () => {
            reset();
            navigate("appointments");
          },
        },
      ]);
    }
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
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 140, height: 140 }}
              source={require("../../assets/icons/logo-agende-ja.png")}
            />
          </View>

          <StepProgress progress={100} />
          <Text>Dia e horário</Text>

          <View style={{ marginTop: 10, flexDirection: "column", gap: 20 }}>
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

            <View style={{ marginTop: 10 }}>
              <Text>Selecione o horário:</Text>

              <Select
                name="hour"
                control={control}
                options={hoursSelectAdapter}
                placeholder="Selecione um horário"
              />
            </View>

            <Button
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmitStepThree)}
            >
              {isSubmitting ? (
                <ActivityIndicator animating color="#fff" />
              ) : (
                <Text style={{ color: theme.colors.white }}>
                  Finalizar agendamento
                </Text>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
