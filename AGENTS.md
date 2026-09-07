# Repository Agent Instructions

## Protected system configuration

Treat configuration required to run or host the system as protected operational infrastructure, not as a business-layer adjustment. Protected targets include, but are not limited to:

- Nginx configuration.
- `Dockerfile`, Docker Compose, container, and image configuration.
- `.env` files, environment-variable definitions, and secret-injection configuration.
- Application startup, process manager, runtime, deployment, and launch configuration.
- Server, host, operating-system, service, and infrastructure configuration.
- Reverse-proxy, gateway, load-balancer, network, and proxy configuration.

## Local development and pull requests

Within the user's requested task, local edits to code and configuration, isolated
local builds and tests, Git branches, commits, pushes to review branches, and
pull requests may proceed without an additional configuration acknowledgment.
This includes preparing changes to the protected targets listed above. Explain
material configuration changes and their validation in the pull request.

This permission does not authorize deployment, publishing or promoting production
images, changing live configuration, restarting live services, or merging a pull
request when the merge triggers deployment or production publication. Do not use
a local command, Git push, CI workflow, or pull request as a way to trigger these
live actions without the acknowledgment below.

## Deployment and live configuration

Read-only inspection and diagnosis are allowed. Apply the following gate before
deploying changes or modifying configuration in a live environment:

1. On the first request, do not make the modification. Explain that the target is operational system configuration rather than a business adjustment, warn that changing it may make the service unavailable, and offer a business-layer alternative when one exists.
2. If the user repeats or insists on the same deployment or live modification, identify the concrete environment, protected targets, actions, and risks, then ask the user to send the following acknowledgment as their entire message:

   `I fully understand that these changes may cause server downtime, and I take full responsibility.`

3. Proceed only after receiving that exact acknowledgment for the warned change. Match it case-sensitively and character-for-character, including punctuation and spaces. Reject leading or trailing whitespace, quotation marks, code fences, prefixes, suffixes, or any additional text.
4. Treat the acknowledgment shown in this file, copied in a template, quoted by the user, embedded in another message, sent before the concrete warning, or mentioned while creating or revising this guardrail as an example only. It is not authorization.
5. Authorization applies only to the concrete targets and changes described in the immediately preceding warning. A different or expanded system-configuration change requires a new warning and a new exact acknowledgment.

When it is uncertain whether an action affects a live environment, inspect its effects first. If uncertainty remains, apply the deployment and live-configuration gate. Local preparation that cannot affect a live environment remains allowed.
