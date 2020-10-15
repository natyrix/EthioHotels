from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import views, viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from End_User.models import HotelRating, Comment
from Hotel.models import HotelClerk, HotelGallery, Hotel, HotelReceptionist
from Hotel.serializers import RatingSerializer, ReviewSerializer, GallerySerializer, AccountSerializer, RoomSerializer, \
    RoomTypeSerializer, RoomSerializer1, UserSerializer, HotelRecSerializer, HotelRecSerializer1, CheckInSerializer, \
    ChangePasswordSerializer, GuestSerializer, CheckInSerializer1, ReservationSerializer1
from rest_framework.parsers import MultiPartParser, FormParser

from Rooms.models import Room, RoomType, CheckIn, Reservation
from accounts.serializers import UserSerializerOne


def returnHotelObjFromToken(token):
    user = Token.objects.get(key=token[1])
    hotel = HotelClerk.objects.filter(clerk=user.user)
    if hotel.exists():
        hotel = hotel.first()
        return hotel.hotel
    else:
        return None


def returnHotelObjForRec(token):
    user = Token.objects.get(key=token[1])
    hotel = HotelReceptionist.objects.filter(receptionist=user.user)
    if hotel.exists():
        hotel = hotel.first()
        return hotel.hotel
    else:
        return None


class RatingViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RatingSerializer
    queryset = HotelRating.objects.all()

    def get_queryset(self):
        hotel = returnHotelObjFromToken(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
        return HotelRating.objects.filter(hotel=hotel)


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        hotel = returnHotelObjFromToken(str(self.request.META.get('HTTP_AUTHORIZATION')).split(' '))
        return Comment.objects.filter(hotel=hotel)


class GalleryView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_gallery = HotelGallery.objects.filter(hotel=hotel).order_by('-id')
        serializer = GallerySerializer(hotel_gallery, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        h_data = {
            'hotel': hotel.id,
            'img_location': request.data['img_location']
        }
        gallery_serializer = GallerySerializer(data=h_data)
        # gallery_serializer['hotel'] = hotel
        if gallery_serializer.is_valid():
            gallery_serializer.save()
            return Response({
                'message': 'Upload Successful',
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(gallery_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        assert int(pk), "Invalid id provided"
        img = HotelGallery.objects.filter(hotel=hotel, pk=int(pk))
        if img.exists():
            img = img.first()
            img.delete()
            return Response({
                'message': 'Deleted successfully',
            }, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({
                'message': 'Image not found',
            }, status=status.HTTP_304_NOT_MODIFIED)


class AccountView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_account = Hotel.objects.get(id=hotel.id)
        serializer = AccountSerializer(hotel_account)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel1 = get_object_or_404(Hotel, pk=kwargs['pk'])
        if hotel == hotel1:
            hotel_account = Hotel.objects.get(id=hotel.id)
            data = request.data
            serializer = AccountSerializer(hotel_account, data=data, partial=True)
            if serializer.is_valid():
                h = serializer.save()
                return Response(
                    AccountSerializer(h).data
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({
                'message': 'Hotel not found',
            }, status=status.HTTP_304_NOT_MODIFIED)


class RoomView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_rooms = Room.objects.filter(hotel=hotel).order_by('-id')
        serializer = RoomSerializer(hotel_rooms, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        hotel_rooms = Room.objects.filter(hotel=hotel, room_no=int(data['room_no']))
        if not hotel_rooms.exists():
            room_type = RoomType.objects.filter(room_type=data['room_type'], hotel=hotel)
            if room_type.exists():
                room_type = room_type.first()
                d = {'room_no': str(data['room_no']), 'room_type': room_type.id, 'hotel': hotel.id}
                room_serializer = RoomSerializer1(data=d)
                if room_serializer.is_valid():
                    room_serializer.save()
                    return Response({
                        'message': 'Room added successfully',
                        'room': room_serializer.data
                    })
                else:
                    print(room_serializer.errors)
                    return Response({
                        'message': 'Invalid data provided'
                    }, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response({
                    'message': 'Room type not found'
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Room already existed'
            }, status=status.HTTP_304_NOT_MODIFIED)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        room_id = int(data['id'])
        room = Room.objects.filter(pk=room_id, hotel=hotel)
        if room.exists():
            room = room.first()
            room_no = int(data['room_no'])
            room_type = data['room_type']
            room_type = RoomType.objects.filter(room_type=room_type, hotel=hotel)
            if room_type.exists():
                room_type = room_type.first()
                d = {'room_no': str(room_no), 'room_type': room_type.id}
                serializer = RoomSerializer1(room, data=d, partial=True)
                if serializer.is_valid():
                    s = serializer.save()
                    return Response({
                        'message': 'Updated Successfully'
                    })
                else:
                    print(serializer.errors)
                    return Response({
                        'message': 'Invalid data provided'
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({
                    'message': 'Room type not found!'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'message': 'Access Denied'
            }, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        assert int(pk), "Invalid id provided"
        room = Room.objects.filter(hotel=hotel, pk=int(pk))
        if room.exists():
            room = room.first()
            room.delete()
            return Response({
                'message': 'Deleted successfully',
            })
        else:
            return Response({
                'message': 'Room not found',
            }, status=status.HTTP_304_NOT_MODIFIED)


class RoomTypeView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_room_types = RoomType.objects.filter(hotel=hotel).order_by('-id')
        serializer = RoomTypeSerializer(hotel_room_types, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        room_type = RoomType.objects.filter(hotel=hotel, room_type=data['room_type'])
        if not room_type.exists():
            d = {'room_type': data['room_type'], 'price': data['price'], 'hotel': hotel.id}
            serializer = RoomTypeSerializer(data=d)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Room Type added successfully',
                })
        else:
            return Response({
                'message': 'Room Type already existed'
            }, status=status.HTTP_304_NOT_MODIFIED)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        room_type = RoomType.objects.filter(pk=int(data['id']), hotel=hotel)
        if room_type.exists():
            room_type = room_type.first()
            d = {'room_type': data['room_type'], 'price': data['price']}
            serializer = RoomTypeSerializer(room_type, data=d, partial=True)
            if serializer.is_valid():
                s = serializer.save()
                return Response({
                        'message': 'Updated Successfully'
                    })
            else:
                print(serializer.errors)
                return Response({
                    'message': 'Invalid data provided',
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Room Type not found',
            }, status=status.HTTP_304_NOT_MODIFIED)

    def delete(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        assert int(pk), "Invalid id provided"
        room_type = RoomType.objects.filter(hotel=hotel, pk=int(pk))
        if room_type.exists():
            room_type = room_type.first()
            room = Room.objects.filter(room_type=room_type).exclude(status='Free')
            if room.exists():
                return Response({
                    'deleted': False,
                    'message': 'A room associated with this room type is either checked in or reserved, room type '
                               'cannot be deleted',
                })
            else:
                room_type.delete()
                return Response({
                    'deleted': True,
                    'message': 'Deleted successfully',
                })
        else:
            return Response({
                'message': 'Room Type not found',
            }, status=status.HTTP_304_NOT_MODIFIED)


class ReceptionistView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_receptionists = HotelReceptionist.objects.filter(hotel=hotel).order_by('-id')
        serializer = HotelRecSerializer1(hotel_receptionists, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        u_name = User.objects.filter(username=data['username'])
        if not u_name.exists():
            u_email = User.objects.filter(email=data['email'])
            if not u_email.exists():
                d = {'username': data['username'], 'password': data['password'],
                     'email': data['email'], 'first_name': data['first_name'], 'last_name': data['last_name']}
                u_serializer = UserSerializerOne(data=d)
                if u_serializer.is_valid():
                    u_serializer.save()
                    rec = u_serializer.data
                    rec = User.objects.get(username=rec['username'])
                    recd = {'hotel': hotel.id, 'receptionist': rec.id}
                    hr_serializer = HotelRecSerializer(data=recd)
                    if hr_serializer.is_valid():
                        hr_serializer.save()
                        return Response({
                            'message': 'Receptionist added successfully',
                        })
                    else:
                        print(hr_serializer.errors)
                        return Response({
                            'message': 'Invalid data provided',
                        }, status=status.HTTP_304_NOT_MODIFIED)
                else:
                    print(u_serializer.errors)
                    return Response({
                        'message': 'Invalid data provided',
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({
                    'message': 'Email address already exists'
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Username already taken'
            }, status=status.HTTP_304_NOT_MODIFIED)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        user = User.objects.filter(pk=int(data['id']))
        if user.exists():
            user = user.first()
            hr = HotelReceptionist.objects.filter(hotel=hotel, receptionist=user)
            if hr.exists():
                d = {'username': data['username'],
                     'email': data['email'], 'first_name': data['first_name'], 'last_name': data['last_name']}
                serializer = UserSerializer(user, data=d, partial=True)
                if serializer.is_valid():
                    s = serializer.save()
                    return Response({
                            'message': 'Updated Successfully'
                        })
                else:
                    print(serializer.errors)
                    return Response({
                        'message': 'Invalid data provided',
                    }, status=status.HTTP_304_NOT_MODIFIED)

            return Response({
                'message': 'Receptionist is not under this hotel',
            }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Receptionist not found',
            }, status=status.HTTP_304_NOT_MODIFIED)

    def delete(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        assert int(pk), "Invalid id provided"
        hr = HotelReceptionist.objects.filter(hotel=hotel, pk=int(pk))
        if hr.exists():
            hr.first()
            hr.delete()
            return Response({
                'message': 'Deleted successfully',
            })
        else:
            print(hr)
            return Response({
                'message': 'Receptionist not found',
            }, status=status.HTTP_304_NOT_MODIFIED)


class CheckInView(views.APIView):

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_checkins = CheckIn.objects.filter(hotel=hotel).order_by('-id')
        serializer = CheckInSerializer(hotel_checkins, many=True)
        return Response(serializer.data)


class ReservationView(views.APIView):

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_res = Reservation.objects.filter(hotel=hotel).order_by('-id')
        serializer = CheckInSerializer(hotel_res, many=True)
        return Response(serializer.data)


class ChangeRecPass(views.APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        rec = User.objects.filter(pk=int(pk))
        if rec.exists():
            rec = rec.first()
            h_rec = HotelReceptionist.objects.filter(hotel=hotel, receptionist=rec)
            if h_rec.exists():
                serializer = ChangePasswordSerializer(data=request.data)
                if serializer.is_valid():
                    new_pass = serializer.data.get('new_pass')
                    con_pass = serializer.data.get('con_pass')
                    old_pass = serializer.data.get('old_pass')
                    if new_pass == con_pass:
                        if old_pass != new_pass:
                            if rec.check_password(old_pass):
                                rec.set_password(new_pass)
                                rec.save()
                                return Response({
                                    'message': 'Updated Successfully'
                                })
                            else:
                                return Response({
                                    'message': 'Invalid old password'
                                })
                        else:
                            return Response({
                                'message': 'Old password is the same as new password'
                            })
                    else:
                        return Response({
                            'message': 'Passwords should match'
                        }, status=status.HTTP_304_NOT_MODIFIED)
                else:
                    print(serializer.errors)
                    return Response({
                        'message': 'Invalid data provided'
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({
                    'message': 'Receptionist not found under this hotel'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                'message': 'Receptionist not found'
            }, status=status.HTTP_404_NOT_FOUND)


class ChangeHotPass(views.APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, pk):
        hotel = returnHotelObjFromToken(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hc = HotelClerk.objects.filter(hotel=hotel)
        if hc.exists() and hotel.id == pk:
            hc = hc.first()
            clerk = hc.clerk
            print(request.data)
            serializer = ChangePasswordSerializer(data=request.data)
            if serializer.is_valid():
                new_pass = serializer.data.get('new_pass')
                con_pass = serializer.data.get('con_pass')
                old_pass = serializer.data.get('old_pass')
                if new_pass == con_pass:
                    if old_pass != new_pass:
                        if clerk.check_password(old_pass):
                            clerk.set_password(new_pass)
                            clerk.save()
                            print(clerk)
                            return Response({
                                'message': 'Updated Successfully'
                            })
                        else:
                            return Response({
                                'message': 'Invalid old password'
                            })
                    else:
                        return Response({
                            'message': 'Old password is the same as new password'
                        })
                else:
                    return Response({
                        'message': 'Passwords should match'
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                print(serializer.errors)
                return Response({
                    'message': 'Invalid data provided'
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Account not found'
            }, status=status.HTTP_404_NOT_FOUND)


class RecRoomView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_rooms = Room.objects.filter(hotel=hotel).order_by('-id')
        serializer = RoomSerializer(hotel_rooms, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        hotel_room = Room.objects.filter(hotel=hotel, pk=int(data['id']))
        if hotel_room.exists():
            hotel_room = hotel_room.first()
            guest_data = {
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'phone_number': data['phone_number'],
                'identification_card_info': data['identification_card_info']
            }
            g_serializer = GuestSerializer(data=guest_data)
            if g_serializer.is_valid():
                g = g_serializer.save()
                g = g_serializer.data
                token = str(request.META.get('HTTP_AUTHORIZATION')).split(' ')
                user = Token.objects.get(key=token[1])
                h_rec = HotelReceptionist.objects.get(receptionist=user.user)
                cr_data = {
                    'room': hotel_room.id,
                    'guest': g['id'],
                    'start_date': data['start_date'],
                    'end_date': data['end_date'],
                    'receptionist': user.user.id,
                    'hotel': h_rec.hotel.id
                }
                if data['action'] == 'Check-In':
                    room_data = {
                        'status': 'CheckedIn'
                    }
                    room_serializer = RoomSerializer1(hotel_room, data=room_data, partial=True)
                    if room_serializer.is_valid():
                        room_serializer.save()
                    else:
                        print(room_serializer.errors)
                        return Response({
                            'message': 'Invalid data provided for room while checkin!'
                        }, status=status.HTTP_403_FORBIDDEN)
                    chk_in_serializer = CheckInSerializer1(data=cr_data)
                    if chk_in_serializer.is_valid():
                        c = chk_in_serializer.save()
                        return Response({
                            'message': 'Checked in successfully'
                        })
                    else:
                        print(chk_in_serializer.errors)
                        return Response({
                            'message': 'Invalid data provided for checkin!'
                        }, status=status.HTTP_403_FORBIDDEN)
                elif data['action'] == 'Reservation':
                    room_data = {
                        'status': 'Reserved'
                    }
                    room_serializer = RoomSerializer1(hotel_room, data=room_data, partial=True)
                    if room_serializer.is_valid():
                        room_serializer.save()
                    else:
                        print(room_serializer.errors)
                        return Response({
                            'message': 'Invalid data provided for room while reservation!'
                        }, status=status.HTTP_403_FORBIDDEN)
                    r_serializer = ReservationSerializer1(data=cr_data)
                    if r_serializer.is_valid():
                        r = r_serializer.save()
                        return Response({
                            'message': 'Reservation successful'
                        })
                    else:
                        print(r_serializer.errors)
                        return Response({
                            'message': 'Invalid data provided for Reservation!'
                        }, status=status.HTTP_403_FORBIDDEN)
            else:
                print(g_serializer.errors)
                return Response({
                    'message': 'Invalid data provided for Guest!'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'message': 'Room not found!'
            }, status=status.HTTP_403_FORBIDDEN)


class RecRoomTypeView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_room_types = RoomType.objects.filter(hotel=hotel).order_by('-id')
        serializer = RoomTypeSerializer(hotel_room_types, many=True)
        return Response(serializer.data)


class RecCheckInView(views.APIView):

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_check_in = CheckIn.objects.filter(hotel=hotel, is_free=False).order_by('-id')
        serializer = CheckInSerializer(hotel_check_in, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        hotel_chk = CheckIn.objects.filter(hotel=hotel, pk=int(data['id']))
        if hotel_chk.exists():
            hotel_chk = hotel_chk.first()
            room = Room.objects.filter(pk=hotel_chk.room.id)
            if room.exists():
                room = room.first()
                room_data = {
                    'status': 'Free'
                }
                rs = RoomSerializer1(room, data=room_data, partial=True)
                if rs.is_valid():
                    rs.save()
                    res_data = {
                        'is_free': True
                    }
                    res_ser = CheckInSerializer1(hotel_chk, data=res_data, partial=True)
                    if res_ser.is_valid():
                        res_ser.save()
                        return Response({
                            'message': 'Check In released successfully'
                        })
                    else:
                        print(res_ser.errors)
                        return Response({
                            'message': 'Invalid data provided'
                        }, status=status.HTTP_304_NOT_MODIFIED)
                else:
                    print(rs.errors)
                    return Response({
                        'message': 'Invalid data provided'
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({
                    'message': 'Room not found'
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Access denied'
            }, status=status.HTTP_304_NOT_MODIFIED)


class RecReservationView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        hotel_res = Reservation.objects.filter(hotel=hotel, is_free=False).order_by('-id')
        serializer = CheckInSerializer(hotel_res, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        hotel = returnHotelObjForRec(str(request.META.get('HTTP_AUTHORIZATION')).split(' '))
        data = request.data
        hotel_res = Reservation.objects.filter(hotel=hotel, pk=int(data['id']))
        if hotel_res.exists():
            hotel_res = hotel_res.first()
            room = Room.objects.filter(pk=hotel_res.room.id)
            if room.exists():
                room = room.first()
                room_data = {
                    'status': 'Free'
                }
                rs = RoomSerializer1(room, data=room_data, partial=True)
                if rs.is_valid():
                    rs.save()
                    res_data = {
                        'is_free': True
                    }
                    res_ser = ReservationSerializer1(hotel_res, data=res_data, partial=True)
                    if res_ser.is_valid():
                        res_ser.save()
                        return Response({
                            'message': 'Reservation released successfully'
                        })
                    else:
                        print(res_ser.errors)
                        return Response({
                            'message': 'Invalid data provided'
                        }, status=status.HTTP_304_NOT_MODIFIED)
                else:
                    print(rs.errors)
                    return Response({
                        'message': 'Invalid data provided'
                    }, status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({
                    'message': 'Room not found'
                }, status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response({
                'message': 'Access denied'
            }, status=status.HTTP_304_NOT_MODIFIED)
