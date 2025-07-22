from knox import views as knox_views
from api.views import LoginAPI, RegisterAPI, UserAPI, ChangePasswordView, UserAccountSetup, UserVerification, \
    UserTermsAndCondition, ShipmentDetails, ResendVerificationEmail, ShipmentFileImport, download_file, \
    UserReturnAddress, Payment, BatchDetails, PrepPackShipDetails, PickupDetails, ForgotPasswordView
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = "api"

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/user/', UserAPI.as_view(), name='user'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('api/user-account-setup/', UserAccountSetup.as_view(), name='user-account-setup'),
    path('api/verify-user/', UserVerification.as_view(), name='verify-user'),
    path('api/terms-and-condition/', UserTermsAndCondition.as_view(), name='terms-and-condition'),
    path('api/resend-verification/', ResendVerificationEmail.as_view(), name='resend-verification'),
    path('api/shipment/', ShipmentDetails.as_view(), name='shipment'),
    path('api/import-shipment/', ShipmentFileImport.as_view(), name='shipment-import'),
    path('api/shipment/<str:file_name>', download_file),
    path('api/create-payment-intent/', Payment.as_view(), name='create-payment'),
    path('api/return-address/', UserReturnAddress.as_view(), name='user-return-address'),
    path('api/batch/', BatchDetails.as_view(), name='batch-details'),
    path('api/prep-pack-ship/', PrepPackShipDetails.as_view(), name='prep-pack-ship-details'),
    path('api/pickup-details/', PickupDetails.as_view(), name='pickup-details'),
    path('', views.homepage, name='home-page'),
    path('blog/', views.blogpage, name='blog-page'),
    path('ca-to-us/', views.ca_to_us, name='ca-to-us-page'),
    path('us-to-ca/', views.us_to_ca, name='us-to-ca-page'),
    path('contact/', views.contactpage, name='contact-page'),
    path('pack/', views.packagepage, name='package-page'),
    path('why-box/', views.whybuypage, name='why-box'),
    path('pricing/', views.pricepage, name='price'),
    path('blog/<slug:slug>/', views.blogdetails, name='blog-detail'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
