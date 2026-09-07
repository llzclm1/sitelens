export type TeardownReview = {
  slug: string;
  label: string;
  company: string;
  title: string;
  description: string;
  sourceUrl: string;
  reviewed: string;
  pageSays: { heading: string; copy: string };
  evidence: string[];
  read: { heading: string; copy: string };
  recommendation: { heading: string; copy: string };
  actions: Array<{ label: string; title: string; copy: string }>;
};

export const teardownReviews: Record<string, TeardownReview> = {
  linear: {
    slug: "linear",
    label: "PUBLIC TEARDOWN / LINEAR",
    company: "Linear",
    title: "Linear makes product work feel like a system.",
    description: "A review of Linear's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://linear.app/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "The product development system for teams and agents.",
      copy: "Linear opens with a category promise for planning and building products. It then explains the product through AI, intake, planning, and shipping.",
    },
    evidence: [
      "The hero names product development, teams, and agents in one sentence.",
      "The page groups the experience into intake, planning, AI and automations, and build/review/ship.",
      "Linear states that it powers more than 40,000 product teams and shows customer quotes from OpenAI, Ramp, and Opendoor.",
    ],
    read: {
      heading: "The category is clear, but the product has several starting points.",
      copy: "A product team can quickly understand the ambition. A smaller team may still need to decide whether to start with issue tracking, planning, customer feedback, or the new agent workflows.",
    },
    recommendation: {
      heading: "Give each visitor a first workflow after the hero.",
      copy: "Keep the system promise, then offer a short path for a team that wants to plan, triage feedback, or ship with agents. That gives visitors a useful first step.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Keep the system promise", copy: "The category line tells visitors what kind of system Linear wants to be before the feature map begins." },
      { label: "02 / CLARITY", title: "Name the first workflow", copy: "Help a new team choose the most relevant starting point without exploring every product area." },
      { label: "03 / TRUST", title: "Use proof beside the choice", copy: "Place team scale and customer evidence where a visitor decides which workflow to explore." },
    ],
  },
  notion: {
    slug: "notion",
    label: "PUBLIC TEARDOWN / NOTION",
    company: "Notion",
    title: "Notion sells one workspace through several jobs.",
    description: "A review of Notion's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://www.notion.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "Where teams and agents think together.",
      copy: "Notion leads with a workspace promise. It then explains the product through capturing context, finding answers, and automating busywork with AI.",
    },
    evidence: [
      "The page presents Notion AI, agents, meeting notes, enterprise search, knowledge base, docs, and projects as connected product areas.",
      "The primary actions are Get Notion free and Request a demo, with examples such as product feedback triage and support tickets.",
      "Notion uses a trust signal that 98% of the Forbes Cloud 100 trusts the product and includes customer quotes.",
    ],
    read: {
      heading: "The homepage sells one system through several jobs.",
      copy: "The range of products is easy to see, but a first-time visitor may not know whether Notion is primarily a knowledge base, a project tool, or an AI work layer for their team.",
    },
    recommendation: {
      heading: "Let visitors choose a job before they choose a plan.",
      copy: "After the broad promise, route visitors through a small set of jobs such as centralizing knowledge, managing projects, or automating team work. That gives the platform a clearer entry point.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Keep the one-system idea", copy: "The shared-workspace promise gives the many product areas a reason to sit together." },
      { label: "02 / CLARITY", title: "Organize by job to be done", copy: "A visitor should see their immediate problem before scanning the full product catalog." },
      { label: "03 / TRUST", title: "Attach proof to each job", copy: "Use customer stories and the existing adoption signal near the workflow each visitor is considering." },
    ],
  },
  vercel: {
    slug: "vercel",
    label: "PUBLIC TEARDOWN / VERCEL",
    company: "Vercel",
    title: "Vercel leads with infrastructure for apps and agents.",
    description: "A review of Vercel's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://vercel.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "Agentic infrastructure to ship apps and agents.",
      copy: "Vercel's current homepage puts the Agent Stack first. It then connects that offer to a core platform for delivery, compute, security, workflows, and observability.",
    },
    evidence: [
      "The page separates Agent Stack, Core Platform, and Tools before presenting the main promise.",
      "The hero offers Deploy now and Talk to sales, followed by paths for coding agents, sandboxed VMs, and autonomous error investigation.",
      "Customer proof includes Notion, Zapier, and Mintlify with specific scale statements and product feature groups.",
    ],
    read: {
      heading: "The infrastructure category is strong, but the buyer path is broad.",
      copy: "A technical visitor can map the product to agents, apps, or platform hosting. A team evaluating a single use case may still have to infer which of the Agent Stack, Core Platform, or Tools is the right entry point.",
    },
    recommendation: {
      heading: "Turn the product map into a decision map.",
      copy: "Keep the infrastructure claim, then ask whether the visitor is building an AI app, deploying a web product, or operating a multi-tenant platform. Each answer can lead to one focused proof point.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Own the infrastructure category", copy: "The infrastructure line gives Vercel a clear position beyond generic hosting." },
      { label: "02 / CLARITY", title: "Route by build job", copy: "Translate the product taxonomy into the three decisions most visitors are trying to make." },
      { label: "03 / TRUST", title: "Show evidence at the decision", copy: "Place scale examples beside the use case they prove instead of leaving proof at the end of the page." },
    ],
  },
  figma: {
    slug: "figma",
    label: "PUBLIC TEARDOWN / FIGMA",
    company: "Figma",
    title: "Figma uses one canvas for more than design.",
    description: "A review of Figma's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://www.figma.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "The intelligent canvas for infinite creativity.",
      copy: "Figma frames the homepage around a shared product-development workspace. It then connects design, code, AI, collaboration, and its product family.",
    },
    evidence: [
      "The page gives visitors paths for design and exploration, building and shipping products, and a long product navigation.",
      "The first-screen promise is followed by design tools, development tools, and an AI-native canvas with shared context.",
      "Figma cites that 95% of the Fortune 500 uses Figma, with the data dated March 2025, and shows recognizable customer logos.",
    ],
    read: {
      heading: "The canvas metaphor unifies the suite, but the product choice comes later.",
      copy: "The homepage is persuasive for an existing design audience. A new visitor may still need to identify whether to start with Figma Design, FigJam, Dev Mode, or one of the newer AI and site products.",
    },
    recommendation: {
      heading: "Make the first product choice visible sooner.",
      copy: "Keep the creative canvas as the umbrella. Then offer a simple entry path by role or job so a designer, developer, or product team can recognize the next click immediately.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Keep the canvas umbrella", copy: "The shared canvas gives a growing suite a recognizable product idea." },
      { label: "02 / CLARITY", title: "Route by role or job", copy: "Help visitors choose between design, collaboration, and build workflows before the full suite appears." },
      { label: "03 / TRUST", title: "Date and place the proof", copy: "The Fortune 500 signal is useful; connect it to the role or workflow it validates." },
    ],
  },
  slack: {
    slug: "slack",
    label: "PUBLIC TEARDOWN / SLACK",
    company: "Slack",
    title: "Slack makes conversation the entry point for work.",
    description: "A review of Slack's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://slack.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "All your people and AI agents working together.",
      copy: "Slack opens with a people-and-agents promise, then shows how conversations connect to knowledge, people, process, and platform work.",
    },
    evidence: [
      "The hero pairs team communication with Slackbot and gives visitors Get started and Find your plan as the first actions.",
      "The page turns the product into four recognizable jobs: knowledge, people, process, and platform.",
      "Public proof includes customer logos, an Anthropic quote, and product usage or survey figures that are dated in the page footnotes.",
    ],
    read: {
      heading: "The conversation metaphor makes a broad platform approachable.",
      copy: "A team can understand the starting point quickly. A buyer evaluating search, automation, or external collaboration may still need to choose which job deserves attention first.",
    },
    recommendation: {
      heading: "Keep conversation as the entry point, then route by job.",
      copy: "The page already has useful knowledge, people, process, and platform groupings. Bring one of those choices closer to the first action so a visitor can recognize the most relevant path.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Own the work conversation", copy: "The first sentence gives the product a human starting point before the AI and platform layers appear." },
      { label: "02 / CLARITY", title: "Route by the work to be done", copy: "Search, automation, projects, and client work are clearer entry points than a complete feature inventory." },
      { label: "03 / TRUST", title: "Date the supporting proof", copy: "The page uses substantial proof; keeping its footnotes visible helps a skeptical buyer understand what each number represents." },
    ],
  },
  webflow: {
    slug: "webflow",
    label: "PUBLIC TEARDOWN / WEBFLOW",
    company: "Webflow",
    title: "Webflow connects visual building to a growth workflow.",
    description: "A review of Webflow's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://webflow.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "Build for what's next.",
      copy: "Webflow promises every team the tools to build, manage, and grow a website. The page then routes marketing, design, engineering, and agency visitors through specific work.",
    },
    evidence: [
      "The hero uses Get started and Talk to Sales, followed by visible paths for marketing, design, engineering, and agencies.",
      "The page connects visual design, publishing, conversion optimization, collaboration, AI search, and site operations in one platform story.",
      "Customer stories place concrete outcomes next to named companies, including pipeline, publishing speed, and page migration examples.",
    ],
    read: {
      heading: "The audience routing prevents a platform story from becoming one vague promise.",
      copy: "The page is strongest when it pairs a team with a job. As the platform expands into AEO, AI, analytics, and apps, the number of possible starting points also grows.",
    },
    recommendation: {
      heading: "Make the team-to-outcome path the main navigation logic.",
      copy: "Keep the broad platform promise, but make each audience path state its first measurable job. This helps a visitor understand why the next section exists before scanning the product map.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Lead with the website outcome", copy: "Build, manage, and grow gives the product a practical promise beyond a visual editor category." },
      { label: "02 / CLARITY", title: "Pair every capability with a team", copy: "Team labels turn a large platform into a set of recognizable decisions for the visitor." },
      { label: "03 / TRUST", title: "Keep story metrics attached to context", copy: "The customer stories are more persuasive when the outcome, timeframe, and starting problem appear together." },
    ],
  },
  hubspot: {
    slug: "hubspot",
    label: "PUBLIC TEARDOWN / HUBSPOT",
    company: "HubSpot",
    title: "HubSpot turns a large suite into customer-growth paths.",
    description: "A review of HubSpot's homepage. Each recommendation points to something visible on the page.",
    sourceUrl: "https://www.hubspot.com/",
    reviewed: "2026-09-07",
    pageSays: {
      heading: "Unite marketing, sales, and customer service on one agentic customer platform.",
      copy: "HubSpot frames the product as a connected customer platform, then lets visitors enter through hubs, use cases, team size, AI agents, and customer proof.",
    },
    evidence: [
      "The homepage offers free and demo actions while the navigation separates Marketing, Sales, Service, Content, Data, Revenue, CRM, and Agent products.",
      "The page also provides use-case paths such as generating leads, building pipeline, scaling support, and growing sales for small businesses.",
      "Public proof includes a stated customer count, logos, case studies, and outcome figures, each presented as part of the company's own customer evidence.",
    ],
    read: {
      heading: "Use cases keep the platform from reading like a product catalog.",
      copy: "A visitor can choose a team or business problem instead of reading every Hub. The remaining challenge is deciding which entry path should own the first conversion for a broad audience.",
    },
    recommendation: {
      heading: "Make one customer problem the default starting point.",
      copy: "Keep the suite and its navigation, but choose one primary growth decision after the hero. The other hubs can remain visible as supporting paths rather than competing first actions.",
    },
    actions: [
      { label: "01 / POSITIONING", title: "Use the connected-platform idea", copy: "It explains why several hubs belong together and gives the suite a single business outcome." },
      { label: "02 / CLARITY", title: "Let problems outrank products", copy: "Generate leads, close deals, and retain customers are easier first choices than an ungrouped list of software hubs." },
      { label: "03 / TRUST", title: "Separate company proof from page promise", copy: "Customer counts and case studies support scale; specific use-case proof should sit beside the team decision it validates." },
    ],
  },
};
