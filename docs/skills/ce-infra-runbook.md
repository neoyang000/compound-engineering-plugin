# `ce-infra-runbook`

> Turn an implementation-ready infrastructure plan into a human-executed change SOP with exact checks, steps, stop conditions, rollback, and evidence.

`ce-infra-runbook` is the operational handoff for Compound Engineering's infrastructure lane. It reads a unified plan with `execution: infrastructure`, traces every U-ID and safety decision, and writes the canonical runbook to `docs/projects/<project_slug>/runbook.md`.

It **never performs the live change**. VMware, Hyper-V, storage, SAN, firewall, cloud, identity, Exchange, database-platform, backup/DR, OS patching, and application-delivery changes remain human-in-the-loop.

## TL;DR

| Question | Answer |
|---|---|
| What does it do? | Converts infrastructure plan guardrails into an executable human runbook |
| Input | `artifact_readiness: implementation-ready` + `execution: infrastructure` unified plan |
| Output | `docs/projects/<project_slug>/runbook.md` |
| Safety | Classifies every action as READ-ONLY / CHANGE / DESTRUCTIVE / ROLLBACK and never executes it |
| What's next | Human change execution, then `/ce-infra-closeout` with actual results/evidence |

## Chain position

```text
/ce-brainstorm
  infrastructure discovery + L1-L4 decisions
        |
        v
/ce-plan
  infrastructure planning + U-ID gates
        |
        v
/ce-infra-runbook
  exact human SOP, commands/console paths, STOP/rollback/evidence
        |
        v
Human-controlled live change
        |
        v
/ce-infra-closeout
```

## What makes it different from `ce-plan`

The infrastructure plan captures architecture, sequencing, prerequisites, verification scenarios, and rollback policy. It deliberately avoids brittle command choreography.

The runbook resolves the operational surface:

- where the action is performed
- grounded command or console path
- expected result before execution
- evidence to capture
- STOP condition
- rollback link

Version-sensitive syntax must be grounded in environment evidence, an approved SOP/script, or authoritative product documentation. When it cannot be verified, the runbook uses `REQUIRES_VERIFICATION` and a placeholder instead of plausible syntax.

## Destructive-step guardrail

A `[DESTRUCTIVE]` action must have:

1. `HUMAN APPROVAL REQUIRED`
2. a preceding READ-ONLY target/state verification
3. an explicit STOP condition
4. a recovery/rollback path or `IRREVERSIBLE AFTER THIS STEP`
5. no guessed hostname, IP, volume, tenant, subscription, account, datastore, certificate, or wildcard scope

## Evidence contract

Evidence IDs such as `EV-U3-CLUSTER-VALIDATION` are stable and later consumed by `ce-infra-closeout`. Evidence may stay in a secure external system; the project dossier stores an index and result context rather than forcing raw secrets/logs into git.

## Examples

```text
/ce-infra-runbook docs/plans/2026-07-05-001-migration-vmware-hyperv-plan.md
```

Suitable projects include:

- VMware to Hyper-V migration
- Pure ActiveCluster change
- SAN zoning / storage path transition
- FortiGate or cloud Site-to-Site VPN rollout
- Exchange platform upgrade
- SQL Always On infrastructure deployment
- RHEL offline security patching
- F5 BIG-IP topology or traffic-flow change
