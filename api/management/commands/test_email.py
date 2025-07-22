from django.core.management.base import BaseCommand
from django.core.mail import send_mail

class Command(BaseCommand):
    help = 'Send test email to verify SMTP settings'

    def handle(self, *args, **kwargs):
        try:
            send_mail(
                subject='Test Email',
                message='This is a test email from Django.',
                from_email='testeranon12@gmail.com',
                recipient_list=['kenifeh@gmail.com'],  # <- replace with your email
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS('✅ Test email sent successfully.'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'❌ Failed to send test email: {e}'))
