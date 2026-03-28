You are building a personal landing page for Ethan Carn, a student and builder.
Use all available tools in this project: UI UX Pro Max Skill for design system
generation, and the Stitch MCP server for UI design. The final output should be
a single Next.js page deployable to Vercel.

---

ABOUT ETHAN

Name: Ethan W. Carn
Role: Information Systems Student, BYU Marriott School of Business (graduating Apr 2027)
Emphasis: Data Analytics — STEM-Certified Technical Program
GPA: 3.98 | Full-tuition scholarship
Email: carn0@byu.edu
GitHub: https://github.com/ethanwcarn
LinkedIn: https://www.linkedin.com/in/ethan-carn

Bio (use this as the hero subheading or about section):
Data analytics specialist and Information Systems student at BYU. Strong technical
background in Python, SQL, Tableau, and full-stack development. Known for leading
large-scale events, designing databases for nonprofits, and building real products
that ship.

---

DESIGN INSTRUCTIONS

Step 1 — Activate UI UX Pro Max:
Use the UI UX Pro Max skill to generate a design system for this project before
writing any code. The product type is: personal portfolio landing page for a
student who builds technical projects and leads campus organizations. Style
priority: clean minimalism. Suppress AI purple/pink gradients and heavy
glassmorphism — keep it professional and understated.

Step 2 — Use Stitch MCP (if available):
Use the Stitch MCP server to design a high-fidelity single-page layout for a
personal landing page. The design should include: a hero section, an about/skills
section, a projects section with 4 cards, and a contact/links footer. Apply the
design system from Step 1 when generating the Stitch design. Extract the Design
DNA (colors, typography, spacing) from the Stitch output and save it to
DESIGN.md before writing any code.

Step 3 — Implement:
Build the landing page as a single Next.js page (app/page.tsx) using the design
system and Stitch output. Use Tailwind CSS. Do not use any UI component libraries.
Write clean, semantic HTML. The page must be fully responsive at 375px, 768px,
and 1440px breakpoints. No emojis as icons — use Lucide React for any iconography.
All interactive elements must have hover states with smooth 150-300ms transitions.

---

PAGE SECTIONS

1. HERO
   Headline: "Ethan Carn"
   Subheadline: "Information Systems @ BYU · Data Analytics · Builder"
   Brief intro: 1–2 sentences pulled from the bio above.
   CTA buttons: "View My Work" (scrolls to projects) and "Get In Touch"
   (scrolls to contact)

2. ABOUT / SKILLS
   Short paragraph about Ethan's background. Then display skills in two
   clean groups — no progress bars or percentage meters, just grouped labels:

   Development: Python, HTML/CSS, JavaScript, C#, VBA, AWS, Bootstrap, ML
   Data & BI: SQL, MySQL, PostgreSQL, Tableau, Advanced Excel

   One highlight stat row (keep it minimal, 3 stats max):
   - 3.98 GPA
   - 3,000+ volunteer hours
   - $30,000+ raised for students in need

3. PROJECTS (4 cards)
   Display as a clean 2x2 grid on desktop, single column on mobile.

   Card 1 — Ella Rises
   Description: Full-stack AWS-hosted website managing profiles and SQL databases
   for a nonprofit focused on girls in STEM.
   Link: https://www.ellarises.org/

   Card 2 — Brighter Destiny International
   Description: Designed and implemented a relational database system to track
   donor and participant records for an international nonprofit serving 60+
   students.
   Link: https://brighterdestiny.outgiven.org/

   Card 3 — BYU Student Alumni Hub
   Description: Led UI/UX development of BYU's alumni engagement and fundraising
   platform built on Brightspot, used by thousands of students and alumni.
   Link: https://studentalumni.byu.edu/

   Card 4 — Date Tracker
   Description: Full-stack JavaScript web app connected to Supabase to track
   dates, profiles, and relationship milestones.
   Link: https://stillwaters.alijahwhitney.dev/

4. CONTACT / FOOTER
   Section heading: "Let's Connect"
   Short line: "Open to internships, collaborations, and conversations."
   Display the following as clean icon + text link rows:
   - Email: carn0@byu.edu
   - GitHub: https://github.com/ethanwcarn
   - LinkedIn: https://www.linkedin.com/in/ethan-carn
   Footer note: "Built by Ethan Carn · 2026"

---

VERCEL DEPLOYMENT CHECKLIST

After the page is built, do the following before considering this task complete:

1. Confirm there is a valid next.config.js (or next.config.ts) at the project root.
2. Confirm the package.json build script is "next build".
3. Add a .env.local.example file with any environment variables used (even if
   there are none, create the file and note "No environment variables required").
4. Confirm all external links open in a new tab with target="_blank" and
   rel="noopener noreferrer".
5. Run a final check: no console errors, no broken image imports, no hardcoded
   localhost URLs.

---

CONSTRAINTS
- No placeholder images. Use CSS backgrounds, gradients, or solid color blocks
  where imagery would normally go.
- No lorem ipsum. All copy is provided above — use it exactly or lightly rewrite
  for tone, but do not invent facts.
- Keep the full page under 120KB of JavaScript (check with next build output).
- Accessibility: all interactive elements must have aria-labels where the visible
  label is insufficient.