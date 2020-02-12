```
git subtree push --prefix=my/folder subtree_origin master
```

Where:

- `--prefix=my/folder` is the folder within your supertree that you want to push to the subtree
- `master` is the branch in the `subtree`,
- `subtree_origin` is just another remote, which happens to point to your subtree's git repository. You can also type the full repo URL.

```
git subtree pull --prefix=my/folder subtree_origin master
```

Where:

- `pull` is the inverse of `push` (consume from subtree rather than produce to subtree)
- `--prefix=my/folder` is the folder/directory you want to pull the subtree into
- `subtree` (`remote`)
- `master` (branch)

Workflow:

- all control is handled in the supertree
- use `git remote add <subtree_origin>` for cleaner git commands from supertree
- subtrees work independently and are consumed from/produced to from supertree

[more info](https://medium.com/@v/git-subtrees-a-tutorial-6ff568381844)
