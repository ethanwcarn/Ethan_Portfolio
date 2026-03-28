# Graphic Design AI Tools — Windows Installation Guide

> **Tools covered:** Google Stitch MCP Server · UI UX Pro Max Skill · Nano Banana · 21st Agents SDK
>
> **Compatible IDEs:** Cursor · Antigravity · Claude Code

---

## Global Prerequisites

Before installing any tool, make sure the following are on your Windows machine.

### Node.js 18+

Download and run the installer from https://nodejs.org (choose the LTS version).

Verify after install by opening **Command Prompt** or **PowerShell**:

```
node --version
npm --version
```

### Python 3.x

```
winget install Python.Python.3.12
```

Or download manually from https://python.org/downloads. During installation, check **"Add Python to PATH"** — this is critical on Windows.

Verify:

```
python --version
```

> **Note:** On Windows, the command is `python` not `python3`. Commands in this guide that reference `python3` should be run as `python` on Windows.

### Git

```
winget install Git.Git
```

Or download from https://git-scm.com. Accept all defaults during setup.

Verify:

```
git --version
```

---

---

## Tool 1: Google Stitch MCP Server

**Official docs:** https://stitch.withgoogle.com/docs/mcp/setup

Google Stitch is an experimental AI design tool from Google Labs powered by Gemini 2.5 Pro. It generates full UI designs and frontend HTML/CSS from natural language prompts. The Stitch MCP Server connects it to your coding agent so you can fetch design screens, extract design tokens (colors, fonts, spacing), and scaffold production-ready code without leaving your IDE.

---

### Step 1: Create a Stitch Account and API Key

1. Go to https://stitch.withgoogle.com and sign in with your Google account.
2. Click your profile picture in the top-right corner and select **Stitch Settings**.
3. Navigate to the **API Keys** section and click **Create Key**.
4. Copy the key immediately and store it somewhere safe. You will need it in Step 4.

> The Stitch API is free to use. You do need a Google Cloud project, but no billing is required for basic usage.

---

### Step 2: Install the Google Cloud CLI (gcloud)

Open **PowerShell as Administrator** and run:

```powershell
winget install Google.CloudSDK
```

After installation, close and reopen PowerShell, then verify:

```
gcloud --version
```

---

### Step 3: Authenticate and Enable the Stitch API

Run each of these in order. Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID (find it at https://console.cloud.google.com).

```
gcloud auth login
```

```
gcloud config set project YOUR_PROJECT_ID
```

```
gcloud auth application-default set-quota-project YOUR_PROJECT_ID
```

```
gcloud beta services mcp enable stitch.googleapis.com --project=YOUR_PROJECT_ID
```

> If you do not have a Google Cloud project yet, create one at https://console.cloud.google.com/projectcreate. The project ID is the short identifier shown below the project name.

---

### Step 4: Add the MCP Server Config to Your IDE

The config block is the same across all IDEs. Find your IDE's MCP config file and add the following JSON:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "YOUR_PROJECT_ID"
      }
    }
  }
}
```

**Config file locations on Windows:**

| IDE | Config file path |
|---|---|
| Cursor | `.cursor\mcp.json` in your project root, or `%USERPROFILE%\.cursor\mcp.json` for global |
| Claude Code | `%USERPROFILE%\.claude\claude_desktop_config.json` |
| Antigravity | In the Agent window, click the 3-dot menu, select **MCP Servers**, search for "Stitch", and install. Paste your API key when prompted. No manual config file editing needed. |

---

### Step 5: Verify

Restart your IDE, open the agent chat, and type:

```
List my Stitch projects
```

If the agent returns your project list (or an empty list if you have none yet), the connection is working.

---

### Using Stitch MCP

Once connected, prompt your agent naturally:

```
Use the Stitch MCP to design a landing page for a fitness app
```

```
Fetch my LaunchPad project from Stitch and extract the color palette, then generate a DESIGN.md file
```

```
Use Stitch MCP to generate a mobile onboarding screen, then implement it in React + Tailwind
```

---

---

## Tool 2: UI UX Pro Max Skill

**GitHub:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

UI UX Pro Max is an AI skill that gives your coding agent design intelligence. Before writing any code, it automatically generates a complete design system tailored to your product type — including color palette, typography, UI style, component guidelines, and anti-patterns to avoid. It ships with 161 industry reasoning rules, 67 UI styles, 57 font pairings, and 99 UX guidelines.

---

### Step 1: Install the CLI

Open Command Prompt or PowerShell and run:

```
npm install -g uipro-cli
```

Verify:

```
uipro --version
```

---

### Step 2: Install the Skill into Your Project

Navigate to your project folder:

```
cd C:\path\to\your\project
```

Then run the init command for your IDE:

```
uipro init --ai cursor
```

```
uipro init --ai antigravity
```

```
uipro init --ai claude
```

To install for all supported IDEs at once:

```
uipro init --ai all
```

> The CLI handles all file placement automatically. You do not need to clone the GitHub repo manually. It creates the correct folder structure (`.cursor\`, `.claude\`, etc.) and skill files inside your project.

---

### Alternative: Claude Marketplace Install (Claude Code only)

If you are using Claude Code, you can install directly from within the IDE using two slash commands:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
```

