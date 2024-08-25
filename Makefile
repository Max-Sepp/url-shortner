build:
	cd frontend && pnpm build && cd .. && go build -o ./out/main .