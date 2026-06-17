---
name: git
description: "When any task was considered as moved to completed state Use this skill to create Pull request and share it use"
---

# Git Operations

Tool-driven. Every gate requires real terminal output — no guessing.

## Gate Checklist

```
[ ] 1 — Repo state captured (branch, status, log)
[ ] 2 — Diff analyzed; type/scope determined; staged set verified; secrets + migrations audited
[ ] 3 — Commit/operation completed with exact output
[ ] 4 — Post-operation state confirmed clean
```

---

## Phase 1 — Capture Repo State

```bash
git status
git branch -vv
git log --oneline -10
git status --short | grep -i migration    # must show nothing — migrations are never committed
```

> **Gate 1:** Current branch, dirty files, and last 10 commits captured.

---

## Phase 2 — Staging & Committing

### Step 1 — Analyze the diff to determine type and scope

```bash
git diff --staged    # if already staged
git diff             # if nothing staged yet
git status --porcelain
```

| Type | Use when |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code restructure — no feature or fix |
| `perf` | Performance improvement |
| `test` | Add or update tests |
| `docs` | Documentation only |
| `style` | Formatting/whitespace — no logic change |
| `build` | Build system or dependency changes |
| `ci` | CI/CD config changes |
| `chore` | Maintenance, tooling, misc |
| `revert` | Revert a previous commit |

**Scope** = affected module/area (e.g. `auth`, `budget`, `llm`, `billing`, `webhook`).

### Step 2 — Stage selectively

```bash
git add <file>                    # specific file
git add code-studio-extension/     # entire project folder
git add -p                        # interactive hunk-by-hunk
git reset HEAD <file>             # unstage a file
```

### Step 3 — Audit before committing

```bash
git diff --staged --stat
git diff --staged | grep -E "Password|Secret|ApiKey|ConnectionString" | head -20
# Any secret match → git reset HEAD <file> immediately
```

> **Gate 2:** Staged set reviewed. Type/scope determined. Migrations and secrets clean.

### Step 4 — Commit

```bash
# Standard
git commit -m "<type>(<scope>): <summary>"

# With body/footer
git commit -m "$(cat <<'EOF'
<type>(<scope>): <summary>

<optional body — explain WHY>

Closes #<issue>
EOF
)"

# Breaking change
git commit -m "feat!(auth): remove legacy token endpoint"
# or with BREAKING CHANGE footer in the body
```

**Message rules:** ≤ 72 chars · present tense imperative · one logical change per commit

> ⚠️ If a commit fails due to a hook, fix the issue and create a **new commit** — never `--no-verify` unless the user explicitly asks.

---

## Phase 3 — Sync with Remote

```bash
git fetch origin
git rebase origin/development   # preferred over merge for feature branches

# Conflict resolution loop:
# 1. Edit conflicted files (resolve <<<<< / ===== / >>>>>)
# 2. git add <resolved-file>
# 3. git rebase --continue   (or --abort to cancel)

git push --force-with-lease     # after rebase
git pull --ff-only              # pulling — avoids accidental merge commits
```

## Phase 4 — PR Creation

### Prerequisites — abort on any failure

```bash
# Verify on a feature branch (not main/development)
git branch --show-current | grep -vE '^(main|master|development)$' || { echo "Cannot create PR from protected branch"; exit 1; }

# Verify clean working tree
git diff --quiet && git diff --cached --quiet || { echo "Uncommitted changes found"; exit 1; }

# Sync with development
git fetch origin || { echo "Fetch failed"; exit 1; }
git rebase origin/development || { echo "Rebase failed — resolve conflicts"; exit 1; }

# Verify there are changes to PR
git diff origin/development...HEAD --quiet && { echo "No changes to PR"; exit 1; }

# Show what will be included
git diff origin/development...HEAD --stat

# Push
git push --force-with-lease || { echo "Push failed"; exit 1; }
```

### Create the PR

> **⚠️ MANDATORY PR TITLE FORMAT — never omit the parenthesised work-item-id:**
>
> | Type | Format | Example |
> |---|---|---|
> | Bug fix | `Bug(<work-item-id>): <imperative summary>` | `Bug(2721): Fix subscription migration` |
> | Feature | `Feature(<work-item-id>): <imperative summary>` | `Feature(1234): Add rate-limit dashboard` |
>
> - The `(<work-item-id>)` segment is **required**. Do NOT write `Bug: ...` or `Feature: ...` without it.
> - If the work-item-id is unknown, **stop and ask the user** via the `askQuestions` tool before proceeding: _"What is the work item / task ID for this PR?"_. Do NOT assume `N/A` or any default value.
> - Titles must be imperative, present-tense, and ≤ 72 characters after the prefix.

