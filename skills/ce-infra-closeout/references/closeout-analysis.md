# Closeout Analysis

The closeout compares approved intent with observed execution. It is not a retrospective essay.

## Source precedence

Use this precedence for project facts:

1. actual validation/evidence artifact
2. change/incident ticket or execution log
3. user-confirmed actual result
4. runbook note marked as completed/actual
5. plan/runbook intended state — planned facts only, never actual facts

When sources conflict, name the conflict and keep the actual state unresolved until evidence or the user settles it.

## Planned vs actual matrix

Compare only dimensions material to the project. Typical dimensions:

| Dimension | Planned | Actual | Evidence | Impact |
|---|---|---|---|---|
| Scope | [plan] | [actual] | [source] | [impact] |
| Wave/batch size | [plan] | [actual] | [source] | [impact] |
| Duration/window | [plan] | [actual] | [source] | [impact] |
| Rollback events | [plan posture] | [actual] | [source] | [impact] |
| Validation | [planned gate] | [actual result] | [source] | [impact] |

Do not fill unknown actuals with zero, none, or the planned value.

## Deviation test

Create a `DEV-###` only when at least one is true:

- architecture or topology changed from the approved plan
- scope expanded/reduced materially
- sequence changed because a dependency or gate behaved differently
- a runbook step was skipped/replaced for a technical reason
- a rollback trigger fired or a rollback path was used
- actual performance/capacity/duration invalidated a planning assumption
- validation or application acceptance required a different gate
- vendor/platform behavior contradicted the plan

A schedule slip without technical or procedural learning may be reported in Planned vs Actual without becoming a deviation.

## Deviation structure

```markdown
### DEV-001 — Planned 150-VM wave exceeded the change window

**Planned:** 150 VMs per wave within an 8-hour window.
**Actual:** The first execution forecast/attempt showed the validation queue would exceed the window; the team reduced the wave to 50 VMs.
**Evidence:** EV-WAVE-01, user-confirmed execution notes.
**Impact:** Migration sequencing changed; project duration increased, but rollback and validation remained inside the window.
**Future impact:** Recalculate wave size from measured conversion + validation throughput before fixing batch size.
```

Do not claim causality that the evidence does not support. "Storage contention caused the delay" requires storage evidence; otherwise say the measured throughput was lower than assumed.

## Failed approaches

Record a failed approach only when it is reusable warning evidence. Include:

- attempted approach
- why it was selected
- observed failure/stop signal
- what replaced it
- applicability boundary

This section is a primary source for `deprecated` or tested-pattern learning candidates.
