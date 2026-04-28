.PHONY: build package submodules

build:
	./utils/build.sh

package:
	./utils/package.sh

##
## Submodules
##

submodules:
	git submodule sync --recursive ${submodule}
	git submodule update --init --recursive ${submodule}

