echo 'CI/CD Deploy Start'

cd ../../back

echo 'backend image build'
docker build -t newstar_back .

cd ../front/newstar

echo 'frontend image build'
docker build -t newstar_front .

cd ../../pydata

echo 'fastapi image build'
docker build -t fastapi_back .

cd ../exec/deploy

EXIST_BLUE=$(docker compose -p deploy-blue -f docker-compose.blue.yaml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    docker compose -p deploy-blue -f docker-compose.blue.yaml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_SPRING_PORT=8081
    BEFORE_REACT_PORT=3001
    BEFORE_FASTAPI_PORT=8001
    AFTER_SPRING_PORT=8080
    AFTER_REACT_PORT=3000
    AFTER_FASTAPI_PORT=8000
else
    docker compose -p deploy-green -f docker-compose.green.yaml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_SPRING_PORT=8080
    BEFORE_REACT_PORT=3000
    BEFORE_FASTAPI_PORT=8000
    AFTER_SPRING_PORT=8081
    AFTER_REACT_PORT=3001
    AFTER_FASTAPI_PORT=8001
fi

sleep 10

echo "${AFTER_COLOR} server up(spring_port:${AFTER_SPRING_PORT}, react_port:${AFTER_REACT_PORT}, fastapi_port:${AFTER_FASTAPI_PORT})"

EXIST_AFTER=$(docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
    echo "nginx Setting"
    docker exec -i nginx /bin/bash -c "echo -e 'set \$spring_url http://172.17.0.1:${AFTER_SPRING_PORT};\nset \$react_url http://172.17.0.1:${AFTER_REACT_PORT};\nset \$fastapi_url http://172.17.0.1:${AFTER_FASTAPI_PORT};' | tee /etc/nginx/conf.d/service-url.inc && nginx -s reload"
    
    echo "Completed Deploy!"
    echo "$BEFORE_COLOR server down(spring_port:${BEFORE_SPRING_PORT}, react_port:${BEFORE_REACT_PORT}, fastapi_port:${BEFORE_FASTAPI_PORT})"
    docker compose -p deploy-${BEFORE_COLOR} -f docker-compose.${BEFORE_COLOR}.yaml down
fi

EXIST_NONE_IMAGES=$(docker images -f "dangling=true" -q)

if [ -n "$EXIST_NONE_IMAGE" ]; then
    docker rmi $EXIST_NONE_IMAGES
fi

