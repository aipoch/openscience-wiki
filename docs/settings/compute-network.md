---
sidebar_position: 5
title: Compute and Network
last_update:
  date: '2026-09-07'
---

# Compute and Network

## Compute

![Compute panel](/img/open-science/settings-compute.png)

Compute manages local and remote SSH hosts. The list shows status, resources, and default or enabled state. `Add host` opens the connection form, a host card opens its details, and the switch determines whether the agent may select it.

The Add form usually includes Display name, Host, Port, Username, authentication or SSH configuration, and a trust confirmation. Saving starts a probe; choose `Retry probe` if it fails. Do not paste private-key contents into an ordinary description field. Prefer the system SSH configuration or SSH agent.

Host detail provides:

- `Resources`: detected CPU, memory, GPU, scheduler, and related information.
- `Details`: inspect, edit, copy, or delete the connection configuration.
- `Scratch root`: choose Edit, enter the remote temporary work directory in `Scratch root path`, then Save or Cancel.
- `Concurrent job limit`: choose Edit, enter a positive integer that limits concurrent jobs on this host, then Save or Cancel.
- Probe/Refresh: detect online status and resources again.
- Remove/Delete: remove the configuration after confirmation; remote files on the host are not deleted.

### Direct SSH and Slurm

Each host has an `Execution mode` selector. **Direct SSH** starts the workload through the SSH connection. **Slurm** submits it to the cluster scheduler, then polls, recovers, cancels, and cleans up through durable job receipts. The selected mode persists per host.

![Slurm execution mode for an SSH host](/img/open-science/v0.26.0/compute-slurm-mode.png)

Before choosing Slurm, confirm `sbatch`, `squeue`, `sacct`, and `scancel` are available as required by the cluster; verify the login-node policy, account/partition/QoS, wall-time, scratch path, modules, and environment activation. Use the **Compute Environment Setup** Skill to produce host-specific setup or repair instructions, then review them with the cluster administrator. The Skill does not grant scheduler access and should not be applied blindly.

If submission fails, expand the job activity and keep the scheduler job ID. Check account/partition policy and remote storage before retrying. Cancel through Open Science when possible so scheduler state and staged-file cleanup stay synchronized; confirm the job in the cluster's own tools if recovery remains uncertain.

When an agent asks to execute remotely, Compute shows an approval request with `Deny`, `Allow once`, `Allow for session`, project, and global options. Project and global scopes need an extra confirmation. Long jobs can be submitted and tracked; Open Science can then harvest their results into the project.

## Network

![Network panel](/img/open-science/settings-network.png)

`Network status` combines the local link state with an end-to-end probe. It reports Checking, reachable, unreachable, or offline. If the check fails, use `Check again` and inspect Wi-Fi or Ethernet, the proxy or VPN, the firewall, and package mirrors.

### Package mirror

`Configure` or `Edit` opens these inputs:

| Input | Example or purpose |
| --- | --- |
| `Conda channel mirror` | The root URL for a Conda-forge mirror |
| `Python package index (pip)` | A pip index URL ending in `/simple` |
| `CA bundle path` | An optional PEM file trusted by Conda, pip, and R behind a corporate TLS proxy |

`Cancel` discards the draft, `Save` stores it, and `View available mirrors` opens help. Mirrors affect package downloads only; they are not general Provider proxies. An incorrect mirror can cause runtime or package installation to fail.

### Global proxy and runtime domains

Proxy offers System, Manual, and Direct. Manual applies to Electron and subsequently spawned agents, notebooks, compute helpers, and installers; URLs with embedded credentials are rejected and loopback is bypassed. Direct clears inherited proxy variables for child processes. Test provider and package connectivity after changing it.

Notebook network domains control which destinations Notebook and compute runtimes may reach. Review blocked-domain approvals in the conversation. `Allow once` is command-scoped; `Always allow` persists more broadly. Windows reports whether its one-time administrator sandbox setup is complete. This is a runtime boundary, not a whole-device firewall.
