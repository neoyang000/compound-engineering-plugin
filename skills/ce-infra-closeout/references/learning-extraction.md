# Infrastructure Learning Extraction

The goal is to separate project history from reusable knowledge.

## Candidate bar

A learning candidate must answer:

1. What recurring project situation does this apply to?
2. What was the important decision, failure, or pattern?
3. What evidence supports it?
4. Why did it work or fail?
5. When should another project not reuse it?

If the answer is only "we did X in this project," keep it in the closeout and do not create an LC-ID.

## Candidate categories

Useful candidate shapes include:

- migration sizing/sequencing pattern
- architecture/failure-domain pattern
- operational readiness gate
- rollback trigger or recovery pattern
- compatibility/vendor limitation
- capacity threshold or measurement method
- network/storage path validation pattern
- identity/certificate dependency pattern
- patching/offline dependency pattern
- monitoring/stabilization acceptance pattern

## Validation status

### tested

Use when the pattern was observed to work in this project and the closeout can cite validation evidence.

Example: a 40-60 VM wave completed within the required window and passed the planned validation gates in one project.

Do not generalize the number into a universal recommendation. The candidate must capture the method/conditions and the observed range.

### verified

Use only when evidence explicitly spans multiple projects/environments or an authoritative evidence source supports the reusable rule. State the evidence basis.

Never promote `tested` to `verified` because the project was large or the team is confident.

### deprecated

Use when a prior pattern or selected approach is worth preserving as a warning because actual evidence showed it was unsafe, obsolete, unsupported, or materially misleading.

### candidate-only

Use when the pattern is plausible but the result is incomplete, evidence is missing, or the project did not actually validate it. It stays in the project closeout.

## LC structure

```markdown
### LC-001 — Size migration waves from measured conversion plus validation throughput

**Candidate status:** tested
**Project evidence:** EV-WAVE-01, EV-WAVE-02
**Observed pattern:** 40-60 VM waves fit the project's 8-hour window after validation overhead was included.
**Why reusable:** Fixed VM-count planning ignored validation queue time; the measured-throughput method transfers to other wave migrations.
**Applies when:** phased hypervisor migration with a fixed maintenance window and per-wave application validation.
**Do not apply when:** application zero-downtime architecture, cross-region data migration, or a materially different migration engine without fresh throughput measurement.
**Suggested compound type:** migration_pattern
```

The reusable unit is the sizing method and applicability boundary, not the literal value `50 VMs`.
