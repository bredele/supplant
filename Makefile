
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

test: build
	open test/browser/index.html

clean:
	rm -fr build components

.PHONY: clean
