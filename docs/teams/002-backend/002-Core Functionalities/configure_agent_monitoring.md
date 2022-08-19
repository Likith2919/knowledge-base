---
title: Configure Agent Monitoring
sidebar_position: 4
slug: configure_agent_monitoring
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to configure the Agent Monitoring Page on dashboard at brand level. As for different brands, all the group and agent columns won't be required on Agent Monitoring Page. This is done to send only the required columns and their data.

**The following object should be added in the database in Brand Specified Values collection in the required document:**

- configureAgentMonitoring : { }
    - It's the single object which will contain all the configurable values.
    - If it's not present or is set to an empty object, the Agent Monitoring screen will function as it is, i.e. We can neither configure the data to be sent nor the color of the cells.

- CONFIGURE_GROUP_LIVESTATS : true
    - It's used to customise the group data.
    - If it's set to true, the group columns can be customised i.e. We can configure which columns to send.
    - If it's not present in the object or is set to false, all the agent columns and their data will be sent to the Agent Monitoring screen.
    - It's also required to enable color coding for group columns.

- CONFIGURE_AGENT_LIVESTATS : true
    - It's used to customise the agent data.
    - If it's set to true, the agent columns can be customised i.e. We can configure which columns to send.
    - If it's not present in the object or is set to false, all the agent columns and their data will be sent to the Agent Monitoring screen.
    - It's also necessary to enable color coding for agent columns.

- CONFIGURE_GROUP_LIVESTATS_COLOR : true
    - It's used to enable color coding for group data.
    - If it's set to true, the group data color can be customised.
    - If it's not present in the object or is set to false, group data will be sent to the Agent Monitoring screen without any color.

- CONFIGURE_AGENT_LIVESTATS_COLOR : true
    - It's used to enable color coding for agent data.
    - If it's set to true, the agent data color can be customised.
    - If it's not present in the object or is set to false, agent data will be sent to the Agent Monitoring screen without any color.

- COLUMNS_GROUP_LIVESTATS: { }
    - It will contain all the columns of group data.
    - Those column's data will only be sent to Agent Monitoring screen which are present in this object.
    - If it's not present or is an empty object, no column data will be sent.

- COLUMNS_AGENT_LIVESTATS: { }
    - It will contain all the columns of agent data.
    - Those column's data will only be sent to Agent Monitoring screen which are present in this object.
    - If it's not present or is an empty object, no column data will be sent.

- AM_GROUP: {}
    - It's an example for a field for column data.
    - It will contain 2 fields status and color.
    - If the whole object of column like AM_GROUP is not present or is set to an empty object,neither it's data will be sent nor it's color can be configured.

- status: true
    - It's used to enable or disable the column.
    - If it's set to true, the specific column data will be sent.
    - If it's not present in the object or is set to false, that specific column data will not be sent to the Agent Monitoring screen.

- "color" : { "values": [ ], "colors": [ ] }
    - The color of the cells can be customised on the basis of this field.
    - **values** is the array of cell values.
    - **colors** is the array of colors which are to be applied on cell values on the basis of **values** array.
    - There can be two types of configuration:
        - Equation:
            - "color" : {  
                    "values" : [ "Supervisor", "Agent" ],  
                    "colors" : [ "blue", "green" ]  
                }
            - The corresponding color will be applied to the values.
            - For eg:
                - blue will be applied to Supervisor
                - green will be applied to Agent
        - Comparison:
            -   "color" : {  
                    "values" : [ "0", "5", "10" ],  
                    "colors" : [ "orange", "teal", "blue" ]  
                }
            - The corresponding color will be applied to the values in ranges.
            - For eg:
                - orange will be applied to the cell values > 0 and < 5.
                - teal will be applied to the cell values >= 5 and < 10.
                - blue will be applied to the cell values >= 10.
    - If the CONFIGURE_GROUP_LIVESTATS_COLOR is set true and the color object is not present inside the column, then its color can't be configured.


## Example Field in BrandSpecifiedValues :

