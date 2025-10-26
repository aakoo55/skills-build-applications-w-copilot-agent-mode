"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.urls import path
from django.http import JsonResponse


# Build a base URL from the CODESPACE_NAME environment variable if present.
# This will produce URLs like: https://$CODESPACE_NAME-8000.app.github.dev
CODESPACE_NAME = os.environ.get('CODESPACE_NAME')
if CODESPACE_NAME:
    BASE_URL = f"https://{CODESPACE_NAME}-8000.app.github.dev"
else:
    # fallback to local dev server address
    BASE_URL = "http://127.0.0.1:8000"


def api_root(request):
    """Simple API root that returns the available API endpoints full URLs.

    This uses the Codespace-based URL when available so you can test
    externally via the Codespaces forwarded URL (and know the full API
    endpoint to call)."""
    return JsonResponse({
        "activities": f"{BASE_URL}/api/activities/",
        "users": f"{BASE_URL}/api/users/",
        "teams": f"{BASE_URL}/api/teams/",
    })


def activities(request):
    """Placeholder activities endpoint. Returns an empty list plus the
    endpoint URL (constructed from the environment) so you can exercise
    curl against the codespace URL without editing views.py."""
    return JsonResponse({"url": f"{BASE_URL}/api/activities/", "activities": []})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/activities/', activities, name='api-activities'),
]
