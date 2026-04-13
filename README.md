🛡️ Toxicity Moderator Dashboard
A high-performance, accessible, and type-safe moderation interface designed for processing system-flagged messages. This dashboard empowers moderators to categorize violations, assess severity, and maintain community safety with a streamlined, keyboard-friendly workflow.

🔗 Live Link: 
  Deployed using vercel. 
  Visit site here: https://moderator-dashboard-woad.vercel.app/

🚀 Quick Start

  Prerequisites
    Node.js: v18.0.0 or higher
    Package Manager: npm

  Setup instructions
    1. Clone the repository
    git clone https://github.com/Kikkeri-UI/toxic-moderator.git
    cd toxic-moderator

    2. Install dependencies
    npm install

    3. Run development server
    npm run dev

    4. Run test suite
    npm run test

🛠️ Tech Stack

  Technology            Purpose

  React 18              UI Library with concurrent rendering features
  TypeScript            Static type checking for robust data modeling
  Vite                  Linting-fast build tool
  Tailwind CSS          Utility-first styling
  Shadcn/UI             Radix-based accessible component prmitives
  React Hook Form       Performance optimized for state management
  Zod                   Schema validation 
  Vitest & RTL          Unit testing


⚖️ Design decisions

  1. Unified Report State Management:
    Instead of managing multiple arrays for "pending", "processed" and "invalid", I implemented a Centralized Data Store stratergy via theu useReports hook.

  2. Derived State Stats Bar
    The StatsBar numbers are calculated as derived state de=irectly from the main reports array.

  3. Accessible Tagging Workflow
    Usage of Shadcn ensured that the workflow is accessible using keyboard.

  4. Pagination for data:
    Since the data set is 120, I have opted for pagination over infinite scroll as pagination provides better information of data to moderators.
    I included a cutom usePagination hook, which ensured that pagination is available throughout the application, making it scalable.

🔮Future Roadmap:

  1. Bulk Actions: Allowing moderators to tag multiple messages at once.
  2. Persistance: Usage of local storage for data persitance and possibly even moving logic to backend and database.
  3. Dark Mode: Provides better readability for moderators.

Author: Sagar Bharadwaj K R
Contact: sagarbharadwaj98@gmail.com 