# Joe's Tech Solutions site — agent entry point

This repo follows the canonical build-and-ship pipeline in
`joestechsolutions/agent-playbook/AGENTS.md` — isolate → structure → prove → ship,
with the ship step gated by an independent review-to-green pass (the `ship-loop`
skill, enforced by the `pr-review-watcher` cron). Never commit to `master`
directly; every change lands via a branch and a PR that Joe merges.

If this repo gains a `CLAUDE.md`, that file becomes its constitution and wins on
any conflict with the canonical pipeline.
