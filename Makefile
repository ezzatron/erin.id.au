JS_VITEST_REQ += playwright-install

-include .makefiles/Makefile
-include .makefiles/pkg/js/v1/Makefile
-include .makefiles/pkg/js/v1/with-npm.mk
-include .makefiles/pkg/js/v1/with-playwright.mk
-include .makefiles/pkg/js/v1/with-msw.mk
-include .makefiles/pkg/js/v1/with-tsc.mk
-include .makefiles/pkg/js/v1/with-next.mk

.makefiles/%:
	@curl -sfL https://makefiles.dev/v1 | bash /dev/stdin "$@"

################################################################################

# Configure Playwright test projects to run for each target
ci:: JS_PLAYWRIGHT_TEST_PROJECTS ?= chromium firefox webkit
precommit:: JS_PLAYWRIGHT_TEST_PROJECTS ?= chromium firefox webkit

# Configure Vitest projects to run for each target
ci:: JS_VITEST_PROJECTS ?= chromium firefox webkit
precommit:: JS_VITEST_PROJECTS ?= chromium firefox webkit

# Verify generated files on precommit
.PHONY: precommit
precommit:: verify-generated

################################################################################

# run --- Run the app in development mode.
.PHONY: run
run: artifacts/link-dependencies.touch
	$(JS_EXEC) next dev --port 3000

# run-dist --- Run the app in production mode.
.PHONY: run-dist
run-dist: artifacts/dist
	NODE_ENV=production node artifacts/dist/run.mjs

# run-playwright-test --- Run the app in order to run Playwright tests.
.PHONY: run-playwright-test
run-playwright-test: artifacts/link-dependencies.touch
	$(JS_EXEC) next dev --port 7357

################################################################################

artifacts/dist: artifacts/next/dist/BUILD_ID $(JS_SOURCE_FILES) $(shell find public -type f)
	@rm -rf "$@"
	mkdir -p "$@"
	cp -a artifacts/next/dist/standalone/* "$@/"
	mkdir -p "$@/artifacts/next/dist/cache" && cp -a artifacts/next/dist/cache/* "$@/artifacts/next/dist/cache"
	mkdir -p "$@/artifacts/next/dist/static" && cp -a artifacts/next/dist/static/* "$@/artifacts/next/dist/static"
	cp -a public "$@/"
