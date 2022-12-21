#### Crear volume y copiarle el `dias-db.json`

```bash
$docker volume create con-lo-ojo

$docker run -v con-lo-ojo:/data -itd --rm --name helper busybox
$docker cp ./dias-db.json helper:/data
$docker stop helper
```

#### Crear y correr container

Modificar el docker-compose.yaml y agregar las variables BOT_TOKEN y CHISTES_URI. 
La version 1.25 de docker-compose no permite pasar las variables de ambiente en el yaml.

https://docs.docker.com/compose/environment-variables/

```bash
$docker-compose up --build --force-recreate
```