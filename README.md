# Super Mario TS
Super Mario Game exercise with Type Script


## Git Using
```bash
0) git clone URL;
1) git pull;
2) git status;
3) git add fileName;
  - git add -A stages All;
  - git add . stages new and modified, without deleted;
  - git add -u stages modified and deleted, without new;
4) git commit -m "message"; //if entering commit without comment: [esc] + [:wq]
5) git push;
6) git pull;
```

## NPM Using
```bash
npm init;
npm install serve --save
npm run start
```
To update to a new major version all the packages, install the npm-check-updates package globally:
```bash
npm install -g npm-check-updates
```
then run it:
```bash
ncu -u
```
this will upgrade all the version hints in the package.json file, to dependencies and devDependencies, so npm can install the new major version.
You are now ready to run the update:
```bash
npm update
```
If you just downloaded the project without the node_modules dependencies and you want to install the shiny new versions first, just run
```bash
npm install
```
More details:
https://flaviocopes.com/update-npm-dependencies/


## Source
https://www.youtube.com/watch?v=g-FpDQ8Eqw8&

## VS Code shortuc
Fold folds the innermost uncollapsed region at the cursor:
```bash
Ctrl + Shift + [ on Windows and Linux
```

Unfold unfolds the collapsed region at the cursor:
```bash
Ctrl + Shift + ] on Windows and Linux
```

Fold All folds all regions in the editor:
```bash
Ctrl + K, Ctrl + 0 (zero) on Windows and Linux
```

Unfold All unfolds all regions in the editor:
```bash
Ctrl + K, Ctrl + J on Windows and Linux
```