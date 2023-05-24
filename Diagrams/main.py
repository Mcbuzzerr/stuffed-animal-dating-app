# diagram.py
from diagrams import Diagram, Cluster, Edge
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
from diagrams.aws.migration import ApplicationDiscoveryService

with Diagram("Stuffed Animal Dating App", show=False):
    users = Users("Stuffed Animals")
    with Cluster("Frontend"):
        react = React("Client \n (React + Next.js))")

    with Cluster("Back End"):
        with Cluster("Supporting Services"):
            kafka = SimpleQueueServiceSqs("Kafka Message Queue")
            email = SimpleEmailServiceSesEmail("Email Service \n (FastAPI)")
            gateway = APIGateway("Ocelot gateway")
            eureka = ApplicationDiscoveryService("Eureka Service Discovery")

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

    (
        users
        >> Edge(color="dark", style="dashed")
        >> react
        >> Edge(color="dark", style="dashed")
        >> gateway
    )
    gateway >> Edge(color="dark", style="dashed") >> csharpAPI
    gateway >> Edge(color="dark", style="dashed") >> pythonAPIs[0]
    gateway >> Edge(color="dark", style="dashed") >> pythonAPIs[1]

    pythonAPIs[1] >> kafka
    csharpAPI >> kafka
    kafka >> email

    pythonAPIs >> Edge(color="darkgreen", label="service discovery") >> eureka
    csharpAPI >> Edge(color="darkgreen", label="service discovery") >> eureka
    (
        gateway
        << Edge(color="darkgreen", label="service registration", style="bold")
        << eureka
    )

    pythonAPIs[1] >> Edge(color="blue", label="database connection") << sqlDB
    pythonAPIs[0] >> Edge(color="blue", label="database connection") << mongoDBs[0]
    csharpAPI >> Edge(color="blue", label="database connection") << mongoDBs[1]
