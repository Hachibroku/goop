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


# THIS MODEL IS FOR UPDATING A ACCOUNTS USER/PASS INCASE THEY "FORGOT"
# WE CAN USE THIS FOR WHEN WE WORK ON THAT FEATURE
class AccountUpdateIn(BaseModel):
    username: Optional[str]
    password: Optional[str]


# A MODEL TO GET A LIST OF ALL ACCOUNTS IN DATABASE
# WE CAN USE THIS FOR WHEN WE WORK ON THAT FEATURE
class AccountRepo(BaseModel):
    games: List[AccountOut]
