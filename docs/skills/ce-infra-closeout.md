# `ce-infra-closeout`

> Compare planned versus actual infrastructure execution, preserve project evidence, and extract only validated reusable learnings.

`ce-infra-closeout` is the knowledge-conversion step after a human-controlled infrastructure change. It reads the canonical plan, runbook, actual execution notes, validation outputs, and evidence references; then writes a project dossier under `docs/projects/<project_slug>/`.

The key boundary is **project history vs reusable knowledge**. The closeout records everything material that happened. Only evidence-backed, reusable LC candidates are eligible for `ce-compound`.

## TL;DR

| Question | Answer |
|---|---|
| What does it do? | Planned-vs-actual analysis, deviation tracking, evidence indexing, learning extraction |
| When to use it | After the infrastructure change actually ran and actual results exist |
| Output | `README.md`, `closeout.md`, and `evidence-index.md` in the project dossier |
| Learning rule | `tested`, `verified`, or `deprecated` candidates may compound; candidate-only hypotheses stay in closeout |
| What's next | `/ce-compound` once per eligible LC candidate |

## Chain position

```text
Infrastructure plan
      |
      v
Infrastructure runbook
      |
      v
Human-controlled execution
      |
      v
/ce-infra-closeout
      |
      +--> docs/projects/<project_slug>/
      |
      +--> LC-001, LC-002, ...
               |
               v
          /ce-compound
               |
               v
          docs/solutions/
               |
               v
       Next infrastructure project
```

## Planned vs actual

The skill compares only material project dimensions: scope, target state, wave/batch structure, maintenance window, architecture decisions, rollback events, verification, observation, evidence, handover, and cleanup.

Actual execution facts require evidence or explicit user confirmation. The plan never proves that a step ran.

Material differences get stable `DEV-###` IDs. A deviation records planned state, actual state, evidence, impact, and whether future planning/runbook guidance should change.

## Learning candidates

Reusable candidates get stable `LC-###` IDs and an applicability boundary.

- **tested** — worked in this completed project with concrete validation evidence
- **verified** — explicit repeated/multi-environment or other authoritative evidence basis
- **deprecated** — known unsafe, obsolete, unsupported, or misleading pattern worth preserving as a warning
- **candidate-only** — plausible but insufficiently validated; stays in `closeout.md`

There is intentionally no `unverified` status in `docs/solutions/`. A hypothesis does not become institutional memory merely because it sounds reasonable.

## Project dossier

```text
docs/projects/<project_slug>/
├── README.md
├── runbook.md
├── closeout.md
└── evidence-index.md
```

The canonical unified plan stays under `docs/plans/` and is linked from the project README. The dossier does not duplicate the plan.

## Examples

```text
/ce-infra-closeout vmware-hyperv-450vm
/ce-infra-closeout docs/projects/vmware-hyperv-450vm/runbook.md
```

A closeout with no actual execution evidence stops instead of manufacturing project results.
