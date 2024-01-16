# USER API SPEC

## Register User

Endpoint : POST / API / USERS

Request Body : `json{
    "username" : "qurro",
    "password" : "rahasia",
    "name" : "qurrota ayun"
}`

Response Body Succes : `` json{
    "data" : "qurro",
    "name" : "qurrota ayun"
}`

Response Body error : ``json{
"errors" : "Username already exists"
}```

## Login User

Endpoint : POST / API / USERS / LOGIN

Request Body : `json{
    "username" : "qurro",
    "password" : "rahasia"
}`

Response Body Succes : `json{
    "data" : {
        "token" : "unique_token"
    }
}`

Response Body Error : `json{
    "errors" : "Username or Password Wrong"
}`

## Update User

Endpoint : PATCH / API / USERS / CURRENT

Headers :
-Authorization : Token

Request Body : `json{
    "name" : "qurrota ayun" ,
    "password" : "rahasia"
}`

Response Body Succes : `json{
    "data" : {
        "username" : "qurro",
        "name" : "qurrota ayun"
    }
}`

Response Body Error : `json{
    "errors" : "Name Length max 100"
}`

## Get User

Endpoint : GET / API / USERS / CURRENT

Headers :
-Authorization : Token

Response Body Succes : `json {
    "data" : {
        "username" : "qurro",
        "name" : "qurrota ayun"
    }
}`

Response Body Error : `json{
    "errors" : "Unauthorized"
}`

## Logout User

Headers :
-Authorization : Token

Endpoint : Delet / API / USERS / LOGOUT

Response Body Succes : `json{
    "data" : "OK"
}`

Response Body Error : `json {
    "errors" : "Unauthorized" 
}`
