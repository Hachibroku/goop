import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from models.accounts import AccountOut, AccountOutWithPassword
from queries.accounts import AccountQueries


class Authenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountOut,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.email, AccountOut(**account.dict())


authenticator = Authenticator(os.environ["SIGNING_KEY"])
