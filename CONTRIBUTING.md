# Getting Involved

There are many ways to contribute to the project, including fixing issues or improving documentation.

# Questions

Feel free to open an issue and pose your question.

# Issues

Think you've found a bug or have a new feature to suggest? Let us know!

## Reporting a Bug

1. Make sure you have the latest version of the code, if possible, as we may have already fixed your bug.

2. Search for similar issues. It's possible somebody has encountered this bug already.

3. Provide a demo that specifically shows the problem. This demo should be fully operational with the exception of
the bug you want to demonstrate. The more pared down, the better. Issues with demos are prioritized.

4. Your issue will be verified. The provided demo will be tested for correctness. The aws-ses team will
work with you until your issue can be verified.

5. Keep up to date with feedback from the aws-ses team on your ticket. Your ticket may be closed if it
becomes stale.

6. If possible, submit a Pull Request with a failing test. Better yet, take
a stab at fixing the bug yourself if you can!

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action.

## Requesting a Feature

1. Search Issues for similar feature requests. It's possible somebody has already asked
for this feature or provided a pull request that we're still discussing.

2. Provide a clear and detailed explanation of the feature you want and why it's important to add. Keep in mind that
we want features that will be useful to the majority of our users and not just a small subset.

3. If the feature is complex, consider writing some initial documentation for it. If we do end up accepting the
feature it will need to be documented and this will also help us to understand it better ourselves.

4. Attempt a Pull Request. If you are willing to help the project out, you can submit a Pull Request. We always have
more work to do than time to do it. If you can write some code then that will speed the process along.

# Pull Requests

## We love pull requests!
Here's a quick guide:

1. Fork the repo.

2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate:
`npm install && npm test`.

3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding
functionality or fixing a bug, we need a test!

4. Make the test pass.

5. Document your code.

7. Commit your changes.
    * If your pull request fixes an issue specify it in the commit message. Here's an example:
`git commit -m "Close #12 Fix passing of context"`.
[GitHub offers additional examples here.](https://help.github.com/articles/closing-issues-via-commit-messages/)
    * Follow [these instructions](http://chris.beams.io/posts/git-commit/#imperative) on how to write a commit message, paying particular attention to [#5](http://chris.beams.io/posts/git-commit/#imperative) and [#7](http://chris.beams.io/posts/git-commit/#why-not-how).

8. Push to your fork and submit a pull request againt the `master` branch. Please provide us with some explanation of why you made the changes you made. For new features make sure to explain a standard use case to us.

We try to be quick about responding to tickets but sometimes we get a bit backlogged.

Some things that will increase the chance that your pull request is accepted include:

* Include tests that fail without your code, and pass with it.
* Update the documentation, the surrounding one, examples elsewhere, guides, whatever is affected by your
contribution.


And in case we didn't emphasize it enough: **we love tests!**

NOTE: Partially copied from https://raw.githubusercontent.com/stefanpenner/ember-cli/master/CONTRIBUTING.md