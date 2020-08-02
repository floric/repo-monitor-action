# Repository Monitor Action

This Github action generates custom metrics reports including the last releases using GitHub Pages.

The example for the project itself can found at:

https://floric.github.io/repo-monitor-action/

## Usage

An extensive example for this project can found at:

https://github.com/floric/repo-monitor-action/blob/master/.github/workflows/update-monitor.yml

The following steps generate some data and push them through the action to Pages:

```
steps:
    - uses: actions/checkout@v2.3.1
    - name: Calculate project metrics
    id: projectmetrics
    run: |
        yarn
        yarn build
        SIZE=($(du -s dist/))
        echo "::set-output name=code_size::$SIZE"
    - uses: floric/repo-monitor-action@v1.4.1
    name: Update Report
    with:
        key: code-size
        value: ${{ steps.projectmetrics.outputs.code_size }}
        token: ${{ secrets.GITHUB_TOKEN }}
```
