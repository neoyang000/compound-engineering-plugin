# Infrastructure Runbook Contract

A runbook is a human execution surface for a live-system change. It is more concrete than the infrastructure plan but remains bounded by the plan's decisions and scope.

## Canonical path

`docs/projects/<project_slug>/runbook.md`

The canonical plan remains under `docs/plans/`. The runbook links to it; it does not duplicate the Product Contract or Planning Contract.

## Required structure

Use these headings when applicable:

- `# <Project> - Infrastructure Runbook`
- `## Change Summary`
- `## Source Plan and Traceability`
- `## Environment and Scope`
- `## Systems and Owners`
- `## Change Window`
- `## Preconditions`
- `## Required Access`
- `## Backup / Snapshot / Recovery Point`
- `## Pre-change Checks`
- `## Go / No-Go Gate`
- `## Change Procedure`
- `## Rollback Triggers`
- `## Rollback Procedure`
- `## Post-change Technical Validation`
- `## Application / Service Validation`
- `## Monitoring Observation`
- `## Handover`
- `## Evidence Checklist`
- `## Open Runbook Blockers`

Omit a heading only when the source plan proves it is not applicable. Do not write "N/A" sections for ceremony.

## Traceability

At the start, list:

- canonical plan path
- project slug
- covered U-IDs
- relevant D-L/KTD IDs

Each change-procedure subsection names the U-ID it implements. A runbook step may cite additional R/D/KTD IDs when the reason for a safety gate is not obvious.

## Step contract

Each numbered operational step uses this shape:

```markdown
### Step 12 — Validate FC multipath before datastore change

**Trace:** U2, KTD3
**Safety:** [READ-ONLY]
**Target:** ESXi hosts in the source plan
**Purpose:** Prove all expected paths are healthy before crossing the storage change boundary.
**Prerequisites:** Zoning work complete; no active path incident.

**Command / Console Path**
`<grounded command or console path>`

**Expected Result**
All expected paths are present and no path is degraded.

**Evidence**
Capture the command output with host and timestamp; index as `EV-U2-PATH-PRE`.

**STOP Condition**
Any missing/dead path or unexpected target/LUN mapping. Do not continue to the change step.

**Rollback Link**
Not applicable; this is read-only.
```

Do not combine purpose, command, expected result, evidence, and stop condition into one prose paragraph.

## Go / No-Go gates

A gate lists each condition as a pass/fail item and names the decision authority when the plan provides it. Unknown authority is `unknown`; do not invent a role or person.

A failed mandatory gate means stop. The runbook must not soften a plan-defined stop condition into "continue with caution."

## Rollback structure

Rollback is not "restore if needed." For each rollback path state:

- trigger
- latest safe decision point
- target recovery state
- rollback owner when known
- procedure steps
- validation after rollback
- evidence

If rollback requires a vendor-specific destructive operation that is not verified, keep it as a `RUNBOOK-BLOCKER` rather than hallucinating the command.