```javascript
"configureAgentMonitoring" : {
    "CONFIGURE_GROUP_LIVESTATS" : true,
    "CONFIGURE_GROUP_LIVESTATS_COLOR" : true,
    "COLUMNS_GROUP_LIVESTATS" : {
        "AM_GROUP" : {
            "status" : true
        },
        "AM_LOGGEDIN_USERS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_ACTIVE_USERS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_INACTIVE_USERS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange"
                ]
            }
        },
        "AM_CHAT_USERS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_ACTIVE_CHATS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_CHATS_IN_QUEUE" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange"
                ]
            }
        },
        "AM_FREE_LOAD" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_AHT" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0s",
                    "15s",
                    "5m 00s",
                    "10m 00s",
                    "20m 00s"
                ],
                "colors" : [
                    "red",
                    "orange",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_AVG_CONCURRENCY" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "50",
                    "75",
                    "100",
                    "125"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_DIRECT_TRANSFER" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_BOT_TRANSFER" : {
            "status" : true,
            "color" : {
                "values" : [
                    "0",
                    "5",
                    "10",
                    "20",
                    "30"
                ],
                "colors" : [
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue"
                ]
            }
        },
        "AM_LTR" : {
            "status" : true
        },
        "AM_ASAT" : {
            "status" : true
        },
        "AM_FTF" : {
            "status" : true
        }
    },
    "CONFIGURE_AGENT_LIVESTATS" : true,
    "CONFIGURE_AGENT_LIVESTATS_COLOR" : true,
    "COLUMNS_AGENT_LIVESTATS" : {
        "AM_AGENT" : {
            "status" : true
        },
        "AM_ROLE" : {
            "status" : true,
            "color" : {
                "values" : [
                    "Supervisor",
                    "Agent"
                ],
                "colors" : [
                    "blue",
                    "green"
                ]
            }
        },
        "AM_CURRENT_STATUS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "2nd break",
                    "1st break",
                    "stepped out",
                    "active",
                    "meeting",
                    "out for dinner",
                    "out for lunch",
                    "disconnected",
                    "busy"
                ],
                "colors" : [
                    "black",
                    "black",
                    "blue",
                    "green",
                    "yellow",
                    "orange",
                    "orange",
                    "red",
                    "red"
                ]
            }
        },
        "AM_STATUS_CHANGED_AT" : {
            "status" : true,
            "color" : {
                "values" : [
                    "00:15:00",
                    "00:30:00",
                    "01:00:00",
                    "02:00:00",
                    "05:00:00",
                    "08:00:00",
                    "10:00:00"
                ],
                "colors" : [
                    "black",
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange",
                    "red"
                ]
            }
        },
        "AM_LOGIN_TIME" : {
            "status" : true,
            "color" : {
                "values" : [
                    "00:15:00",
                    "00:30:00",
                    "01:00:00",
                    "02:00:00",
                    "05:00:00",
                    "08:00:00",
                    "10:00:00"
                ],
                "colors" : [
                    "black",
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange",
                    "red"
                ]
            }
        },
        "AM_LOGIN_HOURS" : {
            "status" : true,
            "color" : {
                "values" : [
                    "00:15:00",
                    "00:30:00",
                    "01:00:00",
                    "02:00:00",
                    "05:00:00",
                    "08:00:00",
                    "10:00:00"
                ],
                "colors" : [
                    "black",
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange",
                    "red"
                ]
            }
        },
        "AM_ACTIVE_TIME" : {
            "status" : true,
            "color" : {
                "values" : [
                    "00:15:00",
                    "00:30:00",
                    "01:00:00",
                    "02:00:00",
                    "05:00:00",
                    "08:00:00",
                    "10:00:00"
                ],
                "colors" : [
                    "black",
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange",
                    "red"
                ]
            }
        },
        "AM_BREAK_TIME" : {
            "status" : true,
            "color" : {
                "values" : [
                    "00:15:00",
                    "00:30:00",
                    "01:00:00",
                    "02:00:00",
                    "05:00:00",
                    "08:00:00",
                    "10:00:00"
                ],
                "colors" : [
                    "black",
                    "blue",
                    "teal",
                    "green",
                    "yellow",
                    "orange",
                    "red"
                ]
            }
        },
        "AM_CHAT_DURATION" : {
            "status" : true
        },
        "AM_CUSTOMER_NAME" : {
            "status" : true
        },
        "AM_AGENT_LAST_RESPONSE" : {
            "status" : true
        },
        "AM_CUSTOMER_LAST_RESPONSE" : {
            "status" : true
        }
    }
}    
```
