import { Grid, GridItem, Skeleton, useBreakpointValue } from "@chakra-ui/react";
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import StatsCard from "./StatsCard";

interface StatsData {
  totalMeetings: number;
  completedAgendas: number;
  pendingActions: number;
  upcomingMeetings: number;
  participantEngagement: number;
  averageMeetingDuration: string;
}

interface StatsGridProps {
  data: StatsData | null;
  isLoading?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data, isLoading = false }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
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
          //   compact={isMobile}
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Completed Agendas"
          stat={data.completedAgendas.toString()}
          icon={FiCheckCircle}
          trend={{ value: 8, isPositive: true }}
          description="87% completion rate"
          //   compact={isMobile}
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Pending Actions"
          stat={data.pendingActions.toString()}
          icon={FiAlertCircle}
          trend={{ value: 5, isPositive: false }}
          description="Needs attention"
          //   compact={isMobile}
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Upcoming Meetings"
          stat={data.upcomingMeetings.toString()}
          icon={FiClock}
          description="Next 7 days"
          //   compact={isMobile}
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Participant Engagement"
          stat={`${data.participantEngagement}%`}
          icon={FiUsers}
          trend={{ value: 15, isPositive: true }}
          description="Higher than average"
          //   compact={isMobile}
        />
      </GridItem>

      <GridItem>
        <StatsCard
          title="Avg. Duration"
          stat={data.averageMeetingDuration}
          icon={FiTrendingUp}
          description="Per meeting"
          //   compact={isMobile}
        />
      </GridItem>
    </Grid>
  );
};

export default StatsGrid;
