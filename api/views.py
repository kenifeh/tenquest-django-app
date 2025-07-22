
from cmath import e
from datetime import datetime
from functools import partial
import json
import stripe
from django.contrib.auth import login
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer, UserAccountDetailsSerializer, \
    ShipmentSerializer, ImportShipmentSerializer, AddressSerializer, BatchSerializer, BatchSerializerPost, PrepPackShipSerializer, \
    BranchSerializer, \
    RegionSerializer, PickupSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated 
from .models import UserAccountDetails, Region, Branch, Postage, Shipment, ShippingUser, ShipmentImport, \
    Address, Batch, PrepPackShip, Pickup, WhyBuyBox, Blog, BlogDetail
from knox.auth import TokenAuthentication
from django.conf import settings
from django.core.mail import EmailMessage
import ast
from django.shortcuts import render
from django.contrib.auth.hashers import make_password



# views.py

from django.core.mail import EmailMessage


def send_forgot_password_email(user):
    token = AuthToken.objects.filter(user=user).latest('created')
    forgot_password_link = settings.FRONTEND_URL + f'/update-password/?{str(token)}'
    subject = "Forgot Password"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user.email, ]
    context = {'username': user.username, 'forgot_password_link': forgot_password_link}

    message = get_template("forgot_password_email.html").render(context)
    mail = EmailMessage(
        subject=subject,
        body=message,
        from_email=email_from,
        to=recipient_list,
    )
    mail.content_subtype = "html"
    mail.send()

    return forgot_password_link


# Function to send email to user for verification
def send_email_verification(user):
    token = AuthToken.objects.filter(user=user).latest('created')
    # token = token
    verify_link = settings.FRONTEND_URL + '/verify/' + str(token) + '?user_id=' + str(user.id)
    subject = "Email Verification"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user.email, ]
    message = get_template("verify_email.html").render({
        'username': user.username,
        'verify_url': verify_link,
    })
    mail = EmailMessage(
        subject=subject,
        body=message,
        from_email=email_from,
        to=recipient_list,
    )
    mail.content_subtype = "html"
    mail.send()

    return verify_link

def homepage(request):
    return render(request, 'index.html')

def pricepage(request):
    return render(request, 'price.html')

def blogdetails(request, slug):
    blog = BlogDetail.objects.get(slug=slug)
    return render(request, 'blog-detail.html', {'blog': blog})

def blogpage(request):
    if request.method == 'POST':
        blog = Blog.objects.create(
            email = request.POST.get('email'),
        )
        blog.save()
        return render(request, 'blog.html')
    blogs = BlogDetail.objects.all()
    return render(request, 'blog.html', {'blogs': blogs})

def ca_to_us(request):
    return render(request, 'ca-to-usa.html')

def contactpage(request):
    return render(request, 'contact.html')

def packagepage(request):
    return render(request, 'pack.html')

def us_to_ca(request):
    return render(request, 'usa-to-ca.html')

def whybuypage(request):
    if request.method == 'POST':
        why_buy = WhyBuyBox.objects.create(
            name = request.POST.get('name'),
            email = request.POST.get('email'),
            message = request.POST.get('message')
        )
        why_buy.save()
        return render(request, 'why-box.html')

    return render(request, 'why-box.html')

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not User.objects.filter(email=request.data['email']).exists():
            user = serializer.save()
            token = AuthToken.objects.create(user)[1]
            verify_link = send_email_verification(user)
            user.is_active = False
            user.save()
            return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "is_agree": False,
            "is_verified": False,
            "is_account_setup_completed": False,
            "verification_link": verify_link
            })
        else:
            return Response({"Error": "Email Already Exists"})


