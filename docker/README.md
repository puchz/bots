#### Generar imagen pasando como parametro un dockerfile

```bash
$ docker build -t con-lo-ojo-bot -f v0.1.0.dockerfile .
```

#### Correr el bot pasando variable de ambiente BOT_TOKEN generada desde telegram por BotFather

```bash
$ docker run --name con-lo-ojo-bot -e BOT_TOKEN="<token>" con-lo-ojo-bot
```

#### Generar imagen .tar para moverla a microk8s

```bash
# $ docker save con-lo-ojo-bot -o con-lo-ojo-bot.tar
$ docker save con-lo-ojo-bot > con-lo-ojo-bot.tar
$ microk8s ctr image import con-lo-ojo-bot.tar
```

#### Agregar el token en init.sh y correrlo
