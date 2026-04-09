import { Report, ToxicityType, ImpactLevel } from "@/types";

const BASE_MESSAGES = [
    { loggedBy: "player_hawk92", message: "You're absolute trash, uninstall the game." },
    { loggedBy: "player_nova11", message: "I'll find out where you live, watch yourself." },
    { loggedBy: "player_zed44", message: "This team is full of idiots, I'm throwing on purpose." },
    { loggedBy: "player_riku07", message: "Stop playing, you clearly have a disability." },
    { loggedBy: "player_storm", message: "ez noobs, reported all of you get banned lol." },
    { loggedBy: "player_cx99", message: "You people don't belong in this game." }
];

/**
 * Helper function that generates random date.
 * @returns a random ISOString converted date
 */
const getRandomDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    return date.toISOString();
}

/**
 * function to generate random 100+ data sets from provided sample
 * @returns 120 data sets from the sample
 */
export const generateMockReports = (): Report[] => {
    return Array.from({ length: 120 }, (_, i) => {
        const base = BASE_MESSAGES[i % BASE_MESSAGES.length];

        // Lets show a minor portion of entries as processed.
        const isProcessed = i < 20;

        return {
            id: `rep-${i + 1}`,
            loggedBy: `${base.loggedBy}_${i}`,
            message: base.message,
            status: isProcessed ? "processed" : "pending",
            taggingDetails: isProcessed ? {
                types: ["Toxic Behavior"] as ToxicityType[],
                impact: "Medium" as ImpactLevel,
                comment: "Automated pre-review for demonstration.",
                updatedBy: "System Moderator",
                processedAt: getRandomDate()
            } : undefined
        };
    })
}

export const MOCK_REPORTS = generateMockReports();