# Login API
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginAPI, self).post(request, format=None)
        user_account_details = UserAccountDetails.objects.filter(user=request.user)
        response.data['user'] = UserSerializer(user).data
        if user_account_details.exists():
            user_account_details = user_account_details.first()
            response.data['is_account_setup_completed'] = True
            response.data['is_agree'] = user_account_details.is_agree
            response.data['is_verified'] = user.is_active
            response.data['user']['account'] = UserAccountDetailsSerializer(user_account_details).data
        else:
            # Fetch Regions and branches
            region_branches = []
            branches = Branch.objects.all()
            for branch in branches:
                region_serializer = BranchSerializer(branch)
                region_branches.append(region_serializer.data)
            regions = Region.objects.values_list('pk', 'name')

            response.data['user']['region_list'] = regions
            response.data['user']['region_branches'] = region_branches
            response.data['is_account_setup_completed'] = False
            response.data['is_agree'] = False
            response.data['is_verified'] = True
        return response


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(generics.UpdateAPIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        email = self.request.query_params.get('email')

        try:
            user = User.objects.get(email=email)
            forgot_password_link = send_forgot_password_email(user)
            return Response(
                {"message": "Verification link has been sent. Please Check your email",
                 "forgot_password_link": forgot_password_link},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"message": "Account not found. Please provide a valid email"},
                status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, *args, **kwargs):
        password = request.data.get("password")
        user_name = request.data.get("user_name")

        try:
            user = User.objects.get(username=user_name)
            user.password = make_password(password)
            user.save()

            return Response(
                {"message": "Password updated successfully"},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"message": "Account not found. Please provide a valid email"},
                status=status.HTTP_404_NOT_FOUND
            )

class UserAPI(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        account = UserAccountDetails.objects.filter(user = request.user.id)
        serializer = UserAccountDetailsSerializer(account, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Verify user functionality
class UserVerification(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        token = request.GET.get('token').split(' ')[0]
        user_id = request.GET.get('user_id')
        user = User.objects.get(pk=user_id)
        knox_token = AuthToken.objects.filter(digest=token).first()

        user_details = User.objects.filter(id=user_id).first()
        if user_details.is_active:
            return Response({"status": 400, "message": "User already verified", "is_verified": False, "token": token})

        if knox_token.user == user:
            User.objects.filter(id=user_id).update(is_active=True)
            return Response({"status": 200, "message": "User successfully verified", "is_verified": False, "token": token})
        else:
            return Response({"status": 400, "message": "Link has expired", "is_verified": False})
    

# User account setup functionality
class UserAccountSetup(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]
    
    # Get user account details
    def get(self, request):
        region_branches = []
        branches = Branch.objects.all()
        for branch in branches:
            region_serializer = BranchSerializer(branch)
            region_branches.append(region_serializer.data)

        if UserAccountDetails.objects.filter(user=request.user).exists():
            user_account_details = UserAccountDetails.objects.get(user=request.user)
            serializer = UserAccountDetailsSerializer(user_account_details)
            # if user_account_details.return_address is not None:
            #     address = Address.objects.get(id=user_account_details.return_address.id)
            #     address_serializer = AddressSerializer(address)

            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched user account details",
                "data": serializer.data,
                "region_branches": region_branches,
                # "return_address": address_serializer.data or ''
            })
        else:
            return Response({
                "status": 400,
                "message": "No account details associated with this user",
            })

    # Create or update user account details
    def post(self, request):
        payload = request.data
        user = User.objects.get(pk=request.user.id)
        region = Region.objects.get(pk=1)
        branch = Branch.objects.get(pk=1)
        payload['product_type'] = str(payload['product_type'])
        payload.update({'user': user.pk, 'region': region.pk, 'branch': branch.pk})

        if UserAccountDetails.objects.filter(user=request.user).exists():
            user_account_detail = UserAccountDetails.objects.get(user=request.user)
            serializer = UserAccountDetailsSerializer(user_account_detail, data=payload, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "status": status.HTTP_200_OK,
                    "message": "Successfully updated user account details",
                    "data": serializer.data,
                })
            else:
                print("if serializer errors: ", serializer.errors)
                return Response(serializer.errors, status=400)
        else:
            serializer = UserAccountDetailsSerializer(data=payload)
            if serializer.is_valid():
                serializer.save()


                return Response({
                    "status": status.HTTP_201_CREATED,
                    "message": "User account setup successfully completed",
                    "data": serializer.data,
                    # "verification_link": verify_link
                })
            else:
                print("serializer errors: ", serializer.errors)
                return Response(serializer.errors, status=400)

    def delete(self, request):
        # user = User.objects.get(id=request.user.id)
        # user.is_active = False
        # user.save()
        user_account_details = UserAccountDetails.objects.filter(user=request.user)
        if user_account_details.exists():
            user_account_detail = user_account_details.first()
            user_account_detail.is_deleted = True
            user_account_detail.save()

            return Response({
                "status": status.HTTP_200_OK,
                "message": "User account setup successfully deleted"
            })
        else:
            return Response({
                "status": status.HTTP_204_NO_CONTENT,
                "message": "User account setup does not exists"
            })


