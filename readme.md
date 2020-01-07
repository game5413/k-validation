# K-Validation

## Introduction

> Validation library inspired from joi library and laravel validator, to make easy validation in vanilla.js

## Code Samples
### basic usage:
```
var validator = KValidation.schema(rules).validate(value)
```
##### or can be used with a callback
```
KValidation.schema(rules).validate(value, function(result) {
	// return
})
```

##### return from function was object with 3 keys applied

1. status **`[HTTP STATUS CODE]`**` sign the function execution`
2. message **`[STRING]`**` show message according to status`
3. data **`[OBJECT|NULL]`**` return null if there was no errors validation`
### pass rules object to schema function. example:
```json
{
   "id": "required",
   "title": "required|min-6"
}
```
##### KValidation have built-in validation rules:
- string
- number
- required
- min-{value} `// min-6`
- max-{value} `// max-12`
- phone
- email
- RegExp `// regex-(/[^0-9]/g)` **see notes for detail**
- sameas-{id} `// sameas-id`

### Notes
- for using regex rules, you must escape some special characters because rules writed as string
for example `regex-(/\d/g)` will return `regex-(/d/g)` if you not escape the special characters, so you had changes like
this `regex(/\\d/g)` and it will return `regex-(/\d/g)`

### Validation values can be passed with two variant
```json
{
   "id": "{value}"
}
```

##### or advanced using

```json
{
   "id": {
       "value": "value",
       "field": "field name",
       "rules": {
         "required": "custom message"
       }
   }
}
```
#### explanation:
> `value`: Value want validate
>
> `field`: Re-assign return field name if you called in custom message
>
> `rules`: Object with keys have a same name with validation rules
>
> **notes: to call field name in custom message, follow example below**
>
> ```json
> {
> 	"id": {
> 	  "value": "value",
> 	  "field": "User ID", // if you not passing it with default use object key as field name
> 	  "rules": {
> 		"required": "field {{field}} can't be empty!" // will return field User ID can't be empty!
> 	  }
> 	}
> }

## Installation

> The installation instructions are low priority in the readme and should come at the bottom. The first part answers all their objections and now that they want to use it, show them how.