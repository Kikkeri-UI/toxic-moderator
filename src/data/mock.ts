import { Report } from "@/types";

const BASE_MESSAGES = [
    { loggedBy: "player_hawk92", message: "You're absolute trash, uninstall the game." },
    { loggedBy: "player_nova11", message: "I'll find out where you live, watch yourself." },
    { loggedBy: "player_zed44", message: "This team is full of idiots, I'm throwing on purpose." },
    { loggedBy: "player_riku07", message: "Stop playing, you clearly have a disability." },
    { loggedBy: "player_storm", message: "ez noobs, reported all of you get banned lol." },
    { loggedBy: "player_cx99", message: "You people don't belong in this game." }
];

/**
 * function to generate random 100+ data sets from provided sample
 * @returns 120 data sets from the sample
 */
// src/data/mock.ts
export const generateMockReports = (count: number): Report[] => {
    return Array.from({ length: count }, (_, i) => {
        const base = BASE_MESSAGES[i % BASE_MESSAGES.length];

        return {
            id: `rep-${i + 1}`,
            loggedBy: `player_${Math.random().toString(36).substring(7)}`,
            message: base.message,
            status: "pending",
        };
    });
};

export const MOCK_REPORTS = generateMockReports(120);