class UserReturnAddress(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]

    def post(self, request):
        payload = request.data
        user_account_details = UserAccountDetails.objects.filter(user=request.user)
        serializer = AddressSerializer(data=payload)
        if serializer.is_valid():
            if user_account_details.exists():
                serializer.save()
                account_details = user_account_details.first()
                account_details.return_address = Address.objects.get(id=serializer.data.get('id'))
                account_details.save()
                return Response({
                    "status": status.HTTP_200_OK,
                    "message": "Return Address successfully saved in user account",
                    "data": serializer.data
                })
            else:
                return Response({
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "User account details does not exists"
                })
        else:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Return Address not saved",
                "data": serializer.errors
            })


# User's terms & condition functionality
class UserTermsAndCondition(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        if UserAccountDetails.objects.filter(user=request.user).exists():
            user_account_details = UserAccountDetails.objects.get(user=request.user)
            is_agreed = user_account_details.is_agree
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched user account details",
                "is_agree": is_agreed
            })
        else:
            return Response({
                "status": 400,
                "message": "No account details associated with this user",
            })

    def put(self, request):
        if UserAccountDetails.objects.filter(user=request.user).exists():
            user_account_details = UserAccountDetails.objects.get(user=request.user)
            user = User.objects.get(pk=request.user.id)
            user_account_details.is_agree = True
            user_account_details.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "User successfully agreed terms and conditions",
                "is_agree": True,
                "user" : UserSerializer(user).data
            })
        else:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "No account details associated with this user",
                "is_agree": False
            })


# Resend verification email functionality
class ResendVerificationEmail(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user_details = User.objects.get(email=request.data)

        if user_details.is_active:
            return Response({"status": 400, "message": "User already verified"})
        else:
            verify_link = send_email_verification(user_details)

            return Response({
                "status": 200,
                "message": "Successfully resend email verification",
                "url": verify_link
            })


# Shipment functionality
class ShipmentDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]

    # Get shipment by ID & Get all shipments of a user
    def get(self, request):
        shipment_id = request.GET.get('id')

        if shipment_id:
            shipment = Shipment.objects.get(pk=shipment_id)
            serializer = ShipmentSerializer(shipment)
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched shipment record",
                "data": serializer.data,
            })
        else:
            shipments = Shipment.objects.filter(user=request.user, is_deleted=False)
            serializer = ShipmentSerializer(shipments, many=True)

            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched all shipment records",
                "data": serializer.data,
            })

    # Create shipment record
    def post(self, request):
        user = User.objects.get(pk=request.user.id)

        count = 0
        created_ships = []
        for payload in request.data:
            payload.update({'user': user.pk})
            serializer = ShipmentSerializer(data=payload)
            if serializer.is_valid():
                serializer.save()
                count += 1
                created_ships.append(serializer.data)
            else:
                return Response({
                    "status": 400,
                    "message": "Successfully created {} shipment/s".format(count),
                    "data": serializer.errors,
                })

        return Response({
            "status": status.HTTP_201_CREATED,
            "message": "Successfully created {} shipment/s".format(count),
            "data": created_ships,
        })

    # To update record
    def put(self, request):
        payload = request.data
        shipment_id = request.data.get('id')
        shipment = Shipment.objects.get(pk=shipment_id)
        serializer = ShipmentSerializer(shipment, data=payload, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully updated shipment",
                "data": serializer.data,
            })
        else:
            return Response(serializer.errors, status=400)

    # To delete a shipment record
    def delete(self, request):
        shipment_id = request.GET.get('id')
        shipment = Shipment.objects.filter(pk=shipment_id)
        if not shipment.exists():
            return Response({
                "status": 204,
                "message": "No shipment record found on this ID",
            })
        shipment.update(is_deleted=True)
        return Response({
            "status": status.HTTP_200_OK,
            "message": "Successfully deleted shipment record",
        })


