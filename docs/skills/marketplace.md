---
title: Skill marketplace
description: Discover, install, update and manage research methods from the Skill marketplace.
last_update:
  date: '2026-11-11'
---

# Skill marketplace

Open **Resource center → Skills → Marketplace** from Home or the project sidebar. Search for a research method, inspect its package details and install it when appropriate. The Web workspace also supports marketplace installation; packages are installed on the connected Open-Science host.

Use **Installed** to return to local methods. To import a ZIP, installed folder or GitHub repository, follow [Skill import and management](manage.md). See [Using Skills](overview.md) for selecting a method in a conversation.

![The Resource center with Installed and Marketplace tabs](/img/open-science/v121/resource-center.webp)

## Find a suitable method

1. Open **Marketplace**, enter a name or keyword in **Search skills**, and use **Filters** to narrow the catalog. Reset filters or clear the query to broaden it again.
2. Select **View details**. Read the purpose, publisher, author, version, license and **Sources and verification**. Open **Assessment report** when available.
3. Compare inputs, required tools and runtime dependencies with your project before selecting **Install**. Wait for **Installed** or an installed-version label, then inspect availability.

A distribution signature identifies the package source; an upstream assessment score is not proof that the method is correct for your research question. Installing a Skill does not run its workflow or install every scientific dependency.

![A Skill installed through the Web marketplace with its version and source details](/img/open-science/v121/marketplace-installed.webp)

## Install and use a Skill

1. Select **Install** on the chosen card and wait for **Installed**.
2. Open the installed Skill and confirm its availability for Main or the intended Specialist.
3. Prepare an input that meets the Skill’s requirements, then use it on a bounded task.
4. Open the generated files and check the result against your request. Installation alone does not establish that a research run succeeded.

For selecting a Skill in a conversation, see [Using Skills](overview.md). Configure a Specialist’s methods through [Skills and Connectors](../specialists/capabilities.md).

## Install or update several Skills

1. Choose **More actions → Batch manage**, then **Not installed** or **Updates**.
2. Filter the catalog and select the intended entries. **Select all filtered results** selects the filter’s full result set.
3. Open **Review selection** and check the list before choosing **Install selected** or **Update selected**.
4. Wait for the operations to finish and inspect each result. Installation runs sequentially; stopping allows the current item to finish.
5. Review failed or stopped entries and retry only what is needed.

## Update or remove a method

When an update is available, open **Review Skill update** before confirming. Check the old and new versions, affected Specialists, and files to be added, changed or removed. The diff shows line numbers, red deletions and green additions. For binary, oversized or unreadable comparisons, use the listed file changes; an unavailable diff does not mean the files are unchanged.

If the dialog reports local edits, updating replaces them. [Export a copy](manage.md) first if you need to keep them. Choose **Update existing Skill** only after review; this preserves the Skill identity and its Specialist relationships. For **Local conflict**, open **View installed Skill** and follow the review action when offered. If it remains blocked, preserve the message instead of deleting the local method to force installation.

Use the installed Skill’s detail actions to change availability or uninstall it. After a change, confirm the intended method is available to Main or the Specialist that will use it; a downloaded package and an available method are separate states.

## If installation or use fails

For a catalog or package verification error, retain the message and retry through the normal marketplace entry. Do not replace the package with an unverified download. Marketplace browsing uses the official distribution service and does not require a GitHub login.

If installation completes but a task cannot run, inspect the missing dependency or tool named in the error. Follow [runtime setup](../guides/runtimes.md) for software dependencies or [Connector setup](../guides/connectors.md) for required services, then retry the task with the intended input and check the saved result.

## Submit your own Skill to the marketplace {/* #submit-a-skill */}

Marketplace submissions use a GitHub source repository and maintainer review. **Upload skills** imports a method into your local application; **Publish** in the personal Skill editor saves a local Skill. Neither action lists it in the public marketplace.

### Prepare the Skill

1. [Create and test the Skill](create.md), including the scripts, references and other files it needs.
2. Upload those files to a subdirectory of your GitHub repository, such as `skills/your-skill-name/`, with `SKILL.md` inside. Keep the required license notices with the source.
3. Commit the complete content and copy that commit’s full SHA. The submission must identify a fixed revision, not a moving branch.

`SKILL.md` needs `name`, `description` and a license declaration at `license` or `metadata.license`. The declaration and included notices must describe the actual content you are submitting.

### Prepare the submission file

Start with the official [release.config.json template](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/example/release.config.json). Replace its placeholders with your Skill’s information:

| Field | What to supply |
| --- | --- |
| `id` | The lowercase, hyphenated name used in `SKILL.md`. |
| `version` | A package version such as `1.0.0`. |
| `category` | One of `Academic Writing`, `Data Analysis`, `Evidence Insight`, `Protocol Design` or `Other`. |
| `source.repository`, `source.commit`, `source.path` | Your HTTPS GitHub URL, full 40-character commit SHA and Skill directory. |
| `license_files` | Repository-relative paths to the applicable license files at that commit. |

The template’s all-zero commit is a placeholder and cannot be published. Check the current [submission format](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/release.config.schema.json) before submitting.

### Request inclusion and check the published result

Follow the marketplace repository’s [contribution instructions](https://github.com/aipoch/openscience-skill-marketplace/blob/main/CONTRIBUTING.md) to prepare a pull request. If you do not have write access, use a fork. Provide the submission file, source location, purpose and your local test result; the payload remains in your source repository. Maintainers can track the reviewed configuration under `authoring/submissions/<id>/release.config.json`; confirm its placement during review.

Maintainers review and register eligible submissions before publication. A submitted file or merged pull request does not itself make the Skill available in the app. The [authoring guide](https://github.com/aipoch/openscience-skill-marketplace/blob/main/authoring/README.md) describes the review and publication stages.

After publication, return to **Marketplace → Refresh**, search for the Skill, check its source and version, and install it. When updating a published Skill, submit a new package version with the new source commit; do not assume edits to the upstream repository update installed copies automatically.
