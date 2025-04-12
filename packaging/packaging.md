## Packaging

Take a look at the following lines:

    <script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@3.1.3/dist/vue-router.js"></script>
    <script src="https://unpkg.com/vuex@3.1.2/dist/vuex.js"></script>
    <script src="https://unpkg.com/jquery@3.4.1/dist/jquery.js"></script>
    <script src="https://unpkg.com/bootstrap@4.4.1/dist/js/bootstrap.js"></script>
    <script src="https://unpkg.com/axios@0.19.1/dist/axios.js"></script>
    <script src="https://unpkg.com/cuid@2.1.8/dist/cuid.js"></script>
    <script src="https://unpkg.com/jsondiffpatch@0.4.1/dist/jsondiffpatch.umd.js"></script>
    <script src="https://unpkg.com/d3@5.15.0/dist/d3.js"></script>
    <script src="https://unpkg.com/zone.js@0.10.2/dist/zone.js"></script>
    <script src="https://unpkg.com/immutable@4.0.0-rc.12/dist/immutable.js"></script>
    <script src="https://unpkg.com/popper.js@1.16.0/dist/umd/popper.js"></script>
    <script src="https://unpkg.com/chart.js@2.9.3/dist/Chart.js"></script>

Vue, VueRouter, Vuex, jQuery, Bootstrap, Axios, Cuid and Jsondiffpatch
among others, uses `dist` directory to distribute their prebuild
packages. __PROJECT_NAME__ can do the same. Here is a workflow:

1. Ensure that there are no changes
2. Increase a version
3. Update `dist` directory
4. Make a commit
5. Create a tag

```
# Increase a version without commiting it and making a tag
npm version $1 --git=/bin/true # this is a hack; substitute `true` for `git`
# Rebuild dist
rm -rf dist
npm run build
git add package.json package-lock.json dist
git commit -m "release v$(node -e 'console.log(require("./package.json").version)')"
# Create a tag
git tag v$(node -e 'console.log(require("./package.json").version)')
```

For simplicity here is `bin/release major|minor|patch` script which
will do all of this. Feel free to use and tweak it:

    #!/bin/bash

    # http://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
    # http://redsymbol.net/articles/unofficial-bash-strict-mode/
    set -o nounset -o errexit -o pipefail

    script=`realpath $0`
    scriptdir=`dirname $script`
    scriptname=`basename $script`

    cd $scriptdir/..

    case "${1-}"  in
    major|minor|patch)
        ;;
    *)
        echo usage: release 'major|minor|patch' 2>&1
        exit 1
        ;;
    esac

    # Increase a version without commiting it and making a tag
    npm version $1 --git=/bin/true # this is a hack; substitute `true` for `git`
    # Rebuild dist
    rm -rf dist
    npm run build
    git add package.json package-lock.json dist
    git commit -m "release v$(node -e 'console.log(require("./package.json").version)')"
    # Create a tag
    git tag v$(node -e 'console.log(require("./package.json").version)')
