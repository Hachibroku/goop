import unittest


def login(username, password):
    if username == "user123" and password == "password123":
        return True
    else:
        return False


class TestLogin(unittest.TestCase):
    def test_successful_login(self):
        result = login("user123", "password123")
        self.assertTrue(result)

    def test_failed_login_wrong_username(self):
        result = login("wronguser", "password123")
        self.assertFalse(result)

    def test_failed_login_wrong_password(self):
        result = login("user123", "wrongpassword")
        self.assertFalse(result)

    def test_failed_login_empty_credentials(self):
        result = login("", "")
        self.assertFalse(result)


if __name__ == "__main__":
    unittest.main()
