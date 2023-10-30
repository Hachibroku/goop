from pydantic import BaseModel
from typing import List, Optional


class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdateIn(BaseModel):
    username: Optional[str]
    password: Optional[str]


class AccountRepo(BaseModel):
    games: List[AccountOut]
