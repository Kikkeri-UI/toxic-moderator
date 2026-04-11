import { useReports } from "@/hooks/use-reports"
import { StatsBar } from "@/components/dashboard/stats-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageTable } from "@/components/dashboard/message-queue";
import { ProcessedQueue } from "@/components/dashboard/processed-queue";
import { useMemo, useState } from "react"
import { TaggingModal } from "@/components/dashboard/tagging-modal"
import { TaggingFormValues } from "./lib/validations/tagging";

function App() {

  const { reports, stats, updateReport } = useReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  /**
   * Whenever the erports change, filter out tagged reports 
   * to be sent to the processed-queue component
   */
  const taggedReports = useMemo(() => {
    return reports.filter((report) => {
      if (report.status === "processed") {
        return report
      }
    })
  }, [reports])


  /**
   * Method responsible for setting the selected report
   * and opening the tagging modal
   * @param report report value of the selected report
   */
  const handleOpenTagModal = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };


  const handleTagSubmit = (id: string, values: TaggingFormValues) => {
    updateReport(id, values);
    console.log("Updated Report:", id, values);
  }

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
          <TabsTrigger value="queue" className="data-[state=active]: bg-background font-extrabold p-3 cursor-pointer">
            Active Queue
          </TabsTrigger>
          <TabsTrigger value="processed" className="data-[state=active]: bg-background font-extrabold p-3 cursor-pointer">
            Review History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <MessageTable reports={reports} onTag={handleOpenTagModal} />
        </TabsContent>
        <TabsContent value="processed">
          <ProcessedQueue reports={taggedReports} />
        </TabsContent>

      </Tabs>

      <TaggingModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTagSubmit}
      />

    </main>
  )
}

export default App
