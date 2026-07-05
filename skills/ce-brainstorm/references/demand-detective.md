# Demand Detective for Infrastructure Portfolio

Use this reference when a `ce-brainstorm` request is a vague or partially scoped
infrastructure portfolio need. The goal is to turn platform, datacenter, cloud,
network, storage, backup, migration, HA, upgrade, patching, or deployment asks
into explicit business and operational decisions before `ce-plan` designs the
implementation.

This is a scoping method, not an implementation design. It clarifies what the
infrastructure outcome must accomplish, what risk the project is allowed to
take, who owns each decision, and which assumptions must stay easy to change.

## Trigger Signals

Load this reference when the ask mentions one or more of these product families
or work types, or uses equivalent local vocabulary:

- **Virtualization:** VMware, vSphere, ESXi, Hyper-V, Proxmox VE.
- **Storage:** Pure Storage, PowerStore, HPE, Dell, SAN, FC, iSCSI.
- **Cloud and network:** AWS VPC, GCP VPC, Site-to-Site VPN, FortiGate,
  F5 BIG-IP.
- **Microsoft platform:** Exchange, Exchange Server, Active Directory,
  SQL Always On, Windows Server, Microsoft solution.
- **Linux and OS:** RHEL.
- **Backup and recovery:** Veeam, NetBackup, Backup / DR.
- **Operational work:** HA, Migration, Upgrade, Patching,
  Infrastructure Deployment.

Also load it when the request is phrased as a customer project, portfolio
standard, assessment, rollout, migration wave, hardening effort, lifecycle
program, or operations handoff even if no product names appear yet.

## Scene Back-Tell

Before proposing approaches, replay the business scene in your own words and
ask the user to correct it. Keep it concrete:

```markdown
## Scene Back-Tell
Please confirm whether I understand the situation:

> A {customer/team/role} is working in {current environment or timing}. They
> need to {deployment, migration, upgrade, HA, DR, patching, or operations
> outcome}. The most important result is {business or operational outcome}, and
> the main risk to avoid is {downtime, data loss, security exposure, support
> gap, cost overrun, or audit failure}.

If this story is wrong, correct the role, environment, outcome, or risk before
we choose a solution path.
```

If role, environment, target outcome, timeline, current topology, risk tolerance,
or ownership is unclear, ask one focused question before moving into decisions.

## Decision Layers

Drive decisions from largest impact radius to smallest. Do not start with port
numbers, field names, scripts, or runbook details before the portfolio boundary
and lifecycle strategy are known.

### L1 - Portfolio Boundary

These decisions change project objective, scope, ownership, SLA, and phase
boundaries. Confirm them first.

Common decisions:

- Is this a single-product project, a cross-domain architecture, or a portfolio
  standard?
- Which estate is in scope: datacenter, branch, cloud, DR site, management
  plane, workload plane, or all of them?
- Is the priority uptime, security posture, migration velocity, capacity,
  cost control, supportability, compliance, or lifecycle renewal?
- Which environments are in scope for phase one: production, DR, staging,
  management, backup, monitoring, or identity?
- Who owns the final decision: platform team, network team, storage team,
  security, application owner, operations, vendor, or customer sponsor?
- What are hard constraints: maintenance window, no-data-loss requirement,
  licensing, hardware support, version compatibility, procurement, or audit?

Output requirement: L1 decisions set the module boundary, stakeholder model,
target service level, and phase-one scope.

### L2 - Architecture and Lifecycle

These decisions change topology, state flow, migration approach, rollback,
operational lifecycle, and cross-team coordination.

Common decisions:

- Is the target greenfield deployment, in-place upgrade, side-by-side migration,
  consolidation, expansion, refresh, or DR enablement?
- Is the HA model active-active, active-passive, clustered, replicated,
  backup-restore, stretched, or manually recovered?
- What changes first: identity, network, storage, compute, backup, monitoring,
  database, mail, or application workloads?
- When does ownership transfer from project team to operations?
- What is the rollback boundary: per host, per cluster, per site, per workload,
  per storage volume, per VPC/VPN, or per application service?
- Which compatibility gates must be passed before work starts: firmware,
  hypervisor, guest OS, storage protocol, driver, agent, AD schema, Exchange,
  SQL Always On, backup agent, firewall policy, or load-balancer profile?

Output requirement: L2 decisions define the lifecycle, architecture pattern,
state transitions, rollback posture, and verification checkpoints.

### L3 - Operational Rule

These decisions change concrete operations, permissions, approvals, validation,
handoff, runbooks, and exception handling.

Common decisions:

- Who can request, approve, execute, validate, and sign off each change?
- Which actions require CAB, vendor approval, customer approval, security
  review, or application owner approval?
- What evidence is required before and after change: health checks, backup
  success, replication state, latency, capacity, event logs, service tests,
  user acceptance, or monitoring silence?
- Which exceptions are allowed: emergency patching, out-of-window rollback,
  temporary policy bypass, degraded HA, manual recovery, or phased remediation?
- What must be logged for audit: actor, time, change ID, reason, before/after
  state, affected CI, backup set, approval, and validation result?

