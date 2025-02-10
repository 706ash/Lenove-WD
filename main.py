from fastapi import FastAPI

app = FastAPI()


@app.get("/hi")
async def hi():
    return {"message": "Hello World"}

@app.get("/bye")
async def bye():
    return {"message": "Bye World"}

#hello
