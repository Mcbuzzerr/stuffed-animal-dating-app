# diagram.py
from diagrams import Diagram, Cluster
from diagrams.aws.compute import EC2
from diagrams.aws.database import Database
from diagrams.aws.network import ELB
from diagrams.programming.framework import React
from diagrams.programming.language import Python, Csharp
from diagrams.aws.network import APIGateway
from diagrams.aws.enduser import Worklink
from diagrams.aws.engagement import SimpleEmailServiceSesEmail
from diagrams.aws.integration import SimpleQueueServiceSqs
from diagrams.aws.general import Users

with Diagram("Stuffed Animal Dating App", show=False):
    users = Users("Stuffed Animals")
    with Cluster("Frontend"):
        react = React("Client \n (React + Next.js))")

    with Cluster("Back End"):
        with Cluster("Primary Services"):
            with Cluster("C# Services \n (ASP.NET Core)"):
                csharpAPI = EC2("User Message API")
            with Cluster("Python Services \n (FastAPI)"):
                pythonAPIs = [
                    EC2("User Profile API"),
                    EC2("User Auth API"),
                ]

        with Cluster("Backing Databases"):
            with Cluster("MongoDB"):
                mongoDBs = [
                    Database("User Profile DB"),
                    Database("User Message DB"),
                ]
            with Cluster("SQL"):
                sqlDB = Database("User Auth DB SQL")

        with Cluster("Supporting Services"):
            kafka = SimpleQueueServiceSqs("Kafka Message Queue")
            gateway = APIGateway("Kong gateway")
            email = SimpleEmailServiceSesEmail("Email Service \n (FastAPI)")

    pythonAPIs[1] >> sqlDB
    pythonAPIs[0] >> mongoDBs[0]
    csharpAPI >> mongoDBs[1]

    users >> react >> gateway
    gateway >> pythonAPIs
    gateway >> csharpAPI

    pythonAPIs[1] >> kafka
    csharpAPI >> kafka
    kafka >> email
