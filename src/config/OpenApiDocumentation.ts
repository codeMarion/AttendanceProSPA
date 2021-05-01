const OpenApiDocumentation = {
    "openapi": "3.0.1",
    "info": {
      "description": "The REST API powering the AttendancePro platform.",
      "version": "1.0.0",
      "title": "AttendancePro REST API",
      "contact": {
        "email": "developers@attendancepro.co.uk"
      }
    },
    "servers": [
      {
        "description": "Development environment",
        "url": "https://attendanceproapi.azurewebsites.net"
      }
    ],  
    "paths": {
      "/Communication/send": {
        "post": {
          "tags": [
            "Communication"
          ],
          "summary": "This endpoint is used to send an email.",
          "requestBody": {
            "description": "The email content with relevant headers",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SendGridEmailRequest"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/SendGridEmailRequest"
                }
              },
              "application/*+json": {
                "schema": {
                  "$ref": "#/components/schemas/SendGridEmailRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Email sent successfully"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Communication/receive": {
        "post": {
          "tags": [
            "Communication"
          ],
          "summary": "This endpoint is used as a webhook for inbound emails from Twilio SendGrid",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "Dkim": {
                      "type": "string",
                      "nullable": true
                    },
                    "To": {
                      "type": "string",
                      "nullable": true
                    },
                    "Html": {
                      "type": "string",
                      "nullable": true
                    },
                    "From": {
                      "type": "string",
                      "nullable": true
                    },
                    "Text": {
                      "type": "string",
                      "nullable": true
                    },
                    "SenderIp": {
                      "type": "string",
                      "nullable": true
                    },
                    "Envelope": {
                      "type": "string",
                      "nullable": true
                    },
                    "Attachments": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "Subject": {
                      "type": "string",
                      "nullable": true
                    },
                    "Charsets": {
                      "type": "string",
                      "nullable": true
                    },
                    "Spf": {
                      "type": "string",
                      "nullable": true
                    }
                  }
                },
                "encoding": {
                  "Dkim": {
                    "style": "form"
                  },
                  "To": {
                    "style": "form"
                  },
                  "Html": {
                    "style": "form"
                  },
                  "From": {
                    "style": "form"
                  },
                  "Text": {
                    "style": "form"
                  },
                  "SenderIp": {
                    "style": "form"
                  },
                  "Envelope": {
                    "style": "form"
                  },
                  "Attachments": {
                    "style": "form"
                  },
                  "Subject": {
                    "style": "form"
                  },
                  "Charsets": {
                    "style": "form"
                  },
                  "Spf": {
                    "style": "form"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Email receieved successfully"
            }
          }
        }
      },
      "/Communication/{id}": {
        "get": {
          "tags": [
            "Communication"
          ],
          "summary": "Gets all emails that are linked to a given student",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "email address of a student",
              "required": true,
              "schema": {
                "type": "string",
                "description": "email address of a student",
                "nullable": true
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns all emails linked to a gives student"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Communication/reminders": {
        "post": {
          "tags": [
            "Communication"
          ],
          "summary": "HttpTrigger to send automatic reminder emails to risk students.",
          "responses": {
            "200": {
              "description": "Sends email reminders to risk students"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Course": {
        "get": {
          "tags": [
            "Course"
          ],
          "summary": "Retrieves all courses",
          "responses": {
            "200": {
              "description": "Returns all courses"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Course/{courseCode}": {
        "get": {
          "tags": [
            "Course"
          ],
          "summary": "Retrieves a course",
          "parameters": [
            {
              "name": "courseCode",
              "in": "path",
              "description": "Course code",
              "required": true,
              "schema": {
                "type": "string",
                "description": "Course code",
                "nullable": true
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/Course/absenceData": {
        "post": {
          "tags": [
            "Course"
          ],
          "summary": "Retrieves Absence Reason data",
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns absence reason data"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Course/coursedata": {
        "post": {
          "tags": [
            "Course"
          ],
          "summary": "Retrieves attendance data by courses",
          "requestBody": {
            "description": "String array of course code",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course code",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course code",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course code",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns attendance data by courses"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Course/attendanceoverteaching": {
        "post": {
          "tags": [
            "Course"
          ],
          "summary": "Retrieves the attendance data with associated teaching sessions",
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the attendance data with associated teaching sessions"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/count": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieves the number of students",
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the number of students"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/count/{searchTerm}": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieves the number of students with filtering options",
          "parameters": [
            {
              "name": "searchTerm",
              "in": "path",
              "description": "Student id keyword",
              "required": true,
              "schema": {
                "type": "string",
                "description": "Student id keyword",
                "nullable": true
              }
            }
          ],
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the number of students with filtering options"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/{id}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieves a student object",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Student id",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "Student id",
                "format": "int32"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a student object"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/update": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Updates student personal detils",
          "requestBody": {
            "description": "Updated personal details object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PersonalDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/PersonalDetails"
                }
              },
              "application/*+json": {
                "schema": {
                  "$ref": "#/components/schemas/PersonalDetails"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Student personal details updated successfully"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/page/{page}": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve array of students objects for a given page",
          "parameters": [
            {
              "name": "page",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int32"
              }
            }
          ],
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Student personal details updated successfully"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/page/{page}/{searchTerm}": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve array of students objects for a given page with filtering options",
          "parameters": [
            {
              "name": "page",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int32"
              }
            },
            {
              "name": "searchTerm",
              "in": "path",
              "description": "Student id keyword",
              "required": true,
              "schema": {
                "type": "string",
                "description": "Student id keyword",
                "nullable": true
              }
            }
          ],
          "requestBody": {
            "description": "String array of course codes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "String array of course codes",
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Student personal details updated successfully"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/persistentAbsenceCount/{margin}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve the number of persistent absentees",
          "parameters": [
            {
              "name": "margin",
              "in": "path",
              "description": "Risk student percentage",
              "required": true,
              "schema": {
                "type": "number",
                "description": "Risk student percentage",
                "format": "double"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The number of persistent absentees"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/persistentAbsence/{margin}/{page}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve persistent absentees by page",
          "parameters": [
            {
              "name": "margin",
              "in": "path",
              "description": "Risk student percentage",
              "required": true,
              "schema": {
                "type": "number",
                "description": "Risk student percentage",
                "format": "double"
              }
            },
            {
              "name": "page",
              "in": "path",
              "description": "Page number",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "Page number",
                "format": "int32"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Persistent absentees by page"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/persistentAbsenteesCountByYear/{margin}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve the number of persistent absentees by year",
          "parameters": [
            {
              "name": "margin",
              "in": "path",
              "description": "Risk student percentage",
              "required": true,
              "schema": {
                "type": "number",
                "description": "Risk student percentage",
                "format": "double"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The number of persistent absentees by year"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/persistentAbsenteesCountByCourse/{margin}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve the number of persistent absentees by course",
          "parameters": [
            {
              "name": "margin",
              "in": "path",
              "description": "Risk student percentage",
              "required": true,
              "schema": {
                "type": "number",
                "description": "Risk student percentage",
                "format": "double"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The number of persistent absentees by course"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/nonAttendingCount": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve the number of not attending students",
          "responses": {
            "200": {
              "description": "The number of not attending students"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/nonAttendingStudents/{page}": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve not attending students by page",
          "parameters": [
            {
              "name": "page",
              "in": "path",
              "description": "Page number",
              "required": true,
              "schema": {
                "type": "integer",
                "description": "Page number",
                "format": "int32"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Retrieve not attending students by page"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/nonAttendingStudentsByYear": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve not attending students by year",
          "responses": {
            "200": {
              "description": "Retrieve not attending students by year"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/attendanceByPeriod": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve attendance data by period",
          "responses": {
            "200": {
              "description": "Retrieve attendance data by period"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/avgAttendance": {
        "get": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve average attendance",
          "responses": {
            "200": {
              "description": "Retrieve average attendance"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/Student/getTrackedStudents": {
        "post": {
          "tags": [
            "Student"
          ],
          "summary": "Retrieve tracked students",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "nullable": true
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "nullable": true
                }
              },
              "application/*+json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "nullable": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Retrieve tracked students"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/User": {
        "patch": {
          "tags": [
            "User"
          ],
          "summary": "Updates User Details",
          "requestBody": {
            "description": "Updated user object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserUpdate"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserUpdate"
                }
              },
              "application/*+json": {
                "schema": {
                  "$ref": "#/components/schemas/UserUpdate"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the updated user object"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        },
        "get": {
          "tags": [
            "User"
          ],
          "summary": "Retrieves user metadata from the identity provider",
          "responses": {
            "200": {
              "description": "Returns the user metadata"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      },
      "/User/{metadata}": {
        "patch": {
          "tags": [
            "User"
          ],
          "summary": "Returns the updated user metadata",
          "parameters": [
            {
              "name": "metadata",
              "in": "path",
              "description": "New metadata",
              "required": true,
              "schema": {
                "type": "string",
                "description": "New metadata",
                "nullable": true
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the user metadata"
            },
            "400": {
              "description": "Unauthorised result"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "SendGridEmailRequest": {
          "type": "object",
          "properties": {
            "fromEmail": {
              "type": "string",
              "nullable": true
            },
            "fromName": {
              "type": "string",
              "nullable": true
            },
            "toEmail": {
              "type": "string",
              "nullable": true
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "toName": {
              "type": "string",
              "nullable": true
            },
            "subject": {
              "type": "string",
              "nullable": true
            },
            "content": {
              "type": "string",
              "nullable": true
            },
            "htmlContent": {
              "type": "string",
              "nullable": true
            }
          },
          "additionalProperties": false
        },
        "PersonalDetails": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int32"
            },
            "userId": {
              "type": "integer",
              "format": "int32"
            },
            "phone": {
              "type": "string",
              "nullable": true
            },
            "email": {
              "type": "string",
              "nullable": true
            }
          },
          "additionalProperties": false
        },
        "UserUpdate": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "nullable": true
            },
            "email": {
              "type": "string",
              "nullable": true
            }
          },
          "additionalProperties": false
        }
      },
      "securitySchemes": {
        "Bearer": {
          "type": "apiKey",
          "description": "JWT Authorization header using the Bearer scheme for Attendance Platform. Example: \"Authorization: Bearer {token}\"",
          "name": "Authorization",
          "in": "header"
        }
      }
    },
    "security": [
      {
        "Bearer": [ ]
      }
    ]
  }
  
    export default OpenApiDocumentation;