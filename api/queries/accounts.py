from models.accounts import AccountIn, AccountOutWithPassword
from pymongo.errors import DuplicateKeyError
from .client import Queries
from bson import ObjectId


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "accounts"

    # Get by username
    def get(self, username: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"username": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def get_by_email(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def get_by_id(self, user_id: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"_id": ObjectId(user_id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        print(hashed_password)
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)
