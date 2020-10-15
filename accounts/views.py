from django.contrib import auth
from django.utils import timezone
from rest_framework import views, viewsets, status
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from Hotel.views import returnHotelObjFromToken, returnHotelObjForRec
from .serializers import UserSerializer, HotelSerializer, UserSerializerOne, HotelSerializerall, HotelClerkSerializer, \
    HotelCompleteRegistrationSerializer, IsCompletedSerializer, HasAPISerializer
from Hotel.models import Hotel, HotelClerk, HotelReceptionist
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HotelViewSet(views.APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({
            "message": "Get method not allowed"
        }, status=404)

    def post(self, request):
        hotel = request.data.get('hotel')
        clerk = request.data.get('clerk')
        cl_uname = str(clerk['username']).strip()
        if User.objects.filter(username=cl_uname).exists():
            return Response({
                "success": 1,
                "message": "Username Already existed",
            })
        else:
            cl_email = str(clerk['email']).strip()
            if User.objects.filter(email=cl_email).exists():
                return Response({
                    "success": 2,
                    "message": "Clerk Email already existed",
                })
            else:
                h_email = str(hotel['email']).strip()
                if Hotel.objects.filter(email=h_email).exists():
                    return Response({
                        "success": 3,
                        "message": "Hotel Email already existed",
                    })
                else:
                    clerkSerializer = UserSerializerOne(data=clerk)
                    if clerkSerializer.is_valid(raise_exception=True):
                        savedClerk = clerkSerializer.save()
                        hotelSerializer = HotelSerializer(data=hotel)
                        if hotelSerializer.is_valid(raise_exception=True):
                            hotel_saved = hotelSerializer.save()
                            hotel_clerk = {'clerk': savedClerk.id, 'hotel': hotel_saved.id}
                            hotel_clerk_serializer = HotelClerkSerializer(data=hotel_clerk)
                            if hotel_clerk_serializer.is_valid():
                                hotel_clerk_serializer.save()
                                return Response({
                                    "success": 5,
                                    "message": "Hotel '{}' created successfully".format(hotel_saved.name)
                                })
        return Response({
            "success": 6,
            "message": "Something went wrong",
        })


class LoginViewSet(views.APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({
            "message": "Get method not allowed"
        })

    def post(self, request):
        username = str(request.data.get('username')).strip()
        password = str(request.data.get('password')).strip()

        if len(username) != 0 and len(password) != 0:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                hotel = HotelClerk.objects.filter(clerk=user)
                h_rc = HotelReceptionist.objects.filter(receptionist=user)
                if hotel.exists():
                    hotel = hotel.first()
                    token = Token.objects.get(user=user)
                    h_obj = Hotel.objects.get(pk=hotel.hotel_id)
                    if h_obj.is_reg_completed:
                        return Response({
                            "success": 2,
                            "token": token.key,
                            "message": "Successfully Logged In."
                        })
                    return Response({
                        "success": 1,
                        "token": token.key,
                        "message": "Successfully Logged In, please complete your registration"
                    })
                elif h_rc.exists():
                    slug = h_rc.first().hotel.slug
                    token = Token.objects.get(user=user)
                    return Response({
                        "success": 3,
                        "slug": slug,
                        "token": token.key,
                        "message": "Successfully Logged In."
                    })
                else:
                    return Response({
                        "success": 0,
                        "message": "No hotel registered for this User"
                    })
            else:
                return Response(
                    {"message": "Invalid username or password"}
                )
        else:
            if len(username) == 0:
                return Response({
                    "message": "Username is required"
                })
            elif len(password) == 0:
                return Response({
                    "message": "Password is required"
                })
            else:
                return Response({
                    "message": "Username and Password must be provided"
                })


class GetHotelViewSet(views.APIView):

    authentication_classes = [TokenAuthentication, ]
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        token = str(request.META.get('HTTP_AUTHORIZATION')).split(' ')
        user = Token.objects.filter(user=request.user)
        if user.exists():
            user = user.first()
            if token[1] == user.key and request.user.is_authenticated:
                hotel = Hotel.objects.filter(clerk=request.user)
                if hotel.exists():
                    hotel = hotel.first()
                    hotelSerialized = HotelSerializerall(hotel, many=False)
                    return Response({
                        "success": 1,
                        "message": "Hotel loaded successfully",
                        "hotel": hotelSerialized.data
                    })
                else:
                    return Response({
                        "success": 0,
                        "message": "No hotel find under this user"
                    })
        return Response({
            "success": 0,
            "message": "Authentication Failed"
        })

    def post(self, request):
        return Response({
            "message": "POST method not allowed"
        })


class CompleteRegistration(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        return Response({
            "message": "GET method not allowed"
        }, status=404)

    def post(self, request):
        token = str(request.META.get('HTTP_AUTHORIZATION')).split(' ')
        user = Token.objects.filter(user=request.user)
        if user.exists():
            user = user.first()
            if token[1] == user.key and request.user.is_authenticated:
                hotel = HotelClerk.objects.filter(clerk=user.user)
                if hotel.exists():
                    hotel = hotel.first()
                    hotel = hotel.hotel
                    data = dict(
                        website=str(request.data.get('website')).strip(),
                        no_website=request.data.get('has_website'),
                        API=str(request.data.get('api')).strip(),
                        no_api=request.data.get('has_api'),
                        location_lat=request.data.get('latitude'),
                        location_long=request.data.get('longitude'),
                        is_reg_completed=True
                    )

                    if len(str(data['location_lat'])) != 0 and len(str(data['location_long'])) != 0:
                        if data['no_api']:
                            data['API'] = None
                        if data['no_website']:
                            data['website'] = None
                        ht = HotelCompleteRegistrationSerializer(instance=hotel, data=data)
                        if ht.is_valid():
                            ht.save()
                            x = 1
                            if hotel.API is not None:
                                x = 2
                            return Response({
                                "success": x,
                                "message": "Registration completed!",
                            })
                        else:
                            return Response({
                                "success": 0,
                                "message": "Registration failed!, Invalid data provided"
                            })
                    else:
                        return Response({
                            "success": 0,
                            "message": "Registration failed!, Invalid data provided"
                        })
                    # return Response({
                    #     "success": 0,
                    #     "message": "Registration Failed, something went wrong"
                    # })
                else:
                    return Response({
                        "success": 0,
                        "message": "Authentication Failed, No hotel found under this user"
                    })
        return Response({
            "success": 0,
            "message": "Authentication Failed"
        })


class IsCompletedViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = IsCompletedSerializer
    queryset = Hotel.objects.all()

    def get_queryset(self):
        hotel = returnHotelObjFromToken(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
        if hotel is None:
            hotel = returnHotelObjForRec(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
            return Hotel.objects.filter(pk=hotel.id)
        return Hotel.objects.filter(pk=hotel.id)


class HasAPI(viewsets.ReadOnlyModelViewSet):
    serializer_class = HasAPISerializer
    queryset = Hotel.objects.all()

    def get_queryset(self):
        hotel = returnHotelObjFromToken(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
        if hotel is None:
            hotel = returnHotelObjForRec(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
            return Hotel.objects.filter(pk=hotel.id)
        return Hotel.objects.filter(pk=hotel.id)


class IsAdmin(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        token = str(request.META.get('HTTP_AUTHORIZATION')).split(' ')
        user = Token.objects.filter(user=request.user)
        if user.exists():
            user = user.first()
            if token[1] == user.key and request.user.is_authenticated:
                hoteladmin = HotelClerk.objects.filter(clerk=user.user)
                if hoteladmin.exists():
                    return Response({
                        "is_admin": True
                    })
                else:
                    hotelrec = HotelReceptionist.objects.filter(receptionist=user.user)
                    if hotelrec.exists():
                        return Response({
                            "is_admin": False
                        })
                    else:
                        return Response({
                            "message": "Not found"
                        }, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({
                    "message": "Authentication failed!"
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                "message": "Authentication failed!"
            }, status=status.HTTP_403_FORBIDDEN)




