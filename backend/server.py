import asyncio
from contextlib import asynccontextmanager
from datetime import datetime, timedelta

import motor.motor_asyncio

from fastapi import FastAPI, Request
from beanie import Document, init_beanie
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


IT_IMAGE_ADDR = "https://st3.depositphotos.com/2572561/16360/i/450/depositphotos_163607278-stock-photo-over-the-shoulder-footage-of.jpg"
AI_IMAGE_ADDR = "https://i.ytimg.com/vi/VM55efbOkCM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC9xUg_bCsKK-fvcdqse4hU1e3PmA"
EDUCATION_IMAGE_ADDR = "https://bsu.by/upload/Press/%D0%BE%D0%B1%D1%89%D0%B5%D0%B5%20%D1%84%D0%BE%D1%82%D0%BE.jpg"

CURRENT_USER_ADDR = '0xB95335263eebcd68b41e33c917D465655C9CfbF9'

# ROLES: investor, service_provider, client

# class User(Document):
class User(BaseModel):
    address: str
    role: str
    username: str
    avatar_url: str


default_users = [
    User(
        address="0xEb6D42757C77B1c0809E87e3C6Aa95ff0DD7dED8",
        role="service_provider",
        username="Maxim Zamir",
        avatar_url="https://media.licdn.com/dms/image/C5603AQFSMOPo-heJDg/profile-displayphoto-shrink_800_800/0/1517521781866?e=2147483647&v=beta&t=DV2UZpuekl64kMvnV4gBv1juAbvYwdErlqd0bpMIftM",
    ),
    User(
        address="0x12455B362556fC60e29Dc841Cad9C6c6Db7de264",
        role="service_provider",
        username="Anton Cheplukov",
        avatar_url="https://media.licdn.com/dms/image/C4D03AQHrkn1QkH8ZKg/profile-displayphoto-shrink_800_800/0/1592583398829?e=2147483647&v=beta&t=jMq1kmSdzBeIuYDwVneZU0nwmQR0rPS7AKsmRg_AK_o",
    ),
    User(
        address="0x00462eB5089A88c01210AF95d41971863b9Bc122",
        role="service_provider",
        username="Aliaksandr Askerka",
        avatar_url="https://media.licdn.com/dms/image/D4D03AQHcVZsK6OwyqQ/profile-displayphoto-shrink_200_200/0/1694110627294?e=2147483647&v=beta&t=A8NdoGRLUVtIW1B5sesukPwhIw7kaY_PZ8Fw9msMqts",
    ),

    User(
        address="0x11a6CFB065a8819329C6c0d9Eddc96a4558CEFE6",
        role="client",
        username="Felix Lipov",
        avatar_url="https://media.licdn.com/dms/image/C5103AQF_icln4XvZyQ/profile-displayphoto-shrink_200_200/0/1516357831118?e=2147483647&v=beta&t=tukFnqwwb_A00np0ilIwS0myW6EJzrnWsMaWkEYjLxg",
    ),
    User(
        address="0x91362EE7F4aeeE3D3B20568E553028a5E20e7385",
        role="client",
        username="Anastasiya Konoplina",
        avatar_url="https://media.licdn.com/dms/image/C4D03AQHMYP1Bu_v9Zw/profile-displayphoto-shrink_400_400/0/1575466999948?e=2147483647&v=beta&t=6szBCGVXcgLXIAdWdZ_uAFf_Mfk0ok4YJWYzDxvu2_U",
    ),
    User(
        address="0xCFDDe8452921D5C60E3Fda3A29f2Cb9437f509D6",
        role="investor",
        username="Ludmila Serova",
        avatar_url="https://media.licdn.com/dms/image/C4E03AQEYFPL_5nebqg/profile-displayphoto-shrink_800_800/0/1613595138717?e=2147483647&v=beta&t=qknqDZMuEpaOSkLcbo0OaC0ICtD0eXMJ1Y20RO2yLXc",
    ),
]
daos = []
tasks = {}
votes = {}
TASK_ID = 0


class TaskCreate(BaseModel):
    dao_addr: str
    title: str
    description: str
    executors: list[str] = []


class Task(BaseModel):
    task_id: int
    dao_addr: str
    title: str
    description: str
    task_status: int  # 0-to_do, 1-in progress, 2-done
    created: datetime
    due_date: datetime
    cost: int = 0
    comments: list[str] = []
    executors: list[str] = []


# class DAO(Document):
class DAO(BaseModel):
    title: str
    dao_addr: str
    description: str
    scope: str
    members_count: int
    dao_avatar: str
    tags: list[str]
    contract_code: str = ''
    tasks: list[Task] = []
    users: dict[str, str] = {}
    budget: int = 0


# class UserVote(Document):
class UserVote(BaseModel):
    user_address: str
    dao_addr: str
    proposal_id: int
    choice: bool
    sum: int
    timestamp: int


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        "mongodb://dominion:dominion@0.0.0.0:27017/dominion"
    )
    await init_beanie(database=client.db_name, document_models=[User, DAO, Task])
    for u in default_users:
        await u.create()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # await init_db()
    yield