```
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

---

### Step 3: Verify

Open your project in the IDE and start a new chat. The skill activates automatically when you ask for UI work:

```
Build a landing page for my SaaS product
```

The agent will first output a full design system recommendation, then generate the code.

For IDEs that use workflow mode (Kiro, GitHub Copilot, Roo Code), use the slash command:

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

---

### Updating the Skill

```
uipro update
```

---

### Optional: Run the Design System Generator Directly

You can generate a design system from the terminal without involving the agent:

```
python .claude\skills\ui-ux-pro-max\scripts\search.py "beauty spa wellness" --design-system -p "Serenity Spa"
```

> On Windows, use backslashes in the path. Also use `python` instead of `python3`.

---

---

## Tool 3: Nano Banana

**GitHub:** https://github.com/gemini-cli-extensions/nanobanana

Nano Banana is a Gemini CLI extension for AI image generation and editing. It supports text-to-image, image editing, image restoration, icon generation (with multiple size outputs), seamless pattern/texture creation, visual storytelling sequences, and technical diagram generation.

> **Important:** Nano Banana is a Gemini CLI extension. It does NOT install directly into Cursor, Claude, or Antigravity as a plugin. It runs inside the Gemini CLI in your terminal. You can use it alongside those IDEs by running it from Command Prompt or PowerShell. All generated images are saved locally to `.\nanobanana-output\` in your current directory.

---

### Step 1: Get a Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Sign in with your Google account.
3. Click **Create API Key** and copy it.

---

### Step 2: Install Gemini CLI

```
npm install -g @google/gemini-cli
```

Verify:

```
gemini --version
```

---

### Step 3: Set Your API Key

**Command Prompt (current session only):**

```
set NANOBANANA_API_KEY=your-api-key-here
```

**PowerShell (current session only):**

```powershell
$env:NANOBANANA_API_KEY="your-api-key-here"
```

**To make it permanent on Windows:**

1. Open **Start**, search for **Environment Variables**, and click **Edit the system environment variables**.
2. Click **Environment Variables**.
3. Under **User variables**, click **New**.
4. Set Variable name: `NANOBANANA_API_KEY` and Variable value: your key.
5. Click OK and restart any open terminals.

---

### Step 4: Install the Nano Banana Extension

```
gemini extensions install https://github.com/gemini-cli-extensions/nanobanana
```

Restart Gemini CLI after this step.

---

### Step 5: Verify

Open Gemini CLI:

```
gemini
```

Then run a quick test inside the session:

```
/generate "a minimalist logo for a tech startup"
```

The image will be saved to `.\nanobanana-output\` in your current directory.

---

### Available Commands

| Command | What it does |
|---|---|
| `/generate` | Create images from a text prompt |
| `/edit` | Modify an existing image with a prompt |
| `/restore` | Enhance or repair old/damaged photos |
| `/icon` | Generate app icons and favicons at multiple sizes |
| `/pattern` | Create seamless patterns and background textures |
| `/story` | Generate a sequential visual story or tutorial |
| `/diagram` | Generate flowcharts, architecture diagrams, wireframes |
| `/nanobanana` | Open-ended natural language image generation |

---

### Example Commands

```
/generate "mountain landscape" --styles="watercolor,oil-painting" --count=4
```

```
/icon "coffee cup logo" --sizes="64,128,256" --type="app-icon" --preview
```

```
/pattern "geometric triangles" --type="seamless" --colors="duotone"
```

```
/diagram "user login flow" --type="flowchart" --style="professional" --preview
```

```
/edit my_photo.png "change the background to a beach scene"
```

---

### Switching Models

Nano Banana 2 (`gemini-3.1-flash-image-preview`) is the default. To use the Pro model, set the environment variable before launching gemini:

**Command Prompt:**

```
set NANOBANANA_MODEL=gemini-3-pro-image-preview
gemini
```

**PowerShell:**

```powershell
$env:NANOBANANA_MODEL="gemini-3-pro-image-preview"
gemini
```

---

---

## Tool 4: 21st Agents SDK

**Documentation:** https://21st.dev/agents/docs

21st Agents is a production-ready SDK for deploying AI agents in web applications. It handles the runtime, sandboxing, streaming, session management, cost tracking, and a built-in chat UI. You define your agent in a config file, deploy it with one command, and embed it in any Next.js app. It supports Claude and OpenAI models.

> **What this tool is for:** 21st Agents is a per-project deployment SDK, not an IDE plugin or MCP server. Install it inside a specific project when you want to ship an AI-powered feature in a web app.

---

### Step 1: Create a 21st.dev Account and Get an API Key

1. Go to https://21st.dev/agents/app and sign up.
2. Once logged in, navigate to the dashboard.
3. Create an API key and copy it.

---

### Step 2: Install the SDK Packages

Navigate to your project root and install:

```
npm install @21st-sdk/agent @21st-sdk/nextjs @21st-sdk/react @21st-sdk/node @ai-sdk/react ai zod
```

---

### Step 3: Define Your Agent

Create `src\agent.ts` in your project:

```typescript
import { agent, tool } from "@21st-sdk/agent"
import { z } from "zod"

