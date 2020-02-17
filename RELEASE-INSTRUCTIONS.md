# Repository Release Instructions

This document captures the steps a project maintainer should follow when releasing a new version of this library.

* Merge all desired pull requests into `master` branch
* Update *CHANGELOG.md*
    * Organize each entry into one of the following categories, to be displayed in this order:
        * Breaking Enhancement
            * An enhancement that breaks the existing usage or features
            * Any change that requires a user to change their configuration (ie _package.json_ file)
        * Breaking Bug Fix
            * A bug fix that breaks the existing usage or features
        * Enhancement
            * An improvement to the usage or feature set that users are interested in.
        * Deprecation
            * A removed feature or method of usage
        * Bug Fix
            * Bug fixes
        * Documentation
            * Documentation changes
        * Internal
            * Changes that do not affect the usage or feature set
    * Following the pattern of the existing entries for guidance
    * Add appropriately linked "View complete changeset" link at bottom of entries
* After changes have been committed:
    * `npm version x.x.x`, where *x.x.x* is the Semantic Version of the changeset
    * `git push origin master`
    * `git push origin --tags`
    * `npm publish --registry http://registry.npmjs.org/ --access public`
        * Note: `--registry` flag is workaround for occasional issues with default SSL url
* Copy the content of the additions made to the *CHANGELOG.md* file to the Release Notes of the just-released tag
