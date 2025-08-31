import { Grid, GridItem, Skeleton } from "@chakra-ui/react";
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
  data: StatsData | null;
  isLoading?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data, isLoading = false }) => {
  const gridTemplate = {
    base: "repeat(2, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  };

  if (isLoading) {
    return (
      <Grid templateColumns={gridTemplate} gap={{ base: 3, md: 6 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i}>
            <Skeleton height="120px" borderRadius="lg" />
          </GridItem>
        ))}
      </Grid>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Grid templateColumns={gridTemplate} gap={{ base: 3, md: 6 }}>
      <GridItem>
        <StatsCard
          title="Total Meetings"
          stat={data.totalMeetings.toString()}
          icon={FiCalendar}
          trend={{ value: 12, isPositive: true }}
          description="This month"
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Completed Agendas"
          stat={data.completedAgendas.toString()}
          icon={FiCheckCircle}
          trend={{ value: 8, isPositive: true }}
          description="87% completion rate"
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Pending Actions"
          stat={data.pendingActions.toString()}
          icon={FiAlertCircle}
          trend={{ value: 5, isPositive: false }}
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
          trend={{ value: 15, isPositive: true }}
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
