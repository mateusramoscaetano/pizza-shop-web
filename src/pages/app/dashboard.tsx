import { Helmet } from "react-helmet-async";

interface IDashboardProps {}

export function Dashboard({}: IDashboardProps) {
  return (
    <>
      <Helmet title="Dashboard" />
      <h1>dashboard</h1>
    </>
  );
}
