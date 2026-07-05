# [Project] - Infrastructure Runbook

## Change Summary

[One paragraph: objective, change boundary, blast radius.]

## Source Plan and Traceability

- Plan: `[repo-relative plan path]`
- Project slug: `[project_slug]`
- Covered units: `[U-IDs]`
- Decisions: `[D-L*/KTD IDs]`

## Environment and Scope

[Only plan-provided environment facts and scope.]

## Systems and Owners

| System / Resource | Role in change | Owner / validator |
|---|---|---|

## Change Window

[Window, freeze/approval conditions, unknowns.]

## Preconditions

- [ ] [Condition]

## Required Access

- [ ] [Access or delegated permission]

## Backup / Snapshot / Recovery Point

| Resource | Required recovery point | Verification | Evidence ID |
|---|---|---|---|

## Pre-change Checks

### Step 1 - [Check]

**Trace:** [U/KTD]
**Safety:** [READ-ONLY]
**Target:** [plan-provided target]
**Purpose:** [why]
**Prerequisites:** [conditions]

**Command / Console Path**
`[grounded command/path or <VERIFY_COMMAND_FOR_VERSION>]`

**Expected Result**
[observable result]

**Evidence**
[evidence ID and capture]

**STOP Condition**
[condition]

**Rollback Link**
Not applicable; read-only.

## Go / No-Go Gate

| Gate | Required result | Actual | Decision authority | Evidence ID |
|---|---|---|---|---|

## Change Procedure

[Repeat the step contract and assign the safety class defined in command-safety.md.]

## Rollback Triggers

| Trigger | Source unit | Latest safe point | Rollback path |
|---|---|---|---|

## Rollback Procedure

[Repeat the step contract and apply the required safety guardrails.]

## Post-change Technical Validation

[Validation steps.]

## Application / Service Validation

| Service / workload | Validation action | Expected result | Validator | Evidence ID |
|---|---|---|---|---|

## Monitoring Observation

[Signals, duration/exit condition, escalation trigger.]

## Handover

- [ ] Monitoring ownership confirmed
- [ ] Operations documentation updated
- [ ] Temporary access/workarounds removed or assigned owner + expiry

## Evidence Checklist

| Evidence ID | U-ID / Gate | Expected artifact/result | Actual location/result |
|---|---|---|---|

## Open Runbook Blockers

[List only blockers that prevent safe execution. Omit the section when none exist.]
