const config = {
    "swagger": "2.0",
    "info": {
       
        "title": "Swagger Numerical Method"
    },
    "host": "my-json-server.typicode.com/Katoumat123/numer",
    
    "paths":{
        "/root_of_eqution":{
            "get":{
                "tags":[
                    "Root of eqution"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Root of Equation",
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        },
        "/root_of_eqution/{ExampleId}":{
            "get":{
                "tags":[
                    "Root of eqution"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Root of Equation",
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่างที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        },
        "/matrix":{
            "get":{
                "tags":[
                    "Matrix"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Matrix",
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        },
        "/matrix/{ExampleId}":{
            "get":{
                "tags":[
                    "Matrix"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Matrix",
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่าง",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        }
        ,
        "/interpolation": {
            "get": {
                "tags": [
                    "Interpolation"
                ]
                ,
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Interpolation"
                ,
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                    ,
                    "404": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        }
        ,
        "/interpolation/{ExampleId}": {
            "get": {
                "tags": [
                    "Interpolation"
                ]
                ,
                "summary": "กรอกหมายเลขโจทย์ ในเรื่อง Interpolation"
                ,
                
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่าง",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ]
                ,
                "responses": {
                    "200": {
                        "description": "ค้นพบโจทย์"
                    }
                    ,
                    "404": {
                        "description": "ไม่พบโจทย์"
                    }
                }
            }
        }
        ,
        "/regression": {
            "get": {
                "tags": [
                    "Regression"
                ]
                ,
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง regression"
                ,
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                    ,
                    "404": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        }
        ,
        "/regression/{ExampleId}": {
            "get": {
                "tags": [
                    "Regression"
                ]
                ,
                "summary": "กรอกหมายเลขโจทย์ ในเรื่อง regresstion"
                ,
                
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่าง",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ]
                ,
                "responses": {
                    "200": {
                        "description": "ค้นพบโจทย์"
                    }
                    ,
                    "404": {
                        "description": "ไม่พบโจทย์"
                    }
                }
            }
        }
       
       
    }
}

export { config }