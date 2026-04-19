---
title: "Rocket Learning × Google.org Fellowship"
layout: showcase
summary: "Designing Appu — a voice-first, GenAI tutor for 3–6 year-olds. I led a 0→1 design sprint that translated early childhood pedagogy, India field realities, and model capabilities into a product piloted at scale."
date: 2026-04-19
role: "Design lead (fellowship sprint)"
timeline: "Fellowship sprint · Google.org–backed program"
team: "Google.org fellows, Rocket Learning product & pedagogy, engineering, field research"
tags:
  - "Google.org"
  - "Rocket Learning"
  - "GenAI"
  - "Early childhood"
outcome: "Core conversational patterns for Appu, pedagogical safety scaffolding for the LLM, and voice-first UX tuned for low-connectivity India — with pilot telemetry showing materially higher completion and substantial voice usage in early field cohorts."
image: "images/work/google-rocket-learning-fellowship.svg"
image_alt: "Cover gradient — Rocket Learning and Google.org fellowship"
---

> *How I led a 0→1 design sprint to shape a voice-first, AI-powered learning experience for 3–6 year-olds across India.*

{{% callout type="info" %}}
As part of the **Google.org Fellowship**, I led a focused design sprint to translate early childhood pedagogy, on-ground realities, and generative AI capabilities into **Appu** — a **voice-first, personalised tutor** for young learners.
{{% /callout %}}

My work helped:

- **Define** core interaction patterns for conversational learning  
- **Bridge** AI capability, child behaviour, and caregiver context  
- **Shape** a product that is now **piloted at scale** across underserved communities  

{{% callout type="caution" %}}
**Public portfolio page:** I do not show **shipping UI, proprietary prompt stacks, or internal research artifacts** here. **Counts, currency, and percentages below are deliberately rounded or qualitative** — enough to convey direction without pinning partner- or program-owned figures on a personal site. Official numbers belong in **Rocket Learning / Google.org** channels.
{{% /callout %}}

## Problem / context

India faces a large **early education access gap**:

- Many children still lack consistent access to **quality preschool** experiences  
- A large share of **brain development** occurs before age five — small windows matter disproportionately  
- A lot of EdTech stays **linear, screen-heavy, and weakly adaptive** — a poor fit for how young children actually learn  

**Rocket Learning** already operates at **multi-million-child scale across many states**. The strategic bet was clear: use new **generative AI** affordances to move beyond one-size content — toward **adaptive, conversational** learning that could still be **governed** by developmental science.

## How the program came together

With support from **Google.org**:

- A **material philanthropic grant** plus a **structured fellowship** created room for rapid, responsible innovation  
- Generative AI made it realistic to pursue **non-linear learning paths**, **multilingual voice interaction**, and **personalisation** at a cost structure that could matter at population scale  

That combination led to **Appu** — a **conversational AI tutor** aimed at **children roughly 3–6 years old**, delivered through patterns families could actually sustain in real homes.

## What I worked on

### 1. Defining the core experience (information architecture, reframed)

Early on, it was tempting to reach for a familiar **“app shell”** mental model: navigation regions, deep page stacks, and an object model spelled out as **lesson → unit → sub-unit**, with explicit transitions and success states at every layer.

For **3–6 year olds**, that instinct **does not survive contact with reality**. Attention is fragile; the primary “competitor” is often **passive entertainment** (think **sing-along video** culture) — not another literacy SKU. Every extra layer of hierarchy was another chance to lose the child before learning started.

So we **collapsed vertical depth**:

- We **reduced** stacked page states and leaned into a **flatter** structure  
- We shifted the experience so that **progress is driven by conversation**, not by **navigation chrome**  
- Sessions were shaped as **short, guided voice windows** (roughly **a couple of minutes**), not long “sits” at a screen  

**Appu** is introduced as a **friendly elephant tutor** — voice-led, so the child meets a **character** first, not a dashboard.

### 2. Translating pedagogy into AI behaviour

