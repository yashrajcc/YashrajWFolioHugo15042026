---
title: "Designing a documentation portal"
summary: "Unified reference site for APIs and internal guides, prioritizing search and skim reading."
date: 2024-06-10
role: "UX Design"
image: "/images/project1-thumb.png"
image_alt: "Documentation portal interface"
tags:
  - "Information Architecture"
  - "Hugo"
  - "Search UX"
outcome: "Time-to-answer ↓ 60%"
---

## Context

Teams were shipping features faster than docs could keep up. Information lived in wikis, README files, and slide decks, so new engineers and partners struggled to find a single source of truth. The goal was a calm, searchable portal that felt authoritative without being heavy.

## Approach

I audited existing content, grouped topics into a small set of categories, and defined one navigation pattern for every section. Pages used a consistent heading hierarchy and short lead paragraphs so people could scan on first visit and read in depth when needed. I wrote templates in plain HTML (via Hugo) and styled them with a minimal stylesheet—no client-side frameworks—so the site stayed fast and easy to host anywhere.

## Outcome

Time-to-first-answer dropped in informal tests: users reported finding API examples in one or two clicks instead of opening several tabs. The codebase remained small enough for anyone on the team to edit Markdown and ship updates the same day.
