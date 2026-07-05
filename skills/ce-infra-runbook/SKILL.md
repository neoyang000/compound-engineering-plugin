---
name: ce-infra-runbook
description: Generate a human-executed infrastructure change runbook from an implementation-ready infrastructure plan. Use for VMware, Hyper-V, storage, SAN, network, cloud, identity, Exchange, SQL platform, backup/DR, OS patching, F5, and other live-system changes that need pre-checks, exact steps, stop conditions, rollback, validation, and evidence. Never executes the live change.
argument-hint: "[optional: path to implementation-ready infrastructure plan]"
---

# Infrastructure Runbook

Generate an operational SOP/runbook from a `ce-unified-plan/v1` artifact with `artifact_readiness: implementation-ready` and `execution: infrastructure`.

The primary deliverable is one runbook at `docs/projects/<project_slug>/runbook.md`. This skill documents executable steps for a human change owner. It never runs commands, changes cloud resources, modifies network/storage state, restarts services, patches hosts, or performs another live-system mutation.

## Support files

Read on demand:

- `references/runbook-contract.md` — artifact structure and traceability rules
- `references/command-safety.md` — command classification and destructive-step guardrails
- `references/evidence-rules.md` — expected-result and evidence requirements
- `assets/runbook-template.md` — composition skeleton

## Phase 0: Resolve the plan

If a plan path is provided, read metadata and build a section map before reading large bodies. If no path is provided, find the most recent matching plan under `docs/plans/`.

Accept only a plan that declares:

```yaml
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
execution: infrastructure
```

If readiness is `requirements-only`, stop and route the artifact to `ce-plan` enrichment. If `execution` is `code` or `knowledge-work`, stop and explain that this skill only produces infrastructure runbooks.

Resolve `project_slug` from metadata. If absent, derive a stable ASCII slug from the plan title/topic, add it to the plan metadata, and use it consistently. Do not invent customer names, hostnames, IP addresses, account IDs, or environment labels.

## Phase 1: Map the plan to runbook work

Read:

- Goal Capsule
- Product Contract sections that define scope, decisions, constraints, assumptions, success, and dependencies
- Planning Contract
- Implementation Units
- Verification Contract
- Definition of Done

Build a trace map from each `U-ID` to its cited `R`, `D-L*`, `KTD`, prerequisites, rollback triggers, verification scenarios, and evidence requirements.

The runbook must cover every in-scope U-ID. If a unit cannot be converted into operational steps without inventing a command, version, console path, system identifier, or recovery action, mark the gap as `RUNBOOK-BLOCKER` and place it in the runbook's `Open Runbook Blockers` section. Do not silently guess.

## Phase 2: Verify version-sensitive operational guidance

When exact syntax or console navigation depends on a product/version/vendor limit, verify it against an authoritative current source when the runtime can access one. Prefer user-named manuals, local vendor docs, existing approved SOPs, and official product documentation.

If the exact command cannot be verified:

- keep the operational intent and prerequisite
- use a clear placeholder such as `<VERIFY_COMMAND_FOR_VERSION>`
- label the step `REQUIRES_VERIFICATION`
- do not present remembered syntax as safe to run

A placeholder is better than a plausible destructive command.

## Phase 3: Compose steps

Read `references/runbook-contract.md`, `references/command-safety.md`, `references/evidence-rules.md`, and `assets/runbook-template.md` before composing.

For each change step:

1. Name the purpose and traced U-ID.
2. Name the target system or console. Use plan-provided identifiers only.
3. State prerequisites.
4. Assign one safety class: `[READ-ONLY]`, `[CHANGE]`, `[DESTRUCTIVE]`, or `[ROLLBACK]`.
5. Provide the command or console path only when grounded.
6. State the expected result.
7. State the evidence to capture.
8. State the STOP condition.
9. Link the rollback trigger/procedure when the step can cross a recovery boundary.

Do not compress multiple irreversible actions into one numbered step. Separate a read-only check, the change, and the validation so a human can stop between them.

## Phase 4: Cross-check safety and completeness

Before writing:

- every U-ID is represented
- every unit prerequisite appears before the unit's first change step
- every rollback trigger has a corresponding rollback procedure or explicit blocker
- every `[DESTRUCTIVE]` step has a preceding read-only verification and explicit human-approval note
- no secret, private key, password, access key, or token is embedded
- placeholders are used for unknown infrastructure identifiers
- pre-change, go/no-go, post-change, application validation, monitoring observation, and evidence sections are present when required by the plan
- commands are not invented merely to make the SOP look complete

## Phase 5: Write and hand off

Create `docs/projects/<project_slug>/` when needed and write `runbook.md`. Do not copy the plan into the project folder; the project index will link back to the canonical plan.

Report the absolute runbook path and any `RUNBOOK-BLOCKER` count.

Ask:

`Runbook ready at <absolute path>. What would you like to do next?`

Offer:

1. **Review the runbook blockers / high-risk steps** *(recommended when any blocker or destructive step exists)*
2. **Publish the runbook to Proof**
3. **Finish runbook generation**

Do not offer automatic live execution. After the human change has actually been performed and results/evidence exist, the next workflow is `ce-infra-closeout`.
