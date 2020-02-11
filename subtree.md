Add the remote

```
git remote add spool <git URL.git>
            | alias | github clone URL
```

Pulling from remote subtree

```
git subtree pull --prefix=src/spool spool master
         | cmd | | supertree dir | | remote | branch|
```

Pushing to remote subtree

```
git subtree push --prefix=src/spool spool master
         | cmd | | supertree dir | | remote | branch|
```

Everything in the subtree repos remains the same!
