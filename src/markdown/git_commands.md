---
slug: "/article/git-commands"
series: "git good at git"
date: "2022-09-01"
title: "Useful git commands"
subtitle: "A cheat sheet of git commands, for things I often have trouble with"
tags: "git version-control cli"
published: true
excerpt: What can be said about git? Version Control as a concept still blows my mind to this day, and when everything is going right, it can feel like magic.
reading_time: 10
cover_image: "IMG_5793.jpg"
cover_image_credit: "image credit: Stefan Nowak"
---


What can be said about git? Version Control as a concept still blows my mind to this day, and when everything is going right, it can feel like magic – merging master back into an ancient feature branch and [Everything Just Working(tm)](https://www.youtube.com/watch?v=nVqcxarP9J4), with all the latest updates, never gets old.

This post is not for one of those days. It is for one of those *other* days when you're trying to do something simple, and all you get back is a stone-faced `Already up to date.` Or, even worse, a `Failed to push refs to remote`.

Suddenly things are feeling a lot less magical than the other day. The veil is lifted, the illusion is broken; you realise santa is not real, the easter bunny doesn't hide the chocolates and there is no such thing as magic–just a big stack of C code written by some volunteer Bulgarian open-source wizard being cyberbullied by a Finnish guy with serious [behavioural problems.](https://www.newyorker.com/science/elements/after-years-of-abusive-e-mails-the-creator-of-linux-steps-aside)

So, here are some common situations and some suggestions for how to extract yourself from said predicaments.


## Take me back!

Irreversibly broken your local environment after hacking some stuff together? (for uncommitted changes)

```markdown
# See the log of commits to find where you want to go back to
git log

# Hard reset your local repo to what it was like at the given commit
git reset --hard <COMMIT_ID>
```


## Father, I hath committed a sin

Committed some stuff that's causing problems? Revert them!

A revert is different from other ways of undoing committed changes like `reset`, as it creates a new commit on the HEAD that is the inverse of the given commit, preserving the history of the repo. Kind of like if you were to undo everything you did in the commit as a new commit and committed that commit. *Capisce?*

```markdown
# See the log of commits to find which commit you'd like to undo
$ git log

# Revert the commit!
$ git revert <COMMIT_ID>
```


## OK, but what if I committed to master? (Or prod, or main, or trunk, etc.)

Don't you worry, don't you worry child...

Just create a new branch, roll back the master branch (where you accidentally committed your changes) to how it was before, and bring those changes with you to the new branch.

```markdown
# make a new branch to move to
$ git branch new-branch
# reset the current branch state and make the changes unstaged
$ git reset HEAD~ --hard
# move to the new branch
$ git checkout new-branch
```


## Git friendly

Find yourself typing out `git commit -m "another commit"` again and again? Get friendly with `git` and agree on some shorthands!

These can also be modified in the `~/.gitconfig` file.

```markdown
# alias "git co" to "git checkout"
$ git config --global alias.co checkout
# alias "git ci" to "git commit"
$ git config --global alias.ci commit
# alias "git br" to "git branch"
$ git config --global alias.br branch
```


## Dress rehearsal

About to do something that might have far-reaching, unretractable consequences? Like, say, pushing to production? I find it gives me peace of mind to do a `--dry-run` first, which means that git will simulate the action of the command but *not actually go through with it.*

```markdown
# Don't actually do the thing, but *simulate* the CLI output for if you did.
# Works with many of git's commands, clean is just an example.
$ git clean -fd --dry-run
```


## Judge other* people's code

You're working in a file and you're like, *"this is the worst thing I have ever seen. absolute spaghetti ramyun [chapagetti](https://en.wikipedia.org/wiki/Chapagetti) logic. Who could be unironically committing this to our beautiful repo!?"*

Be careful what you wish for though... it might just have been **you** 6 months ago.

<iframe allow="fullscreen" frameBorder="0" height="290" src="https://giphy.com/embed/zRwA2JgARLVYgWtfgY/video" width="100%"></iframe>

*Protip: Just blame it on someone who's already left the company.*

```markdown
# See the attribution for a given line range, for the given file
$ git blame -L <START_LINE_NUMBER>,<END_LINE_NUMBER> <FILE_PATH>
```


## Look how they massacred my file

Sometimes it can be helpful to see how a file has changed, especially if something that used to work is no longer working after merging the latest commits on prod back into your local branch, for example.


```markdown
# See a log of changes to the provided file
$ git log -p <FILE_PATH>
```


## Pull; things are Up To Date. Push; rejected for missing refs. Push... (repeat 20x)

This is a weird one I get sometimes when I forget to set an upstream on a local branch pushed to remote.

```markdown
# Set upstream of the current branch
$ git branch -u <REMOTE_BRANCH_NAME>
```


## Wait... what was I even doing again?

We all get this one. Go off and make a coffee and then: head empty. Mind blank. Buh.

```markdown
# Show the diff comparing local working directory and the last commit on the current branch
$ git diff HEAD
```


## I need this, but I also don't want to commit this

I often find that my local environment needs a lot of modifications in order to make it work for development that definitely shouldn't be pushed to remote. For example, fiddling with configuration files to point them to local versions of some service, or commenting out certain functions that I don't want to have run in local development cycles for speed or data reasons.

Luckily for us, `git` was built by people who had similar workflows, and so has native support for "stashing"; this command pops all the modifications made since the last commit onto a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) of such groups of modifications, allowing us to get our repo back to that previous state, without losing our changes.

```markdown
# stash the current changes in the repo
$ git stash
# stash current changes, including *untracked* files
$ git stash -u
# recall the last stashed changes
$ git stash pop
# see all of your stashes
$ git stash list
```


## ...wait, one last thing!

Ever think you're finished, and then commit, only to realise – *wait, no, I still need to do X?* Or, accidentally committed something that shouldn't be pushed? No problem, *git got ya.*

```markdown
# Replace the last commit with the currently-staged changes and the last commit together in one commit.
# Or, use with nothing staged to change the last commit's commit message.
$ git commit --amend
```


## More git resources
- [git-tips/tips](https://github.com/git-tips/tips) is a collection of more tips and tricks to get the most out of git.
- [git immersion](https://gitimmersion.com) is a guided tour of git where you learn by doing.
- [The Odin Project](https://www.theodinproject.com/lessons/foundations-git-basics) has an excellent Git Basics module.
- [A Visual Git Reference](http://marklodato.github.io/visual-git-guide/index-en.html) is great for people who get more out of diagrams than with text, which is super useful for some of the more complex git scenarios out there.
- [GitHub Minesweeper](https://profy.dev/project/github-minesweeper) play Minesweeper while learning git!
- [https://learngitbranching.js.org](Learn Git Branching) is an amazing fake desktop environment where you can learn command line git in the browser.
- [Oh My Git!](https://ohmygit.org) another open-source game for learning how to use git. so good!