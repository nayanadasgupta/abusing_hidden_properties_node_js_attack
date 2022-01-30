
# Abusing Hidden Properties to Attack the Node.js Ecosystem

Implementation of Abusing Hidden Properties to Attack the Node.js Ecosystem ([Xiao et. al. 2021](https://www.usenix.org/conference/usenixsecurity21/presentation/xiao)).

## Central Payload Server API

Add a payload for a specific application. If a payload for the application already exists, it will be replaced by the newer application.

```
curl -i -X POST \                                          
    -H "Content-Type: application/json" \
    -d '{ "application_id": [APPLICATION_NAME], "payload": [APPLICATION_PAYLOAD]}' \
    http://localhost:1337/payloads
```

Delete payload for a given application.

```
curl -i -X DELETE http://localhost:1337/payloads/[APPLICATION_NAME]
```

Query the payload for a given application.

```
curl -i -X GET http://localhost:1337/payloads/[APPLICATION_NAME]
```

Query all payloads.

```
curl -i -X GET http://localhost:1337/payloads/
```



