from fastapi import FastAPI

app = FastAPI()



@app.post("/test")
def initialTest():
    return {"message": "API is working"}