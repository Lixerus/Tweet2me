import time
from locust import HttpUser, task, between, TaskSet, HttpLocust

proxies = {
  'http': 'http://127.0.0.1:8000',
  'http': 'http://127.0.0.1:8000',
}

class WebsiteUser(HttpUser):
    wait_time = between(1,5)

    @task
    def index_page(self):
        self.client.get(url='/api/tweets/')

    @task
    def profile_page(self):
        self.client.get('/api/profile/root/')

    @task
    def detail_view(self):
        self.client.get('/api/tweets/150/')

    @task
    def profile_page(self):
        self.client.get('/api/profile/Lixerus/')

class UserActions(HttpUser):

    def on_start(self):
        response = self.client.get('/api/tweets/csrftoken/')
        self.csrftoken = response.cookies['csrftoken']
        self.client.post('/login/',
                         data = {'username': 'root', 'password': 'root'},
                         headers={'X-CSRFToken': self.csrftoken})

    @task
    def like_page(self):
        self.client.post(url='/api/tweets/action/', data={'id' : "208", 'action' : 'like'},  headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})

    @task
    def follow_page(self):
        self.client.post(url='/api/profile/Lixerus/follow/', data={'action' : 'follow'},  headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})
    @task
    def hidden_tweets(self):
        self.client.post(url='/api/tweets/hiddentweets/',  headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})

    @task
    def poll_test(self):
        self.client.post(url='/api/tweets/longpoll/feed/', data={"id" : 200}, headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})
        
    @task
    def unlike_tweet(self):
        self.client.post(url='/api/tweets/action/', data={'id' : "208", 'action' : 'unlike'},  headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})
        
    @task
    def feed_page(self):
        self.client.post(url='/api/tweets/feed/',  headers={"X-CSRFToken": self.csrftoken},
                     cookies={"csrftoken": self.csrftoken})

    # @task
    # def index_page(self):
    #     self.client.get(url='/api/tweets/')

    # @task
    # def profile_page(self):
    #     self.client.get('/api/profile/root/')

    # @task
    # def profile_page(self):
    #     self.client.get('/api/profile/Lixerus/')

    # @task
    # def detail_view(self):
    #     self.client.get('/api/tweets/150/')