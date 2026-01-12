# CI/CD Pipeline to AWS ECS using GitHub Actions, Docker, Nginx & ALB

This repository demonstrates a **complete end-to-end CI/CD pipeline** for a **Node.js application** deployed on **AWS ECS (Fargate)** behind an **Application Load Balancer (ALB)**, fully automated using **GitHub Actions**.

The project is intentionally built **incrementally**, with each GitHub Actions run reflecting a real-world DevOps learning step — from a simple Docker build to a production-ready ECS deployment with health checks.

---

## 📌 Project Objectives

* Build a real-world CI/CD pipeline from scratch
* Containerize a Node.js application using Docker
* Add Nginx as a reverse proxy
* Deploy containers to AWS ECS (Fargate)
* Configure ALB health checks correctly
* Automate everything using GitHub Actions

---

## 🧱 Architecture Overview

**Flow:**

```
Developer Push → GitHub Actions → Docker Build → Amazon ECR
→ ECS Task Definition Update → ECS Service (Fargate)
→ Application Load Balancer → Nginx → Node.js App
```

**Key AWS Services Used:**

* Amazon ECS (Fargate)
* Amazon ECR
* Application Load Balancer (ALB)
* IAM (Roles & Policies)
* CloudWatch Logs

---

## 📁 Repository Structure

```
.
├── app/                 # Node.js application
│   ├── index.js
│   └── package.json
│
├── nginx/               # Nginx reverse proxy config
│   └── default.conf
│
├── infrastructure/      # ECS task definition JSON
│   └── task-definition.json
│
├── .github/workflows/   # GitHub Actions CI/CD pipeline
│   └── ecs-deploy.yml
│
├── Dockerfile            # Multi-stage Docker build
├── .dockerignore
├── README.md
```

---

## 🚀 Phase-wise Implementation

---

## **PHASE 0 – AWS & Local Prerequisites**

### What was done

* Created an AWS account
* Configured IAM user with programmatic access
* Installed locally:

  * Docker
  * Git
  * Node.js

### AWS Setup

* IAM permissions created for:

  * ECR
  * ECS
  * ALB
  * CloudWatch

---

## **PHASE 1 – Initial Node.js Application**

### What was done

* Created a basic Node.js app
* Added a simple homepage (`/`)
* App listens on port `3000`

### Purpose

* Verify container works locally
* Serve as the backend service

---

## **PHASE 2 – Dockerizing the Application**

### What was done

* Created a `Dockerfile`
* Built Docker image locally
* Ran container to verify functionality

### Outcome

* Application successfully runs inside a container

---

## **PHASE 3 – GitHub Actions: CI Pipeline**

### What was done

* Added GitHub Actions workflow
* On every push to `main` branch:

  * Checkout code
  * Build Docker image

### Purpose

* Validate build on every commit
* Introduce CI concept

---

## **PHASE 4 – AWS ECR Integration**

### What was done

* Created ECR repository
* Configured GitHub Secrets:

  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY`
  * `AWS_REGION`
* Modified pipeline to:

  * Authenticate to ECR
  * Push Docker image to ECR

### Outcome

* Docker images automatically stored in AWS

---

## **PHASE 5 – ECS Cluster & Fargate Setup**

### What was done

* Created ECS Cluster (Fargate)
* Created Task Definition
* Created ECS Service
* Attached Application Load Balancer

### Configuration Highlights

* Container port: `80`
* Target group type: `IP`
* Health check path initially `/`

---

## **PHASE 6 – Nginx Reverse Proxy & PM2**

### Why Nginx was added

* Production-grade traffic handling
* Easier ALB integration
* Clean separation of concerns

### What was done

* Added Nginx container config
* Nginx listens on port `80`
* Proxies traffic to Node.js on port `3000`
* Used PM2 to manage Node.js process

---

## **PHASE 7 – CI/CD: Deploy to ECS Automatically**

### What was done

* Updated GitHub Actions pipeline to:

  * Render ECS task definition
  * Replace image URI
  * Deploy new task revision

### Result

* Every push triggers:

  * Build → Push → Deploy

---

## **PHASE 8 – ALB Health Check Fixes**

### Problem Faced

* ECS tasks repeatedly failing health checks
* Containers restarting continuously

### Root Causes

* ALB health checks hitting `/`
* Nginx not responding correctly
* App not ready during startup

---

## **PHASE 9 – Proper Health Check Implementation**

### What was done

#### 1️⃣ Added `/health` endpoint in Node.js

* Lightweight endpoint
* Returns HTTP `200 OK`

#### 2️⃣ Updated Nginx config

* Explicitly route `/health` to backend

#### 3️⃣ Updated ALB Target Group

* Health check path changed to `/health`

### Result

* Stable ECS service
* No task restarts
* ALB shows **healthy targets**

---

## ✅ Final CI/CD Workflow Status

All workflow runs completed successfully:

* Docker build
* ECR push
* ECS task update
* ECS service deployment
* ALB health checks passing

---

## 🔐 GitHub Secrets Used

| Secret Name           | Purpose              |
| --------------------- | -------------------- |
| AWS_ACCESS_KEY_ID     | AWS authentication   |
| AWS_SECRET_ACCESS_KEY | AWS authentication   |
| AWS_REGION            | Deployment region    |
| ECR_REPOSITORY        | Docker image repo    |
| ECS_CLUSTER           | ECS cluster name     |
| ECS_SERVICE           | ECS service name     |
| ECS_TASK_DEFINITION   | Task definition path |

---

## 📊 What This Project Demonstrates

* Real-world CI/CD pipeline
* Docker + AWS best practices
* ECS Fargate production deployment
* ALB health check troubleshooting
* Nginx reverse proxy integration
* GitHub Actions automation

---

## 🏁 Final Outcome

✔ Fully automated CI/CD pipeline
✔ Production-ready ECS deployment
✔ Zero-downtime updates
✔ Scalable AWS infrastructure

---

## 🧠 Learning Takeaways

* Why health checks fail in real systems
* Importance of Nginx in containerized apps
* ECS + ALB integration nuances
* How CI/CD pipelines evolve incrementally

---

## 👤 Author

**Chinmay K**
GitHub: [https://github.com/chinnmayK](https://github.com/chinnmayK)

---

✅ *This README reflects the complete journey from zero to production-grade AWS CI/CD deployment.*
