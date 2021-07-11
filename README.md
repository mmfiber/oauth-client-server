# oauth-client-server
### Docker をインストール
https://docs.docker.com/get-docker/
※ docker-compose のバージョンは 1.27.0+ が必要

### Docker の起動
```
doker-compose up
```

### DB を作成
```
docker exec -it oauth-client-server_db_1 /bin/bash
root@f921f5948e19:/# mysql -u root -p
Enter password: (何もし変更していなければ、password)

・・・

mysql> create database server;
```

### server の設定&起動
```
docker exec -it oauth-client-server_server_1 /bin/sh
/usr/local/app # cd server
/usr/local/app/server # npm i
/usr/local/app/server # npm run typeorm:migrate
/usr/local/app/server # npm run typeorm:seed
/usr/local/app/server # npm run watch
```

### client の設定&起動
まずは、DBからクライアントIDを確認
```
docker exec -it oauth-client-server_db_1 /bin/bash
root@f921f5948e19:/# mysql -u root -p
Enter password: (何もし変更していなければ、password)

・・・

mysql> use server;
mysql> select * from clients;
(ここに表示されるIDをメモしとく)
```

envファイルを作成する
```
docker exec -it oauth-client-server_client_1 /bin/sh
/usr/local/app # cd client
/usr/local/app/client # npm i
/usr/local/app/client # cp .env.example .env
/usr/local/app/client # vi .env
/usr/local/app/client # cat .env
CLIENT_ID=(メモしたIDをここに記入)
CLIENT_SECRET=secret

AUTHORIZATION_ENDPOINT=http://localhost:9001/auth/oauth/authorize
TOKEN_ENDPOINT=http://server:9001/auth/oauth/token/usr/local/app/client
/usr/local/app/client # npm run watch
```

http://localhost:9000/auth からアクセストークンとIDトークンを取得