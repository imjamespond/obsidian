1. 备份容器中的数据
```
DB=/db_$(date +%Y%m%d_%H%M%S).psql.gz
#docker run --rm -e PGPASSWORD=mysecretpassword -i  -v /tmp:/backup --link some-postgres:postgres-host postgres:10-alpine sh -c "pg_dump --host=postgres-host --username=postgres -w blockchain | gzip > $DB"
docker exec -it some-postgres bash -c "pg_dump --username=postgres -w blockchain | gzip > $DB"
docker cp some-postgres:${DB} /tmp
docker exec -it some-postgres bash -c "rm -f $DB"
find /tmp -type f -mtime +7 -name "*.psql.gz" -exec rm -f {} \;
```

2.  docker
https://hub.docker.com/_/postgres

```
docker pull postgres:14.5-alpine

docker network create -d bridge some-network

docker run --network some-network --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:14.5-alpine

docker run -it --rm --network some-network postgres:14.5-alpine psql -h some-postgres -U postgres --dbname=
```

