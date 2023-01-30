from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from django.views.generic import DetailView
from account.serializers import UserAddBlogSerializer,AllComments,AllBlogs,UserAddCommentSerializer, UserChangePasswordSerializer, UserLoginSerializer, updateBlogByUseSerializer,UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from account.models import User, AddBlogUser, commentBlog
from rest_framework import viewsets, filters, generics, permissions
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
      'name':str(user.name)
  }

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]

  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token,'name':user.name, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Pofile Changed Successfully'}, status=status.HTTP_200_OK)

 

class UserAddBlogview(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    blogSerializer = UserAddBlogSerializer(data=request.data)
    blogSerializer.is_valid(raise_exception=True)
    user = blogSerializer.save()
    return Response({'msg':'Blog Added Successfully...!'}, status=status.HTTP_200_OK)

# @csrf_exempt
class getBlogs(APIView):
  def get(request, *args, **kwargs):
    departments = AddBlogUser.objects.all()
    departments_serializer = AllBlogs(departments, many=True)
    return Response(departments_serializer.data, status=status.HTTP_200_OK)

  def get_queryset(self):
    qs = AddBlogUser.objects.all()
    name =self.request.query_params_get('name')
    if name is not None:
      qs = qs.filter(name_icontains = name)
    return qs

class SingleBlogDetails(generics.RetrieveAPIView):
  queryset = AddBlogUser.objects.all()
  serializer_class = AllBlogs


class CompanyContactsListView(generics.ListAPIView):
    serializer_class = AllBlogs
    def get_queryset(self):
        username_id = self.kwargs['username_id']
        return AddBlogUser.objects.filter(username_id=username_id)

class UserChangeBlogView(generics.UpdateAPIView):
  queryset = AddBlogUser.objects.all()
  serializer_class = updateBlogByUseSerializer

class DeleteBlogDetails(generics.DestroyAPIView):
  queryset = AddBlogUser.objects.all()
  serializer_class = AllBlogs

class UserAddCommentview(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    serializer = UserAddCommentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({'msg':'Comment Added Successfully'},  status=status.HTTP_200_OK)

class UserGetCommentView(APIView):
  def get(request, *args, **kwargs):
    alldata = commentBlog.objects.all()
    serializer = AllComments(alldata, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # if 'q' in request.GET:
    #   q= request.GET['q']
    #   filterdata = commentBlog.objects.filter(coment_user_name_icontains= q)
    #   return Response(filterdata)
  
  