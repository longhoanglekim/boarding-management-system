
docker run -d --name postgres_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=123456 -p 5432:5432 postgres:16
docker run -d --name payment_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=payment_db -p 5432:5432 -v C:\projecct\github\boarding-management-system\backend\payment-service\db:/docker-entrypoint-initdb.d postgres
