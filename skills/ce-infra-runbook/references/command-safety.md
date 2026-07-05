# Command Safety

Every operational command or console action gets exactly one safety class.

## [READ-ONLY]

Inspection only. Examples: inventory, health/status, route/path display, configuration export, version query, log query.

Rules:

- safe classification still requires a target and expected result
- a command that triggers a diagnostic restart, packet capture with material load, or configuration lock is not automatically read-only

## [CHANGE]

Mutates configuration or state but is intended as the forward change.

Rules:

- state the prerequisite and recovery boundary
- state the immediate validation after the action
- separate the change from its validation step

## [DESTRUCTIVE]

Deletes, overwrites, detaches, destroys, formats, removes replication/protection, permanently rotates identity material, or otherwise risks irreversible data/service loss.

Mandatory guardrails:

1. Add `HUMAN APPROVAL REQUIRED` directly above the command/action.
2. Precede it with a separate `[READ-ONLY]` verification of target identity and current state.
3. State the exact STOP condition.
4. Link the rollback/recovery path; when no rollback exists, say `IRREVERSIBLE AFTER THIS STEP`.
5. Never fill an unknown object name, host, IP, volume, account, subscription, tenant, region, VPC, certificate, or datastore from context clues.

A destructive command with a wildcard or broad selector must remain a blocker unless the source plan explicitly authorizes that exact scope and the command is independently verified.

## [ROLLBACK]

Mutates the environment to return toward the approved recovery state.

Rules:

- cite the rollback trigger
- state the target recovery state
- validate the recovered state
- do not assume rollback is harmless; rollback actions may also be destructive and must carry the destructive guardrails when applicable

## Secrets and sensitive material

Never embed:

- passwords
- private keys
- access keys or secret keys
- bearer tokens
- API tokens
- recovery secrets
- production connection strings containing credentials

Use placeholders such as `<SECRET_FROM_APPROVED_VAULT>` and name the approved retrieval mechanism only when the source plan or project convention provides it.

## Command confidence

Exact syntax must be grounded in one of:

- current environment evidence supplied by the user
- an existing approved project script/SOP
- authoritative product documentation applicable to the named version
- a current configuration/export showing the command surface

Otherwise use `REQUIRES_VERIFICATION` and a placeholder. Plausible syntax is not evidence.
