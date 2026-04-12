import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchComponent = ({ searchQuery, setSearchQuery }: any) => {


    return (
        <div className="relative w-full max-w-sm my-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card border-border"
            />
        </div>
    )
}

