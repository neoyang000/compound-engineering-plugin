# Infrastructure Evidence Rules

Evidence proves a gate or result. It is not a screenshot collection exercise.

## Evidence item contract

Each evidence item has:

- stable evidence ID, e.g. `EV-U3-CLUSTER-VALIDATION`
- source U-ID or gate
- system/resource
- check performed
- expected result
- actual result placeholder
- capture method
- timestamp requirement when material
- redaction note when output may expose sensitive data

## Good evidence

Examples:

- exported cluster validation report tied to the planned cluster
- multipath/path output tied to each in-scope host
- route table export before and after the change
- replication health/lag output at the acceptance gate
- application-owner sign-off naming the tested business transaction
- monitoring query showing the required observation interval stayed below an error threshold

## Weak evidence

Do not treat these as sufficient when a stronger check is available:

- "looks good"
- a screenshot with no visible system identity or result
- ping-only validation for an application migration
- service started without a functional check
- a success message from a change command without a post-change state query

## Evidence index compatibility

`ce-infra-closeout` builds `docs/projects/<project_slug>/evidence-index.md`. Runbook evidence IDs must be stable so closeout can map planned evidence to actual artifacts/results.

Evidence files themselves do not have to live in git. The index may point to an approved external repository, ticket, secure share, or redacted local path. Never copy secrets or sensitive raw logs into the project dossier merely to make evidence durable.

## Expected-result discipline

Every validation step states the expected result before the human runs it. This prevents post-hoc acceptance of whatever output appeared.

When the expected result cannot be determined from the plan or authoritative source, mark the step `RUNBOOK-BLOCKER`; do not write "verify output is normal."
