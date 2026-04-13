🛡️ Toxicity Moderator Dashboard:
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

  React 19,      
  TypeScript,            
  Vite,                 
  Tailwind CSS,          
  Shadcn/UI,           
  React Hook Form,       
  Zod,                   
  Vitest & RTL,          

✨ Features & Bonus Accomplishments
  This project implements all core requirements along with several advanced "Bonus" features to demonstrate senior-level proficiency in React and System Design.

    ✅ Core Functionality
      1. Centralized Message Queue: Efficiently manage system-flagged messages with real-time state updates.

      2. Comprehensive Tagging System: Standardized violation categorization using a custom-built modal interface.

      3. Report Invalidation: Ability to dismiss false positives with a "Mark Invalid" workflow, including mandatory justification.

    🌟 Bonus Features Implemented
      1. Unit & Integration Test Suite: Full coverage for critical logic (hooks, form validation, and stats calculation) using Vitest and React       Testing Library.

      2. Dynamic Advanced Filtering: Filter the message queue by both Toxicity Type and Impact Level to prioritize high-risk content.

      3. Advanced Data Visualization: Real-time Tagged vs. Untagged counters in the Stats Bar, derived directly from the application state.

      4. Color-Coded Severity System: Visual impact indicators (Low, Medium, High, Critical) using a semantic design system to aid moderator decision-making.

      5. Custom Pagination: High-performance data slicing using a custom usePagination hook, ensuring smooth UI performance even with large datasets.

      6. Mobile-First Responsive Layout: A fully adaptive grid-based design that maintains usability across mobile, tablet, and desktop viewports.

      7. Extensible Taxonomy: A "Custom Label" feature that allows moderators to define new toxicity types on the fly, which are then persisted in the UI for the remainder of the session.

🔮Future Roadmap:

  1. Bulk Actions: Allowing moderators to tag multiple messages at once.
  2. Persistance: Usage of local storage for data persitance and possibly even moving logic to backend and database.
  3. Dark Mode: Provides better readability for moderators.

Author: Sagar Bharadwaj K R
Contact: sagarbharadwaj98@gmail.com 
