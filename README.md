{
	"info": {
		"_postman_id": "3ca2c5c1-1fc5-4317-bf4a-ba581781347d",
		"name": "Widatech Backend Engineer Test",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Section 1",
			"item": [
				{
					"name": "Create New Invoice",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"invoiceNo\": \"322\",\r\n    \"date\": \"2022-02-22\",\r\n    \"customerName\": \"asdfasf\",\r\n    \"salesPersonName\": \"asdasd\",\r\n    \"paymentType\": \"CASH\",\r\n    \"notes\": \"asdsad\",\r\n    \"listOfProductsSold\": [\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4920\"\r\n       },\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4921\"\r\n       },\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4922\"\r\n       }\r\n    ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice"
							]
						}
					},
					"response": []
				},
				{
					"name": "Update Invoice",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"invoiceNo\": \"123\",\r\n    \"date\": \"2022-02-22\",\r\n    \"customerName\": \"Herold\",\r\n    \"salesPersonName\": \"Nadya\",\r\n    \"paymentType\": \"CASH\",\r\n    \"notes\": \"Buying some product\",\r\n    \"listOfProductsSold\": [\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4920\"\r\n       },\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4921\"\r\n       },\r\n       {\r\n           \"_id\": \"621475c190c2721792ba4922\"\r\n       }\r\n    ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice/62147ba3a5267da3d61e3109",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice",
								"62147ba3a5267da3d61e3109"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete Invoice",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice/62147ba3a5267da3d61e3109",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice",
								"62147ba3a5267da3d61e3109"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get All Invoice",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/api/v1/invoice?page=1&size=2",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"v1",
								"invoice"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "size",
									"value": "2"
								},
								{
									"key": "date",
									"value": "2022-02-18",
									"disabled": true
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Section 2",
			"item": [
				{
					"name": "Upload Excel Invoice",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "file",
									"type": "file",
									"src": "/C:/Users/Sigit P. Noprianto/Downloads/InvoiceImport.xlsx"
								}
							]
						},
						"url": {
							"raw": "http://localhost:8080/api/excel/upload",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"excel",
								"upload"
							]
						}
					},
					"response": []
				},
				{
					"name": "Upload Excel Product",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "http://localhost:8080/api/product/upload",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"product",
								"upload"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}