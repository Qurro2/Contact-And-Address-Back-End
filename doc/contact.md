# Contact API SPEC

## Create Contact API

Endpoint : POST / API / CONTACTS

Headers :
-Authorization : token

Request Body : `json{
    "first_name" : "Qurrota",
    "last_name" : "Ayun",
    "email" : "qurrota@gmail.com",
    "phone" : "12345"
}`

Response Body Success : `json{
"data" : {
"id" : 1,
"first_name" : "qurrota",
"last_name" : "Ayun",
"email" : "qurrota@gmail.com",
"phone" : "12345"
}
}`

Response Body Error : `json{
    "errors" : "Email is not valid format"
}`

## Update Contact API

Endpoint : PUT / API / CONTACTS / :id

Headers :
-Authorization : token

Request Body : `json{
    "first_name" : "Qurrota",
    "last_name" : "Ayun",
    "email" : "qurrota@gmail.com",
    "phone" : "12345"
}`

Response Body Success : `json{
"data" : {
"id" : 1,
"first_name" : "qurrota",
"last_name" : "Ayun",
"email" : "qurrota@gmail.com",
"phone" : "12345"
}
}`

Response Body Error : `json{
    "errors" : "Email is not valid format"
}`

## GET Contact API

Endpoint : GET/ API / CONTACTS / :ID

Headers :
-Authorization : token

Response Body Success : `json{
"data" : {
"id" : 1,
"first_name" : "qurrota",
"last_name" : "Ayun",
"email" : "qurrota@gmail.com",
"phone" : "12345"
}
}`

Response Body Error : `json{
    "errors" : "Contact is not found"
}`

## Search Contact API

Endpoint : GET / API / CONTACTS /

Headers :
-Authorization : token

Query Params :

- Name : Search by first_name or last_name , using like , optional
- Email : Search by email using like , optional
- phone : Search by phone using like , optional
- page : number of page , deafult 1
- size : size per page , default 10

Response Body Success : `json { 
    "data" : {
        "id" : 1,
        "first_name" : "Qurrota",
        "last_name" : "Ayun",
        "email" : "qurrota@gmail.com",
        "phone" : "12345"
    },
    {
        "id" : 2,
        "first_name" : "Qurrota",
        "last_name" : "Ayun",
        "email" : "qurrota@gmail.com",
        "phone" : "12345"
    },
    {
        "paging" : {
            "page" : 1,
            "total_page" : 3,
            "total_item" : 30
        }
    }
}`

Response Body Error :

## Remove Contact API

Endpoint : DELETE / API / CONTACTS / :ID

Headers :
-Authorization : token

Response Body Success : `json{
"data" : "OK"
}`

Response Body Error : `json{
    "errors" : "Contact is not found"
}`