Output requirement: L3 decisions define runbook steps, permission points,
validation gates, exception paths, and audit evidence.

### L4 - Experience and Reporting

These decisions affect handoff quality, dashboards, alerts, reporting, and
service operation, but usually do not alter the main architecture.

Common decisions:

- What does the operator need to see after go-live: availability, capacity,
  replication health, backup success, patch compliance, certificate expiry,
  VPN tunnel state, load-balancer pool health, or cluster health?
- How should reminders or alerts fire: ticket, email, Teams/Slack, monitoring
  event, SIEM, vendor console, or manual checklist?
- Which reports prove success: migration completion, downtime consumed,
  backup recoverability, RPO/RTO, patch compliance, incident rate, capacity
  trend, or support handoff checklist?
- Which documentation is required: HLD, LLD, as-built, rollback plan, runbook,
  test evidence, operation guide, troubleshooting guide, or knowledge transfer?

Output requirement: L4 decisions define reporting, alerting, documentation,
handoff, and operating visibility.

## Infrastructure Lifecycle Scan

For infrastructure requests, scan the whole lifecycle before writing the Product
Contract. Only ask about dimensions that materially affect scope.

- **Current state:** existing topology, versions, support status, known
  incidents, bottlenecks, capacity, licensing, contracts, and constraints.
- **Target state:** desired service, topology, region/site model, RPO/RTO,
  SLA, security posture, support model, and acceptance evidence.
- **Dependencies:** identity, DNS, NTP, certificates, IPAM, routing, firewall,
  load balancing, storage zoning, backup repositories, monitoring, CMDB,
  ticketing, vendor support, and procurement.
- **Change lifecycle:** request, design, approval, build, migrate, validate,
  cutover, rollback, stabilize, document, hand off, operate, and retire.
- **Risk controls:** maintenance windows, backups, snapshots, replication,
  rollback checkpoints, failover tests, DR drills, security exceptions, and
  communication plan.
- **Operational ownership:** RACI for platform, network, storage, security,
  database, messaging, backup, application, service desk, and vendor teams.
- **Evidence:** pre-checks, post-checks, screenshots, logs, test cases,
  monitoring evidence, ticket IDs, and sign-off records.

## Decision Question Format

Prefer A/B or A/B/C choices when the decision can be narrowed. Each option must
include business cost, system impact, and downstream nodes affected.

```markdown
## Infrastructure Decision
About "{decision topic}", there are {two/three} viable choices:

- **A. {option name}.** {what changes}
  _Cost / impact:_ {business cost, operational impact, affected systems}
- **B. {option name}.** {what changes}
  _Cost / impact:_ {business cost, operational impact, affected systems}
- **C. {option name}.** {what changes}
  _Cost / impact:_ {business cost, operational impact, affected systems}

Recommended default: **{A/B/C}** because {lowest-risk reason}.

Which option should this project optimize for first?
```

If the user hesitates, choose the lowest-risk reversible default and state the
responsibility boundary:

```markdown
We can start with the lowest-risk option, but the assumption must stay visible:
{owner} owns the follow-up decision if {risk or data point} proves wrong after
validation.
```

## Product Contract Additions

When the infrastructure discovery produced durable decisions, include these
sections inside the Product Contract only when material.

### Infrastructure Scope

State what environment, sites, product families, lifecycle stage, and phase-one
boundary are in scope. Name explicit non-goals when they prevent scope creep.

### Decision Log

Use a compact table:

| Date | Layer | Topic | Decision | Owner | Risk |
|---|---|---|---|---|---|
| YYYY-MM-DD | L1/L2/L3/L4 | Decision topic | Chosen default | Role/team | Residual risk |

### Confirmed Requirements

List behavior or operational outcomes that must be implemented exactly. Use
R-IDs when downstream planning, review, or testing will reference them.

### Assumption-backed Requirements

List requirements that depend on unverified environment facts or business
choices. They must be implemented so they can change cheaply after validation.

### Lifecycle / Runbook Expectations

Capture required lifecycle coverage: pre-check, build, migrate, validate,
rollback, stabilize, document, hand off, operate, and retire. Keep this at
requirements level; exact commands and file paths belong in `ce-plan`.

### Operational Acceptance Criteria

Define the evidence that proves the infrastructure outcome is ready: health
checks, RPO/RTO evidence, backup restore test, HA/failover test, monitoring
visibility, audit trail, change record, stakeholder sign-off, and support
handoff.

## Guardrails

- Confirm the scene before choosing architecture.
- Resolve L1 before L2, L2 before L3, and L3 before L4 unless the user
  explicitly pins a lower-level fact as a hard constraint.
- Ask one decision question at a time.
- Do not pretend unknown environment facts are confirmed.
- Keep implementation details out unless the brainstorm is explicitly about an
  infrastructure architecture decision.
- Mark uncertain logic as assumption-backed instead of burying it in confirmed
  scope.
- Make rollback, evidence, ownership, and handoff visible for every risky
  migration, upgrade, HA, Backup / DR, patching, or deployment project.
