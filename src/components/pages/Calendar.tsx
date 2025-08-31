import {
  Box,
  Heading,
  Select,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as RBCEvent,
  SlotInfo,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMeetings } from "../../hooks/useMeetings";
import { CalendarEvent } from "../../types";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { meetings } = useMeetings();
  const [view, setView] = useState<View>("month");

  const bg = useColorModeValue("gray.50", "gray.900");
  const calendarBg = useColorModeValue("white", "gray.800");

  const events: CalendarEvent[] = useMemo(() => {
    return meetings.map((meeting) => ({
      id: meeting.id,
      title: meeting.title,
      start: new Date(`${meeting.date}T${meeting.time}`),
      end: new Date(
        new Date(`${meeting.date}T${meeting.time}`).getTime() + 60 * 60 * 1000
      ),
      allDay: false,
      resource: meeting,
    }));
  }, [meetings]);

  const handleSelectEvent = (event: CalendarEvent & RBCEvent) =>
    console.log("Selected event:", event);
  const handleSelectSlot = (slotInfo: SlotInfo) =>
    console.log("Selected slot:", slotInfo);

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading color={useColorModeValue("gray.700", "gray.200")}>
          Calendar
        </Heading>
        <Select
          width="200px"
          value={view}
          onChange={(e) => setView(e.target.value as View)}
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="agenda">Agenda</option>
        </Select>
      </Flex>

      <Box
        bg={calendarBg}
        p={6}
        borderRadius="lg"
        boxShadow="base"
        height="70vh"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={(newView: View) => setView(newView)}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          style={{ height: "100%" }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#3182CE",
              borderRadius: "4px",
              opacity: 0.8,
              color: "white",
              border: "none",
            },
          })}
        />
      </Box>
    </Box>
  );
};

export default CalendarView;
