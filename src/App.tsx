import { useReports } from "@/hooks/use-reports"
import { StatsBar } from "@/components/dashboard/stats-bar";
//import './App.css'

function App() {

  const { reports, stats } = useReports();

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Moderator Dashboard</h1>
      </header>
      <StatsBar stats={stats} />

    </main>
  )
}

export default App