We studied **how teachers and caregivers explain concepts in the wild** — including tiny teaching moves (for example, how **“M”** is anchored to **“Mango”** in speech and gesture, not only as a letterform). Pedagogy and education partners built a **shared knowledge bank** that grounded what “good teaching” means for each concept.

Because LLM outputs are **non-deterministic**, we wrapped the model in scaffolding we called **Pedagogical Safety-in-the-Loop**:

- **Socratic scaffolding (adaptive prompts):** Appu behaves less like an **answer engine** and more like a **nudge engine** — leading questions that help a child discover, not shortcuts that bypass thinking  
- **Pedagogical guardrails (foundational library):** Responses are checked against the **curriculum-aligned bank** so outputs stay **instructionally sound** and locally relevant  
- **Multi-path narrative exploration:** If **“M for Mango”** does not land, the system can pivot — **Monkey**, **Moon**, and other sanctioned paths — based on what the child has responded to before  

{{% callout type="note" %}}
**Example of reframing a struggle:** If a child still cannot recognise **“M”** after several tries, Appu does not only repeat the instruction. It can **reframe** the moment: *“Oh! Maybe mangoes are too sweet today. Let’s look at a monkey! Can you make a sound like a monkey? Mmm-mmm!”* — turning a **dead end** into a **new on-ramp** to the same letter sound.
{{% /callout %}}

### 3. Designing for real-world India

**Constraints we designed into the brief:**

- **Low digital literacy** and **uneven connectivity** in many marginalized communities  
- **Voice-first** interaction — and realistic adjacency to channels families already use (e.g. **WhatsApp**)  
- **Language as inclusion, not gatekeeping:** dialect variation and code-switching are normal; “perfect” textbook Hindi or English can **exclude** the very learners we wanted to serve  

{{% callout type="warning" %}}
Designing for **scale in rural India** means assuming **highly variable connectivity**, **noisy environments**, and **shared devices** — not a quiet tutoring nook.
{{% /callout %}}

**Design responses included:**

- **Conversational, voice-first UX** to reduce dependence on **screen literacy** for caregivers and children — closer to **oral storytelling** than to a traditional lesson player  
- **Multilingual tolerance (code-switching as a feature):** the experience embraces natural **Hinglish**, **Benglish**, and other **vernacular mixes** so the product feels like a **local friend**, not a school examiner  
- **Caregiver-assisted co-learning:** the flow assumes a **brief shared window** between a caregiver and child — prompts that help an adult **stay in the loop** instead of outsourcing attention to a tablet  

### 4. AI × UX iteration loops

Generative AI plus early-childhood UX required **tight loops** between design, engineering, and field research. Three technical–UX problems sat at the center:

- **Latency:** slow first responses **break** conversation for a four-year-old. We pushed on **time-to-first-token** until the wait felt **meaningfully shorter** in primary flows (without publishing exact benchmarks here) and used **conversational fillers** (*“Hmm…”*, *“Let me see…”*) to preserve the feeling of **active listening** while work finished behind the scenes  
- **Noisy environments:** rural homes are rarely silent; **voice activity detection** had to survive kitchens, siblings, and background life. We tuned **VAD** thresholds and designed explicit **“listening” states** so children could see **when Appu could hear** versus **when the environment was overwhelming the mic**  
- **Persona and safety:** we used a structured **pedagogical template layer** so Appu stayed **in character**, **age-appropriate**, and far less likely to **drift** into explanations a preschooler cannot process  

**Early pilot signals (large regional cohort, India):**

- A **material lift** in overall **session completion** versus prior static patterns  
- Fewer drop-offs in the **opening moments** of a session — where a child decides whether this is “for them”  
- **Substantial** voice usage logged during the **initial pilot** window (no exact minute counts on this page)  

## Impact (early signals)

- **Engagement** trended up versus more **static** content approaches  
- Parents reported **more confidence and verbal expression** in children, and **learning folding into daily routines** more naturally  

Rocket Learning’s north star remains ambitious: **program-level goals point to national-scale reach this decade** (exact targets are **partner-published**; I omit them here), with Appu-class experiences as one pillar of that trajectory.

{{< case-contact-card >}}