class ShipmentFileImport(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]

    def post(self, request):
        file_name = request.data.get('file_name')
        headings = request.data.get('columns')
        data = ''
        for head in headings:
            data = data + head + ','
        data = data[:-1] + '\n'

        for row in request.data.get('parsedData'):
            for value in row:
                data = data + value + ','
            data = data[:-1] + '\n'

        updated_file_name = file_name.replace('.csv', '') + str(datetime.now().strftime("_%d-%m-%Y_%H:%M:%S")) + '.csv'
        new_file = settings.MEDIA_ROOT + updated_file_name
        file = open(new_file, 'w')
        file.write(data)
        file_path = settings.BASE_URL + 'api/shipment/' + updated_file_name
        serializer = ImportShipmentSerializer(data={"user": request.user.id, "file_name": file_name, "file_path": file_path})
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({
                "status": 400,
                "message": "Error",
                "data": serializer.errors
            })

        return Response({
            "status": status.HTTP_200_OK,
            "message": "File successfully saved",
            "data": serializer.data
        })

    def get(self, request):
        imported_files = ShipmentImport.objects.filter(user=request.user.id)
        serializer = ImportShipmentSerializer(imported_files, many=True)
        return Response({
            "status": status.HTTP_200_OK,
            "message": "File imports successfully fetched",
            "data": serializer.data
        })

    def delete(self, request):
        shipment_import_id = request.GET.get('id')
        shipment_imports = ShipmentImport.objects.filter(id=shipment_import_id)
        if shipment_imports.exists():
            shipment_imports.delete()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Shipment Import with id {} deleted successfully".format(shipment_import_id)
            })
        else:
            return Response({
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Shipment Import with id {} does not exists".format(shipment_import_id)
            })


def download_file(request, file_name):
    response = HttpResponse(open('media/{}'.format(file_name), 'rb'), content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
    return response


class Payment(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated,]

    @csrf_exempt
    def post(self, request):
        try:
            data = request.data
            amount = int(data['amount'] * 100)  # as stripe expect cents
            shipment = Shipment.objects.get(id=data['shipment_id'])
            if shipment.payment_id is None:
                # Create a PaymentIntent with the order amount and currency
                intent = stripe.PaymentIntent.create(
                    amount=amount,
                    currency='CAD',
                    payment_method_types=["card"],
                    metadata={"shipment_id": data['shipment_id']},
                )
                shipment.payment_id = intent['client_secret']
                shipment.save()
                return JsonResponse({
                    'clientSecret': intent['client_secret']
                })
            else:
                return JsonResponse({
                    'clientSecret': shipment.payment_id
                })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=403)


class BatchDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        batch_id = request.GET.get('batch_id')
        if batch_id:
            try:
                batch = Batch.objects.get(batch_id=batch_id)
            except Batch.DoesNotExist:
                return Response({
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "Batch has been deleted or not exist",
                })
            non_deleted_shipments = batch.shipments.filter(is_deleted=False)
            batch_serializer = BatchSerializer(batch)
            batch_data = batch_serializer.data
            batch_data['shipments'] = ShipmentSerializer(non_deleted_shipments, many=True).data
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched batch record with non-deleted shipments",
                "data": batch_data,
            })
        else:
            batches = Batch.objects.filter(user=request.user)
            batch_data = []
            for batch in batches:
                non_deleted_shipments = batch.shipments.filter(is_deleted=False)
                batch_serializer = BatchSerializer(batch)
                batch_data.append({
                    **batch_serializer.data,
                    'shipments': ShipmentSerializer(non_deleted_shipments, many=True).data
                })

            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched all batch records with non-deleted shipments",
                "data": batch_data,
            })

    def post(self, request):
        payload = request.data
        payload['batch_id'] = Batch.get_batch_id()
        payload['user'] = request.user.id
        batch_serializer = BatchSerializerPost(data=payload)
        if batch_serializer.is_valid():
            batch_serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully created batch record",
                "data": batch_serializer.data,
            })
        else:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Errors on creating batch record",
                "data": batch_serializer.errors,
            })

    def put(self, request):
        payload = request.data
        batch_id = request.data.get('id')
        batch = Batch.objects.get(batch_id=batch_id)
        batch_name = request.data.get('batch_name')
        if batch_name is not None:
            batch.name = batch_name
            batch.save()
        serializer = BatchSerializer(batch, data=payload, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully updated batch",
                "data": serializer.data,
            })
        else:
            return Response(serializer.errors, status=400)

    # To delete a Batch record
    def delete(self, request):
        batch_id = request.GET.get('id')
        batch = Batch.objects.filter(id=batch_id)
        if batch.exists():
            batch.delete()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Pickup with id {} deleted successfully".format(batch_id)
            })
        else:
            return Response({
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Batch with id {} does not exists".format(batch_id)
            })


class PrepPackShipDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        pps_id = request.GET.get('id')
        if pps_id:
            prep_pack_ship = PrepPackShip.objects.get(id=pps_id)
            pps_serializer = PrepPackShipSerializer(prep_pack_ship)
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched prep pack and ship record",
                "data": pps_serializer.data,
            })
        else:
            prep_pack_ships = PrepPackShip.objects.filter(user=request.user.id)
            pps_serializer = PrepPackShipSerializer(prep_pack_ships, many=True)
            pps_serializer.data[0]['service_type'] = ast.literal_eval(pps_serializer.data[0]['service_type'])
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched all prep-pack and ship records",
                "data": pps_serializer.data,
            })

    def post(self, request):
        payload = request.data
        payload['service_type'] = str(payload['service_type'])
        payload['user'] = request.user.id
        pps_serializer = PrepPackShipSerializer(data=payload)
        if pps_serializer.is_valid():
            pps_serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully created prep-pack and ship record",
                "data": pps_serializer.data,
            })
        else:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Errors on creating prep-pack and ship record",
                "data": pps_serializer.errors,
            })

    def put(self, request):
        payload = request.data
        pps_id = request.data.get('id')
        prep_pack_ship = PrepPackShip.objects.get(id=pps_id)
        pps_serializer = PrepPackShipSerializer(prep_pack_ship, data=payload, partial=True)
        if pps_serializer.is_valid():
            pps_serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully updated prep-pack and ship record",
                "data": pps_serializer.data,
            })
        else:
            return Response(pps_serializer.errors, status=400)

    def patch(self, request):
        payload = request.data
        pps_id = payload.get('id')

        try:
            prep_pack_ship = PrepPackShip.objects.get(id=pps_id)
        except PrepPackShip.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": f"Prep Pack and Ship with id {pps_id} does not exist",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        is_packed = payload.get('is_packed')
        if is_packed is not None:
            prep_pack_ship.is_packed = is_packed
            prep_pack_ship.save()
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": f"Successfully updated 'is_packed' for Prep Pack and Ship with id {pps_id}",
                    "data": PrepPackShipSerializer(prep_pack_ship).data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "You must provide 'is_packed' field to update.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request):
        prep_pack_id = request.GET.get('id')
        prep_pack = PrepPackShip.objects.filter(id=prep_pack_id)
        if prep_pack.exists():
            prep_pack.delete()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Pickup with id {} deleted successfully".format(prep_pack_id)
            })
        else:
            return Response({
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Prep Pack n Ship with id {} does not exists".format(prep_pack_id)
            })


class PickupDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        pickup_id = request.GET.get('id')
        if pickup_id:
            pickup = Pickup.objects.filter(id=pickup_id)
            if pickup.exists():
                pickup_serializer = PickupSerializer(pickup.first())
                return Response({
                    "status": status.HTTP_200_OK,
                    "message": "Successfully fetched pickup record",
                    "data": pickup_serializer.data,
                })
            else:
                return Response({
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Pickup with id {} does not exists.".format(pickup_id)
                })
        else:
            pickups = Pickup.objects.filter(user=request.user.id)
            pickup_serializer = PickupSerializer(pickups, many=True)
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully fetched all pickup records",
                "data": pickup_serializer.data,
            })

    def post(self, request):
        payload = request.data
        payload['user'] = request.user.id
        pickup_serializer = PickupSerializer(data=payload)
        if pickup_serializer.is_valid():
            pickup_serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully created pickup record",
                "data": pickup_serializer.data,
            })
        else:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Errors on creating pickup record",
                "data": pickup_serializer.errors,
            })

    def put(self, request):
        payload = request.data
        pickup_id = request.data.get('id')
        pickup = Pickup.objects.get(id=pickup_id)
        pickup_serializer = PickupSerializer(pickup, data=payload, partial=True)
        if pickup_serializer.is_valid():
            pickup_serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Successfully updated pickup record",
                "data": pickup_serializer.data,
            })
        else:
            return Response(pickup_serializer.errors, status=400)

    def delete(self, request):
        pickup_id = request.GET.get('id')
        pickup = Pickup.objects.filter(id=pickup_id)
        if pickup.exists():
            pickup.delete()
            return Response({
                "status": status.HTTP_200_OK,
                "message": "Pickup with id {} deleted successfully".format(pickup_id)
            })
        else:
            return Response({
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Pickup with id {} does not exists".format(pickup_id)
            })
