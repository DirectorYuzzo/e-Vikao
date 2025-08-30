import { Grid, GridItem } from "@chakra-ui/react";
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import StatsCard from "./StatsCard";
import { StatsData } from "../../types";

interface StatsGridProps {
  data: StatsData;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      <GridItem>
        <StatsCard
          title="Total Meetings"
          stat={data.totalMeetings.toString()}
          icon={FiCalendar}
          description="This month"
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Completed Agendas"
          stat={data.completedAgendas.toString()}
          icon={FiCheckCircle}
          description="87% completion rate"
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Pending Actions"
          stat={data.pendingActions.toString()}
          icon={FiAlertCircle}
          description="Needs attention"
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Upcoming Meetings"
          stat={data.upcomingMeetings.toString()}
          icon={FiClock}
          description="Next 7 days"
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Participant Engagement"
          stat={`${data.participantEngagement}%`}
          icon={FiUsers}
          description="Higher than average"
        />
      </GridItem>
      <GridItem>
        <StatsCard
          title="Avg. Duration"
          stat={data.averageMeetingDuration}
          icon={FiTrendingUp}
          description="Per meeting"
        />
      </GridItem>
    </Grid>
  );
};

export default StatsGrid;
