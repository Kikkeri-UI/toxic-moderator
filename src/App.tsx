import { useReports } from "@/hooks/use-reports"
import { StatsBar } from "@/components/dashboard/stats-bar";
//import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageTable } from "@/components/dashboard/message-queue";

function App() {

  const { reports, stats } = useReports();

  console.log(reports)

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Moderator Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Review, categorize, and action reported player behavior.
        </p>
      </header>
      <StatsBar stats={stats} />
      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="mb-4 bg-muted/50 p-1">
          <TabsTrigger value="queue" className="data-[state=active]: bg-background font-extrabold p-3">
            Active Queue
          </TabsTrigger>
          <TabsTrigger value="processed" className="data-[state=active]: bg-background font-extrabold p-3">
            Review History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <MessageTable reports={reports} onTag={() => { console.log("Handle tagging") }} />
        </TabsContent>
        <TabsContent value="queue">
          {/** Processed queue goes here */}
        </TabsContent>

      </Tabs>

    </main>
  )
}

export default App
