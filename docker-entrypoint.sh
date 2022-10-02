#!/bin/sh

echo "Waiting MariaDB to launch on $MYMA_STORE_DATABASE_HOST:$MYMA_STORE_DATABASE_PORT..."

while ! nc -z $MYMA_STORE_DATABASE_HOST $MYMA_STORE_DATABASE_PORT; do
	sleep 1.0
done

echo "MariaDB launched"

exec "$@"