app = FastAPI(lifespan=lifespan)
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/create/user")
async def create_user(request: Request) -> dict:
    data = await request.json()
    u = User(address=data['address'], role=data['role'], username=data['username'], avatar_url=data['avatar_url'])
    # await u.create()

    default_users.append(u)
    global CURRENT_USER_ADDR
    CURRENT_USER_ADDR = u.address

    return {"message": "Users successfully created", "total": len(default_users)}
    # return {"message": "Users successfully created", "total": await User.count()}


@app.post("/create/dao")
async def create_dao(request: Request):
    dao = await request.json()
    tags = dao.get('tags') or [dao['scope'], ]
    scope = dao.get('scope') or tags[0]

    if scope == 'it':
        dao_avatar = IT_IMAGE_ADDR
    elif scope == 'ai':
        dao_avatar = AI_IMAGE_ADDR
    elif scope == 'education':
        dao_avatar = EDUCATION_IMAGE_ADDR
    else:
        dao_avatar = dao.get('dao_avatar', '')
    if dao['title'].lower() == 'browser programming language':
        tags.extend(['browser', 'programming'])
    d = DAO(
        title=dao['title'],
        dao_addr=dao['dao_addr'],
        description=dao['description'],
        scope=scope,
        members_count=dao['members_count'],
        dao_avatar=dao_avatar,
        tags=tags,
        budget=dao.get('budget') or 50,
    )
    daos.append(d)
    print(d)
    # await d.create()


@app.get("/daos/{addr}")
async def get_dao(addr: str):
    dao = next(filter(lambda d: d.dao_addr == addr, daos))
    return dao.model_dump()


@app.patch("/daos/{addr}")
async def update_dao(request: Request, addr: str):
    data = await request.json()
    dao = next(filter(lambda d: d.dao_addr == addr, daos))
    dao.contract_code = data['contract_code']
    return dao.model_dump()


@app.post("/join/{addr}")
async def update_dao(request: Request, addr: str):
    data = await request.json()
    dao = next(filter(lambda d: d.dao_addr == addr, daos))
    dao.users[data['user_addr']] = data['role']
    return dao.model_dump()


@app.get("/users/{addr}")
async def get_user(addr: str):
    # user = await User.find_one(User.address == addr)
    user = next(filter(lambda u: u.address == addr, default_users), None)
    if not user:
        return User(
            address=addr,
            role="client",
            username="",
            avatar_url="https://as2.ftcdn.net/v2/jpg/00/39/44/15/1000_F_39441531_3eyM9zCOnOjxAKYgko10ghMn86OxAXi3.jpg",
        ).model_dump()

    return user.model_dump()


@app.get("/users/current")
async def get_current_user() -> dict:
    user = await User.find_one(User.address == CURRENT_USER_ADDR)

    return user.model_dump()


@app.get("/votes/{user_addr}")
async def list_votes(user_addr: str):
    return list(filter(lambda u: u.user_address == user_addr, votes.values()))


@app.post("/votes")
async def vote(request: Request):
    data = await request.json()
    uv = UserVote(**data)
    votes[(uv.user_address, uv.dao_addr)] = uv

    return uv.model_dump()


@app.get("/daos/{addr}/tasks")
async def get_tasks(addr: str):
    return {'tasks': list(tasks.get(addr, {}).values())}


@app.post("/daos/{addr}/tasks")
async def add_task(addr: str, request: Request):
    data = await request.json()
    data = TaskCreate.model_validate(data)

    global TASK_ID
    TASK_ID += 1

    task = Task(
        task_id=TASK_ID,
        dao_addr=data.dao_addr,
        title=data.title,
        description=data.description,
        task_status=0,  # 0-to_do, 1-in progress, 2-done
        created=datetime.utcnow(),
        due_date=(datetime.utcnow() + timedelta(days=1)),
        cost=0,
        comments=[],
        executors=data.executors,
    )
    if not tasks.get(addr): tasks[addr] = {}
    tasks[addr][task.task_id] = task


@app.get("/daos/{addr}/tasks/{task_id}")
async def get_task(addr: str, task_id: int):
    return tasks[addr][task_id]


@app.put("/daos/{addr}/tasks/{task_id}")
async def update(addr: str, task_id: int, request: Request):
    data = await request.json()
    created = datetime.fromisoformat(data['created'])

    tasks[addr][task_id] = Task(
        task_id=task_id,
        dao_addr=addr,
        title=data['title'],
        description=data['description'],
        task_status=data['task_status'],  # 0-to_do, 1-in progress, 2-done
        created=created,
        due_date=(created + timedelta(days=1)),
        cost=0,
        comments=data['comments'],
        executors=data['executors'],
    )
    return tasks[addr][task_id]
