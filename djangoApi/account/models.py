from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.utils import timezone

OPTION = (
    ('1','not good'),
    ('2', 'good'),
    ('3','better'),
    ('4','best'),
    ('5','Excelent'),
)

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, password=None, password2=None):
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
      )

      user.set_password(password)
      user.save(using=self._db)
      return user


#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name']

  def __str__(self):
    return self.name

class AddBlogUser(models.Model):
  username = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=50)
  headline = models.CharField(max_length=150)
  description = models.CharField(max_length=1000)
  dateAddBlog = models.DateTimeField(default=timezone.now)
  
  def __str__(self):
    return self.name
 

class commentBlog(models.Model):
  post_id = models.ForeignKey(AddBlogUser, on_delete=models.CASCADE)
  user_comment = models.ForeignKey(User, on_delete=models.CASCADE)
  coment_user_name = models.CharField(max_length=50)
  message = models.CharField(max_length=60)
  rating = models.CharField(max_length=6, choices=OPTION, default='green')
  dateAddcomment = models.DateTimeField(default=timezone.now)

  # def __str__(self):
  #   return self.coment_user_name