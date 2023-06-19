# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def recoveryPasswordTemplate(token, email):
    return Mail(
            from_email = os.getenv("SENDGRID_SENDER"),
            to_emails = email,
            subject = 'Password reset',
            html_content = '<h2>Reset your password</h2><br> Hi, <br><br>There was a request to change your <strong>password!</strong> <br><br>' 
                + 'If you did not make this request then please ignore this email. <br><br>'
                + 'Otherwise, please click this link to change your password: <a href="'
                + os.getenv("FRONTEND_URL") + '/changePassword?token=' + token + '">Here</a>'
        )
    
def sendEmail(message):
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)