Use the appropriate script for your platform (Gitea REST API — works with this repo's Gitea remote):
- **Unix/Mac/WSL:** [.codestudio/skills/git/scripts/create-pr.sh](scripts/create-pr.sh)
- **Windows PowerShell:** [.codestudio\skills\git\scripts\create-pr.ps1](scripts/create-pr.ps1)

#### Token Setup

**Prerequisites:**
1. A `.env` file must exist at the workspace root. If not, create it with the following format:
   ```
   GITEA_TOKEN="your-token-here"
   ```
2. **Security:** Never request or expose tokens. Never commit the `.env` file — it's already in `.gitignore`

Scripts load `GITEA_TOKEN` from `.env` file at workspace root automatically. If missing, they fail with setup instructions.

#### PR Templates

Templates are in [pr-templates/](pr-templates/). Read the template file, then generate the PR body by filling ALL sections:

| Template | Use when |
|---|---|
| [bug-fix.md](pr-templates/bug-fix.md) | Bug fixes — root cause, breaking issue status, solution description, areas affected |
| [feature.md](pr-templates/feature.md) | New features — requires analysis doc link, solution description, manual test link |

**Minimal required fields for all PRs:**
- Description of what changed
- Solution description
- Areas affected
- **Code Studio usage section:** Must answer "Yes/No" whether Code Studio was used, and if Yes, check which capabilities (generate code, refactor, tests, bug fix, docs, review, etc.)
- **Label:** `cs:used` (required for all PRs where Code Studio was used)

#### Script Usage

```powershell
# Windows PowerShell — Bug fix
.\.codestudio\skills\git\scripts\create-pr.ps1 `
  -Title "Bug(<work-item-id>): <summary>" `
  -Base development `
  -Label "cs:used" `
  -Message "<filled PR body from template>"

# Windows PowerShell — Feature
.\.codestudio\skills\git\scripts\create-pr.ps1 `
  -Title "Feature(<work-item-id>): <summary>" `
  -Base development `
  -Label "cs:used" `
  -Message "<filled PR body from template>"
```

> **Note:** Always create PRs as regular (non-draft) PRs. Do not use the `-Draft` flag.

```bash

```bash
# Unix/Mac/WSL — Bug fix
./.codestudio/skills/git/scripts/create-pr.sh \
  --title "Bug(<work-item-id>): <summary>" \
  --base development \
  --label "cs:used" \
  --message "<filled PR body from template>"

# Unix/Mac/WSL — Feature
./.codestudio/skills/git/scripts/create-pr.sh \
  --title "Feature(<work-item-id>): <summary>" \
  --base development \
  --label "cs:used" \
  --message "<filled PR body from template>"
```

Scripts auto-detect Gitea URL and `owner/repo` from git remote.


---

## Phase 5 — Confirm Clean State

```bash
git status
git log --oneline -5
```

> **Gate 4:** Repo state matches expected outcome.

---

## Hard Rules

1. Always analyze `git diff` before staging — determine type and scope from actual changes.
2. Always audit staged set for secrets and migration files before committing.
3. Never commit `settings.json`, `package-lock.json`, `mcp.json` directories.
4. Never commit secrets (`Password`, `Secret`, `ApiKey`, `ConnectionString`).
5. Never commit any files from `openspec/` directory.
6. Always ask user confirmation via `askQuestions` tool before committing `package.json`.
7. Never use `--no-verify` unless the user explicitly asks.
8. Never `reset --hard` on a shared/pushed branch — use `git revert`.
9. Never `--force` push to `main`/`master`/`development` — use `--force-with-lease` on feature branches only.
10. Always rebase onto `origin/development` before opening a PR.
11. Build + tests must pass before pushing to any shared branch.
12. Always include `-Label "cs:used"` when creating PRs — this label is required to indicate Code Studio was used.
13. PR titles MUST follow `Bug(<work-item-id>): <summary>` or `Feature(<work-item-id>): <summary>` — the parenthesised ID is mandatory. If the ID is unknown, ask the user via the `askQuestions` tool before creating the PR. Never assume `N/A` or omit the ID (e.g., `Bug: ...` is invalid).