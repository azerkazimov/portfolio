import DashboardContent from "@/features/dashboard/components/dashboard-content";
import servicesAPI from "@/features/services/service/api.services";

export default async function Dashboard() {
  const servicesData = await servicesAPI.getAllServices();

  return <DashboardContent services={servicesData} />;
}