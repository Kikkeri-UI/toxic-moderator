import { useReports } from "@/hooks/use-reports"
import { StatsBar } from "@/components/dashboard/stats-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageTable } from "@/components/dashboard/message-queue";
import { ProcessedQueue } from "@/components/dashboard/processed-queue";
import { useMemo, useState } from "react"
import { TaggingModal } from "@/components/dashboard/tagging-modal"
import { TaggingFormValues } from "./lib/validations/tagging";
import { SearchComponent } from "./components/ui/SearchComponent";
import { useDebounce } from "./hooks/use-debounce";
import { FilterImpactComponent } from "./components/ui/FilterImpact";
import { FilterStatusComponent } from "./components/ui/FilterStatus";
import type { Report } from "@/types";

export default function App() {

  const { reports, stats, updateReport, rejectReport } = useReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

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

  const handleTagReject = (id: string, values: TaggingFormValues) => {
    rejectReport(id, values)
  }

  /**
   * The "Master Filter" logic.
   * Derives a subset of reports based on the combined criteria of:
   * 1. Debounced Search (Message content or Reporter name)
   * 2. Severity Impact (captured in taggingDetails)
   * 3. Current Workflow Status (Pending, Processed, or Invalid)
   * * This memo ensures that filtering is performant and only recalculates 
   * when the source data or filter criteria actually change.
   */
  const filteredMessages = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

    return reports.filter((report) => {
      // 1. Search Match
      const matchesSearch = normalizedSearch === "" ||
        report.message.toLowerCase().includes(normalizedSearch) ||
        report.loggedBy.toLowerCase().includes(normalizedSearch);

      // 2. Impact Match (Checking taggingDetails for processed/invalid reports)
      const matchesImpact = selectedImpact === "all" ||
        report.taggingDetails?.impact === selectedImpact;

      // 3. Status Match
      const matchesStatus = selectedStatus === "all" ||
        report.status === selectedStatus;

      return matchesSearch && matchesImpact && matchesStatus;
    });
  }, [reports, debouncedSearchTerm, selectedImpact, selectedStatus]);

  /**
   * Filters the already-filtered master list to isolate reports that
   * have been successfully processed/tagged.
   * * By deriving this from 'filteredMessages', we ensure that search queries 
   * and impact filters apply to the Processed Queue as well.
   */
  const processedMessages = useMemo(() =>
    filteredMessages.filter(r => r.status === "processed"),
    [filteredMessages]);

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Moderator Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Review, categorize, and action reported player behavior.
        </p>
      </header>
      <StatsBar stats={stats} />

      <section className="flex flex-col md:flex-row gap-4 items-end mb-6 bg-card p-4 rounded-xl border border-border shadow-sm">
        {/* Search Input (Debounced) */}
        <div className="flex-1 w-full">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Search</label>
          <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Dropdown Filters */}
        <div className="flex gap-2 w-full md:w-auto">
          <FilterImpactComponent onValueChange={setSelectedImpact} />
          <FilterStatusComponent onValueChange={setSelectedStatus} />
        </div>
      </section>
      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="mb-4 bg-muted/50 p-1">
          <TabsTrigger value="queue" className="data-[state=active]: bg-background font-extrabold p-3 cursor-pointer">
            Active Queue
          </TabsTrigger>
          <TabsTrigger value="processed" className="data-[state=active]: bg-background font-extrabold p-3 cursor-pointer">
            Processed Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <MessageTable reports={filteredMessages} onTag={handleOpenTagModal} />
        </TabsContent>
        <TabsContent value="processed">
          <ProcessedQueue reports={processedMessages} />
        </TabsContent>

      </Tabs>


      <TaggingModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTagSubmit}
        onReject={handleTagReject}
      />

    </main>
  )
}


