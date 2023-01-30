from django.urls import path

from account import views

from .views import  SingleBlogDetails,UserGetCommentView,DeleteBlogDetails,CompanyContactsListView, UserChangePasswordView,UserChangeBlogView, UserAddBlogview, getBlogs, UserAddCommentview,UserLoginView, UserProfileView, UserRegistrationView
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('addblog/', UserAddBlogview.as_view(), name='addblog'),

    path('getblog/', getBlogs.as_view(), name='getblog'),
    path('changeinfo/<int:pk>', UserChangeBlogView.as_view(), name='changeinfo'),

    path('getblog/<int:pk>', SingleBlogDetails.as_view(), name='editpost'),

    path('delete/<int:pk>', DeleteBlogDetails.as_view(), name='getuserblog'),

    path('addcomment/', UserAddCommentview.as_view(), name='addcomment'),
    path('getcomment/', UserGetCommentView.as_view(), name='getcomment'),
    path('contacts/<uuid:username_id>/', CompanyContactsListView.as_view(), name='contacts')


]