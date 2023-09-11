import pytest
from unittest import mock
from queries.accounts import AccountQueries


class TestCreateAccount:
    @pytest.fixture(scope="function")
    def mock_account_queries(self):
        with mock.patch(
            "queries.accounts.AccountQueries"
        ) as MockAccountQueries:
            yield MockAccountQueries()

    def test_create_account(self, mock_account_queries):
        account_data = {
            "username": "test_user",
            "password": "test_password",
            "email": "test@email.com",
        }
        mock_account_queries.create_account.return_value = True

        result = AccountQueries().create_account(account_data)

        assert result is True
        mock_account_queries.create_account.assert_called_once_with(
            account_data
        )

    def test_create_account_fail(self, mock_account_queries):
        account_data = {
            "username": "test_user",
            "password": "test_password",
            "email": "test@email.com",
        }
        mock_account_queries.create_account.return_value = False

        result = AccountQueries().create_account(account_data)

        assert result is False
        mock_account_queries.create_account.assert_called_once_with(
            account_data
        )
