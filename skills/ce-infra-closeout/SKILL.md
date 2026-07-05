---
name: ce-infra-closeout
description: Close out a completed infrastructure project by comparing planned versus actual execution, indexing evidence, recording deviations and failed approaches, and extracting reusable learning candidates for ce-compound. Use after a human-executed infrastructure change has actual results. Never invents execution outcomes or compounds unverified hypotheses.
argument-hint: "[optional: project slug, infrastructure plan path, or runbook path]"
---

# Infrastructure Project Closeout

Turn completed infrastructure work into a durable project dossier and evidence-backed learning candidates.

This skill operates after the live change was performed by humans or an external controlled execution process. It does not execute the change. It compares the canonical infrastructure plan and runbook with actual results supplied by project artifacts, logs, validation reports, tickets, or the user.

Primary durable outputs:

- `docs/projects/<project_slug>/README.md`
- `docs/projects/<project_slug>/closeout.md`
- `docs/projects/<project_slug>/evidence-index.md`

The canonical plan remains under `docs/plans/`; the canonical runbook remains `docs/projects/<project_slug>/runbook.md`.

## Support files

Read on demand:

- `references/closeout-analysis.md`
- `references/learning-extraction.md`
- `references/project-dossier.md`
- `assets/closeout-template.md`

## Phase 0: Resolve project sources

Resolve the `project_slug` from the provided plan/runbook/project argument or from the most recent infrastructure artifact when the match is obvious.

Read:

- infrastructure unified plan
- project runbook
- existing project README/closeout/evidence index when resuming
- user-provided execution notes
- validation reports, logs, screenshots/index references, tickets, and application-owner sign-offs that are accessible

Build a source inventory before analysis. A source may be missing; report the gap.

**Actual execution facts require evidence.** Conversation statements such as "that worked" may establish a result when the user is the execution authority, but the closeout must label the source as user-confirmed. Do not infer actual duration, rollback count, final topology, error rate, or validation result from the plan.

If there is no actual execution evidence at all, do not create a completed closeout. Instead report what evidence is missing and stop. The project plan is not proof that the project happened.

## Phase 1: Planned vs actual analysis

Read `references/closeout-analysis.md` and compare:

- scope and final target state
- phase/wave/batch structure
- maintenance window/duration when known
- prerequisites and readiness gates
- architecture decisions/KTDs
- implementation units actually performed
- rollback triggers and rollback events
- verification scenarios
- application/service acceptance
- monitoring observation
- evidence required versus captured
- handover and temporary-artifact cleanup

Assign stable deviation IDs `DEV-001`, `DEV-002`, ... . A deviation is a meaningful difference between the plan/runbook and actual execution, not a formatting change or harmless timing drift.

For each deviation state:

- planned state
- actual state
- reason/evidence
- impact
- whether the deviation should change future planning or runbook guidance

## Phase 2: Extract reusable learning candidates

Read `references/learning-extraction.md`.

Assign stable candidate IDs `LC-001`, `LC-002`, ... . Extract candidates from:

- failed approaches that consumed meaningful investigation or caused a stop/rollback
- verified workarounds
- architecture or migration patterns that materially improved outcome
- repeatable validation gates
- rollback criteria that proved useful
- vendor/platform limitations
- operational sequencing patterns

Do not extract a candidate from every deviation. A learning candidate must be reusable beyond this exact project and must name its applicability boundary.

Classify candidate evidence:

- `tested` — observed to work in this completed project with concrete validation evidence.
- `verified` — explicit repeated evidence across more than one project/environment, or another authoritative evidence basis that the closeout can cite. One successful project does not become `verified` merely because the result was strong.
- `deprecated` — a previously used pattern is now known to be unsafe, obsolete, or misleading and is worth preserving as a warning.
- `candidate-only` — plausible learning but not sufficiently validated for `docs/solutions/`.

`candidate-only` is a closeout state only. It must never be written to `docs/solutions/` as `validation_status: unverified`.

## Phase 3: Write the project dossier

Read `references/project-dossier.md` and `assets/closeout-template.md`.

Write/update:

### README.md

A project index with:

- objective/result
- canonical plan link
- runbook link
- closeout link
- evidence index link
- related reusable learnings after compounding

Do not copy plan or runbook content into README.

### closeout.md

Include:

- Project Result
- Source Inventory
- Planned vs Actual
- Deviations
- Rollback / Recovery Events
- Failed Approaches
- Verified Patterns
- Reusable Learning Candidates
- Outstanding Operational Follow-ups
- Handover Result

### evidence-index.md

Map runbook evidence IDs and closeout evidence to actual result/location. Redact secrets and sensitive raw data. An external secure evidence location may be referenced without copying the content into git.

## Phase 4: Compound eligible learnings

Eligible candidates are `tested`, `verified`, or `deprecated` and have:

- a concrete problem/trigger or reusable guidance
- applicability conditions
- evidence/source project
- enough context to explain why the pattern worked or failed

Candidates with `candidate-only` status remain in `closeout.md` and are not sent to `ce-compound`.

In interactive mode, ask:

`Closeout captured. How should reusable learning candidates be handled?`

Offer:

1. **Compound all eligible candidates** *(recommended)* — invoke `ce-compound` sequentially once per eligible LC-ID, passing the project slug, LC-ID, validation status, evidence summary, applicability, non-applicability, and source paths as context. Do not combine unrelated candidates into one solution doc.
2. **Review candidates first** — walk the candidate list one at a time.
3. **Finish closeout only** — leave candidates in the dossier.

When the caller is non-interactive, do not auto-compound. Write the closeout and return eligible LC-IDs with suggested `ce-compound` context. This preserves the rule that knowledge capture is based on explicit evidence and a single learning per solution doc.

After successful compounding, update the project README's related learnings list with repo-relative `docs/solutions/` paths.
