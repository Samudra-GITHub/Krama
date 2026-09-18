.PHONY: start stop install build serve lint

start: install
	npm run dev

stop:
	powershell -NoProfile -ExecutionPolicy Bypass -File scripts/stop-dev.ps1

install:
	npm install

build:
	npm run build

serve: build
	npm run start

lint:
	npm run lint
