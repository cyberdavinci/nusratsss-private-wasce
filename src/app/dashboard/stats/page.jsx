// import UserStatsOverview from "./stats/components/user-stats-overview";
// import UserDemographics from "./stats/components/user-demographics";
// import EnrollmentTrends from "./stats/components/enrollment-trends";
// import SchoolDistribution from "./stats/components/school-distribution";
// import { StatsHeader } from "./stats/components/stats-header";
// import { StatsTabs } from "./stats/components/stats-tabs";

import EnrollmentTrends from "@/components/stats/enrollment-trends";
import SchoolDistribution from "@/components/stats/school-distribution";
import { StatsHeader } from "@/components/stats/stats-header";
import { StatsTabs } from "@/components/stats/stats-tabs";
import UserDemographics from "@/components/stats/user-demographics";
import UserStatsOverview from "@/components/stats/user-stats-overview";

export default function StatsPage() {
  return (
    <div className="flex min-h-screen h-full w-full flex-col bg-gray-950 text-gray-100">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <StatsHeader />

        <div className="mt-6">
          <StatsTabs
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: <UserStatsOverview />,
              },
              {
                id: "demographics",
                label: "Demographics",
                content: <UserDemographics />,
              },
              {
                id: "registrations",
                label: "Registrations",
                content: <EnrollmentTrends />,
              },
              {
                id: "schools",
                label: "Schools",
                content: <SchoolDistribution />,
              },
            ]}
            defaultTab="overview"
          />
        </div>
      </div>
    </div>
  );
}
