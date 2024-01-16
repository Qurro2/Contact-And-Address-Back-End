# Address API SPEC

## Create Address API

Endpoint : POST / API / Contacts / :Contactid / addresses

Headers :

- Authorization : token

Reqeust Body : `json{
    "street" : "jalan apa" ,
    "city" : "kota apa" ,
    "province" : "provinsi apa" ,
    "country" : "negara apa",
    "postal_code" : "kode apa"
}`

Response Body Success : `json{
    "data" : {
    "street" : "jalan apa" ,
    "city" : "kota apa" ,
    "province" : "provinsi apa" ,
    "country" : "negara apa",
    "postal_code" : "kode apa"
}
}`

Response Body Error : `json{
    "errors" : "Country is required"
}`

## Update Address API

Endpoint : PUT / API / Contacts / :Contactid / addresses / :addressid

Headers :

- Authorization : token

Reqeust Body : `json{
    "street" : "jalan apa" ,
    "city" : "kota apa" ,
    "province" : "provinsi apa" ,
    "country" : "negara apa",
    "postal_code" : "kode apa"
}`

Response Body Success : `json{
    "data" : {
    "id" : 1,
    "street" : "jalan apa" ,
    "city" : "kota apa" ,
    "province" : "provinsi apa" ,
    "country" : "negara apa",
    "postal_code" : "kode apa"
}
}`

Response Body Error : `json{
"errors" : "country is required"
}`

## Get Address API

Endpoint : GET/ API / Contacts / :contactid / addresses / :addressid

Headers :

- Authorization : token

Response Body Success : `json{
    "data" : {
    "id" : 1,
    "street" : "jalan apa" ,
    "city" : "kota apa" ,
    "province" : "provinsi apa" ,
    "country" : "negara apa",
    "postal_code" : "kode apa"
}
}`

Response Body Error : `json{
    "errors" : "Contact is not found"
}`

## List Address API

Endpoint : GET / API / Contacts / :contactid / addresses

Headers :

- Authorization : token

Response Body Success : `json{
"data" : {
"id" : 1,
"street" : "jalan apa" ,
"city" : "kota apa" ,
"province" : "provinsi apa" ,
"country" : "negara apa",
"postal_code" : "kode apa"
},

{
"id" : 2,
"street" : "jalan apa" ,
"city" : "kota apa" ,
"province" : "provinsi apa" ,
"country" : "negara apa",
"postal_code" : "kode apa"
}
}`

Response Body Error : `json{
    "errors" : "contact is not found"
}`

## Remove Address API

Endpoint : DELETE/ API / Contacts / :contactid / addresses / :addressid

Headers :

- Authorization : token

Response Body Success : `json{
    "data" : "OK"
}`

Response Body Error : `json{
    "errors" : "address is not found"
}`
