+++
# Case study front matter — markdown strings use Goldmark (paragraphs, lists, links).
title = "{{ replace .Name "-" " " | title }}"
date = {{ .Date.Format "2006-01-02" }}
summary = ""
role = ""
# Optional (showcase layout): shown in a Role / Timeline / Team panel under the summary.
# timeline = ""
# team = ""       # string, or TOML array: team = ["PM", "Eng"]
image = ""
image_alt = ""
tags = []
outcome = ""

# Optional hero overrides (defaults: title from `title`, date from `date`, role from `role`)
# case_hero_eyebrow = ""
# case_hero_title = ""
# case_hero_sub = ""
# case_hero_image = ""
# case_hero_image_alt = ""

# Locked sections (leave empty until ready; legacy: use body-only markdown instead)
case_intro = ""
case_problem = ""
case_approach = ""
case_outcome = ""
case_footer = ""
+++
