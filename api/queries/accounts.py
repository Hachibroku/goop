from models.accounts import AccountIn, AccountOutWithPassword
from pymongo.errors import DuplicateKeyError
from .client import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "module3-project-gamma-mongo"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
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