export default agent({
  model: "claude-sonnet-4-6",
  systemPrompt: "You are a helpful assistant.",
  tools: {
    add: tool({
      description: "Add two numbers",
      inputSchema: z.object({ a: z.number(), b: z.number() }),
      execute: async ({ a, b }) => ({
        content: [{ type: "text", text: `${a + b}` }],
      }),
    }),
  },
})
```

---

### Step 4: Deploy Your Agent

Log in with the CLI using your API key, then deploy:

```
npx @21st-sdk/cli login
npx @21st-sdk/cli deploy
```

Your agent is now live on the 21st infrastructure.

---

### Step 5: Create a Token Route

Create `app\api\an-token\route.ts`. This exchanges your secret API key for short-lived tokens server-side so your key is never exposed in the browser:

```typescript
import { createTokenHandler } from "@21st-sdk/nextjs/server"

export const POST = createTokenHandler({
  apiKey: process.env.API_KEY_21ST!,
})
```

Add your key to `.env.local` at the project root:

```
API_KEY_21ST=your-api-key-here
```

---

### Step 6: Add the Chat Component

In `app\page.tsx` (or any client component):

```tsx
"use client"

import { AgentChat, createAgentChat } from "@21st-sdk/nextjs"
import { useChat } from "@ai-sdk/react"

const chat = createAgentChat({
  agent: "my-agent",
  tokenUrl: "/api/an-token",
})

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status, stop, error } =
    useChat({ chat })

  return (
    <AgentChat
      messages={messages}
      onSend={() => handleSubmit()}
      status={status}
      onStop={stop}
      error={error ?? undefined}
    />
  )
}
```

---

### Step 7: Run and Test

```
npm run dev
```

Open your browser, go to the page with `AgentChat`, and send a message. Streaming, tool calls, and theming are handled automatically.

---

### Available Templates

Pre-built templates you can deploy as a starting point:

| Template | What it does |
|---|---|
| Chat App | Next.js chat interface with an AI agent |
| Email Agent | Sends and reads email via AgentMail |
| Note Taker | AI notebook with persistent notes via Convex |
| Monitor Agent | Service health monitoring with Slack alerts |
| Web Scraper | Extracts structured data from any website |
| Fill Form | AI-powered form filling with a chat interface |

Browse all templates at: https://21st.dev/agents/docs/templates

---

---

## Quick Reference

| Tool | Install command | Works in | What it does |
|---|---|---|---|
| Stitch MCP | `npx stitch-mcp` (via MCP config) | Cursor, Claude Code, Antigravity | AI UI design via Google Stitch |
| UI UX Pro Max | `npm install -g uipro-cli` | All major AI IDEs | Design system generation, 67 styles |
| Nano Banana | `gemini extensions install ...` | Gemini CLI (terminal) | AI image generation and editing |
| 21st Agents SDK | `npm install @21st-sdk/*` | Any Next.js project | Deploy AI agents with built-in chat UI |

---

## Troubleshooting

### Stitch MCP: Agent does not see the MCP server
- Restart the IDE after editing the config file.
- Validate your JSON — a trailing comma or missing bracket will silently break the config.
- Run `gcloud auth application-default print-access-token` in PowerShell to confirm authentication is working.

### UI UX Pro Max: Skill does not activate
- Confirm Python is installed and in your PATH: `python --version`
- Re-run `uipro init --ai <your-ide>` from the project root.
- Make sure you are running the command from inside the project folder, not from a parent directory.

### Nano Banana: "Command not recognized"
- Confirm Gemini CLI is installed: `gemini --version`
- Restart the terminal after installing the extension.
- Check that `NANOBANANA_API_KEY` is set: in PowerShell run `echo $env:NANOBANANA_API_KEY`

### 21st Agents SDK: Deploy fails
- Run `npx @21st-sdk/cli login` before deploying.
- Confirm `API_KEY_21ST` is set in `.env.local`.
- Make sure Node.js 18+ is installed: `node --version`

---

*For additional help, check the GitHub Issues tab for each repository, or join the 21st Discord at https://discord.gg/yn3pzMb7VR.*
