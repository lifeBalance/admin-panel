.PHONY:
mysql:
	cd docker && docker compose -f ./compose-mysql.yml up

.PHONY:
mysql-clean:
	cd docker && docker compose -f ./compose-mysql.yml up --build --force-recreate