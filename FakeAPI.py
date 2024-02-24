# create an exaple api with fastAPI that exposes 2 endpoints
# a GET endopoint on orders/{id} that returns a json with the order details
# {
#   "order": {
#     "id": "<id>",
#     "status": "PAID",
#     "amount": 10.32,
#     "currency": "EUR"
#   }
# }
#
# a DELETE endpoint on /orders/{id}
# Cancels the order given by id. Response will be just a 200 status code without and body.

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/orders/{id}")
async def read_order(id: str):
    return JSONResponse(content={"order": {"id": id, "status": "PAID", "amount": 10.32, "currency": "EUR"}})

@app.delete("/orders/{id}")
async def delete_order(id: str):
    return JSONResponse(content={}, status_code=200)
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)

# run the server with the following command
# uvicorn FakeAPI:app --reload
# the server will be running on http://localhost:8000

