# memcached-task
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software

* [NodeJS](https://nodejs.org/en/docs/)
* [NPM](https://docs.npmjs.com/)

### Installing

A step by step series of examples that tell you how to get a development env running

Install dependenccies

```
npm install
```

Start the server

```
npm run start
```

# REST API

The REST API to the application is described below.

## Get aggregated information of events

### Request

`GET /events?eventName=eventName`

    curl -i -H 'Accept: application/json' http://localhost:3000/events?eventName=eventName

### Response

    HTTP/1.1 200 OK
    Date: Thu, 22 May 2020 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "totalEventsCaptured": 234,
    "eventsCapturedByTrackingIds": {
        "INF-3gbfcjjsd6vhvo": 225,
        "INF-ixpktk3itsk86": 3,
        "INF-1bi5qk0zocqcz": 3,
        "INF-yj562hjojzbtez": 3
    }
    }

## Generate random events

### Request

`GET /generate/`

    curl -i -H 'Accept: application/json' http://localhost:3000/generate

### Response

    HTTP/1.1 201 Created
    Date: Thu, 22 May 2020 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {
    "message": "generating events!"
    }

## Create an event

### Request

`POST /events/`

    curl -i -H 'Accept: application/json' http://localhost:3000/events

### Response

    HTTP/1.1 201 Created
    Date: Thu, 22 May 2020 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {
    "_id": "5ec7442ace740d260d5e1670",
    "path": "/visitors/events/",
    "value": {
        "fingerprint": "5d4697775392fc850a737fe225fbd8e9",
        "sessionId": "25ad9867-e9a5-cedf-0fc4-0c30b1c2a505",
        "visitorId": "1bfdd0e4-2629-6ef9-21ea-9f1b1f11fe02",
        "trackingId": "INF-1",
        "event": "click"
    },
    "createdAt": "2020-05-22T03:16:58.671Z",
    "updatedAt": "2020-05-22T03:16:58.671Z",
    "__v": 0
}

## Delete an event

### Request

`DELETE /events/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/events/:id

## Update an event

### Request

`PUT /events/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/events/:id
    

