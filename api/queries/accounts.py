from pydantic import BaseModel
# from models import Account, AccountIn
from pymongo.errors import DuplicateKeyError
from .client import Queries

class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries(Queries):
    DB_NAME = "modjule3-project-gamma-db-1"
    COLLECTION = "accounts"

    # def __init__(self, client: AsyncIOMotorClient):
    #     super().__init__(client, self.COLLECTION)

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)


    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        print(hashed_password)
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)
