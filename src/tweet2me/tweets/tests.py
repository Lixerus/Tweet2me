from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Tweet

User = get_user_model()

# Create your tests here.
class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abc', password='somepassword')
        self.userB = User.objects.create_user(username='abcB', password='somepasswordB')# поменял create на create_user и заработала аутентификация(предположительно появилась сессия в клиенте)
        Tweet.objects.create(content="my test tweet1", user = self.user)
        Tweet.objects.create(content="my test tweet2", user = self.user)
        Tweet.objects.create(content="my test tweet3", user = self.user)
        Tweet.objects.create(content="my test tweet with another user", user = self.userB)
        self.currentCount = Tweet.objects.all().count()

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="my test tweet", user = self.user)
        self.assertEqual(tweet_obj.id, 5)


    def test_tweet_created_api(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()),4)

    def test_action_like_unlike(self):
       client = self.get_client()
       user = self.user
       my_like_instances = user.tweetlike_set.count()
       self.assertEqual(my_like_instances,0)
       response = client.post("/api/tweets/action/", {"id": 2, "action":"like"})
       response_data = response.data
       like_count = response_data.get('likes')
       self.assertEqual(response.status_code, 200)
       self.assertEqual(like_count,1)
    
       my_like_instances = user.tweetlike_set.count()
       self.assertEqual(my_like_instances,1)
       my_related_likes = user.tweet_user.count()
       self.assertEqual(my_like_instances,my_related_likes)

       response = client.post("/api/tweets/action/", {"id":2, "action":"unlike"})
       response_data = response.data
       like_count = response_data.get('likes')
       self.assertEqual(response.status_code, 200)
       self.assertEqual(like_count,0)
       my_like_instances = user.tweetlike_set.count()
       self.assertEqual(my_like_instances,0)

    # def test_action_retweet(self):
    #    client = self.get_client()
    #    current_count = self.currentCount
    #    response = client.post("/api/tweets/action/", {"id":2,"action": "retweet"})
    #    self.assertEqual(response.status_code, 201)
    #    data = response.data
    #    new_tweet_id = data.get('id')
    #    self.assertNotEqual(2,new_tweet_id)
    #    self.assertEqual(current_count+1,self.currentCount)

    def test_tweet_create_api_view(self):
       data = {"content" : "test tweet create api view"}
       client = self.get_client()
       response = client.post("/api/tweets/create/", data)
       self.assertEqual(response.status_code, 201)
       self.assertEqual(self.currentCount+1, Tweet.objects.all().count())

    def test_tweet_detail_api_view(self):
       client = self.get_client()
       response = client.get("/api/tweets/1/")
       self.assertEqual(response.status_code, 200)

    def test_tweet_delete_api_view(self):
       client = self.get_client()
       response = client.post("/api/tweets/1/delete/")
       self.assertEqual(response.status_code, 200)
       response = client.post("/api/tweets/1/delete/")
       self.assertEqual(response.status_code, 404)
       response_incorrect_owner = client.post("/api/tweets/4/delete/")
       self.assertEqual(response_incorrect_owner.status_code, 401)