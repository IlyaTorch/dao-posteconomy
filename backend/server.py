import asyncio
from contextlib import asynccontextmanager

import motor.motor_asyncio

from fastapi import FastAPI, Request
from beanie import Document, init_beanie
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


IT_IMAGE_ADDR = "https://st3.depositphotos.com/2572561/16360/i/450/depositphotos_163607278-stock-photo-over-the-shoulder-footage-of.jpg"
EDUCATION_IMAGE_ADDR = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Feducation&psig=AOvVaw0FvggOGvvlZnqkUq2n75Wt&ust=1699386482359000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDdzo6SsIIDFQAAAAAdAAAAABAJ"


CURRENT_USER_ADDR = ''


# class User(Document):
class User(BaseModel):
    address: str
    role: str
    username: str
    avatar_url: str


default_users = [
    User(
        address="0xCFDDe8452921D5C60E3Fda3A29f2Cb9437f509D6",
        role="Investor",
        username="Ludmila Serova",
        avatar_url="https://media.licdn.com/dms/image/C4E03AQEYFPL_5nebqg/profile-displayphoto-shrink_800_800/0/1613595138717?e=2147483647&v=beta&t=qknqDZMuEpaOSkLcbo0OaC0ICtD0eXMJ1Y20RO2yLXc",
    ),
    User(
        address="0xD87Fea2184D952eEEf827A190Fba9D7F2F09A638",
        role="Investor",
        username="Maxim Zamir",
        avatar_url="https://media.licdn.com/dms/image/C5603AQFSMOPo-heJDg/profile-displayphoto-shrink_800_800/0/1517521781866?e=2147483647&v=beta&t=DV2UZpuekl64kMvnV4gBv1juAbvYwdErlqd0bpMIftM",
    ),
    User(
        address="0x012493BE86AC0107723b1e1A0aCc087A42236ccA",
        role="Investor",
        username="Aliaksandr Askerka",
        avatar_url="https://media.licdn.com/dms/image/D4D03AQHcVZsK6OwyqQ/profile-displayphoto-shrink_200_200/0/1694110627294?e=2147483647&v=beta&t=A8NdoGRLUVtIW1B5sesukPwhIw7kaY_PZ8Fw9msMqts",
    ),
    User(
        address="0x3D30c9631Fce0B4ebF71CcFAaa2e93597949A448",
        role="Head of Engineering",
        username="Anton Cheplukov",
        avatar_url="https://media.licdn.com/dms/image/C4D03AQHrkn1QkH8ZKg/profile-displayphoto-shrink_800_800/0/1592583398829?e=2147483647&v=beta&t=jMq1kmSdzBeIuYDwVneZU0nwmQR0rPS7AKsmRg_AK_o",
    ),
    User(
        address="0x6620bcaCC17760eE0C81b1F440e8801EF8e65aEF",
        role="Teacher",
        username="Felix Lipov",
        avatar_url="https://media.licdn.com/dms/image/D5603AQEkC3An_89J_g/profile-displayphoto-shrink_800_800/0/1685789629354?e=2147483647&v=beta&t=lTkyzfYZykdbQ0-MYaIzURyPosc7D9eEhnfwTFZru-0",
    ),
    User(
        address="0x68Bca109B3B6959cbc504B3cd07a81f11a9285Ec",
        role="Teacher",
        username="Anastasiya Konoplina",
        avatar_url="https://media.licdn.com/dms/image/C4D03AQHMYP1Bu_v9Zw/profile-displayphoto-shrink_400_400/0/1575466999948?e=2147483647&v=beta&t=6szBCGVXcgLXIAdWdZ_uAFf_Mfk0ok4YJWYzDxvu2_U",
    ),
]
default_daos = []


# class DAO(Document):
class DAO(BaseModel):
    title: str
    dao_addr: str
    description: str
    scope: str
    members_count: int
    dao_avatar: str
    tags: list[str]


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        "mongodb://dominion:dominion@0.0.0.0:27017/dominion"
    )
    await init_beanie(database=client.db_name, document_models=[User, DAO])
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
    tags = [dao['scope'], ]
    if dao['title'].lower() == 'browser programming language':
        tags.extend(['browser', 'programming'])
    d = DAO(
        title=dao['title'],
        dao_addr=dao['dao_addr'],
        description=dao['description'],
        scope=dao['scope'],
        members_count=dao['members_count'],
        dao_avatar=IT_IMAGE_ADDR if dao['scope'] == 'it' else EDUCATION_IMAGE_ADDR,
        tags=tags
    )
    default_daos.append(d)
    # await d.create()


@app.get("/daos/{addr}")
async def get_dao(addr: str):
    dao = next(filter(lambda d: d.dao_addr == addr, default_daos))
    return dao.model_dump()


@app.get("/users/{addr}")
async def get_user(addr: str):
    # user = await User.find_one(User.address == addr)
    user = next(filter(lambda u: u.address == addr, default_users))
    return user.model_dump()


@app.get("/users/current")
async def get_current_user() -> dict:
    addr = '0xCFDDe8452921D5C60E3Fda3A29f2Cb9437f509D6'
    user = await User.find_one(User.address == addr)

    return user.model_dump()
